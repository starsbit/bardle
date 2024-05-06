import { Component } from '@angular/core';
import moment from 'moment';
import { RULES } from '../../constants/rules';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'ba-yesterdays-student',
  standalone: true,
  imports: [],
  templateUrl: './yesterdays-student.component.html',
  styleUrl: './yesterdays-student.component.scss',
})
export class YesterdaysStudentComponent {
  constructor(readonly studentService: StudentService) {}

  get daysSinceLaunch(): number {
    return moment().subtract(1, 'days').diff(RULES.LAUNCH_DATE, 'days');
  }
}
