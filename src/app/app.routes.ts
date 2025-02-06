import { Routes } from '@angular/router';
import { GameListIdGuard } from './guards/game-list-id.guard';

export const routes: Routes = [
  {
    path: 'game/:listId',
    loadComponent: () =>
      import('./pages/game/game.component').then((m) => m.GameComponent),
    canActivate: [GameListIdGuard],
    data: { animation: 'GamePage' },
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./pages/about/about.component').then((m) => m.AboutComponent),
    data: { animation: 'AboutPage' },
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./pages/contact/contact.component').then(
        (m) => m.ContactComponent
      ),
    data: { animation: 'ContactPage' },
  },
  {
    path: '**',
    redirectTo: 'game/japan',
    pathMatch: 'full',
  },
];
