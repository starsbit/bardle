import { NgStyle } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ba-background',
  imports: [NgStyle],
  templateUrl: './background.component.html',
  styleUrl: './background.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BackgroundComponent {
  backgroundImageUrl: string = '/assets/images/backgrounds/40.png';
}
