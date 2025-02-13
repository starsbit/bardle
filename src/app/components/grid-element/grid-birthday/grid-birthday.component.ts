import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DisplayBirthdayFormatPipe } from '../../../pipes/display-birthday-format.pipe';
import { GridElementComponent } from '../grid-element.component';
import { GridElementContainerComponent } from '../grid-wrapper/grid-element-container.component';

@Component({
  selector: 'ba-grid-birthday',
  imports: [GridElementContainerComponent, DisplayBirthdayFormatPipe, NgClass],
  templateUrl: './grid-birthday.component.html',
  styleUrls: ['./grid-birthday.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridBirthdayComponent extends GridElementComponent {
  private parseBirthday(birthday: string): Date {
    const [year, month, day] = birthday.split('/').map(Number);
    return new Date(year, month - 1, day);
  }

  isGuessDateBigger(): boolean {
    if (!this.guess || !this.answer) {
      return false;
    }
    const guessDate = this.parseBirthday(this.guess.birthday);
    const answerDate = this.parseBirthday(this.answer.birthday);
    return guessDate > answerDate;
  }

  isGuessDateSmaller(): boolean {
    if (!this.guess || !this.answer) {
      return false;
    }
    const guessDate = this.parseBirthday(this.guess.birthday);
    const answerDate = this.parseBirthday(this.answer.birthday);
    return guessDate < answerDate;
  }

  get birthday() {
    return this.guess ? this.guess.birthday : '';
  }

  override correctGuess(): boolean {
    return this.guess?.birthday === this.answer?.birthday;
  }
}
