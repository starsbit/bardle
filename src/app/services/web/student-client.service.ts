import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { StudentData } from '../../models/student';

@Injectable({
  providedIn: 'root',
})
export class StudentClientService {
  private static readonly ASSET_PREFIX_PATH = environment.assetLocationPrefix;
  constructor(private readonly http: HttpClient) {}

  getStudentsJp() {
    if (!environment.production) {
      return this.http.get<StudentData>('/assets/character_info.json');
    }
    return this.http.get<StudentData>(
      `${StudentClientService.ASSET_PREFIX_PATH}/assets/character_info.json`
    );
  }

  getStudentsGl() {
    if (!environment.production) {
      return this.http.get<StudentData>('/assets/character_info_gl.json');
    }
    return this.http.get<StudentData>(
      `${StudentClientService.ASSET_PREFIX_PATH}/assets/character_info_gl.json`
    );
  }
}
