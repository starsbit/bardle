import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridEmptyRowComponent } from './grid-empty-row.component';

describe('GridEmptyRowComponent', () => {
  let component: GridEmptyRowComponent;
  let fixture: ComponentFixture<GridEmptyRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridEmptyRowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GridEmptyRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
