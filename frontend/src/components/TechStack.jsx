import { useScrollReveal } from '../hooks/useScrollReveal';

const categories = [
  {
    title: 'Frontend',
    bg: 'bg-primary/8 border-primary/20',
    badge: 'bg-primary/10 text-primary border-primary/20',
    dot: 'bg-primary',
    skills: ['React.js', 'Tailwind CSS', 'HTML', 'CSS', 'JavaScript'],
  },
  {
    title: 'Backend',
    bg: 'bg-brown/8 border-brown/20',
    badge: 'bg-brown/10 text-brown border-brown/20',
    dot: 'bg-brown',
    skills: ['Node.js', 'Express.js', 'REST APIs'],
  },
  {
    title: 'Languages',
    bg: 'bg-gold/8 border-gold/20',
    badge: 'bg-gold/10 text-brown border-gold/25',
    dot: 'bg-gold',
    skills: ['Java', 'Python', 'C'],
  },
  {
    title: 'Tools',
    bg: 'bg-brown-light/8 border-brown-light/20',
    badge: 'bg-brown-light/10 text-brown-light border-brown-light/20',
    dot: 'bg-brown-light',
    skills: ['Git', 'GitHub', 'Figma', 'Postman'],
  },
  {
    title: 'Databases',
    bg: 'bg-wine/8 border-wine/20',
    badge: 'bg-wine/10 text-wine border-wine/20',
    dot: 'bg-wine',
    skills: ['MongoDB', 'SQL'],
  },
];

export default function TechStack() {
  const sectionRef = useScrollReveal();

  return (
    <section id="techstack" className="py-24 bg-cream-dark px-6" ref={sectionRef}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 fade-up">
          <p className="text-xs font-bold text-gold uppercase tracking-[0.2em] mb-3">Skills</p>
          <h2 className="text-4xl font-extrabold text-ink">Tech Stack</h2>
          <div className="mt-3 mx-auto w-12 h-1 rounded-full bg-gradient-to-r from-primary to-gold" />
          <p className="text-ink-light mt-5 max-w-xl mx-auto text-sm leading-relaxed">
            Technologies and tools I work with to build modern, scalable applications.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.title}
              className={`fade-up bg-white rounded-2xl border ${cat.bg} p-6 card-hover shadow-sm`}
            >
              <div className="flex items-center gap-2 mb-4">
                <span className={`w-2.5 h-2.5 rounded-full ${cat.dot}`} />
                <h3 className="text-sm font-bold text-ink">{cat.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className={`px-3 py-1 rounded-full text-xs font-semibold border ${cat.badge}`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
