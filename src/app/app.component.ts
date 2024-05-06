import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { GuessGameComponent } from './components/guess-game/guess-game.component';

@Component({
  selector: 'ba-root',
  standalone: true,
  imports: [RouterOutlet, GuessGameComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Bardle';

  constructor(private readonly titleService: Title) {
    this.titleService.setTitle(this.title);
  }
}
