import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgClass } from '@angular/common';
import { DetalhesDoPokemon, Pokemon } from '../../models/pokemon';
import { mapearDetalhesPokemon } from '../../util/mapear-pokemon';
import { mapeamentoDeCoresPorTipo } from '../../util/mapeamento-de-cores-por-tipo';

@Component({
  selector: 'app-detalhes-pokemon',
  imports: [NgClass],
  templateUrl: './detalhes-pokemon.html'
})
export class DetalhesPokemon implements OnInit {
  public pokemon?: DetalhesDoPokemon;
  public mapeamentoDeCores = mapeamentoDeCoresPorTipo;

  private readonly url: string = "https://pokeapi.co/api/v2/pokemon";

  private http = inject(HttpClient);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    const pokemonId = this.route.snapshot.paramMap.get("id");

    this.http.get(`${this.url}/${pokemonId}`).subscribe((objDetalhes: any) => {
      this.pokemon = mapearDetalhesPokemon(objDetalhes);
    });
  }
}
