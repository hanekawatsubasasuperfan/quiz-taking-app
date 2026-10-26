import { useNavigate, Link, Outlet, useLocation } from '@tanstack/react-router';
import { Logout } from '../../api/auth/logout';

export default function RootComponent() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isAuthPage = pathname === '/login' || pathname === '/signup' || pathname === '/';

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
        </nav>
      </header>
      <Outlet />
    </>
  );
}
