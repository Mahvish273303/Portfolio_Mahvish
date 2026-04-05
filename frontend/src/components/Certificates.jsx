import { useEffect, useState } from 'react';
import { FiAward } from 'react-icons/fi';
import api from '../api/axios';
import { useScrollReveal } from '../hooks/useScrollReveal';

function CertCard({ cert }) {
  return (
    <div className="fade-up bg-white rounded-2xl border border-cream-dark overflow-hidden card-hover flex flex-col shadow-sm">
      {/* Image */}
      <div className="h-44 bg-cream overflow-hidden">
        <img
          src={cert.imageUrl}
          alt={cert.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          onError={(e) => {
            e.target.src = 'https://placehold.co/600x280/F8F5F2/C9A227?text=Certificate';
          }}
        />
      </div>

      {/* Gold accent bar */}
      <div className="h-1 bg-gradient-to-r from-primary via-gold to-brown-light" />

      {/* Content */}
      <div className="p-6 flex flex-col gap-2 flex-1">
        <div className="flex items-start gap-2">
          <FiAward className="text-gold mt-0.5 shrink-0 text-lg" />
          <h3 className="text-sm font-bold text-ink leading-snug">{cert.title}</h3>
        </div>
        <p className="text-xs text-ink-muted">
          <span className="font-semibold text-brown">Issued by:</span> {cert.issuer}
        </p>
        <p className="text-xs text-ink-light mt-auto pt-3 border-t border-cream-dark">{cert.date}</p>
      </div>
    </div>
  );
}

export default function Certificates() {
  const [certs, setCerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const sectionRef = useScrollReveal();

  useEffect(() => {
    api
      .get('/certificates')
      .then((res) => setCerts(res.data))
      .catch(() => setError('Failed to load certificates. Please try again later.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="certificates" className="py-24 bg-parchment px-6" ref={sectionRef}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 fade-up">
          <p className="text-xs font-bold text-gold uppercase tracking-[0.2em] mb-3">Credentials</p>
          <h2 className="text-4xl font-extrabold text-ink">Certificates</h2>
          <div className="mt-3 mx-auto w-12 h-1 rounded-full bg-gradient-to-r from-gold to-primary" />
          <p className="text-ink-light mt-5 max-w-xl mx-auto text-sm leading-relaxed">
            Professional certifications and course completions that validate my skills.
          </p>
        </div>

        {loading && (
          <div className="text-center py-20 text-ink-light animate-pulse">Loading certificates...</div>
        )}
        {error && (
          <div className="text-center py-20 text-primary/70 text-sm">{error}</div>
        )}
        {!loading && !error && certs.length === 0 && (
          <div className="text-center py-20 text-ink-light text-sm">No certificates added yet.</div>
        )}
        {!loading && !error && certs.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {certs.map((cert) => (
              <CertCard key={cert._id} cert={cert} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
