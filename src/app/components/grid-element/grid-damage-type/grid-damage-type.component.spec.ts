import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridDamageTypeComponent } from './grid-damage-type.component';

describe('GridDamageTypeComponent', () => {
  let component: GridDamageTypeComponent;
  let fixture: ComponentFixture<GridDamageTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridDamageTypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GridDamageTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
