import fs from 'fs/promises';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'messages.json');

/**
 * Ensures the data file exists, creating it with an empty array if not.
 */
async function ensureDataFile() {
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.writeFile(DATA_FILE, JSON.stringify([]));
  }
}

/**
 * Reads all messages from the data file.
 */
export async function readMessages() {
  await ensureDataFile();
  const data = await fs.readFile(DATA_FILE, 'utf8');
  return JSON.parse(data);
}

/**
 * Appends a single message to the data file.
 */
export async function saveMessage(message) {
  const messages = await readMessages();
  messages.push(message);
  await fs.writeFile(DATA_FILE, JSON.stringify(messages, null, 2));
}
