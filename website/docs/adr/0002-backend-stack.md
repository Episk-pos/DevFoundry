---
sidebar_position: 4
title: "ADR 0002: Backend Stack"
description: "Use Node.js, Express, and SQLite for Backend Examples"
---

# 0002. Use Node.js, Express, and SQLite for Backend Examples

**Date**: 2025-11-18

## Status

Accepted

## Context

The devfoundry curriculum requires a backend stack for teaching fullstack development (Stage 4 of the lemonade stand progression).

**Requirements**:
- Must be accessible to JavaScript-proficient learners (minimize language switching)
- Must demonstrate core backend concepts (HTTP, APIs, persistence) clearly
- Must be simple to set up locally (no complex infrastructure requirements)
- Must have strong AI assistant support
- Must be practical for small-to-medium projects (realistic for final projects)
- Must teach transferable backend patterns

**Target audience considerations**:
- Learners are already using JavaScript for frontend (React)
- Total beginners benefit from language consistency
- Goal is understanding backend *concepts*, not mastering a specific backend language

**Runtime alternatives**:

| Option | Pros | Cons |
|--------|------|------|
| **Node.js** | JavaScript (same as frontend), vast ecosystem, AI-friendly | Single-threaded model can be confusing, callback hell risks |
| **Python (Flask/FastAPI)** | Beginner-friendly syntax, excellent for APIs | Introduces new language, less AI training data for web |
| **Go** | Fast, great concurrency, growing popularity | Compiled language, steeper learning curve, verbose for small examples |
| **Ruby (Rails)** | Convention over configuration, rapid development | Declining adoption, less relevant for job market |

**Framework alternatives** (assuming Node.js):

| Option | Pros | Cons |
|--------|------|------|
| **Express** | Minimalist, unopinionated, industry standard | More boilerplate, manual configuration |
| **Fastify** | Faster, modern, better TypeScript support | Smaller community, less AI training data |
| **NestJS** | Enterprise-grade, Angular-like | Over-engineered for simple examples, steep learning curve |
| **Hono** | Modern, edge-ready, lightweight | Very new, limited ecosystem |

**Database alternatives**:

| Option | Pros | Cons |
|--------|------|------|
| **SQLite** | Zero config, portable, file-based | Not production-scalable, no concurrency handling |
| **PostgreSQL** | Production-grade, feature-rich, free | Requires separate server, complex setup for beginners |
| **MySQL** | Popular, well-documented | Requires separate server, similar complexity to PostgreSQL |
| **MongoDB** | NoSQL, flexible schema | Doesn't teach SQL, less structured |

## Decision

Use **Node.js** runtime with **Express** framework and **SQLite** database for all fullstack examples.

**Specific implementation**:
- Node.js 18+ (LTS version for stability)
- Express 4.x (stable, well-documented)
- SQLite via `better-sqlite3` package (synchronous API, simpler for beginners)
- RESTful API design (standard HTTP methods)
- JSON for request/response format
- TypeScript for type safety (gradual adoption from Stage 4+)

**Project structure convention**:
```
server/
  db/
    lemonade.db          # SQLite database file
    schema.sql           # Database schema definition
  routes/
    orders.js            # Order-related endpoints
  middleware/
    errorHandler.js      # Error handling
  server.js              # Main server file
```

**Database choice rationale**:
- SQLite for Stages 4-5 (learning)
- Document migration path to PostgreSQL for production (in ADR or guide)
- Teach SQL concepts that transfer to any relational database

**API design pattern**:
```
GET    /api/orders           # List all orders
POST   /api/orders           # Create new order
GET    /api/orders/:id       # Get specific order
PUT    /api/orders/:id       # Update order
DELETE /api/orders/:id       # Delete order
```

## Consequences

**Positive**:
- **Language consistency**: Same JavaScript knowledge applies frontend and backend
- **Reduced cognitive load**: No context switching between languages
- **AI assistant support**: Excellent — Node + Express is extremely well-represented in training data
- **Ecosystem**: npm provides access to millions of packages
- **Industry relevance**: Node.js + Express is widely used in startups and mid-size companies
- **Setup simplicity**: SQLite requires zero configuration, no separate database server
- **Portability**: Entire project (code + data) is file-based, easy to share and deploy
- **SQL learning**: Demonstrates relational database concepts with standard SQL
- **Async patterns**: Teaches promises and async/await in backend context

**Negative**:
- **Single-threaded**: Node's event loop can be confusing for beginners
- **SQLite limitations**: Not suitable for high-concurrency production apps
- **Express verbosity**: More boilerplate than some modern frameworks (Fastify, Hono)
- **Callback pitfalls**: Easy to write nested callback code (mitigated by async/await)
- **Limited to I/O**: Not ideal for CPU-intensive tasks (not relevant for this curriculum)

**Neutral**:
- **Not "best" for production**: Python/Go might be better for some use cases
- **Ecosystem churn**: JavaScript tooling changes rapidly (but core concepts stable)

**Mitigation strategies**:
- **Clear documentation**: Explain event loop and async patterns with diagrams
- **Async/await from start**: Use modern async patterns, avoid callback hell
- **SQLite caveats**: Explicitly teach when to graduate to PostgreSQL/MySQL
  - Add a guide: "From SQLite to PostgreSQL" (ADR-0007 or separate doc)
- **RESTful patterns**: Teach standard REST so concepts transfer to any backend
- **Error handling**: Introduce middleware pattern early to handle errors gracefully
- **Type safety**: Use TypeScript to catch common backend errors (undefined properties, wrong types)

**Production deployment considerations**:
- For Stage 5 (deployment), document:
  - When SQLite is acceptable (low-traffic apps, prototypes)
  - How to migrate to PostgreSQL (connection string, minimal code changes)
  - Deployment platforms: Render, Railway, Fly.io (support Node + Postgres)

**Advanced curriculum extensions** (future):
- Module on database migrations (PostgreSQL)
- Module on authentication (JWT, sessions, OAuth)
- Module on scaling (load balancing, caching, workers)

## Related Decisions

- [ADR-0001: Frontend Stack](0001-frontend-stack) — Node aligns with JavaScript ecosystem
- [ADR-0004: Database Choice for Learning](0004-database-choice) — (future) Deep dive on SQLite vs others
- [ADR-0005: Deployment Platform](0005-deployment-platform) — (future) Where to host Node + SQLite
