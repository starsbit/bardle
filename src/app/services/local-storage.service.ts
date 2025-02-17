import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { GuessCookie } from '../models/cookie';
import { DEFAULT_STUDENT_LIST } from '../models/student-list';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  localStorage!: Storage;

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
    return {
      guesses: {
        japan: [],
        global: [],
      },
      doy: -1,
      lastList: DEFAULT_STUDENT_LIST,
    };
  }

  getLocalStorage(name: string) {
    if (!isPlatformBrowser(this.platformId)) {
      return '';
    }
    return this.localStorage.getItem(name);
  }

  getChangeLogReadDate(): string {
    return this.getLocalStorage('changeLogReadDate') || '';
  }

  setChangeLogReadDate(date: string): void {
    this.setLocalStorage('changeLogReadDate', date);
  }
}
