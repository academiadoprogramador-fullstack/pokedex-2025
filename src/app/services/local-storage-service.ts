import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Pokemon } from '../models/pokemon';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private readonly chave: string = 'pokedex:favoritos';
  private readonly favoritosSubject = new BehaviorSubject<Pokemon[]>([]);

  constructor() {
    const registros = localStorage.getItem(this.chave);

    if (!registros) return;

    this.favoritosSubject.next(JSON.parse(registros));
  }

  public alternarStatusFavorito(pokemon: Pokemon) {
    const favoritosAtuais = this.favoritosSubject.getValue();

    if (pokemon.favorito) {
      pokemon.favorito = false;

      const index = favoritosAtuais.findIndex((x) => x.id === pokemon.id);
      if (index > -1) favoritosAtuais.splice(index, 1);
    } else {
      pokemon.favorito = true;
      favoritosAtuais.push(pokemon);
    }

    this.favoritosSubject.next(favoritosAtuais);

    localStorage.setItem(this.chave, JSON.stringify(favoritosAtuais));
  }

  public selecionarFavoritos(): Observable<Pokemon[]> {
    return this.favoritosSubject.asObservable();
  }
}
