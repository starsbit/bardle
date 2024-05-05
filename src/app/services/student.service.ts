import { Injectable } from '@angular/core';
import moment from 'moment';
import { Student } from '../../models/student';
import { StudentClientService, StudentData } from './student-client.service';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  target: Student;
  targetId: string;

  students: StudentData;

  constructor(private readonly studentClientService: StudentClientService) {
    this.studentClientService.getStudents().subscribe((students) => {
      this.students = students;
      this.pickCharacterOfTheDay();
    });
  }

  getStudents(): Student[] {
    if (!this.students) {
      return [];
    }
    return Object.values(this.students);
  }

  getStudent(id: string): Student | undefined {
    return this.students[id];
  }

  getTarget(): Student {
    return this.target;
  }

  private pickCharacterOfTheDay() {
    const today = moment().utc().format('DD.MM.YYYY'); // Get the current date as a string
    const index = this.hashCode(today) % Object.keys(this.students).length; // Map the date string to an index
    const keys: string[] = Object.keys(this.students);
    this.target = this.students[keys[index]]; // Assign the character for the day
    this.targetId = keys[index];
  }

  // Simple hash function to generate a number from a string
  private hashCode(s: string): number {
    let hash = 0;
    if (s.length == 0) return hash;
    for (let i = 0; i < s.length; i++) {
      const char = s.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash |= 0; // Convert to 32bit integer
    }
    return Math.abs(hash);
  }
}
