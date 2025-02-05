import { Injectable } from '@angular/core';
import { map, ReplaySubject, tap } from 'rxjs';
import { Student, StudentData } from '../models/student';
import { StudentList } from '../models/student-list';
import { StudentClientService } from './web/student-client.service';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private readonly studentListChange = new ReplaySubject<Student[]>();

  constructor(private readonly studentClientService: StudentClientService) {}

  $studentListChange() {
    return this.studentListChange.asObservable();
  }

  /**
   * Gets called when the student list changes in the student list service.
   * @param studentList
   * @returns observable of student list
   */
  setStudentList(studentList: StudentList) {
    let observable;
    if (studentList === StudentList.JAPAN) {
      observable = this.studentClientService.getStudentsJp();
    } else {
      observable = this.studentClientService.getStudentsGl();
    }
    observable
      .pipe(
        map((studentData: StudentData) => {
          const students: Student[] = Object.values(studentData);
          return students;
        }),
        tap((students: Student[]) => this.studentListChange.next(students))
      )
      .subscribe();
  }
}
