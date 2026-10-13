import cors from 'cors';
import express from 'express';
import type { HealthResponse } from '@societyone/shared';
import { errorHandler, notFoundHandler } from './middleware';

export function createApp() {
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.get('/health', (_req, res) => {
    const body: HealthResponse = {
      status: 'ok',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    };
    res.json(body);
  });

  app.use(notFoundHandler);
  app.use(errorHandler);
  return app;
}
