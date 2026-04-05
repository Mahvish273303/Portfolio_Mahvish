import { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import { FiTrash2, FiPlus, FiLogOut, FiX, FiHome, FiFolder, FiAward } from 'react-icons/fi';

/* ─── Input Field ─────────────────────────────────────────── */
function Field({ label, name, value, onChange, placeholder, required, type = 'text' }) {
  return (
    <div>
      <label className="block text-xs font-bold text-ink-muted uppercase tracking-wide mb-1.5">
        {label} {required && <span className="text-primary">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full px-3.5 py-2.5 rounded-xl border border-cream-dark bg-cream text-ink text-sm placeholder:text-ink-light focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/50 transition-all"
      />
    </div>
  );
}

/* ─── Project Form ───────────────────────────────────────── */
const emptyProject = { title: '', description: '', techStack: '', imageUrl: '', githubLink: '', liveLink: '' };

function ProjectForm({ onAdded }) {
  const [form, setForm] = useState(emptyProject);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const payload = { ...form, techStack: form.techStack.split(',').map((t) => t.trim()).filter(Boolean) };
      const res = await api.post('/projects', payload);
      onAdded(res.data);
      setForm(emptyProject);
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to add project.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 bg-white rounded-2xl border border-cream-dark shadow-sm p-7">
      <div className="flex items-center gap-2 pb-4 border-b border-cream-dark">
        <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
          <FiPlus className="text-primary text-sm" />
        </div>
        <h3 className="font-bold text-ink text-base">Add New Project</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Title" name="title" value={form.title} onChange={handleChange} placeholder="Project name" required />
        <Field label="Image URL" name="imageUrl" value={form.imageUrl} onChange={handleChange} placeholder="https://..." required />
        <Field label="GitHub Link" name="githubLink" value={form.githubLink} onChange={handleChange} placeholder="https://github.com/..." required />
        <Field label="Live Link (optional)" name="liveLink" value={form.liveLink} onChange={handleChange} placeholder="https://..." />
      </div>
      <Field label="Tech Stack (comma-separated)" name="techStack" value={form.techStack} onChange={handleChange} placeholder="React, Node.js, MongoDB" required />
      <div>
        <label className="block text-xs font-bold text-ink-muted uppercase tracking-wide mb-1.5">
          Description <span className="text-primary">*</span>
        </label>
        <textarea
          name="description" value={form.description} onChange={handleChange}
          rows={3} required placeholder="Brief description of the project..."
          className="w-full px-3.5 py-2.5 rounded-xl border border-cream-dark bg-cream text-ink text-sm placeholder:text-ink-light focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all resize-none"
        />
      </div>
      {error && <p className="text-sm text-primary bg-primary/8 px-4 py-2 rounded-xl border border-primary/20">{error}</p>}
      <button type="submit" disabled={loading} className="btn btn-primary self-start text-sm px-6 py-2.5 disabled:opacity-60 disabled:transform-none">
        {loading ? 'Adding...' : 'Add Project'}
      </button>
    </form>
  );
}

/* ─── Certificate Form ────────────────────────────────────── */
const emptyCert = { title: '', issuer: '', date: '', imageUrl: '' };

function CertForm({ onAdded }) {
  const [form, setForm] = useState(emptyCert);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await api.post('/certificates', form);
      onAdded(res.data);
      setForm(emptyCert);
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to add certificate.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 bg-white rounded-2xl border border-cream-dark shadow-sm p-7">
      <div className="flex items-center gap-2 pb-4 border-b border-cream-dark">
        <div className="w-8 h-8 rounded-xl bg-gold/15 flex items-center justify-center">
          <FiPlus className="text-brown text-sm" />
        </div>
        <h3 className="font-bold text-ink text-base">Add New Certificate</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Title" name="title" value={form.title} onChange={handleChange} placeholder="Certificate title" required />
        <Field label="Issuer" name="issuer" value={form.issuer} onChange={handleChange} placeholder="Google, Coursera..." required />
        <Field label="Date" name="date" value={form.date} onChange={handleChange} placeholder="March 2024" required />
        <Field label="Image URL" name="imageUrl" value={form.imageUrl} onChange={handleChange} placeholder="https://..." required />
      </div>
      {error && <p className="text-sm text-primary bg-primary/8 px-4 py-2 rounded-xl border border-primary/20">{error}</p>}
      <button type="submit" disabled={loading} className="btn btn-primary self-start text-sm px-6 py-2.5 disabled:opacity-60 disabled:transform-none">
        {loading ? 'Adding...' : 'Add Certificate'}
      </button>
    </form>
  );
}

/* ─── Main Dashboard ──────────────────────────────────────── */
export default function AdminDashboard() {
  const { isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [certs, setCerts] = useState([]);
  const [activeTab, setActiveTab] = useState('projects');
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    if (!isAdmin) { navigate('/admin'); return; }
    api.get('/projects').then((r) => setProjects(r.data)).catch(() => {});
    api.get('/certificates').then((r) => setCerts(r.data)).catch(() => {});
  }, [isAdmin, navigate]);

  const handleDeleteProject = useCallback(async (id) => {
    await api.delete(`/projects/${id}`);
    setProjects((prev) => prev.filter((p) => p._id !== id));
    setDeleteConfirm(null);
  }, []);

  const handleDeleteCert = useCallback(async (id) => {
    await api.delete(`/certificates/${id}`);
    setCerts((prev) => prev.filter((c) => c._id !== id));
    setDeleteConfirm(null);
  }, []);

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <header className="bg-white border-b border-cream-dark shadow-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
              <span className="text-primary font-extrabold text-sm">M</span>
            </div>
            <div>
              <h1 className="text-base font-bold text-ink">Admin Dashboard</h1>
              <p className="text-xs text-ink-light">Portfolio Management</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="hidden sm:flex items-center gap-1.5 text-sm text-ink-muted hover:text-primary font-medium transition-colors"
            >
              <FiHome className="text-sm" /> View Site
            </Link>
            <button
              onClick={() => { logout(); navigate('/'); }}
              className="flex items-center gap-1.5 text-sm px-4 py-2 rounded-xl border border-primary/25 text-primary hover:bg-primary hover:text-white transition-all duration-300"
            >
              <FiLogOut className="text-sm" /> Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white rounded-2xl border border-cream-dark shadow-sm p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                <FiFolder className="text-primary" />
              </div>
              <p className="text-sm font-medium text-ink-muted">Projects</p>
            </div>
            <p className="text-4xl font-extrabold text-ink">{projects.length}</p>
          </div>
          <div className="bg-white rounded-2xl border border-cream-dark shadow-sm p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-xl bg-gold/15 flex items-center justify-center">
                <FiAward className="text-brown" />
              </div>
              <p className="text-sm font-medium text-ink-muted">Certificates</p>
            </div>
            <p className="text-4xl font-extrabold text-ink">{certs.length}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {['projects', 'certificates'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold capitalize transition-all duration-300 ${
                activeTab === tab
                  ? 'bg-primary text-white shadow-md shadow-primary/20'
                  : 'bg-white text-ink-muted border border-cream-dark hover:border-primary/40 hover:text-primary'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div className="flex flex-col gap-6">
            <ProjectForm onAdded={(p) => setProjects((prev) => [p, ...prev])} />

            <div className="flex items-center justify-between mt-2">
              <h3 className="font-bold text-ink text-base">All Projects</h3>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                {projects.length} total
              </span>
            </div>
            {projects.length === 0 && (
              <p className="text-ink-light text-sm py-8 text-center">No projects yet. Add one above.</p>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {projects.map((p) => (
                <div key={p._id} className="bg-white rounded-2xl border border-cream-dark shadow-sm overflow-hidden flex flex-col">
                  <img src={p.imageUrl} alt={p.title} className="h-36 w-full object-cover bg-cream"
                    onError={(e) => { e.target.src = 'https://placehold.co/600x300/F8F5F2/800020?text=Project'; }} />
                  <div className="h-1 bg-gradient-to-r from-primary to-gold" />
                  <div className="p-4 flex flex-col gap-2 flex-1">
                    <p className="font-bold text-ink text-sm">{p.title}</p>
                    <p className="text-xs text-ink-light line-clamp-2">{p.description}</p>
                    <div className="flex flex-wrap gap-1 mt-auto">
                      {p.techStack.slice(0, 3).map((t) => (
                        <span key={t} className="px-2 py-0.5 text-xs bg-primary/8 text-primary rounded-full border border-primary/15">{t}</span>
                      ))}
                    </div>
                    <button
                      onClick={() => setDeleteConfirm({ type: 'project', id: p._id })}
                      className="mt-2 flex items-center justify-center gap-1.5 text-xs text-primary border border-primary/20 rounded-xl py-2 hover:bg-primary hover:text-white transition-all duration-300"
                    >
                      <FiTrash2 /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certificates Tab */}
        {activeTab === 'certificates' && (
          <div className="flex flex-col gap-6">
            <CertForm onAdded={(c) => setCerts((prev) => [c, ...prev])} />

            <div className="flex items-center justify-between mt-2">
              <h3 className="font-bold text-ink text-base">All Certificates</h3>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-gold/15 text-brown border border-gold/25">
                {certs.length} total
              </span>
            </div>
            {certs.length === 0 && (
              <p className="text-ink-light text-sm py-8 text-center">No certificates yet. Add one above.</p>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {certs.map((c) => (
                <div key={c._id} className="bg-white rounded-2xl border border-cream-dark shadow-sm overflow-hidden flex flex-col">
                  <img src={c.imageUrl} alt={c.title} className="h-36 w-full object-cover bg-cream"
                    onError={(e) => { e.target.src = 'https://placehold.co/600x300/F8F5F2/C9A227?text=Certificate'; }} />
                  <div className="h-1 bg-gradient-to-r from-gold to-brown-light" />
                  <div className="p-4 flex flex-col gap-1.5 flex-1">
                    <p className="font-bold text-ink text-sm">{c.title}</p>
                    <p className="text-xs text-ink-muted">{c.issuer}</p>
                    <p className="text-xs text-ink-light">{c.date}</p>
                    <button
                      onClick={() => setDeleteConfirm({ type: 'cert', id: c._id })}
                      className="mt-auto flex items-center justify-center gap-1.5 text-xs text-primary border border-primary/20 rounded-xl py-2 hover:bg-primary hover:text-white transition-all duration-300"
                    >
                      <FiTrash2 /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-ink/50 backdrop-blur-sm z-50 flex items-center justify-center px-6">
          <div className="bg-white rounded-2xl shadow-2xl border border-cream-dark p-8 max-w-sm w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-ink">Confirm Delete</h3>
              <button onClick={() => setDeleteConfirm(null)} className="text-ink-light hover:text-ink p-1 rounded-lg hover:bg-cream transition-colors">
                <FiX />
              </button>
            </div>
            <p className="text-sm text-ink-muted mb-6">
              Are you sure you want to delete this {deleteConfirm.type === 'project' ? 'project' : 'certificate'}? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 py-2.5 rounded-xl border border-cream-dark text-sm font-medium text-ink-muted hover:bg-cream transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => deleteConfirm.type === 'project' ? handleDeleteProject(deleteConfirm.id) : handleDeleteCert(deleteConfirm.id)}
                className="flex-1 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
