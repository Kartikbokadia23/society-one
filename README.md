# SocietyOne

Monorepo (npm workspaces) for the SocietyOne Smart Apartment OS.

| Package | Purpose |
| --- | --- |
| `shared/` | Single data model: TypeScript types (`types.ts`) and SQL migrations (`migrations.ts`) |
| `api/` | Node + TypeScript + Express API, SQLite (better-sqlite3), JWT, zod |
| `mobile/` | Expo React Native app: design tokens, shared components, tab + stack navigation, typed API client |

## Run

```sh
npm install
npm run build          # builds shared + api
npm run migrate        # applies migrations (DATABASE_PATH, default ./societyone.db)
npm run api            # API on :3000, GET /health
npm run mobile         # Expo dev server (set EXPO_PUBLIC_API_URL)
npm test               # shared, api and mobile unit tests (CI mode)
```

## Conventions

- All styling comes from `mobile/src/theme/tokens.ts`; use the components in `mobile/src/components`.
- Change the data model only in `shared/` (add a new migration; never edit an applied one).
- Secrets (e.g. `JWT_SECRET`) come from the environment, never from code.
