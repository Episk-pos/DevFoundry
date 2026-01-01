---
sidebar_position: 3
title: "Git and Collaboration"
description: "Version control fundamentals — tracking changes, branching, and working with others"
---

# Module 09: Git and Collaboration

**Version control fundamentals — tracking changes, branching, and working with others**

---

## Learning Objectives

By the end of this module, you will:

- Understand why version control is essential
- Use git's core commands confidently
- Create and merge branches
- Collaborate through pull requests
- Resolve merge conflicts
- Apply branching strategies appropriate to your context

**Time**: 3-4 hours (reading + hands-on practice)

---

## Introduction

Imagine writing a novel where:
- You can't undo anything
- If you want to try a different ending, you lose the current one
- Collaborating means emailing files named `novel_final_v2_REAL_final.docx`

This was software development before version control.

**Git** is the industry-standard version control system. It provides:
- Complete history of every change
- Ability to work on multiple versions simultaneously
- Safe collaboration without overwriting each other's work
- A way to undo mistakes

This module teaches git from the mental model up, not just commands to memorize.

---

## Part 1: The Mental Model

### What Git Actually Does

Git tracks **snapshots** of your project over time.

```
Time →
┌─────┐    ┌─────┐    ┌─────┐    ┌─────┐
│ v1  │───▶│ v2  │───▶│ v3  │───▶│ v4  │  (current)
└─────┘    └─────┘    └─────┘    └─────┘

Each box is a "commit" — a snapshot of all files at that moment
```

You can:
- Go back to any previous snapshot
- See what changed between snapshots
- Create parallel versions (branches)
- Merge parallel versions back together

### The Three Areas

Git has three "areas" where your files can be:

```
┌────────────────────────────────────────────────────────────┐
│ Working Directory                                          │
│ (your actual files — what you see in your editor)         │
└────────────────────────────────────────────────────────────┘
                            │
                            │ git add
                            ▼
┌────────────────────────────────────────────────────────────┐
│ Staging Area (Index)                                       │
│ (changes you've selected for the next commit)             │
└────────────────────────────────────────────────────────────┘
                            │
                            │ git commit
                            ▼
┌────────────────────────────────────────────────────────────┐
│ Repository (History)                                       │
│ (permanent snapshots — the commit history)                │
└────────────────────────────────────────────────────────────┘
```

**Working Directory**: Your actual files. Edit freely.

**Staging Area**: A "shopping cart" for changes. Add what you want in the next commit.

**Repository**: The permanent history. Once committed, changes are (mostly) permanent.

### Why Staging Exists

The staging area lets you **craft commits carefully**.

Instead of committing everything at once, you can:
- Fix a bug AND refactor some code
- Commit the bug fix first (clean, reviewable)
- Commit the refactor separately

**Good commits are atomic** — each commit is one logical change.

---

## Part 2: Essential Commands

### Starting a Repository

```bash
# Create new repository in current directory
git init

# Or clone an existing repository
git clone https://github.com/user/repo.git
```

### The Daily Workflow

```bash
# See what's changed
git status

# See the actual changes (diff)
git diff

# Stage changes for commit
git add filename.js        # Stage one file
git add .                   # Stage all changes

# Commit staged changes
git commit -m "Add user login feature"

# Push to remote repository
git push
```

### Viewing History

```bash
# See commit history
git log

# Compact view
git log --oneline

# See what changed in a commit
git show abc123

# See who changed each line
git blame filename.js
```

### Undoing Things

```bash
# Unstage a file (keep changes in working directory)
git restore --staged filename.js

# Discard changes in working directory
git restore filename.js

# Undo last commit (keep changes staged)
git reset --soft HEAD~1

# Undo last commit (keep changes in working directory)
git reset HEAD~1

# ⚠️ Dangerous: Undo last commit and discard changes
git reset --hard HEAD~1
```

### Working with Remotes

```bash
# See remote repositories
git remote -v

# Fetch changes from remote (don't merge)
git fetch

# Fetch and merge changes
git pull

# Push your commits to remote
git push

# Push a new branch to remote
git push -u origin branch-name
```

---

## Part 3: Branching

### What Are Branches?

Branches let you work on multiple versions simultaneously.

```
         feature-branch
              │
              ▼
        ┌─────┐    ┌─────┐
        │ f1  │───▶│ f2  │
        └─────┘    └─────┘
       /
┌─────┐    ┌─────┐    ┌─────┐
│  1  │───▶│  2  │───▶│  3  │  ← main
└─────┘    └─────┘    └─────┘
```

- `main` continues with commits 2, 3
- `feature-branch` has its own commits f1, f2
- They share history up to the branch point

### Branch Commands

```bash
# List branches
git branch

# Create new branch
git branch feature-name

# Switch to branch
git checkout feature-name
# Or (newer syntax)
git switch feature-name

# Create and switch in one command
git checkout -b feature-name
# Or
git switch -c feature-name

# Delete branch (after merging)
git branch -d feature-name
```

### When to Branch

**Create a branch when:**
- Starting a new feature
- Fixing a bug
- Experimenting with an idea
- Making changes you might not keep

**Branch names should be descriptive:**
- `feature/user-authentication`
- `fix/cart-total-calculation`
- `experiment/new-checkout-flow`

---

## Part 4: Merging

### What is Merging?

Merging combines changes from one branch into another.

```
Before merge:

        ┌─────┐    ┌─────┐
        │ f1  │───▶│ f2  │  feature
        └─────┘    └─────┘
       /
┌─────┐    ┌─────┐
│  1  │───▶│  2  │  main
└─────┘    └─────┘

After merge:

        ┌─────┐    ┌─────┐
        │ f1  │───▶│ f2  │──┐  feature
        └─────┘    └─────┘   \
       /                       \
┌─────┐    ┌─────┐    ┌─────────┐
│  1  │───▶│  2  │───▶│  merge  │  main
└─────┘    └─────┘    └─────────┘
```

### Merge Commands

```bash
# First, switch to the branch you want to merge INTO
git checkout main

# Then merge the other branch
git merge feature-name

# If there are conflicts, resolve them, then:
git add .
git commit
```

### Fast-Forward vs Merge Commit

**Fast-forward**: If main hasn't changed since branching, git just moves the pointer:

```
Before:
        ┌─────┐    ┌─────┐
        │ f1  │───▶│ f2  │  feature
        └─────┘    └─────┘
       /
┌─────┐
│  1  │  main
└─────┘

After (fast-forward):
┌─────┐    ┌─────┐    ┌─────┐
│  1  │───▶│ f1  │───▶│ f2  │  main, feature
└─────┘    └─────┘    └─────┘
```

**Merge commit**: If both branches have new commits, git creates a merge commit:

```
Both have diverged → creates merge commit with two parents
```

---

## Part 5: Resolving Conflicts

### When Conflicts Happen

Conflicts occur when:
- Both branches changed the same lines
- Git can't automatically determine which version to keep

### What Conflicts Look Like

```javascript
function calculateTotal(items) {
<<<<<<< HEAD
  // Your changes (current branch)
  return items.reduce((sum, item) => sum + item.price * item.qty, 0);
=======
  // Their changes (branch being merged)
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
>>>>>>> feature-branch
}
```

### Resolving Conflicts

1. **Find conflicts**: `git status` shows conflicted files

2. **Open the file**: Look for `<<<<<<<`, `=======`, `>>>>>>>`

3. **Decide what to keep**: Edit the file to the final version you want

4. **Remove conflict markers**: Delete the `<<<<<<<`, `=======`, `>>>>>>>` lines

5. **Stage and commit**:
   ```bash
   git add filename.js
   git commit -m "Resolve merge conflict in calculateTotal"
   ```

### Conflict Resolution Strategies

**Keep yours**: Use your version entirely
```bash
git checkout --ours filename.js
```

**Keep theirs**: Use their version entirely
```bash
git checkout --theirs filename.js
```

**Merge manually**: Combine both changes thoughtfully (most common)

**Use a merge tool**: Visual tools make this easier
```bash
git mergetool
```

---

## Part 6: Pull Requests

### What is a Pull Request?

A **pull request** (PR) is a proposal to merge one branch into another. It's where:
- Code gets reviewed
- Discussion happens
- CI/CD checks run
- Changes get approved (or rejected)

### The PR Workflow

```
1. Create branch from main
2. Make changes, commit
3. Push branch to remote
4. Open pull request
5. Get review, make updates
6. Merge when approved
7. Delete branch
```

### Creating a Pull Request

```bash
# Create and switch to new branch
git checkout -b feature/add-favorites

# Make changes...
# Commit changes...

# Push to remote
git push -u origin feature/add-favorites

# Then open PR on GitHub/GitLab/etc.
```

Most platforms (GitHub, GitLab) will show a prompt to create a PR after pushing.

### What Makes a Good PR

**Size**: Small, focused changes (easier to review)

**Title**: Descriptive summary
- ✅ "Add favorite items feature to menu"
- ❌ "Updates"

**Description**: Context for reviewers
- What does this change?
- Why is it needed?
- How can it be tested?
- Screenshots for UI changes

**Commits**: Clean, logical progression

### Code Review Etiquette

**As author:**
- Respond to all comments
- Don't take feedback personally
- Explain your reasoning when disagreeing

**As reviewer:**
- Be kind and constructive
- Ask questions, don't demand
- Approve when good enough (not perfect)
- Distinguish nitpicks from blockers

---

## Part 7: Branching Strategies

### Trunk-Based Development

Everyone commits to `main` (the "trunk") frequently.

```
main: ──●──●──●──●──●──●──●──●──●──
         │     │        │
         └──●──┘        └──●──┘
        (short-lived feature branches)
```

**Characteristics:**
- Branches live hours to days, not weeks
- Merge conflicts are rare (frequent integration)
- Requires good test coverage
- Best for small teams, continuous deployment

### Feature Branch Workflow

Each feature gets a long-lived branch.

```
main:     ──●────────────●────────────●──
             \          /            /
feature-a:    ──●──●──●──           /
                    \              /
feature-b:           ──●──●──●──●──
```

**Characteristics:**
- Branches live days to weeks
- More isolation between features
- Larger, less frequent merges
- Better for larger teams, scheduled releases

### GitHub Flow

Simplified branch strategy:

1. `main` is always deployable
2. Create branch for any change
3. Open PR, get review
4. Merge to `main`
5. Deploy immediately

**Simple, widely used, works well for web applications.**

### Which to Choose?

| Context | Recommendation |
|---------|----------------|
| Solo developer | Trunk-based (just use `main`) |
| Small team, continuous deploy | Trunk-based or GitHub Flow |
| Larger team, scheduled releases | Feature branches |
| Multiple versions in production | Git Flow (more complex) |

**Start simple. Add complexity only when needed.**

---

## Part 8: Git with AI Assistants

### Effective Git Prompts

**Understanding history:**
```
I'm looking at this git log output:
[paste log]

Can you explain what happened between commit abc123 and def456?
```

**Resolving conflicts:**
```
I have a merge conflict in this file:
[paste conflicted file]

The feature branch adds X, main branch changed Y.
What's the right way to combine these?
```

**Crafting commits:**
```
I made these changes:
[paste diff]

Can you suggest a good commit message that follows conventional commits format?
```

### What AI Helps With

- Explaining git concepts
- Suggesting commit messages
- Understanding complex diffs
- Resolving merge conflicts
- Explaining what a series of commits did

### What AI Can't Do

- Know your team's conventions
- Understand unstated context
- Make judgment calls about what to merge
- Replace code review

---

## Exercise 1: Practice Commits

Create a new repository and practice the commit workflow:

1. Create a new folder and `git init`
2. Create a file, stage it, commit with message "Initial commit"
3. Make a change, view it with `git diff`
4. Stage and commit with a descriptive message
5. View the log with `git log --oneline`
6. Make two changes, commit them separately (two commits)

<details>
<summary>Commands Reference</summary>

```bash
mkdir git-practice && cd git-practice
git init

echo "# My Project" > README.md
git add README.md
git commit -m "Initial commit"

echo "Some content" >> README.md
git diff
git add README.md
git commit -m "Add content to README"

git log --oneline

echo "Line 1" > file1.txt
echo "Line 2" > file2.txt
git add file1.txt
git commit -m "Add file1"
git add file2.txt
git commit -m "Add file2"
```

</details>

---

## Exercise 2: Branch and Merge

Practice the branch workflow:

1. Create a new branch called `feature/greeting`
2. Add a file `greeting.txt` with "Hello"
3. Commit the change
4. Switch back to `main`
5. Merge `feature/greeting` into `main`
6. Delete the feature branch

<details>
<summary>Commands Reference</summary>

```bash
git checkout -b feature/greeting

echo "Hello" > greeting.txt
git add greeting.txt
git commit -m "Add greeting"

git checkout main
git merge feature/greeting

git branch -d feature/greeting
```

</details>

---

## Exercise 3: Create a PR (GitHub)

If you have a GitHub account:

1. Fork any public repository (or use your own)
2. Clone it locally
3. Create a branch, make a small change
4. Push the branch
5. Open a pull request on GitHub
6. Look at the PR interface — Files Changed, Commits, etc.

This exercise is about familiarity with the PR interface.

---

## Exercise 4: Resolve a Conflict

Create a conflict intentionally:

1. Create a file `conflict.txt` with content "Original"
2. Commit to `main`
3. Create branch `feature-a`, change content to "Version A", commit
4. Switch to `main`, change content to "Version B", commit
5. Try to merge `feature-a` — observe the conflict
6. Resolve it manually (choose one version or combine)
7. Complete the merge

<details>
<summary>Commands Reference</summary>

```bash
echo "Original" > conflict.txt
git add conflict.txt
git commit -m "Add conflict.txt"

git checkout -b feature-a
echo "Version A" > conflict.txt
git add conflict.txt
git commit -m "Change to version A"

git checkout main
echo "Version B" > conflict.txt
git add conflict.txt
git commit -m "Change to version B"

git merge feature-a
# Conflict! Edit conflict.txt to resolve

# After editing:
git add conflict.txt
git commit -m "Resolve conflict: combine A and B"
```

</details>

---

## Key Takeaways

1. **Git tracks snapshots** — Not differences, but complete states at each commit

2. **Staging is intentional** — Craft commits deliberately, don't dump everything

3. **Branches are cheap** — Use them freely for features, fixes, experiments

4. **Conflicts are normal** — They mean two people cared about the same code

5. **PRs are conversations** — Not just merge buttons, but collaborative review

6. **Start simple** — Use trunk-based until you need more complexity

---

## What's Next

**[Module 10: Architecture Decision Records](architecture-decision-records)**

You'll learn:
- Why documenting decisions matters
- The ADR format and template
- When to write an ADR
- How ADRs help AI assistants understand your project

---

## Vocabulary

| Term | Definition |
|------|------------|
| **Repository (repo)** | A project tracked by git |
| **Commit** | A snapshot of the project at a point in time |
| **Branch** | A parallel line of development |
| **Merge** | Combining changes from one branch into another |
| **Conflict** | When git can't automatically merge changes |
| **Remote** | A repository hosted elsewhere (GitHub, etc.) |
| **Pull Request (PR)** | Proposal to merge a branch, with review |
| **Clone** | Copy a remote repository locally |
| **Fork** | Copy a repository to your own account |
| **HEAD** | Pointer to the current commit/branch |

---

## Further Reading

### Internal Resources

- [ADR Documentation](../../adr) — How we document decisions in this project

### External Resources

- [Pro Git Book](https://git-scm.com/book/en/v2) — Free, comprehensive reference
- [GitHub Flow Guide](https://guides.github.com/introduction/flow/) — Simple workflow explanation
- [Oh Shit, Git!?!](https://ohshitgit.com/) — How to fix common mistakes

---

## Reflection

Before moving on, ensure you can:

- [ ] Explain the three areas (working, staging, repository)
- [ ] Make commits with descriptive messages
- [ ] Create and merge branches
- [ ] Resolve a simple merge conflict
- [ ] Understand the PR workflow
- [ ] Choose an appropriate branching strategy for your context

---

**You've completed Module 09!** You now have the vocabulary and skills to collaborate on code without chaos. Git's learning curve is real, but practice makes it second nature.
