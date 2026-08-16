# i-ERP Frontend

Production-oriented React + Vite shell for **i-ERP — Intelligent Enterprise Platform**.

Full architecture, libraries, and runtime flows: [docs/FRONTEND_ARCHITECTURE.md](docs/FRONTEND_ARCHITECTURE.md).

## Stack

React, Vite, TypeScript, MUI, Redux Toolkit, React Router, Axios, TanStack Table, TanStack Virtual.

## Run

```bash
npm install
npm run dev
```

Demo login (mock mode, default):

- Email: `aarav.mehta@ierp.local`
- Password: `Demo@Ierp2026`

## Scripts

- `npm run dev` — local development
- `npm run build` — type-check and production build
- `npm run preview` — serve the production build
- `npm run lint` — ESLint
- `npm run format` — Prettier

## Configuration

Copy `.env.example` to `.env`.

| Variable | Purpose |
| --- | --- |
| `VITE_API_BASE_URL` | ASP.NET Core API origin |
| `VITE_USE_MOCK` | `true` uses local mock data until the API is connected |

Refresh tokens are expected as HttpOnly cookies. Access tokens stay in memory.

## What this foundation includes

- Dark enterprise shell matching the supplied dashboard/leads references
- Central API client with refresh-token queue
- Auth, tenant and permission state
- Reusable KPI, table, form, dialog and state components
- Dashboard and CRM Leads (list, create, edit, view)
- GenericPage metadata renderer with custom-field merge
