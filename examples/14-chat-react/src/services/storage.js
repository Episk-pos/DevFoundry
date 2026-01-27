const STORAGE_KEY = 'df-chat-messages-react';

export const storage = {
  readMessages: () => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },
  
  saveMessages: (messages) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  },
  
  clearHistory: () => {
    localStorage.removeItem(STORAGE_KEY);
  }
};
