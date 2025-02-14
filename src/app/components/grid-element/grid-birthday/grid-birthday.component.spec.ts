import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Student } from '../../../models/student';
import { StudentList } from '../../../models/student-list';
import { DisplayBirthdayFormatPipe } from '../../../pipes/display-birthday-format.pipe';
import { getStudentListTestData } from '../../../utils/test-data-utils';
import { GridElementContainerComponent } from '../grid-wrapper/grid-element-container.component';
import { GridBirthdayComponent } from './grid-birthday.component';

describe('GridBirthdayComponent', () => {
  let component: GridBirthdayComponent;
  let fixture: ComponentFixture<GridBirthdayComponent>;

  const mockStudentAru: Student = {
    ...getStudentListTestData()[StudentList.GLOBAL]['Aru'],
    birthday: '2000/03/12', // March 12th
  };
  const mockStudentHina: Student = {
    ...getStudentListTestData()[StudentList.GLOBAL]['Hina'],
    birthday: '2000/07/05', // July 5th
  };
  const birthdayPipe = new DisplayBirthdayFormatPipe('en');

  beforeEach(async () => {
    await TestBed.configureTestingModule({}).compileComponents();

    fixture = TestBed.createComponent(GridBirthdayComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should correctly determine a correct guess', () => {
    component.guess = mockStudentAru;
    component.answer = mockStudentAru;
    fixture.detectChanges();
    expect(component.correctGuess()).toBeTrue();
  });

  it('should correctly determine an incorrect guess', () => {
    component.guess = mockStudentAru;
    component.answer = mockStudentHina;
    fixture.detectChanges();
    expect(component.correctGuess()).toBeFalse();
  });

  it('should detect when guessed birthday is earlier than the answer (arrow-up)', fakeAsync(() => {
    component.guess = mockStudentAru;
    component.answer = mockStudentHina;
    fixture.detectChanges();
    fixture.whenStable();
    tick(420);

    expect(component.isGuessDateSmaller()).toBeTrue();
    expect(component.isGuessDateBigger()).toBeFalse();

    const divElement = fixture.debugElement.query(By.css('div > div > div'));
    expect(divElement.nativeElement.classList).toContain('arrow-up');
  }));

  it('should detect when guessed birthday is later than the answer (arrow-down)', fakeAsync(() => {
    component.guess = mockStudentHina;
    component.answer = mockStudentAru;
    fixture.detectChanges();
    fixture.whenStable();
    tick(420);

    expect(component.isGuessDateSmaller()).toBeFalse();
    expect(component.isGuessDateBigger()).toBeTrue();

    const divElement = fixture.debugElement.query(By.css('div > div > div'));
    expect(divElement.nativeElement.classList).toContain('arrow-down');
  }));

  it('should apply "correct" class when the guess is correct', fakeAsync(() => {
    component.guess = mockStudentAru;
    component.answer = mockStudentAru;
    fixture.detectChanges();
    fixture.whenStable();
    tick(420);

    const divElement = fixture.debugElement.query(By.css('div > div > div'));
    expect(divElement.nativeElement.classList).toContain('correct');
  }));

  it('should apply "incorrect" class when the guess is incorrect', fakeAsync(() => {
    component.guess = mockStudentAru;
    component.answer = mockStudentHina;
    fixture.detectChanges();
    fixture.whenStable();
    tick(420);

    const divElement = fixture.debugElement.query(By.css('div > div > div'));
    expect(divElement.nativeElement.classList).toContain('incorrect');
  }));

  it('should render the correct birthday text', fakeAsync(() => {
    component.guess = mockStudentAru;
    component.answer = mockStudentAru;
    fixture.detectChanges();
    fixture.whenStable();
    tick(420);

    const spanElement = fixture.debugElement.query(By.css('span'));
    expect(spanElement.nativeElement.textContent.trim()).toBe(
      birthdayPipe.transform(mockStudentAru.birthday)
    );
  }));

  it('should correctly pass inputs to ba-grid-element-container', fakeAsync(() => {
    component.guess = mockStudentAru;
    component.answer = mockStudentAru;
    component.animationDelayMs = 300;
    fixture.detectChanges();
    fixture.whenStable();
    tick(420);

    const gridElementContainer = fixture.debugElement.query(
      By.directive(GridElementContainerComponent)
    );
    expect(gridElementContainer).toBeTruthy();
    expect(gridElementContainer.componentInstance.isFlipped).toBe(
      component.getFlipString()
    );
    expect(gridElementContainer.componentInstance.animationDelayMs).toBe(300);
    expect(gridElementContainer.componentInstance.won).toBeTrue();
  }));
});
