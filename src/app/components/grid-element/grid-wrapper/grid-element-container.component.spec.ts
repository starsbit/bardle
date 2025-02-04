import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridElementContainerComponent } from './grid-element-container.component';

describe('GridWrapperComponent', () => {
  let component: GridElementContainerComponent;
  let fixture: ComponentFixture<GridElementContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridElementContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GridElementContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
