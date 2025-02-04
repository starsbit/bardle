import { Component } from '@angular/core';
import { GridElementComponent } from '../grid-element.component';
import { GridElementContainerComponent } from '../grid-wrapper/grid-element-container.component';

@Component({
  selector: 'ba-grid-birthday',
  imports: [GridElementContainerComponent],
  templateUrl: './grid-birthday.component.html',
  styleUrl: './grid-birthday.component.scss',
})
export class GridBirthdayComponent extends GridElementComponent {}
