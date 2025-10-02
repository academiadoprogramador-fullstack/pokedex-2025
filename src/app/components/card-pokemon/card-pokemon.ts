import { Component, Input } from '@angular/core';
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
          class="badge rounded-pill text-light fs-6"
          [ngClass]="mapeamentoDeCoresPorTipo[tipo]"
          >{{ tipo }}</span
        >
        }
      </div>

      <img [src]="pokemon.urlSprite" [alt]="pokemon.nome" />
    </div>
    }
  `,
})
export class CardPokemon {
  @Input({ required: true }) public pokemon?: Pokemon;
  @Input({ required: false }) public exibirLink: boolean = false;

  public mapeamentoDeCoresPorTipo = mapeamentoDeCoresPorTipo;
}
