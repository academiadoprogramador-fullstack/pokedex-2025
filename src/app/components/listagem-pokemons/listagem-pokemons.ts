import { Component, inject, OnInit } from '@angular/core';
import { Pokemon } from '../../models/pokemon';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { mapearPokemon } from '../../util/mapear-pokemon';
import { mapeamentoDeCoresPorTipo } from '../../util/mapeamento-de-cores-por-tipo';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-listagem-pokemons',
  imports: [RouterLink, NgClass],
  templateUrl: './listagem-pokemons.html'
})
export class ListagemPokemons implements OnInit {
  public pokemons: Pokemon[] = [];
  public mapeamentoDeCores = mapeamentoDeCoresPorTipo;

  private readonly url: string = "https://pokeapi.co/api/v2/pokemon/";

  private readonly http = inject(HttpClient);

  ngOnInit(): void {
    this.http.get(this.url).subscribe((obj: any) => {
      const arrayResultados: any[] = obj.results;

      for (let resultado of arrayResultados) {
        this.http.get(resultado.url).subscribe(objDetalhes => {
          const pokemon = mapearPokemon(objDetalhes);

          this.pokemons.push(pokemon);
        })
      }
    });
  }
}
