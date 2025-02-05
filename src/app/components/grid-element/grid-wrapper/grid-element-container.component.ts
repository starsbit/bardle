import { NgClass, NgStyle } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
} from '@angular/core';

@Component({
  selector: 'ba-grid-element-container',
  imports: [NgClass, NgStyle],
  templateUrl: './grid-element-container.component.html',
  styleUrls: ['./grid-element-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridElementContainerComponent implements OnChanges {
  @Input() isFlipped = false;
  @Input() animationDelayMs = 0;
  childrenHidden = true;

  constructor(private readonly cdr: ChangeDetectorRef) {}

  ngOnChanges() {
    if (this.isFlipped) {
      setTimeout(() => {
        this.childrenHidden = false;
        this.cdr.markForCheck();
      }, this.animationDelayMs + 400);
      this.cdr.markForCheck();
    }
  }
}
