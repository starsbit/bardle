import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ba-social-links',
  imports: [NgOptimizedImage],
  templateUrl: './social-links.component.html',
  styleUrl: './social-links.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SocialLinksComponent {
  readonly svgFilterCssClass = 'filter-black';

  readonly socialLinkCssClass = 'social-link';
}
