import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'ba-student-list-selection',
  imports: [FormsModule, MatFormFieldModule, MatSelectModule, MatInputModule],
  templateUrl: './student-list-selection.component.html',
  styleUrl: './student-list-selection.component.scss',
})
export class StudentListSelectionComponent {
  selectedStudentList!: string;
  studentLists: string[] = ['Global', 'Japan'];
}
