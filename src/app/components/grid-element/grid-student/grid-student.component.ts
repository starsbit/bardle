import { NgClass, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AssetService } from '../../../services/web/asset.service';
import { GridElementComponent } from '../grid-element.component';
import { GridElementContainerComponent } from '../grid-wrapper/grid-element-container.component';

@Component({
  selector: 'ba-grid-character',
  imports: [GridElementContainerComponent, NgOptimizedImage, NgClass],
  templateUrl: './grid-student.component.html',
  styleUrl: './grid-student.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridStudentComponent extends GridElementComponent {
  constructor(public readonly assetService: AssetService) {
    super();
  }

  override correctGuess() {
    return this.answer?.fullName === this.guess?.fullName;
  }

  get fullName() {
    return this.guess?.fullName;
  }
}
