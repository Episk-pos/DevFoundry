# 0001. Use React, Vite, and TypeScript for Frontend Examples

**Date**: 2025-11-18

## Status

Accepted

## Context

The devfoundry curriculum requires a frontend stack for teaching modern web development, particularly for the SPA and fullstack stages of the chat app progression.

**Requirements**:
- Must be widely used in industry (relevant for learners entering the job market)
- Must have strong support from AI assistants (abundant training data)
- Must support progressive complexity (simple to start, sophisticated when needed)
- Must teach transferable concepts (patterns applicable to other frameworks)
- Must have excellent documentation and learning resources
- Must work well with modern tooling and development workflows

**Target audience considerations**:
- Total beginners need approachable syntax
- Experienced developers need patterns that scale
- Non-developers (PMs, designers) need recognizable industry standard

**Alternatives considered**:

| Option | Pros | Cons |
|--------|------|------|
| **Vue** | Simpler template syntax, gentler learning curve | Less AI training data, smaller job market |
| **Svelte** | Minimal boilerplate, elegant reactivity | Smaller ecosystem, less industry adoption |
| **Angular** | Enterprise-grade, comprehensive | Heavy for beginners, steep learning curve |
| **Plain JavaScript** | No abstraction, full control | Doesn't teach component patterns, harder to scale |

**Build tool alternatives**:

| Option | Pros | Cons |
|--------|------|------|
| **Vite** | Fast, modern, simple config | Newer (less legacy code examples) |
| **Create React App** | Historical standard | Deprecated, slow, complex webpack config |
| **Webpack** | Powerful, configurable | Configuration complexity overwhelming for beginners |

**Language alternatives**:

| Option | Pros | Cons |
|--------|------|------|
| **TypeScript** | Type safety, better IDE support, growing standard | Additional learning curve for beginners |
| **JavaScript** | Simpler to start, no compilation | Lack of type safety leads to runtime errors |

## Decision

Use **React with functional components and hooks** for all SPA examples, built with **Vite**, using **TypeScript**.

**Specific implementation**:
- React 18+ (concurrent features, modern APIs)
- Functional components only (no class components)
- Hooks for state and effects
- Vite as build tool (fast HMR, simple configuration)
- TypeScript with gradual adoption:
  - Stage 3 (SPA): Start with `.jsx` files, introduce TypeScript concepts
  - Stage 4+ (Fullstack): Use `.tsx` files with type annotations
- React Router for client-side routing
- No state management library initially (useState/useContext)
  - State libraries can be introduced in stretch goals

**File structure convention**:
```
src/
  components/
    ComponentName.tsx    # React components
  utils/
    utilName.ts          # Pure functions, helpers
  App.tsx                # Main component
  main.tsx               # Entry point
```

## Consequences

**Positive**:
- **Industry relevance**: React is the most used frontend framework (as of 2025)
- **AI assistant support**: Excellent — React has massive training data from docs, tutorials, Stack Overflow
- **Job market alignment**: React skills are highly transferable and in-demand
- **Ecosystem**: Rich library ecosystem for extending examples (routing, forms, state management)
- **Learning resources**: Abundant beginner tutorials, documentation, community support
- **Component model**: Teaches reusable, modular thinking applicable to other frameworks
- **Hooks**: Modern pattern that's more intuitive than class components
- **Vite speed**: Fast development experience encourages experimentation
- **TypeScript safety**: Catches errors early, improves code comprehension

**Negative**:
- **React complexity**: JSX syntax, virtual DOM, hooks rules are additional concepts to learn
- **TypeScript learning curve**: Type annotations add cognitive load for total beginners
- **Abstraction overhead**: More complex than plain JavaScript for simple examples
- **Opinionated**: Students learn "React way" which may not transfer 1:1 to other frameworks
- **Churn**: React ecosystem changes frequently (though core concepts are stable)

**Neutral**:
- **Not the "easiest" choice**: Vue or Svelte might be gentler for absolute beginners
- **TypeScript is optional**: Can be gradually adopted, not required for all examples

**Mitigation strategies**:
- **Progressive introduction**:
  - Stage 2 (static web) uses plain JavaScript (no React)
  - Stage 3 (SPA) introduces React gradually (start with simple components)
  - TypeScript introduced after React fundamentals are solid
- **Clear explanations**: Every React concept (JSX, state, effects) explained with diagrams
- **Mental models**: Teach "component as function" and "UI as state output" before diving into code
- **Comparison to plain JS**: Show what React does "under the hood" so it's not magic
- **Transferable patterns**: Emphasize concepts that apply beyond React (component thinking, unidirectional data flow)

**Future considerations**:
- If Vue or Svelte become dominant, create parallel examples (low cost due to component model similarity)
- If React releases breaking changes, update ADR with migration strategy
- Advanced curriculum modules could include "Framework Comparison" using same chat app in Vue/Svelte

## Related Decisions

- [ADR-0002: Backend Stack](0002-backend-stack.md) — Matches frontend with Node ecosystem
- [ADR-0003: Diagram Conventions](0003-diagram-conventions.md) — How we visualize React component trees
