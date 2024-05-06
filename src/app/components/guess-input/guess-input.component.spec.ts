import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuessInputComponent } from './guess-input.component';

describe('GuessInputComponent', () => {
  let component: GuessInputComponent;
  let fixture: ComponentFixture<GuessInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuessInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GuessInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
