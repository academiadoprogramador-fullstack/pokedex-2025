import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetalhesDoPokemon } from '../../models/pokemon';
import { NgClass } from '@angular/common';
import { mapeamentoDeCoresPorTipo } from '../../util/mapeamento-de-cores-por-tipo';
import { CardPokemon } from '../card-pokemon/card-pokemon';
import { alternarStatusPokemon } from '../../util/pokemons-favoritos';
import { PokeApiService } from '../../services/poke-api-service';

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
  private readonly pokeApiService = inject(PokeApiService);

  ngOnInit(): void {
    const pokemonIdParam = this.route.snapshot.paramMap.get('id');

    if (!pokemonIdParam)
      throw new Error('Os detalhes do pokémon requisitado não foram encontrados.');

    const pokemonId = parseInt(pokemonIdParam);

    this.detalhesDoPokemon = this.pokeApiService.selecionarDetalhesPokemon(pokemonId);

    console.log(this.detalhesDoPokemon);
  }
}
