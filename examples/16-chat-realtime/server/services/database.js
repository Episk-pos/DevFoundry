import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, '../db/chat.db');
const schemaPath = path.join(__dirname, '../db/schema.sql');

const db = new Database(dbPath);

// Initialize database with schema
const schema = fs.readFileSync(schemaPath, 'utf8');
db.exec(schema);

export default db;
