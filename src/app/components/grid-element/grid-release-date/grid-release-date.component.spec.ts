import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridReleaseDateComponent } from './grid-release-date.component';

describe('GridReleaseDateComponent', () => {
  let component: GridReleaseDateComponent;
  let fixture: ComponentFixture<GridReleaseDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridReleaseDateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GridReleaseDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
