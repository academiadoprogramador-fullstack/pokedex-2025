import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { PokeApiResponse, PokeApiDetailsResponse } from '../models/poke-api';
import { DetalhesDoPokemon, Pokemon } from '../models/pokemon';
import { converterParaTitleCase } from '../util/converter-para-title-case';
import { pokemonsFavoritos } from '../util/pokemons-favoritos';

@Injectable({
  providedIn: 'root',
})
export class PokeApiService {
  private readonly url: string = 'https://pokeapi.co/api/v2/pokemon/';
  private readonly http = inject(HttpClient);

  // requisitar dados externos
  public selecionarPokemons(): Pokemon[] {
    const pokemons: Pokemon[] = [];

    this.http.get<PokeApiResponse>(this.url).subscribe((obj) => {
      const arrayResultados: { name: string; url: string }[] = obj.results;

      for (const resultado of arrayResultados) {
        this.http.get<PokeApiDetailsResponse>(resultado.url).subscribe((objDetalhes) => {
          const pokemon = this.mapearPokemon(objDetalhes);

          pokemons.push(pokemon);
        });
      }
    });

    return pokemons;
  }

  public selecionarDetalhesPokemon(pokemonId: number): DetalhesDoPokemon | undefined {
    const urlCompleto = `${this.url}/${pokemonId}`;

    let detalhesDoPokemon: DetalhesDoPokemon | undefined;

    this.http.get<PokeApiDetailsResponse>(urlCompleto).subscribe((objDetalhes) => {
      detalhesDoPokemon = this.mapearDetalhesDoPokemon(objDetalhes);
    });

    return detalhesDoPokemon;
  }

  // mapear dados para os componentes
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
