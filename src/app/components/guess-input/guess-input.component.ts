import { NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import moment from 'moment';
import { BehaviorSubject } from 'rxjs';
import { Student } from '../../../models/student';
import { LocalStorage } from '../../services/local-storage.service';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'ba-guess-input',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    NgOptimizedImage,
  ],
  templateUrl: './guess-input.component.html',
  styleUrl: './guess-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GuessInputComponent implements OnChanges, OnInit {
  @ViewChild('input') input: ElementRef<HTMLInputElement>;
  myControl = new FormControl('');
  options: Student[];
  filteredOptions: Student[];

  @Input() won = false;
  @Input() lost = false;

  @Output() guesses: BehaviorSubject<Student[]> = new BehaviorSubject<
    Student[]
  >([]);

  constructor(
    private readonly studentService: StudentService,
    private readonly cdr: ChangeDetectorRef,
    private readonly cookieService: LocalStorage
  ) {
    this.options = this.studentService.getStudents();
    this.options.sort((a, b) => a.shortName.localeCompare(b.shortName));
    this.filteredOptions = this.options.slice();
  }

  ngOnInit(): void {
    const initialGuesses = this.cookieService.getGuess();
    if (!initialGuesses) {
      return;
    }

    if (initialGuesses.doy !== moment().utc().dayOfYear()) {
      this.cookieService.setGuess({
        doy: moment().utc().dayOfYear(),
        students: [],
      });
      return;
    }
    initialGuesses.students.forEach((g) => {
      const student = this.studentService.getStudentById(g);
      if (student) {
        this.onSelection(student);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.won || this.lost) {
      this.myControl.disable();
    }
  }

  filter(): void {
    const filterValue = this.input.nativeElement.value.toLowerCase();
    this.filteredOptions = this.options.filter((o) =>
      o.fullName.toLowerCase().includes(filterValue)
    );
  }

  onSelection(selection: Student): void {
    if (this.won || this.lost) {
      this.myControl.disable();
    }
    this.guesses.next([...this.guesses.getValue(), selection]);
    this.options = this.options.filter((o) => o !== selection);
    this.myControl.reset();
    this.filteredOptions = this.options.slice();
    this.cdr.detectChanges();
  }
}
