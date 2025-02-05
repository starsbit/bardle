import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Student } from '../../models/student';
import { StudentList } from '../../models/student-list';
import { GridArmorTypeComponent } from '../grid-element/grid-armor-type/grid-armor-type.component';
import { GridBirthdayComponent } from '../grid-element/grid-birthday/grid-birthday.component';
import { GridDamageTypeComponent } from '../grid-element/grid-damage-type/grid-damage-type.component';
import { GridExSkillCostComponent } from '../grid-element/grid-ex-skill-cost/grid-ex-skill-cost.component';
import { GridReleaseDateComponent } from '../grid-element/grid-release-date/grid-release-date.component';
import { GridRoleComponent } from '../grid-element/grid-role/grid-role.component';
import { GridSchoolComponent } from '../grid-element/grid-school/grid-school.component';
import { GridStudentComponent } from '../grid-element/grid-student/grid-student.component';

@Component({
  selector: 'ba-grid-row',
  imports: [
    GridStudentComponent,
    GridSchoolComponent,
    GridRoleComponent,
    GridDamageTypeComponent,
    GridArmorTypeComponent,
    GridBirthdayComponent,
    GridReleaseDateComponent,
    GridExSkillCostComponent,
  ],
  templateUrl: './grid-row.component.html',
  styleUrl: './grid-row.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridRowComponent {
  @Input() guess: Student | null = null;
  @Input() answer: Student | null = null;
  @Input() list: StudentList | undefined = undefined;
}
