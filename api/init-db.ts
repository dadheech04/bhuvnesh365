// api/init-db.ts – Run once to create all tables
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { neon } from '@neondatabase/serverless';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Simple security: only allow if secret header matches
  if (req.headers['x-init-secret'] !== process.env.INIT_SECRET) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  const sql = neon(process.env.DATABASE_URL!);

  try {
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY DEFAULT 'bhuvnesh_dadheech',
        profile JSONB NOT NULL DEFAULT '{}',
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      )
    `;
    await sql`
      CREATE TABLE IF NOT EXISTS workout_sessions (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL DEFAULT 'bhuvnesh_dadheech',
        date DATE NOT NULL,
        data JSONB NOT NULL DEFAULT '{}',
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      )
    `;
    await sql`CREATE INDEX IF NOT EXISTS idx_workout_date ON workout_sessions(date)`;

    await sql`
      CREATE TABLE IF NOT EXISTS cardio_sessions (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL DEFAULT 'bhuvnesh_dadheech',
        date DATE NOT NULL,
        data JSONB NOT NULL DEFAULT '{}',
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      )
    `;
    await sql`CREATE INDEX IF NOT EXISTS idx_cardio_date ON cardio_sessions(date)`;

    await sql`
      CREATE TABLE IF NOT EXISTS swimming_sessions (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL DEFAULT 'bhuvnesh_dadheech',
        date DATE NOT NULL,
        data JSONB NOT NULL DEFAULT '{}',
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS meditation_sessions (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL DEFAULT 'bhuvnesh_dadheech',
        date DATE NOT NULL,
        data JSONB NOT NULL DEFAULT '{}',
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS nutrition_logs (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL DEFAULT 'bhuvnesh_dadheech',
        date DATE NOT NULL UNIQUE,
        data JSONB NOT NULL DEFAULT '{}',
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS skincare_logs (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL DEFAULT 'bhuvnesh_dadheech',
        date DATE NOT NULL UNIQUE,
        data JSONB NOT NULL DEFAULT '{}',
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS recovery_logs (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL DEFAULT 'bhuvnesh_dadheech',
        date DATE NOT NULL UNIQUE,
        data JSONB NOT NULL DEFAULT '{}',
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS habits_logs (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL DEFAULT 'bhuvnesh_dadheech',
        date DATE NOT NULL UNIQUE,
        data JSONB NOT NULL DEFAULT '{}',
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS sports_activities (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL DEFAULT 'bhuvnesh_dadheech',
        date DATE NOT NULL,
        data JSONB NOT NULL DEFAULT '{}',
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS achievements (
        user_id TEXT PRIMARY KEY DEFAULT 'bhuvnesh_dadheech',
        data JSONB NOT NULL DEFAULT '{}',
        updated_at TIMESTAMPTZ DEFAULT NOW()
      )
    `;

    res.status(200).json({ success: true, message: 'All tables created successfully' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}
