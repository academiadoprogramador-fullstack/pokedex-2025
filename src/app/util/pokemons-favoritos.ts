import { Pokemon } from '../models/pokemon';

export const pokemonsFavoritos: Pokemon[] = obterPokemonsFavoritos();

export function alternarStatusPokemon(pokemon: Pokemon): void {
  if (pokemon.favorito) {
    pokemon.favorito = false;

    const index = pokemonsFavoritos.findIndex((x) => x.id === pokemon.id);
    if (index > -1) pokemonsFavoritos.splice(index, 1);
  } else {
    pokemon.favorito = true;
    pokemonsFavoritos.push(pokemon);
  }

  localStorage.setItem('pokedex:favoritos', JSON.stringify(pokemonsFavoritos));
}

function obterPokemonsFavoritos(): Pokemon[] {
  var itensArmazenados = localStorage.getItem('pokedex:favoritos');

  if (!itensArmazenados) return [];

  return JSON.parse(itensArmazenados) as Pokemon[];
}
