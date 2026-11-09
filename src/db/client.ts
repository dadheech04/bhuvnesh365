// Neon serverless database client
// Used by all API routes

import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

export default sql;
