import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridExSkillCostComponent } from './grid-ex-skill-cost.component';

describe('GridExSkillCostComponent', () => {
  let component: GridExSkillCostComponent;
  let fixture: ComponentFixture<GridExSkillCostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridExSkillCostComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GridExSkillCostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
