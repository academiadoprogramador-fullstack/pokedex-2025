import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { Pokemon } from '../../models/pokemon';
import { mapeamentoDeCoresPorTipo } from '../../util/mapeamento-de-cores-por-tipo';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-listagem-pokemons',
  imports: [NgClass],
  templateUrl: './listagem-pokemons.html'
})
export class ListagemPokemons implements OnInit {
 public pokemons: Pokemon[] = [];
  public mapeamentoDeCoresPorTipo = mapeamentoDeCoresPorTipo;

  private readonly url: string = "https://pokeapi.co/api/v2/pokemon/";
  private readonly http = inject(HttpClient);

  ngOnInit(): void {
    this.http.get(this.url).subscribe((obj: any) => {
      const arrayResultados: any[] = obj.results;

      for (let resultado of arrayResultados) {
        this.http.get(resultado.url).subscribe(objDetalhes => {
          const pokemon = this.mapearPokemon(objDetalhes);

          this.pokemons.push(pokemon);
        })
      }
    });
  }

  private mapearPokemon(obj: any): Pokemon {
    return { 
      nome: this.converterParaTitleCase(obj.name),
      urlSprite: obj.sprites.front_default,
      tipos: obj.types.map((x: any) => this.converterParaTitleCase(x.type.name))
    };
  }

  private converterParaTitleCase(texto: string): string {
    if (texto.length < 1) return texto;

    const novaString = texto[0].toUpperCase() + texto.substring(1).toLowerCase();

    return novaString;
  }
}
