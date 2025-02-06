import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ba-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent {
  copyrightYear = new Date().getFullYear();
}
