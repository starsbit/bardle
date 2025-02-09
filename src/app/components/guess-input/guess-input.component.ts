import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Student } from '../../models/student';
import { DEFAULT_STUDENT_LIST, StudentList } from '../../models/student-list';
import { GameService } from '../../services/game.service';
import { AssetService } from '../../services/web/asset.service';

@Component({
  selector: 'ba-guess-input',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatIconModule,
    AsyncPipe,
    NgOptimizedImage,
  ],
  templateUrl: './guess-input.component.html',
  styleUrls: ['./guess-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GuessInputComponent implements OnInit, OnDestroy {
  guessInputControl = new FormControl('');
  students: Student[] = [];
  filteredOptions!: Observable<Student[]>;
  answer: Student | null = null;
  previousSelection: StudentList = DEFAULT_STUDENT_LIST;

  private readonly subscriptions = new Subscription();

  constructor(
    private readonly gameService: GameService,
    public readonly assetService: AssetService
  ) {
    this.subscriptions.add(
      this.gameService.$gameStateChange().subscribe(() => {
        this.checkGameResult();
        this.checkSelectionChange();
        const data = this.gameService.getCurrentStudentData();
        if (data) {
          this.students = Object.values(data);
          this.students.sort((a, b) => a.shortName.localeCompare(b.shortName));
        } else {
          this.students = [];
        }
      })
    );
  }

  ngOnInit() {
    this.filteredOptions = this.guessInputControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  onSelectionChange(selection: Student) {
    this.gameService.addGuess(selection.id);
    this.inputReset();
  }

  private _filter(value: string): Student[] {
    const filterValue = value.toLowerCase();
    const currentGuesses = this.gameService.getCurrentGuesses();
    if (!currentGuesses) {
      return [];
    }
    return this.students.filter(
      (student) =>
        student.fullName.toLowerCase().includes(filterValue) &&
        !currentGuesses.some((guess) => guess === student.id)
    );
  }

  private inputReset() {
    this.guessInputControl.reset();
    this.filteredOptions = this.guessInputControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
  }

  private checkGameResult() {
    const latestList = this.gameService.getCurrentList();
    const result = this.gameService.getCurrentResult();
    if (latestList && result && (result.won || result.lost)) {
      this.guessInputControl.disable();
    } else {
      this.guessInputControl.enable();
    }
  }

  private checkSelectionChange() {
    if (this.previousSelection !== this.gameService.getCurrentList()) {
      this.inputReset();
      this.previousSelection = this.gameService.getCurrentList()!;
    }
  }
}
