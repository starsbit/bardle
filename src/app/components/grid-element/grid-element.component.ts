import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Student } from '../../models/student';

@Component({
  selector: 'ba-grid-element',
  templateUrl: './grid-element.component.html',
  styleUrls: ['./grid-element.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridElementComponent implements OnChanges {
  @Input() guess: Student | null = null;
  @Input() answer: Student | null = null;

  constructor(private readonly cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['guess'] || changes['answer']) {
      this.cdr.markForCheck();
    }
  }
}
