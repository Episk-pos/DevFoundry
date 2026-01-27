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
let timestamp: number = 1706284800;
let content: string = "Hello";
let delivered: boolean = true;
```

### Python
```python
timestamp: float = 1706284800
content: str = "Hello"
delivered: bool = True
```

### Go
```go
var timestamp float64 = 1706284800
var content string = "Hello"
var delivered bool = true

// Or with short declaration (type inferred)
timestamp := 1706284800
content := "Hello"
delivered := true
```

**Key difference**: Go distinguishes between integer types (`int`, `int32`, `int64`) and floating-point types (`float32`, `float64`). TypeScript and Python use a single numeric type.

---

## Composite Types: Arrays/Lists

### TypeScript
```typescript
let timestamps: number[] = [1706284800, 1706284860, 1706284920];
let messages: string[] = ["Hello", "Welcome"];
```

### Python
```python
from typing import List

timestamps: List[float] = [1706284800, 1706284860, 1706284920]
messages: List[str] = ["Hello", "Welcome"]

# Python 3.9+ allows:
timestamps: list[float] = [1706284800, 1706284860, 1706284920]
```

### Go
```go
// Arrays have fixed size
var timestamps [3]float64 = [3]float64{1706284800, 1706284860, 1706284920}

// Slices are dynamic (more common)
timestamps := []float64{1706284800, 1706284860, 1706284920}
messages := []string{"Hello", "Welcome"}
```

**Key difference**: Go has both fixed-size arrays and dynamic slices. TypeScript and Python arrays are always dynamic.

---

## Composite Types: Objects/Structs

### TypeScript
```typescript
interface Message {
  id: number;
  sender: string;
  content: string;
  timestamp: number;
}

let message: Message = {
  id: 1,
  sender: "alice",
  content: "Hello, world!",
  timestamp: 1706284800
};
```

### Python
```python
from dataclasses import dataclass

@dataclass
class Message:
    id: int
    sender: str
    content: str
    timestamp: float

message = Message(
    id=1,
    sender="alice",
    content="Hello, world!",
    timestamp=1706284800
)
```

Alternative with TypedDict (closer to TS interface):
```python
from typing import TypedDict

class Message(TypedDict):
    id: int
    sender: str
    content: str
    timestamp: float

message: Message = {
    "id": 1,
    "sender": "alice",
    "content": "Hello, world!",
    "timestamp": 1706284800
}
```

### Go
```go
type Message struct {
    ID        int
    Sender    string
    Content   string
    Timestamp float64
}

message := Message{
    ID:        1,
    Sender:    "alice",
    Content:   "Hello, world!",
    Timestamp: 1706284800,
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
function formatTimestamp(timestamp: number): string {
  return new Date(timestamp).toISOString();
}

function findMessage(id: number): Message | null {
  // ...
}
```

### Python
```python
from typing import Optional

def format_timestamp(timestamp: float) -> str:
    from datetime import datetime
    return datetime.fromtimestamp(timestamp).isoformat()

def find_message(id: int) -> Optional[Message]:
    # ...
```

### Go
```go
func formatTimestamp(timestamp float64) string {
    return time.Unix(int64(timestamp), 0).Format(time.RFC3339)
}

func findMessage(id int) (*Message, error) {
    // Go uses pointer + error instead of null/optional
}
```

**Key differences**:
- Go returns `(value, error)` pairs instead of nullable types
- Python uses `Optional[T]` which is equivalent to `T | None`
- Go requires explicit type conversion (`int64(timestamp)`)

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

## Complete Example: Chat App

### TypeScript

```typescript
interface Message {
  id: number;
  sender: string;
  content: string;
  timestamp: number;
}

interface ChatRoom {
  id: string;
  name: string;
  messages: Message[];
}

interface SendResult {
  success: boolean;
  messageId: number;
}

function sendMessage(room: ChatRoom, sender: string, content: string): SendResult {
  const message: Message = {
    id: room.messages.length + 1,
    sender,
    content,
    timestamp: Date.now()
  };
  room.messages.push(message);
  return { success: true, messageId: message.id };
}
```

### Python

```python
from dataclasses import dataclass, field
from typing import List
import time

@dataclass
class Message:
    id: int
    sender: str
    content: str
    timestamp: float

@dataclass
class ChatRoom:
    id: str
    name: str
    messages: List[Message] = field(default_factory=list)

@dataclass
class SendResult:
    success: bool
    message_id: int

def send_message(room: ChatRoom, sender: str, content: str) -> SendResult:
    message = Message(
        id=len(room.messages) + 1,
        sender=sender,
        content=content,
        timestamp=time.time()
    )
    room.messages.append(message)
    return SendResult(success=True, message_id=message.id)
```

### Go

```go
package main

import "time"

type Message struct {
    ID        int
    Sender    string
    Content   string
    Timestamp int64
}

type ChatRoom struct {
    ID       string
    Name     string
    Messages []Message
}

type SendResult struct {
    Success   bool
    MessageID int
}

func sendMessage(room *ChatRoom, sender, content string) SendResult {
    message := Message{
        ID:        len(room.Messages) + 1,
        Sender:    sender,
        Content:   content,
        Timestamp: time.Now().Unix(),
    }
    room.Messages = append(room.Messages, message)
    return SendResult{Success: true, MessageID: message.ID}
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
