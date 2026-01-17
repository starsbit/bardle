import { Injectable, inject } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { RULES } from '../constants/rules';
import { GuessCookie } from '../models/cookie';
import { GameAnswer, GameResult, GameState } from '../models/game';
import { StudentListData } from '../models/student';
import { DEFAULT_STUDENT_LIST, StudentList } from '../models/student-list';
import {
  getCurrentUTCDateNoTime as getCurrentUTCDateNoTimeUtil,
  getDayOfYear as getDayOfYearUtil,
} from '../utils/date-utils';
import { LocalStorageService } from './local-storage.service';
import { StudentService } from './student.service';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private readonly localStorage = inject(LocalStorageService);
  private readonly studentService = inject(StudentService);

  private gameState: GameState | null = null;
  private isInitialized = false;
  private infiniteMode = false;
  private readonly gameStateChange = new ReplaySubject<GameState>(1);

  constructor() {
    this.initializeGameState();
  }

  private getCurrentUTCDateNoTime(): Date {
    return getCurrentUTCDateNoTimeUtil();
  }

  private getCurrentDayOfYear(date: Date = this.getCurrentUTCDateNoTime()): number {
    return getDayOfYearUtil(date);
  }

  getGameState() {
    return this.gameState;
  }

  $gameStateChange() {
    return this.gameStateChange.asObservable();
  }

  refresh() {
    this.initializeGameState();
  }

  setGuess(guesses: GuessCookie) {
    if (this.gameState === null || !this.isInitialized) {
      return;
    }
    if (!this.infiniteMode) {
      this.localStorage.setGuess(guesses);
    }
    this.gameState = {
      ...this.gameState,
      guesses: guesses,
      result: this.createInitialGameResult(guesses, this.gameState.answer),
    };
    this.gameStateChange.next(this.gameState);
  }

  setActiveList(list: StudentList) {
    if (this.gameState === null || !this.isInitialized) {
      return;
    }
    const guess = this.localStorage.getGuess();
    guess.lastList = list;
    this.localStorage.setGuess(guess);
    this.gameState = {
      ...this.gameState,
      activeList: list,
    };
    this.gameStateChange.next(this.gameState);
  }

  setResult(result: GameResult) {
    if (this.gameState === null || !this.isInitialized) {
      return;
    }
    this.gameState = {
      ...this.gameState,
      result,
    };
    this.gameStateChange.next(this.gameState);
  }

  setInfiniteMode(infiniteMode: boolean) {
    this.infiniteMode = infiniteMode;
    this.initializeGameState();
  }

  addGuess(guess: string) {
    if (this.gameState === null || !this.isInitialized) {
      return;
    }
    if (
      this.gameState.result[this.gameState.activeList].won ||
      this.gameState.result[this.gameState.activeList].lost
    ) {
      return;
    }
    const guesses = { ...this.gameState.guesses };
    guesses.guesses[this.gameState.activeList].push(guess);
    this.setGuess(guesses);
    if (guess === this.gameState.answer[this.gameState.activeList]) {
      if (!this.infiniteMode) {
        this.updateStreakOnWin(this.gameState.activeList);
      }
      this.setResult({
        ...this.gameState.result,
        [this.gameState.activeList]: {
          won: true,
          ...this.gameState.result[this.gameState.activeList],
        },
      });
    } else if (
      guesses.guesses[this.gameState.activeList].length >= RULES.MAX_GUESSES
    ) {
      if (!this.infiniteMode) {
        this.updateStreakOnLoss(this.gameState.activeList);
      }
      this.setResult({
        ...this.gameState.result,
        [this.gameState.activeList]: {
          lost: true,
          ...this.gameState.result[this.gameState.activeList],
        },
      });
    }
  }

  getCurrentGuesses() {
    if (this.gameState === null) {
      return;
    }
    return this.gameState.guesses.guesses[this.gameState.activeList];
  }

  getCurrentList() {
    if (this.gameState === null) {
      return;
    }
    return this.gameState.activeList;
  }

  getCurrentStudentData() {
    if (this.gameState === null) {
      return;
    }
    return this.gameState.students[this.gameState.activeList];
  }

  getCurrentResult() {
    if (this.gameState === null) {
      return;
    }
    return this.gameState.result[this.gameState.activeList];
  }

  getCurrentAnswer() {
    if (this.gameState === null) {
      return;
    }
    return this.gameState.answer[this.gameState.activeList];
  }

  getYesterdaysStudent() {
    if (this.gameState === null) {
      return;
    }
    return this.gameState.yesterdayAnswer[this.gameState.activeList];
  }

  getTodaysStudent() {
    if (this.gameState === null) {
      return;
    }
    return this.gameState.answer[this.gameState.activeList];
  }

  getInfiniteMode() {
    return this.infiniteMode;
  }

  getCurrentStreak(): number {
    if (this.gameState === null || this.infiniteMode) {
      return 0;
    }
    const streakData = this.localStorage.getStreakForList(this.gameState.activeList);
    const currentDate = this.getCurrentUTCDateNoTime();
    const currentYear = currentDate.getUTCFullYear();
    const currentDoy = this.getCurrentDayOfYear(currentDate);

    if (
      streakData.lastWinYear === currentYear &&
      streakData.lastWinDoy === currentDoy
    ) {
      return streakData.count;
    }

    if (
      this.isConsecutiveDay(
        streakData.lastWinDoy,
        streakData.lastWinYear,
        currentDoy,
        currentYear
      )
    ) {
      return streakData.count;
    }

    return 0;
  }

  private isConsecutiveDay(
    prevDoy: number,
    prevYear: number,
    currentDoy: number,
    currentYear: number
  ): boolean {
    if (prevDoy < 0 || prevYear < 0) {
      return false;
    }
    if (prevYear === currentYear) {
      return currentDoy - prevDoy === 1;
    }
    if (prevYear === currentYear - 1 && currentDoy === 1) {
      const lastDayOfPrevYear = this.getDaysInYear(prevYear);
      // Allow a 1-day tolerance because storing DOY via UTC dates can shift by a day for negative timezones.
      return (
        prevDoy === lastDayOfPrevYear ||
        prevDoy === lastDayOfPrevYear - 1
      );
    }
    return false;
  }

  private getDaysInYear(year: number): number {
    return ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) ? 366 : 365;
  }

  private updateStreakOnWin(list: StudentList): void {
    const streakData = this.localStorage.getStreakForList(list);
    const currentDate = this.getCurrentUTCDateNoTime();
    const currentYear = currentDate.getUTCFullYear();
    const currentDoy = this.getCurrentDayOfYear(currentDate);

    if (streakData.lastWinDoy === currentDoy && streakData.lastWinYear === currentYear) {
      return;
    }

    if (
      this.isConsecutiveDay(
        streakData.lastWinDoy,
        streakData.lastWinYear,
        currentDoy,
        currentYear
      )
    ) {
      this.localStorage.setStreakForList(list, {
        count: streakData.count + 1,
        lastWinDoy: currentDoy,
        lastWinYear: currentYear,
      });
    } else {
      this.localStorage.setStreakForList(list, {
        count: 1,
        lastWinDoy: currentDoy,
        lastWinYear: currentYear,
      });
    }
  }

  private updateStreakOnLoss(list: StudentList): void {
    const currentDate = this.getCurrentUTCDateNoTime();
    const currentYear = currentDate.getUTCFullYear();
    const currentDoy = this.getCurrentDayOfYear(currentDate);
    this.localStorage.setStreakForList(list, {
      count: 0,
      lastWinDoy: currentDoy,
      lastWinYear: currentYear,
    });
  }

  private initializeGameState() {
    const populatedGuess = this.createInitialGuess();
    const guesses = this.getInfiniteMode()
      ? this.createEmptyGuess()
      : populatedGuess;
    const activeList = this.createInitialListSelection();

    this.createStudentData().subscribe((students) => {
      const answer = this.createInitialGameAnswer(students);
      const yesterdayAnswer = this.createInitialYesterdayAnswer(students);
      const result = this.createInitialGameResult(guesses, answer);
      this.gameState = {
        guesses,
        answer,
        result,
        yesterdayAnswer,
        students,
        activeList,
      };
      this.gameStateChange.next(this.gameState);
      this.isInitialized = true;
    });
  }

  private createInitialGuess() {
    const guess = this.localStorage.getGuess();
    const currentDoy = this.getCurrentDayOfYear();

    if (!guess || guess.doy !== currentDoy) {
      const lastList = guess ? guess.lastList : undefined;
      const emptyGuess = this.createEmptyGuess(lastList, currentDoy);
      this.localStorage.setGuess(emptyGuess);
      return emptyGuess;
    }
    return guess;
  }

  private createEmptyGuess(lastList?: StudentList, doy?: number) {
    const currentDoy = doy ?? this.getCurrentDayOfYear();
    return {
      guesses: {
        japan: [],
        global: [],
      },
      doy: currentDoy,
      lastList: lastList ?? this.createInitialListSelection(),
    };
  }

  private createInitialGameResult(guess: GuessCookie, gameAnswer: GameAnswer) {
    const gameResult: GameResult = {};
    for (const list in Object.keys(gameAnswer)) {
      const listEnum = list as StudentList;
      if (Object.prototype.hasOwnProperty.call(gameAnswer, listEnum)) {
        const guesses: string[] = guess.guesses[listEnum];
        const lost = guesses.length >= RULES.MAX_GUESSES;
        gameResult[listEnum] = {
          won: guesses.includes(gameAnswer[listEnum]),
          lost: lost,
        };
      }
    }
    let guesses: string[] = guess.guesses[StudentList.JAPAN];
    let lost = guesses.length >= RULES.MAX_GUESSES;
    let won = guesses.includes(gameAnswer[StudentList.JAPAN]);
    gameResult[StudentList.JAPAN] = {
      won: won,
      lost: lost,
    };
    guesses = guess.guesses[StudentList.GLOBAL];
    lost = guesses.length >= RULES.MAX_GUESSES;
    won = guesses.includes(gameAnswer[StudentList.GLOBAL]);
    gameResult[StudentList.GLOBAL] = {
      won: won,
      lost: lost,
    };
    return gameResult;
  }

  private createInitialGameAnswer(studentData: StudentListData) {
    if (this.infiniteMode) {
      const todaysStudents: GameAnswer = {};
      todaysStudents[StudentList.JAPAN] = this.studentService.getRandomStudent(
        studentData[StudentList.JAPAN]
      ).id;
      todaysStudents[StudentList.GLOBAL] = this.studentService.getRandomStudent(
        studentData[StudentList.GLOBAL]
      ).id;
      return todaysStudents;
    }
    const todaysStudents: GameAnswer = {};
    todaysStudents[StudentList.JAPAN] = this.studentService.getTodaysStudent(
      studentData[StudentList.JAPAN]
    ).id;
    todaysStudents[StudentList.GLOBAL] = this.studentService.getTodaysStudent(
      studentData[StudentList.GLOBAL]
    ).id;
    return todaysStudents;
  }

  private createInitialYesterdayAnswer(studentData: StudentListData) {
    const yesterdaysStudents: GameAnswer = {};
    yesterdaysStudents[StudentList.JAPAN] =
      this.studentService.getYesterdaysStudent(
        studentData[StudentList.JAPAN]
      ).id;
    yesterdaysStudents[StudentList.GLOBAL] =
      this.studentService.getYesterdaysStudent(
        studentData[StudentList.GLOBAL]
      ).id;
    return yesterdaysStudents;
  }

  private createInitialListSelection() {
    const guess = this.localStorage.getGuess() ?? { lastList: null };
    return guess.lastList ?? DEFAULT_STUDENT_LIST;
  }

  private createStudentData() {
    return this.studentService.getStudentData();
  }
}
