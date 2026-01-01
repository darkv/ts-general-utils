// moved to a separate file to allow for mocking in tests

/**
 * Returns a random integer from 0 (inclusive) to max (exclusive).
 *
 * @param max - The upper bound (exclusive)
 * @returns A random integer in the range [0, max)
 */
export function randomInt(max: number): number {
  if (max === 1) {
    return 0;
  }
  // Use bitwise OR with 0 to truncate (faster than Math.floor for positive numbers)
  return (Math.random() * max) | 0;
}
