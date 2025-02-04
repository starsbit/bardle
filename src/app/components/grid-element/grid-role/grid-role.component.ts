import { Component } from '@angular/core';
import { GridElementComponent } from '../grid-element.component';
import { GridElementContainerComponent } from '../grid-wrapper/grid-element-container.component';

@Component({
  selector: 'ba-grid-role',
  imports: [GridElementContainerComponent],
  templateUrl: './grid-role.component.html',
  styleUrl: './grid-role.component.scss',
})
export class GridRoleComponent extends GridElementComponent {}
