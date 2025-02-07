import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GridArmorTypeComponent } from '../grid-element/grid-armor-type/grid-armor-type.component';
import { GridBirthdayComponent } from '../grid-element/grid-birthday/grid-birthday.component';
import { GridDamageTypeComponent } from '../grid-element/grid-damage-type/grid-damage-type.component';
import { GridExSkillCostComponent } from '../grid-element/grid-ex-skill-cost/grid-ex-skill-cost.component';
import { GridReleaseDateComponent } from '../grid-element/grid-release-date/grid-release-date.component';
import { GridRoleComponent } from '../grid-element/grid-role/grid-role.component';
import { GridSchoolComponent } from '../grid-element/grid-school/grid-school.component';
import { GridStudentComponent } from '../grid-element/grid-student/grid-student.component';
import { GridRowComponent } from './grid-row.component';

describe('GridRowComponent', () => {
  let component: GridRowComponent;
  let fixture: ComponentFixture<GridRowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
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
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(GridRowComponent);
    component = fixture.componentInstance;
  });
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
