// filepath: /e:/projects/bardle/src/app/dialogs/change-logs/change-logs.component.ts
import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MarkdownModule, provideMarkdown } from 'ngx-markdown';

@Component({
  imports: [
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MarkdownModule,
    MatDialogClose,
  ],
  providers: [provideMarkdown()],
  selector: 'ba-change-logs',
  templateUrl: './change-logs.component.html',
  styleUrls: ['./change-logs.component.scss'],
})
export class ChangeLogsDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<ChangeLogsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { changeLogs: string }
  ) {}
}
