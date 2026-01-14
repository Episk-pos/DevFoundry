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
- **When to use**: Installing system-wide tools (e.g., via Chocolatey or Winget), modifying protected directories (e.g., C:\Program Files), or changing security policies (e.g., execution policies for scripts).
- **Examples** (in elevated PowerShell):
  ```powershell
  # Change PowerShell execution policy (allows running local scripts)
  Set-ExecutionPolicy RemoteSigned -Scope CurrentUser

  # Install Chocolatey package manager (one-time setup)
  Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

  # Use Chocolatey to install dev tools
  choco install git nodejs vscode

  # Or use Winget (built-in since Windows 10 1809)
  winget install Git.Git Microsoft.VisualStudioCode
  ```
- **Risks/Warnings**:
  - UAC prevents accidents but can be bypassed—verify commands and sources.
  - Avoid elevation in user folders (e.g., Documents); use `icacls` for permission tweaks.
  - Elevation applies to the whole session; close the terminal when done to minimize exposure.
  - Common pitfalls: Running `rm`-like commands (e.g., `Remove-Item -Recurse`) on system paths can delete critical files.

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

#### WSL (Windows Subsystem for Linux) Notes
If using WSL (recommended for Linux-like dev on Windows), elevation works as on native Linux:
- Install WSL: Run `wsl --install` in elevated PowerShell (one-time).
- Inside WSL: Use `sudo` for Linux package installs (e.g., `sudo apt install git`).
- WSL files are accessible from Windows, but avoid mixing elevations—treat WSL as a separate Linux env.
- For Windows tools in WSL: Use `wsl.exe` from elevated Windows terminal if needed.

#### Other Windows Package Managers (Prefer User-Level When Possible)
- **Chocolatey (choco)**: System-wide installer, requires initial elevation for setup. Great for dev tools (Git, Node, VS Code). After install: `choco install <package>` (may still need admin for some).
- **Winget**: Microsoft's built-in (no install needed). Often works without elevation: `winget install Git.Git`. Use `--accept-package-agreements` for automation.
- **Scoop**: User-level (no elevation!): Installs to ~/scoop. Run install script in regular PowerShell: `iwr -useb get.scoop.sh | iex`. Then `scoop install git nodejs`. Ideal for avoiding admin prompts.

**Platform Note**: In Git Bash (recommended for this curriculum), elevation is trickier—use Windows Terminal/PowerShell for admin tasks. For WSL in Git Bash, launch via `wsl` command.

---

## Cross-Platform Best Practices
- **Avoid when possible**: Use virtual environments (venv, nvm), package managers without globals, or containers (Docker) to stay user-level.
- **Common Errors**: "Permission denied" or "Access is denied"—check if elevation is needed, but search alternatives first.
- **Security**: Elevation logs actions (e.g., /var/log/auth.log on Linux). Never share root/admin passwords.
- **Further Reading**:
  - macOS/Linux: [sudo man page](https://www.sudo.ws/man/1.9.15/sudo.man/), [su man page](https://man7.org/linux/man-pages/man1/su.1.html)
  - Windows: [Run as administrator docs](https://learn.microsoft.com/en-us/windows/win32/secauthz/uac-on-sdk), [runas reference](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/runas), [UAC overview](https://learn.microsoft.com/en-us/windows/security/identity-protection/user-account-control/user-account-control)
  - WSL: [Install WSL](https://learn.microsoft.com/en-us/windows/wsl/install), [WSL from command line](https://learn.microsoft.com/en-us/windows/wsl/basic-commands)
  - Tools: [Homebrew](https://brew.sh/) (macOS), [apt tutorial](https://ubuntu.com/tutorials/command-line-for-beginners) (Linux), [Chocolatey](https://chocolatey.org/install), [Winget](https://learn.microsoft.com/en-us/windows/package-manager/winget/), [Scoop](https://scoop.sh/) (Windows user-level).

---

👈 [Back to Terminal Basics](/docs/curriculum/part-1-foundations/terminal-basics)

