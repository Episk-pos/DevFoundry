---
sidebar_position: 0
title: "Terminal: Going Further"
description: "Keyboard shortcuts, shell customization, terminal multiplexing, and modern tools"
---

# Extracurricular: Terminal Going Further

**Keyboard shortcuts, shell customization, terminal multiplexing, and modern tools**

---

## Why This Page Exists

The main [Terminal Basics](/docs/curriculum/part-1-foundations/terminal-basics) module teaches the essential skills you need to use the command line. This page covers **productivity enhancements and customization** for those who want to:

- Work faster with keyboard shortcuts
- Customize their shell prompt and experience
- Use terminal multiplexers for managing multiple sessions
- Explore modern terminal emulators

**None of this is required** to continue with the curriculum. But these skills will make you noticeably faster and more comfortable in the terminal.

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

### Exercises

#### Exercise: Practice Keyboard Shortcuts

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

#### Exercise: Use Command History

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

## Shell Customization

Remember how we mentioned different shells (Bash, Zsh, Fish)? Each can be customized extensively.

### Alternative Shells

**Fish** (Friendly Interactive Shell)
- User-friendly out of the box — syntax highlighting, autosuggestions, tab completions
- Different syntax than Bash (scripts aren't compatible)
- Great for interactive use; many developers use Fish daily but write scripts in Bash
- [fishshell.com](https://fishshell.com/)

**Zsh** (Z Shell)
- Bash-compatible but with more features
- Default on macOS since Catalina
- Highly customizable with frameworks and plugins
- Most popular choice for customization

### Prompt Customization

Your **prompt** is the text that appears before your cursor (like `username@computer ~ $`). You can make it show useful information: current directory, git branch, programming language versions, and more.

**Starship** (Recommended)
- Works with any shell (Bash, Zsh, Fish, PowerShell)
- Fast (written in Rust), minimal, highly customizable
- Single binary, simple TOML config file
- Shows context-aware info (git status, Node version, Python env, etc.)
- [starship.rs](https://starship.rs/)

```bash
# Install on macOS
brew install starship

# Add to your shell config (~/.zshrc or ~/.bashrc)
eval "$(starship init zsh)"
```

**Powerlevel10k** (Zsh only)
- Extremely fast with "instant prompt" feature
- Rich configuration wizard
- Note: The maintainer has reduced active development, but it still works well
- [github.com/romkatv/powerlevel10k](https://github.com/romkatv/powerlevel10k)

**Oh My Zsh**
- Framework for managing Zsh configuration
- Hundreds of plugins and themes
- Easy to get started, but can slow down your shell if you add too many plugins
- [ohmyz.sh](https://ohmyz.sh/)

### What to Choose?

If you're just starting out:
1. **Keep defaults for now** — focus on learning the basics first
2. **Try Starship** when you're ready — it's the easiest to set up and works everywhere
3. **Explore Oh My Zsh** if you want plugins (git shortcuts, autocompletions, etc.)

---

## Terminal Multiplexing

A **terminal multiplexer** lets you:
- Split your terminal into multiple panes
- Create multiple "windows" (tabs) within one terminal
- **Detach and reattach sessions** — start a process, disconnect, reconnect later and it's still running
- Essential for remote server work (SSH sessions survive disconnection)

```
┌─────────────────────────────────────────────────┐
│ ~/project $ npm run dev                         │
│ Server running on localhost:3000                │
├────────────────────────┬────────────────────────┤
│ ~/project $ git status │ ~/project $ npm test   │
│ On branch main         │ PASS  tests/app.test.js│
│ nothing to commit      │ 3 tests passed         │
└────────────────────────┴────────────────────────┘
```

### Zellij (Recommended for Beginners)

Modern terminal multiplexer written in Rust. The key advantage: **it shows you the keybindings** at the bottom of the screen.

- Zero configuration needed — works great out of the box
- Discoverable UI — no memorization required
- Session management built-in (auto-saves, easy to resume)
- Plugin system (WebAssembly-based)
- [zellij.dev](https://zellij.dev/)

```bash
# Install on macOS
brew install zellij

# Start it
zellij
```

Press `Ctrl + p` then `d` to detach. Run `zellij attach` to reconnect.

### tmux (The Standard)

The established choice, used everywhere, extensive ecosystem.

- Available on virtually every Linux/Unix system
- Highly scriptable and configurable
- Steep learning curve (keybindings aren't shown)
- Massive community, plugins, and resources
- [github.com/tmux/tmux](https://github.com/tmux/tmux)

```bash
# Install on macOS
brew install tmux

# Start it
tmux

# Split horizontally: Ctrl+b then "
# Split vertically: Ctrl+b then %
# Detach: Ctrl+b then d
# Reattach: tmux attach
```

### screen (Legacy)

The original terminal multiplexer. Still works, still installed on many servers, but tmux and Zellij have largely superseded it. You might encounter it on older systems.

### What to Choose?

| Tool | Best For |
|------|----------|
| **Zellij** | Beginners, those who want it to "just work" |
| **tmux** | Power users, remote server work, maximum compatibility |
| **screen** | Legacy systems where nothing else is available |

**Recommendation**: Start with Zellij to learn the concepts, then try tmux if you need its ecosystem or work on remote servers frequently.

---

## Modern Terminal Emulators

The terminal app itself can be upgraded:

| Terminal | Platform | Notable Features |
|----------|----------|------------------|
| **iTerm2** | macOS | Split panes, search, profiles, tmux integration |
| **Windows Terminal** | Windows | Tabs, GPU rendering, profiles, modern |
| **Alacritty** | Cross-platform | GPU-accelerated, minimal, fast (Rust) |
| **Warp** | macOS, Linux | AI features, modern UI, blocks-based output |
| **Kitty** | Cross-platform | GPU-based, images in terminal, extensible |
| **WezTerm** | Cross-platform | GPU-accelerated, multiplexer built-in (Rust) |

These are purely optional upgrades. The built-in terminal on your system works fine.

---

## When to Explore This

1. **Not now** — if you're new to the terminal, focus on the basics first
2. **After a few weeks** — once commands feel natural, try Starship for a nicer prompt
3. **When you need it** — multiplexers become valuable when you're running multiple processes or working on remote servers
4. **When you're curious** — there's no wrong time to experiment!

The terminal is endlessly customizable. That's part of what makes it powerful — and why developers often have strong opinions about their setups. Start simple, add tools when you feel the need.

---

## Further Reading

### Shell Customization
- [Starship Documentation](https://starship.rs/config/) — Configuration reference
- [Oh My Zsh Wiki](https://github.com/ohmyzsh/ohmyzsh/wiki) — Plugins and themes
- [Fish Shell Tutorial](https://fishshell.com/docs/current/tutorial.html) — Getting started with Fish

### Terminal Multiplexing
- [Zellij User Guide](https://zellij.dev/documentation/) — Official docs
- [tmux Cheat Sheet](https://tmuxcheatsheet.com/) — Quick reference
- [The Tao of tmux](https://leanpub.com/the-tao-of-tmux/read) — Free online book

### Videos
- [Fireship: Customize Your Terminal](https://www.youtube.com/watch?v=CF1tMjvHDRA) — Quick overview
- [ThePrimeagen: tmux in 100 seconds](https://www.youtube.com/watch?v=vtB1J_zCv8I) — tmux basics
- [DevOps Toolbox: Zellij vs tmux](https://www.youtube.com/watch?v=gtjPeTCkm-8) — Comparison

---

👈 [Back to Terminal Basics](/docs/curriculum/part-1-foundations/terminal-basics)
