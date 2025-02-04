import { Component } from '@angular/core';
import { GridElementComponent } from '../grid-element.component';
import { GridElementContainerComponent } from '../grid-wrapper/grid-element-container.component';

@Component({
  selector: 'ba-grid-armor-type',
  imports: [GridElementContainerComponent],
  templateUrl: './grid-armor-type.component.html',
  styleUrl: './grid-armor-type.component.scss',
})
export class GridArmorTypeComponent extends GridElementComponent {}
