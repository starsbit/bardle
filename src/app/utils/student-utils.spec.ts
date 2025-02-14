import { NON_EVENT_SCHOOLS } from '../constants/rules';
import { sanitizeBirthday, sanitizeSchool } from './student-utils';

describe('sanitizeBirthday', () => {
  it('should return the same date if it is in the correct format and valid', () => {
    expect(sanitizeBirthday('2025/02/14')).toBe('2025/02/14');
  });

  it('should return "" if the date is not in the correct format', () => {
    expect(sanitizeBirthday('14/02/2025')).toBe('');
    expect(sanitizeBirthday('2025-02-14')).toBe('');
    expect(sanitizeBirthday('2025/2/14')).toBe('');
  });

  it('should return "" if the date is not valid', () => {
    expect(sanitizeBirthday('2025/02/30')).toBe('');
    expect(sanitizeBirthday('2025/13/01')).toBe('');
  });
});

describe('sanitizeSchool', () => {
  it('should return the Unknown if it is not in NON_EVENT_SCHOOLS', () => {
    expect(sanitizeSchool('Some School')).toBe('Unknown');
  });

  it('should return "Unknown" if the school is not in NON_EVENT_SCHOOLS', () => {
    NON_EVENT_SCHOOLS.forEach((school) => {
      expect(sanitizeSchool(school)).not.toBe('Unknown');
    });
    expect(sanitizeSchool('Unknown')).toBe('Unknown');
  });
});
