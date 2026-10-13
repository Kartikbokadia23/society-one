# SocietyOne

Monorepo (npm workspaces):

- `shared/` – data model TypeScript types (`src/types.ts`) and SQL migrations (`migrations/*.sql`)
- `api/` – Node + TypeScript + Express API (SQLite via better-sqlite3, JWT, zod)
- `mobile/` – Expo React Native app (React Navigation, design tokens in `src/theme`, shared components in `src/components`, typed API client in `src/api`)

## Run

```
npm install
npm run build          # builds shared + api
npm run migrate        # applies migrations to DATABASE_FILE (default societyone.db)
npm run start:api      # http://localhost:3000/health
npm run start:mobile   # Expo; set EXPO_PUBLIC_API_URL to the API address
npm test               # API + mobile unit tests (CI mode)
```

Configuration comes from the environment: `PORT`, `DATABASE_FILE`, `MIGRATIONS_DIR`, `EXPO_PUBLIC_API_URL`.
