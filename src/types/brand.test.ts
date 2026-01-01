import { describe, expect, test } from 'vitest';
import { expectType, TypeEqual } from 'ts-expect';
import { Brand, Unbrand, createBrand } from './brand.js';

describe('Brand type', () => {
  test('should prevent assignment between different brands', () => {
    type Milliseconds = Brand<number, 'ms'>;
    type Seconds = Brand<number, 's'>;

    const milliseconds = 1000 as Milliseconds;
    const seconds = 1 as Seconds;

    // @ts-expect-error - Milliseconds is not assignable to Seconds
    const millisecondsAsSeconds: Seconds = milliseconds;

    // @ts-expect-error - Seconds is not assignable to Milliseconds
    const secondsAsMilliseconds: Milliseconds = seconds;
  });

  test('should prevent direct assignment of base type to branded type', () => {
    type EMail = Brand<string, 'EMail'>;

    // @ts-expect-error - string is not assignable to EMail
    const email: EMail = 'test@example.com';
  });

  test('should allow assignment between same branded types', () => {
    type EMail = Brand<string, 'EMail'>;
    const email1 = 'test1@example.com' as EMail;

    // Same brand should be assignable
    const email2: EMail = email1;
    expectType<EMail>(email2);
    expect(email2).toBe('test1@example.com');
  });

  test('should preserve base type behavior at runtime', () => {
    type EMail = Brand<string, 'EMail'>;
    const email = 'test@example.com' as EMail;

    expect(typeof email).toBe('string');
    expect(email).toBe('test@example.com');
  });
});

describe('Unbrand type', () => {
  test('should extract base type from branded type', () => {
    type Milliseconds = Brand<number, 'ms'>;
    type Base = Unbrand<Milliseconds>;

    expectType<TypeEqual<Base, number>>(true);
  });

  test('should return unchanged type for non-branded types', () => {
    type Base = Unbrand<string>;

    expectType<TypeEqual<Base, string>>(true);
  });
});

describe('createBrand', () => {
  type EMail = Brand<string, 'EMail'>;
  const emailPredicate = (value: unknown): boolean => typeof value === 'string' && value.includes('@');

  test('should create brand utilities with is and from methods', () => {
    const EMail = createBrand<EMail>(emailPredicate);

    expect(EMail).toHaveProperty('is');
    expect(EMail).toHaveProperty('from');
    expect(typeof EMail.is).toBe('function');
    expect(typeof EMail.from).toBe('function');
  });

  test.each([
    ['test@example.com', true],
    ['not-an-email', false],
    [123, false],
    [null, false],
    [undefined, false],
  ])('EMail.is(%p) should return %p', (input, expected) => {
    const EMail = createBrand<EMail>(emailPredicate);
    expect(EMail.is(input)).toBe(expected);
  });

  test('from should return branded value for valid input', () => {
    const EMail = createBrand<EMail>(emailPredicate);

    const email = EMail.from('test@example.com');
    expectType<EMail>(email);
    expect(email).toBe('test@example.com');
  });

  test('from should throw TypeError for invalid input', () => {
    const EMail = createBrand<EMail>(emailPredicate);

    expect(() => EMail.from('not-an-email')).toThrow(TypeError);
    expect(() => EMail.from('not-an-email')).toThrow('Value does not match the brand criteria: not-an-email');
  });

  test('from should use custom error message when provided', () => {
    const EMail = createBrand<EMail>(emailPredicate);

    expect(() => EMail.from('invalid', 'Invalid email address')).toThrow('Invalid email address');
  });

  test('is should narrow type correctly', () => {
    const EMail = createBrand<EMail>(emailPredicate);

    const value = 'test@example.com';

    if (EMail.is(value)) {
      expectType<EMail>(value);
    } else {
      expect.fail('Value should pass the type guard');
    }
  });

  test('from should return correct branded type', () => {
    const EMail = createBrand<EMail>(emailPredicate);

    const email = EMail.from('test@example.com');
    expectType<EMail>(email);
  });
});
