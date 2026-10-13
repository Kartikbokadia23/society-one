import cors from 'cors';
import express from 'express';
import type { HealthResponse } from '@societyone/shared';
import type { Db } from './db';
import { errorHandler, notFoundHandler } from './middleware';

export function createApp(db: Db) {
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.get('/health', (_req, res) => {
    db.prepare('SELECT 1').get();
    const body: HealthResponse = { status: 'ok', uptime: process.uptime() };
    res.json(body);
  });

  app.use(notFoundHandler);
  app.use(errorHandler);
  return app;
}
