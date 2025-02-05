import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DashCasePipe } from '../../../pipes/dash-case.pipe';
import { GridElementComponent } from '../grid-element.component';
import { GridElementContainerComponent } from '../grid-wrapper/grid-element-container.component';

@Component({
  selector: 'ba-grid-armor-type',
  imports: [GridElementContainerComponent, NgClass, DashCasePipe],
  templateUrl: './grid-armor-type.component.html',
  styleUrl: './grid-armor-type.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridArmorTypeComponent extends GridElementComponent {
  override correctGuess() {
    return this.answer?.armorType === this.guess?.armorType;
  }
}
