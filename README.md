# SocietyOne

Monorepo (npm workspaces):

| Package | Purpose |
|---|---|
| `shared/` | Data model TypeScript types + SQL migrations (`migrations/*.sql`) |
| `api/` | Node + Express + TypeScript API (SQLite via better-sqlite3, JWT, zod) |
| `mobile/` | Expo React Native app: design tokens, shared components, tab + stack shell, typed API client |

## Run

```
npm install
npm run build                       # builds shared + api
JWT_SECRET=change-me npm run migrate
JWT_SECRET=change-me npm run start:api   # GET http://localhost:3000/health
npm run start:mobile                # Expo; set EXPO_PUBLIC_API_URL for the API address
npm test                            # API + mobile unit tests (CI mode)
```

API env: `JWT_SECRET` (required), `PORT` (3000), `DATABASE_PATH` (societyone.db).

Status: foundation only. Mobile screens are placeholders and are not yet wired to API data; feature modules build on this base.
