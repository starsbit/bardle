import { Component } from '@angular/core';
import { Student } from '../../../models/student';
import { StudentService } from '../../services/student.service';
import { GridComponent } from '../grid/grid.component';
import { GuessInputComponent } from '../guess-input/guess-input.component';

@Component({
  selector: 'ba-guess-game',
  standalone: true,
  imports: [GridComponent, GuessInputComponent],
  templateUrl: './guess-game.component.html',
  styleUrl: './guess-game.component.scss',
})
export class GuessGameComponent {
  // The list of guesses made by the player
  // Its the ids of the students guessed
  guesses: Student[] = [];

  won = false;

  constructor(private readonly studentService: StudentService) {}

  get latestGuess(): Student {
    return this.guesses[this.guesses.length - 1];
  }

  onGuess(guesses: Student[]): void {
    this.guesses = guesses;

    if (
      this.latestGuess &&
      this.latestGuess === this.studentService.getTarget()
    ) {
      this.won = true;
    }
  }
}
