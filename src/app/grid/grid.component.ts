import { Component, Input } from '@angular/core';
import { Student } from '../../models/student';
import { GridHeaderComponent } from '../grid-header/grid-header.component';
import { GridRowComponent } from '../grid-row/grid-row.component';

@Component({
  selector: 'ba-grid',
  standalone: true,
  imports: [GridRowComponent, GridHeaderComponent],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss',
})
export class GridComponent {
  @Input() guesses: Student[] = [];

  @Input() target: Student;
}
