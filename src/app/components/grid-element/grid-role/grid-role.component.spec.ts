import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridRoleComponent } from './grid-role.component';

describe('GridRoleComponent', () => {
  let component: GridRoleComponent;
  let fixture: ComponentFixture<GridRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridRoleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GridRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
