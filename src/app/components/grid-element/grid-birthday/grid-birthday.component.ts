import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GridElementComponent } from '../grid-element.component';
import { GridElementContainerComponent } from '../grid-wrapper/grid-element-container.component';

@Component({
  selector: 'ba-grid-birthday',
  imports: [GridElementContainerComponent],
  templateUrl: './grid-birthday.component.html',
  styleUrls: ['./grid-birthday.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridBirthdayComponent extends GridElementComponent {
  private parseBirthday(birthday: string): Date {
    const [day, month] = birthday.split('.').map(Number);
    // Use a default year for comparison
    const year = 2000;
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
}
