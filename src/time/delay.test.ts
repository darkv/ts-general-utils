import { describe, expect, test, vi, beforeEach, afterEach } from 'vitest';
import { delay } from './delay.js';

describe('delay', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test('should resolve after the specified time', async () => {
    const promise = delay(50);

    // Verify it hasn't resolved yet
    let resolved = false;
    promise.then(() => {
      resolved = true;
    });

    // Advance time by less than the delay
    vi.advanceTimersByTime(49);
    await Promise.resolve(); // Let promises settle
    expect(resolved).toBe(false);

    // Advance time to complete the delay
    vi.advanceTimersByTime(1);
    await promise;
    expect(resolved).toBe(true);
  });
});
