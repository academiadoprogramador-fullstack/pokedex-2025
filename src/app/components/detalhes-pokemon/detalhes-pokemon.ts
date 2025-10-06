import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetalhesDoPokemon } from '../../models/pokemon';
import { AsyncPipe, NgClass } from '@angular/common';
import { mapeamentoDeCoresPorTipo } from '../../util/mapeamento-de-cores-por-tipo';
import { CardPokemon } from '../card-pokemon/card-pokemon';
import { alternarStatusPokemon } from '../../util/pokemons-favoritos';
import { PokeApiService } from '../../services/poke-api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-detalhes-pokemon',
  imports: [NgClass, AsyncPipe, CardPokemon],
  templateUrl: './detalhes-pokemon.html',
})
export class DetalhesPokemon implements OnInit {
  public detalhesDoPokemon$?: Observable<DetalhesDoPokemon>;
  public mapeamentoDeCoresPorTipo = mapeamentoDeCoresPorTipo;

  public alternarStatusPokemon = alternarStatusPokemon;

  private readonly route = inject(ActivatedRoute);
  private readonly pokeApiService = inject(PokeApiService);

  ngOnInit(): void {
    const pokemonIdParam = this.route.snapshot.paramMap.get('id');

    if (!pokemonIdParam) throw new Error('Não foi possível obter o pokémon com o ID requisitado.');

    const pokemonId = parseInt(pokemonIdParam);

    this.detalhesDoPokemon$ = this.pokeApiService.selecionarDetalhesDoPokemon(pokemonId);
  }
}
