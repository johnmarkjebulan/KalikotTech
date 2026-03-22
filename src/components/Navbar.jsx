import { useEffect, useMemo, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { brand } from '../data/siteData';
import Icon from './Icon';

const links = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'Book Repair', to: '/book' },
  { label: 'Track', to: '/track' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

function navLinkClass({ isActive }) {
  return `rounded-full px-4 py-2 text-sm font-medium transition ${
    isActive ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'
  }`;
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const [liveTime, setLiveTime] = useState('');
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat('en-PH', {
      timeZone: brand.timezone,
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
    });

    const updateClock = () => setLiveTime(formatter.format(new Date()));
    updateClock();
    const intervalId = window.setInterval(updateClock, 1000);

    return () => window.clearInterval(intervalId);
  }, []);

  const dashboardLink = useMemo(() => {
    if (!user) return '/login';
    return user.role === 'admin' ? '/admin' : '/dashboard';
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/60 bg-white/80 backdrop-blur-xl">
      <div className="border-b border-slate-200 bg-slate-950 text-slate-100">
        <div className="container-shell flex flex-col gap-2 py-3 text-xs sm:flex-row sm:items-center sm:justify-between sm:text-sm">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 font-medium text-cyan-200">
              <Icon name="clock" className="h-4 w-4" />
              Live time: {liveTime || 'Loading...'}
            </span>
            <span className="inline-flex items-center gap-2 text-slate-300">
              <Icon name="calendar" className="h-4 w-4" />
              Schedule: {brand.scheduleLabel}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-slate-300">
            <span className="inline-flex items-center gap-2">
              <Icon name="map" className="h-4 w-4" />
              {brand.address}
            </span>
          </div>
        </div>
      </div>

      <div className="container-shell flex items-center justify-between py-4">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-cyan-300 shadow-glow">
            <Icon name="smartphone" className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-950">{brand.name}</p>
            <p className="text-xs text-slate-500">Fast repair. Real-time updates.</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 lg:flex">
          {links.map((item) => (
            <NavLink key={item.to} to={item.to} className={navLinkClass}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {user ? (
            <>
              <Link to={dashboardLink} className="btn-secondary">
                {user.role === 'admin' ? 'Admin Panel' : 'Dashboard'}
              </Link>
              <button type="button" onClick={handleLogout} className="btn-primary">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-secondary">
                Login
              </Link>
              <Link to="/register" className="btn-primary">
                Create Account
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 text-slate-800 lg:hidden"
          onClick={() => setOpen((current) => !current)}
          aria-label="Toggle menu"
        >
          <Icon name={open ? 'close' : 'menu'} />
        </button>
      </div>

      {open ? (
        <div className="border-t border-slate-200 bg-white lg:hidden">
          <div className="container-shell flex flex-col gap-2 py-4">
            {links.map((item) => (
              <NavLink key={item.to} to={item.to} className={navLinkClass} onClick={() => setOpen(false)}>
                {item.label}
              </NavLink>
            ))}
            {user ? (
              <>
                <Link to={dashboardLink} className="btn-secondary" onClick={() => setOpen(false)}>
                  {user.role === 'admin' ? 'Admin Panel' : 'Dashboard'}
                </Link>
                <button type="button" onClick={handleLogout} className="btn-primary">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn-secondary" onClick={() => setOpen(false)}>
                  Login
                </Link>
                <Link to="/register" className="btn-primary" onClick={() => setOpen(false)}>
                  Create Account
                </Link>
              </>
            )}
          </div>
        </div>
      ) : null}
    </header>
  );
}

export default Navbar;
