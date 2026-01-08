import { describe, expect, test } from 'vitest';
import { template } from './strings.js';

describe('template', () => {
  test('should replace single template variable', () => {
    const greet = template('Hello {name}!');
    expect(greet({ name: 'World' })).toBe('Hello World!');
  });

  test('should replace multiple template variables', () => {
    const message = template('User {name} is {age} years old');
    expect(message({ name: 'Alice', age: 30 })).toBe('User Alice is 30 years old');
  });

  test('should work with numeric replacements', () => {
    const count = template('You have {count} items');
    expect(count({ count: 42 })).toBe('You have 42 items');
  });

  test('should handle repeated template variables', () => {
    const repeat = template('{word} {word} {word}');
    expect(repeat({ word: 'test' })).toBe('test test test');
  });
});
