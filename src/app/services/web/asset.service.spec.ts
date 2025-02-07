import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Student } from '../../models/student';
import { hashCode } from '../../utils/hash';
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
      '/assets/images/characters/test-student.png'
    );
  });

  it('should return correct icon location', () => {
    expect(service.getIconLocation('test-icon.png')).toBe(
      '/assets/images/icons/test-icon.png'
    );
  });

  it('should return correct background location for valid index', () => {
    expect(service.getBackgroundLocation(5)).toBe(
      '/assets/images/backgrounds/05.png'
    );
    expect(service.getBackgroundLocation(15)).toBe(
      '/assets/images/backgrounds/15.png'
    );
  });

  it('should return correct background location for index below 1', () => {
    expect(service.getBackgroundLocation(0)).toBe(
      '/assets/images/backgrounds/01.png'
    );
    expect(service.getBackgroundLocation(-5)).toBe(
      '/assets/images/backgrounds/01.png'
    );
  });

  it('should return correct background location for index wrapping (modulo 48)', () => {
    expect(service.getBackgroundLocation(49)).toBe(
      '/assets/images/backgrounds/01.png'
    );
    expect(service.getBackgroundLocation(95)).toBe(
      '/assets/images/backgrounds/47.png'
    );
  });

  it('should return correct school icon location', () => {
    const student: Student = {
      image: 'test.png',
      school: 'Test School',
      role: 'TestRole',
    } as Student;
    expect(service.getSchoolIconLocation(student)).toBe(
      '/assets/images/schools/TestSchool.png'
    );
  });

  it('should return correct role icon location', () => {
    const student: Student = {
      image: 'test.png',
      school: 'TestSchool',
      role: 'Test Role',
    } as Student;
    expect(service.getRoleIconLocation(student)).toBe(
      '/assets/images/roles/TestRole.png'
    );
  });

  it('should return correct background of the day location', () => {
    const today = new Date();
    const formattedDate = `${String(today.getUTCDate()).padStart(
      2,
      '0'
    )}.${String(today.getUTCMonth() + 1).padStart(
      2,
      '0'
    )}.${today.getUTCFullYear()}`;
    const expectedIndex = hashCode(formattedDate) % 48;
    const expectedBackground =
      expectedIndex < 10
        ? `/assets/images/backgrounds/0${expectedIndex}.png`
        : `/assets/images/backgrounds/${expectedIndex}.png`;

    expect(service.pickBackgroundOfTheDayLocation()).toBe(expectedBackground);
  });

  it('should fetch student icon using HTTP GET', () => {
    const student: Student = {
      image: 'test.png',
      school: 'TestSchool',
      role: 'TestRole',
    } as Student;

    service.getStudentIcon(student).subscribe();

    const req = httpMock.expectOne('/assets/images/characters/test.png');
    expect(req.request.method).toBe('GET');
    req.flush(null);
  });

  it('should fetch background using HTTP GET', () => {
    service.getBackground(3).subscribe();

    const req = httpMock.expectOne('/assets/images/backgrounds/03.png');
    expect(req.request.method).toBe('GET');
    req.flush(null);
  });
});
