import initSqlJs from 'sql.js';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, '../db/chat.db');
const schemaPath = path.join(__dirname, '../db/schema.sql');

// Initialize sql.js
const SQL = await initSqlJs();

// Load existing database or create new one
let db;
if (fs.existsSync(dbPath)) {
  const buffer = fs.readFileSync(dbPath);
  db = new SQL.Database(buffer);
} else {
  db = new SQL.Database();
}

// Initialize schema
const schema = fs.readFileSync(schemaPath, 'utf8');
db.run(schema);

// Save database to file
function saveDatabase() {
  const data = db.export();
  const buffer = Buffer.from(data);
  fs.writeFileSync(dbPath, buffer);
}

// Wrapper to provide better-sqlite3-like interface
const dbWrapper = {
  prepare(sql) {
    return {
      all(...params) {
        const stmt = db.prepare(sql);
        if (params.length > 0) {
          stmt.bind(params);
        }
        const results = [];
        while (stmt.step()) {
          results.push(stmt.getAsObject());
        }
        stmt.free();
        return results;
      },
      run(...params) {
        db.run(sql, params);
        saveDatabase();
        return { changes: db.getRowsModified() };
      },
      get(...params) {
        const stmt = db.prepare(sql);
        if (params.length > 0) {
          stmt.bind(params);
        }
        let result = null;
        if (stmt.step()) {
          result = stmt.getAsObject();
        }
        stmt.free();
        return result;
      }
    };
  },
  exec(sql) {
    db.exec(sql);
    saveDatabase();
  },
  close() {
    db.close();
  }
};

export default dbWrapper;
