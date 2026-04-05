import { useEffect, useState } from 'react';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import api from '../api/axios';
import { useScrollReveal } from '../hooks/useScrollReveal';

function ProjectCard({ project }) {
  return (
    <div className="fade-up bg-white rounded-2xl border border-cream-dark overflow-hidden card-hover flex flex-col shadow-sm">
      {/* Image */}
      <div className="h-48 bg-cream overflow-hidden">
        <img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          onError={(e) => {
            e.target.src = 'https://placehold.co/600x300/F8F5F2/800020?text=Project';
          }}
        />
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1 gap-3">
        <h3 className="text-base font-bold text-ink">{project.title}</h3>
        <p className="text-sm text-ink-light leading-relaxed line-clamp-3">
          {project.description}
        </p>

        {/* Tech Stack tags */}
        <div className="flex flex-wrap gap-2 mt-auto pt-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-primary/8 text-primary border border-primary/15"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-4 pt-3 border-t border-cream-dark">
          <a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm font-semibold text-ink-muted hover:text-ink transition-colors"
          >
            <FiGithub /> GitHub
          </a>
          {project.liveLink && project.liveLink.trim() !== '' && (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-dark transition-colors"
            >
              <FiExternalLink /> Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const sectionRef = useScrollReveal();

  useEffect(() => {
    api
      .get('/projects')
      .then((res) => setProjects(res.data))
      .catch(() => setError('Failed to load projects. Please try again later.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="projects" className="py-24 bg-cream-dark px-6" ref={sectionRef}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 fade-up">
          <p className="text-xs font-bold text-gold uppercase tracking-[0.2em] mb-3">Portfolio</p>
          <h2 className="text-4xl font-extrabold text-ink">Projects</h2>
          <div className="mt-3 mx-auto w-12 h-1 rounded-full bg-gradient-to-r from-primary to-gold" />
          <p className="text-ink-light mt-5 max-w-xl mx-auto text-sm leading-relaxed">
            A selection of projects I've built — from full-stack web apps to AI experiments.
          </p>
        </div>

        {loading && (
          <div className="text-center py-20 text-ink-light animate-pulse">Loading projects...</div>
        )}
        {error && (
          <div className="text-center py-20 text-primary/70 text-sm">{error}</div>
        )}
        {!loading && !error && projects.length === 0 && (
          <div className="text-center py-20 text-ink-light text-sm">No projects added yet.</div>
        )}
        {!loading && !error && projects.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
