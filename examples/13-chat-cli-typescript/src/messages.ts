import { Message } from './types.js';

export function createMessage(text: string, sender: string): Message {
  return {
    id: crypto.randomUUID(),
    sender,
    content: text,
    timestamp: new Date().toISOString()
  };
}

export function formatMessage(message: Message): string {
  const time = new Date(message.timestamp).toLocaleTimeString();
  return `[${time}] ${message.sender}: ${message.content}`;
}
