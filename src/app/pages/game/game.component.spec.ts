import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { GameState } from '../../models/game';
import { StudentList } from '../../models/student-list';
import { GameService } from '../../services/game.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { getStudentListTestData } from '../../utils/test-data-utils';
import { GameComponent } from './game.component';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;
  let gameServiceSpy: jasmine.SpyObj<GameService>;
  let localStorageSpy: jasmine.SpyObj<LocalStorageService>;
  const gameDate = getStudentListTestData();
  const studentOfTheDay = gameDate[StudentList.GLOBAL]['Aru'];
  const studentOfYesterday = gameDate[StudentList.GLOBAL]['Hina'];

  beforeEach(() => {
    gameServiceSpy = jasmine.createSpyObj('GameService', [
      '$gameStateChange',
      'getCurrentGuesses',
      'getCurrentResult',
      'getYesterdaysStudent',
      'getTodaysStudent',
      'getCurrentStudentData',
      'getLastReadChangeLogDate',
    ]);

    localStorageSpy = jasmine.createSpyObj('LocalStorageService', [
      'getGuess',
      'setGuess',
      'getChangeLogReadDate',
      'setChangeLogReadDate',
    ]);

    gameServiceSpy.$gameStateChange.and.returnValue(
      of({} as unknown as GameState)
    );
    gameServiceSpy.getCurrentGuesses.and.returnValue([]);
    gameServiceSpy.getCurrentResult.and.returnValue({
      lost: false,
      won: false,
    });
    gameServiceSpy.getYesterdaysStudent.and.returnValue(studentOfYesterday.id);
    gameServiceSpy.getTodaysStudent.and.returnValue(studentOfTheDay.id);
    gameServiceSpy.getCurrentStudentData.and.returnValue(
      gameDate[StudentList.GLOBAL]
    );
    localStorageSpy.getChangeLogReadDate.and.returnValue(
      new Date().toISOString().slice(0, 10)
    );

    TestBed.configureTestingModule({
      providers: [
        { provide: GameService, useValue: gameServiceSpy },
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle a game state change', () => {
    component.ngOnInit();
    expect(gameServiceSpy.getCurrentGuesses).toHaveBeenCalled();
    expect(gameServiceSpy.getCurrentResult).toHaveBeenCalled();
    expect(gameServiceSpy.getYesterdaysStudent).toHaveBeenCalled();
    expect(gameServiceSpy.getTodaysStudent).toHaveBeenCalled();
    expect(gameServiceSpy.getCurrentStudentData).toHaveBeenCalled();
  });

  it('should handle a game state change that is empty', () => {
    gameServiceSpy.$gameStateChange.and.returnValue(
      of({} as unknown as GameState)
    );
    gameServiceSpy.getCurrentGuesses.and.returnValue(undefined);
    gameServiceSpy.getCurrentResult.and.returnValue(undefined);
    gameServiceSpy.getYesterdaysStudent.and.returnValue(undefined);
    gameServiceSpy.getTodaysStudent.and.returnValue(undefined);
    gameServiceSpy.getCurrentStudentData.and.returnValue(undefined);
    component.ngOnInit();
    expect(gameServiceSpy.getCurrentGuesses).toHaveBeenCalled();
    expect(gameServiceSpy.getCurrentResult).toHaveBeenCalled();
    expect(gameServiceSpy.getYesterdaysStudent).toHaveBeenCalled();
    expect(gameServiceSpy.getTodaysStudent).toHaveBeenCalled();
    expect(gameServiceSpy.getCurrentStudentData).toHaveBeenCalled();
  });
});
