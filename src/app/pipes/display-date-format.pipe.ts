import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'displayDateFormat',
})
export class DisplayDateFormatPipe implements PipeTransform {
  transform(value: string): string {
    const [year, month, day] = value.split('/').map(Number);
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric',
    });
  }
}
