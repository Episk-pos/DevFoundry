---
sidebar_position: 1
title: "Types Across Languages"
description: "The same type concepts in Python and Go"
---

# Extracurricular: Types Across Languages

**The same concepts in Python and Go**

---

## Why This Page Exists

The main [Types as Communication](/docs/curriculum/part-1-foundations/types-as-communication) module teaches type concepts using TypeScript. This page shows the same concepts in **Python** and **Go** for:

- Developers coming from Python/Go who want to map their knowledge to TypeScript
- Learners who benefit from seeing concepts in multiple languages
- Anyone curious about how type systems differ across languages

**The core insight is the same everywhere**: explicit types help AI (and humans) understand your intent.

---

## Quick Comparison

| Concept | TypeScript | Python | Go |
|---------|------------|--------|-----|
| Static types | Yes (compile-time) | Optional (type hints) | Yes (compile-time) |
| Type inference | Yes | Yes (with type hints) | Yes |
| Null safety | `T \| null` unions | `Optional[T]` | Pointers, zero values |
| Generics | Yes | Yes (3.9+) | Yes (1.18+) |
| Compilation required | Yes (to JS) | No (hints are optional) | Yes (to binary) |

---

## Primitive Types

### TypeScript
```typescript
let price: number = 2.50;
let name: string = "Lemonade";
let available: boolean = true;
```

### Python
```python
price: float = 2.50
name: str = "Lemonade"
available: bool = True
```

### Go
```go
var price float64 = 2.50
var name string = "Lemonade"
var available bool = true

// Or with short declaration (type inferred)
price := 2.50
name := "Lemonade"
available := true
```

**Key difference**: Go distinguishes between integer types (`int`, `int32`, `int64`) and floating-point types (`float32`, `float64`). TypeScript and Python use a single numeric type.

---

## Composite Types: Arrays/Lists

### TypeScript
```typescript
let prices: number[] = [2.50, 3.00, 3.50];
let names: string[] = ["Lemonade", "Cookie"];
```

### Python
```python
from typing import List

prices: List[float] = [2.50, 3.00, 3.50]
names: List[str] = ["Lemonade", "Cookie"]

# Python 3.9+ allows:
prices: list[float] = [2.50, 3.00, 3.50]
```

### Go
```go
// Arrays have fixed size
var prices [3]float64 = [3]float64{2.50, 3.00, 3.50}

// Slices are dynamic (more common)
prices := []float64{2.50, 3.00, 3.50}
names := []string{"Lemonade", "Cookie"}
```

**Key difference**: Go has both fixed-size arrays and dynamic slices. TypeScript and Python arrays are always dynamic.

---

## Composite Types: Objects/Structs

### TypeScript
```typescript
interface MenuItem {
  id: number;
  name: string;
  price: number;
  description: string;
}

let item: MenuItem = {
  id: 1,
  name: "Lemonade",
  price: 2.50,
  description: "Classic fresh-squeezed"
};
```

### Python
```python
from dataclasses import dataclass

@dataclass
class MenuItem:
    id: int
    name: str
    price: float
    description: str

item = MenuItem(
    id=1,
    name="Lemonade",
    price=2.50,
    description="Classic fresh-squeezed"
)
```

Alternative with TypedDict (closer to TS interface):
```python
from typing import TypedDict

class MenuItem(TypedDict):
    id: int
    name: str
    price: float
    description: str

item: MenuItem = {
    "id": 1,
    "name": "Lemonade",
    "price": 2.50,
    "description": "Classic fresh-squeezed"
}
```

### Go
```go
type MenuItem struct {
    ID          int
    Name        string
    Price       float64
    Description string
}

item := MenuItem{
    ID:          1,
    Name:        "Lemonade",
    Price:       2.50,
    Description: "Classic fresh-squeezed",
}
```

**Key differences**:
- Go uses `struct`, Python uses `@dataclass` or `TypedDict`, TypeScript uses `interface`
- Go fields are capitalized for export (public access)
- Python's type hints are not enforced at runtime without additional tools

---

## Function Signatures

### TypeScript
```typescript
function calculateTotal(price: number, quantity: number): number {
  return price * quantity;
}

function findItem(id: number): MenuItem | null {
  // ...
}
```

### Python
```python
from typing import Optional

def calculate_total(price: float, quantity: int) -> float:
    return price * quantity

def find_item(id: int) -> Optional[MenuItem]:
    # ...
```

### Go
```go
func calculateTotal(price float64, quantity int) float64 {
    return price * float64(quantity)
}

func findItem(id int) (*MenuItem, error) {
    // Go uses pointer + error instead of null/optional
}
```

**Key differences**:
- Go returns `(value, error)` pairs instead of nullable types
- Python uses `Optional[T]` which is equivalent to `T | None`
- Go requires explicit type conversion (`float64(quantity)`)

---

## Union Types

### TypeScript
```typescript
type Size = "small" | "medium" | "large";

type PaymentMethod =
  | { type: "cash"; amount: number }
  | { type: "card"; cardNumber: string };
```

### Python
```python
from typing import Union, Literal
from dataclasses import dataclass

# Literal types for specific values
Size = Literal["small", "medium", "large"]

# Union types for alternatives
@dataclass
class CashPayment:
    type: Literal["cash"]
    amount: float

@dataclass
class CardPayment:
    type: Literal["card"]
    card_number: str

PaymentMethod = Union[CashPayment, CardPayment]

# Python 3.10+ allows:
PaymentMethod = CashPayment | CardPayment
```

### Go
```go
// Go doesn't have native union types
// Common pattern: interface with marker method

type PaymentMethod interface {
    isPaymentMethod()
}

type CashPayment struct {
    Amount float64
}
func (CashPayment) isPaymentMethod() {}

type CardPayment struct {
    CardNumber string
}
func (CardPayment) isPaymentMethod() {}
```

**Key difference**: Go lacks native union types. It uses interfaces with marker methods or the `any` type (less safe).

---

## Generics

### TypeScript
```typescript
function getFirst<T>(items: T[]): T | undefined {
  return items[0];
}

interface ApiResponse<T> {
  data: T;
  status: number;
}
```

### Python
```python
from typing import TypeVar, Generic, Optional, List

T = TypeVar('T')

def get_first(items: List[T]) -> Optional[T]:
    return items[0] if items else None

class ApiResponse(Generic[T]):
    data: T
    status: int
```

### Go
```go
func GetFirst[T any](items []T) (T, bool) {
    var zero T
    if len(items) == 0 {
        return zero, false
    }
    return items[0], true
}

type ApiResponse[T any] struct {
    Data   T
    Status int
}
```

**Key differences**:
- Go generics were added in 1.18 (2022), syntax still evolving
- Go uses `any` as the unconstrained type (similar to TypeScript's `unknown`)
- Python's generic syntax is more verbose

---

## Null/None/Nil Handling

### TypeScript
```typescript
// Explicit nullable type
let name: string | null = null;

// Optional property
interface User {
  name: string;
  email?: string;  // string | undefined
}
```

### Python
```python
from typing import Optional

# Optional means "T or None"
name: Optional[str] = None

# Python 3.10+
name: str | None = None

@dataclass
class User:
    name: str
    email: Optional[str] = None
```

### Go
```go
// Go uses pointers for nullable values
var name *string = nil

type User struct {
    Name  string
    Email *string  // nil-able
}

// Or use zero values (empty string, 0, false)
type User struct {
    Name  string
    Email string  // Empty string means "not set"
}
```

**Key differences**:
- Go uses pointers (`*T`) for nullable values, or zero values with conventions
- Python's type hints don't prevent `None` at runtime without tools like mypy
- TypeScript's `strict` mode enforces null checks at compile time

---

## Type Checking: When Does It Happen?

### TypeScript
```
Edit .ts file → TypeScript compiler → Type errors → Fix → Compile to .js → Run
              ↑
              Types checked HERE (compile-time)
```

### Python
```
Edit .py file → Run directly (types ignored by default)
                            OR
Edit .py file → mypy checker → Type errors → Fix → Run
              ↑
              Types checked HERE (optional, separate step)
```

### Go
```
Edit .go file → Go compiler → Type errors → Fix → Compile to binary → Run
              ↑
              Types checked HERE (compile-time)
```

**Key insight**: Python type hints are *documentation* by default. Use `mypy` or similar tools to enforce them.

---

## The Same Pattern Everywhere

Despite syntax differences, the core pattern is identical:

```
                    ┌──────────────────────────────┐
                    │     DEFINE DATA SHAPES       │
                    │  (interface/struct/dataclass)│
                    └──────────────────────────────┘
                                  │
                                  ▼
                    ┌──────────────────────────────┐
                    │    DEFINE FUNCTION CONTRACTS │
                    │  (parameters → return type)  │
                    └──────────────────────────────┘
                                  │
                                  ▼
                    ┌──────────────────────────────┐
                    │    ASK AI TO IMPLEMENT       │
                    │  (AI knows the constraints)  │
                    └──────────────────────────────┘
```

This works in any typed language. The syntax changes; the benefit remains.

---

## Complete Example: Lemonade Stand

### TypeScript

```typescript
interface MenuItem {
  id: number;
  name: string;
  price: number;
}

interface OrderItem {
  item: MenuItem;
  quantity: number;
}

interface Order {
  items: OrderItem[];
  total: number;
}

function createOrder(items: OrderItem[]): Order {
  const total = items.reduce(
    (sum, item) => sum + item.item.price * item.quantity,
    0
  );
  return { items, total };
}
```

### Python

```python
from dataclasses import dataclass
from typing import List

@dataclass
class MenuItem:
    id: int
    name: str
    price: float

@dataclass
class OrderItem:
    item: MenuItem
    quantity: int

@dataclass
class Order:
    items: List[OrderItem]
    total: float

def create_order(items: List[OrderItem]) -> Order:
    total = sum(item.item.price * item.quantity for item in items)
    return Order(items=items, total=total)
```

### Go

```go
package main

type MenuItem struct {
    ID    int
    Name  string
    Price float64
}

type OrderItem struct {
    Item     MenuItem
    Quantity int
}

type Order struct {
    Items []OrderItem
    Total float64
}

func createOrder(items []OrderItem) Order {
    var total float64
    for _, item := range items {
        total += item.Item.Price * float64(item.Quantity)
    }
    return Order{Items: items, Total: total}
}
```

**Same structure, same clarity, different syntax.**

---

## Which Language Should You Use?

For learning types in the context of web development (DevFoundry's focus):

| Language | Best For |
|----------|----------|
| TypeScript | Web development, full-stack JS, React/Vue/Angular |
| Python | Data science, scripting, backend APIs, ML |
| Go | Backend services, CLI tools, infrastructure |

All three benefit equally from explicit types when working with AI assistants.

---

## Tools for Type Checking

### TypeScript
- **tsc** (built-in compiler) — Checks types as it compiles
- **VS Code** — Real-time type checking in editor

### Python
- **mypy** — The standard type checker
- **pyright** — Microsoft's faster alternative
- **Pylance** — VS Code extension using pyright

```bash
# Run mypy on your Python code
pip install mypy
mypy your_file.py
```

### Go
- **go build** — Type checking is mandatory
- **gopls** — Language server for editor integration

---

## Key Takeaways

1. **Same concepts, different syntax** — Interfaces, function signatures, unions, and generics exist in most typed languages

2. **Type enforcement varies**:
   - TypeScript: Required compilation step
   - Python: Optional (hints ignored by default)
   - Go: Required, no escape

3. **The AI benefit is universal** — Explicit types help AI generate correct code in any language

4. **Learn one deeply, map to others** — Understanding TypeScript's type system makes learning Go or typed Python much easier

---

*Types are a lingua franca. Once you understand the concepts, you can apply them anywhere.*
