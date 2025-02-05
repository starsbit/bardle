import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Student } from '../../models/student';
import { StudentList } from '../../models/student-list';
@Component({
  selector: 'ba-grid-element',
  templateUrl: './grid-element.component.html',
  styleUrls: ['./grid-element.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridElementComponent {
  @Input() guess: Student | null = null;
  @Input() answer: Student | null = null;
  // used for change detection to retrigger the animation on list change
  @Input() list: StudentList | undefined = undefined;
  @Input() animationDelayMs = 0;

  correctGuess(): boolean {
    return this.guess === this.answer;
  }

  getFlipString() {
    return this.guess ? this.guess.id + this.list : '';
  }
}
