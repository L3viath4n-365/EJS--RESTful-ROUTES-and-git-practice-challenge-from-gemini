import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const db = new pg.Pool(
  process.env.DATABASE_URL
    ? {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    }
    : {}
);

db.connect((err, client, release) => {
  if (err) {
    console.error('Connection error:', err.stack);
  } else {
    console.log('Connected to PostgreSQL database');
    release();
  }
});


export default db;