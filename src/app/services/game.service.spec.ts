import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { RULES } from '../constants/rules';
import { GuessCookie, StreakData } from '../models/cookie';
import { DEFAULT_STUDENT_LIST, StudentList } from '../models/student-list';
import { getStudentListTestData } from '../utils/test-data-utils';
import { GameService } from './game.service';
import { LocalStorageService } from './local-storage.service';
import { StudentService } from './student.service';
import * as dateUtils from '../utils/date-utils';

describe('GameService', () => {
  let service: GameService;
  let localStorageSpy: jasmine.SpyObj<LocalStorageService>;
  let studentServiceSpy: jasmine.SpyObj<StudentService>;

  const studentOfTheDay = getStudentListTestData()[StudentList.GLOBAL]['Aru'];
  const studentOfYesterday =
    getStudentListTestData()[StudentList.GLOBAL]['Hina'];

  beforeEach(() => {
    localStorageSpy = jasmine.createSpyObj('LocalStorageService', [
      'getGuess',
      'setGuess',
      'getStreakForList',
      'setStreakForList',
    ]);
    studentServiceSpy = jasmine.createSpyObj('StudentService', [
      'getStudentData',
      'getTodaysStudent',
      'getYesterdaysStudent',
    ]);

    localStorageSpy.getGuess.and.returnValue({
      guesses: {
        japan: [],
        global: [],
      },
      doy: -1,
      lastList: DEFAULT_STUDENT_LIST,
    });

    localStorageSpy.getStreakForList.and.returnValue({
      count: 0,
      lastWinDoy: -1,
      lastWinYear: -1,
    });

    studentServiceSpy.getStudentData.and.returnValue(
      of(getStudentListTestData())
    );

    studentServiceSpy.getTodaysStudent.and.returnValue(studentOfTheDay);

    studentServiceSpy.getYesterdaysStudent.and.returnValue(studentOfYesterday);

    TestBed.configureTestingModule({
      providers: [
        GameService,
        { provide: LocalStorageService, useValue: localStorageSpy },
        { provide: StudentService, useValue: studentServiceSpy },
      ],
    });

    service = TestBed.inject(GameService);
  });

  describe('with no previous game state present', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should get default game state', () => {
      const gameState = service.getGameState();
      expect(gameState?.answer).toEqual({
        japan: studentOfTheDay.id,
        global: studentOfTheDay.id,
      });
      expect(gameState?.activeList).toEqual(DEFAULT_STUDENT_LIST);
      expect(gameState?.yesterdayAnswer).toEqual({
        japan: studentOfYesterday.id,
        global: studentOfYesterday.id,
      });
      expect(gameState?.students).toEqual(getStudentListTestData());
      expect(gameState?.guesses).toEqual({
        guesses: {
          japan: [],
          global: [],
        },
        doy: jasmine.any(Number),
        lastList: DEFAULT_STUDENT_LIST,
      });
      expect(gameState?.result).toEqual({
        japan: { won: false, lost: false },
        global: { won: false, lost: false },
      });
    });

    it('should initialize game state', () => {
      expect(service.getGameState()).toBeTruthy();
      expect(localStorageSpy.setGuess).toHaveBeenCalled();
    });

    it('should set a guess and update game state', () => {
      const guess: GuessCookie = {
        guesses: { japan: ['test'], global: [] },
        doy: 1,
        lastList: StudentList.JAPAN,
      };
      service.setGuess(guess);
      expect(localStorageSpy.setGuess).toHaveBeenCalledWith(guess);
    });

    it('should add a guess', () => {
      spyOn(service, 'setGuess');
      spyOn(service, 'setResult');
      service.addGuess('test');
      expect(service.setGuess).toHaveBeenCalled();
      expect(service.getCurrentGuesses()).toEqual(['test']);
    });

    it('should trigger lost condition if max guesses are exceeded', () => {
      const guess: GuessCookie = {
        guesses: {
          japan: Array(RULES.MAX_GUESSES).fill('wrong'),
          global: [],
        },
        doy: 1,
        lastList: StudentList.JAPAN,
      };
      spyOn(service, 'setResult');
      service.setGuess(guess);
      expect(service.getCurrentResult()).toEqual({ won: false, lost: true });
    });

    it('should trigger won condition if guess is correct', () => {
      spyOn(service, 'setResult');
      service.addGuess(studentOfTheDay.id);
      expect(service.getCurrentResult()).toEqual({ won: true, lost: false });
    });

    it('should get current guesses', () => {
      service.addGuess('test');
      expect(service.getCurrentGuesses()).toEqual(['test']);
    });

    it('should get current result', () => {
      service.addGuess(studentOfTheDay.id);
      expect(service.getCurrentResult()).toEqual({ won: true, lost: false });
    });

    it('should get current student', () => {
      expect(service.getCurrentAnswer()).toEqual(studentOfTheDay.id);
    });

    it('should send game state change', () => {
      spyOn(service['gameStateChange'], 'next');
      service.addGuess('test');
      expect(service['gameStateChange'].next).toHaveBeenCalled();
      service.setActiveList(StudentList.GLOBAL);
      expect(service['gameStateChange'].next).toHaveBeenCalled();
      service.setGuess({
        guesses: { japan: [], global: [] },
        doy: 1,
        lastList: StudentList.JAPAN,
      });
      expect(service['gameStateChange'].next).toHaveBeenCalled();
      service.setResult({
        japan: { won: false, lost: false },
        global: { won: false, lost: false },
      });
      expect(service['gameStateChange'].next).toHaveBeenCalled();
    });

    it('should get yesterdays student', () => {
      expect(service.getYesterdaysStudent()).toEqual(studentOfYesterday.id);
    });

    it('should get todays student', () => {
      expect(service.getTodaysStudent()).toEqual(studentOfTheDay.id);
    });
  });

  describe('streak functionality', () => {
    describe('getCurrentStreak', () => {
      it('should return 0 in infinite mode', () => {
        service.setInfiniteMode(true);
        localStorageSpy.getStreakForList.and.returnValue({
          count: 5,
          lastWinDoy: 100,
          lastWinYear: 2025,
        });
        expect(service.getCurrentStreak()).toBe(0);
      });

      it('should return streak count for valid consecutive streak', () => {
        const currentDate = new Date('2025-04-15');
        spyOn(dateUtils, 'getCurrentUTCDateNoTime').and.returnValue(currentDate);
        const currentDoy = dateUtils.getDayOfYear(currentDate);

        localStorageSpy.getStreakForList.and.returnValue({
          count: 5,
          lastWinDoy: currentDoy,
          lastWinYear: 2025,
        });

        expect(service.getCurrentStreak()).toBe(5);
      });

      it('should return 0 for stale streak (missed more than one day)', () => {
        const currentDate = new Date('2025-04-15');
        spyOn(dateUtils, 'getCurrentUTCDateNoTime').and.returnValue(currentDate);
        const currentDoy = dateUtils.getDayOfYear(currentDate);

        localStorageSpy.getStreakForList.and.returnValue({
          count: 5,
          lastWinDoy: currentDoy - 3,
          lastWinYear: 2025,
        });

        expect(service.getCurrentStreak()).toBe(0);
      });

      it('should return streak for yesterday win (still valid)', () => {
        const currentDate = new Date('2025-04-15');
        spyOn(dateUtils, 'getCurrentUTCDateNoTime').and.returnValue(currentDate);
        const currentDoy = dateUtils.getDayOfYear(currentDate);

        localStorageSpy.getStreakForList.and.returnValue({
          count: 3,
          lastWinDoy: currentDoy - 1,
          lastWinYear: 2025,
        });

        expect(service.getCurrentStreak()).toBe(3);
      });

      it('should return 0 for very old year', () => {
        const currentDate = new Date('2025-04-15');
        spyOn(dateUtils, 'getCurrentUTCDateNoTime').and.returnValue(currentDate);

        localStorageSpy.getStreakForList.and.returnValue({
          count: 10,
          lastWinDoy: 100,
          lastWinYear: 2023,
        });

        expect(service.getCurrentStreak()).toBe(0);
      });

      it('should handle year boundary - Dec 31 to Jan 1', () => {
        const currentDate = new Date('2025-01-01');
        spyOn(dateUtils, 'getCurrentUTCDateNoTime').and.returnValue(currentDate);

        localStorageSpy.getStreakForList.and.returnValue({
          count: 7,
          lastWinDoy: 365,
          lastWinYear: 2024,
        });

        expect(service.getCurrentStreak()).toBe(7);
      });

      it('should return 0 for previous year but not last day', () => {
        const currentDate = new Date('2025-01-01');
        spyOn(dateUtils, 'getCurrentUTCDateNoTime').and.returnValue(currentDate);

        localStorageSpy.getStreakForList.and.returnValue({
          count: 7,
          lastWinDoy: 360,
          lastWinYear: 2024,
        });

        expect(service.getCurrentStreak()).toBe(0);
      });
    });

    describe('updateStreakOnWin', () => {
      it('should increment streak for consecutive day win', () => {
        const currentDate = new Date('2025-04-15');
        spyOn(dateUtils, 'getCurrentUTCDateNoTime').and.returnValue(currentDate);
        const currentDoy = dateUtils.getDayOfYear(currentDate);

        localStorageSpy.getStreakForList.and.returnValue({
          count: 3,
          lastWinDoy: currentDoy - 1,
          lastWinYear: 2025,
        });

        service.addGuess(studentOfTheDay.id);

        expect(localStorageSpy.setStreakForList).toHaveBeenCalledWith(
          StudentList.JAPAN,
          jasmine.objectContaining({ count: 4 })
        );
      });

      it('should reset streak to 1 for win after missed days', () => {
        const currentDate = new Date('2025-04-15');
        spyOn(dateUtils, 'getCurrentUTCDateNoTime').and.returnValue(currentDate);
        const currentDoy = dateUtils.getDayOfYear(currentDate);

        localStorageSpy.getStreakForList.and.returnValue({
          count: 10,
          lastWinDoy: currentDoy - 5,
          lastWinYear: 2025,
        });

        service.addGuess(studentOfTheDay.id);

        expect(localStorageSpy.setStreakForList).toHaveBeenCalledWith(
          StudentList.JAPAN,
          jasmine.objectContaining({ count: 1 })
        );
      });

      it('should not update streak if already won today', () => {
        const currentDate = new Date('2025-04-15');
        spyOn(dateUtils, 'getCurrentUTCDateNoTime').and.returnValue(currentDate);
        const currentDoy = dateUtils.getDayOfYear(currentDate);

        localStorageSpy.getStreakForList.and.returnValue({
          count: 5,
          lastWinDoy: currentDoy,
          lastWinYear: 2025,
        });

        service.addGuess(studentOfTheDay.id);

        expect(localStorageSpy.setStreakForList).not.toHaveBeenCalled();
      });

      it('should not update streak in infinite mode', () => {
        service.setInfiniteMode(true);

        localStorageSpy.getStreakForList.and.returnValue({
          count: 3,
          lastWinDoy: 100,
          lastWinYear: 2025,
        });

        service.addGuess(studentOfTheDay.id);

        expect(localStorageSpy.setStreakForList).not.toHaveBeenCalled();
      });

      it('should handle year boundary win (Dec 31 -> Jan 1)', () => {
        const currentDate = new Date('2025-01-01');
        spyOn(dateUtils, 'getCurrentUTCDateNoTime').and.returnValue(currentDate);

        localStorageSpy.getStreakForList.and.returnValue({
          count: 5,
          lastWinDoy: 365,
          lastWinYear: 2024,
        });

        service.addGuess(studentOfTheDay.id);

        expect(localStorageSpy.setStreakForList).toHaveBeenCalledWith(
          StudentList.JAPAN,
          jasmine.objectContaining({ count: 6, lastWinYear: 2025 })
        );
      });
    });

    describe('updateStreakOnLoss', () => {
      it('should reset streak to 0 on loss', () => {
        const currentDate = new Date('2025-04-15');
        spyOn(dateUtils, 'getCurrentUTCDateNoTime').and.returnValue(currentDate);

        localStorageSpy.getStreakForList.and.returnValue({
          count: 10,
          lastWinDoy: 100,
          lastWinYear: 2025,
        });

        for (let i = 0; i < RULES.MAX_GUESSES; i++) {
          service.addGuess('wrong_guess');
        }

        expect(localStorageSpy.setStreakForList).toHaveBeenCalledWith(
          StudentList.JAPAN,
          jasmine.objectContaining({ count: 0 })
        );
      });

      it('should not reset streak in infinite mode on loss', () => {
        service.setInfiniteMode(true);

        for (let i = 0; i < RULES.MAX_GUESSES; i++) {
          service.addGuess('wrong_guess');
        }

        expect(localStorageSpy.setStreakForList).not.toHaveBeenCalled();
      });
    });

    describe('getDaysInYear (via getCurrentStreak logic)', () => {
      it('should handle leap year correctly (366 days)', () => {
        const currentDate = new Date('2025-01-01');
        spyOn(dateUtils, 'getCurrentUTCDateNoTime').and.returnValue(currentDate);

        localStorageSpy.getStreakForList.and.returnValue({
          count: 5,
          lastWinDoy: 366,
          lastWinYear: 2024,
        });

        expect(service.getCurrentStreak()).toBe(5);
      });

      it('should handle non-leap year correctly (365 days)', () => {
        const currentDate = new Date('2026-01-01');
        spyOn(dateUtils, 'getCurrentUTCDateNoTime').and.returnValue(currentDate);

        localStorageSpy.getStreakForList.and.returnValue({
          count: 5,
          lastWinDoy: 365,
          lastWinYear: 2025,
        });

        expect(service.getCurrentStreak()).toBe(5);
      });
    });

    describe('streak per list isolation', () => {
      it('should track streaks separately for japan and global lists', () => {
        const currentDate = new Date('2025-04-15');
        spyOn(dateUtils, 'getCurrentUTCDateNoTime').and.returnValue(currentDate);
        const currentDoy = dateUtils.getDayOfYear(currentDate);

        const japanStreak: StreakData = { count: 5, lastWinDoy: currentDoy - 1, lastWinYear: 2025 };
        const globalStreak: StreakData = { count: 2, lastWinDoy: currentDoy - 1, lastWinYear: 2025 };

        localStorageSpy.getStreakForList.and.callFake((list: StudentList) => {
          return list === StudentList.JAPAN ? japanStreak : globalStreak;
        });

        service.addGuess(studentOfTheDay.id);

        expect(localStorageSpy.setStreakForList).toHaveBeenCalledWith(
          StudentList.JAPAN,
          jasmine.objectContaining({ count: 6 })
        );
      });
    });

    describe('streak update timing', () => {
      it('should update streak before notifying state change on win', () => {
        const currentDate = new Date('2025-04-15');
        spyOn(dateUtils, 'getCurrentUTCDateNoTime').and.returnValue(currentDate);
        const currentDoy = dateUtils.getDayOfYear(currentDate);

        localStorageSpy.getStreakForList.and.returnValue({
          count: 3,
          lastWinDoy: currentDoy - 1,
          lastWinYear: 2025,
        });

        let streakAtNotification = -1;
        service.$gameStateChange().subscribe(() => {
          if (service.getCurrentResult()?.won) {
            localStorageSpy.getStreakForList.and.returnValue({
              count: 4,
              lastWinDoy: currentDoy,
              lastWinYear: 2025,
            });
            streakAtNotification = service.getCurrentStreak();
          }
        });

        service.addGuess(studentOfTheDay.id);

        expect(streakAtNotification).toBe(4);
      });
    });
  });
});
