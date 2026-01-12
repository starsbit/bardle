import { Clipboard } from '@angular/cdk/clipboard';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Student } from '../../models/student';
import { GameService } from '../../services/game.service';
import { timeActive } from '../../utils/date-utils';

@Component({
  selector: 'ba-copy-button',
  imports: [MatButtonModule, MatIconModule, MatSnackBarModule],
  templateUrl: './copy-button.component.html',
  styleUrl: './copy-button.component.scss',
})
export class CopyButtonComponent {
  private clipboard = inject(Clipboard);
  private snackbar = inject(MatSnackBar);
  private gameService = inject(GameService);

  private readonly correctIcon = '🟩';
  private readonly incorrectIcon = '⬜';
  private readonly wantedFields = [
    'school',
    'role',
    'damageType',
    'weaponType',
    'exSkillCost',
    'releaseDate',
  ];

  copyToClipboard() {
    const guesses = this.gameService.getCurrentGuesses();
    const answer = this.gameService.getCurrentAnswer();
    const students = this.gameService.getCurrentStudentData();
    if (!guesses || !answer || !students) {
      this.snackbar.open('No guesses to copy', 'Dismiss');
      return;
    }
    const guessedStudents = guesses.map((guess) => students[guess]);
    const targetStudent = students[answer];

    const attempts = guesses.length;
    const won = guesses.includes(answer);
    const date = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
    const daysSinceLaunch = timeActive();

    let scoreReport = `Daily Blue Archive Wordle #${daysSinceLaunch} ${date} on https://bardle.net.\n`;
    scoreReport += `Student list: ${this.gameService.getCurrentList()} students\n`;
    scoreReport += `I guessed the student in ${attempts} attempt${
      attempts > 1 ? 's' : ''
    } and ${won ? 'won' : 'lost'}\n\n`;

    guessedStudents.forEach((guessedStudent) => {
      this.wantedFields.forEach((field) => {
        if (
          guessedStudent[field as keyof Student] ===
          targetStudent[field as keyof Student]
        ) {
          scoreReport += this.correctIcon;
        } else {
          scoreReport += this.incorrectIcon;
        }
      });
      scoreReport += '\n'; // Start a new line for each guessed student
    });

    this.clipboard.copy(scoreReport);
    this.snackbar.open('Score copied to clipboard', 'Dismiss', {
      duration: 3000,
    });
  }
}
