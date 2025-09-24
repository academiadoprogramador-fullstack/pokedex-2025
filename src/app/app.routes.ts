import { Routes } from "@angular/router";
import { ListagemPokemons } from "./components/listagem-pokemons/listagem-pokemons";

export const routes: Routes = [
    { path: '', redirectTo: 'listagem', pathMatch: 'full' },
    { path: 'listagem', component: ListagemPokemons, }
];