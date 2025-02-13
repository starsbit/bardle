import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GridElementComponent } from '../grid-element.component';
import { GridElementContainerComponent } from '../grid-wrapper/grid-element-container.component';

@Component({
  selector: 'ba-grid-ex-skill-cost',
  imports: [GridElementContainerComponent, NgClass],
  templateUrl: './grid-ex-skill-cost.component.html',
  styleUrl: './grid-ex-skill-cost.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridExSkillCostComponent extends GridElementComponent {
  override correctGuess() {
    return this.answer?.exSkillCost === this.guess?.exSkillCost;
  }

  get exSkillCost() {
    return this.guess?.exSkillCost;
  }
}
