import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { PokeApiResponse, PokeApiDetailsResponse } from '../models/poke-api';
import { DetalhesDoPokemon, Pokemon } from '../models/pokemon';
import { converterParaTitleCase } from '../util/converter-para-title-case';
import { forkJoin, map, Observable, switchMap, withLatestFrom } from 'rxjs';
import { LocalStorageService } from './local-storage-service';

@Injectable({
  providedIn: 'root',
})
export class PokeApiService {
  private readonly url: string = 'https://pokeapi.co/api/v2/pokemon';
  private readonly http = inject(HttpClient);
  private readonly localStorageService = inject(LocalStorageService);

  public selecionarPokemonsPagina(offset = 0): Observable<Pokemon[]> {
    const url = `${this.url}?offset=${offset}&limit=20`;

    return this.http.get<PokeApiResponse>(url).pipe(
      switchMap((lista) => {
        const detailRequests = lista.results.map((r) =>
          this.http.get<PokeApiDetailsResponse>(r.url),
        );
        return forkJoin(detailRequests);
      }),
      withLatestFrom(this.localStorageService.selecionarFavoritos()),
      map(([detalhes, favoritos]) => {
        return detalhes
          .map((d) => this.mapearPokemon(d))
          .map((p) => ({
            ...p,
            favorito: favoritos.some((f) => f.id === p.id),
          }));
      }),
    );
  }

  public selecionarPokemons(): Observable<Pokemon[]> {
    return this.http.get<PokeApiResponse>(this.url).pipe(
      switchMap((obj) => {
        const requests = obj.results.map((r) => this.http.get<PokeApiDetailsResponse>(r.url));

        return forkJoin(requests);
      }),
      withLatestFrom(this.localStorageService.selecionarFavoritos()),
      map(([objDetalhes, favoritos]) => {
        return objDetalhes
          .map((d) => this.mapearPokemon(d))
          .map((p) => ({
            ...p,
            favorito: favoritos.some((f) => f.id === p.id),
          }));
      }),
    );
  }

  public selecionarDetalhesPokemon(pokemonId: number): Observable<DetalhesDoPokemon> {
    const urlCompleto = `${this.url}/${pokemonId}`;

    return this.http.get<PokeApiDetailsResponse>(urlCompleto).pipe(
      withLatestFrom(this.localStorageService.selecionarFavoritos()),
      map(([objDetalhes, favoritos]) => {
        const pokemonEstaEmFavoritos = favoritos.some((f) => f.id === objDetalhes.id);

        const detalhes = this.mapearDetalhesDoPokemon(objDetalhes);
        detalhes.favorito = pokemonEstaEmFavoritos;

        return detalhes;
      }),
    );
  }

  private mapearPokemon(obj: PokeApiDetailsResponse): Pokemon {
    return {
      id: obj.id,
      nome: converterParaTitleCase(obj.name),
      urlSprite: obj.sprites.front_default,
      tipos: obj.types.map((x) => converterParaTitleCase(x.type.name)),
      favorito: false,
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
      favorito: false,
    };
  }
}
