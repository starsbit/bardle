import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavigationComponent } from '../../components/navigation/navigation.component';
import { SocialLinksComponent } from '../../components/social-links/social-links.component';

@Component({
  selector: 'ba-contact',
  imports: [NavigationComponent, SocialLinksComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent {
  copyrightYear = new Date().getFullYear();
}
