import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { Message, ChatHistory } from './types.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_FILE = path.join(__dirname, '../data/messages.json');

export async function readMessages(): Promise<Message[]> {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf8');
    const history: ChatHistory = JSON.parse(data);
    return history.messages;
  } catch {
    return [];
  }
}

export async function saveMessage(message: Message): Promise<void> {
  const messages = await readMessages();
  messages.push(message);

  const history: ChatHistory = {
    messages,
    lastUpdated: new Date().toISOString()
  };

  // Ensure data directory exists
  const dataDir = path.dirname(DATA_FILE);
  await fs.mkdir(dataDir, { recursive: true });

  await fs.writeFile(DATA_FILE, JSON.stringify(history, null, 2));
}
