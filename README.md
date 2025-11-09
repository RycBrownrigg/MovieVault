# MovieVault - A Video Content Management System

## Overview
MovieVault is a web-based application for curating, displaying, and managing a personal or shared movie collection. The system stores rich metadata, including genres, people, roles, ownership details, and imagery, exposing CRUD APIs through a Rust backend and a responsive React frontend. Deployment targets an Apache web server that serves the compiled UI and proxies API traffic to the backend service.

## Current Project Status
- Repository contains planning documentation only; implementation work has not started yet.
- Top-level scaffolding directories (`backend/`, `frontend/`, `infra/`) are present but empty.
- Detailed product, architecture, and database plans live in the `docs/` directory.

## Project Structure
- `backend/` — Placeholder for the upcoming Rust Actix-Web service.
- `frontend/` — Placeholder for the forthcoming React + TypeScript client.
- `infra/` — Placeholder for infrastructure tooling (Docker, environment files, deployment scripts).
- `docs/` — Product specification, architecture overview, database schema, build plan, and task plan.

## Planned Development Environment Setup

> The steps below outline the intended tooling once the backend, frontend, and infrastructure assets are implemented. The referenced files and commands are not available yet and will be created in subsequent tasks.

### Prerequisites
- Rust toolchain (`rustup` recommended)
- Node.js 20.x (ships with npm 11.x)
- Docker Desktop or Docker Engine with Compose v2

### First-Time Setup (Docker)
Planned deliverables include:
1. Environment templates under `infra/env/`.
2. A `docker-compose.yml` coordinating MySQL, backend, and frontend services.
3. Container commands tailored for development workflows (e.g., `cargo watch`, `npm run dev`).

### Local Development (Host Tools)
Once the backend and frontend are scaffolded, the following host-based workflows will be available:

- Backend: copy `.env` templates, run `cargo run`, and access a `/api/health` endpoint.
- Frontend: install dependencies via npm, run the Vite dev server, and proxy API traffic to the backend.
- Shared tooling: linting, formatting, and testing commands for both stacks.

## Database & Migrations
- Diesel CLI installation and usage will be documented when migrations are introduced.
- Migrations are planned to live under `backend/migrations/` and will align with the schema in `docs/MySQL-Compatible CREATE TABLE Script.md`.

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

