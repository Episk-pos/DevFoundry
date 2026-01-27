import os from 'os';
import { createMessage, formatMessage } from './messages.js';
import { saveMessage, readMessages } from './storage.js';
import { showMessage, showHistory, showHelp, showError } from './display.js';

function getCurrentUser(): string {
  return os.userInfo().username;
}

async function main(): Promise<void> {
  const [command, ...args] = process.argv.slice(2);
  const currentUser = getCurrentUser();

  switch (command) {
    case 'send': {
      const text = args.join(' ');
      if (!text) {
        showError('Please provide a message to send.');
        showHelp();
        process.exit(1);
      }
      const newMessage = createMessage(text, currentUser);
      await saveMessage(newMessage);
      showMessage(`Sent: ${formatMessage(newMessage)}`);
      break;
    }

    case 'read': {
      const messages = await readMessages();
      const formatted = messages.map(formatMessage);
      showHistory(formatted);
      break;
    }

    case 'help':
    default:
      showHelp();
      break;
  }
}

main().catch((err: Error) => {
  console.error('Fatal error:', err.message);
  process.exit(1);
});
