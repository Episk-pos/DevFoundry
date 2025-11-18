# How to Use This Repository

This guide helps you navigate **devfoundry** based on your role, experience level, and learning goals.

---

## Choose Your Path

### 🌱 Total Beginner (No coding experience)

**Start here**: [curriculum/part-1-foundations/01-what-software-is.md](../curriculum/part-1-foundations/01-what-software-is.md)

**Your journey**:
1. Read modules sequentially (01 → 02 → 03 → 04)
2. Don't skip ahead — each module builds on the last
3. Work through examples in [examples/](../examples/)
4. Try exercises marked "Beginner"
5. Use [glossary.md](glossary.md) when you encounter unfamiliar terms

**Time commitment**: ~2-4 hours per module, 16 modules total = **32-64 hours**

**Milestones**:
- Week 4: Build your first CLI app
- Week 8: Understand git and make your first commit
- Week 14: Deploy a fullstack application
- Week 16: Present your final project

---

### 🔧 Some Coding Experience (Know variables, loops, functions)

**Start here**: [curriculum/part-1-foundations/03-web-architecture.md](../curriculum/part-1-foundations/03-web-architecture.md)

You can skim modules 01-02, but **don't skip module 03** — web architecture is crucial.

**Your journey**:
1. Read Part I quickly (review if needed)
2. Slow down for Part II (team practices may be new)
3. Focus on Part III (building with LLMs)
4. Study the architectural diagrams carefully

**Time commitment**: ~20-30 hours

**Focus areas**:
- Architectural views (module, runtime, deployment)
- ADRs and documentation
- LLM-assisted workflows
- Client/server separation

---

### 🏗️ Experienced Developer (Want to learn LLM workflows)

**Start here**: [docs/mental-models/architecture-first.md](mental-models/architecture-first.md)

**Your journey**:
1. Read the mental models docs
2. Study [prompts/02-architecture-first.md](../prompts/02-architecture-first.md)
3. Explore the lemonade stand progression in [examples/](../examples/)
4. Focus on the ADRs in [adr/](../adr/)
5. Try building something with architecture-first prompting

**Time commitment**: ~5-10 hours

**Key takeaways**:
- How to structure prompts for AI assistants
- Using architectural views to communicate with LLMs
- Writing ADRs to keep AI aligned
- Progressive complexity strategies

---

### 👥 Educator/Instructor

**Start here**: [docs/overview.md](overview.md)

**How to use this curriculum**:

**Option 1: Semester Course (16 weeks)**
- Week 1-4: Part I (lectures + labs)
- Week 5-8: Part II (workshops)
- Week 9-14: Part III (project-based)
- Week 15: Part IV (seminar)
- Week 16: Final presentations

**Option 2: Workshop Series (4 × 3-hour sessions)**
- Session 1: Foundations + Team Practices (compressed)
- Session 2: Static Web + SPA
- Session 3: Fullstack Development
- Session 4: Deployment + Wrapup

**Option 3: Self-Paced Online**
- Students work through modules independently
- Weekly check-ins or discussion forums
- Code reviews on exercises
- Final project presentations

**Teaching resources**:
- Each module has learning objectives
- Exercises have multiple difficulty levels
- Diagrams are reusable (Mermaid source included)
- Example projects have step-by-step walkthroughs

---

### 🎯 Project Manager/Non-Technical Stakeholder

**Start here**: [curriculum/part-1-foundations/01-what-software-is.md](../curriculum/part-1-foundations/01-what-software-is.md)

**Your focus**:
1. Part I: Understand what developers are building
2. Part II: Learn team workflows (especially git and ADRs)
3. Part III: See a project evolve (you don't need to code)
4. Skip implementation details, focus on diagrams and concepts

**Time commitment**: ~10-15 hours

**Outcomes**:
- Understand technical discussions in meetings
- Ask better questions of your development team
- Read and create architectural diagrams
- Appreciate why certain things take time
- Communicate more effectively with developers

**Most valuable sections**:
- [docs/glossary.md](glossary.md) — Vocabulary reference
- [docs/architectural-views.md](architectural-views.md) — How to read diagrams
- [adr/](../adr/) — Understanding design decisions
- [curriculum/part-2-team-practices/](../curriculum/part-2-team-practices/) — Workflows

---

## Repository Navigation

### Directory Structure

```
devfoundry/
├── README.md                    # Start here — vision and navigation
│
├── docs/                        # Conceptual foundations
│   ├── overview.md              # Full curriculum roadmap
│   ├── how-to-use-this-repo.md  # You are here!
│   ├── glossary.md              # Software vocabulary
│   ├── diagram-standards.md     # How to read diagrams
│   ├── architectural-views.md   # Views & Beyond framework
│   └── mental-models/           # Deep dives on key concepts
│
├── curriculum/                  # Sequential learning modules
│   ├── part-1-foundations/      # Modules 01-04
│   ├── part-2-team-practices/   # Modules 05-08
│   ├── part-3-llm-development/  # Modules 09-10
│   ├── part-4-historical-context/ # Module 11
│   └── final-project.md         # Capstone project
│
├── examples/                    # Working code with explanations
│   ├── 00-hello-world-console/  # Simplest possible program
│   ├── 01-lemonade-cli/         # Stage 1: Terminal app
│   ├── 02-lemonade-static-web/  # Stage 2: HTML/CSS/JS
│   ├── 03-lemonade-spa/         # Stage 3: React app
│   ├── 04-lemonade-fullstack/   # Stage 4: Frontend + backend
│   └── 05-lemonade-deployed/    # Stage 5: Production-ready
│
├── exercises/                   # Hands-on practice
│   ├── dom-basics.md
│   ├── routing-basics.md
│   └── ...
│
├── prompts/                     # LLM prompt templates
│   ├── 01-getting-started.md
│   ├── 02-architecture-first.md
│   └── ...
│
└── adr/                         # Architecture Decision Records
    ├── README.md
    ├── template.md
    └── 000X-decision-name.md
```

---

## Understanding the Lemonade Stand Progression

The **lemonade stand** is the vehicle for learning throughout this curriculum. Here's what each stage teaches:

### Stage 0: Hello World
**File**: `examples/00-hello-world-console/`
**Concepts**: What is a program? Input, output, execution
**Time**: 15-30 minutes

### Stage 1: CLI
**File**: `examples/01-lemonade-cli/`
**Concepts**: User input, calculations, basic logic
**Time**: 1-2 hours

### Stage 2: Static Web
**File**: `examples/02-lemonade-static-web/`
**Concepts**: HTML structure, CSS styling, DOM manipulation, event handlers
**Time**: 3-4 hours

### Stage 3: SPA
**File**: `examples/03-lemonade-spa/`
**Concepts**: React components, state management, client-side routing, build tools
**Time**: 6-8 hours

### Stage 4: Fullstack
**File**: `examples/04-lemonade-fullstack/`
**Concepts**: REST APIs, client/server separation, database persistence, authentication
**Time**: 8-10 hours

### Stage 5: Deployed
**File**: `examples/05-lemonade-deployed/`
**Concepts**: Hosting, environment variables, CI/CD, production concerns
**Time**: 2-3 hours

**Total time**: ~20-30 hours of hands-on work

---

## How to Read Diagrams

All diagrams in this repo use **Mermaid** syntax. They render automatically on GitHub.

### Three Views, Three Purposes

Every major example includes three diagrams:

**1. Module View** (Static Structure)
```
Shows files, folders, and imports
Answer: "What code exists and how is it organized?"
```

**2. Component-Connector View** (Runtime Behavior)
```
Shows data flow and interactions
Answer: "What happens when the program runs?"
```

**3. Allocation View** (Deployment)
```
Shows where code runs (browser vs server)
Answer: "What infrastructure is needed?"
```

See [docs/diagram-standards.md](diagram-standards.md) for details on notation and [docs/architectural-views.md](architectural-views.md) for when to use each view.

---

## Working with Examples

Each example directory contains:

```
example-name/
├── README.md          # What's new, walkthrough, exercises
├── architecture.md    # Architectural decisions (if complex)
├── diagram.svg        # Or embedded Mermaid in README
├── src/               # Source code
├── package.json       # Dependencies (if applicable)
└── ...
```

### How to use examples:

**Option 1: Read and Understand**
- Read the README
- Study the diagrams
- Trace through the code
- Don't run anything yet

**Option 2: Run and Explore**
- Clone the repo
- `cd` into the example
- Follow setup instructions in README
- Run the code
- Make small changes and observe results

**Option 3: Build It Yourself**
- Read the README but not the code
- Try building it yourself
- Use the prompt templates in [prompts/](../prompts/)
- Compare your solution to the example

---

## Working with Exercises

Exercises are located in [exercises/](../exercises/). Each exercise has:

- **Learning objective**: What you'll practice
- **Prerequisites**: Which modules to complete first
- **Difficulty levels**: Beginner / Intermediate / Advanced
- **Starter code**: (sometimes) A scaffold to build on
- **Solution**: (sometimes) Reference implementation

### How to approach exercises:

1. **Read the learning objective** — Understand what skill you're practicing
2. **Check prerequisites** — Make sure you've covered the concepts
3. **Try it yourself first** — Struggle is part of learning
4. **Use LLM assistance** — Use prompt templates from [prompts/](../prompts/)
5. **Compare with solution** — Check your approach (if solution provided)
6. **Iterate** — Try a different approach or add stretch goals

---

## Using LLM Prompt Templates

The [prompts/](../prompts/) directory contains templates for working with AI assistants.

### When to use each template:

| Template | Use When |
|----------|----------|
| `01-getting-started.md` | First time using an AI coding assistant |
| `02-architecture-first.md` | Starting a new feature or project |
| `03-debugging.md` | Something isn't working |
| `04-reading-code.md` | Exploring unfamiliar code |
| `05-designing-features.md` | Planning a new feature |
| `06-iterative-refinement.md` | Improving existing code |

### How to use templates:

1. Open the template file
2. Read the guidance section
3. Fill in the `[PLACEHOLDERS]` with your specifics
4. Copy the completed prompt to your AI assistant
5. Iterate based on the response

**Key insight**: Architecture-first prompting works because you give the AI:
- Context (what already exists)
- Constraints (what's required)
- Structure (how it should fit)
- Vocabulary (shared terms)

---

## Using ADRs (Architecture Decision Records)

ADRs document "why" decisions were made. They're in [adr/](../adr/).

### When to write an ADR:

- Choosing a framework (React vs Vue)
- Picking a database (SQL vs NoSQL)
- Deciding on authentication (JWT vs sessions)
- Selecting a deployment platform (Vercel vs AWS)
- Establishing coding conventions (tabs vs spaces)

### When NOT to write an ADR:

- Trivial choices with no long-term impact
- Implementation details (how to name a variable)
- Obvious choices with no alternatives

### How to write an ADR:

1. Copy [adr/template.md](../adr/template.md)
2. Fill in the sections:
   - **Status**: Proposed, Accepted, Deprecated
   - **Context**: What problem are we solving?
   - **Decision**: What did we choose?
   - **Consequences**: What are the tradeoffs?
3. Number it sequentially (0001, 0002, etc.)
4. Commit it to the repo

**For LLM workflows**: ADRs help AI assistants understand project constraints and make consistent suggestions.

---

## Getting Unstuck

### "I don't understand a concept"

1. Check the [glossary](glossary.md)
2. Re-read the relevant module slowly
3. Study the diagrams — draw them yourself
4. Look at the example code
5. Ask an AI assistant (use `prompts/04-reading-code.md`)

### "The code doesn't work"

1. Read the error message carefully
2. Check the README for setup instructions
3. Verify prerequisites are installed (Node, npm, etc.)
4. Use `prompts/03-debugging.md` with an AI assistant
5. Open a GitHub issue with details

### "This is too hard"

1. Go back one module — shore up foundations
2. Focus on concepts, not implementation
3. Skip exercises and just read
4. Take breaks — learning takes time
5. You're not alone — this is challenging material

### "This is too easy"

1. Skip to Part III (LLM-assisted development)
2. Try the "Advanced" exercises
3. Build your final project early
4. Contribute improvements to this repo

---

## Contributing

We welcome contributions! See CONTRIBUTING.md (coming soon) for guidelines.

**Easy contributions**:
- Fix typos or clarify confusing explanations
- Add more exercises
- Improve diagrams
- Translate content

**Medium contributions**:
- Add new examples (e.g., alternative implementations)
- Write additional prompt templates
- Create video walkthroughs

**Advanced contributions**:
- Add new modules (e.g., testing deep dive)
- Port examples to other frameworks (Vue, Svelte)
- Create interactive exercises

---

## Next Steps

Choose your path:

- **Total beginner**: [curriculum/part-1-foundations/01-what-software-is.md](../curriculum/part-1-foundations/01-what-software-is.md)
- **Some experience**: [curriculum/part-1-foundations/03-web-architecture.md](../curriculum/part-1-foundations/03-web-architecture.md)
- **Experienced dev**: [docs/mental-models/architecture-first.md](mental-models/architecture-first.md)
- **Educator**: [docs/overview.md](overview.md)
- **Non-technical**: [docs/glossary.md](glossary.md) + [Part II](../curriculum/part-2-team-practices/)

Still not sure? Read [docs/overview.md](overview.md) for the full curriculum structure.
