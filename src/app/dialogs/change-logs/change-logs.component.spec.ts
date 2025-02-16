import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MarkdownModule, provideMarkdown } from 'ngx-markdown';
import { ChangeLogsDialogComponent } from './change-logs.component';

describe('ChangeLogsDialogComponent', () => {
  let component: ChangeLogsDialogComponent;
  let fixture: ComponentFixture<ChangeLogsDialogComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<ChangeLogsDialogComponent>>;

  const mockChangeLogs = `
  # Bardle

  ## Version 2.4.0

  Date: 2025/02/16

  - Fixed bugs when selecting collab students
  - Added Korean, Japanese and Chinese localization
  - Added new "copy string" when copying the result
  - Change guess attributes
  - Added change logs

  ## Version 2.0.0

  Date: 2025/02/07

  - New layout for the app
  - Support Japanese and Global release list
  - Automatic updates for the app
  - Mobile support

  ## Version 1.0.0

  Date: 2024/05/06

  - Initial release
  `;

  beforeEach(async () => {
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, MarkdownModule],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: { changeLogs: mockChangeLogs } },
        provideMarkdown(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ChangeLogsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the change logs', () => {
    const markdownElement = fixture.debugElement.query(By.css('markdown'));
    expect(markdownElement).toBeTruthy();
    expect(markdownElement.nativeElement.innerText).toContain('Version 2.4.0');
    expect(markdownElement.nativeElement.innerText).toContain('Version 2.0.0');
    expect(markdownElement.nativeElement.innerText).toContain('Version 1.0.0');
  });

  it('should display "No change logs found." if no change logs are provided', () => {
    component.data.changeLogs = '';
    fixture.detectChanges();
    const noChangeLogsElement = fixture.debugElement.query(By.css('p'));
    expect(noChangeLogsElement).toBeTruthy();
    expect(noChangeLogsElement.nativeElement.innerText).toBe(
      'No change logs found.'
    );
  });
});
