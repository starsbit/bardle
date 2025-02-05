import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AssetService } from '../../../services/web/asset.service';
import { GridElementComponent } from '../grid-element.component';
import { GridElementContainerComponent } from '../grid-wrapper/grid-element-container.component';

@Component({
  selector: 'ba-grid-school',
  imports: [GridElementContainerComponent, NgOptimizedImage],
  templateUrl: './grid-school.component.html',
  styleUrl: './grid-school.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridSchoolComponent extends GridElementComponent {
  constructor(public readonly assetService: AssetService) {
    super();
  }
}
