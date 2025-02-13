import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DisplayDateFormatPipe } from '../../../pipes/display-date-format.pipe';
import { GridElementComponent } from '../grid-element.component';
import { GridElementContainerComponent } from '../grid-wrapper/grid-element-container.component';

@Component({
  selector: 'ba-grid-release-date',
  imports: [GridElementContainerComponent, DisplayDateFormatPipe, NgClass],
  templateUrl: './grid-release-date.component.html',
  styleUrl: './grid-release-date.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridReleaseDateComponent extends GridElementComponent {
  isGuessDateBigger(): boolean {
    if (!this.guess || !this.answer) {
      return false;
    }
    const guessDate = new Date(this.guess.releaseDate);
    const answerDate = new Date(this.answer.releaseDate);
    return guessDate > answerDate;
  }

  isGuessDateSmaller(): boolean {
    if (!this.guess || !this.answer) {
      return false;
    }
    const guessDate = new Date(this.guess.releaseDate);
    const answerDate = new Date(this.answer.releaseDate);
    return guessDate < answerDate;
  }

  override correctGuess(): boolean {
    return this.guess?.releaseDate === this.answer?.releaseDate;
  }

  get releaseDate() {
    return this.guess ? this.guess.releaseDate : '';
  }
}
