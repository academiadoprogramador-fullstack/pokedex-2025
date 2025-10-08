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
  public readonly localStorageService = inject(LocalStorageService);
  private readonly pokeApiService = inject(PokeApiService);

  public pokemonsFavoritos$: Observable<Pokemon[]> = this.localStorageService.selecionarFavoritos();
  public pokemons$?: Observable<Pokemon[]>;

  public get paginaFinalAlcancada(): boolean {
    return this.offsetAtual >= 1300;
  }

  private offsetAtual: number = 0;
  private readonly carregarMaisClick$ = new Subject<void>();

  ngOnInit(): void {
    const paginaObtida$ = this.carregarMaisClick$.pipe(
      startWith(void 0),
      filter(() => !this.paginaFinalAlcancada),
      exhaustMap(() =>
        this.pokeApiService
          .selecionarPokemons(this.offsetAtual)
          .pipe(tap(() => (this.offsetAtual += 20))),
      ),
    );

    this.pokemons$ = paginaObtida$.pipe(
      scan((acumulado, novaPagina) => [...acumulado, ...novaPagina]),
    );
  }

  public carregarMais(): void {
    this.carregarMaisClick$.next();
  }
}
