import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Student } from '../../models/student';
import { StudentList } from '../../models/student-list';
import { getStudentListTestData } from '../../utils/test-data';
import { GridElementComponent } from './grid-element.component';

describe('GridElementComponent', () => {
  let component: GridElementComponent;
  let fixture: ComponentFixture<GridElementComponent>;

  const mockStudent: Student =
    getStudentListTestData()[StudentList.GLOBAL]['Aru'];

  beforeEach(async () => {
    await TestBed.configureTestingModule({}).compileComponents();

    fixture = TestBed.createComponent(GridElementComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should receive input values correctly', () => {
    component.guess = mockStudent;
    component.answer = mockStudent;
    component.list = StudentList.GLOBAL;
    component.animationDelayMs = 500;
    fixture.detectChanges();

    expect(component.guess).toEqual(mockStudent);
    expect(component.answer).toEqual(mockStudent);
    expect(component.list).toEqual(StudentList.GLOBAL);
    expect(component.animationDelayMs).toBe(500);
  });

  it('should return true when guess matches answer', () => {
    component.guess = mockStudent;
    component.answer = mockStudent;
    expect(component.correctGuess()).toBeTrue();
  });

  it('should return false when guess does not match answer', () => {
    component.guess = mockStudent;
    component.answer = getStudentListTestData()[StudentList.GLOBAL]['Hina'];
    expect(component.correctGuess()).toBeFalse();
  });

  it('should return empty string when guess is null', () => {
    component.guess = null;
    component.list = StudentList.GLOBAL;
    expect(component.getFlipString()).toBe('');
  });

  it('should return correct flip string when guess is set', () => {
    component.guess = mockStudent;
    component.list = StudentList.GLOBAL;
    expect(component.getFlipString()).toBe('Aruglobal');
  });

  it('should render the grid element', () => {
    fixture.detectChanges();
    const gridElement = fixture.nativeElement.querySelector('.w-14.h-14');
    expect(gridElement).toBeTruthy();
  });
});
