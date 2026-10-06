import cors from 'cors';
import express from 'express';
import type { Database } from 'better-sqlite3';
import { errorHandler, notFoundHandler } from './middleware';

export function createApp(db?: Database) {
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.get('/health', (_req, res) => {
    let dbStatus: 'up' | 'down' | 'unconfigured' = 'unconfigured';
    if (db) {
      try {
        db.prepare('SELECT 1').get();
        dbStatus = 'up';
      } catch {
        dbStatus = 'down';
      }
    }
    res.status(dbStatus === 'down' ? 503 : 200).json({
      status: dbStatus === 'down' ? 'degraded' : 'ok',
      db: dbStatus,
      uptime: process.uptime(),
    });
  });

  app.use(notFoundHandler);
  app.use(errorHandler);
  return app;
}
