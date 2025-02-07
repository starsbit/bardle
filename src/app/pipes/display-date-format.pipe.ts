import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'displayDateFormat',
})
export class DisplayDateFormatPipe implements PipeTransform {
  transform(value: string): string {
    if (!value || typeof value !== 'string') {
      throw new Error('Invalid date format: input must be a non-empty string');
    }

    const parts = value.split('/');
    if (parts.length !== 3) {
      throw new Error('Invalid date format: expected "YYYY/MM/DD"');
    }

    const [year, month, day] = parts.map(Number);
    if (
      isNaN(year) ||
      isNaN(month) ||
      isNaN(day) ||
      year < 1000 ||
      month < 1 ||
      month > 12 ||
      day < 1 ||
      day > 31
    ) {
      throw new Error('Invalid date format: invalid year, month, or day');
    }

    const date = new Date(year, month - 1, day);
    if (isNaN(date.getTime())) {
      throw new Error('Invalid date: unable to parse');
    }

    return date.toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric',
    });
  }
}
