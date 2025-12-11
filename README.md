# devfoundry

**Software as Accessible Leverage: A Curriculum for Building in the AI Age**

---

## The Thesis

**Software is the most accessible form of leverage ever created.**

With modern AI tools and decades of open-source infrastructure, any individual can become a software company. One person. A computer. An internet connection. That's the startup cost.

The barrier to entry isn't capital or connections. **The barrier is understanding.**

If you've never been inside a software company, you might not know: the nature of the process, how we think about solving problems, what patterns we apply, what tools are at our disposal — *what's even possible*.

DevFoundry exists to close that gap.

> *Read the full [DevFoundry Thesis](docs/thesis.md)*

---

## What is devfoundry?

**devfoundry** is an educational repository and community designed to teach software architecture, systems thinking, and AI-assisted development to anyone willing to learn — from total beginners to experienced engineers, from mechanical engineers to videographers, from project managers to self-taught developers.

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

- ✓ **Mental models** for understanding software systems
- ✓ **Architectural thinking** before implementation details
- ✓ **Vocabulary** to communicate with teams and AI assistants
- ✓ **Progressive complexity** from CLI apps → web apps → fullstack → deployment
- ✓ **Real-world practices** like version control, ADRs, and testing
- ✓ **LLM-assisted workflows** that amplify your design thinking

---

## Repository Structure

```
devfoundry/
├── docs/               # Core concepts, mental models, glossary
│   └── mental-models/  # Protocol thinking, friction to opportunity, etc.
├── curriculum/         # Structured learning modules (Parts I-IV)
├── examples/           # Progressive lemonade stand implementations
├── exercises/          # Hands-on practice activities
├── prompts/            # LLM prompt templates and strategies
├── adr/                # Architecture Decision Records
└── community/          # Problems, projects, and collaboration
    ├── problems/       # Friction documented by the community
    ├── projects/       # Active work being built
    ├── showcases/      # Completed projects and stories
    └── resources/      # Curated tools and materials
```

### Quick Navigation

| I want to...                          | Go here                                      |
|---------------------------------------|----------------------------------------------|
| Understand the core thesis            | [docs/thesis.md](docs/thesis.md)             |
| Understand the curriculum roadmap     | [docs/overview.md](docs/overview.md)         |
| Learn how to use this repo            | [docs/how-to-use-this-repo.md](docs/how-to-use-this-repo.md) |
| Look up software terms                | [docs/glossary.md](docs/glossary.md)         |
| Understand the philosophy             | [docs/mental-models/](docs/mental-models/)   |
| Learn protocol thinking               | [docs/mental-models/protocol-thinking.md](docs/mental-models/protocol-thinking.md) |
| Turn friction into opportunity        | [docs/mental-models/friction-to-opportunity.md](docs/mental-models/friction-to-opportunity.md) |
| Start learning (total beginner)       | [curriculum/part-1-foundations/](curriculum/part-1-foundations/) |
| See working code examples             | [examples/](examples/)                       |
| Get LLM prompt templates              | [prompts/](prompts/)                         |
| Understand design decisions           | [adr/](adr/)                                 |
| Join the community                    | [community/](community/)                     |
| Share a problem to solve              | [community/problems/](community/problems/)   |
| See what others are building          | [community/projects/](community/projects/)   |

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

## Community

DevFoundry isn't just a curriculum — it's a community of people building software together.

### What We Do

- **Collect problems** — Document friction that people want solved
- **Build in public** — Share the journey, not just the result
- **Learn together** — Help each other level up
- **Create value** — Build things that help real people

### Get Involved

- Browse [community/problems/](community/problems/) to see what friction others have noticed
- Share your own friction — the unique things *you* notice are your superpower
- Pick a problem and start building — small is fine, start somewhere
- Share what you learn — your journey helps others

> *See the full [Community Guide](community/README.md)*

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

### 7. Protocols Are Everywhere
The world is full of protocols — rules governing how actors interact. Broken things are usually broken protocols. Learning to see protocols gives you "bits to think with" that transfer far beyond software.

### 8. Friction Is Opportunity
Every frustration is a potential solution waiting to be built. Your unique perspective helps you notice friction that others miss. Software gives you the leverage to address it.

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

**Understand the vision:**
- [docs/thesis.md](docs/thesis.md) — Why software is accessible leverage
- [docs/mental-models/protocol-thinking.md](docs/mental-models/protocol-thinking.md) — See systems as protocols
- [docs/mental-models/friction-to-opportunity.md](docs/mental-models/friction-to-opportunity.md) — Turn problems into solutions

**Learn to build:**
- [docs/overview.md](docs/overview.md) — See the full curriculum roadmap
- [curriculum/part-1-foundations/01-what-software-is.md](curriculum/part-1-foundations/01-what-software-is.md) — Begin learning

**Join the community:**
- [community/](community/) — Connect with others building software
- [community/problems/](community/problems/) — See what needs solving

---

**Built for people who want to understand systems, build solutions, and create value — together.**
