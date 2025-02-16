import { Clipboard } from '@angular/cdk/clipboard';
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { By } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { Student } from '../../models/student';
import { StudentList } from '../../models/student-list';
import { GameService } from '../../services/game.service';
import { timeActive } from '../../utils/date-utils';
import { getStudentListTestData } from '../../utils/test-data-utils';
import { CopyButtonComponent } from './copy-button.component';

describe('CopyButtonComponent', () => {
  let component: CopyButtonComponent;
  let fixture: ComponentFixture<CopyButtonComponent>;
  let clipboardSpy: jasmine.SpyObj<Clipboard>;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;
  let gameServiceSpy: jasmine.SpyObj<GameService>;

  const mockStudent: Student =
    getStudentListTestData()[StudentList.GLOBAL]['Aru'];
  const mockTargetStudent: Student =
    getStudentListTestData()[StudentList.GLOBAL]['Hina'];

  const daysActive = timeActive();

  beforeEach(async () => {
    clipboardSpy = jasmine.createSpyObj('Clipboard', ['copy']);
    snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);
    gameServiceSpy = jasmine.createSpyObj('GameService', [
      'getCurrentGuesses',
      'getCurrentAnswer',
      'getCurrentStudentData',
    ]);

    await TestBed.configureTestingModule({
      imports: [MatButtonModule, MatIconModule, MatSnackBarModule],
      providers: [
        { provide: Clipboard, useValue: clipboardSpy },
        { provide: MatSnackBar, useValue: snackBarSpy },
        { provide: GameService, useValue: gameServiceSpy },
        provideAnimationsAsync(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CopyButtonComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should show a snackbar message if there are no guesses to copy', fakeAsync(() => {
    gameServiceSpy.getCurrentGuesses.and.returnValue(undefined);
    gameServiceSpy.getCurrentAnswer.and.returnValue(undefined);
    gameServiceSpy.getCurrentStudentData.and.returnValue(undefined);

    component.copyToClipboard();
    fixture.detectChanges();
    tick(420); // Process async operations
    expect(clipboardSpy.copy).not.toHaveBeenCalled();
  }));

  it('should copy the correct score format to clipboard', fakeAsync(() => {
    gameServiceSpy.getCurrentGuesses.and.returnValue(['Aru']);
    gameServiceSpy.getCurrentAnswer.and.returnValue('Hina');
    gameServiceSpy.getCurrentStudentData.and.returnValue({
      Aru: mockStudent,
      Hina: mockTargetStudent,
    });

    component.copyToClipboard();
    fixture.detectChanges();
    tick(420); // Allow snackbar execution
    const date = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

    const expectedScore = `Daily Bardle #${daysActive} ${date}.\nI guessed the student in 1 attempt and lost\n\n🟩🟩🟩⬜⬜🟩\n`;
    expect(clipboardSpy.copy).toHaveBeenCalledWith(expectedScore);
  }));

  it('should use correct and incorrect icons in score report', fakeAsync(() => {
    const correctStudent: Student = { ...mockTargetStudent }; // Exact match
    gameServiceSpy.getCurrentGuesses.and.returnValue(['Hina']);
    gameServiceSpy.getCurrentAnswer.and.returnValue('Hina');
    gameServiceSpy.getCurrentStudentData.and.returnValue({
      Hina: correctStudent,
    });

    component.copyToClipboard();
    fixture.detectChanges();
    tick(); // Process snackbar call

    const date = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
    const expectedScore = `Daily Bardle #${daysActive} ${date}.\nI guessed the student in 1 attempt and won\n\n🟩🟩🟩🟩🟩🟩\n`;
    expect(clipboardSpy.copy).toHaveBeenCalledWith(expectedScore);
  }));

  it('should trigger copy function when button is clicked', () => {
    spyOn(component, 'copyToClipboard');

    const button = fixture.debugElement.query(By.css('button'));
    button.triggerEventHandler('click', null);

    expect(component.copyToClipboard).toHaveBeenCalled();
  });
});
