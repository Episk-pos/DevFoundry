# Module 05: Build Tools and Modern Development

**Understanding the JavaScript ecosystem toolchain**

---

## Introduction

In Module 04, we used these commands without explanation:

```bash
npm init -y
npm install typescript ts-node --save-dev
npx tsc --init
npx ts-node src/index.ts
```

Now it's time to understand what they actually do.

Modern JavaScript development involves a collection of tools that:
- Manage dependencies (libraries your code uses)
- Transform code (TypeScript → JavaScript, new syntax → old syntax)
- Bundle files (combine many files into fewer files)
- Run development servers (auto-reload on changes)

This module explains these tools **conceptually** — what problems they solve and why they exist. You don't need to memorize every option; you need to understand the ecosystem well enough to:
- Read and modify configuration files
- Know which tool to reach for when
- Understand error messages
- Ask AI assistants informed questions

---

## The Problem: JavaScript Wasn't Designed for This

JavaScript was created in 1995 for small scripts in web pages:

```html
<script>
  alert("Hello!");
</script>
```

No modules. No packages. No build step. Just code that runs directly in the browser.

Today's JavaScript applications have:
- Thousands of files
- Hundreds of dependencies
- TypeScript or other languages that compile to JS
- Code that needs to work in old browsers
- Complex build and deployment pipelines

The tools in this module bridge that gap.

---

## 📐 Concept: Package Managers

A **package manager** handles:
- Installing external code (libraries, frameworks)
- Managing versions (which version of each library)
- Tracking dependencies (what depends on what)
- Scripts (common commands for your project)

### 🔷 npm (Node Package Manager)

npm is the default package manager for Node.js. It comes installed with Node.

**Key commands:**

```bash
# Initialize a new project (creates package.json)
npm init

# Install a package (adds to dependencies)
npm install lodash

# Install a dev-only package (adds to devDependencies)
npm install typescript --save-dev

# Install all dependencies from package.json
npm install

# Run a script defined in package.json
npm run build

# Run a package binary without installing globally
npx tsc --init
```

### 🔷 Alternative: yarn and pnpm

Other package managers exist with different tradeoffs:

| Manager | Strengths |
|---------|-----------|
| npm | Default, ubiquitous, good enough |
| yarn | Faster installs, better monorepo support |
| pnpm | Disk space efficient, strict by default |

For learning, npm is fine. Switch later if you have a reason.

> **Go Deeper**: [npm documentation](https://docs.npmjs.com/) covers all commands and options.

---

## 📐 Concept: The package.json File

`package.json` is your project's manifest. It defines:

```json
{
  "name": "my-project",
  "version": "1.0.0",
  "description": "What this project does",

  "main": "dist/index.js",
  "scripts": {
    "start": "node dist/index.js",
    "build": "tsc",
    "dev": "ts-node src/index.ts",
    "test": "jest"
  },

  "dependencies": {
    "express": "^4.18.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "@types/express": "^4.17.0"
  }
}
```

### Key Sections

| Section | Purpose |
|---------|---------|
| `name`, `version` | Identity of your package |
| `main` | Entry point when others import your package |
| `scripts` | Commands you can run with `npm run <name>` |
| `dependencies` | Packages needed to run your code |
| `devDependencies` | Packages needed only for development |

### Dependencies vs DevDependencies

```json
{
  "dependencies": {
    "express": "^4.18.0"      // Needed at runtime
  },
  "devDependencies": {
    "typescript": "^5.0.0",   // Only needed to build
    "jest": "^29.0.0"         // Only needed to test
  }
}
```

Rule of thumb:
- **dependencies**: Your running application needs this
- **devDependencies**: Only developers/build process needs this

### Version Syntax

```
^4.18.0   → Compatible with 4.18.0 (allows 4.18.1, 4.19.0, not 5.0.0)
~4.18.0   → Approximately 4.18.0 (allows 4.18.1, not 4.19.0)
4.18.0    → Exactly 4.18.0
*         → Any version (dangerous!)
```

The `^` prefix is most common — it allows non-breaking updates.

---

## 📐 Concept: The node_modules Directory

When you run `npm install`, packages are downloaded to `node_modules/`:

```
my-project/
├── node_modules/
│   ├── typescript/
│   ├── express/
│   ├── lodash/
│   └── ... (potentially thousands of folders)
├── package.json
└── package-lock.json
```

### Important Facts

1. **Never commit node_modules** — It's huge and can be regenerated
2. **package-lock.json locks versions** — Ensures everyone gets exact same versions
3. **Delete and reinstall when confused** — `rm -rf node_modules && npm install`

### Why So Many Packages?

Your direct dependencies have their own dependencies. For example:

```
Your project
└── express (you installed this)
    ├── accepts
    ├── body-parser
    │   ├── bytes
    │   ├── content-type
    │   └── ...
    └── ... (30+ more)
```

This is normal. A project with 5 direct dependencies might have 500 in node_modules.

---

## 📐 Concept: Compilers and Transpilers

A **compiler** transforms source code into a different form.

In JavaScript world, common transformations:
- TypeScript → JavaScript
- Modern JS → Older JS (for browser compatibility)
- JSX → JavaScript (React)

### 🔷 TypeScript Compiler (tsc)

The TypeScript compiler:
1. Checks types (finds errors)
2. Emits JavaScript (removes type annotations)

```bash
# Check types without emitting
npx tsc --noEmit

# Compile to JavaScript
npx tsc
```

Configuration lives in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2020",        // What JS version to output
    "module": "commonjs",       // Module system to use
    "strict": true,             // Enable strict type checking
    "outDir": "./dist",         // Where to put compiled JS
    "rootDir": "./src"          // Where source TS lives
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

### 🔷 ts-node

`ts-node` runs TypeScript directly without a separate compile step:

```bash
# Instead of:
npx tsc && node dist/index.js

# You can:
npx ts-node src/index.ts
```

Great for development, but for production you typically compile first.

### 🔷 Babel

Babel transforms modern JavaScript to older versions:

```javascript
// Modern (ES2020)
const greet = (name) => `Hello, ${name}!`;

// Babel output (ES5, for old browsers)
var greet = function greet(name) {
  return "Hello, " + name + "!";
};
```

Babel is often used alongside TypeScript — TypeScript handles types, Babel handles other transformations.

> **Go Deeper**: [TypeScript Compiler Options](https://www.typescriptlang.org/tsconfig) documents every tsconfig.json option.

---

## 📐 Concept: Bundlers

A **bundler** combines many JavaScript files into fewer files.

Why bundle?
- Browsers historically couldn't handle many file requests
- Dependencies need to be included
- Code can be optimized (minified, tree-shaken)

### 🔷 Common Bundlers

| Bundler | Characteristics |
|---------|-----------------|
| webpack | Powerful, complex, highly configurable |
| Vite | Fast, modern, great developer experience |
| esbuild | Extremely fast, less configurable |
| Rollup | Good for libraries |
| Parcel | Zero-config approach |

For new projects, **Vite** is often the best choice — fast and easy to configure.

### What Bundlers Do

```
Before bundling:
src/
├── index.ts
├── menu.ts
├── order.ts
└── display.ts
+ node_modules/lodash/...
+ node_modules/express/...

After bundling:
dist/
└── bundle.js  (single file with everything)
```

The bundler:
1. Starts at your entry point (index.ts)
2. Follows all imports
3. Combines everything into output file(s)
4. Optionally minifies (removes whitespace, shortens names)

### Tree Shaking

Modern bundlers do **tree shaking** — removing unused code:

```javascript
// lodash has hundreds of functions
import { debounce } from 'lodash';

// Tree shaking: only debounce ends up in the bundle,
// not the other 99% of lodash you didn't use
```

---

## 📐 Concept: Development Servers

A **dev server** provides:
- Local web server for your files
- Hot reload (updates without full refresh)
- Automatic recompilation on changes

### 🔷 Vite Dev Server

```bash
npm create vite@latest my-app
cd my-app
npm install
npm run dev
```

Now `http://localhost:5173` shows your app, and changes appear instantly.

### 🔷 Other Options

| Tool | Use Case |
|------|----------|
| `npx serve` | Static file server (no processing) |
| `nodemon` | Restarts Node.js on file changes |
| webpack-dev-server | Webpack's dev server |
| Vite | Modern, fast, recommended |

---

## 📐 Concept: Linters and Formatters

**Linters** find potential problems in your code.
**Formatters** automatically fix code style.

### 🔷 ESLint (Linter)

```bash
npm install eslint --save-dev
npx eslint --init
```

ESLint checks for:
- Unused variables
- Missing semicolons (if configured)
- Potential bugs
- Style violations

Configuration in `.eslintrc.json` or `eslint.config.js`.

### 🔷 Prettier (Formatter)

```bash
npm install prettier --save-dev
npx prettier --write .
```

Prettier enforces consistent style:
- Indentation
- Quote style
- Line length
- Trailing commas

Configuration in `.prettierrc`.

### Using Together

ESLint finds problems. Prettier fixes formatting. Use both:

```json
{
  "scripts": {
    "lint": "eslint src/",
    "format": "prettier --write src/"
  }
}
```

> **Go Deeper**: [ESLint Rules](https://eslint.org/docs/rules/) and [Prettier Options](https://prettier.io/docs/en/options.html)

---

## Putting It Together: A Modern Project

Here's how tools work together in a typical TypeScript project:

```
┌─────────────────────────────────────────────────────────────────┐
│                        DEVELOPMENT                              │
│                                                                 │
│  src/*.ts  ──────▶  TypeScript   ──────▶  Type errors          │
│                     (checking)            shown in editor       │
│                                                                 │
│  src/*.ts  ──────▶  ESLint       ──────▶  Lint warnings        │
│                     (linting)             shown in editor       │
│                                                                 │
│  src/*.ts  ──────▶  Prettier     ──────▶  Files formatted      │
│                     (formatting)          on save               │
│                                                                 │
│  npm run dev ────▶  Vite         ──────▶  localhost:5173       │
│                     (dev server)          hot reload            │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                        PRODUCTION BUILD                         │
│                                                                 │
│  npm run build ──▶  TypeScript   ──────▶  dist/*.js            │
│                     (compile)                                   │
│                          │                                      │
│                          ▼                                      │
│                     Bundler      ──────▶  dist/bundle.js       │
│                     (combine)             (minified)            │
└─────────────────────────────────────────────────────────────────┘
```

---

## Common Configurations

### Minimal TypeScript CLI Project

```
my-cli/
├── src/
│   └── index.ts
├── package.json
├── tsconfig.json
└── .gitignore
```

**package.json:**
```json
{
  "name": "my-cli",
  "scripts": {
    "start": "ts-node src/index.ts",
    "build": "tsc",
    "typecheck": "tsc --noEmit"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "ts-node": "^10.9.0",
    "@types/node": "^20.0.0"
  }
}
```

### Vite + TypeScript Web Project

```bash
npm create vite@latest my-web-app -- --template vanilla-ts
```

This scaffolds a complete project with:
- TypeScript configured
- Vite as bundler and dev server
- Hot reload working
- Build script ready

### React + TypeScript Project

```bash
npm create vite@latest my-react-app -- --template react-ts
```

Adds React on top of the Vite foundation.

---

## Exercise 1: Explore package.json

Open `examples/03-lemonade-cli-typescript/package.json`.

1. What scripts are defined?
2. What are the devDependencies?
3. Why aren't there any regular dependencies?

<details>
<summary>Solution</summary>

1. Scripts: `start`, `build`, `typecheck`
2. DevDependencies: `typescript`, `ts-node`, `@types/node`
3. No runtime dependencies because this example doesn't use any external libraries — just Node.js built-ins and our own code. TypeScript and ts-node are only needed for development/build, not when running the compiled JavaScript.

</details>

---

## Exercise 2: Understand the Build

Run these commands in the lemonade-cli-typescript example:

```bash
cd examples/03-lemonade-cli-typescript
npm install
npm run build
ls dist/
```

1. What files were created in `dist/`?
2. Open one of them — how does it differ from the `.ts` source?
3. Run the built code: `node dist/index.js 1:2`

<details>
<summary>Solution</summary>

1. `dist/` contains `.js` files corresponding to each `.ts` file in `src/`
2. The `.js` files have:
   - No type annotations (they're stripped)
   - No interfaces or type definitions
   - Import/export syntax may differ based on module setting
3. The built code runs the same as the TypeScript source

The TypeScript compiler converted your typed code to plain JavaScript that Node.js can run directly.

</details>

---

## Exercise 3: Break the Build

In `src/order.ts`, introduce a type error:

```typescript
export function calculateSubtotal(items: OrderItem[]): string {  // Changed to string!
  return items.reduce((sum, item) => sum + item.subtotal, 0);
}
```

Now run:
```bash
npm run typecheck
npm run build
```

What happens? What's the difference between the two commands?

<details>
<summary>Solution</summary>

Both commands show the type error:
```
error TS2322: Type 'number' is not assignable to type 'string'.
```

Difference:
- `typecheck` (`tsc --noEmit`) — Only checks types, creates no files
- `build` (`tsc`) — Checks types AND creates output files

In strict mode, both fail on type errors. The `typecheck` script is faster for quick validation.

</details>

---

## Exercise 4: Add a Script

Add a new script to `package.json` that runs the app with a default order:

```json
{
  "scripts": {
    "demo": "ts-node src/index.ts 1:2 2:1 4:3"
  }
}
```

Run it with `npm run demo`.

<details>
<summary>Solution</summary>

Add the script to the `scripts` section and run:
```bash
npm run demo
```

This shows how scripts can encode common commands. Teams often have scripts like:
- `npm run dev` — Start development server
- `npm run test` — Run tests
- `npm run lint` — Check code style
- `npm run demo` — Run with sample data

</details>

---

## When Things Go Wrong

### "Module not found"

```
Error: Cannot find module 'lodash'
```

Solution: `npm install lodash`

### "Types not found"

```
Could not find a declaration file for module 'express'
```

Solution: `npm install @types/express --save-dev`

Many npm packages need separate type definitions from `@types/*`.

### "Version conflict"

```
npm ERR! peer dep missing: react@^17.0.0
```

Solution: Check version requirements, may need to update or downgrade packages.

### "Just reinstall everything"

When truly confused:

```bash
rm -rf node_modules package-lock.json
npm install
```

This gives you a fresh start.

---

## What We Skipped (For Now)

| Topic | What It Is | When You'll Need It |
|-------|-----------|---------------------|
| Monorepos | Multiple packages in one repo | Large projects, shared code |
| CI/CD | Automated testing and deployment | Team projects, production |
| Testing frameworks | Jest, Vitest, etc. | Any serious project |
| Environment variables | Configuration for different environments | APIs, secrets |
| Docker | Containerization | Deployment, consistency |

These are important but beyond the scope of foundations.

> **Go Deeper**: [The Modern JavaScript Tutorial](https://javascript.info/) covers many advanced topics.

---

## Key Takeaways

1. **npm manages packages** — `npm install`, `npm run`, and `package.json` are your daily tools

2. **node_modules is generated** — Never commit it, regenerate with `npm install`

3. **TypeScript compiles to JavaScript** — Types are stripped, code is transformed

4. **Bundlers combine files** — For browsers, many files become few

5. **Dev servers enable hot reload** — Fast feedback during development

6. **Linters and formatters ensure quality** — Catch problems and enforce style

7. **Configuration is mostly JSON** — `package.json`, `tsconfig.json`, `.eslintrc.json`

8. **When confused, read error messages** — They usually tell you what to install or fix

---

## What's Next

- **Module 06: React Foundations** — Component-based UI development
- **[Example: Lemonade Stand (React)](../examples/04-lemonade-react/)** — Same app, new architecture

---

*Build tools exist to solve real problems. You don't need to master them all — understand what they do, and reach for them when needed.*
