---
sidebar_position: 99
title: "Elevated Privileges and User Switching"
description: "Understanding sudo, su (macOS/Linux) and Run as Admin (Windows) for safe system access"
---

# Extracurricular: Elevated Privileges and User Switching

**When and how to run commands with higher permissions—use sparingly to avoid risks.**

---

## Why This Exists

Most daily development doesn't require elevated privileges, but you'll encounter them when:
- Installing system-wide tools (e.g., Homebrew on macOS, apt packages on Linux, Chocolatey on Windows).
- Modifying protected files (e.g., /etc configs on Unix-like systems).
- Running services or updating security policies.

**Key Rule**: Elevation bypasses user restrictions for system changes. It's powerful but dangerous—misuse can lock you out, delete data, or corrupt your OS. Always verify commands (e.g., via `--help` or docs) before elevating. Prefer user-level tools (e.g., npx over global npm installs) to avoid it.

**This is advanced and optional**. Skip unless prompted by a tutorial or error like "Permission denied."

---

## macOS and Linux: sudo and su

These tools grant temporary superuser (root) access, protecting the system from accidental changes.

### sudo (Recommended: Safer and More Common)
- **What it does**: Prefixes a command to run it as root (e.g., `sudo ls /root`). Prompts for your user password (not root's).
- **When to use**: System installs/updates, like `sudo apt update` (Ubuntu/Debian) or `sudo brew install git` (macOS).
- **Example**:
  ```bash
  sudo npm install -g create-react-app  # Global install; enter password when prompted
  # But prefer: npx create-react-app my-app  # No elevation needed
  ```
- **Flags**:
  - `sudo -u otheruser command` — Run as specific user.
  - `sudo !!` — Re-run last command with sudo (handy in history).
- **Risks/Warnings**:
  - Never `sudo rm -rf /` (deletes entire system).
  - Avoid `sudo` in home directories—use `chown` if permissions are wrong.
  - On macOS: Use for Homebrew; on Linux: For package managers like apt/yum.
- **Help**: `man sudo` or `sudo --help`.

### su (Switch User: Less Common)
- **What it does**: Switches to another user account (e.g., `su -` for root shell, or `su - username` for others). Requires that user's password.
- **When to use**: Rare for devs; full root sessions (e.g., `su -` then `apt update`). Prefer `sudo`—it's audited and doesn't keep you as root.
- **Example**:
  ```bash
  su -  # Become root (enter root password; may need setup first)
  exit  # Switch back
  ```
- **Risks/Warnings**: Stays elevated until `exit`; easy to forget and cause damage. Modern systems discourage it.
- **Help**: `man su`.

**Platform Note**: These are Unix-like (Bash/Zsh). In WSL (Windows Linux), same as Linux.

---

## Windows: Run as Administrator and runas

Windows uses User Account Control (UAC) to prompt for elevation. No direct `sudo` equivalent, but similar concepts.

### Run as Administrator (Primary Method)
- **What it does**: Launches a terminal (PowerShell/CMD) with admin rights for system changes.
- **How to use**:
  1. Right-click Start > "Windows PowerShell (Admin)" or "Command Prompt (Admin)".
  2. Or search "PowerShell" > right-click > "Run as administrator" (UAC prompts yes/no).
- **When to use**: Installing via Chocolatey (`choco install git`) or modifying C:\Windows files.
- **Example** (in elevated PowerShell):
  ```powershell
  # Install a package (requires Chocolatey first: choco install chocolatey)
  choco install git
  # Or change execution policy:
  Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
  ```
- **Risks/Warnings**:
  - UAC prevents accidents but can be bypassed—verify commands.
  - Avoid in user folders (e.g., Documents); use icacls for permissions.
  - Elevation applies to the whole session; close when done.

### runas (Command-Line Alternative)
- **What it does**: Runs a command/program as another user (e.g., admin).
- **Example**:
  ```cmd
  runas /user:Administrator cmd  # Launches elevated CMD; enter admin password
  # Inside elevated CMD: ipconfig /flushdns
  ```
  In PowerShell:
  ```powershell
  Start-Process powershell -Verb RunAs -ArgumentList "-Command 'your-command-here'"
  ```
- **When to use**: One-off elevated commands without full session.
- **Risks/Warnings**: Prompts for credentials; avoid storing passwords.

**Platform Note**: In Git Bash (recommended for this curriculum), elevation is trickier—use Windows Terminal/PowerShell for admin tasks.

---

## Cross-Platform Best Practices
- **Avoid when possible**: Use virtual environments (venv, nvm), package managers without globals, or containers (Docker) to stay user-level.
- **Common Errors**: "Permission denied" or "Access is denied"—check if elevation is needed, but search alternatives first.
- **Security**: Elevation logs actions (e.g., /var/log/auth.log on Linux). Never share root/admin passwords.
- **Further Reading**:
  - macOS/Linux: [sudo man page](https://www.sudo.ws/man/1.9.15/sudo.man/), [su man page](https://man7.org/linux/man-pages/man1/su.1.html)
  - Windows: [Run as administrator docs](https://learn.microsoft.com/en-us/windows/win32/secauthz/uac-on-sdk), [runas reference](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/runas)
  - Tools: Install managers like [Homebrew](https://brew.sh/) (macOS), [apt](https://ubuntu.com/tutorials/command-line-for-beginners) (Linux), [Chocolatey](https://chocolatey.org/install) (Windows) for safer installs.

---

👈 [Back to Terminal Basics](/docs/curriculum/part-1-foundations/terminal-basics)

