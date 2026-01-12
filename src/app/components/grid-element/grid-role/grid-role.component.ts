import { NgClass, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AssetService } from '../../../services/web/asset.service';
import { GridElementComponent } from '../grid-element.component';
import { GridElementContainerComponent } from '../grid-wrapper/grid-element-container.component';

@Component({
  selector: 'ba-grid-role',
  imports: [GridElementContainerComponent, NgOptimizedImage, NgClass],
  templateUrl: './grid-role.component.html',
  styleUrl: './grid-role.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridRoleComponent extends GridElementComponent {
  readonly assetService = inject(AssetService);


  override correctGuess() {
    return this.answer?.role === this.guess?.role;
  }

  get role() {
    return this.guess?.role;
  }
}
