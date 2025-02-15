import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Student } from '../../models/student';
import { DEFAULT_STUDENT_LIST } from '../../models/student-list';
import { timeActive } from '../../utils/date-utils';
import { getStudentListTestData } from '../../utils/test-data-utils';
import { YesterdaysStudentComponent } from './yesterdays-student.component';

describe('YesterdaysStudentComponent', () => {
  let component: YesterdaysStudentComponent;
  let fixture: ComponentFixture<YesterdaysStudentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({}).compileComponents();

    fixture = TestBed.createComponent(YesterdaysStudentComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the student name and days active when both student and display are true', () => {
    const mockStudent: Student =
      getStudentListTestData()[DEFAULT_STUDENT_LIST]['Aru'];
    component.student = mockStudent;
    component.display = true;
    fixture.detectChanges(); // Update view

    const studentText = fixture.debugElement.query(By.css('.incorrect-text'))
      .nativeElement.textContent;
    expect(studentText).toContain(mockStudent.fullName);

    const daysActiveText = fixture.debugElement.query(
      By.css('.text-xl.text-white')
    ).nativeElement.textContent;
    expect(daysActiveText).toContain(`#${timeActive() - 1}`);
  });

  it('should not render anything when display is false', () => {
    component.student = getStudentListTestData()[DEFAULT_STUDENT_LIST]['Aru'];
    component.display = false;
    fixture.detectChanges();

    const sectionElement = fixture.debugElement.query(By.css('section'));
    expect(sectionElement).toBeNull(); // Should not be rendered
  });

  it('should not render anything if student is null', () => {
    component.student = null;
    component.display = true;
    fixture.detectChanges();

    const sectionElement = fixture.debugElement.query(By.css('section'));
    expect(sectionElement).toBeNull(); // Should not be rendered
  });
});
