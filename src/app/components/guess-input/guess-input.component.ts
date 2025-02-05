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
import { map, Observable, startWith, Subscription } from 'rxjs';
import { Student } from '../../models/student';
import { StudentService } from '../../services/student.service';

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
  styleUrl: './guess-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GuessInputComponent implements OnInit, OnDestroy {
  guessInputControl = new FormControl('');
  students: Student[] = [];
  filteredOptions!: Observable<Student[]>;

  private readonly subscriptions = new Subscription();

  constructor(private readonly studentService: StudentService) {
    this.subscriptions.add(
      studentService.$studentListChange().subscribe((students) => {
        this.students = students;
        this.guessInputControl.reset();
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
    this.guessInputControl.reset();
  }

  private _filter(value: string): Student[] {
    const filterValue = value.toLowerCase();
    return this.students.filter((student) =>
      student.fullName.toLowerCase().includes(filterValue)
    );
  }
}
