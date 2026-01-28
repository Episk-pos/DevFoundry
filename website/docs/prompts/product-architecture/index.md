---
sidebar_position: 8
title: "Product Architecture"
description: "Prompts for designing products from the minimal user loop"
---

# Product Architecture Prompts

**Design products backwards from how users experience value**

---

## Overview

These prompts help you apply the [Minimal User Loop](/docs/mental-models/minimal-user-loop) mental model to product design. Instead of starting with features and hoping users find value, you design backwards from the value users need.

The minimal user loop:

```
Intent → Action → System Response → Feedback → Value → Repeat
```

Use these prompts to:
- Discover your product's core loop
- Design onboarding that gets users to value fast
- Create UX that supports the loop
- Architect backends that close loops reliably
- Build infrastructure that matches loop requirements

---

## Prompts in This Pack

| Prompt | Use When |
|--------|----------|
| [Discovering Your Loop](/docs/prompts/product-architecture/discovering-loops) | Starting a new product or reassessing an existing one |
| [Onboarding from Loop](/docs/prompts/product-architecture/onboarding-from-loop) | Designing first-time user experience |
| [UX from Loop](/docs/prompts/product-architecture/ux-from-loop) | Making interface decisions |
| [Backend from Loop](/docs/prompts/product-architecture/backend-from-loop) | Designing APIs, data models, and services |
| [Infrastructure from Loop](/docs/prompts/product-architecture/infra-from-loop) | Making deployment and scaling decisions |

---

## Quick Start

If you're just starting, use the discovery prompt first:

```
I'm building [PRODUCT TYPE] for [USER TYPE].

Help me discover the minimal user loop:

1. What is the core value users seek?
2. What's the minimum action to receive that value?
3. What must the system do to deliver it?
4. How does the user know they got the value?
5. What triggers the next loop?

Don't think about features yet — just the core loop.
```

---

## Related

- [Minimal User Loop](/docs/mental-models/minimal-user-loop) — The mental model behind these prompts
- [Designing Features](/docs/prompts/designing-features) — Feature design after the loop is established
- [Architecture-First Prompting](/docs/prompts/architecture-first) — Implementation with context
