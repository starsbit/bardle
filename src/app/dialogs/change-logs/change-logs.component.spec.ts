import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeLogsDialogComponent } from './change-logs.component';

describe('ChangeLogsComponent', () => {
  let component: ChangeLogsDialogComponent;
  let fixture: ComponentFixture<ChangeLogsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangeLogsDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChangeLogsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
