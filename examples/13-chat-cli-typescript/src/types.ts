export type UserId = string;

export interface Message {
  id: string;
  sender: UserId;
  content: string;
  timestamp: string; // ISO 8601
}

export interface ChatHistory {
  messages: Message[];
  lastUpdated: string;
}
