---
sidebar_position: 1
title: Evaluating AI Development Tools
description: Understanding the spectrum from conversational AI to local agents
---

# Evaluating AI Development Tools

**Understanding the spectrum from conversational AI to local agents**

---

## Introduction

Not all AI tools are created equal — and the differences matter more than most developers realize.

Before you start working with AI-assisted development, you need to understand **what kind of tool you're using**. The distinction isn't just about features. It's about:

- **What the tool can access** (your files, your terminal, your secrets)
- **Where code executes** (your machine, a cloud sandbox, nowhere)
- **What level of trust is required** (and what could go wrong)
- **What workflows become possible** (or impossible)

This mental model gives you a framework for evaluating any AI development tool — current or future — so you can make informed choices about what to use and when.

---

## The Three-Tier Model

AI development tools fall into three broad categories based on their **execution capabilities**:

```
┌─────────────────────────────────────────────────────────────────────────┐
│  TIER 3: LOCAL AGENTS                                                   │
│  Execute on your machine • Full filesystem access • Real consequences   │
├─────────────────────────────────────────────────────────────────────────┤
│  TIER 2: REMOTE SANDBOX                                                 │
│  Execute in cloud environment • Isolated workspace • Safe exploration   │
├─────────────────────────────────────────────────────────────────────────┤
│  TIER 1: CONVERSATIONAL                                                 │
│  No execution • Text in/text out • You implement everything             │
└─────────────────────────────────────────────────────────────────────────┘
```

Each tier has different strengths, risks, and appropriate use cases. Understanding where a tool fits helps you use it effectively.

---

## Tier 1: Conversational AI

### What It Is

Conversational AI tools provide text-based interaction without any code execution. You ask questions, describe problems, request code — and the AI responds with text. **You** are responsible for implementing everything.

### Examples

- ChatGPT (web interface, without Code Interpreter)
- Claude.ai (web interface, standard mode)
- Gemini (conversational mode)
- Any chat-based AI without tool use enabled

### Capabilities

| Can Do | Cannot Do |
|--------|-----------|
| Explain concepts | Run code |
| Generate code snippets | Access your files |
| Debug by reading code you paste | See your project structure |
| Suggest architecture | Execute commands |
| Answer questions | Make changes |

### Mental Model

Think of Tier 1 tools as **extremely knowledgeable colleagues** who can only communicate through text. They can advise, explain, and suggest — but they can't touch your keyboard.

```
You: "How do I fix this error?"
AI:  "Try changing line 42 to use async/await. Here's the code..."
You: *manually makes the change*
You: *runs the code*
You: *sees new error*
You: "Now I get a different error..."
```

### When to Use Tier 1

- **Learning concepts** — Understanding how something works
- **Quick questions** — "What's the syntax for X?"
- **Code review** — "What's wrong with this approach?"
- **Brainstorming** — "What are my options for solving Y?"
- **Sensitive environments** — When you can't grant any external access

### Limitations

- **High friction loop** — Every change requires manual copy/paste/edit/run
- **Context loss** — The AI can't see the actual state of your project
- **Error accumulation** — Small misunderstandings compound without verification
- **Slow iteration** — Back-and-forth takes time

### Trust Requirements

**Minimal.** The AI never touches your system. The worst case is bad advice that you choose to follow.

---

## Tier 2: Remote Sandbox AI

### What It Is

Remote sandbox tools can execute code — but in an **isolated cloud environment**, not on your local machine. They can run programs, install packages, create files, and show you results — all in a temporary workspace that's separate from your actual projects.

### Examples

- Claude.ai with Analysis tool (runs Python in sandbox)
- ChatGPT with Code Interpreter
- Google AI Studio with code execution
- GitHub Copilot Workspace (cloud environment)
- Replit Ghostwriter (in Replit's environment)
- Some configurations of Claude Code (web version with cloud sandbox)

### Capabilities

| Can Do | Cannot Do |
|--------|-----------|
| Run code and show output | Access your local files |
| Install packages in sandbox | Run commands on your machine |
| Create and modify sandbox files | See your actual project |
| Generate visualizations | Deploy to your infrastructure |
| Test algorithms | Interact with your databases |
| Prototype solutions | Commit to your repository |

### Mental Model

Think of Tier 2 tools as **having their own computer** that they can use to demonstrate and verify things — but they're working from a blank slate, not your actual codebase.

```
You: "Write a script to process this CSV data"
AI:  *creates script*
AI:  *runs script in sandbox*
AI:  "Here's the output. The processed data looks like this..."
You: *downloads script to use locally*
```

### When to Use Tier 2

- **Prototyping** — Test ideas before committing to implementation
- **Data exploration** — Analyze files you upload without local setup
- **Learning by doing** — Watch code execute and see results
- **Algorithm verification** — Confirm logic works before integrating
- **Unfamiliar territory** — Explore libraries/tools safely before local install
- **Sharing context** — Upload files for AI to analyze directly

### Limitations

- **Disconnected from real project** — Sandbox doesn't mirror your environment
- **Transfer required** — Solutions must be manually brought to your codebase
- **Environment differences** — Sandbox may not match your production setup
- **Ephemeral state** — Sandbox resets; work can be lost

### Trust Requirements

**Moderate.** You're uploading data and potentially sensitive files to a cloud service. The sandbox is isolated from your machine, but you're trusting the provider with whatever you share.

**Consider**:
- What data are you uploading?
- Are there secrets in those files?
- What are the provider's data retention policies?

---

## Tier 3: Local Agent AI

### What It Is

Local agent tools have **direct access to your development environment**. They can read your files, run commands in your terminal, modify your code, interact with your tools, and make real changes — on your actual machine.

### Examples

- Claude Code (CLI version)
- Cursor (with full workspace access)
- GitHub Copilot (with workspace features)
- Windsurf
- Aider
- Continue (with shell access)
- Any AI tool with MCP filesystem/terminal integrations

### Capabilities

| Can Do | Cannot Do |
|--------|-----------|
| Read your actual project files | Access things outside granted scope |
| Run real commands (git, npm, etc.) | Override permission boundaries |
| Modify your actual code | Do things you don't allow |
| See real errors in context | Guarantee perfect output |
| Commit changes | (Varies by tool configuration) |
| Install dependencies | |

### Mental Model

Think of Tier 3 tools as **pair programmers sitting at your keyboard**. They can do everything you can do — within the boundaries you set. They're not just advising; they're acting.

```
You: "Fix the TypeScript errors in src/"
AI:  *reads the actual files*
AI:  *identifies the errors*
AI:  *edits the files directly*
AI:  *runs the build to verify*
AI:  "Fixed 3 type errors. Build passes now."
```

### When to Use Tier 3

- **Active development** — Building features, fixing bugs, refactoring
- **Complex changes** — Multi-file modifications that benefit from automation
- **Iteration-heavy work** — When you need rapid feedback loops
- **Learning codebases** — AI can explore and explain your actual code
- **Routine tasks** — Repetitive changes, migrations, formatting

### Limitations

- **Real consequences** — Mistakes affect your actual files
- **Trust required** — You're granting significant access
- **Oversight needed** — Review what the AI is doing
- **Environment coupling** — Tool needs to be configured for your setup

### Trust Requirements

**High.** The AI has real power over your development environment.

**Before using Tier 3 tools**:
- Understand what permissions you're granting
- Use version control so you can revert
- Review changes before committing
- Be careful with credentials and secrets
- Understand the tool's sandboxing/safety features

---

## Choosing the Right Tier

### The Decision Framework

```
┌─────────────────────────────────────────────────────────────────────┐
│ What do you need?                                                   │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  "I need to understand something"                                   │
│   └─→ Tier 1 (Conversational) is sufficient                        │
│                                                                     │
│  "I need to test/prototype something in isolation"                  │
│   └─→ Tier 2 (Remote Sandbox) is ideal                             │
│                                                                     │
│  "I need to build/modify my actual project"                         │
│   └─→ Tier 3 (Local Agent) is most efficient                       │
│                                                                     │
│  "I'm working with sensitive data or systems"                       │
│   └─→ Start at Tier 1, escalate only with precautions              │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Tier Escalation Pattern

You don't have to choose one tier permanently. A common pattern:

1. **Start conversational** — Understand the problem, explore approaches
2. **Prototype in sandbox** — Verify the solution works in isolation
3. **Implement with local agent** — Make real changes efficiently

This progression manages risk while maximizing efficiency.

### Context Switching Costs

Moving between tiers has costs:

| Transition | Cost |
|------------|------|
| Tier 1 → Tier 2 | Re-explain context; upload relevant files |
| Tier 2 → Tier 3 | Transfer working solution; adapt to real environment |
| Tier 3 → Tier 1 | Lose project context; back to copy/paste |

Sometimes it's worth paying the transition cost. Sometimes it's better to stay in one tier.

---

## Security Considerations by Tier

### Tier 1: Minimal Attack Surface

**Risks**:
- Accidentally pasting secrets into chat
- Following bad advice that introduces vulnerabilities

**Mitigations**:
- Review what you're pasting
- Verify security-sensitive suggestions independently

### Tier 2: Data Exposure

**Risks**:
- Uploading files containing credentials
- Sharing proprietary code with cloud provider
- Sandbox environment being compromised (provider risk)

**Mitigations**:
- Sanitize files before upload
- Read provider's data handling policies
- Avoid uploading production data

### Tier 3: System Access

**Risks**:
- AI modifying files incorrectly
- Running dangerous commands
- Exposing credentials to AI context
- Supply chain risks (malicious package installs)

**Mitigations**:
- Use version control (git) religiously
- Review changes before committing
- Configure tool permissions appropriately
- Keep secrets out of AI-accessible files (use .env, gitignore)
- Understand what commands the AI is running

---

## Evaluating New Tools

When you encounter a new AI development tool, ask these questions:

### 1. What tier does it operate at?

- Does it execute code? Where?
- Can it access my local files?
- Can it run commands on my machine?

### 2. What permissions does it require?

- Filesystem access (read? write? which paths?)
- Network access
- Terminal/shell execution
- Git operations
- Package installation

### 3. What are the boundaries?

- Can I limit what it can access?
- Can I review actions before they execute?
- What happens if something goes wrong?

### 4. What's the trust model?

- What company operates this tool?
- Where does my code/data go?
- What are the privacy implications?

### 5. What's the workflow impact?

- How does this fit into my existing process?
- What's the learning curve?
- What's the switching cost?

---

## The Evolution of AI Tools

The landscape is moving toward more capable tools:

**Current trend**: Tools are adding capabilities upward through the tiers
- Conversational tools add code execution
- Sandbox tools add local integrations
- Local tools add more sophisticated agent capabilities

**What this means for you**:
- Understand the spectrum now
- Re-evaluate tools as they evolve
- Don't assume yesterday's limitations still apply
- Don't assume yesterday's permissions are still appropriate

---

## Summary

**Evaluating AI Development Tools** means understanding:

1. **Three tiers exist** — Conversational, Remote Sandbox, Local Agent
2. **Capabilities increase with tier** — And so do trust requirements
3. **Match tier to task** — Understanding needs less access than building
4. **Tier escalation works** — Start safe, increase capability as needed
5. **Security scales with access** — More power means more caution required
6. **Evaluate systematically** — Ask the right questions about any new tool

:::tip[Key insight]
The question isn't "which tier is best?" — it's "which tier is right for this task, given my trust requirements and workflow needs?"
:::

---

## Practical Application

As you work through DevFoundry's curriculum:

- **Early learning** (understanding concepts): Tier 1 is fine
- **Working examples** (running code you paste): Tier 1 or 2
- **Building projects** (your code, your environment): Tier 2 or 3
- **Production work** (real consequences): Tier 3 with appropriate caution

The exercises and examples in this curriculum will note which tier is assumed or required.

---

## Related

- [Architecture-First Thinking](architecture-first) — Making deliberate technical choices
- [Build vs. Borrow](build-vs-borrow) — Evaluating when to use external tools
- [Flow-Based Development](flow-based-dev) — Understanding development workflows
- [Getting Started Prompt](/docs/prompts/getting-started) — Working effectively with AI assistants

---

## Exercises

### Exercise 1: Tool Audit

List the AI development tools you currently use (or are considering). For each:

1. What tier does it operate at?
2. What permissions does it have/need?
3. Is the tier appropriate for how you're using it?

### Exercise 2: Tier Matching

For each scenario, identify the appropriate tier:

1. You want to understand how React hooks work
2. You need to refactor a function across 15 files in your project
3. You want to test an algorithm before adding it to your codebase
4. You're reviewing a dependency for security issues
5. You need to generate boilerplate for a new feature

<details>
<summary>Suggested Answers</summary>

1. **Tier 1** — Conceptual understanding, no execution needed
2. **Tier 3** — Modifying your actual project files
3. **Tier 2** — Testing in isolation before integration
4. **Tier 1** — Analysis and explanation, no execution
5. **Tier 2 or 3** — Depends on whether you want to test it first (2) or generate directly into your project (3)

</details>

### Exercise 3: Security Review

You're about to use a Tier 3 local agent on a new project. Before you start:

1. What files should you ensure are in `.gitignore`?
2. How would you configure git to allow easy rollback?
3. What would you check about the tool's permissions?

### Exercise 4: Tool Evolution Tracking

Pick an AI development tool you don't currently use. Research:

1. What tier did it start at?
2. What tier is it at now?
3. What capabilities were added?
4. What new trust requirements came with those capabilities?
