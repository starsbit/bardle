import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { GuessCookie } from '../models/cookie';
import { DEFAULT_STUDENT_LIST } from '../models/student-list';
import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  let service: LocalStorageService;

  describe('when running in browser', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          LocalStorageService,
          { provide: PLATFORM_ID, useValue: 'browser' },
        ],
      });
      service = TestBed.inject(LocalStorageService);
    });

    it('should set local storage item', () => {
      spyOn(window.localStorage, 'setItem');
      service.setLocalStorage('testKey', 'testValue');
      expect(window.localStorage.setItem).toHaveBeenCalledWith(
        'testKey',
        'testValue'
      );
    });

    it('should get local storage item', () => {
      spyOn(window.localStorage, 'getItem').and.returnValue('testValue');
      expect(service.getLocalStorage('testKey')).toBe('testValue');
    });
  });

  describe('when not running in browser', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          LocalStorageService,
          { provide: PLATFORM_ID, useValue: 'server' },
        ],
      });
      service = TestBed.inject(LocalStorageService);
    });

    it('should not set local storage item', () => {
      spyOn(window.localStorage, 'setItem');
      service.setLocalStorage('testKey', 'testValue');
      expect(window.localStorage.setItem).not.toHaveBeenCalled();
    });

    it('should return empty string when getting local storage item', () => {
      expect(service.getLocalStorage('testKey')).toBe('');
    });
  });

  describe('getGuess', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          LocalStorageService,
          { provide: PLATFORM_ID, useValue: 'browser' },
        ],
      });
      service = TestBed.inject(LocalStorageService);
    });

    it('should return default guess if nothing is stored', () => {
      spyOn(service, 'getLocalStorage').and.returnValue(null);
      expect(service.getGuess()).toEqual({
        guesses: {
          japan: [],
          global: [],
        },
        doy: -1,
        lastList: DEFAULT_STUDENT_LIST,
      });
    });

    it('should return stored guess if available', () => {
      const mockGuess: GuessCookie = {
        guesses: {
          japan: ['example'],
          global: ['example'],
        },
        doy: 5,
        lastList: DEFAULT_STUDENT_LIST,
      };
      spyOn(service, 'getLocalStorage').and.returnValue(
        JSON.stringify(mockGuess)
      );
      expect(service.getGuess()).toEqual(mockGuess);
    });
  });
});
