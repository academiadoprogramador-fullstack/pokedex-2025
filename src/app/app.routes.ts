import { Routes } from "@angular/router";
import { ListagemPokemons } from "./components/listagem-pokemons/listagem-pokemons";
import { DetalhesPokemon } from "./components/detalhes-pokemon/detalhes-pokemon";

export const routes: Routes = [
    { path: '', redirectTo: 'pokemons', pathMatch: 'full' },
    { path: 'pokemons', component: ListagemPokemons, },
    { path: 'pokemons/:id', component: DetalhesPokemon, }
];