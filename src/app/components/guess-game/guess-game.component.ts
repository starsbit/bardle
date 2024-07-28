import { NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import moment from 'moment';
import { GuessResult } from '../../../models/guesses';
import { Student } from '../../../models/student';
import { RULES } from '../../constants/rules';
import { LocalStorage } from '../../services/local-storage.service';
import { StudentService } from '../../services/student.service';
import { CopyButtonComponent } from '../copy-button/copy-button.component';
import { CountdownComponent } from '../countdown/countdown.component';
import { GridComponent } from '../grid/grid.component';
import { GuessInputComponent } from '../guess-input/guess-input.component';
import { SolutionComponent } from '../solution/solution.component';
import { TutorialComponent } from '../tutorial/tutorial.component';
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
    SolutionComponent,
    CopyButtonComponent,
    TutorialComponent,
  ],
  templateUrl: './guess-game.component.html',
  styleUrl: './guess-game.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GuessGameComponent {
  // The list of guesses made by the player
  // Its the ids of the students guessed
  guesses: Student[] = [];
  guessesCopy: GuessResult[] = [];

  doy = moment().utc().dayOfYear();

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
      this.guessesCopy = this.generateGuessResult();
      this.won = true;
    }
    if (this.guesses.length >= RULES.MAX_GUESSES && !this.won) {
      this.guessesCopy = this.generateGuessResult();
      this.lost = true;
    }
    this.cdr.detectChanges();
  }

  generateGuessResult(): GuessResult[] {
    const result: GuessResult[] = [];
    const target = this.studentService.getTarget();
    for (let guess of this.guesses) {
      const subResult = [];
      subResult.push(guess.school === target.school);
      subResult.push(guess.damageType === target.damageType);
      subResult.push(guess.armorType === target.armorType);
      subResult.push(guess.role === target.role);
      subResult.push(guess.combatClass === target.combatClass);
      subResult.push(guess.exSkillCost === target.exSkillCost);
      subResult.push(guess.positioning === target.positioning);
      subResult.push(guess.height === target.height);
      subResult.push(guess.releaseDate === target.releaseDate);
      result.push({ isCorrect: subResult });
    }
    return result;
  }
}
