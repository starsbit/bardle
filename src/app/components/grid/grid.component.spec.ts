import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ChangeDetectorRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { RULES } from '../../constants/rules';
import { GameState } from '../../models/game';
import { Student } from '../../models/student';
import { StudentList } from '../../models/student-list';
import { GameService } from '../../services/game.service';
import { getStudentListTestData } from '../../utils/test-data-utils';
import { GridComponent } from './grid.component';

describe('GridComponent', () => {
  let component: GridComponent;
  let fixture: ComponentFixture<GridComponent>;
  let gameServiceSpy: jasmine.SpyObj<GameService>;
  let changeDetectorRefSpy: jasmine.SpyObj<ChangeDetectorRef>;

  const mockStudentAru: Student =
    getStudentListTestData()[StudentList.GLOBAL]['Aru'];

  const mockStudentHina: Student =
    getStudentListTestData()[StudentList.GLOBAL]['Hina'];

  beforeEach(async () => {
    gameServiceSpy = jasmine.createSpyObj('GameService', [
      '$gameStateChange',
      'getCurrentAnswer',
      'getCurrentStudentData',
      'getCurrentGuesses',
      'getCurrentList',
    ]);

    changeDetectorRefSpy = jasmine.createSpyObj('ChangeDetectorRef', [
      'markForCheck',
    ]);

    gameServiceSpy.$gameStateChange.and.returnValue(
      of({} as unknown as GameState)
    );
    gameServiceSpy.getCurrentStudentData.and.returnValue({
      Aru: mockStudentAru,
      Hina: mockStudentHina,
    });
    gameServiceSpy.getCurrentAnswer.and.returnValue('Aru');
    gameServiceSpy.getCurrentGuesses.and.returnValue(['Aru', 'Hina']);
    gameServiceSpy.getCurrentList.and.returnValue(StudentList.GLOBAL);

    await TestBed.configureTestingModule({
      providers: [
        { provide: GameService, useValue: gameServiceSpy },
        { provide: ChangeDetectorRef, useValue: changeDetectorRefSpy },
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(GridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should update answer when game state changes', () => {
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.answer).toEqual(mockStudentAru);
  });

  it('should update guesses correctly', () => {
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.guesses.length).toBe(RULES.MAX_GUESSES);
    expect(component.guesses[0]).toEqual(mockStudentAru);
    expect(component.guesses[1]).toEqual(mockStudentHina);
    expect(component.guesses.slice(2)).toEqual(
      Array(RULES.MAX_GUESSES - 2).fill(null)
    );
  });

  it('should update student list correctly', () => {
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.list).toBe(StudentList.GLOBAL);
  });

  it('should render `ba-grid-header` component', () => {
    const header = fixture.debugElement.query(By.css('ba-grid-header'));
    expect(header).toBeTruthy();
  });

  it('should render `ba-grid-row` components for each guess', () => {
    component.ngOnInit();
    fixture.detectChanges();

    const gridRows = fixture.debugElement.queryAll(By.css('ba-grid-row'));
    expect(gridRows.length).toBe(RULES.MAX_GUESSES);
  });

  it('should handle empty guesses properly', () => {
    gameServiceSpy.getCurrentGuesses.and.returnValue([]);
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.guesses.length).toBe(RULES.MAX_GUESSES);
    expect(component.guesses.every((guess) => guess === null)).toBeTrue();
  });
});
