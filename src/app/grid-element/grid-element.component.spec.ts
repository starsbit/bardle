import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridElementComponent } from './grid-element.component';

describe('GridElementComponent', () => {
  let component: GridElementComponent;
  let fixture: ComponentFixture<GridElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridElementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GridElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
