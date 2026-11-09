// api/skincare/[date].ts – GET and POST skincare log for a specific date
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { neon } from '@neondatabase/serverless';

const USER_ID = 'bhuvnesh_dadheech';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { date } = req.query;
  const sql = neon(process.env.DATABASE_URL!);

  if (req.method === 'GET') {
    try {
      const rows = await sql`
        SELECT data FROM skincare_logs
        WHERE user_id = ${USER_ID} AND date = ${date as string}
      `;
      if (rows.length === 0) return res.status(200).json(null);
      return res.status(200).json(rows[0].data);
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }

  if (req.method === 'POST') {
    try {
      const log = req.body;
      const id = `skincare_${USER_ID}_${date}`;
      await sql`
        INSERT INTO skincare_logs (id, user_id, date, data, updated_at)
        VALUES (${id}, ${USER_ID}, ${date as string}, ${JSON.stringify(log)}, NOW())
        ON CONFLICT (date) DO UPDATE SET data = EXCLUDED.data, updated_at = NOW()
      `;
      return res.status(200).json({ success: true });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
