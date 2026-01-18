import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Student } from '../../models/student';
import { getCurrentUTCDateNoTime } from '../../utils/date-utils';
import { hashCode } from '../../utils/hash-utils';
import { AssetService } from './asset.service';

describe('AssetService', () => {
  let service: AssetService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AssetService],
    });

    service = TestBed.inject(AssetService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return correct student icon location', () => {
    const student: Student = {
      image: 'test-student.png',
      school: 'TestSchool',
      role: 'TestRole',
    } as Student;
    expect(service.getStudentIconLocation(student)).toBe(
      '/en-US//assets/images/characters/test-student.png'
    );
  });

  it('should return correct icon location', () => {
    expect(service.getIconLocation('test-icon.png')).toBe(
      '/en-US//assets/images/icons/test-icon.png'
    );
  });

  it('should return correct background location for valid index', () => {
    expect(service.getBackgroundLocation(5)).toBe(
      '/en-US//assets/images/backgrounds/05.png'
    );
    expect(service.getBackgroundLocation(15)).toBe(
      '/en-US//assets/images/backgrounds/15.png'
    );
  });

  it('should return correct background location for index below 1', () => {
    expect(service.getBackgroundLocation(0)).toBe(
      '/en-US//assets/images/backgrounds/01.png'
    );
    expect(service.getBackgroundLocation(-5)).toBe(
      '/en-US//assets/images/backgrounds/01.png'
    );
  });

  it('should return correct background location for index wrapping (modulo number of backgrounds)', () => {
    expect(service.getBackgroundLocation(49)).toBe(
      `/en-US//assets/images/backgrounds/${49 % AssetService['BACKGROUND_COUNT']}.png`
    );
    expect(service.getBackgroundLocation(95)).toBe(
      `/en-US//assets/images/backgrounds/${95 % AssetService['BACKGROUND_COUNT']}.png`
    );
  });

  it('should return correct school icon location', () => {
    const student: Student = {
      image: 'test.png',
      school: 'Test School',
      role: 'TestRole',
    } as Student;
    expect(service.getSchoolIconLocation(student)).toBe(
      '/en-US//assets/images/schools/Unknown.png'
    );
  });

  it('should return correct role icon location', () => {
    const student: Student = {
      image: 'test.png',
      school: 'TestSchool',
      role: 'Test Role',
    } as Student;
    expect(service.getRoleIconLocation(student)).toBe(
      '/en-US//assets/images/roles/TestRole.png'
    );
  });

  it('should return correct background of the day location', () => {
    const today = getCurrentUTCDateNoTime();
    const formattedDate = `${String(today.getDate()).padStart(2, '0')}.${String(
      today.getUTCMonth() + 1
    ).padStart(2, '0')}.${today.getUTCFullYear()}`;
    const expectedIndex =
      hashCode(formattedDate) % AssetService['BACKGROUND_COUNT'];
    const expectedBackground =
      expectedIndex < 10
        ? `/en-US//assets/images/backgrounds/0${expectedIndex}.png`
        : `/en-US//assets/images/backgrounds/${expectedIndex}.png`;

    expect(service.pickBackgroundOfTheDayLocation()).toBe(expectedBackground);
  });

  it('should fetch student icon using HTTP GET', () => {
    const student: Student = {
      image: 'test.png',
      school: 'TestSchool',
      role: 'TestRole',
    } as Student;

    service.getStudentIcon(student).subscribe();

    const req = httpMock.expectOne('/en-US//assets/images/characters/test.png');
    expect(req.request.method).toBe('GET');
    req.flush(null);
  });

  it('should fetch background using HTTP GET', () => {
    service.getBackground(3).subscribe();

    const req = httpMock.expectOne('/en-US//assets/images/backgrounds/03.png');
    expect(req.request.method).toBe('GET');
    req.flush(null);
  });
});
