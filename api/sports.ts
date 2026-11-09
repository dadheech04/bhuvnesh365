// api/sports.ts – GET all and POST sports activities
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
      const rows = await sql`
        SELECT data FROM sports_activities
        WHERE user_id = ${USER_ID}
        ORDER BY date DESC
      `;
      return res.status(200).json(rows.map((r: any) => r.data));
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }

  if (req.method === 'POST') {
    try {
      const activity = req.body;
      const id = activity.id || `sport_${Date.now()}`;
      const date = activity.date || new Date().toISOString().split('T')[0];
      await sql`
        INSERT INTO sports_activities (id, user_id, date, data, updated_at)
        VALUES (${id}, ${USER_ID}, ${date}, ${JSON.stringify(activity)}, NOW())
        ON CONFLICT (id) DO UPDATE SET data = EXCLUDED.data, updated_at = NOW()
      `;
      return res.status(200).json({ success: true, id });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
