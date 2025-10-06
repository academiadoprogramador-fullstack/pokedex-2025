import { Component, inject, OnInit } from '@angular/core';
import { Pokemon } from '../../models/pokemon';
import { CardPokemon } from '../card-pokemon/card-pokemon';
import { alternarStatusPokemon, pokemonsFavoritos } from '../../util/pokemons-favoritos';
import { RouterLink } from '@angular/router';
import { PokeApiService } from '../../services/poke-api-service';

@Component({
  selector: 'app-listagem-pokemons',
  imports: [CardPokemon, RouterLink],
  templateUrl: './listagem-pokemons.html',
})
export class ListagemPokemons implements OnInit {
  public pokemons: Pokemon[] = [];

  public pokemonsFavoritos = pokemonsFavoritos;
  public alternarStatusPokemon = alternarStatusPokemon;

  private readonly pokeApiService = inject(PokeApiService);

  ngOnInit(): void {
    this.pokemons = this.pokeApiService.selecionarPokemons();
  }
}
