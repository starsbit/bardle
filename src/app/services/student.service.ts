import { Injectable } from '@angular/core';
import moment from 'moment';
import { Student } from '../../models/student';
import { StudentClientService, StudentData } from './student-client.service';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private target: Student;
  private students: StudentData;
  private background: string;

  constructor(private readonly studentClientService: StudentClientService) {
    this.hydrate();
  }

  getStudentById(id: string): Student | null {
    if (!this.students) {
      this.hydrate();
      return null;
    }
    return this.students[id];
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

  getBackground(): string {
    return this.background;
  }

  getYesterdaysStudent(): Student | null {
    if (!this.students) {
      return null;
    }
    const yesterday = moment().utc().subtract(1, 'days').format('DD.MM.YYYY');
    const index = this.hashCode(yesterday) % Object.keys(this.students).length;
    const keys: string[] = Object.keys(this.students);
    return this.students[keys[index]];
  }

  private pickCharacterOfTheDay() {
    const today = moment().utc().format('DD.MM.YYYY'); // Get the current date as a string
    const index = this.hashCode(today) % Object.keys(this.students).length; // Map the date string to an index
    const keys: string[] = Object.keys(this.students);
    this.target = this.students[keys[index]]; // Assign the character for the day
  }

  private pickBackgroundOfTheDay() {
    const today = moment().utc().format('DD.MM.YYYY');
    const index = this.hashCode(today) % 26;
    if (index < 10) {
      this.background = `assets/images/backgrounds/0${index}.png`;
    } else {
      this.background = `assets/images/backgrounds/${index}.png`;
    }
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

  private hydrate() {
    return this.studentClientService.getStudents().subscribe((students) => {
      this.students = students;
      this.pickCharacterOfTheDay();
      this.pickBackgroundOfTheDay();
    });
  }
}
