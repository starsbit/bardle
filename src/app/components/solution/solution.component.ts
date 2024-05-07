import { Component } from '@angular/core';
import { Student } from '../../../models/student';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'ba-solution',
  standalone: true,
  imports: [],
  templateUrl: './solution.component.html',
  styleUrl: './solution.component.scss',
})
export class SolutionComponent {
  solution: Student;

  constructor(private studentService: StudentService) {
    this.solution = this.studentService.getTarget();
  }
}
