// api/profile.ts – GET and POST user profile
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { neon } from '@neondatabase/serverless';

const USER_ID = 'bhuvnesh_dadheech';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const sql = neon(process.env.DATABASE_URL!);

  if (req.method === 'GET') {
    try {
      const rows = await sql`SELECT profile FROM users WHERE id = ${USER_ID}`;
      if (rows.length === 0) return res.status(200).json(null);
      return res.status(200).json(rows[0].profile);
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }

  if (req.method === 'POST') {
    try {
      const profile = req.body;
      await sql`
        INSERT INTO users (id, profile, updated_at)
        VALUES (${USER_ID}, ${JSON.stringify(profile)}, NOW())
        ON CONFLICT (id) DO UPDATE SET profile = EXCLUDED.profile, updated_at = NOW()
      `;
      return res.status(200).json({ success: true });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
