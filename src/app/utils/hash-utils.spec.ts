import { hashCode } from './hash-utils';

describe('hashCode', () => {
  it('should return 0 for an empty string', () => {
    expect(hashCode('')).toBe(0);
  });

  it('should return a positive hash code for a non-empty string', () => {
    const result = hashCode('test');
    expect(result).toBeGreaterThan(0);
  });

  it('should return the same hash code for the same string', () => {
    const str = 'consistent';
    expect(hashCode(str)).toBe(hashCode(str));
  });

  it('should return different hash codes for different strings', () => {
    const str1 = 'string1';
    const str2 = 'string2';
    expect(hashCode(str1)).not.toBe(hashCode(str2));
  });

  it('should handle special characters correctly', () => {
    const str = '!@#$%^&*()';
    const result = hashCode(str);
    expect(result).toBeGreaterThan(0);
  });
});
