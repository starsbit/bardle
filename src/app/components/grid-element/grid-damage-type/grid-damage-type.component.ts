import { Component } from '@angular/core';
import { GridElementComponent } from '../grid-element.component';
import { GridElementContainerComponent } from '../grid-wrapper/grid-element-container.component';

@Component({
  selector: 'ba-grid-damage-type',
  imports: [GridElementContainerComponent],
  templateUrl: './grid-damage-type.component.html',
  styleUrl: './grid-damage-type.component.scss',
})
export class GridDamageTypeComponent extends GridElementComponent {}
