import { ChangeDetectorRef, Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { RULES } from '../../constants/rules';
import { Student } from '../../models/student';
import { StudentList } from '../../models/student-list';
import { GameService } from '../../services/game.service';
import { GridHeaderComponent } from '../grid-header/grid-header.component';
import { GridRowComponent } from '../grid-row/grid-row.component';

@Component({
  selector: 'ba-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
  imports: [GridHeaderComponent, GridRowComponent],
})
export class GridComponent implements OnInit, OnDestroy {
  private readonly gameService = inject(GameService);
  private readonly cdr = inject(ChangeDetectorRef);

  answer: Student | null = null;
  guesses: (Student | null)[] = [];
  list: StudentList | undefined = undefined;
  private subscriptions = new Subscription();

  ngOnInit() {
    this.subscriptions.add(
      this.gameService.$gameStateChange().subscribe(() => {
        this.updateAnswer();
        this.updateGuesses();
        this.updateList();
        this.cdr.markForCheck();
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  private updateAnswer() {
    const currentAnswer = this.gameService.getCurrentAnswer();
    if (!currentAnswer) {
      return;
    }
    const currentStudents = this.gameService.getCurrentStudentData();
    if (!currentStudents) {
      return;
    }
    this.answer = currentStudents[currentAnswer];
  }

  private updateGuesses() {
    const currentStudents = this.gameService.getCurrentStudentData();
    const currentGuessesId = this.gameService.getCurrentGuesses();
    if (!currentGuessesId || !currentStudents) {
      return;
    }
    let currentGuesses = currentGuessesId.map((id) => currentStudents[id]);
    currentGuesses = currentGuesses.concat(
      Array(RULES.MAX_GUESSES - currentGuesses.length).fill(null)
    );
    this.guesses = currentGuesses;
  }

  private updateList() {
    this.list = this.gameService.getCurrentList();
  }
}
