import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridWeaponTypeComponent } from './grid-weapon-type.component';

describe('GridWeaponTypeComponent', () => {
  let component: GridWeaponTypeComponent;
  let fixture: ComponentFixture<GridWeaponTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridWeaponTypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GridWeaponTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
