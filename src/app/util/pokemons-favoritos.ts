import { Pokemon } from '../models/pokemon';

export const pokemonsFavoritos: Pokemon[] = [];

export function alternarStatusPokemon(pokemon: Pokemon) {
  if (pokemon.favorito) {
    pokemon.favorito = false;

    const index = pokemonsFavoritos.findIndex((x) => x.id == pokemon.id);
    if (index > -1) pokemonsFavoritos.splice(index, 1);
  } else {
    pokemon.favorito = true;
    pokemonsFavoritos.push(pokemon);
  }
}
