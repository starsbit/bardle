import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridArmorTypeComponent } from './grid-armor-type.component';

describe('GridArmorTypeComponent', () => {
  let component: GridArmorTypeComponent;
  let fixture: ComponentFixture<GridArmorTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridArmorTypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GridArmorTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
