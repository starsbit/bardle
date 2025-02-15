import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { GridElementComponent } from '../grid-element.component';
import { GridElementContainerComponent } from '../grid-wrapper/grid-element-container.component';

@Component({
  selector: 'ba-grid-weapon-type',
  imports: [GridElementContainerComponent, NgClass],
  templateUrl: './grid-weapon-type.component.html',
  styleUrl: './grid-weapon-type.component.scss',
})
export class GridWeaponTypeComponent extends GridElementComponent {
  override correctGuess() {
    return this.answer?.weaponType === this.guess?.weaponType;
  }

  get weaponType() {
    return this.guess?.weaponType;
  }
}
