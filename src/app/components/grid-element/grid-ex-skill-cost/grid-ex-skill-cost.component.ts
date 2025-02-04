import { Component } from '@angular/core';
import { GridElementComponent } from '../grid-element.component';
import { GridElementContainerComponent } from '../grid-wrapper/grid-element-container.component';

@Component({
  selector: 'ba-grid-ex-skill-cost',
  imports: [GridElementContainerComponent],
  templateUrl: './grid-ex-skill-cost.component.html',
  styleUrl: './grid-ex-skill-cost.component.scss',
})
export class GridExSkillCostComponent extends GridElementComponent {}
