import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { By } from '@angular/platform-browser';
import { InfinteModeComponent } from './infinte-mode.component';

describe('InfinteModeComponent', () => {
  let component: InfinteModeComponent;
  let fixture: ComponentFixture<InfinteModeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatCheckboxModule, FormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfinteModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the checkbox unchecked by default', () => {
    const checkbox = fixture.debugElement.query(By.css('mat-checkbox'));
    expect(checkbox.componentInstance.checked).toBeFalse();
  });

  it('should emit the correct value when the checkbox is checked', () => {
    spyOn(component.infiniteMode, 'emit');

    const checkbox = fixture.debugElement.query(By.css('mat-checkbox input'));
    checkbox.nativeElement.click();
    fixture.detectChanges();

    expect(component.infiniteMode.emit).toHaveBeenCalledWith(true);
  });
});
