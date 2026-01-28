---
sidebar_position: 4
title: "Backend from Loop"
description: "Design APIs, data models, and services from the minimal user loop"
---

# Designing Backend from the Loop

**Your architecture should serve the loop, not the other way around**

---

## Overview

Backend architecture is easy to over-engineer. Data models, services, APIs — they can grow complex without delivering proportional value.

The minimal user loop grounds these decisions:
- **Data model**: What data must exist to close the loop?
- **APIs**: What endpoints serve the loop?
- **Services**: What processing closes the loop?

This prompt template helps you design backend systems that directly serve user value.

---

## The Core Backend Prompt

```
My minimal user loop:
**Action**: [WHAT USER DOES]
**System Response**: [WHAT BACKEND MUST DO]
**Value**: [WHAT USER GETS]

Design the backend to serve this loop:

1. **Critical Path**: What must happen for the loop to close?
   - What's the minimum viable response?
   - What can't fail?
   - What's the latency budget?

2. **Data Requirements**: What data is essential?
   - What must be stored?
   - What must be retrieved?
   - What relationships matter?

3. **API Design**: What endpoints serve this loop?
   - What's the primary endpoint?
   - What HTTP method and path?
   - What request/response shape?

4. **Failure Modes**: What could break the loop?
   - What errors are possible?
   - How do we recover?
   - What does the user see?
```

---

## Data Model from Loop

Use to design your database schema:

````
My loop requires:
- **Input data**: [WHAT USERS PROVIDE]
- **Stored data**: [WHAT WE NEED TO SAVE]
- **Output data**: [WHAT WE RETURN]

Design the data model:

**Essential entities** (loop won't work without):
```
Table: [NAME]
- id (primary key)
- [FIELD]: [TYPE] -- [PURPOSE]
- [FIELD]: [TYPE] -- [PURPOSE]
- created_at, updated_at

Relationships:
- [ENTITY] has_many/belongs_to [OTHER ENTITY]
```

**Supporting entities** (improves the loop):
```
Table: [NAME]
- [FIELDS]
```

**Future entities** (for loops we'll build later):
- [DESCRIBE, don't implement yet]

**Indexes needed** for loop performance:
- [FIELD] -- [WHY, what query it supports]

Keep it minimal. We can add later.
````

---

## API Design from Loop

Use to design your endpoints:

````
For my loop, I need these API operations:

**Primary endpoint** (the core loop):
```
[METHOD] [PATH]

Request:
{
  [FIELDS]
}

Response (success):
{
  [FIELDS]
}

Response (error):
{
  error: string,
  code: string,
  [context if helpful]
}
```

**Supporting endpoints** (help complete the loop):
```
[METHOD] [PATH] -- [PURPOSE]
```

**Questions to answer**:

1. Is authentication required?
   - For which endpoints?
   - What auth method?

2. What's the latency target?
   - [X]ms for the primary endpoint
   - How do we ensure this?

3. What validation happens?
   - On input?
   - Business rules?

4. What side effects occur?
   - Notifications?
   - Logging?
   - External calls?
````

---

## Critical Path Analysis

Use to identify what must be reliable:

````
Trace the critical path for my loop:

User Action: [ACTION]
↓
[STEP 1]: [WHAT HAPPENS] -- Must succeed? [Y/N] -- Latency: [X]ms
↓
[STEP 2]: [WHAT HAPPENS] -- Must succeed? [Y/N] -- Latency: [X]ms
↓
...
↓
User sees: [RESPONSE]

Total latency budget: [X]ms

For each step marked "Must succeed":
- What could cause it to fail?
- How do we handle failure?
- Can we make it faster?

For steps marked "N" (not critical):
- Can these happen async?
- What if they fail silently?
- Should they be in the critical path at all?
````

---

## Service Design from Loop

Use when building multiple services:

````
My loop involves these operations:
1. [OPERATION A]
2. [OPERATION B]
3. [OPERATION C]

Should these be:

**Option A: Monolith**
- All operations in one service
- Pros: Simple, no network calls, easy transactions
- Cons: [WHAT FOR YOUR CASE]

**Option B: Modular Monolith**
- Logical separation, single deployment
- Pros: Clean boundaries, simple deployment
- Cons: [WHAT FOR YOUR CASE]

**Option C: Microservices**
- Separate deployable services
- Pros: Independent scaling, isolation
- Cons: Network complexity, distributed transactions

For my loop's requirements:
- Latency: [REQUIREMENT]
- Reliability: [REQUIREMENT]
- Scale: [CURRENT/PROJECTED]
- Team size: [NUMBER]

Which architecture is appropriate?
Where might that change in the future?
````

---

## Authentication & Authorization

```
My loop: [DESCRIBE]

Authentication questions:

1. **Does this loop require auth?**
   - Can anonymous users complete it?
   - What's the minimum auth needed?

2. **What identity information is needed?**
   - Just "logged in" (boolean)?
   - User ID?
   - User role/permissions?
   - Other user attributes?

3. **Auth method recommendation**:
   - Sessions (stateful)?
   - JWT (stateless)?
   - API keys (for dev tools)?

4. **Authorization rules**:
   - Can all authenticated users complete the loop?
   - Are there role-based restrictions?
   - Are there resource-based restrictions (own data only)?

Design the auth layer for this loop specifically.
Don't overbuild for future loops.
```

---

## Real-Time vs Request-Response

````
My loop involves: [DESCRIBE INTERACTION]

The user expects:
- Response within [X] seconds
- Updates when [TRIGGER]

Analyze the options:

**Request-Response (REST)**
- User makes request, gets response
- Pros: Simple, stateless, cacheable
- Cons: User must poll for updates

**Short Polling**
- Client requests updates every [X] seconds
- Pros: Simple to implement
- Cons: Wasteful, delayed updates

**Long Polling**
- Client waits for server to have updates
- Pros: Real-time-ish, simpler than WS
- Cons: Connection management, overhead

**WebSockets**
- Persistent bi-directional connection
- Pros: True real-time, efficient
- Cons: Connection state, scaling complexity

**Server-Sent Events (SSE)**
- Server pushes updates to client
- Pros: Simple for one-way, auto-reconnect
- Cons: One direction only, connection limits

For my specific loop, what's appropriate?
Consider: actual latency needs, implementation complexity, scale requirements.
````

---

## Queue & Async Processing

````
My loop has these operations:
1. [SYNC OP] -- User waits for this
2. [OPERATION] -- Does user need to wait?
3. [OPERATION] -- Does user need to wait?

Identify async candidates:

**Must be synchronous** (user waits):
- [OPERATION] -- because [REASON]

**Can be async** (user doesn't wait):
- [OPERATION] -- because [REASON]

For async operations:

Design the flow:
1. User action
2. Synchronous: [WHAT HAPPENS, WHAT USER SEES]
3. Async: [WHAT HAPPENS IN BACKGROUND]
4. Notification: [HOW USER KNOWS WHEN DONE]

Queue design:
- What queue/job system?
- Retry policy?
- Failure handling?
````

---

## Error Handling Strategy

````
For my loop, these errors can occur:

**Input Errors** (user's fault):
| Error | Cause | Message to User | Status Code |
|-------|-------|-----------------|-------------|
| | | | |

**Business Logic Errors** (rules prevent action):
| Error | Cause | Message to User | Status Code |
|-------|-------|-----------------|-------------|
| | | | |

**System Errors** (our fault):
| Error | Cause | Message to User | Status Code |
|-------|-------|-----------------|-------------|
| | | | |

**External Dependency Errors** (third party fails):
| Error | Cause | Message to User | Fallback |
|-------|-------|-----------------|----------|
| | | | |

For each category:
- How do we detect it?
- How do we log it?
- What's the user experience?
- Is there a retry/recovery strategy?
````

---

## Caching Strategy

````
My loop hits these data:
1. [DATA A] -- Changes: [FREQUENCY] -- Reads: [FREQUENCY]
2. [DATA B] -- Changes: [FREQUENCY] -- Reads: [FREQUENCY]
...

Caching analysis:

**Hot data** (frequent reads, infrequent writes):
- What: [DATA]
- Cache location: [Client / CDN / Server memory / Redis]
- TTL: [DURATION]
- Invalidation: [STRATEGY]

**Warm data** (occasional reads):
- What: [DATA]
- Strategy: [APPROACH]

**Cold data** (rare reads):
- No caching needed

For the critical loop path:
- What's cacheable?
- What's the cache hit target?
- What happens on cache miss?
````

---

## Scaling Considerations

````
My loop's current load:
- Requests per second: [X]
- Data size: [X]
- Concurrent users: [X]

Projected load (6-12 months):
- [ESTIMATES]

Analyze scaling needs:

**Current bottlenecks**:
- Database: [IS IT? WHY?]
- Compute: [IS IT? WHY?]
- Memory: [IS IT? WHY?]
- Network: [IS IT? WHY?]

**Scaling strategy** (when needed):

Horizontal (more instances):
- What can be scaled horizontally?
- What prevents horizontal scaling?

Vertical (bigger instance):
- What benefits from vertical scaling?
- Cost/limit considerations?

**Don't optimize yet** (YAGNI):
- What would we be tempted to optimize that isn't needed?
- What's the actual trigger to revisit scaling?

Design for current needs. Plan for future. Don't build for future yet.
````

---

## Backend Code Structure

````
For my loop, organize the backend code:

**Layer structure**:

```
src/
├── routes/          # HTTP layer (thin)
│   └── [loop].ts    # Parse request, call service, format response
│
├── services/        # Business logic
│   └── [loop].ts    # Loop logic, orchestration
│
├── repositories/    # Data access
│   └── [entity].ts  # Database queries
│
├── models/          # Data types
│   └── [entity].ts  # Type definitions
│
└── utils/           # Shared utilities
    └── ...
```

For my specific loop:
- What goes in each layer?
- What's the function signature for the main service function?
- What's the data flow through the layers?
````

---

## Checklist: Backend from Loop

- [ ] Data model contains only essential entities
- [ ] Primary API endpoint is defined
- [ ] Critical path is identified and optimized
- [ ] Failure modes are handled
- [ ] Auth is appropriate (not over-engineered)
- [ ] Async vs sync decisions are made
- [ ] Caching strategy exists (even if "none")
- [ ] Scaling triggers are defined (not pre-optimized)

---

## Related Prompts

- [Discovering Your Loop](discovering-loops) — Define the loop first
- [Infrastructure from Loop](infra-from-loop) — Deployment decisions
- [Architecture-First Prompting](../architecture-first) — Implementation with context
