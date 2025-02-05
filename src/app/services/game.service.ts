import { Injectable, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { RULES } from '../constants/rules';
import { Student } from '../models/student';
import { StudentList } from '../models/student-list';
import { StudentListService } from './student-list.service';

@Injectable({
  providedIn: 'root',
})
export class GameService implements OnDestroy {
  private readonly subscriptions = new Subscription();
  private guesses: { [key in StudentList]: Student[] } =
    this.initializeGuesses();
  private currentList: StudentList = StudentList.JAPAN;

  constructor(private readonly studentListService: StudentListService) {
    this.subscriptions.add(
      this.studentListService.$studentListChange().subscribe((studentList) => {
        this.currentList = studentList;
      })
    );
  }

  addGuess(student: Student) {
    if (this.guesses[this.currentList].length < RULES.MAX_GUESSES) {
      this.guesses[this.currentList].push(student);
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
