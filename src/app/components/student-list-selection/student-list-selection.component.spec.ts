import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentListSelectionComponent } from './student-list-selection.component';

describe('StudentListSelectionComponent', () => {
  let component: StudentListSelectionComponent;
  let fixture: ComponentFixture<StudentListSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentListSelectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentListSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
