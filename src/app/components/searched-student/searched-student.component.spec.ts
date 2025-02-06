import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchedStudentComponent } from './searched-student.component';

describe('SearchedStudentComponent', () => {
  let component: SearchedStudentComponent;
  let fixture: ComponentFixture<SearchedStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchedStudentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchedStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
