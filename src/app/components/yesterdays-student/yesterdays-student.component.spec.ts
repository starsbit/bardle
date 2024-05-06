import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YesterdaysStudentComponent } from './yesterdays-student.component';

describe('YesterdaysStudentComponent', () => {
  let component: YesterdaysStudentComponent;
  let fixture: ComponentFixture<YesterdaysStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YesterdaysStudentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(YesterdaysStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
