---
sidebar_position: 0
title: "Module 00: Terminal Basics"
description: Getting comfortable with the command line before diving into code
---

# Module 00: Terminal Basics

**Getting comfortable with the command line before diving into code**

---

## Learning Objectives

By the end of this module, you will:

- Understand what a terminal is and why developers use it
- Know the difference between Terminal, Shell, Bash, Zsh, PowerShell, and CMD
- Navigate the file system with confidence
- Understand what PATH is and why it matters
- Use keyboard shortcuts like a power user
- Feel comfortable enough to follow along with the rest of this curriculum

**Time**: 1-2 hours (reading + practice)

---

## Why This Module Exists

Many programming tutorials assume you already know how to use the terminal. They'll casually say "open your terminal and run `npm install`" without explaining what a terminal is or how to use it.

This module fills that gap. Even if you've used computers for years, you may have avoided the command line. That's okay — we'll start from the beginning.

**The terminal is not scary.** It's just a different way to interact with your computer — using text instead of clicking.

---

## What is the Terminal?

### The Basic Idea

The **terminal** (also called the **command line** or **console**) is a text-based interface to your computer.

Instead of clicking icons and menus, you type commands. The computer reads your command, executes it, and shows you the result as text.

### Why Use It?

| Task | GUI (Graphical) | Terminal |
|------|-----------------|----------|
| Create 100 folders | Click "New Folder" 100 times | `mkdir folder{1..100}` |
| Find all `.js` files | Search, wait, scroll | `find . -name "*.js"` |
| Install a tool | Download, double-click, next, next, finish | `npm install tool-name` |
| Run a program | Double-click, hope it works | `node app.js` |

**The terminal is faster, more precise, and more powerful** once you're comfortable with it. And as a developer, you'll use it constantly.

---

## Terminology: Terminal vs Shell vs Console

These terms are often used interchangeably, but they're technically different:

### Terminal (or Terminal Emulator)

The **window** that displays text. It's the application you open.

- **macOS**: Terminal.app or iTerm2
- **Windows**: Windows Terminal, Command Prompt, PowerShell window
- **Linux**: GNOME Terminal, Konsole, xterm

### Shell

The **program** that interprets your commands. The shell runs inside the terminal.

Think of it this way:
- Terminal = the TV screen
- Shell = the TV channel

Common shells:

| Shell | Platform | Notes |
|-------|----------|-------|
| **Bash** | macOS (older), Linux | The classic. Most tutorials use this. |
| **Zsh** | macOS (default since Catalina) | Bash-compatible with extra features. |
| **PowerShell** | Windows (modern) | Object-oriented, powerful but different syntax. |
| **CMD** | Windows (legacy) | Old Windows command prompt. Limited. |

### Console

An older term, often used interchangeably with "terminal." Originally referred to physical terminals connected to mainframes.

### What Should You Use?

- **macOS**: Use the built-in Terminal app. Your shell is likely Zsh.
- **Windows**: Use Windows Terminal with PowerShell. Or install WSL (Windows Subsystem for Linux) for a Bash experience.
- **Linux**: Use your distro's terminal. Your shell is likely Bash.

---

## Opening Your Terminal

### macOS

1. Press `Cmd + Space` to open Spotlight
2. Type "Terminal"
3. Press Enter

Or find it in: `Applications → Utilities → Terminal`

### Windows

**Windows Terminal (recommended)**:
1. Press `Win` key
2. Type "Terminal" or "Windows Terminal"
3. Press Enter

**PowerShell**:
1. Press `Win` key
2. Type "PowerShell"
3. Press Enter

**Command Prompt (CMD)** — only if required:
1. Press `Win + R`
2. Type `cmd`
3. Press Enter

### Linux

- Press `Ctrl + Alt + T` (most distros)
- Or find "Terminal" in your applications menu

---

## Your First Commands

Once your terminal is open, try these commands:

### See Where You Are: `pwd`

```bash
pwd
```

**P**rint **W**orking **D**irectory. Shows your current location in the file system.

Example output:
```
/Users/yourname
```

On Windows PowerShell, use:
```powershell
Get-Location
# Or the alias:
pwd
```

### See What's Here: `ls`

```bash
ls
```

**L**i**s**t files and folders in the current directory.

Example output:
```
Desktop    Documents    Downloads    Pictures
```

On Windows CMD, use `dir` instead.

### Move Around: `cd`

```bash
cd Documents
```

**C**hange **D**irectory. Move into a folder.

```bash
cd ..
```

Go up one level (to the parent folder).

```bash
cd ~
```

Go to your home directory.

```bash
cd /
```

Go to the root of the file system.

### Clear the Screen: `clear`

```bash
clear
```

Clears all the text from your terminal. On Windows, use `cls` in CMD.

**Keyboard shortcut**: `Ctrl + L` works in most terminals.

---

## Understanding File Paths

### What is a Path?

A **path** is the address of a file or folder. There are two types:

**Absolute path**: The full address from the root
```
/Users/yourname/Documents/projects/myapp/index.js
```

**Relative path**: The address from where you currently are
```
projects/myapp/index.js
```

### Special Path Symbols

| Symbol | Meaning | Example |
|--------|---------|---------|
| `/` | Root directory (macOS/Linux) | `cd /` |
| `C:\` | Root of C drive (Windows) | `cd C:\` |
| `~` | Home directory | `cd ~` |
| `.` | Current directory | `./run.sh` |
| `..` | Parent directory | `cd ..` |

### Path Examples

If you're in `/Users/yourname/Documents`:

| Command | Result |
|---------|--------|
| `cd projects` | Go to `/Users/yourname/Documents/projects` |
| `cd ..` | Go to `/Users/yourname` |
| `cd ../Downloads` | Go to `/Users/yourname/Downloads` |
| `cd ~/Desktop` | Go to `/Users/yourname/Desktop` |

---

## What is PATH?

This is one of the most important concepts for developers.

### The Problem

When you type `node` or `python` or `npm`, how does the computer know where that program is?

You didn't type the full path like `/usr/local/bin/node`. You just typed `node`.

### The Solution: PATH

**PATH** is an environment variable that contains a list of directories. When you type a command, the shell searches these directories (in order) to find the program.

### Viewing Your PATH

**macOS/Linux (Bash/Zsh)**:
```bash
echo $PATH
```

Output (example):
```
/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin
```

Each directory is separated by `:` (colon).

**Windows PowerShell**:
```powershell
$env:PATH
```

Directories are separated by `;` (semicolon).

### What This Means

When you type `node`:
1. Shell checks `/usr/local/bin/` — is `node` here? Yes!
2. Runs `/usr/local/bin/node`

If `node` isn't in any PATH directory, you'll see:
```
command not found: node
```

### Why This Matters

When you install programming tools (Node.js, Python, etc.), the installer usually adds them to your PATH. If something "isn't working," it often means it's not in your PATH.

---

## Essential Navigation Commands

Here's a quick reference of the commands you'll use constantly:

### File System Navigation

| Command | Description | Example |
|---------|-------------|---------|
| `pwd` | Print working directory | `pwd` |
| `ls` | List files | `ls` |
| `ls -la` | List all files (including hidden) with details | `ls -la` |
| `cd <dir>` | Change directory | `cd Documents` |
| `cd ..` | Go up one level | `cd ..` |
| `cd ~` | Go to home | `cd ~` |
| `cd -` | Go to previous directory | `cd -` |

### Creating and Removing

| Command | Description | Example |
|---------|-------------|---------|
| `mkdir <name>` | Create a directory | `mkdir my-project` |
| `touch <file>` | Create an empty file | `touch index.js` |
| `rm <file>` | Remove a file | `rm old-file.txt` |
| `rm -r <dir>` | Remove a directory (and contents) | `rm -r old-folder` |
| `cp <src> <dest>` | Copy a file | `cp file.txt backup.txt` |
| `mv <src> <dest>` | Move or rename | `mv old.js new.js` |

### Viewing Files

| Command | Description | Example |
|---------|-------------|---------|
| `cat <file>` | Display file contents | `cat package.json` |
| `less <file>` | View file (scrollable) | `less README.md` |
| `head <file>` | First 10 lines | `head log.txt` |
| `tail <file>` | Last 10 lines | `tail log.txt` |

---

## Power User Keyboard Shortcuts

These shortcuts will make you significantly faster. Practice them until they're muscle memory.

### Navigation Within a Line

| Action | macOS | Windows/Linux |
|--------|-------|---------------|
| Move cursor left one character | `←` | `←` |
| Move cursor right one character | `→` | `→` |
| **Move left one word** | `Option + ←` | `Ctrl + ←` |
| **Move right one word** | `Option + →` | `Ctrl + →` |
| Jump to beginning of line | `Ctrl + A` | `Ctrl + A` or `Home` |
| Jump to end of line | `Ctrl + E` | `Ctrl + E` or `End` |

### Editing

| Action | macOS | Windows/Linux |
|--------|-------|---------------|
| Delete character before cursor | `Backspace` | `Backspace` |
| Delete character after cursor | `Ctrl + D` | `Ctrl + D` or `Delete` |
| **Delete word before cursor** | `Ctrl + W` | `Ctrl + W` |
| **Delete from cursor to end of line** | `Ctrl + K` | `Ctrl + K` |
| Delete from cursor to start of line | `Ctrl + U` | `Ctrl + U` |
| Undo (yank back deleted text) | `Ctrl + Y` | `Ctrl + Y` |
| Clear the screen | `Ctrl + L` | `Ctrl + L` |
| Cancel current command | `Ctrl + C` | `Ctrl + C` |

### Selection (with Shift)

Adding `Shift` to movement commands selects text:

| Action | macOS | Windows/Linux |
|--------|-------|---------------|
| Select character left | `Shift + ←` | `Shift + ←` |
| Select character right | `Shift + →` | `Shift + →` |
| **Select word left** | `Shift + Option + ←` | `Shift + Ctrl + ←` |
| **Select word right** | `Shift + Option + →` | `Shift + Ctrl + →` |
| Select to beginning of line | `Shift + Ctrl + A` | `Shift + Home` |
| Select to end of line | `Shift + Ctrl + E` | `Shift + End` |

### Command History

| Action | macOS/Linux | Windows |
|--------|-------------|---------|
| Previous command | `↑` | `↑` |
| Next command | `↓` | `↓` |
| **Search command history** | `Ctrl + R` | `Ctrl + R` |
| Run previous command | `!!` | N/A (Bash only) |
| Run previous command with sudo | `sudo !!` | N/A (Bash only) |

### Using Ctrl + R (Reverse Search)

This is incredibly powerful. Press `Ctrl + R` and start typing part of a previous command:

```
(reverse-i-search)`npm': npm run build
```

- Keep pressing `Ctrl + R` to cycle through matches
- Press `Enter` to run the command
- Press `→` to edit the command before running
- Press `Ctrl + C` to cancel

### Tab Completion

Press `Tab` to autocomplete:

```bash
cd Doc[Tab]
# Completes to: cd Documents/
```

Press `Tab` twice to see all possibilities:

```bash
cd D[Tab][Tab]
# Shows: Desktop/  Documents/  Downloads/
```

**Tab completion works for**:
- File and folder names
- Command names
- Git branches
- And more (depending on your shell configuration)

---

## Practical Exercises

### Exercise 1: Navigate Your System

Open your terminal and complete these tasks:

1. Print your current directory
2. List all files (including hidden ones)
3. Navigate to your home directory
4. Navigate to your Desktop
5. Go back to where you started (hint: `cd -`)

<details>
<summary>Solution</summary>

```bash
pwd
ls -la
cd ~
cd Desktop
cd -
```

</details>

---

### Exercise 2: Create a Project Structure

Create this folder structure using only the terminal:

```
my-first-project/
├── src/
│   └── index.js
├── tests/
└── README.md
```

<details>
<summary>Solution</summary>

```bash
mkdir my-first-project
cd my-first-project
mkdir src tests
touch src/index.js
touch README.md
```

Or in one line:
```bash
mkdir -p my-first-project/src my-first-project/tests && touch my-first-project/src/index.js my-first-project/README.md
```

</details>

---

### Exercise 3: Practice Keyboard Shortcuts

1. Type a long command (don't press Enter): `echo "This is a really long command that I am typing to practice keyboard shortcuts"`
2. Jump to the beginning of the line
3. Jump to the end of the line
4. Move back one word at a time to reach "keyboard"
5. Delete from cursor to end of line
6. Cancel and clear (`Ctrl + C`)

<details>
<summary>What You Should Feel</summary>

- `Ctrl + A` to jump to the start — instant, no arrow key mashing
- `Ctrl + E` to jump to the end — instant
- `Option + ←` (Mac) or `Ctrl + ←` (Windows) — jumping word by word feels powerful
- `Ctrl + K` to delete to end — much faster than holding backspace
- These shortcuts become second nature with practice

</details>

---

### Exercise 4: Use Command History

1. Run these commands:
   ```bash
   echo "first"
   echo "second"
   echo "third"
   ```
2. Press `↑` to cycle through your history
3. Use `Ctrl + R` and type "sec" to find the second command
4. Press `Enter` to run it again

<details>
<summary>What You Should Notice</summary>

- Arrow keys cycle through recent commands
- `Ctrl + R` lets you search by typing any part of a previous command
- This saves huge amounts of time when you need to re-run complex commands

</details>

---

### Exercise 5: Explore Your PATH

1. View your PATH: `echo $PATH` (or `$env:PATH` on Windows)
2. Find where `node` is installed: `which node` (or `Get-Command node` on Windows)
3. List what's in that directory

<details>
<summary>Solution</summary>

```bash
echo $PATH
which node
# Outputs something like: /usr/local/bin/node

ls /usr/local/bin
# Shows all programs in that directory
```

If `node` isn't found, it means Node.js isn't installed yet — we'll cover that in later modules.

</details>

---

## Windows-Specific Notes

If you're on Windows, you have choices:

### PowerShell (Recommended for Windows)

Modern and powerful. Most commands work, but some syntax differs:

| Bash/Zsh | PowerShell |
|----------|------------|
| `ls` | `ls` (works!) or `Get-ChildItem` |
| `pwd` | `pwd` (works!) or `Get-Location` |
| `cat file.txt` | `cat file.txt` (works!) or `Get-Content file.txt` |
| `echo $PATH` | `$env:PATH` |
| `which node` | `Get-Command node` |
| `touch file.txt` | `New-Item file.txt` |

### WSL (Windows Subsystem for Linux)

Runs a real Linux environment inside Windows. If you plan to do serious development, consider installing WSL:

1. Open PowerShell as Administrator
2. Run: `wsl --install`
3. Restart your computer
4. You now have Ubuntu (Linux) available!

WSL lets you use all the same commands as macOS/Linux tutorials.

### Git Bash

Comes with Git for Windows. Provides a Bash-like experience without full Linux.

---

## Common Questions

### "What if I mess something up?"

The terminal can be powerful, which means you can accidentally delete files. Some tips:

- **Be careful with `rm`** — there's no trash can. Files are gone.
- **Use `rm -i`** — asks for confirmation before each delete.
- **Don't run commands you don't understand** — especially with `sudo`.
- **You can always `Ctrl + C`** — this cancels the current command.

### "Why do commands look different in tutorials?"

Different shells (Bash, Zsh, PowerShell) have slightly different syntax. Most basic commands work everywhere, but you might see variations. This curriculum primarily uses Bash/Zsh syntax since it's the most common.

### "Do I need to memorize all this?"

No. Bookmark this page. The goal is to be comfortable, not to memorize. With practice, the common commands become automatic. Use `Ctrl + R` to search your history instead of remembering exact commands.

### "What's the difference between Terminal and code editors' terminals?"

Many code editors (VS Code, WebStorm) have built-in terminals. These are the same thing — a terminal running inside your editor. The advantage is you don't have to switch windows.

---

## Key Concepts Summary

### 1. Terminal = Text Interface

Instead of clicking, you type commands. Faster and more powerful once you're comfortable.

### 2. Shell = Command Interpreter

Bash, Zsh, PowerShell — the program that reads and executes your commands.

### 3. PATH = Where Programs Live

A list of directories your shell searches when you type a command name.

### 4. Navigation Commands

`pwd`, `ls`, `cd` — you'll use these hundreds of times a day.

### 5. Keyboard Shortcuts Save Time

`Ctrl + A/E`, `Option/Ctrl + arrows`, `Ctrl + R` — learn these and you'll be noticeably faster.

---

## Vocabulary

| Term | Definition |
|------|------------|
| **Terminal** | A text-based interface to your computer |
| **Shell** | The program that interprets commands (Bash, Zsh, PowerShell) |
| **Console** | Another name for terminal (historical) |
| **CLI** | Command-Line Interface — any text-based program |
| **PATH** | Environment variable listing directories to search for programs |
| **Working directory** | The folder you're currently "in" |
| **Absolute path** | Full path from root (`/Users/me/file.txt`) |
| **Relative path** | Path from current location (`./file.txt`) |
| **Home directory** | Your user folder (`~`) |

---

## Next Module

**Module 01: What Software Is**

Now that you're comfortable in the terminal, you're ready to understand what software actually is and run your first program.

👉 [Module 01: What Software Is](what-software-is)

---

## Further Reading

### Practice Resources

- [Learn the Command Line (Codecademy)](https://www.codecademy.com/learn/learn-the-command-line) — Interactive course
- [The Linux Command Line (free book)](https://linuxcommand.org/tlcl.php) — Comprehensive reference
- [ExplainShell](https://explainshell.com/) — Paste any command to see what it does

### Videos

- [Fireship: The 50 Most Popular Linux & Terminal Commands](https://www.youtube.com/watch?v=ZtqBQ68cfJc) — Quick overview
- [Traversy Media: Command Line Crash Course](https://www.youtube.com/watch?v=uwAqEzhyjtw) — Beginner-friendly

---

## Reflection

Before moving on, ensure you can:

- [ ] Open the terminal on your computer
- [ ] Navigate to different directories using `cd`
- [ ] List files in a directory using `ls`
- [ ] Create folders and files from the command line
- [ ] Use at least 3 keyboard shortcuts comfortably
- [ ] Explain what PATH is in your own words
- [ ] Use `Ctrl + R` to search your command history

If any are unclear, practice the exercises again. Comfort with the terminal is foundational — it's worth getting right.

---

**Ready to continue?** You now have the prerequisite skills to follow along with the rest of DevFoundry. Everything from here builds on your ability to navigate and run commands in the terminal.
