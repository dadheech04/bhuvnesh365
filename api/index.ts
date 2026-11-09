// api/index.ts – Single unified API handler (stays within Vercel Hobby 12-function limit)
// Routes: /api?resource=profile|workouts|cardio|swimming|meditation|sports|achievements|health
//         /api?resource=nutrition&date=YYYY-MM-DD
//         /api?resource=skincare&date=YYYY-MM-DD
//         /api?resource=recovery&date=YYYY-MM-DD
//         /api?resource=habits&date=YYYY-MM-DD

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { neon } from '@neondatabase/serverless';

const USER_ID = 'bhuvnesh_dadheech';

function setCORS(res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCORS(res);
  if (req.method === 'OPTIONS') return res.status(200).end();

  const resource = (req.query.resource as string) || '';
  const date = (req.query.date as string) || new Date().toISOString().split('T')[0];
  const sql = neon(process.env.DATABASE_URL!);

  try {
    // ── Health check ──────────────────────────────────────────
    if (resource === 'health') {
      const r = await sql`SELECT NOW() as time`;
      return res.status(200).json({ status: 'healthy', app: 'BHUVNESH 365', db: 'connected', dbTime: r[0].time });
    }

    // ── Profile ───────────────────────────────────────────────
    if (resource === 'profile') {
      if (req.method === 'GET') {
        const rows = await sql`SELECT profile FROM users WHERE id = ${USER_ID}`;
        return res.status(200).json(rows.length ? rows[0].profile : null);
      }
      if (req.method === 'POST') {
        await sql`INSERT INTO users (id, profile, updated_at) VALUES (${USER_ID}, ${JSON.stringify(req.body)}, NOW())
          ON CONFLICT (id) DO UPDATE SET profile = EXCLUDED.profile, updated_at = NOW()`;
        return res.status(200).json({ success: true });
      }
    }

    // ── Workouts ──────────────────────────────────────────────
    if (resource === 'workouts') {
      if (req.method === 'GET') {
        const rows = await sql`SELECT data FROM workout_sessions WHERE user_id = ${USER_ID} ORDER BY date DESC`;
        return res.status(200).json(rows.map((r: any) => r.data));
      }
      if (req.method === 'POST') {
        const s = req.body;
        const id = s.id || `workout_${Date.now()}`;
        const d = s.date || date;
        await sql`INSERT INTO workout_sessions (id, user_id, date, data, updated_at) VALUES (${id}, ${USER_ID}, ${d}, ${JSON.stringify(s)}, NOW())
          ON CONFLICT (id) DO UPDATE SET data = EXCLUDED.data, updated_at = NOW()`;
        return res.status(200).json({ success: true, id });
      }
    }

    // ── Cardio ────────────────────────────────────────────────
    if (resource === 'cardio') {
      if (req.method === 'GET') {
        const rows = await sql`SELECT data FROM cardio_sessions WHERE user_id = ${USER_ID} ORDER BY date DESC`;
        return res.status(200).json(rows.map((r: any) => r.data));
      }
      if (req.method === 'POST') {
        const s = req.body;
        const id = s.id || `cardio_${Date.now()}`;
        const d = s.date || date;
        await sql`INSERT INTO cardio_sessions (id, user_id, date, data, updated_at) VALUES (${id}, ${USER_ID}, ${d}, ${JSON.stringify(s)}, NOW())
          ON CONFLICT (id) DO UPDATE SET data = EXCLUDED.data, updated_at = NOW()`;
        return res.status(200).json({ success: true, id });
      }
    }

    // ── Swimming ──────────────────────────────────────────────
    if (resource === 'swimming') {
      if (req.method === 'GET') {
        const rows = await sql`SELECT data FROM swimming_sessions WHERE user_id = ${USER_ID} ORDER BY date DESC`;
        return res.status(200).json(rows.map((r: any) => r.data));
      }
      if (req.method === 'POST') {
        const s = req.body;
        const id = s.id || `swim_${Date.now()}`;
        const d = s.date || date;
        await sql`INSERT INTO swimming_sessions (id, user_id, date, data, updated_at) VALUES (${id}, ${USER_ID}, ${d}, ${JSON.stringify(s)}, NOW())
          ON CONFLICT (id) DO UPDATE SET data = EXCLUDED.data, updated_at = NOW()`;
        return res.status(200).json({ success: true, id });
      }
    }

    // ── Meditation ────────────────────────────────────────────
    if (resource === 'meditation') {
      if (req.method === 'GET') {
        const rows = await sql`SELECT data FROM meditation_sessions WHERE user_id = ${USER_ID} ORDER BY date DESC`;
        return res.status(200).json(rows.map((r: any) => r.data));
      }
      if (req.method === 'POST') {
        const s = req.body;
        const id = s.id || `meditation_${Date.now()}`;
        const d = s.date || date;
        await sql`INSERT INTO meditation_sessions (id, user_id, date, data, updated_at) VALUES (${id}, ${USER_ID}, ${d}, ${JSON.stringify(s)}, NOW())
          ON CONFLICT (id) DO UPDATE SET data = EXCLUDED.data, updated_at = NOW()`;
        return res.status(200).json({ success: true, id });
      }
    }

    // ── Nutrition ─────────────────────────────────────────────
    if (resource === 'nutrition') {
      if (req.method === 'GET') {
        const rows = await sql`SELECT data FROM nutrition_logs WHERE user_id = ${USER_ID} AND date = ${date}`;
        return res.status(200).json(rows.length ? rows[0].data : null);
      }
      if (req.method === 'POST') {
        const id = `nutrition_${USER_ID}_${date}`;
        await sql`INSERT INTO nutrition_logs (id, user_id, date, data, updated_at) VALUES (${id}, ${USER_ID}, ${date}, ${JSON.stringify(req.body)}, NOW())
          ON CONFLICT (date) DO UPDATE SET data = EXCLUDED.data, updated_at = NOW()`;
        return res.status(200).json({ success: true });
      }
    }

    // ── Skincare ──────────────────────────────────────────────
    if (resource === 'skincare') {
      if (req.method === 'GET') {
        const rows = await sql`SELECT data FROM skincare_logs WHERE user_id = ${USER_ID} AND date = ${date}`;
        return res.status(200).json(rows.length ? rows[0].data : null);
      }
      if (req.method === 'POST') {
        const id = `skincare_${USER_ID}_${date}`;
        await sql`INSERT INTO skincare_logs (id, user_id, date, data, updated_at) VALUES (${id}, ${USER_ID}, ${date}, ${JSON.stringify(req.body)}, NOW())
          ON CONFLICT (date) DO UPDATE SET data = EXCLUDED.data, updated_at = NOW()`;
        return res.status(200).json({ success: true });
      }
    }

    // ── Recovery ──────────────────────────────────────────────
    if (resource === 'recovery') {
      if (req.method === 'GET') {
        const rows = await sql`SELECT data FROM recovery_logs WHERE user_id = ${USER_ID} AND date = ${date}`;
        return res.status(200).json(rows.length ? rows[0].data : null);
      }
      if (req.method === 'POST') {
        const id = `recovery_${USER_ID}_${date}`;
        await sql`INSERT INTO recovery_logs (id, user_id, date, data, updated_at) VALUES (${id}, ${USER_ID}, ${date}, ${JSON.stringify(req.body)}, NOW())
          ON CONFLICT (date) DO UPDATE SET data = EXCLUDED.data, updated_at = NOW()`;
        return res.status(200).json({ success: true });
      }
    }

    // ── Habits ────────────────────────────────────────────────
    if (resource === 'habits') {
      if (req.method === 'GET') {
        const rows = await sql`SELECT data FROM habits_logs WHERE user_id = ${USER_ID} AND date = ${date}`;
        return res.status(200).json(rows.length ? rows[0].data : null);
      }
      if (req.method === 'POST') {
        const id = `habits_${USER_ID}_${date}`;
        await sql`INSERT INTO habits_logs (id, user_id, date, data, updated_at) VALUES (${id}, ${USER_ID}, ${date}, ${JSON.stringify(req.body)}, NOW())
          ON CONFLICT (date) DO UPDATE SET data = EXCLUDED.data, updated_at = NOW()`;
        return res.status(200).json({ success: true });
      }
    }

    // ── Sports ────────────────────────────────────────────────
    if (resource === 'sports') {
      if (req.method === 'GET') {
        const rows = await sql`SELECT data FROM sports_activities WHERE user_id = ${USER_ID} ORDER BY date DESC`;
        return res.status(200).json(rows.map((r: any) => r.data));
      }
      if (req.method === 'POST') {
        const a = req.body;
        const id = a.id || `sport_${Date.now()}`;
        const d = a.date || date;
        await sql`INSERT INTO sports_activities (id, user_id, date, data, updated_at) VALUES (${id}, ${USER_ID}, ${d}, ${JSON.stringify(a)}, NOW())
          ON CONFLICT (id) DO UPDATE SET data = EXCLUDED.data, updated_at = NOW()`;
        return res.status(200).json({ success: true, id });
      }
    }

    // ── Achievements ──────────────────────────────────────────
    if (resource === 'achievements') {
      if (req.method === 'GET') {
        const rows = await sql`SELECT data FROM achievements WHERE user_id = ${USER_ID}`;
        return res.status(200).json(rows.length ? rows[0].data : []);
      }
      if (req.method === 'POST') {
        await sql`INSERT INTO achievements (user_id, data, updated_at) VALUES (${USER_ID}, ${JSON.stringify(req.body)}, NOW())
          ON CONFLICT (user_id) DO UPDATE SET data = EXCLUDED.data, updated_at = NOW()`;
        return res.status(200).json({ success: true });
      }
    }

    return res.status(400).json({ error: `Unknown resource: "${resource}". Use ?resource=profile|workouts|cardio|swimming|meditation|nutrition|skincare|recovery|habits|sports|achievements|health` });
  } catch (err: any) {
    console.error(`[API Error] resource=${resource}`, err);
    return res.status(500).json({ error: err.message });
  }
}
