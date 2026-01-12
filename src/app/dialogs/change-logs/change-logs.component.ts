// filepath: /e:/projects/bardle/src/app/dialogs/change-logs/change-logs.component.ts
import { Component, inject } from '@angular/core';
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
export class ChangeLogsDialogComponent {  private dialogRef = inject<MatDialogRef<ChangeLogsDialogComponent>>(MatDialogRef);
  data = inject<{
    changeLogs: string;
}>(MAT_DIALOG_DATA);

}
