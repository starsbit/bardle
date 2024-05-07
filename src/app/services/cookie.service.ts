import { Injectable } from '@angular/core';
import { GuessCookie } from '../../models/guess-cookie';

@Injectable({
  providedIn: 'root',
})
export class CookieService {
  setGuessCookie(guesses: GuessCookie): void {
    this.setCookie('guesses', JSON.stringify(guesses), 1);
  }

  setCookie(name: string, value: string, days: number) {
    let expires = '';
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = `; expires=${date.toUTCString()}`;
    }
    document.cookie = `${name}=${value || ''}${expires}; path=/`;
  }

  getGuessCookie(): GuessCookie {
    const cookie = this.getCookie('guesses');
    if (cookie) {
      return JSON.parse(cookie);
    }
    return { students: [], doy: -1 };
  }

  getCookie(name: string) {
    const nameEQ = `${name}=`;
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1, c.length);
      }
      if (c.indexOf(nameEQ) === 0) {
        return c.substring(nameEQ.length, c.length);
      }
    }
    return null;
  }

  eraseCookie(name: string) {
    document.cookie = `${name}=; Max-Age=-99999999;`;
  }
}
