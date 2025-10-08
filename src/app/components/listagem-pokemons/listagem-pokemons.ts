import { Component, inject, OnInit } from '@angular/core';
import { Pokemon } from '../../models/pokemon';
import { CardPokemon } from '../card-pokemon/card-pokemon';
import { RouterLink } from '@angular/router';
import { PokeApiService } from '../../services/poke-api-service';
import { exhaustMap, filter, Observable, scan, startWith, Subject, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { LocalStorageService } from '../../services/local-storage-service';

@Component({
  selector: 'app-listagem-pokemons',
  imports: [RouterLink, AsyncPipe, CardPokemon],
  templateUrl: './listagem-pokemons.html',
})
export class ListagemPokemons implements OnInit {
  public pokemons$?: Observable<Pokemon[]>;
  public pokemonsFavoritos$?: Observable<Pokemon[]>;

  public get offsetFinalAlcancado(): boolean {
    return this.proximoOffset >= 1300;
  }

  private carregarMaisClick$ = new Subject<void>();
  private proximoOffset: number = 0;

  public readonly localStorageService = inject(LocalStorageService);
  private readonly pokeApiService = inject(PokeApiService);

  ngOnInit(): void {
    this.pokemonsFavoritos$ = this.localStorageService.selecionarFavoritos();

    const paginaObtida$ = this.carregarMaisClick$.pipe(
      startWith(void 0),
      filter(() => !this.offsetFinalAlcancado),
      exhaustMap(() =>
        this.pokeApiService
          .selecionarPokemonsPagina(this.proximoOffset)
          .pipe(tap(() => (this.proximoOffset += 20))),
      ),
    );

    this.pokemons$ = paginaObtida$.pipe(
      scan((acumulado, novaPagina) => [...acumulado, ...novaPagina]),
    );
  }

  public carregarMais(): void {
    if (this.offsetFinalAlcancado) return;

    this.carregarMaisClick$.next();
  }
}
