import { Component } from '@angular/core';
import { GuessGameComponent } from '../../components/guess-game/guess-game.component';

@Component({
  selector: 'ba-game',
  standalone: true,
  imports: [GuessGameComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
})
export class GameComponent {
  private _random: number;

  constructor() {
    this._random = Math.floor(Math.random() * 26) + 1;
  }

  get backgroundImage(): string {
    if (this._random < 10) {
      return `assets/images/backgrounds/0${this._random}.png`;
    }
    return `assets/images/backgrounds/${this._random}.png`;
  }
}
