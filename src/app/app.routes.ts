import { Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { GameComponent } from './pages/game/game.component';

export const routes: Routes = [
  { path: '', component: GameComponent },
  { path: 'about', component: AboutComponent },
  { path: '**', redirectTo: '' },
];
