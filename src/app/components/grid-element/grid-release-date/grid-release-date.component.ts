import { Component } from '@angular/core';
import { GridElementComponent } from '../grid-element.component';
import { GridElementContainerComponent } from '../grid-wrapper/grid-element-container.component';

@Component({
  selector: 'ba-grid-release-date',
  imports: [GridElementContainerComponent],
  templateUrl: './grid-release-date.component.html',
  styleUrl: './grid-release-date.component.scss',
})
export class GridReleaseDateComponent extends GridElementComponent {}
