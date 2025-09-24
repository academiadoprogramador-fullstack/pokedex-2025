import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';

interface Pokemon {
  nome: string;
  urlSprite?: string;
}

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  public pokemons: Pokemon[] = [];
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
      urlSprite: obj.sprites.front_default
    };
  }

  private converterParaTitleCase(texto: string): string {
    if (texto.length < 1) return texto;

    const novaString = texto[0].toUpperCase() + texto.substring(1).toLowerCase();

    return novaString;
  }
}
