import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridStudentComponent } from './grid-student.component';

describe('GridCharacterComponent', () => {
  let component: GridStudentComponent;
  let fixture: ComponentFixture<GridStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridStudentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GridStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
