import { createMessage, formatMessage } from './messages.js';
import { saveMessage, readMessages } from './storage.js';
import { showMessage, showHistory, showHelp } from './display.js';

async function main() {
  const [command, ...args] = process.argv.slice(2);

  switch (command) {
    case 'send':
      const text = args.join(' ');
      if (!text) {
        console.error('Error: Please provide a message to send.');
        showHelp();
        process.exit(1);
      }
      const newMessage = createMessage(text);
      await saveMessage(newMessage);
      showMessage(`Sent: ${formatMessage(newMessage)}`);
      break;

    case 'read':
      const messages = await readMessages();
      const formatted = messages.map(formatMessage);
      showHistory(formatted);
      break;

    case 'help':
    default:
      showHelp();
      break;
  }
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
