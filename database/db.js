import pg from 'pg';

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

const createDbTable = async () => {
  const sqlQuery = `
    CREATE TABLE IF NOT EXISTS public.projects (
      id UUID PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      tech_stack VARCHAR(255) NOT NULL,
      status VARCHAR(50) NOT NULL,
      health_score INT NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;
  try {
    await db.query(sqlQuery);
    console.log('Connected to PostgreSQL database.');
    console.log('Database schema verified: "projects" table is ready.');
  } catch (err) {
    console.error('Database schema initialization failed:', err.message);
  }
};

createDbTable();

export default db;