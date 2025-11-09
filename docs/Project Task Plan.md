## Project Task Plan

- **Foundation**
  - Confirm local toolchain: Rust (rustup), Node.js/TypeScript, MySQL, Docker, Diesel CLI.
  - Initialize Git repo and configure shared conventions (branching, formatting).
  - Create Docker Compose stack for MySQL + backend; verify containers communicate.

- **Database Layer**
  - Convert provided SQL script into Diesel migrations, including `Users` table for auth.
  - Apply migrations to local MySQL instance; seed ~10 representative movies with related genres/people/images/ownership.
  - Define indexing/constraints (titles, release_year, `Images` composite index).

- **Backend (Rust/Actix-Web)**
  - Scaffold Actix-Web project; wire up Diesel, connection pooling, env config.
  - Model schema in Rust (Movies, Genres, People, Roles, Ownership, Images, Users).
  - Implement REST endpoints:
    - Public: list/search movies (`GET /movies`, `GET /movies/{id}`, pagination, filters).
    - Auth-protected: `POST /movies`, `DELETE /movies/{id}`, supporting related inserts/deletes.
    - Supporting endpoints for genres/people/formats as needed during create flow.
  - Add JWT auth (login endpoint, middleware guarding write routes).
  - Implement validation, error handling, logging.
  - Write tests: unit for data layer, integration for endpoints, basic load test (wrk).

- **Frontend (React/TypeScript)**
  - Scaffold app (CRA or Vite, TypeScript template); configure Axios, React Router, state management (Hooks/Context).
  - Build core views/components:
    - Home/search page with filters, pagination, movie cards.
    - Movie detail view showing metadata, relationships, image gallery.
    - Add movie form with multi-select genres, dynamic people/roles, image inputs.
    - Admin dashboard/login form storing JWT securely (localStorage + axios interceptors).
  - Add client-side validation, loading/error states, responsive layout.
  - Write UI tests (Jest/RTL) and smoke E2E coverage (Cypress).

- **Integration & QA**
  - Set up local proxy (`frontend -> backend`) and end-to-end test CRUD flows.
  - Implement logging/monitoring hooks; ensure input sanitization & SQL-injection protection.
  - Run security checks (dependency audits, basic scanning) and address findings.

- **Deployment**
  - Prepare production builds (`npm run build`, `cargo build --release`).
  - Configure Apache: static hosting, reverse proxy `/api`, HTTPS (Let’s Encrypt), security hardening (modules, headers, mod_security, fail2ban, firewall).
  - Create systemd service for backend; lock down MySQL access, secrets management.
  - Execute deployment dry run, import schema/data, smoke test live environment.
  - Final acceptance testing, performance check (<2s typical load), plan monitoring/backups.