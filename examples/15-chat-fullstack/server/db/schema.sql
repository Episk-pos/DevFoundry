CREATE TABLE IF NOT EXISTS messages (
  id TEXT PRIMARY KEY,
  sender TEXT NOT NULL,
  content TEXT NOT NULL,
  timestamp TEXT NOT NULL
);
