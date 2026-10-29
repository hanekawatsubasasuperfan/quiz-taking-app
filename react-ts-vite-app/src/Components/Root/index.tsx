import { useNavigate, Link, Outlet, useLocation } from '@tanstack/react-router';
import { Logout } from '../../api/auth/logout';
import { useState } from 'react';
import { applyColorMode, getInitialColorMode } from '../../styles/colorMode';
import type { ColorMode } from '../../styles/colorMode';

export default function RootComponent() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isAuthPage = pathname === '/login' || pathname === '/signup' || pathname === '/';
  const [colorMode, setColorMode] = useState(getInitialColorMode);

  function toggleColorMode() {
    const next: ColorMode = colorMode === 'dark' ? 'light' : 'dark';
    applyColorMode(next, true);
    setColorMode(next);
  }

  async function handleLogout() {
    try {
      const data = await Logout();
      if (data.code === 2) {
        alert('Could not sign out. Please try again.');
        return;
      }
      await navigate({ to: '/login' });
    } catch {
      alert('Could not sign out. Please try again.');
    }
  }

  return (
    <>
      <header className="site-header">
        <nav className="site-nav" aria-label="Main navigation">
          {isAuthPage ? (
            <>
              <Link to="/login">Sign in</Link>
              <Link to="/signup">Create account</Link>
            </>
          ) : (
            <>
              <Link to="/user">My quizzes</Link>
              <button className="text-button" onClick={handleLogout} type="button">Sign out</button>
            </>
          )}
          <button className="theme-toggle" type="button" role="switch" aria-label="Light mode"
            aria-checked={colorMode === 'light'} onClick={toggleColorMode}>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              {colorMode === 'light' ? <><circle cx="12" cy="12" r="4" /><path d="M12 1v3m0 16v3M1 12h3m16 0h3M4.2 4.2l2.1 2.1m11.4 11.4 2.1 2.1M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" /></>
                : <path d="M20.5 14A9 9 0 0 1 10 3.5 9 9 0 1 0 20.5 14Z" />}
            </svg>
            {colorMode === 'light' ? 'Light mode' : 'Dark mode'}
          </button>
        </nav>
      </header>
      <Outlet />
    </>
  );
}
