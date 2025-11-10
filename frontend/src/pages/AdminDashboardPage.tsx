export const AdminDashboardPage = () => (
  <section className="page-card">
    <header>
      <h2 className="page-card__title">Admin Dashboard</h2>
      <p className="page-card__subtitle">
        Manage collection data, monitor API connectivity, and track recent activity.
      </p>
    </header>

    <p>
      This dashboard will surface statistics and management shortcuts once the backend API exposes
      the required endpoints. Planned features include:
    </p>

    <ul className="page-card__list">
      <li>Overview of total movies, genres, and people in the catalogue.</li>
      <li>Quick access to recently added movies with moderation controls.</li>
      <li>Authentication status and token expiry reminders.</li>
      <li>System status indicators for backend and database health checks.</li>
    </ul>
  </section>
);

