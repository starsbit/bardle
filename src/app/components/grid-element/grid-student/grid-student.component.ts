import { NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnChanges,
} from '@angular/core';
import { AssetService } from '../../../services/web/asset.service';
import { GridElementComponent } from '../grid-element.component';
import { GridElementContainerComponent } from '../grid-wrapper/grid-element-container.component';

@Component({
  selector: 'ba-grid-character',
  imports: [GridElementContainerComponent, NgOptimizedImage],
  templateUrl: './grid-student.component.html',
  styleUrl: './grid-student.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridStudentComponent
  extends GridElementComponent
  implements OnChanges
{
  constructor(
    public readonly assetService: AssetService,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) {
    super(changeDetectorRef);
  }
}
