---
sidebar_position: 1
title: "UX/UI Fundamentals"
description: "Design before you code — understanding users, wireframes, and design systems"
---

# Module 07: UX/UI Fundamentals

**Design before you code — understanding users, wireframes, and design systems**

---

## Learning Objectives

By the end of this module, you will:

- Understand why design thinking precedes coding
- Map user journeys using jobs-to-be-done
- Create wireframes as communication tools
- Recognize design systems and their value
- Use Tailwind CSS for consistent, rapid styling
- Integrate design thinking with AI-assisted development

**Time**: 3-4 hours (reading + exercises)

---

## Introduction

In Part I, you learned what software is and how web applications work. You built lemonade stands in the terminal and browser. But we skipped a critical question:

**How do you know what to build?**

The answer isn't "whatever seems cool" or "what the client asked for" (they often don't know what they need). The answer is **design thinking** — understanding users, their problems, and their workflows before writing code.

This module covers:
1. User journeys and jobs-to-be-done
2. Wireframes as thinking tools
3. Design systems for consistency
4. Tailwind CSS for implementation

---

## The Cost of Skipping Design

Here's what happens when developers skip design:

```
"Just start coding" approach:
┌────────────────────────────────────────────────────────────────┐
│ Day 1:  Build feature based on assumptions                    │
│ Day 3:  User testing reveals wrong mental model               │
│ Day 5:  Rewrite 60% of the code                               │
│ Day 8:  Another round of changes                              │
│ Day 12: Ship something nobody quite loves                     │
└────────────────────────────────────────────────────────────────┘

Design-first approach:
┌────────────────────────────────────────────────────────────────┐
│ Day 1:  Map user journey, identify core job-to-be-done        │
│ Day 2:  Wireframe key screens, get feedback                   │
│ Day 3:  Iterate on wireframes (cheap to change)               │
│ Day 4:  Start coding with clear target                        │
│ Day 8:  Ship something users actually want                    │
└────────────────────────────────────────────────────────────────┘
```

**Changing wireframes costs minutes. Changing code costs hours.**

---

## Part 1: User Journeys

### What is a User Journey?

A **user journey** maps the steps someone takes to accomplish a goal using your software. It's not about features — it's about **outcomes**.

### The Lemonade Stand Journey

Let's map the customer journey for our lemonade stand:

```mermaid
flowchart LR
    A[Arrive at stand] --> B[View menu]
    B --> C[Decide what to order]
    C --> D[Place order]
    D --> E[Pay]
    E --> F[Receive lemonade]
    F --> G[Enjoy]
```

Each step has:
- **Goals**: What does the user want?
- **Actions**: What do they do?
- **Pain points**: What could go wrong?
- **Opportunities**: How can we help?

### Jobs-to-be-Done Framework

Instead of asking "What features do users want?", ask:

> "What job is the user hiring this product to do?"

**Example**: A customer at a lemonade stand isn't "hiring" lemonade. They're hiring:
- Refreshment on a hot day
- A quick pick-me-up
- Something to drink while walking
- A treat for their kids

Understanding the **job** shapes the design:
- If it's about refreshment → emphasize cold, icy drinks
- If it's a quick pick-me-up → make ordering fast
- If it's while walking → design for one-handed interaction
- If it's for kids → show kid-friendly options prominently

### Mapping a Journey: Template

For any feature you're building, map:

| Step | User Goal | User Action | Potential Pain Points | Design Opportunity |
|------|-----------|-------------|----------------------|-------------------|
| 1 | Find what I want | Browse menu | Too many options, unclear pricing | Clear categories, visible prices |
| 2 | Make a choice | Select item | Decision paralysis | Highlight popular items |
| 3 | Customize | Add modifiers | Complexity, hidden costs | Simple toggles, running total |
| 4 | Complete order | Submit & pay | Friction, trust concerns | One-tap checkout, secure indicators |
| 5 | Get confirmation | See order status | Uncertainty | Clear confirmation, estimated time |

---

## Part 2: Wireframes

### What is a Wireframe?

A **wireframe** is a low-fidelity sketch of a user interface. It's intentionally rough.

**Wireframes are NOT:**
- Pretty mockups
- Final designs
- Art projects
- Pixel-perfect

**Wireframes ARE:**
- Thinking tools
- Communication devices
- Cheap experiments
- Conversation starters

### Why Low-Fidelity?

When wireframes look "finished," people:
- Hesitate to suggest changes
- Focus on colors and fonts instead of layout
- Assume the design is final

When wireframes look rough, people:
- Feel free to critique
- Focus on structure and flow
- Suggest improvements openly

### Wireframe Elements

Common wireframe notation:

```
┌─────────────────────────────────────────┐
│ [ Logo ]              [ Nav ] [ Cart ]  │  ← Header
├─────────────────────────────────────────┤
│                                         │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐ │
│  │         │  │         │  │         │ │
│  │  Image  │  │  Image  │  │  Image  │ │  ← Content cards
│  │         │  │         │  │         │ │
│  ├─────────┤  ├─────────┤  ├─────────┤ │
│  │ Title   │  │ Title   │  │ Title   │ │
│  │ $2.50   │  │ $3.00   │  │ $2.00   │ │
│  │ [Add]   │  │ [Add]   │  │ [Add]   │ │
│  └─────────┘  └─────────┘  └─────────┘ │
│                                         │
├─────────────────────────────────────────┤
│ © Footer                    [ Links ]   │  ← Footer
└─────────────────────────────────────────┘
```

Common symbols:
- `[Button]` — Clickable button
- `[ Text input _____ ]` — Text field
- `( ) Option` — Radio button
- `[x] Checkbox` — Checkbox
- `───────────` — Divider
- `XXXXXXXXX` — Placeholder text

### Lemonade Stand Wireframes

**Screen 1: Menu**
```
┌─────────────────────────────────────────┐
│  🍋 Lemonade Stand                      │
├─────────────────────────────────────────┤
│                                         │
│  DRINKS                                 │
│  ─────────────────────────────────────  │
│  ┌─────────┐                            │
│  │  🍋    │  Classic Lemonade           │
│  │        │  Fresh squeezed, ice cold   │
│  └─────────┘  $2.50         [Add to Order] │
│                                         │
│  ┌─────────┐                            │
│  │  🍓    │  Strawberry Lemonade        │
│  │        │  With fresh strawberries    │
│  └─────────┘  $3.50         [Add to Order] │
│                                         │
│  ┌─────────┐                            │
│  │  🌿    │  Mint Lemonade              │
│  │        │  Cool and refreshing        │
│  └─────────┘  $3.00         [Add to Order] │
│                                         │
├─────────────────────────────────────────┤
│  Your Order: 0 items          [View Cart] │
└─────────────────────────────────────────┘
```

**Screen 2: Cart**
```
┌─────────────────────────────────────────┐
│  ← Back            Your Order           │
├─────────────────────────────────────────┤
│                                         │
│  Classic Lemonade              $2.50    │
│  [ - ]  2  [ + ]                        │
│  ─────────────────────────────────────  │
│  Strawberry Lemonade           $3.50    │
│  [ - ]  1  [ + ]                        │
│  ─────────────────────────────────────  │
│                                         │
│                                         │
│                     Subtotal:   $8.50   │
│                     Tax:        $0.68   │
│                     ─────────────────   │
│                     Total:      $9.18   │
│                                         │
│           [ Checkout ]                  │
│                                         │
└─────────────────────────────────────────┘
```

### Tools for Wireframing

**Paper and pencil** — Best for initial exploration
- Fastest to iterate
- No learning curve
- Take photos to share

**Digital tools** (when you need to share):
- Excalidraw (free, hand-drawn aesthetic)
- Figma (industry standard, free tier)
- Balsamiq (designed for wireframes)
- Even simple drawing tools work

**Key insight**: The tool matters less than the thinking. Start with paper.

---

## Part 3: Design Systems

### What is a Design System?

A **design system** is a collection of reusable components and guidelines that ensure visual and functional consistency.

Think of it like Lego bricks:
- Each brick (component) has defined properties
- Bricks combine in predictable ways
- Anyone can build with the same bricks
- Results look cohesive

### Why Design Systems Matter

Without a design system:
```
Button on Page A:  Blue, rounded, 14px font
Button on Page B:  Blue-ish, square, 16px font
Button on Page C:  Different blue, rounded, 14px, but taller
```

With a design system:
```
Button (Primary): Always the same blue, same radius, same padding
Button (Secondary): Consistently styled alternative
```

### Core Design System Elements

1. **Colors** — Primary, secondary, success, error, neutrals
2. **Typography** — Font families, sizes, weights, line heights
3. **Spacing** — Consistent padding/margin scale (4px, 8px, 16px, 24px, 32px...)
4. **Components** — Buttons, inputs, cards, modals, etc.
5. **Patterns** — How components combine (forms, navigation, etc.)

### Example: A Minimal Design System

```
COLORS
──────
Primary:    #2563EB (blue)
Secondary:  #64748B (gray)
Success:    #22C55E (green)
Error:      #EF4444 (red)
Background: #FFFFFF
Text:       #1E293B

TYPOGRAPHY
──────────
Font:       Inter (or system-ui fallback)
Sizes:      12px, 14px, 16px, 20px, 24px, 32px
Weights:    400 (normal), 500 (medium), 700 (bold)

SPACING
───────
Scale:      4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px

COMPONENTS
──────────
Button (Primary):
  - Background: Primary color
  - Text: White
  - Padding: 12px 24px
  - Border radius: 6px
  - Font: 14px, medium weight
```

### Popular Design Systems

- **Material Design** (Google) — Android, web
- **Human Interface Guidelines** (Apple) — iOS, macOS
- **Ant Design** — Enterprise applications
- **Chakra UI** — React component library
- **shadcn/ui** — Tailwind-based, copy-paste components

For learning, studying these systems teaches you what professionals consider important.

---

## Part 4: Tailwind CSS

### What is Tailwind?

**Tailwind CSS** is a utility-first CSS framework. Instead of writing custom CSS, you apply small, single-purpose classes directly in your HTML.

### Traditional CSS vs Tailwind

**Traditional approach:**
```html
<button class="primary-button">Click me</button>
```
```css
.primary-button {
  background-color: #2563eb;
  color: white;
  padding: 12px 24px;
  border-radius: 6px;
  font-weight: 500;
}
```

**Tailwind approach:**
```html
<button class="bg-blue-600 text-white px-6 py-3 rounded-md font-medium">
  Click me
</button>
```

### Why Tailwind?

**Pros:**
- No context switching between HTML and CSS
- Consistent spacing/color scales built-in
- Responsive design is straightforward
- AI assistants generate Tailwind effectively
- No naming things (what do you call this button's container?)

**Cons:**
- HTML looks verbose initially
- Learning curve for utility names
- Some developers prefer traditional CSS

### Tailwind Basics

**Colors:**
```html
<div class="bg-blue-500">Blue background</div>
<div class="text-red-600">Red text</div>
<div class="border-gray-300">Gray border</div>
```

**Spacing:**
```html
<div class="p-4">Padding 16px (4 × 4px)</div>
<div class="m-8">Margin 32px (8 × 4px)</div>
<div class="px-6 py-2">Horizontal 24px, vertical 8px</div>
```

**Typography:**
```html
<h1 class="text-2xl font-bold">Large bold heading</h1>
<p class="text-sm text-gray-600">Small gray text</p>
```

**Layout:**
```html
<div class="flex items-center justify-between">
  <span>Left</span>
  <span>Right</span>
</div>

<div class="grid grid-cols-3 gap-4">
  <div>1</div>
  <div>2</div>
  <div>3</div>
</div>
```

**Responsive:**
```html
<!-- Stack on mobile, row on medium screens and up -->
<div class="flex flex-col md:flex-row">
  <div>Item 1</div>
  <div>Item 2</div>
</div>
```

Breakpoints: `sm:` (640px), `md:` (768px), `lg:` (1024px), `xl:` (1280px)

### Tailwind + React Example

```jsx
function MenuItem({ item, onAdd }) {
  return (
    <div className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50">
      <div className="text-4xl">{item.emoji}</div>
      <div className="flex-1">
        <h3 className="font-medium text-lg">{item.name}</h3>
        <p className="text-gray-600 text-sm">{item.description}</p>
      </div>
      <div className="text-right">
        <div className="font-bold text-lg">${item.price.toFixed(2)}</div>
        <button
          onClick={() => onAdd(item)}
          className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md
                     hover:bg-blue-700 transition-colors"
        >
          Add
        </button>
      </div>
    </div>
  );
}
```

### Setting Up Tailwind

With Vite (from Module 05):

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Configure `tailwind.config.js`:
```javascript
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

Add to your main CSS file:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## Connecting Design to Development

### The Workflow

```mermaid
flowchart LR
    A[Identify User Job] --> B[Map Journey]
    B --> C[Wireframe Screens]
    C --> D[Get Feedback]
    D --> E{Changes Needed?}
    E -->|Yes| C
    E -->|No| F[Implement with Tailwind]
    F --> G[Review & Iterate]
```

### Using AI for Design Implementation

With TUI tools, you can now say:

```
I have a wireframe for a menu card (attached screenshot).

The card should:
- Show an emoji, name, description, and price
- Have an "Add" button on the right
- Use Tailwind CSS
- Match our design system (blue-600 for primary, rounded-lg corners)

Can you implement this as a React component?
```

AI assistants excel at:
- Translating wireframes to Tailwind
- Suggesting responsive adjustments
- Generating consistent component variants

AI assistants struggle with:
- Original visual design (they can implement, not design)
- Understanding your specific user journey
- Making UX decisions without context

**You provide the thinking. AI accelerates the implementation.**

---

## Exercise 1: Map a User Journey

Choose a simple app you use daily (notes app, todo list, weather app).

Map the journey for one core task:
1. What is the job-to-be-done?
2. List 4-6 steps the user takes
3. Identify one pain point
4. Propose one design improvement

<details>
<summary>Example: Notes App</summary>

**Job**: Capture a thought before I forget it

**Journey**:
1. Open app (Goal: Access quickly)
2. Create new note (Goal: Start writing immediately)
3. Type content (Goal: Get thoughts down)
4. Close/save (Goal: Know it's saved)
5. Find note later (Goal: Retrieve when needed)

**Pain point**: Step 2 requires tapping "New" then waiting for editor to load

**Improvement**: Open directly to a new note, or have a persistent quick-capture bar

</details>

---

## Exercise 2: Create a Wireframe

Wireframe a "checkout confirmation" screen for the lemonade stand.

Include:
- Order summary (items, quantities, prices)
- Total
- Confirmation message
- What to do next

Use paper or a simple digital tool. Spend no more than 10 minutes.

<details>
<summary>Example Solution</summary>

```
┌─────────────────────────────────────────┐
│           ✓ Order Confirmed!            │
├─────────────────────────────────────────┤
│                                         │
│  Order #1234                            │
│  ─────────────────────────────────────  │
│  2x Classic Lemonade           $5.00    │
│  1x Strawberry Lemonade        $3.50    │
│  ─────────────────────────────────────  │
│  Total                         $8.50    │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │  Your order will be ready in   │   │
│  │       ~2 minutes               │   │
│  └─────────────────────────────────┘   │
│                                         │
│          [ Back to Menu ]               │
│                                         │
└─────────────────────────────────────────┘
```

Key decisions made:
- Prominent confirmation (checkmark, "Confirmed!")
- Order number for reference
- Clear itemization
- Estimated time (reduces anxiety)
- Clear next action

</details>

---

## Exercise 3: Analyze a Design System

Pick a website or app you use. Identify:

1. **Primary color** — What's the main brand color?
2. **Typography** — How many font sizes do you see?
3. **Spacing** — Is spacing consistent or random?
4. **Buttons** — How many button styles exist?
5. **Consistency** — Does the same element look the same everywhere?

<details>
<summary>Discussion</summary>

Well-designed apps typically have:
- 1-2 primary colors, 1-2 accent colors
- 4-6 distinct text sizes
- Consistent spacing (often based on 4px or 8px)
- 2-3 button variants (primary, secondary, text/link)
- High consistency across screens

Poorly designed apps often have:
- Colors that vary slightly between screens
- Many random font sizes
- Inconsistent padding/margins
- Buttons that look different for no reason
- Elements that are "almost the same" but not quite

</details>

---

## Exercise 4: Implement with Tailwind

Take the checkout confirmation wireframe from Exercise 2 and implement it as a React component with Tailwind CSS.

Requirements:
- Match the wireframe structure
- Use Tailwind's color and spacing utilities
- Make it responsive (stack on mobile if needed)

<details>
<summary>Solution</summary>

```jsx
function OrderConfirmation({ orderNumber, items, total, estimatedMinutes }) {
  return (
    <div className="max-w-md mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="text-green-500 text-5xl mb-2">✓</div>
        <h1 className="text-2xl font-bold">Order Confirmed!</h1>
      </div>

      {/* Order Details */}
      <div className="bg-white border rounded-lg p-4 mb-6">
        <div className="text-sm text-gray-600 mb-3">Order #{orderNumber}</div>

        <div className="border-t pt-3 space-y-2">
          {items.map(item => (
            <div key={item.id} className="flex justify-between">
              <span>{item.quantity}x {item.name}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>

        <div className="border-t mt-3 pt-3 flex justify-between font-bold">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      {/* Estimated Time */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center mb-6">
        <p className="text-gray-700">Your order will be ready in</p>
        <p className="text-xl font-bold text-blue-600">~{estimatedMinutes} minutes</p>
      </div>

      {/* Action */}
      <button className="w-full bg-blue-600 text-white py-3 rounded-lg
                         font-medium hover:bg-blue-700 transition-colors">
        Back to Menu
      </button>
    </div>
  );
}
```

</details>

---

## Using AI for UX/UI Work

### For User Journey Mapping

```
I'm building a lemonade stand ordering app.

The main job-to-be-done: Order a drink quickly while walking.

Can you help me think through potential pain points in this journey?
Focus on mobile use cases.
```

### For Wireframe Feedback

```
Here's my wireframe for the menu screen (attached).

Looking for feedback on:
1. Is the information hierarchy clear?
2. Any obvious usability issues?
3. What am I missing?
```

### For Tailwind Implementation

```
I need to convert this wireframe to a React component with Tailwind.

Key requirements:
- Primary button: blue-600, rounded-lg
- Cards: white background, subtle border, rounded-lg
- Text: gray-900 for headings, gray-600 for body

Can you implement the MenuItem component?
```

---

## Key Takeaways

1. **Design precedes code** — Understanding users saves rewriting time

2. **Jobs-to-be-done** — Ask what job users are hiring your product for

3. **Wireframes are cheap** — Rough sketches invite feedback; polish inhibits it

4. **Design systems ensure consistency** — Define once, reuse everywhere

5. **Tailwind accelerates implementation** — Utility classes match how AI thinks

6. **You think, AI implements** — User journeys require human insight; CSS doesn't

---

## What's Next

**[Module 08: Development Methodologies](development-methodologies)**

You'll learn:
- Agile and iterative development
- Why shipping fast beats planning perfectly
- Test-driven development (light intro)
- How process enables rather than constrains

---

## Vocabulary

| Term | Definition |
|------|------------|
| **User Journey** | The steps a user takes to accomplish a goal |
| **Jobs-to-be-Done** | Framework asking what job users hire a product for |
| **Wireframe** | Low-fidelity sketch of user interface |
| **Design System** | Collection of reusable components and guidelines |
| **Utility-first CSS** | Styling approach using small, single-purpose classes |
| **Tailwind CSS** | Popular utility-first CSS framework |
| **Responsive Design** | Design that adapts to different screen sizes |

---

## Further Reading

### Internal Resources

- [Friction to Opportunity](../../mental-models/friction-to-opportunity) — Noticing problems worth solving
- [Architecture First](../../mental-models/architecture-first) — Design before implementation
- [Diagram Standards](../../diagram-standards) — How we visualize systems

### External Resources

- [Jobs to be Done Framework](https://jtbd.info/) — Original thinking on JTBD
- [Refactoring UI](https://www.refactoringui.com/) — Practical design for developers
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) — Official reference
- [Excalidraw](https://excalidraw.com/) — Free wireframing tool

---

## Reflection

Before moving on, ensure you can:

- [ ] Explain why design comes before coding
- [ ] Map a basic user journey for any feature
- [ ] Create a rough wireframe on paper
- [ ] Identify elements of a design system
- [ ] Write basic Tailwind classes for layout, color, and spacing
- [ ] Know when to use AI (implementation) vs. your judgment (design decisions)

---

**You've completed Module 07!** You now understand that good software starts with understanding users, not writing code. This thinking will make you a better collaborator, a clearer communicator, and a more effective AI prompter.
