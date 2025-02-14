import { RULES } from '../constants/rules';
import { getDayOfYear, timeActive } from './date-utils';

describe('Date Utils', () => {
  describe('getDayOfYear', () => {
    it('should return the correct day of the year for a given date', () => {
      const date = new Date('2025-02-07');
      expect(getDayOfYear(date)).toBe(38); // February 7th is the 38th day of the year in 2025
    });

    it('should return 0 for January 1st', () => {
      const date = new Date('2025-01-01');
      expect(getDayOfYear(date)).toBe(1);
    });
  });

  describe('timeActive', () => {
    it('should return the correct number of days since the launch date', () => {
      const launchDate = RULES.LAUNCH_DATE;
      const now = new Date();
      const diff = now.getTime() - launchDate.getTime();
      const oneDay = 1000 * 60 * 60 * 24;
      const expected = Math.floor(diff / oneDay);
      expect(timeActive()).toBe(expected);
    });
  });
});
