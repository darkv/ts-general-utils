import { expect, vi, beforeEach, afterEach, test, describe } from 'vitest';
import { random } from './random.js';
import * as randomIntModule from './random-int.js';

describe('random', () => {
  let randomIntSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    randomIntSpy = vi.spyOn(randomIntModule, 'randomInt');
  });

  afterEach(() => {
    randomIntSpy.mockRestore();
  });

  test.each([
    [1, 0],
    [2, 1],
    [3, 2],
  ])('should return %d from array for random value %d', (expected, randomValue) => {
    randomIntSpy.mockReturnValue(randomValue);
    expect(random([1, 2, 3])).toBe(expected);
  });

  test.each([
    [1, 0],
    [2, 1],
    [3, 2],
  ])('should return %d from rest parameters for random value %d', (expected, randomValue) => {
    randomIntSpy.mockReturnValue(randomValue);
    expect(random(1, 2, 3)).toBe(expected);
  });

  test('should throw an error when array is empty', () => {
    expect(() => random([])).toThrow('Cannot select a random element: empty array');
  });

  test('should throw an error when no arguments are provided', () => {
    expect(() => random()).toThrow('Cannot select a random element: no values provided');
  });

  test('should return the only value if single value is passed', () => {
    expect(random([42])).toBe(42);
    expect(random(42)).toBe(42);
  });
});
