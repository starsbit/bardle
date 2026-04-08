import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Student, StudentData, StudentListData } from '../models/student';
import { StudentList } from '../models/student-list';
import * as dateUtils from '../utils/date-utils';
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
      // April 8 2026 UTC midnight — in UTC-N timezones getDate() returns April 7
      const utcMidnight = new Date(Date.UTC(2026, 3, 8));
      const yesterday = new Date(Date.UTC(2026, 3, 7)); // April 7 UTC
      spyOn(dateUtils, 'getCurrentUTCDateNoTime').and.returnValue(utcMidnight);

      const students: StudentData = {
        '1': { id: '1', fullName: 'Student 1' } as Student,
        '2': { id: '2', fullName: 'Student 2' } as Student,
      };

      spyOn(service, 'getStudent').and.callThrough();
      service.getYesterdaysStudent(students);

      const expectedSeed = `${String(yesterday.getUTCDate()).padStart(2, '0')}.${String(yesterday.getUTCMonth() + 1).padStart(2, '0')}.${yesterday.getUTCFullYear()}`;
      expect(service.getStudent).toHaveBeenCalledWith(students, expectedSeed);
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
      // April 8 2026 UTC midnight — in UTC-N timezones getDate() returns April 7
      const utcMidnight = new Date(Date.UTC(2026, 3, 8));
      spyOn(dateUtils, 'getCurrentUTCDateNoTime').and.returnValue(utcMidnight);

      const students: StudentData = {
        '1': { id: '1', fullName: 'Student 1' } as Student,
        '2': { id: '2', fullName: 'Student 2' } as Student,
      };

      spyOn(service, 'getStudent').and.callThrough();
      service.getTodaysStudent(students);

      // Seed must use getUTCDate() = 8, not getDate() which is 7 in UTC-N timezones
      const expectedSeed = `${String(utcMidnight.getUTCDate()).padStart(2, '0')}.${String(utcMidnight.getUTCMonth() + 1).padStart(2, '0')}.${utcMidnight.getUTCFullYear()}`;
      expect(service.getStudent).toHaveBeenCalledWith(students, expectedSeed);
    });

    it('should produce the same student for all timezones at the same UTC moment', () => {
      // Simulate users in different timezones seeing the same UTC midnight date.
      // All must see the same student regardless of local time offset.
      const utcMidnightApril8 = new Date(Date.UTC(2026, 3, 8));
      spyOn(dateUtils, 'getCurrentUTCDateNoTime').and.returnValue(utcMidnightApril8);

      const students: StudentData = {
        '1': { id: '1', fullName: 'Student 1' } as Student,
        '2': { id: '2', fullName: 'Student 2' } as Student,
        '3': { id: '3', fullName: 'Student 3' } as Student,
      };

      const result = service.getTodaysStudent(students);

      // The expected student is always keyed off the UTC date string "08.04.2026"
      const utcSeed = '08.04.2026';
      const expected = service.getStudent(students, utcSeed);
      expect(result).toEqual(expected);
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
