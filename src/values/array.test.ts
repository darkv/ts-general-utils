import { describe, expect, test } from 'vitest';
import { times } from './array.js';

describe('times', () => {
  test.each([1, 3, 10])('should create an array of numbers from 0 to n-1 when n is %d', (n) => {
    const value = times(n);
    expect(value).toHaveLength(n);
    expect(value.at(0)).toEqual(0);
    expect(value.at(-1)).toEqual(n - 1);
  });

  test('should return an empty array when n is 0', () => {
    expect(times(0)).toEqual([]);
  });

  test('should handle negative numbers', () => {
    expect(times(-1)).toEqual([]);
    expect(times(-5)).toEqual([]);
  });

  test('should handle non-integer numbers', () => {
    expect(times(3.7)).toEqual([0, 1, 2]);
    expect(times(2.1)).toEqual([0, 1]);
  });
});
