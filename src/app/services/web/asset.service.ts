import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Student } from '../../models/student';
import { getCurrentUTCDate } from '../../utils/date-utils';
import { hashCode } from '../../utils/hash-utils';
import { sanitizeSchool } from '../../utils/student-utils';

@Injectable({
  providedIn: 'root',
})
export class AssetService {
  private static readonly ASSET_IMAGES_PATH = '/assets/images';
  private static readonly ASSET_CHANGELOGS_PATH = '/assets/changelogs.md';
  private static readonly ASSET_PREFIX_PATH = environment.assetLocationPrefix;
  private static readonly BACKGROUND_COUNT = 48;
  private fullImagePath: string;

  constructor(private readonly http: HttpClient) {
    if (environment.production) {
      this.fullImagePath = `${AssetService.ASSET_PREFIX_PATH}/${AssetService.ASSET_IMAGES_PATH}`;
    } else {
      this.fullImagePath = AssetService.ASSET_IMAGES_PATH;
    }
  }

  getStudentIcon(student: Student) {
    return this.http.get(this.getStudentIconLocation(student));
  }

  getStudentIconLocation(student: Student) {
    return `${this.fullImagePath}/characters/${student.image}`;
  }

  getIconLocation(icon: string) {
    return `${this.fullImagePath}/icons/${icon}`;
  }

  getBackground(index: number) {
    return this.http.get(this.getBackgroundLocation(index));
  }

  getBackgroundLocation(index: number) {
    if (index < 1) {
      index = 1;
    }
    index = index % AssetService.BACKGROUND_COUNT;
    if (index < 10) {
      return `${this.fullImagePath}/backgrounds/0${index}.png`;
    }
    return `${this.fullImagePath}/backgrounds/${index}.png`;
  }

  getSchoolIconLocation(student: Student) {
    const school = sanitizeSchool(student.school);
    return `${this.fullImagePath}/schools/${school.replace(' ', '')}.png`;
  }

  getRoleIconLocation(student: Student) {
    return `${this.fullImagePath}/roles/${student.role.replace(' ', '')}.png`;
  }

  getChangeLogsLocation() {
    if (!environment.production) {
      return AssetService.ASSET_CHANGELOGS_PATH;
    }
    return `${AssetService.ASSET_PREFIX_PATH}/${AssetService.ASSET_CHANGELOGS_PATH}`;
  }

  getChangeLogs() {
    return this.http.get(this.getChangeLogsLocation(), {
      responseType: 'text',
    });
  }

  pickBackgroundOfTheDayLocation() {
    const today = getCurrentUTCDate();
    const formattedDate = `${String(today).padStart(2, '0')}.${String(
      today.getUTCMonth() + 1
    ).padStart(2, '0')}.${today.getUTCFullYear()}`;
    return this.getBackgroundLocation(hashCode(formattedDate));
  }
}
