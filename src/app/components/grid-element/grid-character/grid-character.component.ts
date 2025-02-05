import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GridElementComponent } from '../grid-element.component';
import { GridElementContainerComponent } from '../grid-wrapper/grid-element-container.component';

@Component({
  selector: 'ba-grid-character',
  imports: [GridElementContainerComponent],
  templateUrl: './grid-character.component.html',
  styleUrl: './grid-character.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridCharacterComponent extends GridElementComponent {}
