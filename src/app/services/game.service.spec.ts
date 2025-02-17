import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { RULES } from '../constants/rules';
import { GuessCookie } from '../models/cookie';
import { DEFAULT_STUDENT_LIST, StudentList } from '../models/student-list';
import { getStudentListTestData } from '../utils/test-data-utils';
import { GameService } from './game.service';
import { LocalStorageService } from './local-storage.service';
import { StudentService } from './student.service';

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
});
