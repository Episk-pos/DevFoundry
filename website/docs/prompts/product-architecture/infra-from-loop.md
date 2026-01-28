---
sidebar_position: 5
title: "Infrastructure from Loop"
description: "Design deployment, monitoring, and automation from the minimal user loop"
---

# Designing Infrastructure from the Loop

**Infrastructure exists to keep the loop running reliably**

---

## Overview

Infrastructure decisions are easy to get wrong in both directions:
- **Over-engineering**: Kubernetes, microservices, multi-region before you have users
- **Under-engineering**: No monitoring, no backups, no deploy automation

The minimal user loop tells you what matters:
- **What must stay running?** The loop's critical path
- **What performance matters?** The loop's latency requirements
- **What failures hurt?** The loop's reliability requirements

This prompt template helps you make infrastructure decisions proportional to your actual needs.

---

## The Core Infrastructure Prompt

```
My minimal user loop:
**Action**: [WHAT USER DOES]
**Response**: [WHAT SYSTEM DOES]
**Value**: [WHAT USER GETS]

Loop requirements:
- Latency: [TARGET] ms (p95)
- Availability: [TARGET] % (how often loop must work)
- Users: [CURRENT] / [PROJECTED]

Design infrastructure to serve this loop:

1. **What must always be running?**
   - [COMPONENT]: [WHY]

2. **What can tolerate downtime?**
   - [COMPONENT]: [ACCEPTABLE DOWNTIME]

3. **What needs monitoring?**
   - [METRIC]: [THRESHOLD]

4. **What's the deployment story?**
   - How do changes get to production?
   - How fast can we roll back?

Start minimal. Add complexity when the loop demands it.
```

---

## Deployment Strategy from Loop

Use to decide how to deploy:

```
My loop's requirements:
- Uptime: [X]% (how critical is continuous availability?)
- Deploy frequency: [X] times per [PERIOD]
- Rollback need: [LIKELIHOOD]

Current scale:
- Traffic: [X] requests/day
- Data: [X] GB
- Team size: [X] people

Evaluate deployment options:

**Simple (single server)**:
- SSH + script, or simple CI push
- Pros: Simple, cheap, fast to set up
- Cons: Downtime during deploys, single point of failure
- Appropriate when: [CONDITIONS]

**Managed Platform (Heroku, Railway, Render, Fly.io)**:
- Git push deploy, managed scaling
- Pros: Zero-ops, automatic HTTPS, simple scaling
- Cons: Less control, can get expensive at scale
- Appropriate when: [CONDITIONS]

**Container Platform (Docker + VPS, ECS, Cloud Run)**:
- Containerized, more control
- Pros: Reproducible, portable, can scale
- Cons: More complexity, container management
- Appropriate when: [CONDITIONS]

**Kubernetes**:
- Full orchestration
- Pros: Industry standard, infinite scale, self-healing
- Cons: Massive complexity, operational overhead
- Appropriate when: [CONDITIONS]

For my specific loop and scale, what's the right choice?
What would trigger moving to the next level?
```

---

## Hosting Decisions

```
My loop involves:
- Frontend: [STATIC / SSR / BOTH]
- Backend: [API / FULL SERVER]
- Database: [TYPE]
- File storage: [NEEDS?]

For each component, decide:

**Frontend hosting**:
| Option | Cost | Complexity | Performance | When to use |
|--------|------|------------|-------------|-------------|
| Vercel/Netlify | $ | Low | Excellent | Static/JAMstack |
| CDN + origin | $$ | Medium | Excellent | High traffic |
| Self-hosted | $$$ | High | Variable | Full control needed |

**Backend hosting**:
| Option | Cost | Complexity | When to use |
|--------|------|------------|-------------|
| Serverless (Lambda, Cloud Functions) | Pay-per-use | Low | Bursty traffic |
| Managed containers (Cloud Run, App Service) | $ | Medium | Steady traffic |
| VPS (DigitalOcean, Linode) | $$ | Medium | Predictable, control |
| Full cloud (EC2, GCE) | $$$ | High | Scale, specific needs |

**Database hosting**:
| Option | Cost | Complexity | When to use |
|--------|------|------------|-------------|
| Managed (RDS, PlanetScale, Supabase) | $ | Low | Most cases |
| Self-managed | $$ | High | Specific requirements |

For my current needs and budget, what combination makes sense?
```

---

## Monitoring from Loop

Use to decide what to watch:

```
For my loop to work, these things must be true:
1. [CONDITION] -- e.g., "API responds in < 500ms"
2. [CONDITION] -- e.g., "Database is reachable"
3. [CONDITION] -- e.g., "External service X is available"

Design monitoring:

**Health checks** (is it up?):

    Endpoint: [URL]
    Frequency: [X] seconds
    Timeout: [X] seconds
    Alert if: [CONDITION]

**Performance metrics** (is it fast?):
- Response time (p50, p95, p99)
- Throughput (requests/second)
- Error rate (%)
Alert thresholds: [VALUES]

**Business metrics** (is the loop completing?):
- Loop completions per [PERIOD]
- Drop-off at each stage
- Value delivered
Alert thresholds: [VALUES]

**Resource metrics** (is it healthy?):
- CPU usage
- Memory usage
- Disk usage
- Connection pool usage
Alert thresholds: [VALUES]

What's the minimum viable monitoring to know if the loop is working?
What would I add after that?
```

---

## Alerting Strategy

```
My loop's criticality:
- Business hours only? [Y/N]
- Weekend coverage needed? [Y/N]
- Middle-of-night alerts acceptable? [Y/N]

Design alerting tiers:

**P1 - Page immediately** (loop is broken for everyone):
- Conditions: [WHAT]
- Response time: < [X] minutes
- Escalation: [TO WHOM]

**P2 - Alert during business hours** (loop degraded):
- Conditions: [WHAT]
- Response time: < [X] hours
- Escalation: [TO WHOM]

**P3 - Review next business day** (concerning but not broken):
- Conditions: [WHAT]
- Response time: [X] days
- Review process: [HOW]

**Noise reduction**:
- What alerts should be suppressed during deploys?
- What's the de-duplication strategy?
- How do we prevent alert fatigue?
```

---

## Logging Strategy

````
For debugging loop issues, I need to capture:

**Structured logs**:
```
{
  timestamp: ISO8601,
  level: info/warn/error,
  request_id: [trace through system],
  user_id: [if authenticated],
  action: [what happened],
  duration_ms: [how long],
  metadata: { [relevant context] }
}
```

**What to log at each level**:

INFO (normal operations):
- Loop completions
- Key milestones
- Performance measurements

WARN (concerning but not broken):
- Slow operations
- Retry attempts
- Graceful degradation

ERROR (something broke):
- Unhandled exceptions
- Failed loop completions
- External service failures

**Log retention**:
- Hot (searchable): [X] days
- Warm (archived): [X] months
- Cold (compliance): [X] years

**Log aggregation**:
- Tool: [CloudWatch, Datadog, etc.]
- Search needs: [WHAT QUERIES DO YOU RUN?]
````

---

## Backup & Recovery

```
My loop depends on this data:
- [DATA TYPE]: [SIZE] -- [CRITICALITY]
- [DATA TYPE]: [SIZE] -- [CRITICALITY]

Design backup strategy:

**Database backups**:
- Frequency: [HOURLY / DAILY / CONTINUOUS]
- Retention: [X] days
- Storage: [WHERE]
- Tested recovery: [WHEN DID YOU LAST TEST?]

**File/blob backups** (if applicable):
- Approach: [STRATEGY]
- Redundancy: [COPIES, LOCATIONS]

**Recovery objectives**:
- RPO (max data loss acceptable): [X] hours
- RTO (max downtime acceptable): [X] hours

**Disaster scenarios**:
- Database corruption: Recovery plan = [WHAT]
- Cloud region outage: Recovery plan = [WHAT]
- Accidental deletion: Recovery plan = [WHAT]

What's the minimum backup strategy that protects the loop?
What would trigger investing more in DR?
```

---

## CI/CD from Loop

Use to design your deployment pipeline:

```
My deploy requirements:
- Deploy frequency: [X] per [PERIOD]
- Downtime tolerance: [NONE / BRIEF / ACCEPTABLE]
- Rollback speed: [TARGET]

Design the pipeline:

**On push to main**:
1. [STEP]: [WHAT HAPPENS] -- [TIME]
2. [STEP]: [WHAT HAPPENS] -- [TIME]
...

**Deploy process**:
1. [STEP]: [WHAT HAPPENS]
2. [STEP]: [WHAT HAPPENS]
...

**Rollback process**:
1. [STEP]: [WHAT HAPPENS]
2. [STEP]: [WHAT HAPPENS]

**Safety checks**:
- [ ] Tests must pass
- [ ] Build must succeed
- [ ] [OTHER GATES]

**Post-deploy verification**:
- [ ] Health check passes
- [ ] Smoke test passes
- [ ] Metrics look normal

Start simple. Add stages as needed.
```

---

## Security Essentials

```
My loop handles:
- User data: [Y/N] -- Sensitivity: [LOW/MEDIUM/HIGH]
- Payments: [Y/N]
- PII: [Y/N]

Security checklist for infrastructure:

**Network security**:
- [ ] HTTPS everywhere
- [ ] Database not publicly accessible
- [ ] SSH keys only (no passwords)
- [ ] Firewall rules minimal

**Access control**:
- [ ] Principle of least privilege
- [ ] No shared credentials
- [ ] Secrets in vault/env, not code
- [ ] Audit log for admin actions

**Application security**:
- [ ] Dependencies updated
- [ ] Security headers set
- [ ] Rate limiting in place
- [ ] Input validation everywhere

**Incident response**:
- [ ] Know how to rotate compromised secrets
- [ ] Know how to revoke access
- [ ] Know who to contact for incidents

What's the minimum security posture for my loop?
What increases risk and triggers more investment?
```

---

## Environment Strategy

```
My deployment needs:
- Production (real users)
- [OTHER ENVIRONMENTS?]

Design environments:

**Production**:
- Purpose: Serve real users
- Data: Real user data
- Access: [WHO]

**Staging** (if needed):
- Purpose: [WHAT]
- Data: [REAL COPY / SYNTHETIC]
- Parity with prod: [HOW CLOSE]

**Development** (if needed):
- Purpose: [WHAT]
- Data: [WHAT]
- Differences from prod: [ACCEPTABLE?]

**Preview/Review** (if needed):
- Purpose: Per-PR deployments
- Automatic cleanup: [WHEN]

For my current needs:
- What environments are actually necessary?
- What's the cost of each?
- What parity matters?

Start with prod. Add others when pain justifies complexity.
```

---

## Cost Management

```
My current/expected usage:
- Compute: [SPEC]
- Database: [SIZE/CONNECTIONS]
- Storage: [GB]
- Bandwidth: [GB/MONTH]
- Users: [COUNT]

Cost analysis:

**Current/projected costs**:
| Component | Provider | Monthly Cost | Cost Driver |
|-----------|----------|--------------|-------------|
| | | | |

**Cost optimization opportunities**:
- [ ] Right-size instances
- [ ] Reserved capacity (if stable)
- [ ] Spot/preemptible (if tolerant)
- [ ] Caching to reduce compute
- [ ] CDN to reduce bandwidth

**Cost triggers to watch**:
- [METRIC] over [THRESHOLD] = investigate

**Budget alerts**:
- Warning at [X]% of budget
- Critical at [X]% of budget

What's my infrastructure budget relative to revenue/runway?
What would justify spending more?
```

---

## Infrastructure as Code

```
My infrastructure components:
1. [COMPONENT]
2. [COMPONENT]
...

Decide IaC approach:

**No IaC** (click-ops):
- Acceptable when: Small, stable, single person
- Risk: Hard to reproduce, no history

**Minimal IaC** (scripts + docs):
- Approach: Documented manual steps + automation scripts
- Acceptable when: Simple infra, low change frequency

**Full IaC** (Terraform, Pulumi, CloudFormation):
- Approach: All infrastructure defined in code
- When necessary: Multi-environment, team > 1, complex infra

For my current situation:
- What level of IaC is appropriate?
- What would trigger moving to more IaC?
- What's the minimum documentation needed?
```

---

## Pre-Launch Checklist

```
Before the loop goes to real users:

**Reliability**:
- [ ] Health checks configured
- [ ] Database backups working
- [ ] Tested recovery from backup
- [ ] Graceful handling of dependencies down

**Security**:
- [ ] HTTPS configured
- [ ] Secrets not in code
- [ ] Dependencies vulnerability scanned
- [ ] Access controls in place

**Observability**:
- [ ] Can see if loop is working
- [ ] Can see if loop is slow
- [ ] Errors are visible and alerted
- [ ] Can debug issues in production

**Operations**:
- [ ] Know how to deploy
- [ ] Know how to rollback
- [ ] Know how to scale up
- [ ] Know who to call if broken

**Documentation**:
- [ ] How to access systems
- [ ] How to deploy
- [ ] What to do when paged
- [ ] Architecture overview for new people

What's blocking launch?
What can be added after launch?
```

---

## Checklist: Infrastructure from Loop

- [ ] Deployment method chosen (matches scale)
- [ ] Hosting decisions made (matches needs)
- [ ] Monitoring exists (know if loop works)
- [ ] Alerting configured (know if loop breaks)
- [ ] Backups working (can recover data)
- [ ] CI/CD pipeline exists (can ship safely)
- [ ] Security basics covered (not negligent)
- [ ] Costs understood (within budget)

---

## Related Prompts

- [Backend from Loop](backend-from-loop) — Architecture that infra supports
- [Discovering Your Loop](discovering-loops) — Define requirements first
- [Architecture-First Prompting](../architecture-first) — Implementation decisions
