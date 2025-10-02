import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetalhesDoPokemon, SonsDoPokemon } from '../../models/pokemon';
import { converterParaTitleCase } from '../../util/converter-para-title-case';
import { NgClass } from '@angular/common';
import { mapeamentoDeCoresPorTipo } from '../../util/mapeamento-de-cores-por-tipo';
import { CardPokemon } from '../card-pokemon/card-pokemon';
import { alternarStatusPokemon, pokemonsFavoritos } from '../../util/pokemons-favoritos';

@Component({
  selector: 'app-detalhes-pokemon',
  imports: [NgClass, CardPokemon],
  templateUrl: './detalhes-pokemon.html',
})
export class DetalhesPokemon implements OnInit {
  public detalhesDoPokemon?: DetalhesDoPokemon;
  public mapeamentoDeCoresPorTipo = mapeamentoDeCoresPorTipo;

  public alternarStatusPokemon = alternarStatusPokemon;

  private readonly url: string = 'https://pokeapi.co/api/v2/pokemon';

  private readonly http = inject(HttpClient);
  private readonly route = inject(ActivatedRoute);

  ngOnInit(): void {
    const pokemonId = this.route.snapshot.paramMap.get('id');

    const urlCompleto = `${this.url}/${pokemonId}`;

    this.http.get(urlCompleto).subscribe((objDetalhes) => {
      this.detalhesDoPokemon = this.mapearDetalhesDoPokemon(objDetalhes);
    });
  }

  private mapearDetalhesDoPokemon(obj: any): DetalhesDoPokemon {
    const sprites: string[] = [
      obj.sprites.front_default,
      obj.sprites.back_default,
      obj.sprites.front_shiny,
      obj.sprites.back_shiny,
      obj.sprites.other.dream_world.front_default,
      obj.sprites.other['official-artwork'].front_default,
    ];

    return {
      id: obj.id,
      nome: converterParaTitleCase(obj.name),
      urlSprite: obj.sprites.front_default,
      tipos: obj.types.map((x: any) => converterParaTitleCase(x.type.name)),
      sons: this.mapearSonsDoPokemon(obj.cries),
      sprites: sprites,
      favorito: pokemonsFavoritos.some((x) => x.id == obj.id),
    };
  }

  private mapearSonsDoPokemon(obj: any): SonsDoPokemon {
    return { atual: obj.latest, antigo: obj.legacy };
  }
}
