import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StudentData } from '../../models/student';

@Injectable({
  providedIn: 'root',
})
export class StudentClientService {
  constructor(private readonly http: HttpClient) {}

  getStudentsJp() {
    return this.http.get<StudentData>('/assets/character_info.json');
  }

  getStudentsGl() {
    return this.http.get<StudentData>('/assets/character_info_gl.json');
  }
}
