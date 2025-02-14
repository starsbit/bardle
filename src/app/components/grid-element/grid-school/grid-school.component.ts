import { NgClass, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AssetService } from '../../../services/web/asset.service';
import { sanitizeSchool } from '../../../utils/student-utils';
import { GridElementComponent } from '../grid-element.component';
import { GridElementContainerComponent } from '../grid-wrapper/grid-element-container.component';

@Component({
  selector: 'ba-grid-school',
  imports: [GridElementContainerComponent, NgOptimizedImage, NgClass],
  templateUrl: './grid-school.component.html',
  styleUrl: './grid-school.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridSchoolComponent extends GridElementComponent {
  constructor(public readonly assetService: AssetService) {
    super();
  }

  override correctGuess() {
    return this.answer?.school === this.guess?.school;
  }

  get school() {
    return sanitizeSchool(this.guess ? this.guess.school : '');
  }
}
