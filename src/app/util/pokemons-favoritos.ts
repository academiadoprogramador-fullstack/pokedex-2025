import { Pokemon } from '../models/pokemon';

export function alternarStatusPokemonFavorito(pokemon: Pokemon) {
  if (pokemon.favorito) {
    pokemon.favorito = false;
    pokemonsFavoritos = pokemonsFavoritos.filter((x) => x.id != pokemon.id);
  } else {
    pokemon.favorito = true;
    pokemonsFavoritos.push(pokemon);
  }
}

export let pokemonsFavoritos: Pokemon[] = [];
