import { describe, expect, test } from 'vitest';
import { expectType } from 'ts-expect';
import { isPositiveNumber, isPositiveInteger, type PositiveNumber, type PositiveInteger } from './numeric.js';

describe('isPositiveNumber', () => {
  test('should return true for positive integers', () => {
    expect(isPositiveNumber(0)).toBe(true);
    expect(isPositiveNumber(1)).toBe(true);
    expect(isPositiveNumber(5)).toBe(true);
    expect(isPositiveNumber(100)).toBe(true);
  });

  test('should return true for positive floats', () => {
    expect(isPositiveNumber(0.5)).toBe(true);
    expect(isPositiveNumber(3.14)).toBe(true);
    expect(isPositiveNumber(0.001)).toBe(true);
  });

  test('should return false for negative numbers', () => {
    expect(isPositiveNumber(-1)).toBe(false);
    expect(isPositiveNumber(-5)).toBe(false);
    expect(isPositiveNumber(-0.5)).toBe(false);
    expect(isPositiveNumber(-3.14)).toBe(false);
  });

  test('should return false for non-numbers', () => {
    expect(isPositiveNumber('0')).toBe(false);
    expect(isPositiveNumber('5')).toBe(false);
    expect(isPositiveNumber(null)).toBe(false);
    expect(isPositiveNumber(undefined)).toBe(false);
    expect(isPositiveNumber(true)).toBe(false);
    expect(isPositiveNumber(false)).toBe(false);
    expect(isPositiveNumber([])).toBe(false);
    expect(isPositiveNumber({})).toBe(false);
    expect(isPositiveNumber(NaN)).toBe(false);
  });

  test('should narrow type correctly', () => {
    const value: unknown = 5;

    if (isPositiveNumber(value)) {
      expectType<PositiveNumber>(value);
      expect(value).toBe(5);
    } else {
      expect.fail('Value should pass the type guard');
    }
  });
});

describe('isPositiveInteger', () => {
  test('should return true for positive integers', () => {
    expect(isPositiveInteger(0)).toBe(true);
    expect(isPositiveInteger(1)).toBe(true);
    expect(isPositiveInteger(5)).toBe(true);
    expect(isPositiveInteger(100)).toBe(true);
  });

  test('should return false for negative numbers', () => {
    expect(isPositiveInteger(-1)).toBe(false);
    expect(isPositiveInteger(-5)).toBe(false);
    expect(isPositiveInteger(-100)).toBe(false);
    expect(isPositiveInteger(-0.5)).toBe(false);
    expect(isPositiveInteger(-3.14)).toBe(false);
    expect(isPositiveInteger(-1.1)).toBe(false);
  });

  test('should return false for positive floats', () => {
    expect(isPositiveInteger(0.5)).toBe(false);
    expect(isPositiveInteger(3.14)).toBe(false);
    expect(isPositiveInteger(1.1)).toBe(false);
  });

  test('should return false for non-numbers', () => {
    expect(isPositiveInteger('0')).toBe(false);
    expect(isPositiveInteger('5')).toBe(false);
    expect(isPositiveInteger(null)).toBe(false);
    expect(isPositiveInteger(undefined)).toBe(false);
    expect(isPositiveInteger(true)).toBe(false);
    expect(isPositiveInteger(false)).toBe(false);
    expect(isPositiveInteger([])).toBe(false);
    expect(isPositiveInteger({})).toBe(false);
    expect(isPositiveInteger(NaN)).toBe(false);
  });

  test('should narrow type correctly', () => {
    const value: unknown = 5;

    if (isPositiveInteger(value)) {
      expectType<PositiveInteger>(value);
      expect(value).toBe(5);
    } else {
      expect.fail('Value should pass the type guard');
    }
  });
});
