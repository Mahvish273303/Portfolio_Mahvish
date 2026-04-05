import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import { FiLock, FiMail, FiArrowLeft } from 'react-icons/fi';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await api.post('/auth/login', { email, password });
      login(res.data.token);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err?.response?.data?.message || 'Login failed. Check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    'w-full px-4 py-3 rounded-xl border border-cream-dark bg-cream text-ink text-sm placeholder:text-ink-light focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/50 transition-all duration-200';

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-parchment to-cream-dark flex items-center justify-center px-6">
      {/* Decorative blob */}
      <div className="absolute top-20 left-1/4 w-64 h-64 rounded-full bg-primary/5 blur-3xl -z-10" />

      <div className="w-full max-w-md">
        {/* Back link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-primary transition-colors mb-8"
        >
          <FiArrowLeft /> Back to portfolio
        </Link>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-cream-dark p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <FiLock className="text-2xl text-primary" />
            </div>
            <h1 className="text-2xl font-extrabold text-ink">Admin Login</h1>
            <p className="text-ink-light text-sm mt-1">Access the portfolio dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="block text-xs font-bold text-ink-muted uppercase tracking-wide mb-1.5">
                Email
              </label>
              <div className="relative">
                <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-light" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="admin@email.com"
                  className={`${inputClass} pl-10`}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-ink-muted uppercase tracking-wide mb-1.5">
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-light" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className={`${inputClass} pl-10`}
                />
              </div>
            </div>

            {error && (
              <div className="px-4 py-3 rounded-xl bg-primary/8 border border-primary/20 text-sm text-primary">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary mt-1 w-full disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? 'Logging in...' : 'Login to Dashboard'}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-ink-light mt-6">
          Credentials are stored securely in environment variables.
        </p>
      </div>
    </div>
  );
}
