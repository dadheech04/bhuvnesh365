// api/achievements.ts – GET and POST achievements
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
      const rows = await sql`SELECT data FROM achievements WHERE user_id = ${USER_ID}`;
      if (rows.length === 0) return res.status(200).json([]);
      return res.status(200).json(rows[0].data);
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }

  if (req.method === 'POST') {
    try {
      const data = req.body;
      await sql`
        INSERT INTO achievements (user_id, data, updated_at)
        VALUES (${USER_ID}, ${JSON.stringify(data)}, NOW())
        ON CONFLICT (user_id) DO UPDATE SET data = EXCLUDED.data, updated_at = NOW()
      `;
      return res.status(200).json({ success: true });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
