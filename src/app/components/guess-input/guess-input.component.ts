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
import { GameService } from '../../services/game.service';
import { StudentService } from '../../services/student.service';
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

  private readonly subscriptions = new Subscription();

  constructor(
    private readonly studentService: StudentService,
    private readonly gameService: GameService,
    public readonly assetService: AssetService
  ) {
    this.subscriptions.add(
      studentService.$studentListChange().subscribe((students) => {
        this.students = students;
        this.answer = this.gameService.getAnswer();
        this.inputReset();
      })
    );
    if (!this.gameService.getAnswer()) {
      this.guessInputControl.disable();
    }
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
    this.gameService.addGuess(selection);
    this.inputReset();
  }

  private _filter(value: string): Student[] {
    const filterValue = value.toLowerCase();
    const currentGuesses = this.gameService.getGuesses();
    return this.students.filter(
      (student) =>
        student.fullName.toLowerCase().includes(filterValue) &&
        !currentGuesses.some((guess) => guess.id === student.id)
    );
  }

  private inputReset() {
    this.guessInputControl.reset();
    this.guessInputControl.enable();
    this.filteredOptions = this.guessInputControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
  }
}
