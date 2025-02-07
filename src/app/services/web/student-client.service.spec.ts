import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { StudentData } from '../../models/student';
import { StudentClientService } from './student-client.service';

describe('StudentClientService', () => {
  let service: StudentClientService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StudentClientService],
    });

    service = TestBed.inject(StudentClientService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensures there are no outstanding requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch students from JP file', () => {
    const mockData: StudentData = {
      /* mock student data */
    };

    service.getStudentsJp().subscribe((data) => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne('/assets/character_info.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockData); // Respond with mock data
  });

  it('should fetch students from GL file', () => {
    const mockData: StudentData = {
      /* mock student data */
    };

    service.getStudentsGl().subscribe((data) => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne('/assets/character_info_gl.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });
});
