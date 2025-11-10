# MovieVault - A Video Content Management System

## Overview
MovieVault is a web-based application for curating, displaying, and managing a personal or shared movie collection. The system stores rich metadata, including genres, people, roles, ownership details, and imagery, exposing CRUD APIs through a Rust backend and a responsive React frontend. Deployment targets an Apache web server that serves the compiled UI and proxies API traffic to the backend service.

## Current Project Status
- Backend: Actix-Web service with `/api/health`, environment-driven configuration, Diesel-based database pool, and embedded migrations.
- Frontend: Vite + React TypeScript scaffold with React Router, Axios API client, and placeholder screens for home, detail, admin, and add movie flows.
- Infrastructure: Directory scaffolded; Docker and deployment assets pending.
- Detailed product, architecture, and database plans live in the `docs/` directory.

## Project Structure
- `backend/` — Rust Actix-Web service with Diesel integration and embedded migrations.
- `frontend/` — Vite + React TypeScript app with routing, API client scaffolding, and placeholder views.
- `infra/` — Placeholder for infrastructure tooling (Docker, environment files, deployment scripts).
- `docs/` — Product specification, architecture overview, database schema, build plan, and task plan.

## Development Environment Setup

### Prerequisites
- Rust toolchain (`rustup` recommended)
- Node.js 20.x (ships with npm 11.x)
- Docker Desktop or Docker Engine with Compose v2

### Backend (Actix-Web)
1. Copy the example environment file and adjust host/port as needed:
   ```bash
   cp backend/env.example backend/.env
   ```
2. Ensure the `.env` file contains a valid MySQL connection string under `DATABASE_URL`.
3. Run the development server:
   ```bash
   cargo run --manifest-path backend/Cargo.toml
   ```
4. Health check: `http://localhost:8080/api/health`

Recommended supporting commands:
- Formatting: `cargo fmt --manifest-path backend/Cargo.toml`
- Type-checking: `cargo check --manifest-path backend/Cargo.toml`
- Linting: `cargo clippy --manifest-path backend/Cargo.toml`
- Manual migrations: `diesel migration run --manifest-path backend/Cargo.toml`

### Frontend (Vite + React)
1. Copy the environment template and set the backend API URL:
   ```bash
   cp frontend/env.example frontend/.env
   ```
2. Install dependencies (first run only):
   ```bash
   cd frontend
   npm install
   ```
3. Start the dev server:
   ```bash
   npm run dev
   ```
4. Production build output:
   ```bash
   npm run build
   ```
- The dev server listens on `http://localhost:3000` and proxies `/api` to the backend.
- Update `VITE_API_BASE_URL` to point at your backend origin (defaults to `http://localhost:8080/api`).

### Infrastructure (Planned)
Docker assets and deployment automation will be added in upcoming tasks. Once available, this section will expand with concrete commands for running the local stack and preparing production releases.

## Database & Migrations
- Install Diesel CLI locally with MySQL support:
  ```bash
  cargo install diesel_cli --no-default-features --features mysql
  ```
- Update `backend/.env` with a valid `DATABASE_URL`, e.g.:
  ```
  DATABASE_URL=mysql://movievault:password@127.0.0.1:3306/MovieVaultDB
  ```
- Run setup (creates the database if needed) and apply migrations:
  ```bash
  diesel setup --manifest-path backend/Cargo.toml
  diesel migration run --manifest-path backend/Cargo.toml
  ```
- Migrations mirror the schema in `docs/MySQL-Compatible CREATE TABLE Script.md` with an additional `users` table for authentication support.

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

