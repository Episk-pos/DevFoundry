import pg from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const schemaPath = path.join(__dirname, '../db/schema.sql');

export const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:secret@localhost:5432/chat',
});

export async function initialize(retries = 10, delay = 2000) {
  const schema = fs.readFileSync(schemaPath, 'utf8');

  for (let i = 0; i < retries; i++) {
    try {
      await pool.query(schema);
      console.log('Database initialized');
      return;
    } catch (err) {
      if (i < retries - 1) {
        console.log(`Database not ready, retrying in ${delay}ms... (${i + 1}/${retries})`);
        await new Promise((r) => setTimeout(r, delay));
      } else {
        throw err;
      }
    }
  }
}
