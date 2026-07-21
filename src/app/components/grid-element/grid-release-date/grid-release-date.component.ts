import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GridElementComponent } from '../grid-element.component';
import { GridElementContainerComponent } from '../grid-wrapper/grid-element-container.component';

@Component({
  selector: 'ba-grid-release-date',
  imports: [GridElementContainerComponent, NgClass],
  templateUrl: './grid-release-date.component.html',
  styleUrl: './grid-release-date.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridReleaseDateComponent extends GridElementComponent {
  isGuessOrderBigger(): boolean {
    if (!this.guess || !this.answer) {
      return false;
    }
    return this.guess.releaseOrder > this.answer.releaseOrder;
  }

  isGuessOrderSmaller(): boolean {
    if (!this.guess || !this.answer) {
      return false;
    }
    return this.guess.releaseOrder < this.answer.releaseOrder;
  }

  override correctGuess(): boolean {
    return this.guess?.releaseOrder === this.answer?.releaseOrder;
  }

  get releaseOrder(): number {
    return this.guess?.releaseOrder ?? 0;
  }
}
