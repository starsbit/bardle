import { Injectable, OnDestroy } from '@angular/core';
import { ReplaySubject, Subscription } from 'rxjs';
import { RULES } from '../constants/rules';
import { Student } from '../models/student';
import { StudentList } from '../models/student-list';
import { StudentListService } from './student-list.service';

@Injectable({
  providedIn: 'root',
})
export class GameService implements OnDestroy {
  private readonly subscriptions = new Subscription();
  private readonly guessesChanged = new ReplaySubject<Student[]>(1);
  private guesses: { [key in StudentList]: Student[] } =
    this.initializeGuesses();
  private currentList: StudentList = StudentList.JAPAN;

  constructor(private readonly studentListService: StudentListService) {
    this.subscriptions.add(
      this.studentListService.$studentListChange().subscribe((studentList) => {
        this.currentList = studentList;
        this.guessesChanged.next(this.guesses[this.currentList]);
      })
    );
  }

  addGuess(student: Student) {
    if (this.guesses[this.currentList].length < RULES.MAX_GUESSES) {
      this.guesses[this.currentList].push(student);
      this.guessesChanged.next(this.guesses[this.currentList]);
    } else {
      console.warn(
        `Maximum number of guesses (${RULES.MAX_GUESSES}) reached for ${this.currentList}`
      );
    }
  }

  getGuesses(): Student[] {
    return this.guesses[this.currentList];
  }

  getGuessCount(): number {
    return this.guesses[this.currentList].length;
  }

  $guessesChanged() {
    return this.guessesChanged.asObservable();
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
