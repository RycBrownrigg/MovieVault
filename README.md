# MovieVault - A Video Content Management System

## Overview
MovieVault is a web-based application for curating, displaying, and managing a personal or shared movie collection. The system stores rich metadata, including genres, people, roles, ownership details, and imagery, exposing CRUD APIs through a Rust backend and a responsive React frontend. Deployment targets an Apache web server that serves the compiled UI and proxies API traffic to the backend service.

## Project Structure
- `backend/` — Actix Web application scaffolded in Rust with a `/api/health` endpoint.
- `frontend/` — Vite + React TypeScript app with a service status dashboard and proxy configuration for the backend.
- `docs/` — Product specification, architecture diagrams, database schema, and task plans.
- `infra/env/` — Environment variable templates for local Docker-based development.
- `docker-compose.yml` — Development stack for MySQL, backend, and frontend containers (idle by default until commands are customised).

## Development Environment Setup

### Prerequisites
- Rust toolchain (`rustup` recommended)
- Node.js 20.x (ships with npm 11.x)
- Docker Desktop or Docker Engine with Compose v2

### First-Time Setup (Docker)
1. Copy the environment template and adjust secrets/ports as needed:
   ```bash
   cp infra/env/development.env.example .env
   ```
2. Start the stack:
   ```bash
   docker compose up -d
   ```
3. Confirm services are running:
   ```bash
   docker compose ps
   ```
4. Shell into containers when required:
   - Backend: `docker compose exec backend bash`
   - Frontend: `docker compose exec frontend sh`

Both app containers default to `sleep infinity`; update the `command` entries to something like `cargo watch -x run` and `npm run dev` once you are ready to run the services continuously inside Docker.

### Local Development (Host Tools)

#### Backend
```bash
cp backend/env.example backend/.env    # customise as needed
cargo run --manifest-path backend/Cargo.toml
```

- Health check: `http://localhost:8080/api/health`
- Formatting: `cargo fmt --manifest-path backend/Cargo.toml`
- Type-checking: `cargo check --manifest-path backend/Cargo.toml`

#### Frontend
```bash
cd frontend
cp env.example .env
npm install
npm run dev
```

- Dev server: `http://localhost:3000`
- Production build: `npm run build`
- Linting: `npm run lint`

The Vite dev server proxies `/api/*` requests to the backend (see `frontend/vite.config.ts`). For production builds the `VITE_API_BASE_URL` environment variable controls the API origin.

## Database & Migrations
- Install Diesel CLI locally: `cargo install diesel_cli --no-default-features --features mysql`
- Ensure the database container is running: `docker compose up -d db`
- Migrations (to be added) will live under `backend/migrations/` and can be executed with `diesel migration run`.

## Key Features (Planned)
1. **Display Content** — Browse movie details including metadata, genres, cast/crew, ownership, and imagery.
2. **Add Content** — Guided forms for inserting movies, related genres, people, and images.
3. **Search & Filter** — Query by title, genre, person, release year, rating, and more with pagination.
4. **Delete Content** — Safe deletion flows with cascading clean-up of related records.
5. **Authentication** — Basic admin-protected endpoints using JWT.

Non-functional goals include responsive design, secure API access, and readiness for deployment behind Apache with HTTPS.

## Testing & Quality Gates
- Rust: `cargo fmt`, `cargo clippy`, `cargo test` (tests to be added).
- Frontend: `npm run lint`, `npm run build`.
- Additional CI checks and end-to-end tests will be defined as the implementation matures.

## Documentation
Detailed specifications live in the `docs/` directory:
- `Product Specification.md`
- `Project Task Plan.md`
- `Build Plan.md`
- `System Architecture.md`
- `Database Schema- Movie Collection.md`
- `MySQL-Compatible CREATE TABLE Script.md`

Refer to these guides when extending the application beyond the initial scaffolding provided here.

