# Protocol Thinking

**Seeing Systems as Interactions Between Actors**

---

## Introduction

**Protocol thinking** is a mental model that helps you understand any system — software or otherwise — by analyzing the actors, their boundaries, their incentives, and how they interact.

This isn't just useful for building software. It's useful for understanding *everything*: organizations, markets, games, social dynamics, bureaucracies, and yes, code.

When you develop this lens, you start seeing protocols everywhere. And more importantly, you start seeing **why things break**.

---

## What Is a Protocol?

A protocol is a **set of rules that govern how actors interact**.

Protocols can be:
- **Explicit** — written down, enforced, well-defined (HTTP, TCP/IP, legal contracts)
- **Implicit** — unwritten, assumed, emergent (social norms, "how we've always done it")

**Examples**:

| Domain | Protocol | Actors |
|--------|----------|--------|
| Web | HTTP | Browser, Server |
| Email | SMTP | Mail client, Mail server |
| Restaurant | Ordering | Customer, Server, Kitchen |
| Meeting | Turn-taking | Participants |
| Highway | Traffic rules | Drivers |
| Democracy | Voting | Citizens, Government |

Every interaction between multiple parties involves a protocol, whether anyone designed it or not.

---

## The Protocol Analysis Framework

To understand any system, ask these questions:

### 1. Who Are the Actors?

Identify every participant in the system. This includes:
- **Active actors** — entities that make decisions (users, servers, organizations)
- **Passive actors** — entities that are acted upon (databases, documents, resources)
- **Hidden actors** — entities you might not notice at first (regulators, intermediaries, observers)

**Example: E-commerce checkout**
- Active: Customer, Payment processor, Merchant
- Passive: Shopping cart, Order record, Inventory
- Hidden: Fraud detection service, Bank, Tax authority

### 2. What Are Their Boundaries?

Each actor has:
- **Capabilities** — what they can do
- **Limitations** — what they can't do
- **Information** — what they know

**Example: Restaurant ordering**
- Customer: Can read menu, place order, pay; can't enter kitchen
- Server: Can take orders, deliver food, process payment; can't cook
- Kitchen: Can prepare food; doesn't interact with customer directly

Boundaries define where one actor ends and another begins.

### 3. What Are Their Interests and Incentives?

Every actor has goals. Often different actors have **different goals**. Sometimes goals conflict.

**Example: Social media platform**
- User: Wants entertainment, connection, information
- Platform: Wants engagement, data, ad revenue
- Advertiser: Wants attention, conversions

Understanding incentives explains behavior that might otherwise seem irrational.

### 4. How Do They Interact?

What messages pass between actors? What triggers those messages? What happens in response?

**Example: HTTP protocol**
```
Client → Server: "GET /page.html"
Server → Client: "200 OK, here's the HTML"
```

**Example: Job interview protocol**
```
Candidate → Company: Application
Company → Candidate: Interview invitation
Candidate ↔ Company: Multiple interview rounds
Company → Candidate: Offer or rejection
Candidate → Company: Accept or decline
```

---

## Where Protocols Break

Most frustrations in life come from **broken protocols**. Understanding protocol failures helps you see opportunities.

### Failure Mode 1: Implicit Protocols

When the protocol is never made explicit, actors operate on **different assumptions**.

**Example**: Meeting culture
- Person A assumes: "We start on time"
- Person B assumes: "5 minutes late is fine"
- Person C assumes: "Wait for everyone to arrive"

**Result**: Frustration, wasted time, resentment

**Fix**: Make the protocol explicit. Document expectations. Align on assumptions.

### Failure Mode 2: Misaligned Incentives

When actors' incentives conflict with the protocol's goals.

**Example**: Customer support metrics
- Protocol goal: Resolve customer problems
- Agent incentive: Close tickets quickly (measured on volume)

**Result**: Tickets closed without resolution, customer frustration

**Fix**: Align incentives with goals. Measure resolution quality, not just speed.

### Failure Mode 3: Missing Actors

When a necessary actor is absent from the protocol.

**Example**: Open-source funding
- Protocol: Developers create software, users download for free
- Missing actor: Someone who pays developers

**Result**: Maintainer burnout, abandoned projects

**Fix**: Introduce missing actors (sponsors, foundations, commercial licenses).

### Failure Mode 4: Unclear Boundaries

When actors don't know where their authority starts and ends.

**Example**: Overlapping responsibilities
- Marketing says: "We own the website content"
- Engineering says: "We own the website"

**Result**: Conflicts, duplicated work, things falling through cracks

**Fix**: Define boundaries explicitly. Create clear ownership.

### Failure Mode 5: Missing Feedback Loops

When there's no mechanism to detect and correct problems.

**Example**: Public policy
- Policy is created
- Policy is implemented
- No measurement of outcomes
- No mechanism to adjust

**Result**: Bad policies persist indefinitely

**Fix**: Build in feedback mechanisms. Measure outcomes. Create adjustment processes.

---

## Protocol Thinking in Software

In software, protocols are everywhere:

### Network Protocols
- HTTP, HTTPS, WebSocket
- TCP/IP, UDP
- REST, GraphQL

### Application Protocols
- Authentication flows
- Payment processing
- State synchronization

### Team Protocols
- Code review process
- Deployment workflows
- Incident response

### Example: Designing an API

When designing an API, you're designing a protocol:

```
1. Actors: Client application, Server, Database

2. Boundaries:
   - Client: Can make requests, handle responses
   - Server: Can validate, process, respond
   - Database: Stores and retrieves data

3. Interactions:
   POST /orders
   → Validate order
   → Check inventory
   → Create order record
   → Return confirmation

4. Failure modes:
   - What if validation fails?
   - What if inventory is insufficient?
   - What if database is down?
```

Good API design is good protocol design.

---

## Protocol Thinking in Life

### Example: Healthcare System

```
Actors:
- Patient (wants care)
- Doctor (wants to help, has time constraints)
- Insurance (wants to minimize payouts)
- Hospital (wants revenue, constrained by regulations)
- Government (wants compliance, public health)

Broken protocols:
- Prior authorization (delays care)
- Billing opacity (hidden costs)
- Fragmented records (information silos)
- Misaligned incentives (fee-for-service vs outcomes)
```

Understanding this reveals where interventions might help:
- Better information sharing (records portability)
- Transparent pricing (searchable procedure costs)
- Alternative payment models (value-based care)

### Example: Remote Work

```
Actors:
- Employee (wants flexibility, clear expectations)
- Manager (wants productivity, accountability)
- Team (wants collaboration, connection)
- Organization (wants output, culture)

Protocol challenges:
- Implicit availability expectations
- Unclear response time norms
- Meeting overload
- Missing casual interactions
```

Solutions require making protocols explicit:
- Core hours vs flexible hours
- Async-first communication norms
- Meeting-free days
- Intentional social time

---

## Applying Protocol Thinking

### Step 1: Map the System

Before trying to fix anything:
1. List all actors
2. Map their boundaries
3. Identify their incentives
4. Document current interactions

### Step 2: Identify Failures

Look for:
- Where do things break down?
- What causes frustration?
- Where are incentives misaligned?
- What's implicit that should be explicit?

### Step 3: Design Interventions

For each failure:
- Can you make an implicit protocol explicit?
- Can you align incentives?
- Can you add missing actors?
- Can you clarify boundaries?
- Can you add feedback loops?

### Step 4: Implement Incrementally

Don't redesign everything at once:
- Start with the highest-impact failure
- Make small, testable changes
- Measure outcomes
- Iterate

---

## Protocol Thinking and Software Building

When you see the world through protocol thinking:

1. **Problems become clearer** — You see not just symptoms but structural causes
2. **Solutions become tractable** — You can identify specific failure modes to address
3. **Software becomes obvious** — Many protocol problems have software solutions:
   - Making implicit protocols explicit (documentation, workflows)
   - Aligning incentives (gamification, transparent metrics)
   - Adding actors (automation, intermediaries)
   - Clarifying boundaries (access control, APIs)
   - Creating feedback loops (analytics, alerts)

**This is the bridge from "noticing friction" to "building solutions."**

---

## Summary

**Protocol thinking** means:

1. See systems as **actors with boundaries and incentives**
2. Understand **how actors interact** (the protocol)
3. Identify **where protocols break** (failure modes)
4. Design **interventions** that address root causes
5. Recognize that **many broken protocols can be fixed with software**

**Key insight**: The world is full of broken protocols. Your unique perspective helps you notice specific ones. Software gives you the leverage to fix them.

---

## Related

- [Friction to Opportunity](friction-to-opportunity.md) — Turning noticed problems into solutions
- [Flow-Based Development](flow-based-dev.md) — Applying protocol thinking to software design
- [Architecture-First Prompting](architecture-first.md) — Using protocol thinking with AI assistants

---

## Exercise: Protocol Analysis

Pick a system you interact with regularly (work process, service you use, recurring frustration):

1. **List the actors** — Who participates in this system?
2. **Map boundaries** — What can each actor do and not do?
3. **Identify incentives** — What does each actor want?
4. **Document interactions** — What messages/actions flow between actors?
5. **Find failures** — Where does it break down? What's implicit?
6. **Imagine solutions** — How might software help?

Write it down. Drawing diagrams helps.

This exercise builds the muscle of seeing protocols everywhere — the first step to fixing them.
