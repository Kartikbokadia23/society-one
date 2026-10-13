export interface Config {
  port: number;
  databasePath: string;
  jwtSecret: string;
}

export function loadConfig(env: NodeJS.ProcessEnv = process.env): Config {
  const jwtSecret = env.JWT_SECRET;
  if (!jwtSecret) throw new Error('JWT_SECRET must be set');
  return {
    port: Number(env.PORT ?? 3000),
    databasePath: env.DATABASE_PATH ?? 'societyone.db',
    jwtSecret,
  };
}
