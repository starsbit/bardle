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
    return this.guess.releaseDate > this.answer.releaseDate;
  }

  isGuessDateSmaller(): boolean {
    if (!this.guess || !this.answer) {
      return false;
    }
    return this.guess.releaseDate < this.answer.releaseDate;
  }

  override correctGuess(): boolean {
    return this.guess?.releaseDate === this.answer?.releaseDate;
  }

  get releaseDate(): string {
    return this.guess?.releaseDate ?? '';
  }
}
