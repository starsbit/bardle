import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { GuessCookie, StreakCookie, StreakData } from '../models/cookie';
import { DEFAULT_STUDENT_LIST, StudentList } from '../models/student-list';
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

  describe('getStreak', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          LocalStorageService,
          { provide: PLATFORM_ID, useValue: 'browser' },
        ],
      });
      service = TestBed.inject(LocalStorageService);
    });

    it('should return default empty streak cookie if nothing is stored', () => {
      spyOn(service, 'getLocalStorage').and.returnValue(null);
      expect(service.getStreak()).toEqual({ streaks: {} });
    });

    it('should return stored streak cookie if available', () => {
      const mockStreak: StreakCookie = {
        streaks: {
          japan: { count: 5, lastWinDoy: 100, lastWinYear: 2025 },
          global: { count: 3, lastWinDoy: 99, lastWinYear: 2025 },
        },
      };
      spyOn(service, 'getLocalStorage').and.returnValue(
        JSON.stringify(mockStreak)
      );
      expect(service.getStreak()).toEqual(mockStreak);
    });

    it('should handle legacy localStorage without streak field', () => {
      spyOn(service, 'getLocalStorage').and.returnValue(null);
      const result = service.getStreak();
      expect(result).toEqual({ streaks: {} });
    });
  });

  describe('setStreak', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          LocalStorageService,
          { provide: PLATFORM_ID, useValue: 'browser' },
        ],
      });
      service = TestBed.inject(LocalStorageService);
    });

    it('should save streak cookie to localStorage', () => {
      spyOn(service, 'setLocalStorage');
      const mockStreak: StreakCookie = {
        streaks: {
          japan: { count: 5, lastWinDoy: 100, lastWinYear: 2025 },
        },
      };
      service.setStreak(mockStreak);
      expect(service.setLocalStorage).toHaveBeenCalledWith(
        'streaks',
        JSON.stringify(mockStreak)
      );
    });
  });

  describe('getStreakForList', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          LocalStorageService,
          { provide: PLATFORM_ID, useValue: 'browser' },
        ],
      });
      service = TestBed.inject(LocalStorageService);
    });

    it('should return default streak data if list not present', () => {
      spyOn(service, 'getStreak').and.returnValue({ streaks: {} });
      const result = service.getStreakForList(StudentList.JAPAN);
      expect(result).toEqual({ count: 0, lastWinDoy: -1, lastWinYear: -1 });
    });

    it('should return streak data for specific list', () => {
      const japanStreak: StreakData = { count: 7, lastWinDoy: 150, lastWinYear: 2025 };
      spyOn(service, 'getStreak').and.returnValue({
        streaks: { japan: japanStreak },
      });
      const result = service.getStreakForList(StudentList.JAPAN);
      expect(result).toEqual(japanStreak);
    });

    it('should return default for one list while another has data', () => {
      const globalStreak: StreakData = { count: 3, lastWinDoy: 50, lastWinYear: 2025 };
      spyOn(service, 'getStreak').and.returnValue({
        streaks: { global: globalStreak },
      });
      const japanResult = service.getStreakForList(StudentList.JAPAN);
      const globalResult = service.getStreakForList(StudentList.GLOBAL);
      expect(japanResult).toEqual({ count: 0, lastWinDoy: -1, lastWinYear: -1 });
      expect(globalResult).toEqual(globalStreak);
    });
  });

  describe('setStreakForList', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          LocalStorageService,
          { provide: PLATFORM_ID, useValue: 'browser' },
        ],
      });
      service = TestBed.inject(LocalStorageService);
    });

    it('should update streak for specific list', () => {
      const existingStreak: StreakCookie = {
        streaks: { global: { count: 2, lastWinDoy: 40, lastWinYear: 2025 } },
      };
      spyOn(service, 'getStreak').and.returnValue(existingStreak);
      spyOn(service, 'setStreak');

      const newJapanStreak: StreakData = { count: 1, lastWinDoy: 45, lastWinYear: 2025 };
      service.setStreakForList(StudentList.JAPAN, newJapanStreak);

      expect(service.setStreak).toHaveBeenCalledWith({
        streaks: {
          global: { count: 2, lastWinDoy: 40, lastWinYear: 2025 },
          japan: newJapanStreak,
        },
      });
    });

    it('should overwrite existing streak for list', () => {
      const existingStreak: StreakCookie = {
        streaks: { japan: { count: 5, lastWinDoy: 100, lastWinYear: 2025 } },
      };
      spyOn(service, 'getStreak').and.returnValue(existingStreak);
      spyOn(service, 'setStreak');

      const updatedStreak: StreakData = { count: 6, lastWinDoy: 101, lastWinYear: 2025 };
      service.setStreakForList(StudentList.JAPAN, updatedStreak);

      expect(service.setStreak).toHaveBeenCalledWith({
        streaks: { japan: updatedStreak },
      });
    });
  });
});
