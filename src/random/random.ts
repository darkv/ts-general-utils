import { randomInt } from './random-int.js';

/**
 * Returns a random element from the provided values.
 *
 * @param values - An array of values to choose from
 * @returns A randomly selected value from the array
 * @throws {Error} If the array is empty
 *
 * @example
 * ```ts
 * random([1, 2, 3]); // Returns 1, 2, or 3
 * random(['a', 'b', 'c']); // Returns 'a', 'b', or 'c'
 * ```
 */
export function random<T>(values: T[]): T;
/**
 * Returns a random element from the provided values.
 *
 * @param values - Rest parameters representing the values to choose from
 * @returns A randomly selected value from the provided arguments
 * @throws {Error} If no values are provided
 *
 * @example
 * ```ts
 * random(1, 2, 3); // Returns 1, 2, or 3
 * random('a', 'b', 'c'); // Returns 'a', 'b', or 'c'
 * ```
 */
export function random<T>(...values: T[]): T;
export function random<T>(...values: T[] | [T[]]): T {
  const isArrayInput = values.length === 1 && Array.isArray(values[0]);
  const array: T[] = isArrayInput ? (values[0] as T[]) : (values as T[]);

  if (array.length === 0) {
    const errorMessage = isArrayInput
      ? 'Cannot select a random element: empty array'
      : 'Cannot select a random element: no values provided';
    throw new Error(errorMessage);
  }

  const randomIndex = randomInt(array.length);
  return array[randomIndex]!;
}
