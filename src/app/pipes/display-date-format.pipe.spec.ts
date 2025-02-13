import { DisplayDateFormatPipe } from './display-date-format.pipe';

describe('DisplayDateFormatPipe', () => {
  let pipe: DisplayDateFormatPipe;

  beforeEach(() => {
    pipe = new DisplayDateFormatPipe('en');
  });

  it('should be created', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform "2023/12/25" to "Dec 2023"', () => {
    expect(pipe.transform('2023/12/25')).toBe('Dec 2023');
  });

  it('should transform "1999/01/05" to "Jan 1999"', () => {
    expect(pipe.transform('1999/01/05')).toBe('Jan 1999');
  });

  it('should transform "2024/06/15" to "Jun 2024"', () => {
    expect(pipe.transform('2024/06/15')).toBe('Jun 2024');
  });

  it('should handle an invalid date format gracefully', () => {
    expect(() => pipe.transform('invalid-date')).toThrowError();
  });

  it('should handle an empty string gracefully', () => {
    expect(() => pipe.transform('')).toThrowError();
  });

  it('should handle an incomplete date (e.g., "2024/06") gracefully', () => {
    expect(() => pipe.transform('2024/06')).toThrowError();
  });
});
