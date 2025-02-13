import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'ba-grid-header-element',
  imports: [],
  templateUrl: './grid-header-element.component.html',
  styleUrl: './grid-header-element.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridHeaderElementComponent {
  @Input() title = '';

  get headerTitle() {
    return this.title;
  }
}
