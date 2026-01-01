/**
 * Type guard that checks if given value is defined.
 *
 * @param value - The value to check
 * @returns `true` if the value is neither null nor undefined
 */
export function isDefined<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

/*
if (!(Number.isInteger(count) && count >= 0)) {
  throw new TypeError('Expected a non-negative integer');
}
*/
