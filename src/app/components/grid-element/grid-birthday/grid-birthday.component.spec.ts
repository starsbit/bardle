import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridBirthdayComponent } from './grid-birthday.component';

describe('GridBirthdayComponent', () => {
  let component: GridBirthdayComponent;
  let fixture: ComponentFixture<GridBirthdayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridBirthdayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GridBirthdayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
