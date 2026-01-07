/**
 * Creates an array of numbers from 0 (inclusive) to n (exclusive).
 *
 * Commonly used in combination with `forEach` or `map` to repeat an operation n times.
 *
 * @param n - The length of the array to create
 * @returns An array of numbers [0, 1, 2, …, n-1]
 *
 * @example
 * ```ts
 * times(3); // Returns [0, 1, 2]
 * ```
 *
 * @example
 * ```ts
 * // Repeat something n times
 * times(5).forEach(() => {
 *   console.log('Hello');
 * });
 * ```
 */
export const times = (n: number): number[] => Array.from({ length: n }, (_, i) => i);
