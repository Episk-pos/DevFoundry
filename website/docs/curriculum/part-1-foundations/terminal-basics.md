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
- Understand what programs and binaries are
- Know how PATH works and why "command not found" happens
- Read and write commands with flags and arguments
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
- **Windows**: Git Bash, PowerShell, Command Prompt
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
- **Windows**: Use Git Bash (comes with [Git for Windows](https://git-scm.com/downloads)) — commands match macOS/Linux tutorials. PowerShell works but has different syntax.
- **Linux**: Use your distro's terminal. Your shell is likely Bash.

---

## Opening Your Terminal

### macOS

1. Press `Cmd + Space` to open Spotlight
2. Type "Terminal"
3. Press Enter

Or find it in: `Applications → Utilities → Terminal`

### Windows

**Git Bash (recommended)** — install [Git for Windows](https://git-scm.com/downloads) first:
1. Press `Win` key
2. Type "Git Bash"
3. Press Enter

**PowerShell** — pre-installed, but different syntax:
1. Press `Win` key
2. Type "PowerShell"
3. Press Enter

**Command Prompt (CMD)** — legacy, only if required:
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

## What are Programs and Binaries?

When you type `node` or `git` or `npm`, what exactly are you running?

### Programs are Just Files

Every command you run is a **file** stored somewhere on your computer. These files contain instructions that your computer can execute.

```bash
# Find where a program lives
which git
# Output: /usr/bin/git

# On Windows PowerShell:
Get-Command git
# Output: C:\Program Files\Git\cmd\git.exe
```

That file at `/usr/bin/git` *is* the Git program. When you type `git`, your shell finds and runs that file.

### Binary vs Script

There are two main types of executable files:

**Binary (compiled)**:
- Machine code that your CPU runs directly
- Created by compiling source code (C, C++, Rust, Go)
- Files often have no extension on macOS/Linux, or `.exe` on Windows
- Examples: `git`, `node`, `python` (the interpreter itself)
- You can't read these in a text editor — they look like gibberish

**Script (interpreted)**:
- Human-readable text files
- Require an interpreter to run (Node.js, Python, Bash)
- Examples: `.js`, `.py`, `.sh` files
- You can open and edit these in any text editor

```bash
# This is a binary — runs directly
/usr/bin/git status

# This is a script — needs Node.js to interpret it
node my-script.js
```

### Executables

An **executable** is any file that can be run as a program. Both binaries and scripts can be executable.

On macOS/Linux, a file needs "execute permission" to run:

```bash
# Make a script executable
chmod +x my-script.sh

# Now you can run it
./my-script.sh
```

On Windows, the file extension (`.exe`, `.bat`, `.ps1`) determines if it's executable.

### Why This Matters

Understanding that programs are files helps you:
- **Debug PATH issues**: "command not found" means the file isn't in your PATH
- **Understand installation**: Installing a program = putting a file in the right place
- **Run things directly**: You can always run a program by its full path

```bash
# These are equivalent (if node is in your PATH):
node app.js
/usr/local/bin/node app.js
```

---

## Anatomy of a Command

Every terminal command follows a predictable structure. Once you understand it, you can read any command.

### The Basic Pattern

```
command [options] [arguments]
```

- **Command**: The program to run (`git`, `npm`, `ls`)
- **Options** (flags): Modify how the command behaves (`-v`, `--help`)
- **Arguments**: What the command operates on (files, text, URLs)

### Real Examples

```bash
ls -la Documents
#  ↑  ↑   ↑
#  │  │   └── argument: the directory to list
#  │  └────── options: -l (long format) and -a (show all)
#  └───────── command: list files

git commit -m "Fix login bug"
#   ↑      ↑   ↑
#   │      │   └── argument: the commit message
#   │      └────── option: -m means "message follows"
#   └───────────── command: git (with subcommand "commit")

npm install express --save-dev
#    ↑       ↑        ↑
#    │       │        └── option: save as dev dependency
#    │       └─────────── argument: package to install
#    └─────────────────── command: npm (with subcommand "install")
```

### Options (Flags)

Options modify command behavior. There are two styles:

**Short options**: Single dash, single letter
```bash
ls -l          # long format
ls -a          # all files (including hidden)
ls -la         # combine: -l and -a together
ls -l -a       # same thing, written separately
```

**Long options**: Double dash, full word
```bash
npm install --save-dev
git log --oneline
ls --all       # same as -a
```

**Options with values**:
```bash
git commit -m "message"        # short: value follows the flag
git commit --message "message" # long: same thing
git commit --message="message" # long: with equals sign (also valid)
```

### Common Flag Conventions

These patterns appear across many commands:

| Flag | Common Meaning |
|------|----------------|
| `-h`, `--help` | Show help/usage information |
| `-v`, `--version` | Show version number |
| `-v`, `--verbose` | More detailed output |
| `-q`, `--quiet` | Less output |
| `-f`, `--force` | Do it without asking |
| `-r`, `--recursive` | Include subdirectories |
| `-n`, `--dry-run` | Show what would happen, don't do it |
| `-o`, `--output` | Specify output file |
| `-i`, `--interactive` | Ask before each action |

### The `--` Separator

Double dash by itself (`--`) means "everything after this is an argument, not an option":

```bash
# Problem: want to delete a file named "-rf"
rm -rf           # This is an option, not a filename!

# Solution: use -- to clarify
rm -- -rf        # Deletes the file literally named "-rf"

# Common with git
git checkout -- file.txt   # Restore file.txt (-- clarifies it's a file, not a branch)
```

### Getting Help

Almost every command has built-in help:

```bash
# These usually work:
command --help
command -h

# Examples:
git --help
npm --help
ls --help

# More detailed manual (on macOS/Linux):
man git
man ls
```

The help output follows the same pattern you just learned — now you can read it!

```
Usage: git commit [-a] [-m <message>] [--amend] [<file>...]

  -a, --all       commit all changed files
  -m, --message   use given message as commit message
  --amend         amend previous commit
```

### Arguments

Arguments are the "things" commands operate on:

```bash
cat file.txt                    # one argument
cat file1.txt file2.txt         # multiple arguments
cp source.txt destination.txt   # two arguments with meaning (from, to)
echo "Hello, World!"            # argument is text
curl https://example.com        # argument is a URL
```

### Putting It All Together

Now you can parse any command:

```bash
docker run -d -p 8080:80 --name myapp nginx:latest
#      ↑    ↑  ↑          ↑              ↑
#      │    │  │          │              └── argument: image to run
#      │    │  │          └───────────────── option: container name
#      │    │  └──────────────────────────── option: port mapping
#      │    └─────────────────────────────── option: detached mode
#      └──────────────────────────────────── command (with subcommand)
```

```bash
find . -name "*.js" -type f -exec wc -l {} \;
#    ↑  ↑            ↑       ↑
#    │  │            │       └── option with complex argument
#    │  │            └────────── option: files only
#    │  └─────────────────────── option: name pattern
#    └────────────────────────── argument: where to search
```

Don't worry about understanding what every command does yet. The point is that you can now see the *structure*.

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

### Exercise 6: Parse Commands

For each command below, identify the command, options/flags, and arguments:

1. `grep -r "TODO" ./src`
2. `mkdir -p projects/new-app/src`
3. `git log --oneline -n 5`
4. `curl -X POST -H "Content-Type: application/json" https://api.example.com`

<details>
<summary>Solution</summary>

1. `grep -r "TODO" ./src`
   - **Command**: `grep` (search for patterns)
   - **Option**: `-r` (recursive, search subdirectories)
   - **Arguments**: `"TODO"` (pattern to find), `./src` (where to search)

2. `mkdir -p projects/new-app/src`
   - **Command**: `mkdir` (make directory)
   - **Option**: `-p` (create parent directories as needed)
   - **Argument**: `projects/new-app/src` (path to create)

3. `git log --oneline -n 5`
   - **Command**: `git log` (git with subcommand log)
   - **Options**: `--oneline` (compact format), `-n 5` (show only 5 commits)
   - **Arguments**: none

4. `curl -X POST -H "Content-Type: application/json" https://api.example.com`
   - **Command**: `curl` (transfer data from URL)
   - **Options**: `-X POST` (HTTP method), `-H "..."` (header to include)
   - **Argument**: `https://api.example.com` (URL to call)

</details>

---

## Windows-Specific Notes

If you're on Windows, you have choices:

### Git Bash (Recommended)

Comes bundled with [Git for Windows](https://git-scm.com/downloads). This is what we recommend for this curriculum because:

- Commands match macOS/Linux tutorials exactly (`ls`, `cd`, `grep`, `cat`, etc.)
- No system restart or admin permissions required
- Lightweight — just install and go
- You'll need Git anyway, so you get two essential tools in one

**This is what you should use to follow along with this curriculum.**

### PowerShell

Pre-installed on all Windows systems. Powerful, but has different syntax:

| Bash/Git Bash | PowerShell |
|---------------|------------|
| `ls` | `ls` (works!) or `Get-ChildItem` |
| `pwd` | `pwd` (works!) or `Get-Location` |
| `cat file.txt` | `cat file.txt` (works!) or `Get-Content file.txt` |
| `echo $PATH` | `$env:PATH` |
| `which node` | `Get-Command node` |
| `touch file.txt` | `New-Item file.txt` |

PowerShell is great for Windows-specific automation, but most online tutorials use Bash syntax.

### WSL (Windows Subsystem for Linux)

Runs a full Linux environment inside Windows. More heavyweight than Git Bash, but useful if you need Linux-specific tools:

1. Open PowerShell as Administrator
2. Run: `wsl --install`
3. Restart your computer
4. You now have Ubuntu (Linux) available!

For this curriculum, Git Bash is sufficient. Consider WSL later if you need full Linux capabilities.

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

## Going Further

Once you're comfortable with the basics, there's a whole world of terminal customization to explore:

- **Shell customization**: Fish shell, Starship prompt, Oh My Zsh, Powerlevel10k
- **Terminal multiplexing**: Zellij, tmux, screen — split panes, detachable sessions
- **Modern terminal emulators**: iTerm2, Alacritty, Warp, WezTerm

None of this is required to continue with the curriculum. When you're ready to explore:

👉 [Terminal: Going Further](extracurricular/terminal-going-further) (Extracurricular)

---

## Key Concepts Summary

### 1. Terminal = Text Interface

Instead of clicking, you type commands. Faster and more powerful once you're comfortable.

### 2. Shell = Command Interpreter

Bash, Zsh, PowerShell — the program that reads and executes your commands.

### 3. Programs are Files

Every command runs a file (binary or script) stored on your computer.

### 4. PATH = Where Programs Live

A list of directories your shell searches when you type a command name.

### 5. Commands Have Structure

`command [options] [arguments]` — once you see the pattern, you can read any command.

### 6. Navigation Commands

`pwd`, `ls`, `cd` — you'll use these hundreds of times a day.

### 7. Keyboard Shortcuts Save Time

`Ctrl + A/E`, `Option/Ctrl + arrows`, `Ctrl + R` — learn these and you'll be noticeably faster.

---

## Vocabulary

| Term | Definition |
|------|------------|
| **Terminal** | A text-based interface to your computer |
| **Shell** | The program that interprets commands (Bash, Zsh, PowerShell) |
| **Console** | Another name for terminal (historical) |
| **CLI** | Command-Line Interface — any text-based program |
| **Binary** | A compiled program file containing machine code |
| **Script** | A text file containing code that an interpreter runs |
| **Executable** | Any file that can be run as a program |
| **PATH** | Environment variable listing directories to search for programs |
| **Flag/Option** | A modifier that changes how a command behaves (`-v`, `--help`) |
| **Argument** | Data passed to a command (files, text, URLs) |
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
- [ ] Explain what a binary vs script is
- [ ] Explain what PATH is in your own words
- [ ] Identify the command, flags, and arguments in any command
- [ ] Use at least 3 keyboard shortcuts comfortably
- [ ] Use `Ctrl + R` to search your command history

If any are unclear, practice the exercises again. Comfort with the terminal is foundational — it's worth getting right.

---

**Ready to continue?** You now have the prerequisite skills to follow along with the rest of DevFoundry. Everything from here builds on your ability to navigate and run commands in the terminal.
