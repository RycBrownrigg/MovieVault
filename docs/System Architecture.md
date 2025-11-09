### System Architecture

#### High-Level Overview
The system follows a client-server architecture with a separation of concerns:
- **Frontend (Client)**: Handles user interactions and renders data.
- **Backend (Server)**: Manages business logic, API endpoints, and database interactions.
- **Database**: Stores structured data as per the provided schema.
- **Web Server (Apache)**: Serves static frontend assets and proxies API requests to the backend.

Data flow:
1. User interacts with the UI (e.g., submits a search).
2. Frontend makes HTTP requests to backend APIs.
3. Backend queries/updates MySQL and returns JSON responses.
4. Frontend renders the response (e.g., movie list with images).

#### Components
1. **Frontend (TypeScript/React)**:
   - **Pages/Views**: Home (browse/search), Movie Detail, Add Movie Form, Admin Dashboard (for delete/add).
   - **Components**: Movie Card (displays summary with poster), Search Bar, Form Inputs (for adding data), Image Gallery.
   - **State Management**: React Hooks or Context API (simple; no Redux initially).
   - **API Integration**: REST calls to backend (e.g., GET /movies, POST /movies).

2. **Backend (Rust/Actix-Web/Diesel)**:
   - **API Endpoints** (RESTful):
     - GET /movies: List all or paginated movies.
     - GET /movies/{id}: Retrieve movie details with related data (joins on genres, people, images).
     - POST /movies: Add new movie (handle inserts across tables).
     - DELETE /movies/{id}: Delete movie and relations.
     - GET /search?q={query}: Search across fields.
     - Similar endpoints for genres, people, formats, etc., as needed.
   - **Authentication**: JWT-based for protected routes (add/delete).
   - **Database Layer**: Diesel ORM for schema migrations, queries, and transactions (e.g., atomic inserts for movie + genres).
   - **Error Handling**: JSON error responses; logging with env_logger.

3. **Database (MySQL)**:
   - Schema as provided, with potential additions:
     - Users table for authentication (user_id, username, hashed_password).
     - Indexes on frequently searched fields (e.g., movie title, release_year).
   - Relationships enforced with foreign keys and cascading deletes where appropriate.

4. **Deployment Layer (Apache)**:
   - Serves static files (compiled TypeScript/JS/CSS) from /var/www/html.
   - Reverse proxy to backend (e.g., ProxyPass /api http://localhost:8080).
   - SSL/TLS for HTTPS.
   - Security: ModSecurity for WAF, fail2ban for brute-force protection.

#### Data Model
- Based on the provided schema.
- Queries: Use JOINs for retrieving related data (e.g., SELECT * FROM Movies JOIN Movie_Genres ON ...).
- Images: Rendered via <img> tags in frontend, sourcing from URLs in DB.

#### Scalability and Reliability
- Horizontal scaling: Backend can be load-balanced; DB can use replication.
- Caching: Optional Redis for frequent queries (future).
- Backup: MySQL dumps scheduled via cron.

