# Copilot Instructions for sokos-up-fastedata

## Project Overview

A React microfrontend for displaying reference/configuration data ("faste data") from the Oppdragssystemet payment system. Part of NAV's Utbetalingsportalen. The backend API is [sokos-oppdrag](https://github.com/navikt/sokos-oppdrag).

## Commands

- **Dev (mock):** `pnpm run dev` — runs with MSW mock data at http://localhost:5173/fastedata
- **Dev (backend):** `pnpm run dev:backend` — proxies to local backend at localhost:8080
- **Build:** `pnpm run build` (runs `tsc && vite build`)
- **Lint:** `pnpm run biome:check` (code) and `pnpm run stylelint:check` (CSS)
- **Fix:** `pnpm run biome:fix` and `pnpm run stylelint:fix`
- **E2E tests:** `pnpm run playwright` (starts dev server automatically)
- **Single E2E test:** `pnpm exec playwright test <test-file> --project=chromium`
- **Server build:** `cd server && pnpm run build`

## Architecture

### Microfrontend

The app is built as a single ES module bundle (`dist/bundle.js`) via Vite with `react` and `react-dom` as external dependencies. It is loaded by the host application (Utbetalingsportalen) at runtime. CSS is injected by JS (`vite-plugin-css-injected-by-js`), not served separately.

The entry point for the bundle is `src/App.tsx` (not `main.tsx`). `main.tsx` is only used for local development — it mounts the app with MSW and React StrictMode.

### Server

A minimal Express server in `server/` serves the built frontend with Brotli compression. It has its own `package.json`, `tsconfig.json`, and `node_modules`. It only provides static file serving and health endpoints (`/internal/isAlive`, `/internal/isReady`).

### Data Fetching

All API calls use SWR (`useSWRImmutable`) with Axios. Custom hooks in `src/api/apiService.ts` follow the pattern `useGet<Entity>()` returning `{ data, error, isLoading }`. The base API path is `/oppdrag-api/api/v1/fastedata`.

### Mock Data

MSW (Mock Service Worker) provides mock data during local development (`pnpm run dev`). Handlers are in `mock/handlers.ts` with fixture data in `mock/data/`. MSW is only activated when `MODE === "mock"`.

### Routing

React Router with `BrowserRouter`. All routes are defined in `src/App.tsx`. Route path constants live in `src/util/paths.ts`.

## Key Conventions

- **Language:** UI text, types, variable names, and comments are in Norwegian.
- **Linting:** Biome for code formatting/linting, Stylelint with NAV Aksel rules for CSS. `noConsole` and `noExplicitAny` are errors.
- **CSS:** CSS Modules with scoped class names (`[name]__[local]___[hash:base64:5]`). Uses NAV's Aksel design system (`@navikt/ds-react` and `@navikt/ds-css`).
- **Types:** Each domain entity has a type file in `src/types/` and a Zod schema in `src/types/schema/`.
- **Shared components:** Reusable UI components (filters, loaders, table controls) live in `src/common/`.
- **Pre-commit hook:** Husky runs `lint-staged` (Biome + Stylelint) on commit.
- **Node/pnpm:** Requires Node ≥ 24.13.0 and pnpm ≥ 10.16.0.
- **E2E tests:** Playwright tests in `playwright-tests/`, including accessibility checks via `@axe-core/playwright`. Tests run against Chromium and Firefox.
