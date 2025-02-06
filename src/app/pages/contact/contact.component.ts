import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SocialLinksComponent } from '../../components/social-links/social-links.component';

@Component({
  selector: 'ba-contact',
  imports: [SocialLinksComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent {
  copyrightYear = new Date().getFullYear();
}
