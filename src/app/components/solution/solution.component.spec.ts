import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolutionComponent } from './solution.component';

describe('SolutionComponent', () => {
  let component: SolutionComponent;
  let fixture: ComponentFixture<SolutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolutionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SolutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
