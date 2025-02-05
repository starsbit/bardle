import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from '../../models/student';

@Injectable({
  providedIn: 'root',
})
export class AssetService {
  private static readonly ASSET_IMAGES_PATH = '/assets/images';

  constructor(private readonly http: HttpClient) {}

  getIcon(student: Student) {
    return this.http.get(this.getIconLocation(student));
  }

  getIconLocation(student: Student) {
    return `${AssetService.ASSET_IMAGES_PATH}/characters/${student.image}`;
  }

  getBackground(index: number) {
    return this.http.get(this.getBackgroundLocation(index));
  }

  getBackgroundLocation(index: number) {
    if (index > 47 || index < 1) {
      index = 1;
    }
    if (index < 10) {
      return `${AssetService.ASSET_IMAGES_PATH}/backgrounds/0${index}.png`;
    }
    return `${AssetService.ASSET_IMAGES_PATH}/backgrounds/${index}.png`;
  }

  getSchoolIconLocation(student: Student) {
    return `${AssetService.ASSET_IMAGES_PATH}/schools/${student.school.replace(
      ' ',
      ''
    )}.png`;
  }

  getRoleIconLocation(student: Student) {
    return `${AssetService.ASSET_IMAGES_PATH}/roles/${student.role.replace(
      ' ',
      ''
    )}.png`;
  }
}
