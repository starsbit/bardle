import { TestBed } from '@angular/core/testing';

import { StudentClientService } from './student-client.service';

describe('StudentClientService', () => {
  let service: StudentClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
