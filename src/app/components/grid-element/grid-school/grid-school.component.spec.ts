import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridSchoolComponent } from './grid-school.component';

describe('GridSchoolComponent', () => {
  let component: GridSchoolComponent;
  let fixture: ComponentFixture<GridSchoolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridSchoolComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GridSchoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
