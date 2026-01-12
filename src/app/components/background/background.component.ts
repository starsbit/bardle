import { NgStyle } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AssetService } from '../../services/web/asset.service';

@Component({
  selector: 'ba-background',
  imports: [NgStyle],
  templateUrl: './background.component.html',
  styleUrl: './background.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BackgroundComponent {
  private readonly assetService = inject(AssetService);

  backgroundImageUrl = '';

  constructor() {
    this.backgroundImageUrl =
      this.assetService.pickBackgroundOfTheDayLocation();
  }
}
