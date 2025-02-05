import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from '../../models/student';

@Injectable({
  providedIn: 'root',
})
export class AssetService {
  constructor(private readonly http: HttpClient) {}

  getIcon(student: Student) {
    return this.http.get(this.getIconLocation(student));
  }

  getIconLocation(student: Student) {
    return `/assets/images/characters/${student.image}`;
  }

  getBackground(index: number) {
    return this.http.get(this.getBackgroundLocation(index));
  }

  getBackgroundLocation(index: number) {
    if (index > 47 || index < 1) {
      index = 1;
    }
    if (index < 10) {
      return `/assets/images/backgrounds/0${index}.png`;
    }
    return `/assets/images/backgrounds/${index}.png`;
  }
}
