import { isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, PLATFORM_ID, Renderer2, inject } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'ba-google-analytics-tag',
  imports: [],
  templateUrl: './google-analytics-tag.component.html',
  styleUrl: './google-analytics-tag.component.scss',
})
export class GoogleAnalyticsTagComponent {
  readonly platformId = inject(PLATFORM_ID);
  private readonly renderer = inject(Renderer2);
  private readonly el = inject(ElementRef);

  trackingCode = environment.googleAnalyticsTrackingCode;

  private readonly gtagApi = 'https://www.googletagmanager.com/gtag/js?id=';

  constructor() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const script = this.renderer.createElement('script');
    script.async = true;
    script.src = `${this.gtagApi}${this.trackingCode}`;
    this.renderer.appendChild(this.el.nativeElement, script);

    const script2 = this.renderer.createElement('script');
    const script2Body = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${this.trackingCode}');
    `;
    this.renderer.appendChild(script2, this.renderer.createText(script2Body));
    this.renderer.appendChild(this.el.nativeElement, script2);
  }
}
