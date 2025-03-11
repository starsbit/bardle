import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'ba-infinte-mode',
  imports: [MatCheckboxModule, FormsModule],
  templateUrl: './infinte-mode.component.html',
  styleUrl: './infinte-mode.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfinteModeComponent {
  isInfiniteMode = false;

  @Output() infiniteMode: EventEmitter<boolean> = new EventEmitter<boolean>();

  onInfiniteModeChange() {
    this.infiniteMode.emit(this.isInfiniteMode);
  }
}
