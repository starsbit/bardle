import { Component, Input } from '@angular/core';

@Component({
  selector: 'ba-tutorial',
  imports: [],
  templateUrl: './tutorial.component.html',
  styleUrl: './tutorial.component.scss',
})
export class TutorialComponent {
  @Input() public displayCopyButton = true;
  @Input() public displayRefreshButton = false;
}
