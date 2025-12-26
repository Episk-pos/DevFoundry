---
sidebar_position: 5
title: Glossary
description: Essential software vocabulary for effective communication
---

# Glossary

**Essential software vocabulary for effective communication**

---

## How to Use This Glossary

- **Alphabetically organized** for easy lookup
- **Cross-referenced** — related terms link to each other
- **Beginner-focused** — assumes no prior knowledge
- **Practical examples** — uses lemonade stand when possible
- **Living document** — will expand as curriculum progresses

:::tip
When you encounter an unfamiliar term in the curriculum, come here first.
:::

---

## A

### Abstraction
Hiding complexity behind a simpler interface. Like a car's steering wheel — you don't need to understand how the engine works to turn.

*Example*: A `calculateTotal()` function abstracts away the math details.

### ADR (Architecture Decision Record)
A document explaining *why* an architectural decision was made. See [ADR documentation](adr).

*Example*: "Why we chose React over Vue"

### Agile
A development methodology emphasizing iterative work, frequent feedback, and adaptation. Opposite of waterfall (planning everything upfront).

### Allocation View
An architectural view showing where code runs (browser vs server, infrastructure). See [Architectural Views](architectural-views).

### API (Application Programming Interface)
A defined way for software to communicate. Like a menu at a restaurant — shows what you can order and how.

*Example*: `GET /api/orders` fetches orders from a server.

### Argument (or Parameter)
Data passed to a function. Like ingredients you give to a recipe.

*Example*: `calculateTotal(price, quantity)` — price and quantity are arguments.

### Array
A list of items in order. Like a shopping list.

*Example*: `['lemonade', 'iced tea', 'water']`

---

## B

### Backend
The part of a system that runs on a server, not visible to users directly. Handles data, logic, and storage.

*Example*: An Express API that saves orders to a database.

### Boolean
A value that's either `true` or `false`. Like a light switch (on or off).

### Browser
Software for viewing websites (Chrome, Firefox, Safari). Runs HTML, CSS, and JavaScript.

### Bug
An error or unexpected behavior in software. Named after an actual moth found in early computer hardware.

### Build
The process of transforming source code into a runnable application. Often involves compiling, bundling, and optimization.

*Example*: Running `npm run build` to prepare a React app for deployment.

### Bundle
Combining multiple files into fewer files for efficient delivery. Reduces HTTP requests.

*Example*: Vite bundles React components into a single JavaScript file.

---

## C

### Cache
Storing data temporarily for faster access later. Like keeping frequently used tools on your workbench instead of in the garage.

*Example*: Browser caching images so they don't re-download every page load.

### CDN (Content Delivery Network)
A network of servers that deliver files quickly by being geographically close to users.

*Example*: Vercel's CDN serves static files from locations worldwide.

### CI/CD (Continuous Integration / Continuous Deployment)
Automated processes for testing and deploying code. Every commit triggers tests; passing code deploys automatically.

### CLI (Command Line Interface)
A text-based interface for interacting with software. You type commands instead of clicking buttons.

*Example*: Running `node lemonade.js` in a terminal.

### Client
The part of a system that requests services. Often refers to the browser or frontend.

*Opposite*: Server

### Component
A reusable piece of a system. In React, a component is a self-contained UI element.

*Example*: An `OrderForm` component handles order input.

### Component-Connector View
An architectural view showing runtime behavior and data flow. See [Architectural Views](architectural-views).

### CSS (Cascading Style Sheets)
A language for styling HTML. Controls colors, layout, fonts, etc.

*Example*: `color: blue;` makes text blue.

---

## D

### Database
A structured system for storing and retrieving data. Like a filing cabinet with organized drawers.

*Examples*: SQLite, PostgreSQL, MongoDB

### Dependency
Code that your code relies on. If you use a library, it's a dependency.

*Example*: React is a dependency if your project uses it.

### Deployment
Making software available to users. Putting it on the internet or distributing it.

*Example*: Deploying a React app to Vercel.

### DevTools (Developer Tools)
Built-in browser tools for inspecting and debugging web pages. Press F12 to open.

### DOM (Document Object Model)
The browser's representation of an HTML page as a tree of objects. JavaScript can modify the DOM to change what's displayed.

*Example*: `document.getElementById('total')` accesses a DOM element.

---

## E

### Environment Variable
A configuration value stored outside the code, often for secrets or environment-specific settings.

*Example*: `DATABASE_URL` for database connection string.

### Event
Something that happens (user click, page load, timer). Programs can respond to events.

*Example*: A "click" event on a button.

### Event Handler
A function that runs in response to an event.

*Example*: `onClick={handleSubmit}` in React.

### Express
A popular Node.js framework for building web servers and APIs.

---

## F

### Fetch
A browser API for making HTTP requests (usually to a server).

*Example*: `fetch('/api/orders')` gets data from the server.

### Framework
A structured foundation for building applications. Provides conventions and tools.

*Examples*: React (frontend), Express (backend)

### Frontend
The part of a system users interact with directly. In web apps, runs in the browser.

*Example*: A React app displaying the lemonade stand UI.

### Function
A named block of code that performs a task. Like a recipe that can be reused.

*Example*: `function calculateTotal(price, quantity) { return price * quantity; }`

---

## G

### Git
A version control system for tracking changes to code. Like "track changes" in Microsoft Word, but for projects.

### GitHub
A platform for hosting Git repositories and collaborating on code.

---

## H

### HTML (HyperText Markup Language)
The structure of web pages. Defines headings, paragraphs, buttons, etc.

*Example*: `<button>Order Lemonade</button>`

### HTTP (HyperText Transfer Protocol)
The protocol browsers and servers use to communicate. Defines request/response format.

### HTTPS
Secure version of HTTP (encrypted).

---

## I

### IDE (Integrated Development Environment)
Software for writing code with helpful features (autocomplete, debugging, etc.).

*Examples*: VS Code, WebStorm, Cursor

### Import
Bringing code from another file or library into your current file.

*Example*: `import React from 'react';`

### Input
Data given to a program or function.

*Example*: User typing "5" into a quantity field.

---

## J

### JavaScript (JS)
A programming language that runs in browsers (and servers via Node.js). Adds interactivity to web pages.

### JSON (JavaScript Object Notation)
A text format for representing structured data. Easy for humans to read and machines to parse.

*Example*: `{"name": "Lemonade", "price": 2.50}`

### JSX
A syntax extension for JavaScript used in React. Looks like HTML but is JavaScript.

*Example*: `<OrderForm onSubmit={handleOrder} />`

---

## L

### Library
A collection of reusable code. Smaller and more focused than a framework.

*Example*: A library for date formatting.

### Lint / Linter
A tool that checks code for errors and style issues.

*Example*: ESLint warns about unused variables.

### localhost
A hostname that refers to your own computer. Used for local development.

*Example*: `http://localhost:3000` runs a server on your machine.

---

## M

### Method
A function that belongs to an object or class.

*Example*: `array.push(item)` — `push` is a method of arrays.

### Module
A self-contained piece of code, usually in one file. Can be imported by other modules.

*Example*: `pricing.js` as a module with pricing logic.

### Module View
An architectural view showing static structure (files, dependencies). See [Architectural Views](architectural-views).

---

## N

### Node.js
A runtime for executing JavaScript outside the browser (on servers, in CLIs, etc.).

### npm (Node Package Manager)
A tool for installing and managing JavaScript libraries (packages).

*Example*: `npm install react`

---

## O

### Object
A collection of related data and functions. Like a container with labeled compartments.

*Example*: `{ name: "Lemonade", price: 2.50, quantity: 5 }`

---

## P

### Package
A bundle of code (library or tool) that can be installed and reused.

*Example*: React is a package.

### Parameter
See **Argument**.

### Production
The live environment where real users interact with your software. Opposite of development/staging.

### Promise
A JavaScript object representing the eventual result of an asynchronous operation. Like a receipt for a task that isn't done yet.

### Props (Properties)
Data passed from a parent React component to a child component.

*Example*: `<OrderForm price={2.50} />`

---

## Q

### Query
A request for data, often from a database or API.

*Example*: SQL query: `SELECT * FROM orders WHERE user_id = 5`

---

## R

### React
A JavaScript library for building user interfaces using components.

### Refactor
Improving code structure without changing its behavior. Like reorganizing a closet — things work the same, but it's neater.

### Render
Displaying UI based on data. In React, converting components to DOM elements.

### Repository (Repo)
A project's code and version history, managed by Git.

### REST (REpresentational State Transfer)
An architectural style for APIs using HTTP methods (GET, POST, PUT, DELETE).

*Example*: `GET /api/orders` fetches orders.

### Routing
Determining which code handles a request based on the URL.

*Example*: `/orders` shows the orders page, `/about` shows the about page.

### Runtime
When a program is executing (as opposed to compile time or authoring time).

---

## S

### Server
A computer or program that provides services to clients. Responds to requests.

*Example*: An Express server handling API calls.

### SPA (Single-Page Application)
A web app that loads one HTML page and updates content dynamically (no full page reloads).

*Example*: React app with client-side routing.

### SQL (Structured Query Language)
A language for interacting with relational databases.

*Example*: `INSERT INTO orders (item, quantity) VALUES ('Lemonade', 5)`

### SQLite
A lightweight relational database that stores data in a single file.

### State
Data that changes over time. In React, state determines what's rendered.

*Example*: Order form's current quantity is state.

### Static
Not changing. Static files (HTML, images) are served as-is. Static websites don't have backend logic.

---

## T

### Terminal
A text interface for running commands. Also called command line, shell, or console.

### TypeScript
A superset of JavaScript adding static type checking. Helps catch errors before runtime.

*Example*: `function add(a: number, b: number): number { return a + b; }`

---

## U

### UI (User Interface)
What users see and interact with. Buttons, forms, text, etc.

### URL (Uniform Resource Locator)
A web address. Specifies protocol, domain, and path.

*Example*: `https://example.com/api/orders`

### UX (User Experience)
How users feel when interacting with software. Encompasses usability, accessibility, and delight.

---

## V

### Variable
A named container for storing data that can change.

*Example*: `let quantity = 5;`

### Version Control
A system for tracking changes to files over time. Git is the most popular.

### Vite
A fast build tool for modern web projects. Used with React, Vue, etc.

### Virtual DOM
React's in-memory representation of the DOM. Allows efficient updates by comparing old and new states.

---

## W

### Webpack
A bundler for JavaScript applications (alternative to Vite).

### Web Server
A program that responds to HTTP requests. Serves files or runs backend logic.

---

## X, Y, Z

### XSS (Cross-Site Scripting)
A security vulnerability where attackers inject malicious scripts into web pages.

---

## Metaphors & Analogies

To help remember concepts, here are some useful analogies:

| Concept | Analogy |
|---------|---------|
| Function | Recipe you can reuse |
| Variable | Labeled box that holds something |
| Object | Filing folder with labeled tabs |
| Array | Numbered list |
| Component | LEGO brick (reusable building block) |
| API | Restaurant menu (what you can request) |
| Database | Filing cabinet |
| Cache | Keeping tools on your workbench |
| Git commit | Snapshot of your project |
| Bug | Typo in instructions that causes confusion |

---

## Common Abbreviations

| Abbreviation | Full Term |
|--------------|-----------|
| ADR | Architecture Decision Record |
| API | Application Programming Interface |
| CDN | Content Delivery Network |
| CI/CD | Continuous Integration / Continuous Deployment |
| CLI | Command Line Interface |
| CSS | Cascading Style Sheets |
| DB | Database |
| DOM | Document Object Model |
| HTML | HyperText Markup Language |
| HTTP(S) | HyperText Transfer Protocol (Secure) |
| IDE | Integrated Development Environment |
| JS | JavaScript |
| JSON | JavaScript Object Notation |
| npm | Node Package Manager |
| REST | REpresentational State Transfer |
| SPA | Single-Page Application |
| SQL | Structured Query Language |
| UI | User Interface |
| URL | Uniform Resource Locator |
| UX | User Experience |

---

## Related Resources

- [Architectural Views](architectural-views) — View types (Module, Component-Connector, Allocation)
- [Mental Models](mental-models/protocol-thinking) — Conceptual frameworks
- [Curriculum](curriculum/part-1-foundations/what-software-is) — Where these terms are taught in context

---

## Contributing to the Glossary

This glossary will expand as the curriculum grows. If you encounter a term that's not here:

1. Open a GitHub issue
2. Suggest the term and a beginner-friendly definition
3. Include an example (ideally using the lemonade stand)
