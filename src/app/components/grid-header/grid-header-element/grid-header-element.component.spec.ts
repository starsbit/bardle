import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridHeaderElementComponent } from './grid-header-element.component';

describe('GridHeaderElementComponent', () => {
  let component: GridHeaderElementComponent;
  let fixture: ComponentFixture<GridHeaderElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridHeaderElementComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GridHeaderElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
