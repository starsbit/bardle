import { NgClass, NgStyle } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'ba-grid-element-container',
  imports: [NgClass, NgStyle],
  templateUrl: './grid-element-container.component.html',
  styleUrls: ['./grid-element-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridElementContainerComponent implements OnChanges {
  // it has to be a string else the change detection won't work
  // because it does not pick up changes when going from true -> true for example
  @Input() isFlipped: string = '';
  @Input() animationDelayMs = 0;
  @Input() won = false;
  childrenHidden = true;
  startWinAnimation = false;

  constructor(private readonly cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isFlipped'] && changes['isFlipped'].currentValue) {
      this.isFlipped = ''; // Temporarily set to false
      this.cdr.detectChanges(); // Trigger change detection
      setTimeout(() => {
        this.isFlipped = changes['isFlipped'].currentValue; // Set back to true
        this.cdr.markForCheck();
      }, 0);
      setTimeout(() => {
        this.childrenHidden = false;
        this.cdr.markForCheck();
      }, this.animationDelayMs + 400);
    }
    if (!this.won) {
      this.startWinAnimation = false;
    }
  }

  onAnimationEnd(event: AnimationEvent) {
    if (this.won) {
      this.startWinAnimation = true;
      this.cdr.markForCheck();
    }
  }
}
