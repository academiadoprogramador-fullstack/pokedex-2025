import { Component, inject, OnInit } from '@angular/core';
import { Pokemon } from '../../models/pokemon';
import { CardPokemon } from '../card-pokemon/card-pokemon';
import { RouterLink } from '@angular/router';
import { PokeApiService } from '../../services/poke-api-service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { LocalStorageService } from '../../services/local-storage-service';

@Component({
  selector: 'app-listagem-pokemons',
  imports: [RouterLink, AsyncPipe, CardPokemon],
  templateUrl: './listagem-pokemons.html',
})
export class ListagemPokemons implements OnInit {
  public readonly localStorageService = inject(LocalStorageService);
  private readonly pokeApiService = inject(PokeApiService);

  public pokemonsFavoritos$?: Observable<Pokemon[]>;
  public pokemons$?: Observable<Pokemon[]>;

  ngOnInit(): void {
    this.pokemonsFavoritos$ = this.localStorageService.selecionarFavoritos();
    this.pokemons$ = this.pokeApiService.selecionarPokemons();
  }
}
