import { NgOptimizedImage } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CountdownConfig, CountdownModule } from 'ngx-countdown';
import { Student } from '../../models/student';
import { AssetService } from '../../services/web/asset.service';
import { getCurrentUTCDate, timeActive } from '../../utils/date-utils';
import { CopyButtonComponent } from '../copy-button/copy-button.component';

@Component({
  selector: 'ba-result',
  imports: [
    CountdownModule,
    CopyButtonComponent,
    NgOptimizedImage,
    MatIconModule,
  ],
  templateUrl: './result.component.html',
  styleUrl: './result.component.scss',
})
export class ResultComponent {
  @Input() won = false;
  @Input() lost = false;
  @Input() displayCopyButton = true;
  @Input() displayNextStudentCountdown = true;
  @Input() displayRefreshButton = false;
  @Input() searchedStudent: Student | null = null;
  @Input() searchedStudentName = '';

  @Output() refresh = new EventEmitter<void>();

  daysActive = timeActive();

  countdownConfig: CountdownConfig = {
    timezone: 'UTC',
    leftTime: this.getSecondsUntilEndOfDay(),
    format: 'HH:mm:ss',
  };

  constructor(public readonly assetService: AssetService) {}

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
