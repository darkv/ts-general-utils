# API Documentation

This document provides a brief overview of the available utilities. For detailed API reference, see the TSDoc comments in the source code or use your IDE's IntelliSense.

## Random

Utilities for generating random values and selecting random elements from collections.

### `random<T>`

Returns a random element from the provided values. Can be called with an array or rest parameters.

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

```typescript
import type { Brand, Unbrand } from '@darkv/ts-general-utils/types';

type Milliseconds = Brand<number, 'ms'>;

type Base = Unbrand<Milliseconds>; // number
```

---

### `createBrand<T>`

Creates utility methods (type guard and brand value creation) for working with a branded type.

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

```typescript
import { isPositiveNumber } from '@darkv/ts-general-utils/values';

if (isPositiveNumber(value)) {
  // value is now typed as PositiveNumber
}
```

---

### `PositiveInteger<T>`

Helper type that ensures a number is a positive integer (greater than or equal to 0 and an integer) at compile time.

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

```typescript
import { isPositiveInteger } from '@darkv/ts-general-utils/values';

if (isPositiveInteger(value)) {
  // value is now typed as PositiveInteger
}
```
