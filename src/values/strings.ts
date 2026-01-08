/**
 * Extracts template variable names from a string template.
 *
 * Template variables are delimited by curly braces, e.g., `{name}` in "Hello {name}".
 *
 * @template T - The string template type
 * @template Acc - Accumulator for collected variable names
 */
type TemplateVariables<
  T extends string,
  Acc extends string[] = [],
> = T extends `${string}{${infer TemplateVariableKey}}${infer Rest}`
  ? TemplateVariableKey extends ''
    ? TemplateVariables<Rest, Acc>
    : TemplateVariables<Rest, [...Acc, TemplateVariableKey]>
  : Acc;

/**
 * Creates a type representing the required replacements for a template string.
 *
 * Each template variable in the string must have a corresponding replacement value
 * of type `string` or `number`.
 *
 * @template T - The string template type
 */
type Replacements<T extends string> = {
  readonly [K in TemplateVariables<T>[number]]: string | number;
};

/**
 * Creates a template function for a given string template.
 *
 * Returns a curried function that accepts replacements and returns the final string
 * with all template variables replaced. Template variables are delimited by curly
 * braces, e.g., `{name}` and `{age}`.
 *
 * @param template - The string template with variables delimited by `{}`
 * @returns A function that accepts replacements and returns the final string
 *
 * @example
 * ```ts
 * const greet = template('Hello {name}!');
 * greet({ name: 'World' }); // Returns "Hello World!"
 * ```
 *
 * @example
 * ```ts
 * const message = template('User {name} is {age} years old');
 * message({ name: 'Alice', age: 30 }); // Returns "User Alice is 30 years old"
 * ```
 */
export function template<T extends string>(template: T): (replacements: Replacements<T>) => string {
  return (replacements: Replacements<T>): string => {
    let result: string = template;
    const keys = Object.keys(replacements) as Array<keyof typeof replacements>;

    for (const key of keys) {
      const value = String(replacements[key]);
      result = result.replaceAll(`{${String(key)}}`, value);
    }

    return result;
  };
}
