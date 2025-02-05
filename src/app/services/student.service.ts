import { Injectable } from '@angular/core';
import { map, ReplaySubject, tap } from 'rxjs';
import { Student, StudentData } from '../models/student';
import { StudentList } from '../models/student-list';
import { hashCode } from '../utils/hash';
import { StudentClientService } from './web/student-client.service';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private readonly studentListChange = new ReplaySubject<Student[]>();
  private students: StudentData = {};

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
        tap((studentData: StudentData) => (this.students = studentData)),
        map((studentData: StudentData) => {
          const students: Student[] = Object.values(studentData);
          return students;
        }),
        tap((students: Student[]) => this.studentListChange.next(students))
      )
      .subscribe();
  }

  getYesterdaysStudent(): Student | null {
    if (!this.students) {
      return null;
    }
    const yesterday = new Date();
    yesterday.setUTCDate(yesterday.getUTCDate() - 1);
    const formattedDate = `${String(yesterday.getUTCDate()).padStart(
      2,
      '0'
    )}.${String(yesterday.getUTCMonth() + 1).padStart(
      2,
      '0'
    )}.${yesterday.getUTCFullYear()}`;
    const index = hashCode(formattedDate) % Object.keys(this.students).length;
    const keys: string[] = Object.keys(this.students);
    return this.students[keys[index]];
  }

  getTodaysStudent(): Student | null {
    if (!this.students) {
      return null;
    }
    const today = new Date();
    const formattedDate = `${String(today.getUTCDate()).padStart(
      2,
      '0'
    )}.${String(today.getUTCMonth() + 1).padStart(
      2,
      '0'
    )}.${today.getUTCFullYear()}`;
    const index = hashCode(formattedDate) % Object.keys(this.students).length;
    const keys: string[] = Object.keys(this.students);
    return this.students[keys[index]];
  }
}
