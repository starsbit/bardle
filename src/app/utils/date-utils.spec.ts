import { RULES } from '../constants/rules';
import { getDayOfYear, timeActive } from './date-utils';

describe('Date Utils', () => {
  describe('getDayOfYear', () => {
    it('should return the correct day of the year for a given date', () => {
      const date = new Date('2025-02-07');
      expect(getDayOfYear(date)).toBe(38); // February 7th is the 38th day of the year in 2025
    });

    it('should return 1 for January 1st', () => {
      const date = new Date('2025-01-01');
      expect(getDayOfYear(date)).toBe(1);
    });

    it('should return 1 for January 1st when created with Date.UTC (regression: was wrong in UTC-N timezones)', () => {
      // In UTC-N timezones, new Date(Date.UTC(2026, 0, 1)) has getFullYear() = 2025 (local Dec 31).
      // The old code used getFullYear() + new Date(year, 0, 0) in local time, giving DOY from 2025.
      // The fix uses getUTCFullYear() + Date.UTC so the start-of-year anchor is always in UTC.
      const jan1UTC = new Date(Date.UTC(2026, 0, 1, 0, 0, 0));
      expect(getDayOfYear(jan1UTC)).toBe(1);
    });

    it('should return the same DOY for a date created with Date.UTC as one created with an ISO date string', () => {
      // ISO date-only strings are parsed as UTC midnight, so both should give identical DOY.
      const fromUTC = new Date(Date.UTC(2025, 1, 7, 0, 0, 0));
      const fromISO = new Date('2025-02-07');
      expect(getDayOfYear(fromUTC)).toBe(getDayOfYear(fromISO));
      expect(getDayOfYear(fromUTC)).toBe(38);
    });

    it('should return consistent DOY for UTC midnight dates across year boundaries', () => {
      // Dec 31 and Jan 1 UTC midnight — critical boundary for UTC-N where local year may differ
      const dec31UTC = new Date(Date.UTC(2025, 11, 31, 0, 0, 0));
      const jan1UTC = new Date(Date.UTC(2026, 0, 1, 0, 0, 0));
      expect(getDayOfYear(dec31UTC)).toBe(365); // 2025 is not a leap year
      expect(getDayOfYear(jan1UTC)).toBe(1);
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
