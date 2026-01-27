# Chat CLI (Stage 1)

A simple command-line chat application that demonstrates the I/O/P (Input/Output/Processing) model and module organization.

## What You'll Learn
- **Module Separation**: Breaking code into logical files (`storage.js`, `messages.js`, `display.js`).
- **Persistence**: Saving data to a local JSON file.
- **CLI Interaction**: Parsing arguments and providing feedback.
- **I/O/P Model**: 
  - **Input**: Command line arguments.
  - **Processing**: Creating message objects with timestamps and formatting them.
  - **Output**: Displaying to the console and saving to disk.

## Installation

No dependencies are required. Just ensure you have Node.js installed.

```bash
cd examples/11-chat-cli
```

## Usage

### Send a message
```bash
npm start send "Hello DevFoundry!"
```

### Read message history
```bash
npm start read
```

### Help
```bash
npm start help
```

## Structure
- `src/index.js`: Entry point, parses CLI arguments.
- `src/messages.js`: Business logic for creating and formatting messages.
- `src/storage.js`: Logic for reading/writing to `messages.json`.
- `src/display.js`: Purely concerned with console output.
- `src/users.js`: Identifies the current user.
