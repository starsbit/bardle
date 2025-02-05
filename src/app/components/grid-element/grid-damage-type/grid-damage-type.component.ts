import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DashCasePipe } from '../../../pipes/dash-case.pipe';
import { GridElementComponent } from '../grid-element.component';
import { GridElementContainerComponent } from '../grid-wrapper/grid-element-container.component';

@Component({
  selector: 'ba-grid-damage-type',
  imports: [GridElementContainerComponent, NgClass, DashCasePipe],
  templateUrl: './grid-damage-type.component.html',
  styleUrl: './grid-damage-type.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridDamageTypeComponent extends GridElementComponent {
  override correctGuess() {
    return this.answer?.damageType === this.guess?.damageType;
  }
}
