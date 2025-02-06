import { Clipboard } from '@angular/cdk/clipboard';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Student } from '../../models/student';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'ba-copy-button',
  imports: [MatButtonModule, MatIconModule, MatSnackBarModule],
  templateUrl: './copy-button.component.html',
  styleUrl: './copy-button.component.scss',
})
export class CopyButtonComponent {
  private readonly correctIcon = '🟩';
  private readonly incorrectIcon = '⬜';
  private readonly wantedFields = [
    'school',
    'role',
    'damageType',
    'armorType',
    'exSkillCost',
    'birthday',
    'releaseDate',
  ];

  constructor(
    private clipboard: Clipboard,
    private snackbar: MatSnackBar,
    private gameService: GameService
  ) {}

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

    let scoreReport = '';

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
