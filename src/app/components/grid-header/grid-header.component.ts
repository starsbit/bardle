import { Component } from '@angular/core';
import { GridHeaderElementComponent } from './grid-header-element/grid-header-element.component';

@Component({
  selector: 'ba-grid-header',
  imports: [GridHeaderElementComponent],
  templateUrl: './grid-header.component.html',
  styleUrl: './grid-header.component.scss',
})
export class GridHeaderComponent {}
