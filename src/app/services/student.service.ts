import { Injectable } from '@angular/core';
import { forkJoin, map, of, tap } from 'rxjs';
import { Student, StudentData, StudentListData } from '../models/student';
import { StudentList } from '../models/student-list';
import { hashCode } from '../utils/hash';
import { StudentClientService } from './web/student-client.service';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private students: StudentListData | null = null;

  constructor(private readonly studentClientService: StudentClientService) {}

  getYesterdaysStudent(students: StudentData): Student {
    const yesterday = new Date();
    yesterday.setUTCDate(yesterday.getUTCDate() - 1);
    const formattedDate = `${String(yesterday.getUTCDate()).padStart(
      2,
      '0'
    )}.${String(yesterday.getUTCMonth() + 1).padStart(
      2,
      '0'
    )}.${yesterday.getUTCFullYear()}`;
    return this.handleDisabledCharacters(
      this.getStudent(students, formattedDate),
      students
    );
  }

  getTodaysStudent(students: StudentData): Student {
    const today = new Date();
    const formattedDate = `${String(today.getUTCDate()).padStart(
      2,
      '0'
    )}.${String(today.getUTCMonth() + 1).padStart(
      2,
      '0'
    )}.${today.getUTCFullYear()}`;
    return this.handleDisabledCharacters(
      this.getStudent(students, formattedDate),
      students
    );
  }

  getStudent(students: StudentData, seed: string): Student {
    const index = hashCode(seed) % Object.keys(students).length;
    const keys: string[] = Object.keys(students);
    return students[keys[index]];
  }

  getStudentData() {
    if (this.students) {
      return of(this.students);
    }
    const globalData = this.studentClientService.getStudentsGl();
    const japanData = this.studentClientService.getStudentsJp();

    return forkJoin([globalData, japanData]).pipe(
      map((data) => {
        return {
          [StudentList.GLOBAL]: data[0],
          [StudentList.JAPAN]: data[1],
        };
      }),
      tap((studentData: StudentListData) => (this.students = studentData))
    );
  }

  private handleDisabledCharacters(
    student: Student,
    students: StudentData
  ): Student {
    while (student.disabled) {
      student = this.getStudent(students, student.fullName);
    }
    return student;
  }
}
