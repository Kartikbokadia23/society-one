# SocietyOne

Monorepo (npm workspaces):

- `shared/` – data model as TypeScript types (`src/types.ts`) and SQL migrations (`migrations/`)
- `api/` – Node + TypeScript + Express API (health route, error middleware, migration runner, SQLite)
- `mobile/` – Expo React Native app (design tokens, shared components, tab + stack shell, typed API client)

## Run

```
npm install
npm run migrate          # creates societyone.db (DATABASE_FILE to override)
npm run build && npm run start:api   # API on :3000 (PORT), GET /health
npm run start:mobile     # Expo; set EXPO_PUBLIC_API_URL to the API address
```

## Test

```
npm test       # shared, api and mobile unit tests (CI mode)
npm run typecheck
```

All styling comes from `mobile/src/theme/tokens.ts`.
