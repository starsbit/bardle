import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { GridComponent } from '../../components/grid/grid.component';
import { GuessInputComponent } from '../../components/guess-input/guess-input.component';
import { ResultComponent } from '../../components/result/result.component';
import { StudentListSelectionComponent } from '../../components/student-list-selection/student-list-selection.component';
import { TutorialComponent } from '../../components/tutorial/tutorial.component';
import { YesterdaysStudentComponent } from '../../components/yesterdays-student/yesterdays-student.component';
import { Student } from '../../models/student';
import { GameService } from '../../services/game.service';
import { TranslateService } from '../../services/translate.service';

@Component({
  selector: 'ba-game',
  imports: [
    GridComponent,
    StudentListSelectionComponent,
    GuessInputComponent,
    TutorialComponent,
    YesterdaysStudentComponent,
    ResultComponent,
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameComponent implements OnInit, OnDestroy {
  private readonly subscriptions = new Subscription();
  public won = false;
  public lost = false;
  public gameStarted = false;
  public yesterdayStudent: Student | null = null;
  public todaysStudent: Student | null = null;

  constructor(
    private readonly gameService: GameService,
    private readonly translateService: TranslateService
  ) {}

  ngOnInit() {
    this.subscriptions.add(
      this.gameService.$gameStateChange().subscribe(() => {
        this.handleGuessChange();
        this.handleResultChange();
        this.handleYesterdayStudentChange();
        this.handleTodaysStudentChange();
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  get todaysStudentName(): string {
    if (this.translateService.getCurrentLang().code === 'ja') {
      return this.todaysStudent ? this.todaysStudent.nativeName : '...';
    }
    return this.todaysStudent ? this.todaysStudent.fullName : '...';
  }

  private handleGuessChange() {
    const guess = this.gameService.getCurrentGuesses();
    if (!guess || !guess.length) {
      this.gameStarted = false;
      return;
    }
    this.gameStarted = true;
  }

  private handleResultChange() {
    const gameResult = this.gameService.getCurrentResult();
    if (!gameResult) {
      this.won = false;
      this.lost = false;
      return;
    }
    this.won = gameResult.won || false;
    this.lost = gameResult.lost || false;
  }

  private handleYesterdayStudentChange() {
    const studentId = this.gameService.getYesterdaysStudent();
    const students = this.gameService.getCurrentStudentData();
    if (!studentId || !students) {
      this.yesterdayStudent = null;
      return;
    }
    this.yesterdayStudent = students[studentId];
  }

  private handleTodaysStudentChange() {
    const studentId = this.gameService.getTodaysStudent();
    const students = this.gameService.getCurrentStudentData();
    if (!studentId || !students) {
      this.todaysStudent = null;
      return;
    }
    this.todaysStudent = students[studentId];
  }
}
