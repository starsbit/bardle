import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BackgroundComponent } from '../../components/background/background.component';
import { GridComponent } from '../../components/grid/grid.component';
import { GuessInputComponent } from '../../components/guess-input/guess-input.component';
import { NavigationComponent } from '../../components/navigation/navigation.component';
import { StudentListSelectionComponent } from '../../components/student-list-selection/student-list-selection.component';

@Component({
  selector: 'ba-game',
  imports: [
    NavigationComponent,
    BackgroundComponent,
    GridComponent,
    StudentListSelectionComponent,
    GuessInputComponent,
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameComponent {}
