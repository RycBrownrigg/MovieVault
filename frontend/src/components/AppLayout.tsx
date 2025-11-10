import type { PropsWithChildren } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const navigation = [
  { to: '/', label: 'Home' },
  { to: '/admin', label: 'Admin' },
  { to: '/admin/add-movie', label: 'Add Movie' },
];

export const AppLayout = ({ children }: PropsWithChildren) => {
  const { pathname } = useLocation();

  return (
    <div className="app-root">
      <header className="app-header">
        <h1 className="app-title">MovieVault</h1>
        <nav className="app-nav">
          {navigation.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `app-nav__link${isActive ? ' app-nav__link--active' : ''}`
              }
              aria-current={pathname === link.to ? 'page' : undefined}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </header>
      <main className="app-content">{children}</main>
      <footer className="app-footer">
        <p>MovieVault &mdash; Personal movie collection manager (prototype)</p>
      </footer>
    </div>
  );
};

