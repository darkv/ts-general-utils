/**
 * Helper type that checks if a number literal is positive.
 *
 * @example
 * ```ts
 * function example(value: PositiveNumber): void {}
 * example(0);    // ✅ OK
 * example(3.14); // ✅ OK
 * example(5);    // ✅ OK
 * example(-1);   // ❌ Type error
 * ```
 */
export type PositiveNumber<T extends number = number> = `${T}` extends `-${string}` ? never : T;

/**
 * Type guard that checks if given value is a positive number.
 *
 * @param value - The value to check
 * @returns `true` if the value is a number and is greater than or equal to 0
 */
export function isPositiveNumber(value: unknown): value is PositiveNumber {
  return typeof value === 'number' && value >= 0;
}

/**
 * Helper type that checks if a number literal is a positive integer.
 *
 * @example
 * ```ts
 * function example(value: PositiveInteger): void {}
 * example(0);    // ✅ OK
 * example(3.14); // ❌ Type error
 * example(5);    // ✅ OK
 * example(-1);   // ❌ Type error
 * ```
 */
export type PositiveInteger<T extends number = number> = `${T}` extends `-${string}`
  ? never
  : `${T}` extends `${string}.${string}`
    ? never
    : T;

/**
 * Type guard that checks if given value is a positive integer.
 *
 * @param value - The value to check
 * @returns `true` if the value is a number, is an integer, and is greater than or equal to 0
 */
export function isPositiveInteger(value: unknown): value is PositiveInteger {
  return typeof value === 'number' && Number.isInteger(value) && value >= 0;
}
