declare const brandKey: unique symbol;

/**
 * A branded type that adds a compile-time brand to a base type.
 *
 * Branded types are useful for creating distinct types from the same base type
 * without runtime overhead. The brand exists only at compile-time and is erased
 * at runtime, so the value is just the underlying type `T`.
 *
 * **Note:** Since branded types don't exist at runtime, you cannot check for
 * the brand property itself. Use type guards with predicate functions to validate
 * values at runtime.
 *
 * @typeParam T - The base type to brand
 * @typeParam TBrand - A unique identifier (typically a string literal) for the brand
 *
 * @example
 * ```ts
 * type Milliseconds = Brand<number, 'ms'>;
 * function example(value: Milliseconds): void {}
 * example(50);    // ❌ Type error
 * const delay: Milliseconds = …;
 * example(delay); // ✅ OK
 * ```
 */
export type Brand<T, TBrand> = T & { readonly [brandKey]: TBrand };

/**
 * Extracts the base type from a branded type.
 *
 * If the input type is a `Brand<T, TBrand>`, this returns `T`.
 * Otherwise, it returns the input type unchanged.
 *
 * @typeParam T - The type to unbrand
 *
 * @example
 * ```ts
 * type Milliseconds = Brand<number, 'ms'>;
 *
 * type Base = Unbrand<Milliseconds>; // number
 * type Unchanged = Unbrand<string>;  // string
 * ```
 */
export type Unbrand<T> = T extends Brand<infer U, unknown> ? U : T;

/**
 * Utility methods for working with a branded type.
 *
 * @typeParam T - The branded type
 */
type CreateBrand<T extends Brand<unknown, unknown>> = {
  /**
   * Type guard that checks if a value matches the brand criteria.
   *
   * @param value - The value to check
   * @returns `true` if the value matches the brand criteria
   */
  is: (value: unknown) => value is T;

  /**
   * Creates a branded value from a value with validation.
   *
   * @param value - The value to brand
   * @param errorMessage - Optional custom error message if validation fails
   * @returns The value as the branded type
   * @throws {TypeError} If the value does not pass validation
   */
  from: (value: unknown, errorMessage?: string) => T;
};

/**
 * Creates utility methods for working with a branded type.
 *
 * This function returns an object with both a type guard (`is`) and a brand
 * value creation function (`from`) for the specified branded type.
 *
 * @typeParam T - The branded type
 *
 * @param predicate - A function that determines if a value matches the brand criteria.
 *   The predicate should first check that the value is of the base type, then validate
 *   that it meets the brand-specific requirements.
 * @returns An object with `is` (type guard) and `from` (brand value creation) methods
 *
 * @example
 * ```ts
 * type EMail = Brand<string, 'EMail'>;
 *
 * const EMail = createBrand<EMail>(
 *   (value) => typeof value === 'string' && value.includes('@')
 * );
 *
 * // Type guard usage
 * const value: string = 'test@example.com';
 * if (EMail.is(value)) {
 *   // value is now typed as EMail
 *   const email: EMail = value;
 * }
 *
 * // Brand creation with validation
 * const email = EMail.from('admin@example.com', 'Invalid email address');
 * // email is typed as EMail
 * ```
 */
export function createBrand<T extends Brand<unknown, unknown>>(predicate: (value: unknown) => boolean): CreateBrand<T> {
  const is = (value: unknown): value is T => {
    return predicate(value);
  };

  const from = (value: unknown, errorMessage?: string): T => {
    if (is(value)) {
      return value;
    }
    throw new TypeError(errorMessage ?? `Value does not match the brand criteria: ${value}`);
  };

  return { is, from };
}
