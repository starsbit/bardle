import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { GridComponent } from '../../components/grid/grid.component';
import { GuessInputComponent } from '../../components/guess-input/guess-input.component';
import { InfinteModeComponent } from '../../components/infinte-mode/infinte-mode.component';
import { ResultComponent } from '../../components/result/result.component';
import { StudentListSelectionComponent } from '../../components/student-list-selection/student-list-selection.component';
import { TutorialComponent } from '../../components/tutorial/tutorial.component';
import { YesterdaysStudentComponent } from '../../components/yesterdays-student/yesterdays-student.component';
import { ChangeLogsDialogComponent } from '../../dialogs/change-logs/change-logs.component';
import { Student } from '../../models/student';
import { GameService } from '../../services/game.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { TranslateService } from '../../services/translate.service';
import { AssetService } from '../../services/web/asset.service';

@Component({
  selector: 'ba-game',
  imports: [
    GridComponent,
    StudentListSelectionComponent,
    GuessInputComponent,
    TutorialComponent,
    YesterdaysStudentComponent,
    ResultComponent,
    InfinteModeComponent,
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameComponent implements OnInit, OnDestroy {
  private readonly gameService = inject(GameService);
  private readonly translateService = inject(TranslateService);
  private readonly dialog = inject(MatDialog);
  private readonly assetService = inject(AssetService);
  private readonly localStorage = inject(LocalStorageService);

  private readonly subscriptions = new Subscription();
  private changeLogs = '';
  public won = false;
  public lost = false;
  public gameStarted = false;
  public infiniteMode = false;
  public yesterdayStudent: Student | null = null;
  public todaysStudent: Student | null = null;

  ngOnInit() {
    this.subscriptions.add(
      this.gameService.$gameStateChange().subscribe(() => {
        this.handleGuessChange();
        this.handleResultChange();
        this.handleYesterdayStudentChange();
        this.handleTodaysStudentChange();
      })
    );

    this.handleChangeLogDisplay(this.localStorage.getChangeLogReadDate());
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

  onRefresh() {
    this.gameService.refresh();
  }

  onInfiniteModeChange(event: boolean) {
    this.infiniteMode = event;
    this.gameService.setInfiniteMode(this.infiniteMode);
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

  private handleChangeLogDisplay(lastChangeLogDate?: string): void {
    if (this.changeLogs) {
      this.parseChangeLog(this.changeLogs, lastChangeLogDate);
      return;
    }
    this.assetService.getChangeLogs().subscribe((logs) => {
      this.changeLogs = logs;
      this.parseChangeLog(logs, lastChangeLogDate);
    });
  }

  private openChangeLogs(changeLogs: string): void {
    this.dialog
      .open(ChangeLogsDialogComponent, {
        data: { changeLogs },
      })
      .afterClosed()
      .subscribe(() => {
        this.localStorage.setChangeLogReadDate(
          new Date().toISOString().slice(0, 10)
        );
      });
  }

  private extractFirstDate(logs: string): Date {
    const dateRegex = /Date:\s*(\d{4}\/\d{2}\/\d{2})/;
    const match = logs.match(dateRegex);
    if (match) {
      return new Date(match[1]);
    }
    return new Date();
  }

  private parseChangeLog(logs: string, lastChangeLogDate?: string): void {
    const firstDate = this.extractFirstDate(logs);
    if (!lastChangeLogDate || firstDate > new Date(lastChangeLogDate)) {
      this.openChangeLogs(logs);
    }
  }
}
