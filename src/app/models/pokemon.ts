export interface Pokemon {
    id: number;
    nome: string;
    urlSprite?: string;
    tipos: string[];
}

export interface DetalhesDoPokemon extends Pokemon  {
    sons: SonsDoPokemon;
    sprites: string[];
}

export interface SonsDoPokemon {
    atual: string;
    antigo: string;
}