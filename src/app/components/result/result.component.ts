import { NgOptimizedImage } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CountdownComponent, CountdownConfig } from 'ngx-countdown';
import { Student } from '../../models/student';
import { AssetService } from '../../services/web/asset.service';
import { getCurrentUTCDate, timeActive } from '../../utils/date-utils';
import { CopyButtonComponent } from '../copy-button/copy-button.component';

@Component({
  selector: 'ba-result',
  imports: [
    CountdownComponent,
    CopyButtonComponent,
    NgOptimizedImage,
    MatIconModule,
  ],
  templateUrl: './result.component.html',
  styleUrl: './result.component.scss',
})
export class ResultComponent {
  readonly assetService = inject(AssetService);

  @Input() won = false;
  @Input() lost = false;
  @Input() displayCopyButton = true;
  @Input() displayNextStudentCountdown = true;
  @Input() displayRefreshButton = false;
  @Input() searchedStudent: Student | null = null;
  @Input() searchedStudentName = '';
  @Input() streak = 0;

  @Output() refresh = new EventEmitter<void>();

  daysActive = timeActive();

  countdownConfig: CountdownConfig = {
    timezone: 'UTC',
    leftTime: this.getSecondsUntilEndOfDay(),
    format: 'HH:mm:ss',
  };

  onRefresh() {
    this.refresh.emit();
  }

  private getSecondsUntilEndOfDay(): number {
    const now = new Date();
    const endOfDay = getCurrentUTCDate();
    endOfDay.setUTCHours(23, 59, 59, 999);
    const diff = endOfDay.getTime() - now.getTime();
    return Math.floor(diff / 1000);
  }
}
