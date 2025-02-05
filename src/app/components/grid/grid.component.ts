import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RULES } from '../../constants/rules';
import { GridHeaderComponent } from '../grid-header/grid-header.component';
import { GridRowComponent } from '../grid-row/grid-row.component';

@Component({
  selector: 'ba-grid',
  imports: [GridRowComponent, GridHeaderComponent],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridComponent {
  rows = Array(RULES.MAX_GUESSES).fill(0, 0, RULES.MAX_GUESSES);
}
