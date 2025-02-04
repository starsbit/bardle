import { Component } from '@angular/core';
import { GridElementComponent } from '../grid-element.component';
import { GridElementContainerComponent } from '../grid-wrapper/grid-element-container.component';

@Component({
  selector: 'ba-grid-school',
  imports: [GridElementContainerComponent],
  templateUrl: './grid-school.component.html',
  styleUrl: './grid-school.component.scss',
})
export class GridSchoolComponent extends GridElementComponent {}
