import { Component, Input } from '@angular/core';
import { Student } from '../../models/student';
import { TranslateService } from '../../services/translate.service';
import { timeActive } from '../../utils/date-utils';

@Component({
  selector: 'ba-yesterdays-student',
  imports: [],
  templateUrl: './yesterdays-student.component.html',
  styleUrl: './yesterdays-student.component.scss',
})
export class YesterdaysStudentComponent {
  @Input() student: Student | null = null;
  @Input() display = false;
  numberOfDaysActive = timeActive();

  constructor(private readonly translateService: TranslateService) {}

  get studentName(): string {
    if (this.translateService.getCurrentLang().code === 'ja') {
      return this.student ? this.student.nativeName : '';
    }
    return this.student ? this.student.fullName : '';
  }
}
