# API Documentation

This document provides a brief overview of the available utilities. For detailed API reference, see the TSDoc comments in the source code or use your IDE's IntelliSense.

## Table of Contents

- [Random](#random)
  - [`random<T>`](#randomt)
  - [`randomInt`](#randomint)
- [Time](#time)
  - [`delay`](#delay)
- [Types](#types)
  - [`Result<T, E>`](#resultt-e)
  - [`AsyncResult<T, E>`](#asyncresultt-e)
  - [`Brand<T, TBrand>`](#brandt-tbrand)
  - [`Unbrand<T>`](#unbrandt)
  - [`createBrand<T>`](#createbrandt)
- [Values](#values)
  - [`isDefined<T>`](#isdefinedt)
  - [`PositiveNumber<T>`](#positivenumbert)
  - [`isPositiveNumber`](#ispositivenumber)
  - [`PositiveInteger<T>`](#positiveintegert)
  - [`isPositiveInteger`](#ispositiveinteger)
  - [`times`](#times)
  - [`template`](#template)

## Random

Utilities for generating random values and selecting random elements from collections.

### `random<T>`

Returns a random element from the provided values. Can be called with an array or rest parameters.

See also: [`randomInt`](#randomint)

```typescript
import { random } from '@darkv/ts-general-utils/random';

// From an array
const color = random(['red', 'green', 'blue']);

// From rest parameters
const number = random(1, 2, 3, 4, 5);
```

---

### `randomInt`

Returns a random integer from 0 (inclusive) to max (exclusive).

See also: [`random<T>`](#randomt)

```typescript
import { randomInt } from '@darkv/ts-general-utils/random';

const index = randomInt(10); // Returns 0-9
```

---

## Time

Utilities for handling time-related operations and delays.

### `delay`

Creates a promise that resolves after the specified number of milliseconds.

```typescript
import { delay } from '@darkv/ts-general-utils/time';

await delay(1000); // Wait 1 second
```

---

## Types

General utility types for type-safe programming patterns.

### `Result<T, E>`

A discriminated union type for representing success or error results without throwing exceptions.

See also: [`AsyncResult<T, E>`](#asyncresultt-e)

```typescript
import type { Result } from '@darkv/ts-general-utils/types';

function divide(a: number, b: number): Result<number, string> {
  if (b === 0) {
    return { success: false, error: 'Division by zero' };
  }
  return { success: true, data: a / b };
}
```

---

### `AsyncResult<T, E>`

A promise that resolves to a `Result` type, useful for async operations.

See also: [`Result<T, E>`](#resultt-e)

```typescript
import type { AsyncResult } from '@darkv/ts-general-utils/types';

async function fetchData(): AsyncResult<Data> {
  try {
    const data = await api.getData();
    return { success: true, data };
  } catch (error) {
    return { success: false, error };
  }
}
```

---

### `Brand<T, TBrand>`

A branded type that adds a compile-time brand to a base type, creating distinct types from the same base type without runtime overhead.

See also: [`Unbrand<T>`](#unbrandt), [`createBrand<T>`](#createbrandt)

```typescript
import type { Brand } from '@darkv/ts-general-utils/types';

type Milliseconds = Brand<number, 'ms'>;
type Seconds = Brand<number, 's'>;

function setDelay(delay: Milliseconds): void {
  // ...
}

setDelay(1000 as Milliseconds); // ✅ OK
setDelay(1000 as Seconds); // ❌ Type error
```

---

### `Unbrand<T>`

Extracts the base type from a branded type.

See also: [`Brand<T, TBrand>`](#brandt-tbrand)

```typescript
import type { Brand, Unbrand } from '@darkv/ts-general-utils/types';

type Milliseconds = Brand<number, 'ms'>;

type Base = Unbrand<Milliseconds>; // number
```

---

### `createBrand<T>`

Creates utility methods (type guard and brand value creation) for working with a branded type.

See also: [`Brand<T, TBrand>`](#brandt-tbrand)

```typescript
import type { Brand } from '@darkv/ts-general-utils/types';
import { createBrand } from '@darkv/ts-general-utils/types';

type EMail = Brand<string, 'EMail'>;

const EMail = createBrand<EMail>((value) => typeof value === 'string' && value.includes('@'));

// Type guard usage
if (EMail.is(value)) {
  const email: EMail = value;
}

// Brand creation with validation
const email = EMail.from('admin@example.com');
```

---

## Values

Utilities for value validation and type guards.

### `isDefined<T>`

Type guard that checks if a value is not `null` or `undefined`.

```typescript
import { isDefined } from '@darkv/ts-general-utils/values';

const value: string | undefined = getValue();
if (isDefined(value)) {
  // value is now typed as string
  console.log(value.toUpperCase());
}
```

---

### `PositiveNumber<T>`

Helper type that ensures a number is positive (greater than or equal to 0) at compile time.

See also: [`isPositiveNumber`](#ispositivenumber)

```typescript
import type { PositiveNumber } from '@darkv/ts-general-utils/values';

function processCount(count: PositiveNumber): void {
  // ...
}

processCount(0); // ✅ OK
processCount(3.14); // ✅ OK
processCount(-1); // ❌ Type error
```

---

### `isPositiveNumber`

Type guard that checks if a value is a positive number at runtime.

See also: [`PositiveNumber<T>`](#positivenumbert)

```typescript
import { isPositiveNumber } from '@darkv/ts-general-utils/values';

if (isPositiveNumber(value)) {
  // value is now typed as PositiveNumber
}
```

---

### `PositiveInteger<T>`

Helper type that ensures a number is a positive integer (greater than or equal to 0 and an integer) at compile time.

See also: [`isPositiveInteger`](#ispositiveinteger)

```typescript
import type { PositiveInteger } from '@darkv/ts-general-utils/values';

function processIndex(index: PositiveInteger): void {
  // ...
}

processIndex(0); // ✅ OK
processIndex(3.14); // ❌ Type error
processIndex(5); // ✅ OK
processIndex(-1); // ❌ Type error
```

---

### `isPositiveInteger`

Type guard that checks if a value is a positive integer at runtime.

See also: [`PositiveInteger<T>`](#positiveintegert)

```typescript
import { isPositiveInteger } from '@darkv/ts-general-utils/values';

if (isPositiveInteger(value)) {
  // value is now typed as PositiveInteger
}
```

---

### `times`

Creates an array of numbers from 0 (inclusive) to n (exclusive). Commonly used in combination with `forEach` or `map` to repeat an operation n times.

```typescript
import { times } from '@darkv/ts-general-utils/values';

times(3); // Returns [0, 1, 2]

// Repeat something n times
times(5).forEach(() => {
  console.log('Hello');
});

// Use with map, utilizing the index value (React example)
function SkeletonLoader({ count }: { count: number }) {
  return (
    <>
      {times(count).map((i) => (
        <div key={i} className="skeleton">
          Loading item {i + 1}...
        </div>
      ))}
    </>
  );
}
```

---

### `template`

Creates a template function for a given string template. Returns a curried function that accepts replacements and returns the final string with all template variables replaced. Template variables are delimited by curly braces, e.g., `{name}` and `{age}`. The function provides full type safety, automatically inferring the required replacement keys from the template string.

```typescript
import { template } from '@darkv/ts-general-utils/values';

// Basic usage with single variable
const greet = template('Hello {name}!');
greet({ name: 'World' }); // Returns "Hello World!"

// Multiple variables
const message = template('User {name} is {age} years old');
message({ name: 'Alice', age: 30 }); // Returns "User Alice is 30 years old"

// Repeated variables are replaced everywhere
const repeat = template('{word} {word} {word}');
repeat({ word: 'test' }); // Returns "test test test"

// Type safety: TypeScript knows exactly which keys are required
const userInfo = template('{firstName} {lastName}, age {age}');
userInfo({ firstName: 'John', lastName: 'Doe', age: 25 }); // ✅ OK
userInfo({ firstName: 'John' }); // ❌ TypeScript error: missing 'lastName' and 'age'
```
