import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, ReplaySubject, Subscription } from 'rxjs';
import { RULES } from '../constants/rules';
import { Student } from '../models/student';
import { StudentList } from '../models/student-list';
import { LocalStorage } from './local-storage.service';
import { StudentListService } from './student-list.service';
import { StudentService } from './student.service';

@Injectable({
  providedIn: 'root',
})
export class GameService implements OnDestroy {
  private readonly subscriptions = new Subscription();
  private readonly guessesChanged = new ReplaySubject<string[]>(1);
  private readonly answerChanged = new ReplaySubject<void>(1);
  private guesses: { [key in StudentList]: string[] } =
    this.initializeGuesses();
  private currentList: StudentList = StudentList.JAPAN;
  private answer: Student | null = null;
  private readonly resultUpdates = new BehaviorSubject<GameResult>({});
  private result: GameResult = {};

  private readonly doy = Math.floor(
    (new Date().getTime() -
      new Date(new Date().getFullYear(), 0, 0).getTime()) /
      86400000
  );

  constructor(
    private readonly studentListService: StudentListService,
    private readonly studentService: StudentService,
    private readonly localStorage: LocalStorage
  ) {
    this.subscriptions.add(
      this.studentListService.$studentListChange().subscribe((studentList) => {
        this.currentList = studentList;
        this.guessesChanged.next(this.guesses[this.currentList]);
      })
    );
    this.subscriptions.add(
      this.studentService.$studentListChange().subscribe(() => {
        this.answer = this.studentService.getTodaysStudent();
        console.log('GameService: answer changed', this.answer);
        this.answerChanged.next();
      })
    );
    this.handleInitialCookieGuesses();
  }

  addGuess(student: Student) {
    if (this.guesses[this.currentList].length >= RULES.MAX_GUESSES) {
      return;
    }
    this.guesses[this.currentList].push(student.id);
    if (student === this.answer) {
      this.result[this.currentList] = { won: true };
      this.resultUpdates.next(this.result);
    }
    this.guessesChanged.next(this.guesses[this.currentList]);
    if (this.guesses[this.currentList].length >= RULES.MAX_GUESSES) {
      this.result[this.currentList] = { lost: true };
      this.resultUpdates.next(this.result);
    }
    this.localStorage.setGuess({
      doy: this.doy,
      guesses: this.guesses,
    });
  }

  getGuesses(): string[] {
    return this.guesses[this.currentList];
  }

  getGuessCount(): number {
    return this.guesses[this.currentList].length;
  }

  getAnswer(): Student | null {
    return this.answer;
  }

  getCurrentResult(): GameResult {
    return this.result;
  }

  getCurrentListResult(): { won?: boolean; lost?: boolean } {
    return this.result[this.currentList] || {};
  }

  $guessesChanged() {
    return this.guessesChanged.asObservable();
  }

  $answerChanged() {
    return this.answerChanged.asObservable();
  }

  $resultUpdates() {
    return this.resultUpdates.asObservable();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  private initializeGuesses(): { [key in StudentList]: string[] } {
    const guesses: { [key in StudentList]: string[] } = {} as {
      [key in StudentList]: string[];
    };
    Object.values(StudentList).forEach((list) => {
      guesses[list] = [];
    });
    return guesses;
  }

  private handleInitialCookieGuesses() {
    const guessCookie = this.localStorage.getGuess();

    if (guessCookie.doy !== this.doy) {
      this.localStorage.setGuess({
        doy: this.doy,
        guesses: {
          japan: [],
          global: [],
        },
      });
    } else {
      this.guesses = guessCookie.guesses;
      this.guessesChanged.next(this.guesses[this.currentList]);
    }
  }
}

export interface GameResult {
  [id: string]: {
    won?: boolean;
    lost?: boolean;
  };
}
