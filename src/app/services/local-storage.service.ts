import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { GuessCookie } from '../../models/guess-cookie';

@Injectable({
  providedIn: 'root',
})
export class LocalStorage {
  localStorage: Storage;

  constructor(@Inject(DOCUMENT) private readonly document: Document) {
    if (!document.defaultView) {
      throw new Error('No window object found');
    }
    this.localStorage = document.defaultView.localStorage;
  }
  setGuess(guesses: GuessCookie): void {
    this.setLocalStorage('guesses', JSON.stringify(guesses));
  }

  setLocalStorage(name: string, value: string) {
    this.localStorage.setItem(name, value);
  }

  getGuess(): GuessCookie {
    const cookie = this.getLocalStorage('guesses');
    if (cookie) {
      return JSON.parse(cookie);
    }
    return { students: [], doy: -1 };
  }

  getLocalStorage(name: string) {
    return this.localStorage.getItem(name);
  }
}
