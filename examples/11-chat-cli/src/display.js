/**
 * Logs a single message to the console.
 */
export function showMessage(formattedMessage) {
  console.log(formattedMessage);
}

/**
 * Logs a list of formatted messages.
 */
export function showHistory(formattedMessages) {
  if (formattedMessages.length === 0) {
    console.log('\nNo messages yet. Start the conversation!\n');
    return;
  }

  console.log('\n--- Chat History ---');
  formattedMessages.forEach(msg => console.log(msg));
  console.log('-------------------\n');
}

/**
 * Shows help information.
 */
export function showHelp() {
  console.log(`
Usage:
  npm start send "<message>"    - Send a new message
  npm start read               - Read all messages
  npm start help               - Show this help
  `);
}
