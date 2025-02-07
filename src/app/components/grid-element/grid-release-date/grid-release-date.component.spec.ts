import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Student } from '../../../models/student';
import { StudentList } from '../../../models/student-list';
import { DisplayDateFormatPipe } from '../../../pipes/display-date-format.pipe';
import { getStudentListTestData } from '../../../utils/test-data';
import { GridElementContainerComponent } from '../grid-wrapper/grid-element-container.component';
import { GridReleaseDateComponent } from './grid-release-date.component';

describe('GridReleaseDateComponent', () => {
  let component: GridReleaseDateComponent;
  let fixture: ComponentFixture<GridReleaseDateComponent>;

  const mockStudentAru: Student =
    getStudentListTestData()[StudentList.GLOBAL]['Aru'];
  const mockStudentHina: Student =
    getStudentListTestData()[StudentList.GLOBAL]['Mika'];

  beforeEach(async () => {
    await TestBed.configureTestingModule({}).compileComponents();

    fixture = TestBed.createComponent(GridReleaseDateComponent);
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

  it('should determine if guess date is earlier than answer date', () => {
    component.guess = mockStudentAru;
    component.answer = mockStudentHina;
    fixture.detectChanges();
    expect(component.isGuessDateSmaller()).toBe(
      new Date(mockStudentAru.releaseDate) <
        new Date(mockStudentHina.releaseDate)
    );
  });

  it('should determine if guess date is later than answer date', () => {
    component.guess = mockStudentHina;
    component.answer = mockStudentAru;
    fixture.detectChanges();
    expect(component.isGuessDateBigger()).toBe(
      new Date(mockStudentHina.releaseDate) >
        new Date(mockStudentAru.releaseDate)
    );
  });

  it('should apply correct class when the guess is correct', fakeAsync(() => {
    component.guess = mockStudentAru;
    component.answer = mockStudentAru;
    fixture.detectChanges();
    fixture.whenStable();
    tick(420);

    const divElement = fixture.debugElement.query(By.css('div > div > div'));
    expect(divElement.nativeElement.classList).toContain('correct');
  }));

  it('should apply incorrect class when the guess is incorrect', fakeAsync(() => {
    component.guess = mockStudentAru;
    component.answer = mockStudentHina;
    fixture.detectChanges();
    fixture.whenStable();
    tick(420);

    const divElement = fixture.debugElement.query(By.css('div > div > div'));
    expect(divElement.nativeElement.classList).toContain('incorrect');
  }));

  it('should apply "arrow-up" class if the guess date is earlier than the answer date', fakeAsync(() => {
    component.guess = mockStudentAru;
    component.answer = mockStudentHina;
    fixture.detectChanges();
    fixture.whenStable();
    tick(420);

    const divElement = fixture.debugElement.query(By.css('div > div > div'));
    if (component.isGuessDateSmaller()) {
      expect(divElement.nativeElement.classList).toContain('arrow-up');
    }
  }));

  it('should apply "arrow-down" class if the guess date is later than the answer date', fakeAsync(() => {
    component.guess = mockStudentHina;
    component.answer = mockStudentAru;
    fixture.detectChanges();
    fixture.whenStable();
    tick(420);

    const divElement = fixture.debugElement.query(By.css('div > div > div'));
    if (component.isGuessDateBigger()) {
      expect(divElement.nativeElement.classList).toContain('arrow-down');
    }
  }));

  it('should render the correctly formatted release date', fakeAsync(() => {
    component.guess = mockStudentAru;
    component.answer = mockStudentAru;
    fixture.detectChanges();
    fixture.whenStable();
    tick(420);

    const spanElement = fixture.debugElement.query(By.css('span'));
    expect(spanElement.nativeElement.textContent.trim()).toBe(
      new DisplayDateFormatPipe().transform(mockStudentAru.releaseDate)
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
