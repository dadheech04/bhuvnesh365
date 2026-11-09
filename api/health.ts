// api/health.ts – Health check + DB connectivity test
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { neon } from '@neondatabase/serverless';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  try {
    const sql = neon(process.env.DATABASE_URL!);
    const result = await sql`SELECT NOW() as time`;
    return res.status(200).json({
      status: 'healthy',
      app: 'BHUVNESH 365',
      db: 'connected',
      dbTime: result[0].time,
    });
  } catch (err: any) {
    return res.status(500).json({
      status: 'unhealthy',
      db: 'disconnected',
      error: err.message,
    });
  }
}
