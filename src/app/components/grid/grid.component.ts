import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { RULES } from '../../constants/rules';
import { Student } from '../../models/student';
import { GameService } from '../../services/game.service';
import { GridHeaderComponent } from '../grid-header/grid-header.component';
import { GridRowComponent } from '../grid-row/grid-row.component';

@Component({
  selector: 'ba-grid',
  imports: [GridRowComponent, GridHeaderComponent],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridComponent implements OnDestroy, OnInit {
  private readonly subscriptions = new Subscription();
  guesses = Array(RULES.MAX_GUESSES).fill(null);
  answer: Student | null = null;

  constructor(
    private readonly gameService: GameService,
    private readonly cdr: ChangeDetectorRef
  ) {
    this.subscriptions.add(
      this.gameService.$answerChanged().subscribe(() => {
        this.answer = this.gameService.getAnswer();
      })
    );
  }

  ngOnInit() {
    this.subscriptions.add(
      this.gameService.$guessesChanged().subscribe((guesses) => {
        this.guesses = guesses.concat(
          Array(RULES.MAX_GUESSES - guesses.length).fill(null)
        );
        this.cdr.markForCheck();
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
