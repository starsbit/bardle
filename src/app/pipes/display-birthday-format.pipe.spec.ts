import { LOCALE_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { DisplayBirthdayFormatPipe } from './display-birthday-format.pipe';

describe('DisplayBirthdayFormatPipe', () => {
  let pipe: DisplayBirthdayFormatPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DisplayBirthdayFormatPipe,
        { provide: LOCALE_ID, useValue: 'en-US' }, // Default locale for testing
      ],
    });
    pipe = TestBed.inject(DisplayBirthdayFormatPipe);
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should format a valid date string', () => {
    const result = pipe.transform('2000/01/01');
    expect(result).toBe('1. Jan');
  });

  it('should throw an error for an empty string', () => {
    expect(() => pipe.transform('')).toThrowError(
      'Invalid date format: input must be a non-empty string'
    );
  });

  it('should throw an error for a non-string input', () => {
    expect(() => pipe.transform(null as unknown as string)).toThrowError(
      'Invalid date format: input must be a non-empty string'
    );
  });

  it('should throw an error for an invalid date format', () => {
    expect(() => pipe.transform('2000-01-01')).toThrowError(
      'Invalid date format: expected "YYYY/MM/DD"'
    );
  });

  it('should throw an error for an invalid date', () => {
    expect(() => pipe.transform('2000/13/01')).toThrowError(
      'Invalid date format: invalid year, month, or day'
    );
  });

  it('should format a valid date string with a custom locale', () => {
    const result = pipe.transform('2000/01/01', 'ja');
    expect(result).toBe('1. 1月');
  });
});
