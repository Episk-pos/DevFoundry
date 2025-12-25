# Module 06: Frontend Frameworks and React

**Why frameworks exist, and why we're using React**

---

## Introduction

In the previous examples, you built a lemonade stand with vanilla JavaScript and DOM manipulation. It worked. So why do frontend frameworks like React, Vue, Angular, and Svelte exist? Why have they persisted and evolved over 15+ years?

The answer isn't "because developers like shiny things."

**Frontend development has intrinsically hard problems** — problems that emerge no matter what architecture you choose. Frameworks exist because these problems are universal, and solving them from scratch in every project is wasteful and error-prone.

This module explains:
1. What those hard problems are
2. Why frameworks are a reasonable response
3. Why we're using React specifically (hint: AI assistance)
4. Just enough React to be productive

---

## The Hard Problems of Frontend Development

These problems aren't React problems or Vue problems. They're **frontend problems**.

### Problem 1: Keeping UI in Sync with State

The fundamental challenge:

```
┌─────────────────────────────────────────────────────────────┐
│                        THE PROBLEM                          │
│                                                             │
│   Your application has STATE (data that can change)         │
│                          ↓                                  │
│   Your UI must REFLECT that state                           │
│                          ↓                                  │
│   When state changes, UI must UPDATE                        │
│                          ↓                                  │
│   But WHICH parts? And in what ORDER?                       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

In our vanilla lemonade stand:

```javascript
// When order changes, we re-render everything
function renderOrder() {
  container.innerHTML = items.map(item => `...`).join('');
}
```

This works for simple apps. For complex apps:
- Re-rendering everything is slow
- You lose user input focus
- Animations break
- Scroll position resets
- Event listeners need reattachment

Every frontend developer who's built a complex vanilla JS app has encountered these problems.

### Problem 2: Component Composition

Real UIs are deeply nested:

```
App
├── Header
│   ├── Logo
│   ├── Navigation
│   │   ├── NavItem
│   │   ├── NavItem
│   │   └── NavItem
│   └── UserMenu
│       ├── Avatar
│       └── Dropdown
├── Sidebar
│   └── ...
└── Main
    └── ...
```

Questions that arise:
- How do components communicate?
- How does data flow between siblings?
- How do you share state without prop drilling through 10 levels?
- How do you handle components that need the same data?

### Problem 3: Managing Side Effects

UIs are full of side effects:
- Fetching data from APIs
- Setting up timers/intervals
- Subscribing to events
- Managing focus
- Synchronizing with browser APIs

When do these run? When do they clean up? What happens when the component unmounts?

```javascript
// Vanilla JS: You must remember to clean up
const interval = setInterval(updateTime, 1000);
// Later... but when? And where?
clearInterval(interval);
```

### Problem 4: Handling Events Consistently

Event handling seems simple until:
- You need to prevent default behavior
- You need to stop propagation
- Events bubble differently in different browsers
- You have dynamically created elements
- You need to debounce or throttle

### Problem 5: Lists and Keys

Rendering lists efficiently is surprisingly hard:
- Which items were added?
- Which were removed?
- Which just moved?
- How do you animate transitions?
- How do you maintain input state in list items?

---

## Why Frameworks Persist

Given these problems, developers have three choices:

### Choice 1: Solve Everything Yourself

Build your own:
- State management system
- Virtual DOM or update strategy
- Component system
- Event handling abstraction
- List diffing algorithm

This is essentially building your own framework. Most teams shouldn't.

### Choice 2: Accept the Limitations

Keep your app simple enough that vanilla JS works. This is valid for truly simple apps.

### Choice 3: Use a Framework

Let someone else solve the hard problems. Focus on your application's unique value.

**Frameworks persist because the problems persist.** React (2013), Vue (2014), Angular (2016), Svelte (2016) — these aren't fads. They're responses to problems that every complex frontend faces.

---

## Why React (Specifically)

We're not claiming React is "best." We're choosing it for pragmatic reasons:

### 1. AI Training Data

React has been dominant since ~2015. This means:
- **Massive corpus** of React code in AI training data
- **Better AI assistance** — AI has seen more React patterns
- **More accurate completions** — Common patterns are well-represented
- **Better error explanations** — AI knows React error messages

This isn't theoretical. Try asking an AI for help with React vs. a newer framework. The quality difference is noticeable.

### 2. Ecosystem Maturity

- Extensive documentation
- Thousands of tutorials
- Battle-tested patterns
- Comprehensive tooling
- Active community

When you're building products solo or with a small team, you want to leverage existing solutions, not fight your tools.

### 3. Transferable Concepts

React's concepts (components, props, state, hooks) transfer to other frameworks. Learning React makes learning Vue or Svelte easier, not harder. If you later decide a different framework fits your product better, the mental models carry over.

---

## About JSX

Let's address this directly: **many developers dislike JSX**.

```jsx
// This looks weird at first
function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>;
}
```

Common objections:
- "It mixes HTML and JavaScript"
- "It's not separation of concerns"
- "It looks ugly"

These feelings are valid. However:

### JSX Is Just Syntax

JSX compiles to regular JavaScript:

```jsx
// You write:
<h1 className="greeting">Hello, {name}!</h1>

// It becomes:
React.createElement('h1', { className: 'greeting' }, 'Hello, ', name, '!')
```

You *could* write React without JSX. Almost nobody does because JSX is more readable once you're used to it.

### Separation of Concerns

The traditional "separation" (HTML/CSS/JS in separate files) separates by **technology**.

React separates by **component** — everything related to a button (structure, style, behavior) lives together.

Neither is objectively correct. They're different organizing principles.

### The Pragmatic View

You don't have to love JSX. You need to:
1. Recognize it as transformed JavaScript
2. Understand the transformation rules
3. Be able to read and write it

This is achievable in hours, not weeks.

---

## React Mental Model: Just Enough

We're keeping this minimal. Deeper React knowledge can come later.

### Core Concept: Components Are Functions

```jsx
// A component is a function that returns UI
function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>;
}

// Use it like an HTML tag
<Greeting name="World" />
```

That's it. Components are functions. They receive props (inputs) and return JSX (UI description).

### Core Concept: State Triggers Re-render

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
```

When `setCount` is called:
1. React updates the state
2. React calls your component function again
3. React compares old and new output
4. React updates only what changed in the DOM

You don't manually update the DOM. You update state, React handles the rest.

### Core Concept: Props Flow Down

```jsx
function Parent() {
  const [name, setName] = useState("World");

  return <Child name={name} />;
}

function Child({ name }) {
  // Child receives name as a prop
  return <p>Hello, {name}</p>;
}
```

Data flows from parent to child via props. This is predictable and traceable.

### Core Concept: Events Flow Up

```jsx
function Parent() {
  const [count, setCount] = useState(0);

  const handleIncrement = () => setCount(count + 1);

  return <Child onIncrement={handleIncrement} />;
}

function Child({ onIncrement }) {
  return <button onClick={onIncrement}>Increment</button>;
}
```

Children notify parents by calling functions passed as props.

---

## Setting Up a React Project

Use Vite (from Module 05):

```bash
npm create vite@latest my-react-app -- --template react-ts
cd my-react-app
npm install
npm run dev
```

This gives you:
- React with TypeScript
- Hot reload
- Build configuration
- Development server

---

## Common Patterns (Brief)

### Conditional Rendering

```jsx
function Greeting({ isLoggedIn }) {
  if (isLoggedIn) {
    return <h1>Welcome back!</h1>;
  }
  return <h1>Please log in</h1>;
}

// Or inline
<div>
  {isLoggedIn ? <UserMenu /> : <LoginButton />}
</div>
```

### Lists

```jsx
function MenuList({ items }) {
  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}
```

The `key` prop helps React track which items changed.

### Event Handling

```jsx
function Button() {
  const handleClick = (event) => {
    event.preventDefault();
    console.log('Clicked!');
  };

  return <button onClick={handleClick}>Click me</button>;
}
```

---

## Debugging React Applications

This section gets more detail because debugging is universally valuable.

### React Developer Tools

Install the browser extension. It adds a "Components" tab showing:
- Component tree
- Props for each component
- State for each component
- Which components re-rendered

**Essential for debugging.** Install it before writing React code.

### Common Error: "Cannot read property of undefined"

```
TypeError: Cannot read property 'name' of undefined
```

Usually means:
- Data hasn't loaded yet
- Prop wasn't passed
- API returned unexpected shape

**Solution pattern:**

```jsx
// Guard against undefined
function UserProfile({ user }) {
  if (!user) {
    return <div>Loading...</div>;
  }
  return <div>{user.name}</div>;
}

// Or optional chaining
<div>{user?.name}</div>
```

### Common Error: "Each child should have a unique key"

```
Warning: Each child in a list should have a unique "key" prop.
```

**Solution:** Add key prop to list items:

```jsx
// Bad
{items.map(item => <li>{item.name}</li>)}

// Good
{items.map(item => <li key={item.id}>{item.name}</li>)}
```

Don't use array index as key unless the list never reorders.

### Common Error: "Too many re-renders"

```
Error: Too many re-renders. React limits the number of renders.
```

Usually caused by setting state during render:

```jsx
// Bad - causes infinite loop
function Component() {
  const [count, setCount] = useState(0);
  setCount(count + 1);  // Triggers re-render, which sets state, which triggers...
  return <div>{count}</div>;
}

// Good - set state in event handlers or useEffect
function Component() {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount(count + 1)}>
      {count}
    </button>
  );
}
```

### Common Error: Stale Closure

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log(count);  // Always logs 0!
    }, 1000);
    return () => clearInterval(interval);
  }, []);  // Empty dependency array = effect never re-runs

  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

The `count` in the interval closure is captured at the initial value.

**Solution:** Include dependencies, or use functional updates:

```jsx
setCount(prevCount => prevCount + 1);  // Gets latest value
```

### Debugging Strategy

1. **Check React DevTools** — Is the component receiving expected props/state?
2. **Add console.log** — When does the component render? With what values?
3. **Check the console** — React warnings are informative
4. **Simplify** — Remove code until it works, then add back
5. **Use AI** — Describe the error or attach a screenshot

---

## Using AI with React

With TUI tools (Claude Code, Codex CLI, etc.), you don't need to copy-paste code — the AI can read your files directly.

### Effective Requests

**Point to files:**
```
Look at src/components/MenuItem.tsx.
I want to add an "Add to Cart" button that calls the onAdd prop.
Can you implement this?
```

**Use screenshots for UI issues:**
```
The menu items aren't aligning correctly.
[attach screenshot]
Can you check the CSS in MenuItem.tsx and fix the layout?
```

**Describe the error:**
```
I'm getting "Cannot update a component while rendering a different component"
when I click the Add button.
Can you find what's causing this in App.tsx?
```

**Ask for architecture guidance:**
```
I want to add a shopping cart to this React app.
Before writing code, can you:
1. Read the current component structure
2. Suggest where cart state should live
3. Outline what new components we need
```

### AI Strengths with React

- Generating boilerplate components following your existing patterns
- Explaining error messages with your actual code context
- Suggesting patterns for common problems
- Running the dev server and seeing build errors
- Iterating on UI with screenshot feedback

### AI Weaknesses with React

- Complex state management logic (may suggest overly simple solutions)
- Performance optimization (may not consider your specific constraints)
- Architectural decisions (your app context matters — explain it)

---

## Exercise 1: Identify the Hard Problems

Look at our vanilla JavaScript lemonade stand (`02-lemonade-static-web`).

Find examples of:
1. Manual DOM updates that could cause sync issues
2. State that's managed imperatively
3. Event handlers that needed manual attachment

How would these become problems if the app grew 10x more complex?

<details>
<summary>Discussion</summary>

1. **Manual DOM updates**: `container.innerHTML = ...` replaces everything, losing focus, scroll position, and animations

2. **Imperative state**: The `orderItems` array is mutated directly, and we manually call `renderOrder()` — easy to forget

3. **Event handlers**: We use event delegation on containers, which works but requires checking `event.target` classes — brittle if markup changes

At 10x complexity:
- You'd have many pieces of state, each requiring manual render calls
- Updates might conflict or happen in wrong order
- Event delegation would become a tangled mess
- You'd likely build your own component system... which is building a framework

</details>

---

## Exercise 2: Read a React Component

Without running it, read this component and answer:

```jsx
function OrderSummary({ items, onCheckout }) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const hasItems = items.length > 0;

  return (
    <div className="order-summary">
      <h2>Your Order</h2>
      {hasItems ? (
        <>
          <ul>
            {items.map(item => (
              <li key={item.id}>
                {item.name} x{item.quantity}: ${(item.price * item.quantity).toFixed(2)}
              </li>
            ))}
          </ul>
          <p className="total">Total: ${total.toFixed(2)}</p>
          <button onClick={onCheckout}>Checkout</button>
        </>
      ) : (
        <p>No items in your order</p>
      )}
    </div>
  );
}
```

1. What props does this component receive?
2. What does it render when `items` is empty?
3. What does it render when `items` has content?
4. When is `onCheckout` called?

<details>
<summary>Solution</summary>

1. **Props**: `items` (array of order items) and `onCheckout` (function to call when checkout button clicked)

2. **When empty**: A div with "Your Order" heading and "No items in your order" paragraph

3. **When has content**: The heading, a list of items with names/quantities/subtotals, a total line, and a checkout button

4. **onCheckout called**: When the "Checkout" button is clicked

This is a "presentational" component — it receives data and callbacks, renders UI, but doesn't manage its own state.

</details>

---

## Exercise 3: Fix the Bug

This component has a bug. Find it:

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleClick}>Add 3</button>
    </div>
  );
}
```

What happens when you click the button? Why?

<details>
<summary>Solution</summary>

**What happens**: The count increases by 1, not 3.

**Why**: Each `setCount(count + 1)` uses the same `count` value (from the closure). If count is 0, all three calls say "set to 0 + 1".

**Fix**: Use functional update:

```jsx
const handleClick = () => {
  setCount(prev => prev + 1);
  setCount(prev => prev + 1);
  setCount(prev => prev + 1);
};
```

Now each call receives the previous value, not the stale closure value.

</details>

---

## Exercise 4: Ask AI for a Component

Write a prompt asking an AI to create a menu item component for our lemonade stand.

Include:
- The TypeScript interface for MenuItem
- What the component should display
- What event it should emit when clicked

Then evaluate the response:
- Did it use TypeScript correctly?
- Did it handle the event properly?
- Would you need to modify it to use in a real project?

---

## What We Skipped

| Topic | What It Is | When You'll Need It |
|-------|-----------|---------------------|
| useEffect | Managing side effects | API calls, subscriptions |
| Context | Sharing state without prop drilling | Medium+ apps |
| useReducer | Complex state logic | When useState isn't enough |
| Custom hooks | Reusable logic | Repeated patterns |
| Refs | Direct DOM access | Focus, measurements |
| Memo/useMemo/useCallback | Performance optimization | When profiling shows need |

These are important. Learn them when you need them, not before.

---

## Key Takeaways

1. **Frontend has intrinsically hard problems** — Frameworks exist to solve them, not because developers like complexity

2. **React for AI-assisted development** — More training data = better AI help

3. **JSX is just syntax** — You don't have to love it, just understand it

4. **Components are functions** — They take props, return UI

5. **State changes trigger re-renders** — Update state, React updates DOM

6. **React DevTools are essential** — Install before you start

7. **Most errors are learnable** — Stale closures, missing keys, render loops — these have patterns

---

## What's Next

- **[Example: Lemonade Stand (React)](../examples/04-lemonade-react/)** — The familiar app, rebuilt with components
- **Module 07: State Management** — When component state isn't enough

---

*Frameworks aren't magic. They're answers to questions every frontend developer eventually asks. React is one good answer — particularly when you have AI as a development partner.*
