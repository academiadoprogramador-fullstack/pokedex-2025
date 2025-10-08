import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pokemon } from '../../models/pokemon';
import { NgClass } from '@angular/common';
import { mapeamentoDeCoresPorTipo } from '../../util/mapeamento-de-cores-por-tipo';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-card-pokemon',
  imports: [NgClass, RouterLink],
  template: `
    @if (pokemon) {
      <div class="card p-3 text-center">
        <div class="card-body d-flex flex-column">
          @if (exibirLink) {
            <a class="text-decoration-none" [routerLink]="['/pokemons', pokemon.id]">
              <h5 class="card-title">{{ pokemon.nome }}</h5>
            </a>
          } @else {
            <h5 class="card-title">{{ pokemon.nome }}</h5>
          }

          <div class="d-flex justify-content-center gap-2">
            @for (tipo of pokemon.tipos; track $index) {
              <span
                class="badge rounded-pill text-dark fs-6"
                [ngClass]="mapeamentoDeCoresPorTipo[tipo]"
                >{{ tipo }}</span
              >
            }
          </div>

          <img style="min-width: 200px;" [src]="pokemon.urlSprite" [alt]="pokemon.nome" />

          <div class="app-container-alternar-status" title="Alternar Status de Favorito">
            @if (pokemon.favorito) {
              <button class="btn mx-auto" (click)="alternarStatusFavorito()">
                <i class="bi bi-heart-fill fs-4 text-danger"></i>
              </button>
            } @else {
              <button class="btn mx-auto" (click)="alternarStatusFavorito()">
                <i class="bi bi-heart fs-4 text-danger"></i>
              </button>
            }
          </div>
        </div>
      </div>
    }
  `,
})
export class CardPokemon {
  @Input({ required: true }) public pokemon?: Pokemon;
  @Input({ required: false }) public exibirLink: boolean = false;

  @Output() public statusFavoritoAlterado: EventEmitter<Pokemon> = new EventEmitter<Pokemon>();

  public mapeamentoDeCoresPorTipo = mapeamentoDeCoresPorTipo;

  public alternarStatusFavorito() {
    this.statusFavoritoAlterado.emit(this.pokemon);
  }
}
