import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { Pool } from 'pg';
import * as schema from './schema';
import path from "path";


const DB_NAME = process.env.DB_NAME!;

async function ensureDatabase() {
  // Connect to default postgres db first
  const adminPool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'postgres', // always exists
    ssl: false,
  });

  try {
    const res = await adminPool.query(
      `SELECT 1 FROM pg_database WHERE datname = $1`,
      [DB_NAME]
    );

    if (res.rowCount === 0) {
      console.log(`Database "${DB_NAME}" not found, creating...`);
      await adminPool.query(`CREATE DATABASE "${DB_NAME}"`);
      console.log(`Database "${DB_NAME}" created.`);
    } else {
      console.log(`Database "${DB_NAME}" already exists.`);
    }
  } finally {
    await adminPool.end();
  }
}

async function createDb() {
  await ensureDatabase();

  const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: DB_NAME,
    ssl: false,
  });

  const db = drizzle(pool, { schema });
  return db;
}

export const db = await createDb();