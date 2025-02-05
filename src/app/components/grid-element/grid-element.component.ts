import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Student } from '../../models/student';

@Component({
  selector: 'ba-grid-element',
  imports: [],
  templateUrl: './grid-element.component.html',
  styleUrl: './grid-element.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridElementComponent {
  @Input() guess: Student | null = null;
  @Input() answer: Student | null = null;
}
