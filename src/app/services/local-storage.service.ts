import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { GuessCookie } from '../../models/guess-cookie';

@Injectable({
  providedIn: 'root',
})
export class LocalStorage {
  localStorage: Storage;

  constructor(@Inject(PLATFORM_ID) private platformId: string) {
    if (!isPlatformBrowser(this.platformId) || !document.defaultView) {
      return;
    }
    this.localStorage = document.defaultView.localStorage;
  }
  setGuess(guesses: GuessCookie): void {
    this.setLocalStorage('guesses', JSON.stringify(guesses));
  }

  setLocalStorage(name: string, value: string) {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
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
    if (!isPlatformBrowser(this.platformId)) {
      return '';
    }
    return this.localStorage.getItem(name);
  }
}
