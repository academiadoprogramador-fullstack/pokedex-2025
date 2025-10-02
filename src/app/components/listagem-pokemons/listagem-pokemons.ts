import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { Pokemon } from '../../models/pokemon';
import { converterParaTitleCase } from '../../util/converter-para-title-case';
import { CardPokemon } from '../card-pokemon/card-pokemon';
import { alternarStatusPokemon, pokemonsFavoritos } from '../../util/pokemons-favoritos';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-listagem-pokemons',
  imports: [CardPokemon, RouterLink],
  templateUrl: './listagem-pokemons.html',
})
export class ListagemPokemons implements OnInit {
  public pokemons: Pokemon[] = [];

  public pokemonsFavoritos = pokemonsFavoritos;
  public alternarStatusPokemon = alternarStatusPokemon;

  private readonly url: string = 'https://pokeapi.co/api/v2/pokemon/';
  private readonly http = inject(HttpClient);

  ngOnInit(): void {
    this.http.get(this.url).subscribe((obj: any) => {
      const arrayResultados: any[] = obj.results;

      for (let resultado of arrayResultados) {
        this.http.get(resultado.url).subscribe((objDetalhes) => {
          const pokemon = this.mapearPokemon(objDetalhes);

          this.pokemons.push(pokemon);
        });
      }
    });
  }

  private mapearPokemon(obj: any): Pokemon {
    return {
      id: obj.id,
      nome: converterParaTitleCase(obj.name),
      urlSprite: obj.sprites.front_default,
      tipos: obj.types.map((x: any) => converterParaTitleCase(x.type.name)),
      favorito: pokemonsFavoritos.some((x) => x.id == obj.id),
    };
  }
}
