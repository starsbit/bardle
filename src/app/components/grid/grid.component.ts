import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Student } from '../../../models/student';
import { RULES } from '../../constants/rules';
import { GridEmptyRowComponent } from '../grid-empty-row/grid-empty-row.component';
import { GridHeaderComponent } from '../grid-header/grid-header.component';
import { GridRowComponent } from '../grid-row/grid-row.component';

@Component({
  selector: 'ba-grid',
  standalone: true,
  imports: [GridRowComponent, GridHeaderComponent, GridEmptyRowComponent],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridComponent {
  @Input() guesses: Student[] = [];

  @Input() target: Student;

  private readonly numberOfGuesses = RULES.MAX_GUESSES;

  get numberOfEmptyRows(): number[] {
    return new Array(this.numberOfGuesses - this.guesses.length).fill(0);
  }
}
