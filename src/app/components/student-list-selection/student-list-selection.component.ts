import { TitleCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Subscription } from 'rxjs';
import { StudentList } from '../../models/student-list';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'ba-student-list-selection',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    TitleCasePipe,
  ],
  templateUrl: './student-list-selection.component.html',
  styleUrls: ['./student-list-selection.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentListSelectionComponent implements OnInit, OnDestroy, OnChanges
{
  @Input() disabled = false;
  studentLists = Object.values(StudentList);
  selectedStudentList = new FormControl<StudentList | null>(null);

  private readonly subscriptions = new Subscription();

  constructor(
    private readonly gameService: GameService,
    private readonly cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.subscriptions.add(
      this.gameService.$gameStateChange().subscribe(() => {
        const studentList = this.gameService.getCurrentList();
        if (!studentList) {
          return;
        }
        if (studentList === this.selectedStudentList.value) {
          return;
        }
        this.selectedStudentList.setValue(studentList, { emitEvent: false });
        this.cdr.markForCheck();
      })
    );

    this.selectedStudentList.valueChanges.subscribe((value) => {
      if (value) {
        this.onStudentListChange(value);
      }
    });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['disabled']) {
      if (changes['disabled'].currentValue) {
        this.selectedStudentList.disable();
      } else {
        this.selectedStudentList.enable();
      }
    }
  }

  onStudentListChange(studentList: StudentList) {
    this.gameService.setActiveList(studentList);
  }
}
