import cors from 'cors';
import express from 'express';
import type { HealthResponse } from '@societyone/shared';
import type { Db } from './db';
import { errorHandler, notFoundHandler } from './errors';

export function createApp(_db?: Db) {
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.get('/health', (_req, res) => {
    const body: HealthResponse = { status: 'ok', uptime: process.uptime() };
    res.json(body);
  });

  app.use(notFoundHandler);
  app.use(errorHandler);
  return app;
}
