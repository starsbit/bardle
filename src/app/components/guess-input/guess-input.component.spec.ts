import { NgOptimizedImage } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { By } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { of } from 'rxjs';
import { GameState } from '../../models/game';
import { Student } from '../../models/student';
import { DEFAULT_STUDENT_LIST } from '../../models/student-list';
import { GameService } from '../../services/game.service';
import { TranslateService } from '../../services/translate.service';
import { AssetService } from '../../services/web/asset.service';
import { getStudentListTestData } from '../../utils/test-data-utils';
import { GuessInputComponent } from './guess-input.component';

describe('GuessInputComponent', () => {
  let component: GuessInputComponent;
  let fixture: ComponentFixture<GuessInputComponent>;
  let gameServiceSpy: jasmine.SpyObj<GameService>;
  let assetServiceSpy: jasmine.SpyObj<AssetService>;
  let translateServiceSpy: jasmine.SpyObj<TranslateService>;

  beforeEach(() => {
    gameServiceSpy = jasmine.createSpyObj('GameService', [
      '$gameStateChange',
      'getCurrentStudentData',
      'getCurrentGuesses',
      'addGuess',
      'getCurrentResult',
      'getCurrentList',
    ]);

    assetServiceSpy = jasmine.createSpyObj('AssetService', [
      'getStudentIconLocation',
    ]);

    gameServiceSpy.$gameStateChange.and.returnValue(
      of({} as unknown as GameState)
    );

    translateServiceSpy = jasmine.createSpyObj('TranslateService', [
      'getCurrentLang',
    ]);

    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        MatInputModule,
        NgOptimizedImage,
      ],
      providers: [
        { provide: GameService, useValue: gameServiceSpy },
        { provide: AssetService, useValue: assetServiceSpy },
        { provide: TranslateService, useValue: translateServiceSpy },
        provideAnimationsAsync(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(GuessInputComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have an input field for student name', () => {
    fixture.detectChanges();
    const inputElement = fixture.debugElement.query(
      By.css('input[matInput]')
    ).nativeElement;
    expect(inputElement).toBeTruthy();
    expect(inputElement.placeholder).toBe('Name');
  });

  it('should reset input field after selection', () => {
    const mockStudent: Student =
      getStudentListTestData()[DEFAULT_STUDENT_LIST]['Aru'];

    component.guessInputControl.setValue(mockStudent.fullName);
    fixture.detectChanges();

    component.onSelectionChange(mockStudent);
    fixture.detectChanges();

    expect(component.guessInputControl.value).toBeNull();
  });

  it('should disable input when game is won or lost', () => {
    gameServiceSpy.getCurrentResult.and.returnValue({ won: true, lost: false });
    gameServiceSpy.getCurrentList.and.returnValue(DEFAULT_STUDENT_LIST);

    component['checkGameResult']();
    fixture.detectChanges();

    expect(component.guessInputControl.disabled).toBeTrue();
  });

  it('should enable input when game is not finished', () => {
    gameServiceSpy.getCurrentResult.and.returnValue({
      won: false,
      lost: false,
    });

    component['checkGameResult']();
    fixture.detectChanges();

    expect(component.guessInputControl.disabled).toBeFalse();
  });

  it('should filter students correctly for Japanese inputs when locale is Japanese', () => {
    const aru = getStudentListTestData()[DEFAULT_STUDENT_LIST]['Aru'];
    const mockStudents: Student[] = [
      getStudentListTestData()[DEFAULT_STUDENT_LIST]['Aru'],
      getStudentListTestData()[DEFAULT_STUDENT_LIST]['Hina'],
    ];
    component.students = mockStudents;
    gameServiceSpy.getCurrentGuesses.and.returnValue([]);
    translateServiceSpy.getCurrentLang.and.returnValue({
      code: 'ja',
      name: 'Japanese',
    });

    const filteredStudents = component['_filter']('アル');
    expect(filteredStudents.length).toBe(1);
    expect(filteredStudents[0].nativeName).toBe(aru.nativeName);
  });
});
