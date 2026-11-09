-- BHUVNESH 365 – Database Schema
-- Run this once against your Neon PostgreSQL database

CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY DEFAULT 'bhuvnesh_dadheech',
  profile JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS workout_sessions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL DEFAULT 'bhuvnesh_dadheech',
  date DATE NOT NULL,
  data JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS cardio_sessions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL DEFAULT 'bhuvnesh_dadheech',
  date DATE NOT NULL,
  data JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS swimming_sessions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL DEFAULT 'bhuvnesh_dadheech',
  date DATE NOT NULL,
  data JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS meditation_sessions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL DEFAULT 'bhuvnesh_dadheech',
  date DATE NOT NULL,
  data JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS nutrition_logs (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL DEFAULT 'bhuvnesh_dadheech',
  date DATE NOT NULL UNIQUE,
  data JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS skincare_logs (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL DEFAULT 'bhuvnesh_dadheech',
  date DATE NOT NULL UNIQUE,
  data JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS recovery_logs (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL DEFAULT 'bhuvnesh_dadheech',
  date DATE NOT NULL UNIQUE,
  data JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS habits_logs (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL DEFAULT 'bhuvnesh_dadheech',
  date DATE NOT NULL UNIQUE,
  data JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS sports_activities (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL DEFAULT 'bhuvnesh_dadheech',
  date DATE NOT NULL,
  data JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS achievements (
  user_id TEXT PRIMARY KEY DEFAULT 'bhuvnesh_dadheech',
  data JSONB NOT NULL DEFAULT '{}',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS sync_log (
  id SERIAL PRIMARY KEY,
  user_id TEXT NOT NULL DEFAULT 'bhuvnesh_dadheech',
  table_name TEXT NOT NULL,
  record_id TEXT NOT NULL,
  action TEXT NOT NULL,
  synced_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for fast lookups by date
CREATE INDEX IF NOT EXISTS idx_workout_sessions_date ON workout_sessions(date);
CREATE INDEX IF NOT EXISTS idx_cardio_sessions_date ON cardio_sessions(date);
CREATE INDEX IF NOT EXISTS idx_swimming_sessions_date ON swimming_sessions(date);
CREATE INDEX IF NOT EXISTS idx_meditation_sessions_date ON meditation_sessions(date);
CREATE INDEX IF NOT EXISTS idx_nutrition_logs_date ON nutrition_logs(date);
CREATE INDEX IF NOT EXISTS idx_skincare_logs_date ON skincare_logs(date);
CREATE INDEX IF NOT EXISTS idx_recovery_logs_date ON recovery_logs(date);
CREATE INDEX IF NOT EXISTS idx_habits_logs_date ON habits_logs(date);
CREATE INDEX IF NOT EXISTS idx_sports_activities_date ON sports_activities(date);
