import { Component } from '@angular/core';

import { ListagemPokemons } from './components/listagem-pokemons/listagem-pokemons';

@Component({
  selector: 'app-root',
  imports: [ListagemPokemons],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App { }