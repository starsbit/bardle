import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AssetService } from '../../services/asset.service';

@Component({
  selector: 'ba-grid-element',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './grid-element.component.html',
  styleUrl: './grid-element.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridElementComponent {
  @Input() guessAttribute: any;
  @Input() targetAttribute: any;
  @Input() isStudentElement = false;
  @Input() isSchoolElement = false;
  @Input() isRoleElement = false;
  @Input() useIconInsteadOfName = false;
  @Input() animationDelayInMs = 0;
  @Input() alternativeLabel = '';
  @Input() winningElement = false;

  constructor(readonly assetService: AssetService) {}

  get isCorrect(): boolean {
    return this.guessAttribute === this.targetAttribute;
  }

  get label(): string {
    if (typeof this.guessAttribute === 'boolean') {
      return this.guessAttribute ? '✅' : '❌';
    }
    if (typeof this.guessAttribute === 'number') {
      if (this.guessAttribute < this.targetAttribute) {
        return `🔼${this.guessAttribute}`;
      } else if (this.guessAttribute > this.targetAttribute) {
        return `🔽${this.guessAttribute}`;
      } else {
        return `${this.guessAttribute}`;
      }
    }
    if (
      this.isDateString(this.guessAttribute) &&
      this.isDateString(this.targetAttribute)
    ) {
      const guessDate = new Date(this.guessAttribute);
      const targetDate = new Date(this.targetAttribute);
      // format the guessAttribute to MMM YYYY format
      const guessDateFormatted = guessDate.toLocaleString('default', {
        month: 'short',
        year: 'numeric',
      });
      if (guessDate < targetDate) {
        return `🔼${guessDateFormatted}`;
      } else if (guessDate > targetDate) {
        return `🔽${guessDateFormatted}`;
      } else {
        return `${guessDateFormatted}`;
      }
    }
    return this.guessAttribute;
  }

  get image(): string {
    if (this.useIconInsteadOfName) {
      return 'assets/images/characters/' + this.guessAttribute + '.png';
    }
    return '';
  }

  private isDateString(s: string) {
    return !isNaN(Date.parse(s));
  }
}
