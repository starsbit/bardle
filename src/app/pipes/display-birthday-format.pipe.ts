import { formatDate, registerLocaleData } from '@angular/common';
import localeJa from '@angular/common/locales/ja';
import localeKo from '@angular/common/locales/ko';
import localeCn from '@angular/common/locales/zh-Hans';
import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'displayBirthdayFormat',
  pure: true,
})
export class DisplayBirthdayFormatPipe implements PipeTransform {
  constructor(@Inject(LOCALE_ID) private locale: string) {
    registerLocaleData(localeJa);
    registerLocaleData(localeCn);
    registerLocaleData(localeKo);
  }

  transform(value: string, customLocale?: string): string {
    if (!value || typeof value !== 'string') {
      return '?';
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

    const localeToUse = customLocale || this.locale;
    return formatDate(date, 'd. MMM', localeToUse);
  }
}
