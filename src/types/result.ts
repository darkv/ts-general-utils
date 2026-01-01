/**
 * Discriminated union type for a result that can be either success or error
 */
export type Result<T, E = Error> = { success: true; data: T } | { success: false; error: E };

/**
 * Promise that resolves to a `Result` type
 */
export type AsyncResult<T, E = Error> = Promise<Result<T, E>>;
