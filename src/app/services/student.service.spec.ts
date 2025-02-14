import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Student, StudentData, StudentListData } from '../models/student';
import { StudentList } from '../models/student-list';
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
      const yesterday = new Date();
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
  });

  describe('getTodaysStudent', () => {
    it('should return the correct student for today', () => {
      const students: StudentData = {
        '1': { id: '1', fullName: 'Student 1' } as Student,
        '2': { id: '2', fullName: 'Student 2' } as Student,
      };
      const today = new Date();
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
