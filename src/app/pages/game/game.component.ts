import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GuessGameComponent } from '../../components/guess-game/guess-game.component';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'ba-game',
  standalone: true,
  imports: [GuessGameComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameComponent {
  constructor(private readonly studentService: StudentService) {}

  get backgroundImage(): string {
    return this.studentService.getBackground();
  }
}
