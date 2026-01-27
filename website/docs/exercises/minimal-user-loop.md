---
sidebar_position: 2
title: "Minimal User Loop Exercises"
description: "Practice applying the minimal user loop to different product types"
---

# Minimal User Loop Exercises

**Apply the mental model to SaaS, dev tools, and consumer apps**

---

These exercises help you internalize the [Minimal User Loop](../mental-models/minimal-user-loop) mental model by applying it to realistic product scenarios.

Each exercise builds on the previous. Start with "Identify" exercises, then move to "Design" and "Diagnose."

---

## Exercise Set 1: SaaS Application

### Scenario: Invoice Management Tool

You're building a SaaS tool for freelancers to create and send invoices to clients.

---

<details>
<summary>Exercise 1.1: Identify the Loop</summary>

**Task**: Define the minimal user loop for this invoice tool.

For each step, be specific:
- **Intent**: What does the freelancer actually want? (Hint: It's not "create an invoice")
- **Action**: What's the minimum they must do?
- **Response**: What must the system do?
- **Feedback**: How do they know it worked?
- **Value**: What did they get?
- **Repeat**: Why would they return?

**Reflection questions**:
1. Is "create invoice" the value, or is it a means to something else?
2. When does the freelancer feel "done"?
3. What would make them switch from a spreadsheet to this tool?

---

**Solution**:

**Intent**: "I want to get paid for work I did" (not "create an invoice")

**Action**: Enter amount + client → Send

**Response**: Invoice created, formatted professionally, delivered to client

**Feedback**:
- Immediate: Invoice preview shown, "Sent" confirmation
- Deferred: Notification when client views, when paid

**Value**: Professional invoice sent without effort; closer to getting paid

**Repeat**: Every time they complete client work (could be daily, weekly, monthly)

**Key insight**: The real value is "getting paid" not "having an invoice." This means the loop extends to payment confirmation. Features like payment links, reminders, and "client viewed" notifications directly serve the loop. Features like "invoice templates" are secondary.

</details>

---

<details>
<summary>Exercise 1.2: Design Onboarding</summary>

**Task**: Design the onboarding flow to get freelancers to their first sent invoice as fast as possible.

Consider:
1. What information is truly required before sending the first invoice?
2. What can be asked later?
3. What can be defaulted?
4. What's your target time-to-first-invoice?

---

**Solution**:

**Minimum required for first invoice**:
- Freelancer's email (for account)
- Client's email (to send to)
- Amount
- Description (one line)

**Can default**:
- Invoice number (auto-generate)
- Date (today)
- Due date (30 days default)
- Currency (based on locale)
- Payment terms (standard text)

**Can ask after first invoice**:
- Business name and logo (personalization)
- Bank/payment details (when client wants to pay)
- Tax information (when needed for compliance)
- Full address (for formal invoices)

**Onboarding flow**:
1. Landing → "Send your first invoice in 60 seconds" → Email signup
2. Skip email verification initially (verify before payout)
3. Single form: Client email, amount, what it's for
4. Preview → Send
5. Success: "Invoice sent! Add your business details for next time?"

**Target**: First invoice sent in under 2 minutes from landing.

**Key insight**: The freelancer doesn't need a complete profile to send an invoice. They need a complete profile to get paid. Sequence accordingly.

</details>

---

<details>
<summary>Exercise 1.3: Diagnose the Failure</summary>

**Scenario**: Users sign up but only 15% send their first invoice. Of those, only 30% send a second.

**Task**: Using loop analysis, diagnose what's broken and propose fixes.

---

**Solution**:

**First drop-off (signup → first invoice): 85% loss**

Likely loop failures:
1. **Action friction**: Too many required fields before value
2. **Empty state confusion**: "What do I do now?" after signup
3. **Value skepticism**: "Is this actually better than my spreadsheet?"
4. **Premature asks**: Demanding payment setup before demonstrating value

Diagnostic questions:
- Where do users drop off? (signup form? empty dashboard? invoice creation?)
- What's the time from signup to first action attempt?
- Are there error states they're hitting?

Fixes:
- Reduce signup to email only
- Auto-open invoice creation after signup
- Pre-fill with sample data to show what's possible
- "Send a test invoice to yourself" option

**Second drop-off (first invoice → second): 70% loss**

Likely loop failures:
1. **Repeat trigger missing**: No prompt when new work is done
2. **Value not demonstrated**: Invoice sent but no follow-up on whether it worked
3. **Friction remembered**: First invoice was painful enough to avoid again
4. **Job done**: They only had one invoice to send

Diagnostic questions:
- How long between first and second invoice attempts?
- Did they receive payment notification on first invoice?
- Are they tracking invoices elsewhere instead?

Fixes:
- "Client viewed your invoice" notification (value confirmation)
- "Payment received" celebration
- "Upcoming work? Send invoice" reminder
- Dashboard showing invoice status (not just creation)

</details>

---

## Exercise Set 2: Developer Tool

### Scenario: Database Migration CLI

You're building a CLI tool for developers to manage database schema migrations.

---

<details>
<summary>Exercise 2.1: Identify the Loop</summary>

**Task**: Define the minimal user loop for this migration tool.

Consider:
- When does a developer reach for this tool?
- What state are they in? (flow state, debugging, planning?)
- What does "success" feel like?
- What would make them install this over alternatives?

---

**Solution**:

**Intent**: "I changed my code's data needs. I need to update the database schema without breaking production."

**Action**:
1. `migrate create add-user-email` (generate migration file)
2. Edit migration (add SQL/code)
3. `migrate up` (apply to database)

**Response**: Schema updated, migration recorded

**Feedback**:
- Immediate: "Migration applied successfully. 1 migration run in 0.3s"
- Verification: Can query new column, app works

**Value**: Database matches code expectations; can continue development

**Repeat**: Every time data model changes (several times per feature, daily/weekly)

**Key insight**: The developer's real loop is "make a code change work." The migration tool is one step in that loop. This means:
- Speed matters (don't break flow state)
- Errors must be clear (fast debugging)
- Reversibility matters (`migrate down` is part of the loop)

</details>

---

<details>
<summary>Exercise 2.2: Design Onboarding</summary>

**Task**: Design the onboarding experience for this CLI tool.

Consider:
- Installation friction
- First migration experience
- Integration with existing workflow
- README structure

---

**Solution**:

**Installation (30 seconds)**:
```
# npm (most common)
npm install -g @yourname/migrate

# or npx for zero-install
npx @yourname/migrate --version
```

**First use (2 minutes)**:
```
# Initialize in project
migrate init

# Creates: migrations/ directory + migrate.config.js

# Config auto-detects:
# - DATABASE_URL from env
# - Common frameworks (Rails, Django, etc.)
```

**First migration (2 minutes)**:
```
migrate create add-users-table
# Creates: migrations/20240115120000_add_users_table.js

# File contains:
exports.up = async (db) => {
  // Add your migration here
};

exports.down = async (db) => {
  // Reverse the migration here
};
```

**README structure**:
```
# migrate

Database migrations that don't break your flow.

## Quick Start (60 seconds)
npm install -g @yourname/migrate
migrate init
migrate create my-first-migration
migrate up

## Why migrate?
- Zero-config for common setups
- Fast (written in Rust/Go)
- Reversible by default
- Works with: Postgres, MySQL, SQLite

## Commands
[Table of commands with one-line descriptions]

## Configuration
[Only when defaults don't work]
```

**Key insight**: Developer tools compete with "doing it manually" or "existing tool that's good enough." First experience must prove value immediately.

</details>

---

<details>
<summary>Exercise 2.3: Design Error Handling</summary>

**Task**: Design error messages for common failure modes.

For each error:
1. What happened?
2. Why does the developer care?
3. What should they do?

Common failures:
- Database connection failed
- Migration has syntax error
- Migration partially applied
- Conflicting migration names

---

**Solution**:

**Database connection failed**:
```
Error: Cannot connect to database

Connection string: postgres://localhost:5432/myapp
Error: ECONNREFUSED 127.0.0.1:5432

Possible causes:
  • Database server not running
  • Wrong port or host
  • Credentials incorrect

Check:
  1. Is PostgreSQL running? `pg_isready`
  2. Can you connect directly? `psql $DATABASE_URL`
  3. Is DATABASE_URL set correctly?
```

**Migration syntax error**:
```
Error: Migration 20240115_add_users.js failed to parse

  12 |   await db.query(`
  13 |     CREATE TABLE users
> 14 |       id SERIAL PRIMARY KEY
     |       ^ Expected '(' after 'users'
  15 |     );
  16 |   `);

Fix the SQL syntax and run `migrate up` again.
No changes were made to the database.
```

**Migration partially applied**:
```
Error: Migration 20240115_add_users partially applied

Applied successfully:
  ✓ CREATE TABLE users

Failed at:
  ✗ CREATE INDEX users_email_idx
    Error: column "email" does not exist

The migration is in an inconsistent state.
Database changes were NOT automatically rolled back.

To fix:
  1. Fix the migration file
  2. Manually undo applied changes: DROP TABLE users;
  3. Run `migrate up` again

To mark as rolled back (if you fixed manually):
  migrate mark-unapplied 20240115_add_users
```

**Conflicting migration names**:
```
Warning: Multiple migrations with same timestamp

  20240115120000_add_users.js
  20240115120000_add_posts.js

This can cause ordering issues in team environments.

Fix: Rename one migration with a different timestamp
  migrate rename 20240115120000_add_posts 20240115120001_add_posts
```

**Key insight**: Developer tool errors should be:
1. Specific (what exactly broke)
2. Contextual (show the code/config involved)
3. Actionable (what to do next)
4. Safe (confirm what state things are in)

</details>

---

## Exercise Set 3: Consumer App

### Scenario: Habit Tracking App

You're building a mobile app for people to build and maintain daily habits.

---

<details>
<summary>Exercise 3.1: Identify the Loop</summary>

**Task**: Define the minimal user loop for this habit tracker.

Consider:
- What emotional need does habit tracking serve?
- When do they open the app? What triggers it?
- What's the "aha moment"?
- What makes habit apps sticky vs abandoned?

---

**Solution**:

**Intent**: "I want to become the kind of person who [does X consistently]" (identity, not just action)

**Action**: Open app → Mark habit complete → (Optional: see streak/progress)

**Response**: Habit recorded, streak updated, progress visualized

**Feedback**:
- Immediate: Satisfying completion animation
- Cumulative: Streak count, calendar view, statistics
- Social: (if applicable) friends see progress

**Value**:
- Immediate: Feeling of accomplishment
- Cumulative: Visual proof of consistency ("I've done this 30 days in a row")
- Long-term: Actual behavior change

**Repeat**:
- Triggered by habit cue (time of day, location, prior action)
- Reinforced by streak motivation ("don't break the chain")

**Key insight**: The loop isn't "record a habit" — it's "feel like someone who keeps commitments." The app is serving an emotional need, not a data need. This means:
- Celebration matters more than data
- Streaks are motivational infrastructure
- Missing a day is emotionally significant (handle carefully)

</details>

---

<details>
<summary>Exercise 3.2: Design the Zero State</summary>

**Task**: Design what new users see when they first open the app.

The cold-start problem: A habit tracker with no habits and no history is useless.

Consider:
- What's the first thing they should do?
- How do you make adding a habit feel like progress?
- How do you handle day 1 vs day 30 differently?

---

**Solution**:

**First open (no habits)**:

Not this:
```
Your Habits
[Empty list]
[+ Add Habit button]
```

Instead:
```
Let's build your first habit.

What's one small thing you want to do daily?

[Exercise]  [Read]  [Meditate]  [Water]  [Custom]

(Pick one to start. You can add more later.)
```

**After selecting a habit**:
```
[Drink Water icon]

Drink more water
Every day • Any time

[Mark complete for today]

"Day 1 starts now."
```

**After first completion**:
```
[Celebration animation]

Day 1 ✓

You've started! Come back tomorrow to build your streak.

[Turn on reminders?]  [Add another habit]  [Done]
```

**Day 2-7 (building streak)**:
```
[Water icon] 🔥 2 day streak

[Mark complete]

"Consistency beats intensity."
```

**Day 30+ (established)**:
```
[Water icon] 🔥 30 days

[Mark complete]

You've built a habit! Average completion: 95%
[See your journey]
```

**Key insight**: The value in a habit app compounds over time. The zero-state design must create immediate small wins while building toward cumulative value. The "streak" mechanic is the bridge between immediate and long-term value.

</details>

---

<details>
<summary>Exercise 3.3: Diagnose the Failure</summary>

**Scenario**: Your habit app has good download numbers but:
- 50% of users never complete a habit
- Of those who do, 80% stop using the app within 2 weeks
- Of the remaining 20%, most only have 1-2 habits

**Task**: Using loop analysis, diagnose what's broken and propose fixes.

---

**Solution**:

**First drop-off (download → first completion): 50% never complete**

Likely loop failures:
1. **Onboarding friction**: Too many questions before first action
2. **Choice paralysis**: "What habit should I track?" overwhelming
3. **No immediate value**: First screen shows empty state
4. **Delayed gratification**: Value requires commitment they haven't made

Diagnostic questions:
- What do they see first?
- How many steps to first completion?
- Are they adding habits but not completing?

Fixes:
- Pre-selected popular habits (one tap to start)
- "Complete your first habit now" (not "come back tomorrow")
- Immediate reward for first completion
- Skip account creation until after first value

**Second drop-off (first week → second week): 80% abandon**

Likely loop failures:
1. **Repeat trigger missing**: No reminder, no prompt
2. **Streak broken early**: Missed day 3, felt like failure
3. **Value not visible**: Can't see progress accumulating
4. **Guilt loop**: App reminds them of failure, not success

Diagnostic questions:
- Are reminders enabled?
- When do they stop — after a miss or gradually?
- What do they see when they open after missing?

Fixes:
- Smart reminders (not annoying, well-timed)
- "Streak freeze" for occasional misses
- Focus on completion rate, not perfect streaks
- "Welcome back" not "you missed 5 days"
- Celebrate the attempt, not just perfection

**Third issue (few habits per user)**:

This might not be a problem! Consider:
- 1-2 habits might be the right number for behavior change
- Adding too many habits leads to failure
- Power users aren't the goal — sustained habit formation is

If it IS a problem:
- Prompt to add second habit after first one is established (7+ days)
- "Habit stacking" suggestion (new habit after existing one)
- Don't suggest more until they've succeeded with current

**Key insight**: Consumer apps serving emotional needs require careful handling of failure states. The user didn't just "not log data" — they failed to become who they wanted to be. The app's response to missed habits determines retention.

</details>

---

## Synthesis Exercise

<details>
<summary>Exercise 4: Compare Loops Across Product Types</summary>

**Task**: You've now analyzed loops for SaaS, dev tools, and consumer apps.

Compare them across these dimensions:

| Dimension | SaaS (Invoice) | Dev Tool (Migrate) | Consumer (Habits) |
|-----------|---------------|-------------------|-------------------|
| Primary value type | | | |
| Loop frequency | | | |
| Trigger type | | | |
| Failure tolerance | | | |
| Onboarding priority | | | |

**Questions**:
1. Which product type has the tightest loop (fastest to value)?
2. Which has the most emotional component to value?
3. Which is most tolerant of errors/friction?
4. How would you approach building each one differently?

---

**Solution**:

| Dimension | SaaS (Invoice) | Dev Tool (Migrate) | Consumer (Habits) |
|-----------|---------------|-------------------|-------------------|
| Primary value | Economic (get paid) | Productivity (stay in flow) | Emotional (feel accomplished) |
| Loop frequency | Event-driven (per client job) | High-frequency (per code change) | Daily ritual |
| Trigger type | External (finished work) | Internal (code change needs it) | Time-based + reminder |
| Failure tolerance | Medium (can retry, client still waiting) | Low (breaks dev flow, blocks progress) | Very low (breaks motivation) |
| Onboarding priority | Show value before asking for details | Zero-config, instant first use | Immediate win, no friction |

**Insights**:

1. **Dev tools have the tightest loop** — developers want sub-second response, minimal keystrokes, stay in flow. But they're also most tolerant of text-based, technical interfaces.

2. **Consumer apps have most emotional value** — the "product" is a feeling (accomplishment, identity). This means UX details like animations, copy, and failure handling matter enormously.

3. **SaaS has most tolerance for friction** — if the value proposition is clear and economic benefit obvious, users will tolerate more steps. But they won't tolerate confusion about whether it works.

4. **Building approach differences**:
   - **Dev tools**: Optimize for speed and clarity. Errors can be technical. Focus on the 80% case.
   - **Consumer apps**: Optimize for emotion and habit. Every detail of feedback loop matters. Handle failure states carefully.
   - **SaaS**: Optimize for trust and clarity. Show the value proposition. Reduce friction but don't sacrifice reliability.

</details>

---

## Next Steps

After completing these exercises:

1. **Apply to your own product**: Use the prompts in [Product Architecture](../prompts/product-architecture/) to analyze your specific loop

2. **Read the mental model**: [The Minimal User Loop](../mental-models/minimal-user-loop) provides the full framework

3. **Practice pattern recognition**: Start noticing loops in every product you use — where do they succeed or fail?
