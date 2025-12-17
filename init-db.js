#!/usr/bin/env node

// Database initialization script for SQLite
import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, 'app.db');

console.log(`Initializing SQLite database at: ${dbPath}`);

const db = new Database(dbPath);
db.pragma('journal_mode = WAL');

// Create tables
const schema = `
-- Users table
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL
);

-- Discord config table
CREATE TABLE IF NOT EXISTS discord_config (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  guild_id TEXT NOT NULL UNIQUE,
  webhook_url TEXT,
  spawn_alerts_15min INTEGER DEFAULT 1,
  spawn_alerts_now INTEGER DEFAULT 1,
  kill_logs INTEGER DEFAULT 1,
  daily_summary INTEGER DEFAULT 0
);

-- Boss state table
CREATE TABLE IF NOT EXISTS boss_state (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  boss_id TEXT NOT NULL UNIQUE,
  last_killed_time INTEGER,
  auto_spawned_at INTEGER
);
`;

try {
  db.exec(schema);
  console.log('✓ Database initialized successfully');
  console.log('✓ Created tables: users, discord_config, boss_state');
} catch (error) {
  console.error('✗ Error initializing database:', error.message);
  process.exit(1);
}

db.close();
