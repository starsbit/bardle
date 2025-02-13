import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Student } from '../../models/student';
import { hashCode } from '../../utils/hash';

@Injectable({
  providedIn: 'root',
})
export class AssetService {
  private static readonly ASSET_IMAGES_PATH = '/assets/images';
  private static readonly ASSET_PREFIX_PATH = environment.assetLocationPrefix;

  constructor(private readonly http: HttpClient) {}

  getStudentIcon(student: Student) {
    return this.http.get(this.getStudentIconLocation(student));
  }

  getStudentIconLocation(student: Student) {
    return `${AssetService.ASSET_PREFIX_PATH}/${AssetService.ASSET_IMAGES_PATH}/characters/${student.image}`;
  }

  getIconLocation(icon: string) {
    return `${AssetService.ASSET_PREFIX_PATH}/${AssetService.ASSET_IMAGES_PATH}/icons/${icon}`;
  }

  getBackground(index: number) {
    return this.http.get(this.getBackgroundLocation(index));
  }

  getBackgroundLocation(index: number) {
    if (index < 1) {
      index = 1;
    }
    index = index % 48;
    if (index < 10) {
      return `${AssetService.ASSET_PREFIX_PATH}/${AssetService.ASSET_IMAGES_PATH}/backgrounds/0${index}.png`;
    }
    return `${AssetService.ASSET_PREFIX_PATH}/${AssetService.ASSET_IMAGES_PATH}/backgrounds/${index}.png`;
  }

  getSchoolIconLocation(student: Student) {
    return `${AssetService.ASSET_PREFIX_PATH}/${
      AssetService.ASSET_IMAGES_PATH
    }/schools/${student.school.replace(' ', '')}.png`;
  }

  getRoleIconLocation(student: Student) {
    return `${AssetService.ASSET_PREFIX_PATH}/${
      AssetService.ASSET_IMAGES_PATH
    }/roles/${student.role.replace(' ', '')}.png`;
  }

  pickBackgroundOfTheDayLocation() {
    const today = new Date();
    const formattedDate = `${String(today.getUTCDate()).padStart(
      2,
      '0'
    )}.${String(today.getUTCMonth() + 1).padStart(
      2,
      '0'
    )}.${today.getUTCFullYear()}`;
    return this.getBackgroundLocation(hashCode(formattedDate));
  }
}
