import { DetalhesDoPokemon, Pokemon, SonsDoPokemon } from "../models/pokemon";
import { converterParaTitleCase } from "./converter-para-title-case";

export function mapearPokemon(obj: any): Pokemon {
    return {
        id: obj.id,
        nome: converterParaTitleCase(obj.name),
        urlSprite: obj.sprites.front_default,
        tipos: obj.types.map((x: any) => converterParaTitleCase(x.type.name))
    };
}

export function mapearDetalhesPokemon(obj: any): DetalhesDoPokemon {
    const sprites: string[] = [
        obj.sprites.front_default,
        obj.sprites.back_default,
        obj.sprites.back_shiny,
        obj.sprites.front_shiny,
        obj.sprites.other.dream_world.front_default,
        obj.sprites.other["official-artwork"].front_default,
    ];

    return {
        id: obj.id,
        nome: converterParaTitleCase(obj.name),
        urlSprite: obj.sprites.front_default,
        sprites: sprites,
        tipos: obj.types.map((x: any) => converterParaTitleCase(x.type.name)),
        sons: mapearSonsDoPokemon(obj.cries),
    };
}

function mapearSonsDoPokemon(obj: any): SonsDoPokemon {
    return  { atual: obj.latest, antigo: obj.legacy };
}