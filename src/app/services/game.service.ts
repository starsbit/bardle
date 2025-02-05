import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, ReplaySubject, Subscription } from 'rxjs';
import { RULES } from '../constants/rules';
import { Student } from '../models/student';
import { StudentList } from '../models/student-list';
import { StudentListService } from './student-list.service';
import { StudentService } from './student.service';

@Injectable({
  providedIn: 'root',
})
export class GameService implements OnDestroy {
  private readonly subscriptions = new Subscription();
  private readonly guessesChanged = new ReplaySubject<Student[]>(1);
  private readonly answerChanged = new ReplaySubject<void>(1);
  private guesses: { [key in StudentList]: Student[] } =
    this.initializeGuesses();
  private currentList: StudentList = StudentList.JAPAN;
  private answer: Student | null = null;
  private readonly resultUpdates = new BehaviorSubject<GameResult>({});
  private result: GameResult = {};

  constructor(
    private readonly studentListService: StudentListService,
    private readonly studentService: StudentService
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
  }

  addGuess(student: Student) {
    if (this.guesses[this.currentList].length < RULES.MAX_GUESSES) {
      this.guesses[this.currentList].push(student);
      if (student === this.answer) {
        this.result[this.currentList] = { won: true };
        this.resultUpdates.next(this.result);
      }
      this.guessesChanged.next(this.guesses[this.currentList]);
    } else {
      this.result[this.currentList] = { lost: true };
      this.resultUpdates.next(this.result);
    }
  }

  getGuesses(): Student[] {
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

  private initializeGuesses(): { [key in StudentList]: Student[] } {
    const guesses: { [key in StudentList]: Student[] } = {} as {
      [key in StudentList]: Student[];
    };
    Object.values(StudentList).forEach((list) => {
      guesses[list] = [];
    });
    return guesses;
  }
}

export interface GameResult {
  [id: string]: {
    won?: boolean;
    lost?: boolean;
  };
}
