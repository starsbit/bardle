import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridCharacterComponent } from './grid-character.component';

describe('GridCharacterComponent', () => {
  let component: GridCharacterComponent;
  let fixture: ComponentFixture<GridCharacterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridCharacterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GridCharacterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
