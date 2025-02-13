import { Routes } from '@angular/router';
import { GameListIdGuard } from './guards/game-list-id.guard';

export const routes: Routes = [
  {
    path: 'game/:listId',
    loadComponent: () =>
      import('./pages/game/game.component').then((m) => m.GameComponent),
    canActivate: [GameListIdGuard],
    data: { animation: 'GamePage' },
    title: $localize`:Bardle|Bardle Page Name@@BardlePageName:Bardle`,
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./pages/about/about.component').then((m) => m.AboutComponent),
    data: { animation: 'AboutPage' },
    title: $localize`:Bardle - About|Bardle - About Page Name@@BardleAboutPageName:Bardle - About`,
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./pages/contact/contact.component').then(
        (m) => m.ContactComponent
      ),
    data: { animation: 'ContactPage' },
    title: $localize`:Bardle - Contact|Bardle - Contact Page Name@@BardleContactPageName:Bardle - Contact`,
  },
  {
    path: '**',
    redirectTo: 'game/japan',
    pathMatch: 'full',
  },
];
