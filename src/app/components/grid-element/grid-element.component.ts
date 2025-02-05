import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Student } from '../../models/student';

@Component({
  selector: 'ba-grid-element',
  templateUrl: './grid-element.component.html',
  styleUrls: ['./grid-element.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridElementComponent {
  @Input() guess: Student | null = null;
  @Input() answer: Student | null = null;
  @Input() animationDelayMs = 0;

  correctGuess(): boolean {
    return this.guess === this.answer;
  }
}
