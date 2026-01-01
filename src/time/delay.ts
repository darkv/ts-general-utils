/**
 * Creates a delay to make the code wait for a specified time.
 *
 * @param ms - Milliseconds to wait
 * @returns A promise that resolves after the specified time
 */
export async function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
