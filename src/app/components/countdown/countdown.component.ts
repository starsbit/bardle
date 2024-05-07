import { ChangeDetectionStrategy, Component } from '@angular/core';
import moment from 'moment';
import { CountdownConfig, CountdownModule } from 'ngx-countdown';

@Component({
  selector: 'ba-countdown',
  standalone: true,
  imports: [CountdownModule],
  templateUrl: './countdown.component.html',
  styleUrl: './countdown.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountdownComponent {
  countdownConfig: CountdownConfig = {
    timezone: 'UTC',
    leftTime: moment().utc().endOf('day').diff(moment().utc(), 'seconds'),
    format: 'HH:mm:ss',
  };
}
