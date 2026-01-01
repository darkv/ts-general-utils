import { describe, expect, test } from 'vitest';
import { randomInt } from './random-int.js';

describe('randomInt', () => {
  test('should return a random integer', () => {
    for (let i = 0; i < 10; i++) {
      const result = randomInt(3);
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThan(3);
    }
  });
});
