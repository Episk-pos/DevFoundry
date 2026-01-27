export function showMessage(text: string): void {
  console.log(text);
}

export function showHistory(messages: string[]): void {
  if (messages.length === 0) {
    console.log('No messages yet.');
    return;
  }

  console.log('--- Chat History ---');
  messages.forEach(msg => console.log(msg));
  console.log('-------------------');
}

export function showHelp(): void {
  console.log(`Usage:
  npm start send "<message>"    - Send a new message
  npm start read               - Read all messages
  npm start help               - Show this help`);
}

export function showError(text: string): void {
  console.error(`Error: ${text}`);
}
