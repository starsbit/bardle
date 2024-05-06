import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnChanges,
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
import { BehaviorSubject } from 'rxjs';
import { Student } from '../../../models/student';
import { RULES } from '../../constants/rules';
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
    AsyncPipe,
  ],
  templateUrl: './guess-input.component.html',
  styleUrl: './guess-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GuessInputComponent implements OnChanges {
  @ViewChild('input') input: ElementRef<HTMLInputElement>;
  myControl = new FormControl('');
  options: Student[];
  filteredOptions: Student[];

  @Output() guesses: BehaviorSubject<Student[]> = new BehaviorSubject<
    Student[]
  >([]);

  @Input() won = false;

  constructor(private readonly studentService: StudentService) {
    this.options = this.studentService.getStudents();
    this.filteredOptions = this.options.slice();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.won || this.guesses.getValue().length >= RULES.MAX_GUESSES) {
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
    if (this.won || this.guesses.getValue().length >= RULES.MAX_GUESSES) {
      this.myControl.disable();
    }
    this.guesses.next([...this.guesses.getValue(), selection]);
    this.options = this.options.filter((o) => o !== selection);
    this.myControl.reset();
    this.filteredOptions = this.options.slice();
  }
}
