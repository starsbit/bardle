import { Component, Input } from '@angular/core';
import { Student } from '../../models/student';
import { timeActive } from '../../utils/date';

@Component({
  selector: 'ba-yesterdays-student',
  imports: [],
  templateUrl: './yesterdays-student.component.html',
  styleUrl: './yesterdays-student.component.scss',
})
export class YesterdaysStudentComponent {
  @Input() student: Student | null = null;
  @Input() display: boolean = false;
  numberOfDaysActive = timeActive();
}
