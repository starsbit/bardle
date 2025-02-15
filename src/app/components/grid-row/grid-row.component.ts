import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Student } from '../../models/student';
import { StudentList } from '../../models/student-list';
import { GridDamageTypeComponent } from '../grid-element/grid-damage-type/grid-damage-type.component';
import { GridExSkillCostComponent } from '../grid-element/grid-ex-skill-cost/grid-ex-skill-cost.component';
import { GridReleaseDateComponent } from '../grid-element/grid-release-date/grid-release-date.component';
import { GridRoleComponent } from '../grid-element/grid-role/grid-role.component';
import { GridSchoolComponent } from '../grid-element/grid-school/grid-school.component';
import { GridStudentComponent } from '../grid-element/grid-student/grid-student.component';
import { GridWeaponTypeComponent } from '../grid-element/grid-weapon-type/grid-weapon-type.component';

@Component({
  selector: 'ba-grid-row',
  imports: [
    GridStudentComponent,
    GridSchoolComponent,
    GridRoleComponent,
    GridDamageTypeComponent,
    GridReleaseDateComponent,
    GridExSkillCostComponent,
    GridWeaponTypeComponent,
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
