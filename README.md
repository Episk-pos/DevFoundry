# devfoundry

**Flow-Based Development: A Curriculum for Modern Software Architecture**

---

## What is devfoundry?

**devfoundry** is an educational repository designed to teach software architecture, systems thinking, and AI-assisted development to a diverse audience — from total beginners to experienced engineers, from mechanical engineers to videographers, from project managers to self-taught developers.

This isn't just a coding tutorial. It's a **mental model builder** that teaches you to think about software the way professional architects do: as systems of collaborating components, flowing data, and conscious design decisions.

### Why "Flow-Based Development"?

Traditional programming education starts with syntax and algorithms. We start with **flow**:

- How does an idea become an architecture?
- How does architecture become behavior?
- How does behavior become code?
- How do components collaborate?
- How does data flow through a system?

When you understand flow, you can work effectively with AI coding assistants (Claude Code, Cursor, GitHub Copilot, etc.) because you can **describe what you want in architectural terms** rather than struggling with syntax.

---

## Who is this for?

### You should explore devfoundry if you:

- Want to build software but feel overwhelmed by "learn to code" tutorials
- Have some coding experience but struggle to design complete systems
- Work with software teams and want to understand how systems are built
- Want to use AI coding assistants effectively (not just copy-paste)
- Are curious about how modern web applications work
- Need to communicate with developers and want shared vocabulary
- Are teaching software architecture and want a progressive curriculum

### You'll learn:

✓ **Mental models** for understanding software systems
✓ **Architectural thinking** before implementation details
✓ **Vocabulary** to communicate with teams and AI assistants
✓ **Progressive complexity** from CLI apps → web apps → fullstack → deployment
✓ **Real-world practices** like version control, ADRs, and testing
✓ **LLM-assisted workflows** that amplify your design thinking

---

## Repository Structure

```
devfoundry/
├── docs/               # Core concepts, mental models, glossary
├── curriculum/         # Structured learning modules (Parts I-IV)
├── examples/           # Progressive lemonade stand implementations
├── exercises/          # Hands-on practice activities
├── prompts/            # LLM prompt templates and strategies
└── adr/                # Architecture Decision Records
```

### Quick Navigation

| I want to...                          | Go here                                      |
|---------------------------------------|----------------------------------------------|
| Understand the curriculum roadmap     | [docs/overview.md](docs/overview.md)         |
| Learn how to use this repo            | [docs/how-to-use-this-repo.md](docs/how-to-use-this-repo.md) |
| Look up software terms                | [docs/glossary.md](docs/glossary.md)         |
| Understand the philosophy             | [docs/mental-models/](docs/mental-models/)   |
| Start learning (total beginner)       | [curriculum/part-1-foundations/](curriculum/part-1-foundations/) |
| See working code examples             | [examples/](examples/)                       |
| Get LLM prompt templates              | [prompts/](prompts/)                         |
| Understand design decisions           | [adr/](adr/)                                 |

---

## The Learning Path

### Part I: Foundations of Software Systems

Build mental models for understanding what software is made of, how web architecture works, and what tools professional developers use.

**Key milestone**: Understand enough to ask meaningful questions to AI assistants.

### Part II: How Teams Build Software

Learn UX/UI fundamentals, version control, collaboration workflows, and Architecture Decision Records.

**Key milestone**: Understand how professional teams organize and communicate.

### Part III: LLM-Assisted Development

Use AI assistants to build a real application, progressing from static HTML to a deployed fullstack app.

**Key milestone**: Build a complete application using architecture-first prompting.

### Part IV: Historical Context

Understand why modern architectures look the way they do (CGI → AJAX → SPAs → WASM).

**Key milestone**: Contextualize your knowledge in the evolution of the web.

---

## The Lemonade Stand Journey

Throughout this curriculum, you'll build and evolve a single application: **a lemonade stand**. This simple concept grows in sophistication:

1. **CLI version** — Terminal input/output, basic logic
2. **Static web version** — HTML/CSS/JS, DOM manipulation
3. **SPA version** — React components, client-side routing, state management
4. **Fullstack version** — Express backend, REST API, database persistence
5. **Deployed version** — Live on the internet with CI/CD

By the end, you'll understand:
- Why each architectural evolution was necessary
- What tradeoffs were made at each stage
- How to explain the system to both humans and AI assistants
- How to make your own architectural decisions

---

## Philosophy & Principles

This curriculum is built on these core beliefs:

### 1. Architecture Before Implementation
Understanding *what* you're building and *why* is more important than knowing syntax. AI can generate code; you need to generate clarity.

### 2. Multiple Perspectives
Every system can be viewed from multiple angles (module structure, runtime behavior, deployment). Professional architects switch between views fluidly.

### 3. Progressive Complexity
Start simple. Add complexity only when the mental scaffolding is in place. Every new concept builds on previous understanding.

### 4. Vocabulary Matters
Shared language enables collaboration. Learning the right terms unlocks communication with teams, documentation, and AI assistants.

### 5. Real-World Alignment
This curriculum reflects how modern software is actually built: version control, testing, documentation, deployment, iteration.

### 6. LLMs as Amplifiers
AI coding assistants work best when you provide architectural context, constraints, and clear specifications. This curriculum teaches you to do that.

---

## Using This Repository

### For Self-Directed Learners

1. Read [docs/overview.md](docs/overview.md) to understand the full curriculum
2. Start with [curriculum/part-1-foundations/01-what-software-is.md](curriculum/part-1-foundations/01-what-software-is.md)
3. Follow the modules sequentially
4. Work through examples in [examples/](examples/)
5. Try exercises in [exercises/](exercises/)
6. Use prompt templates in [prompts/](prompts/) when working with AI assistants

### For Educators

This repository can be used as:
- A semester-long course (16 weeks, one module per week)
- A workshop series (4 workshops, one part per session)
- Self-paced online curriculum
- Supplementary material for software engineering courses

Each module includes:
- Learning objectives
- Core concepts with diagrams
- Hands-on examples
- Exercises with multiple difficulty levels
- LLM prompt templates
- Stretch goals

### For Teams

Use this as onboarding material for:
- Non-technical stakeholders learning to collaborate with developers
- Junior developers learning architectural thinking
- Teams adopting AI-assisted development workflows

---

## Contributing

This curriculum is under active development. We welcome:

- Suggestions for clarity improvements
- Additional examples and exercises
- Translations
- Accessibility improvements
- Diagram refinements

Please open an issue or submit a pull request.

---

## Technology Choices

This curriculum uses:

- **Frontend**: TypeScript, React, Vite
- **Backend**: Node.js, Express
- **Database**: SQLite (for learning)
- **Testing**: Vitest
- **Diagrams**: Mermaid (renders on GitHub)

All choices are documented in [adr/](adr/) with rationale.

---

## License

- **Code examples**: AGPLv3 (see [LICENSE](LICENSE))
- **Curriculum content**: CC BY 4.0

You are free to use, adapt, and share this material with attribution.

---

## Getting Started

Ready to begin? Start here:

👉 **[docs/overview.md](docs/overview.md)** — See the full curriculum roadmap
👉 **[docs/how-to-use-this-repo.md](docs/how-to-use-this-repo.md)** — Learn how to navigate
👉 **[curriculum/part-1-foundations/01-what-software-is.md](curriculum/part-1-foundations/01-what-software-is.md)** — Begin learning

---

**Built with ❤️ for learners who want to understand systems, not just memorize syntax.**
