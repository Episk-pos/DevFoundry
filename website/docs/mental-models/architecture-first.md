---
sidebar_position: 4
title: Architecture-First Thinking
description: How to work effectively with AI coding assistants
---

# Architecture-First Thinking

**How to work effectively with AI coding assistants**

---

## Introduction

AI coding assistants (Claude, ChatGPT, GitHub Copilot, Cursor, etc.) are powerful — but only if you know how to guide them.

The key insight: **LLMs are autocomplete for systems, not syntax.**

- Bad: "Write a function that does X"
- Good: "Here's my system architecture. I need a function that fits here and does X."

**Architecture-first thinking** means providing context, constraints, and clarity before asking for code.

---

## The Problem: Vague Prompts Lead to Misaligned Code

### Scenario 1: No Context

**Prompt**:
```
"Create a shopping cart"
```

**AI generates**:
- Uses a different state management approach than your app
- Assumes a structure you don't have
- Includes features you don't need
- Misses features you do need

**Result**: You get code, but it doesn't fit. You spend hours adapting it.

---

### Scenario 2: With Architectural Context

**Prompt**:
```
I'm building a chat app SPA (single-page application) with this architecture:

**Tech stack**: React (functional components), useState for state, no external state library

**Module structure**:
- App.jsx (holds global state)
- components/MessageInput.jsx
- components/MessageList.jsx
- utils/messages.js (pure functions for formatting)

**Current state shape**:
{
  messages: [],      // array of {id, sender, content, timestamp}
  currentUser: 'You'
}

**Flow**:
User types message → MessageInput validates → App adds to messages array → MessageList displays

I need to implement the "sendMessage" function in App.jsx. It should:
1. Accept content from MessageInput
2. Create message object with unique ID and timestamp
3. Update messages array immutably
4. Scroll to new message

Please implement this function following React best practices.
```

**AI generates**:
- Matches your state structure
- Uses immutable updates
- Follows your naming conventions
- Fits into your existing architecture

**Result**: Drop it in and it works.

---

## Core Principle: Context is King

AI assistants work best when you provide:

### 1. Architectural Context
- What kind of system is this? (CLI, web app, API, etc.)
- What's the overall structure?
- What patterns are you using?

### 2. Constraints
- Technology choices (React, Vue, plain JS?)
- Requirements (must work offline, must be < 100 lines, etc.)
- Style guidelines (functional vs class components, naming conventions)

### 3. Module Context
- What files exist?
- What imports what?
- Where does this new code fit?

### 4. Behavioral Context
- What's the user flow?
- What's the data flow?
- What edge cases matter?

### 5. Vocabulary
- Use consistent terms
- Reference your own code ("`OrderForm` component", not "the form")

---

## The Architecture-First Prompt Template

Use this structure for feature requests:

```
**Context**: [Describe the system and current state]

**Architecture**: [Module view, component view, or allocation view]

**Requirement**: [What you need]

**Constraints**: [What limitations or requirements apply]

**Expected behavior**: [How it should work]
```

### Example: Add Message Reactions Feature

```
**Context**:
I'm building a chat app. It's a React SPA with:
- App.jsx (holds state: {messages, currentUser})
- components/MessageInput.jsx (compose message)
- components/MessageList.jsx (displays messages)
- utils/messages.js (contains formatMessage)

**Architecture** (Component-Connector View):
MessageInput → App state → MessageList
formatMessage is called when displaying messages

**Requirement**:
Add reactions to messages (thumbs up, heart, laugh)

**Constraints**:
- Must store reactions in each message object
- Called from MessageList when user clicks reaction button
- Must not modify existing formatMessage function

**Expected behavior**:
1. Each message can have multiple reactions
2. Clicking a reaction toggles it (add/remove)
3. Show count of each reaction type

Please implement:
1. addReaction(messageId, reactionType, userId) in utils/messages.js
2. Update App.jsx to handle reactions
```

**Result**: AI generates code that integrates seamlessly.

---

## Common Pitfalls and Fixes

### Pitfall 1: "Just make it work"

:::danger[Bad prompt]
"My chat app isn't displaying messages correctly. Fix it."
:::

**Problem**: AI doesn't know your architecture, so it guesses. Often introduces new bugs.

:::tip[Better prompt]
"In my chat app, messages are formatted in utils/messages.js by the formatMessage function:

[paste function]

Expected behavior: display sender name, timestamp, and content.
Actual behavior: timestamp shows as 'Invalid Date'.

Sample input: `{sender: 'Alice', content: 'Hello!', timestamp: '2024-01-15T10:30:00Z'}`

What's wrong and how should I fix it?"
:::

**Result**: AI can diagnose the specific issue.

---

### Pitfall 2: No Mention of Existing Code

:::danger[Bad prompt]
"Add a delete button to remove messages"
:::

**Problem**: AI doesn't know where the message list is rendered or how state is managed.

:::tip[Better prompt]
"In MessageList.jsx, I'm rendering messages from props (array of message objects).

Current code:
```jsx
{messages.map(msg => (
  <div key={msg.id} className="message">
    <span className="sender">{msg.sender}</span>
    <p>{msg.content}</p>
  </div>
))}
```

I need to add a delete button to each message that calls props.onDeleteMessage(msg.id).

Please update the JSX to include a delete button. Style it with a 'btn-delete' className."
:::

**Result**: AI modifies your exact code correctly.

---

### Pitfall 3: Assuming AI Remembers

**Problem**: In long conversations, AI may forget earlier context.

**Solution**: Re-state key architectural points in each prompt.

**Example**:
```
"(Reminder: This is a React functional component using useState. We're not using Redux.)

I need to add a loading state..."
```

---

## Effective Prompt Patterns

### Pattern 1: "Implement Component X"

```
**System**: Chat app SPA, React + Vite

**Architecture**:
App.jsx contains state: { messages: [], currentUser: 'You' }

**Task**:
Create components/MessageInput.jsx

**Requirements**:
- Props: onSendMessage (callback)
- One input: content (textarea)
- Button: "Send"
- On submit: validate content not empty, call onSendMessage({content}), clear form

**Style**: Use semantic HTML, functional component, controlled inputs

Please implement MessageInput.jsx.
```

---

### Pattern 2: "Debug This Code"

```
**Context**: chat app, utils/messages.js contains message formatting logic

**Problem**: formatTimestamp returns 'Invalid Date'

**Code**:
[paste the function]

**Expected**: formatted time like "10:30 AM"
**Actual**: 'Invalid Date'

**Sample input**:
`{sender: "Alice", content: "Hello!", timestamp: "2024-01-15T10:30:00Z"}`

What's the bug and how do I fix it?
```

---

### Pattern 3: "Refactor This"

```
**Context**: MessageList component has grown to 150 lines and handles both display and editing

**Current structure**:
- Displays list of messages
- Each message has inline edit/delete functionality
- Handles reactions
- Formats timestamps

**Goal**: Split into two components:
1. MessageList (display only, receives messages and callbacks)
2. MessageItem (individual message, handles edit/delete/reactions)

**Constraints**:
- Keep existing prop interface for MessageList
- Maintain current behavior

Please show the refactored components.
```

---

### Pattern 4: "Explain This Code"

```
**Context**: I'm learning React and found this in the chat app

**Code**:
```jsx
useEffect(() => {
  const scrollContainer = messagesEndRef.current;
  scrollContainer?.scrollIntoView({ behavior: 'smooth' });
}, [messages]);
```

**Questions**:
1. What does useEffect do here?
2. Why is `messages` in the dependency array?
3. What's `scrollIntoView` doing?
4. What happens if I remove the dependency array?

Please explain in beginner-friendly terms with examples.
```

---

## Using Architectural Views in Prompts

Specify which view you're working in:

### Module View Prompt
```
"In the module view, my app has:
- src/components/*.jsx (UI components)
- src/utils/*.js (business logic)
- src/App.jsx (main component)

I want to add authentication. Where should I place:
1. Login/Signup components?
2. Authentication logic (token management)?
3. API call wrappers?

Suggest a file structure following the existing pattern."
```

### Component-Connector View Prompt
```
"In the component-connector view, my current flow is:

User → OrderForm → App state → OrderList → Display

I want to add a confirmation step:

User → OrderForm → (new) ConfirmationModal → App state → OrderList

How should I modify the flow? What props does ConfirmationModal need?"
```

### Allocation View Prompt
```
"In the allocation view:
- React app runs in browser
- Express API runs on Render
- SQLite database on same server as API

I want to add file uploads. Where should:
1. File validation happen? (client or server)
2. Files be stored? (server, or S3, or...?)
3. Upload progress be tracked?

Suggest an allocation strategy."
```

---

## Advanced: Providing ADRs to AI

If your project has ADRs (Architecture Decision Records), reference them in prompts:

```
"According to ADR-0003, we use functional components and hooks (no class components).

I need to implement a form with complex validation. Please use a custom hook
following our ADR conventions."
```

**Why this works**: ADRs codify decisions. AI can follow them consistently.

---

## Iterative Refinement

Architecture-first doesn't mean one-shot perfection. It means **structured iteration**.

### Iteration Loop:

1. **Prompt with architecture** → AI generates code
2. **Test** → Find issues
3. **Refine prompt** → Add constraints or clarify requirements
4. **AI updates code** → Improved version
5. Repeat until satisfactory

### Example Iteration:

**Round 1**:
```
"Create an OrderForm component with item and quantity inputs"
```

**Result**: Works, but no validation

**Round 2**:
```
"Update OrderForm to validate:
- Quantity must be > 0
- Show error message below input if invalid
- Disable submit button when invalid"
```

**Result**: Validation works, but UX is clunky

**Round 3**:
```
"Improve UX:
- Only show error after user has interacted (don't show on mount)
- Clear error when user fixes input
- Use 'error-text' className for styling"
```

**Result**: Polished component

---

## Summary

**Architecture-first thinking** means:

- **Provide context** before asking for code
- **Describe the system** (structure, flow, deployment)
- **Specify constraints** (tech, style, requirements)
- **Use architectural views** (module, component-connector, allocation)
- **Reference existing code** (don't assume AI knows your project)
- **Iterate deliberately** (refine prompts based on results)

### The Mental Shift

| Old way | Architecture-first way |
|---------|------------------------|
| "Build me a feature" | "Here's my system. This feature fits here. Build it to match." |
| "Fix this bug" | "Here's the module and expected behavior. What's wrong?" |
| "Add validation" | "This component receives props X and Y. Add validation following pattern Z." |
| "Explain this code" | "In the component-connector view, what's the flow here?" |

**Result**: AI becomes a true collaborator, not a magic box that sometimes works.

---

## Related Documentation

- [Flow-Based Development](flow-based-dev) — Core philosophy
- [Architectural Views](../architectural-views) — View types
- [Architecture-First Prompts](../prompts/architecture-first) — Prompt templates
- [ADRs](../adr/index) — Example architectural decisions

---

## Next Steps

Practice architecture-first prompting:

1. **Start small**: Use it for one feature
2. **Compare**: Try vague vs architecture-first prompts side-by-side
3. **Iterate**: Refine your prompts based on results
4. **Document**: Write ADRs to codify your architectural decisions
5. **Teach**: Explain your architecture to the AI (teaching forces clarity)

**Remember**: The goal isn't perfect prompts on the first try. It's structured thinking that leads to better collaboration.
