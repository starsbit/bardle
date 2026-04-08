import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Student, StudentData, StudentListData } from '../models/student';
import { StudentList } from '../models/student-list';
import { getCurrentUTCDateNoTime } from '../utils/date-utils';
import { hashCode } from '../utils/hash-utils';
import { StudentService } from './student.service';
import { StudentClientService } from './web/student-client.service';

describe('StudentService', () => {
  let service: StudentService;
  let studentClientService: jasmine.SpyObj<StudentClientService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('StudentClientService', [
      'getStudentsGl',
      'getStudentsJp',
    ]);

    TestBed.configureTestingModule({
      providers: [
        StudentService,
        { provide: StudentClientService, useValue: spy },
      ],
    });

    service = TestBed.inject(StudentService);
    studentClientService = TestBed.inject(
      StudentClientService
    ) as jasmine.SpyObj<StudentClientService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getYesterdaysStudent', () => {
    it('should return the correct student for yesterday', () => {
      const students: StudentData = {
        '1': { id: '1', fullName: 'Student 1' } as Student,
        '2': { id: '2', fullName: 'Student 2' } as Student,
      };
      const yesterday = getCurrentUTCDateNoTime();
      yesterday.setUTCDate(yesterday.getUTCDate() - 1);
      const formattedDate = `${String(yesterday.getUTCDate()).padStart(
        2,
        '0'
      )}.${String(yesterday.getUTCMonth() + 1).padStart(
        2,
        '0'
      )}.${yesterday.getUTCFullYear()}`;
      const index = hashCode(formattedDate) % Object.keys(students).length;
      const keys: string[] = Object.keys(students);
      const expectedStudent = students[keys[index]];

      expect(service.getYesterdaysStudent(students)).toEqual(expectedStudent);
    });

    it('should use UTC date as the seed, not the local date', () => {
      // Mock "now" to April 8 2026 UTC midnight.
      // getCurrentUTCDateNoTime() will derive yesterday as April 7 UTC.
      // With the bug, getDate() in UTC-N timezones would return April 6 for midnight-UTC April 7.
      jasmine.clock().install();
      jasmine.clock().mockDate(new Date(Date.UTC(2026, 3, 8)));

      const students: StudentData = {
        '1': { id: '1', fullName: 'Student 1' } as Student,
        '2': { id: '2', fullName: 'Student 2' } as Student,
      };

      spyOn(service, 'getStudent').and.callThrough();
      service.getYesterdaysStudent(students);

      // Yesterday in UTC is April 7 — seed must be '07.04.2026'
      expect(service.getStudent).toHaveBeenCalledWith(students, '07.04.2026');

      jasmine.clock().uninstall();
    });
  });

  describe('getTodaysStudent', () => {
    it('should return the correct student for today', () => {
      const students: StudentData = {
        '1': { id: '1', fullName: 'Student 1' } as Student,
        '2': { id: '2', fullName: 'Student 2' } as Student,
      };
      const today = getCurrentUTCDateNoTime();
      const formattedDate = `${String(today.getUTCDate()).padStart(
        2,
        '0'
      )}.${String(today.getUTCMonth() + 1).padStart(
        2,
        '0'
      )}.${today.getUTCFullYear()}`;
      const index = hashCode(formattedDate) % Object.keys(students).length;
      const keys: string[] = Object.keys(students);
      const expectedStudent = students[keys[index]];

      expect(service.getTodaysStudent(students)).toEqual(expectedStudent);
    });

    it('should use UTC date as the seed, not the local date', () => {
      // Mock "now" to April 8 2026 UTC midnight.
      // In UTC-N timezones, getDate() on this Date returns April 7 — that was the bug.
      // The fix uses getUTCDate() which always returns 8 regardless of timezone.
      jasmine.clock().install();
      jasmine.clock().mockDate(new Date(Date.UTC(2026, 3, 8)));

      const students: StudentData = {
        '1': { id: '1', fullName: 'Student 1' } as Student,
        '2': { id: '2', fullName: 'Student 2' } as Student,
      };

      spyOn(service, 'getStudent').and.callThrough();
      service.getTodaysStudent(students);

      // Seed must be '08.04.2026' (UTC date), not '07.04.2026' (local date in UTC-N)
      expect(service.getStudent).toHaveBeenCalledWith(students, '08.04.2026');

      jasmine.clock().uninstall();
    });

    it('should produce the same student for all timezones at the same UTC moment', () => {
      // All users at the same UTC moment must see the same student.
      // The seed must be derived from UTC date components, not local ones.
      jasmine.clock().install();
      jasmine.clock().mockDate(new Date(Date.UTC(2026, 3, 8)));

      const students: StudentData = {
        '1': { id: '1', fullName: 'Student 1' } as Student,
        '2': { id: '2', fullName: 'Student 2' } as Student,
        '3': { id: '3', fullName: 'Student 3' } as Student,
      };

      const result = service.getTodaysStudent(students);
      const expected = service.getStudent(students, '08.04.2026');
      expect(result).toEqual(expected);

      jasmine.clock().uninstall();
    });
  });

  describe('getStudentData', () => {
    it('should return student data from the client service', (done: DoneFn) => {
      const globalData: StudentData = {
        '1': { id: '1', fullName: 'Global Student' } as Student,
      };
      const japanData: StudentData = {
        '2': { id: '2', fullName: 'Japan Student' } as Student,
      };
      studentClientService.getStudentsGl.and.returnValue(of(globalData));
      studentClientService.getStudentsJp.and.returnValue(of(japanData));

      service.getStudentData().subscribe((data: StudentListData) => {
        expect(data).toEqual({
          [StudentList.GLOBAL]: globalData,
          [StudentList.JAPAN]: japanData,
        });
        done();
      });
    });

    it('should return cached student data if available', (done: DoneFn) => {
      const cachedData: StudentListData = {
        [StudentList.GLOBAL]: {
          '1': { id: '1', fullName: 'Cached Global Student' } as Student,
        },
        [StudentList.JAPAN]: {
          '2': { id: '2', fullName: 'Cached Japan Student' } as Student,
        },
      };
      service['students'] = cachedData;

      service.getStudentData().subscribe((data: StudentListData) => {
        expect(data).toEqual(cachedData);
        done();
      });
    });
  });
});
