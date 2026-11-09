// Script to initialize the Neon database schema
const { neon } = require('@neondatabase/serverless');

const DATABASE_URL = 'postgresql://neondb_owner:npg_Y7NnP1KfmhZd@ep-long-glitter-bdp4a1l6-pooler.c-8.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

const sql = neon(DATABASE_URL);

async function initDb() {
  console.log('Connecting to Neon PostgreSQL...');
  
  const tables = [
    {
      name: 'users',
      sql: `CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        profile JSONB NOT NULL DEFAULT '{}',
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      )`
    },
    {
      name: 'workout_sessions',
      sql: `CREATE TABLE IF NOT EXISTS workout_sessions (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL DEFAULT 'bhuvnesh_dadheech',
        date DATE NOT NULL,
        data JSONB NOT NULL DEFAULT '{}',
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      )`
    },
    {
      name: 'cardio_sessions',
      sql: `CREATE TABLE IF NOT EXISTS cardio_sessions (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL DEFAULT 'bhuvnesh_dadheech',
        date DATE NOT NULL,
        data JSONB NOT NULL DEFAULT '{}',
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      )`
    },
    {
      name: 'swimming_sessions',
      sql: `CREATE TABLE IF NOT EXISTS swimming_sessions (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL DEFAULT 'bhuvnesh_dadheech',
        date DATE NOT NULL,
        data JSONB NOT NULL DEFAULT '{}',
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      )`
    },
    {
      name: 'meditation_sessions',
      sql: `CREATE TABLE IF NOT EXISTS meditation_sessions (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL DEFAULT 'bhuvnesh_dadheech',
        date DATE NOT NULL,
        data JSONB NOT NULL DEFAULT '{}',
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      )`
    },
    {
      name: 'nutrition_logs',
      sql: `CREATE TABLE IF NOT EXISTS nutrition_logs (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL DEFAULT 'bhuvnesh_dadheech',
        date DATE NOT NULL UNIQUE,
        data JSONB NOT NULL DEFAULT '{}',
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      )`
    },
    {
      name: 'skincare_logs',
      sql: `CREATE TABLE IF NOT EXISTS skincare_logs (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL DEFAULT 'bhuvnesh_dadheech',
        date DATE NOT NULL UNIQUE,
        data JSONB NOT NULL DEFAULT '{}',
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      )`
    },
    {
      name: 'recovery_logs',
      sql: `CREATE TABLE IF NOT EXISTS recovery_logs (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL DEFAULT 'bhuvnesh_dadheech',
        date DATE NOT NULL UNIQUE,
        data JSONB NOT NULL DEFAULT '{}',
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      )`
    },
    {
      name: 'habits_logs',
      sql: `CREATE TABLE IF NOT EXISTS habits_logs (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL DEFAULT 'bhuvnesh_dadheech',
        date DATE NOT NULL UNIQUE,
        data JSONB NOT NULL DEFAULT '{}',
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      )`
    },
    {
      name: 'sports_activities',
      sql: `CREATE TABLE IF NOT EXISTS sports_activities (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL DEFAULT 'bhuvnesh_dadheech',
        date DATE NOT NULL,
        data JSONB NOT NULL DEFAULT '{}',
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      )`
    },
    {
      name: 'achievements',
      sql: `CREATE TABLE IF NOT EXISTS achievements (
        user_id TEXT PRIMARY KEY,
        data JSONB NOT NULL DEFAULT '{}',
        updated_at TIMESTAMPTZ DEFAULT NOW()
      )`
    }
  ];

  for (const table of tables) {
    await sql.unsafe(table.sql);
    console.log(`  ✓ Table created: ${table.name}`);
  }

  // Create indexes
  await sql.unsafe(`CREATE INDEX IF NOT EXISTS idx_workout_date ON workout_sessions(date)`);
  await sql.unsafe(`CREATE INDEX IF NOT EXISTS idx_cardio_date ON cardio_sessions(date)`);
  await sql.unsafe(`CREATE INDEX IF NOT EXISTS idx_swim_date ON swimming_sessions(date)`);
  await sql.unsafe(`CREATE INDEX IF NOT EXISTS idx_meditation_date ON meditation_sessions(date)`);
  await sql.unsafe(`CREATE INDEX IF NOT EXISTS idx_sports_date ON sports_activities(date)`);
  console.log('  ✓ Indexes created');

  // Verify
  const result = await sql.unsafe(
    `SELECT table_name FROM information_schema.tables WHERE table_schema='public' ORDER BY table_name`
  );
  console.log('\n✅ Database initialized! Tables in Neon:');
  result.forEach(r => console.log('  -', r.table_name));
}

initDb().catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
