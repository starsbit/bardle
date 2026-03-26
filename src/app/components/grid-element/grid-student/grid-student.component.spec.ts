import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Student } from '../../../models/student';
import { StudentList } from '../../../models/student-list';
import { AssetService } from '../../../services/web/asset.service';
import { getStudentListTestData } from '../../../utils/test-data-utils';
import { GridElementContainerComponent } from '../grid-wrapper/grid-element-container.component';
import { GridStudentComponent } from './grid-student.component';

describe('GridStudentComponent', () => {
  let component: GridStudentComponent;
  let fixture: ComponentFixture<GridStudentComponent>;
  let mockAssetServiceSpy: jasmine.SpyObj<AssetService>;

  const mockStudent: Student =
    getStudentListTestData()[StudentList.GLOBAL]['Aru'];
  const hina: Student = getStudentListTestData()[StudentList.GLOBAL]['Hina'];
  const hinaSwimsuit: Student =
    getStudentListTestData()[StudentList.GLOBAL]['Hina_(Swimsuit)'];
  const hinaDress: Student =
    getStudentListTestData()[StudentList.GLOBAL]['Hina_(Dress)'];

  beforeEach(async () => {
    mockAssetServiceSpy = jasmine.createSpyObj('AssetService', [
      'getStudentIconLocation',
    ]);
    mockAssetServiceSpy.getStudentIconLocation.and.returnValue(
      'assets/students/Aru.png'
    );
    await TestBed.configureTestingModule({
      providers: [{ provide: AssetService, useValue: mockAssetServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(GridStudentComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should correctly determine a correct guess', () => {
    component.guess = mockStudent;
    component.answer = mockStudent;
    fixture.detectChanges();
    expect(component.correctGuess()).toBeTrue();
  });

  it('should correctly determine an incorrect guess', () => {
    component.guess = mockStudent;
    component.answer = getStudentListTestData()[StudentList.GLOBAL]['Hina'];
    fixture.detectChanges();
    expect(component.correctGuess()).toBeFalse();
  });

  it('should apply the correct class when the guess is correct', fakeAsync(() => {
    component.guess = mockStudent;
    component.answer = mockStudent;
    fixture.detectChanges();
    fixture.whenStable();
    tick(420);

    const divElement = fixture.debugElement.query(By.css('div > div > div'));
    expect(divElement.nativeElement.classList).toContain('correct');
  }));

  it('should apply the incorrect class when the guess is incorrect', fakeAsync(() => {
    component.guess = mockStudent;
    component.answer = getStudentListTestData()[StudentList.GLOBAL]['Hina'];
    fixture.detectChanges();
    fixture.whenStable();
    tick(420);

    const divElement = fixture.debugElement.query(By.css('div > div > div'));
    expect(divElement.nativeElement.classList).toContain('incorrect');
  }));

  describe('partialGuess()', () => {
    it('should return false when guess is an exact match', () => {
      component.guess = hina;
      component.answer = hina;
      expect(component.partialGuess()).toBeFalse();
    });

    it('should return true when guessing base version with answer being alternate version', () => {
      component.guess = hina;
      component.answer = hinaSwimsuit;
      expect(component.partialGuess()).toBeTrue();
    });

    it('should return true when guessing alternate version with answer being base version', () => {
      component.guess = hinaSwimsuit;
      component.answer = hina;
      expect(component.partialGuess()).toBeTrue();
    });

    it('should return true when guessing one alternate version with answer being another alternate version', () => {
      component.guess = hinaSwimsuit;
      component.answer = hinaDress;
      expect(component.partialGuess()).toBeTrue();
    });

    it('should return false when guess and answer share no base name', () => {
      component.guess = mockStudent;
      component.answer = hina;
      expect(component.partialGuess()).toBeFalse();
    });

    it('should return false when guess is null', () => {
      component.guess = null;
      component.answer = hina;
      expect(component.partialGuess()).toBeFalse();
    });

    it('should return false when answer is null', () => {
      component.guess = hina;
      component.answer = null;
      expect(component.partialGuess()).toBeFalse();
    });
  });

  it('should apply the partial class when the guess is an alternate version', fakeAsync(() => {
    component.guess = hinaSwimsuit;
    component.answer = hina;
    fixture.detectChanges();
    fixture.whenStable();
    tick(420);

    const divElement = fixture.debugElement.query(By.css('div > div > div'));
    expect(divElement.nativeElement.classList).toContain('partial');
  }));

  it('should not apply partial class when guess and answer are the same student', fakeAsync(() => {
    component.guess = hina;
    component.answer = hina;
    fixture.detectChanges();
    fixture.whenStable();
    tick(420);

    const divElement = fixture.debugElement.query(By.css('div > div > div'));
    expect(divElement.nativeElement.classList).not.toContain('partial');
    expect(divElement.nativeElement.classList).toContain('correct');
  }));

  it('should not apply partial class when guess and answer share no base name', fakeAsync(() => {
    component.guess = mockStudent;
    component.answer = hina;
    fixture.detectChanges();
    fixture.whenStable();
    tick(420);

    const divElement = fixture.debugElement.query(By.css('div > div > div'));
    expect(divElement.nativeElement.classList).not.toContain('partial');
    expect(divElement.nativeElement.classList).toContain('incorrect');
  }));

  it('should correctly pass inputs to ba-grid-element-container', fakeAsync(() => {
    component.guess = mockStudent;
    component.answer = mockStudent;
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
