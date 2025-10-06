export interface Pokemon {
  id: number;
  nome: string;
  urlSprite?: string;
  tipos: string[];
  favorito: boolean;
}

export interface DetalhesDoPokemon extends Pokemon {
  sons: { atual: string; antigo: string };
  sprites: (string | undefined)[];
}
