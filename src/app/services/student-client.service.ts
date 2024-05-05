import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from '../../models/student';

@Injectable({
  providedIn: 'root',
})
export class StudentClientService {
  constructor(private readonly http: HttpClient) {}

  getStudents() {
    return this.http.get<StudentData>('/assets/character_info.json');
  }
}

export interface StudentData {
  [id: string]: Student;
}
