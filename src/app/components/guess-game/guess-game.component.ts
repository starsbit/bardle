import { NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import moment from 'moment';
import { Student } from '../../../models/student';
import { RULES } from '../../constants/rules';
import { LocalStorage } from '../../services/local-storage.service';
import { StudentService } from '../../services/student.service';
import { CountdownComponent } from '../countdown/countdown.component';
import { GridComponent } from '../grid/grid.component';
import { GuessInputComponent } from '../guess-input/guess-input.component';
import { YesterdaysStudentComponent } from '../yesterdays-student/yesterdays-student.component';

@Component({
  selector: 'ba-guess-game',
  standalone: true,
  imports: [
    GridComponent,
    GuessInputComponent,
    YesterdaysStudentComponent,
    RouterLink,
    NgOptimizedImage,
    CountdownComponent,
  ],
  templateUrl: './guess-game.component.html',
  styleUrl: './guess-game.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GuessGameComponent {
  // The list of guesses made by the player
  // Its the ids of the students guessed
  guesses: Student[] = [];

  doy = moment().dayOfYear();

  won = false;
  lost = false;

  constructor(
    private readonly studentService: StudentService,
    private readonly cookieService: LocalStorage,
    private readonly cdr: ChangeDetectorRef
  ) {}

  get latestGuess(): Student {
    return this.guesses[this.guesses.length - 1];
  }

  onGuess(guesses: Student[]): void {
    if (guesses.length === 0) {
      return;
    }
    this.guesses = guesses;
    this.cookieService.setGuess({
      students: this.guesses.map((g) => g.id),
      doy: this.doy,
    });
    if (
      this.latestGuess &&
      this.latestGuess === this.studentService.getTarget()
    ) {
      this.won = true;
    }
    if (this.guesses.length >= RULES.MAX_GUESSES && !this.won) {
      this.lost = true;
    }
    this.cdr.detectChanges();
  }
}
