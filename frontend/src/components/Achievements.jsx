import { useScrollReveal } from '../hooks/useScrollReveal';

const achievements = [
  {
    icon: '🏆',
    title: "Hacknovate 6.0 – Best Girl's Team",
    description:
      "Awarded Best Girl's Team at Hacknovate 6.0, a national-level hackathon, for building an innovative full-stack project under 24 hours.",
    tag: 'Hackathon',
  },
  {
    icon: '⭐',
    title: 'CodeChef Silver Badge — 250+ Problems',
    description:
      'Earned a Silver Badge on CodeChef by solving 250+ competitive programming problems, demonstrating strong algorithmic and data structure skills.',
    tag: 'Competitive Programming',
  },
  {
    icon: '🤖',
    title: 'Google Gen AI Study Jams – Top 60',
    description:
      "Ranked in the Top 60 participants across Google's Gen AI Study Jams program, completing advanced AI/ML learning tracks.",
    tag: 'AI / ML',
  },
];

export default function Achievements() {
  const sectionRef = useScrollReveal();

  return (
    <section id="achievements" className="py-24 bg-parchment px-6" ref={sectionRef}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 fade-up">
          <p className="text-xs font-bold text-gold uppercase tracking-[0.2em] mb-3">Milestones</p>
          <h2 className="text-4xl font-extrabold text-ink">Achievements</h2>
          <div className="mt-3 mx-auto w-12 h-1 rounded-full bg-gradient-to-r from-gold to-primary" />
          <p className="text-ink-light mt-5 max-w-xl mx-auto text-sm leading-relaxed">
            Recognition and milestones from competitions, platforms, and programs.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {achievements.map((item, i) => (
            <div
              key={item.title}
              className="fade-up bg-white rounded-2xl border border-cream-dark p-8 shadow-sm card-hover flex flex-col gap-4"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              {/* Top */}
              <div className="flex items-start justify-between gap-3">
                <span className="text-4xl">{item.icon}</span>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-gold/10 text-brown border border-gold/20">
                  {item.tag}
                </span>
              </div>

              <h3 className="text-base font-bold text-ink leading-snug">{item.title}</h3>
              <p className="text-sm text-ink-light leading-relaxed">{item.description}</p>

              {/* Bottom accent */}
              <div className="mt-auto pt-4 border-t border-cream-dark">
                <div className="h-1 w-10 rounded-full bg-gradient-to-r from-primary to-gold" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
