### Build Plan

#### Phase 1: Preparation
1. **Set Up Development Environment**:
   - Install Rust (via rustup), Node.js/TypeScript, MySQL.
   - Initialize Git repo.
   - Set up Docker-compose for local dev (MySQL container + backend).

2. **Database Setup**:
   - Create MySQL schema scripts (DDL) based on the provided design.
   - Add Users table for auth.
   - Seed with sample data (e.g., 10 movies).
   - Use Diesel CLI for migrations.

#### Phase 2: Backend Development
1. **Scaffold Project**:
   - Cargo new backend; add dependencies (actix-web, diesel, jsonwebtoken, etc.).
   - Define models matching the schema.

2. **Implement APIs**:
   - CRUD for Movies, including relations (use transactions).
   - Search endpoint with SQL LIKE or full-text if needed.
   - Auth middleware for protected routes.

3. **Testing**:
   - Unit tests for models/queries.
   - Integration tests for APIs (using actix-test).
   - Load test with tools like wrk.

#### Phase 3: Frontend Development
1. **Scaffold Project**:
   - npx create-react-app frontend --template typescript.
   - Add Axios, React Router.

2. **Build UI Components**:
   - Home page with search and movie list.
   - Detail view with tabs for genres/people/images.
   - Forms for add/delete, with validation.

3. **Integrate with Backend**:
   - API calls; handle loading states/errors.
   - Auth: Login form storing JWT in localStorage.

4. **Testing**:
   - Unit tests with Jest/React Testing Library.
   - E2E tests with Cypress (basic coverage).

#### Phase 4: Integration and Deployment
1. **Local Integration**:
   - Run backend on :8080, frontend on :3000 (proxy API calls).
   - Test end-to-end CRUD flows.

2. **Apache Setup**:
   - Install Apache on Ubuntu/Debian server.
   - Configure virtual host: Serve frontend build from /var/www/html.
   - Enable mod_proxy: ProxyPass /api http://127.0.0.1:8080/.
   - SSL: Use Let's Encrypt for certs; enforce HTTPS.
   - Security Hardening:
     - Disable unnecessary modules (e.g., mod_php if not used).
     - Set ServerTokens Prod, ServerSignature Off.
     - Enable ModSecurity with OWASP ruleset.
     - Install fail2ban; configure for SSH/Apache logs.
     - Firewall: UFW allow 80/443, restrict others.
     - Permissions: Run Apache as non-root; chown files to www-data.
     - Backend: Run as systemd service with least privileges.
     - Database: Remote access disabled; use strong passwords, encrypted connections.

3. **Deployment**:
   - Build frontend (npm run build); copy to server.
   - Cargo build --release for backend; run via systemd.
   - MySQL: Import schema; configure connection pooling in backend.

4. **Final Testing and Launch**:
   - Security scan with tools like Nikto or OpenVAS.
   - User acceptance testing.
   - Go live; monitor logs for issues.
