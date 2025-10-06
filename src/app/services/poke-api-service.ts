import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { PokeApiResponse, PokeApiDetailsResponse } from '../models/poke-api';
import { DetalhesDoPokemon, Pokemon } from '../models/pokemon';
import { converterParaTitleCase } from '../util/converter-para-title-case';
import { pokemonsFavoritos } from '../util/pokemons-favoritos';
import { forkJoin, map, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokeApiService {
  private readonly url: string = 'https://pokeapi.co/api/v2/pokemon';
  private readonly http = inject(HttpClient);

  public selecionarPokemons(): Observable<Pokemon[]> {
    return this.http.get<PokeApiResponse>(this.url).pipe(
      switchMap((obj) => {
        const requests = obj.results.map((r) =>
          this.http.get<PokeApiDetailsResponse>(r.url).pipe(map(this.mapearPokemon)),
        );

        return forkJoin(requests);
      }),
    );
  }

  public selecionarDetalhesPokemon(pokemonId: number): Observable<DetalhesDoPokemon> {
    const urlCompleto = `${this.url}/${pokemonId}`;

    return this.http
      .get<PokeApiDetailsResponse>(urlCompleto)
      .pipe(map(this.mapearDetalhesDoPokemon));
  }

  private mapearPokemon(obj: PokeApiDetailsResponse): Pokemon {
    return {
      id: obj.id,
      nome: converterParaTitleCase(obj.name),
      urlSprite: obj.sprites.front_default,
      tipos: obj.types.map((x) => converterParaTitleCase(x.type.name)),
      favorito: pokemonsFavoritos.some((x) => x.id == obj.id),
    };
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
