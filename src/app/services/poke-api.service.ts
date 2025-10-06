import { inject, Injectable } from '@angular/core';
import { PokeApiDetailsResponse, PokeApiResponse } from '../models/poke-api';
import { DetalhesDoPokemon, Pokemon } from '../models/pokemon';
import { converterParaTitleCase } from '../util/converter-para-title-case';
import { pokemonsFavoritos } from '../util/pokemons-favoritos';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokeApiService {
  private readonly http = inject(HttpClient);
  private readonly url: string = 'https://pokeapi.co/api/v2/pokemon';

  public selecionarPokemons(): Observable<Pokemon[]> {
    return this.http.get<PokeApiResponse>(this.url).pipe(
      switchMap((res) => {
        const requests = res.results.map((r) =>
          this.http.get<PokeApiDetailsResponse>(r.url).pipe(map((obj) => this.mapearPokemon(obj))),
        );

        return forkJoin(requests);
      }),
      map((pokemons) => pokemons.sort((a, b) => a.id - b.id)), // ordena 1x no final (asc por id)
    );
  }

  private mapearPokemon(obj: PokeApiDetailsResponse): Pokemon {
    return {
      id: obj.id,
      nome: converterParaTitleCase(obj.name),
      urlSprite: obj.sprites.front_default ?? '',
      tipos: obj.types.map((t) => converterParaTitleCase(t.type.name)),
      favorito: pokemonsFavoritos.some((x) => x.id === obj.id),
    };
  }

  public selecionarDetalhesDoPokemon(pokemonId: number): Observable<DetalhesDoPokemon> {
    const urlCompleto = `${this.url}/${pokemonId}`;

    return this.http
      .get<PokeApiDetailsResponse>(urlCompleto)
      .pipe(map(this.mapearDetalhesDoPokemon));
  }

  private mapearDetalhesDoPokemon(obj: PokeApiDetailsResponse): DetalhesDoPokemon {
    const sprites = [
      obj.sprites.front_default,
      obj.sprites.back_default,
      obj.sprites.front_shiny,
      obj.sprites.back_shiny,
      obj.sprites.other.dream_world.front_default,
      obj.sprites.other['official-artwork'].front_default,
    ];

    return {
      id: obj.id,
      nome: converterParaTitleCase(obj.name),
      urlSprite: obj.sprites.front_default,
      tipos: obj.types.map((x) => converterParaTitleCase(x.type.name)),
      sons: { atual: obj.cries.latest, antigo: obj.cries.legacy },
      sprites: sprites,
      favorito: pokemonsFavoritos.some((x) => x.id == obj.id),
    };
  }
}
