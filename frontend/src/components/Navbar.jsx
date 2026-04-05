import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiMenu, FiX } from 'react-icons/fi';

const NAV_LINKS = [
  { label: 'Projects',      href: '#projects' },
  { label: 'Certificates',  href: '#certificates' },
  { label: 'Tech Stack',    href: '#techstack' },
  { label: 'Achievements',  href: '#achievements' },
  { label: 'Contact',       href: '#contact' },
];

export default function Navbar() {
  const { isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-parchment/95 backdrop-blur-md shadow-md border-b border-cream-dark'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-xl font-extrabold text-ink tracking-tight">
          Mahvish<span className="text-primary">.</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-ink-muted hover:text-primary transition-colors duration-200 relative group"
            >
              {link.label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gold group-hover:w-full transition-all duration-300 rounded-full" />
            </a>
          ))}
        </div>

        {/* Right actions */}
        <div className="hidden md:flex items-center gap-3">
          {isAdmin ? (
            <>
              <Link
                to="/admin/dashboard"
                className="text-sm font-semibold text-primary hover:text-primary-dark transition-colors"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="text-sm px-4 py-1.5 rounded-xl border border-primary/30 text-primary hover:bg-primary hover:text-white transition-all duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/admin"
              className="text-sm px-5 py-2 rounded-xl bg-primary text-white font-semibold hover:bg-primary-dark shadow-md shadow-primary/20 transition-all duration-300 hover:scale-105"
            >
              Admin
            </Link>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-ink text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-parchment border-t border-cream-dark px-6 pb-5 pt-2">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="block py-2.5 text-sm font-medium text-ink-muted hover:text-primary border-b border-cream-dark last:border-0 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <div className="mt-4">
            {isAdmin ? (
              <>
                <Link
                  to="/admin/dashboard"
                  className="block py-2 text-sm font-semibold text-primary"
                  onClick={() => setMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => { handleLogout(); setMenuOpen(false); }}
                  className="block py-2 text-sm text-primary/70"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/admin"
                className="inline-block mt-1 px-5 py-2 rounded-xl bg-primary text-white text-sm font-semibold"
                onClick={() => setMenuOpen(false)}
              >
                Admin Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
