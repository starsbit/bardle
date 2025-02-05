import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GridElementComponent } from '../grid-element.component';
import { GridElementContainerComponent } from '../grid-wrapper/grid-element-container.component';

@Component({
  selector: 'ba-grid-armor-type',
  imports: [GridElementContainerComponent],
  templateUrl: './grid-armor-type.component.html',
  styleUrl: './grid-armor-type.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridArmorTypeComponent extends GridElementComponent {}
