import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuessGameComponent } from './guess-game.component';

describe('GuessGameComponent', () => {
  let component: GuessGameComponent;
  let fixture: ComponentFixture<GuessGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuessGameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GuessGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
