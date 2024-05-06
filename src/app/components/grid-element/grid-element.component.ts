import { Component, Input } from '@angular/core';

@Component({
  selector: 'ba-grid-element',
  standalone: true,
  imports: [],
  templateUrl: './grid-element.component.html',
  styleUrl: './grid-element.component.scss',
})
export class GridElementComponent {
  @Input() guessAttribute: any;
  @Input() targetAttribute: any;
  @Input() isStudentElement = false;
  @Input() useIconInsteadOfName = false;
  @Input() animationDelayInMs = 0;
  @Input() alternativeLabel = '';

  get isCorrect(): boolean {
    return this.guessAttribute === this.targetAttribute;
  }

  get label(): string {
    if (typeof this.guessAttribute === 'boolean') {
      return this.guessAttribute ? '✅' : '❌';
    }
    if (typeof this.guessAttribute === 'number') {
      if (this.guessAttribute < this.targetAttribute) {
        return `🔼${this.guessAttribute}`;
      } else if (this.guessAttribute > this.targetAttribute) {
        return `🔽${this.guessAttribute}`;
      } else {
        return `${this.guessAttribute}`;
      }
    }
    return this.guessAttribute;
  }

  get image(): string {
    if (this.useIconInsteadOfName) {
      return 'assets/images/characters/' + this.guessAttribute + '.png';
    }
    return '';
  }
}
