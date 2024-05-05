import { Component, Input } from '@angular/core';
import { Student } from '../../models/student';
import { GridElementComponent } from '../grid-element/grid-element.component';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'ba-grid-row',
  standalone: true,
  imports: [GridElementComponent],
  templateUrl: './grid-row.component.html',
  styleUrl: './grid-row.component.scss',
})
export class GridRowComponent {
  @Input() guess: Student;

  target: Student;

  constructor(private readonly studentService: StudentService) {
    this.target = this.studentService.getTarget();
  }
}
