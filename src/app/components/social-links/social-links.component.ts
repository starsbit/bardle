import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'ba-social-links',
  imports: [NgOptimizedImage],
  templateUrl: './social-links.component.html',
  styleUrl: './social-links.component.scss',
})
export class SocialLinksComponent {
  get svgFilterCssClass() {
    return 'filter-black';
  }

  get socialLinkCssClass() {
    return 'social-link';
  }
}
