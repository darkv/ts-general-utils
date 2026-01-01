import { describe, expect, test } from 'vitest';
import { isDefined } from './values.js';

describe('isDefined', () => {
  test('should return true for defined values', () => {
    expect(isDefined(0)).toBe(true);
    expect(isDefined('')).toBe(true);
    expect(isDefined(false)).toBe(true);
    expect(isDefined([])).toBe(true);
  });

  test('should return false for null or undefined', () => {
    expect(isDefined(null)).toBe(false);
    expect(isDefined(undefined)).toBe(false);
  });
});
