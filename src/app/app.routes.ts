import { Routes } from '@angular/router';
import { GameComponent } from './pages/game/game.component';

export const routes: Routes = [
  { path: '', redirectTo: '/game', pathMatch: 'full' },
  { path: 'game', component: GameComponent },
];
