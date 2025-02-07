import { TitleCasePipe } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { By } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { Observable, of } from 'rxjs';
import { GameState } from '../../models/game';
import { StudentList } from '../../models/student-list';
import { GameService } from '../../services/game.service';
import { StudentListSelectionComponent } from './student-list-selection.component';

describe('StudentListSelectionComponent', () => {
  let component: StudentListSelectionComponent;
  let fixture: ComponentFixture<StudentListSelectionComponent>;
  let gameServiceSpy: jasmine.SpyObj<GameService>;

  beforeEach(() => {
    gameServiceSpy = jasmine.createSpyObj('GameService', [
      '$gameStateChange',
      'getCurrentList',
      'setActiveList',
    ]);

    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
      ],
      providers: [
        { provide: GameService, useValue: gameServiceSpy },
        TitleCasePipe,
        provideAnimationsAsync(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(StudentListSelectionComponent);
    component = fixture.componentInstance;

    gameServiceSpy.$gameStateChange.and.returnValue(
      of({}) as unknown as Observable<GameState>
    );
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should populate student list dropdown', async () => {
    fixture.detectChanges(); // Ensure component initializes

    // Find the MatSelect component and open it
    const select = fixture.debugElement.query(
      By.css('mat-select')
    ).nativeElement;
    select.click();
    fixture.detectChanges(); // Update the view after opening

    await fixture.whenStable(); // Wait for Angular to process the UI changes

    // Now query for mat-option elements
    const options = fixture.debugElement.queryAll(By.css('mat-option'));

    expect(options.length).toBe(component.studentLists.length);
    expect(options.map((opt) => opt.nativeElement.textContent.trim())).toEqual(
      component.studentLists.map((list) => new TitleCasePipe().transform(list))
    );
  });

  it('should update selected student list on game state change', () => {
    gameServiceSpy.getCurrentList.and.returnValue(StudentList.GLOBAL);

    fixture.detectChanges();
    expect(component.selectedStudentList.value).toBe(StudentList.GLOBAL);
  });

  it('should call gameService.setActiveList when selection changes', () => {
    fixture.detectChanges();
    component.selectedStudentList.setValue(StudentList.JAPAN);
    fixture.detectChanges();

    expect(gameServiceSpy.setActiveList).toHaveBeenCalledWith(
      StudentList.JAPAN
    );
  });

  it('should unsubscribe on destroy', () => {
    spyOn(component['subscriptions'], 'unsubscribe');

    component.ngOnDestroy();

    expect(component['subscriptions'].unsubscribe).toHaveBeenCalled();
  });
});
