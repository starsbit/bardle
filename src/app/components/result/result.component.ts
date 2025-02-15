import { Component, Input } from '@angular/core';
import { CountdownConfig, CountdownModule } from 'ngx-countdown';
import { timeActive } from '../../utils/date-utils';
import { CopyButtonComponent } from '../copy-button/copy-button.component';

@Component({
  selector: 'ba-result',
  imports: [CountdownModule, CopyButtonComponent],
  templateUrl: './result.component.html',
  styleUrl: './result.component.scss',
})
export class ResultComponent {
  @Input() won = false;
  @Input() lost = false;
  @Input() searchedStudent = '';
  daysActive = timeActive();

  countdownConfig: CountdownConfig = {
    timezone: 'UTC',
    leftTime: this.getSecondsUntilEndOfDay(),
    format: 'HH:mm:ss',
  };

  private getSecondsUntilEndOfDay(): number {
    const now = new Date();
    const endOfDay = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1)
    );
    const diff = endOfDay.getTime() - now.getTime();
    return Math.floor(diff / 1000);
  }
}
