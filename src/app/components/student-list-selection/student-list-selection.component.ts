import { TitleCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Subscription } from 'rxjs';
import { StudentList } from '../../models/student-list';
import { StudentListService } from '../../services/student-list.service';

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
export class StudentListSelectionComponent implements OnInit, OnDestroy {
  studentLists = Object.values(StudentList);
  selectedStudentList = new FormControl<StudentList | null>(null);

  private readonly subscriptions = new Subscription();

  constructor(
    private readonly studentListService: StudentListService,
    private readonly cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.subscriptions.add(
      this.studentListService.$studentListChange().subscribe((studentList) => {
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

  onStudentListChange(studentList: StudentList) {
    this.studentListService.setStudentListByName(studentList);
  }
}
