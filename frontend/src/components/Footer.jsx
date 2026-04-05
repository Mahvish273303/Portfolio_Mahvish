import { FiGithub, FiLinkedin, FiMail, FiHeart } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="bg-ink text-ink-light py-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Top row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/10">
          <div>
            <p className="text-xl font-extrabold text-white tracking-tight">
              Mahvish<span className="text-gold">.</span>
            </p>
            <p className="text-xs text-ink-light mt-1">Full Stack Developer · AI/ML Enthusiast</p>
          </div>

          <div className="flex items-center gap-5">
            {[
              { href: 'https://github.com/', icon: <FiGithub className="text-lg" />, label: 'GitHub' },
              { href: 'https://linkedin.com/', icon: <FiLinkedin className="text-lg" />, label: 'LinkedIn' },
              { href: 'mailto:mahvish@email.com', icon: <FiMail className="text-lg" />, label: 'Email' },
            ].map(({ href, icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-10 h-10 rounded-xl bg-white/8 border border-white/10 flex items-center justify-center text-ink-light hover:text-white hover:bg-primary hover:border-primary transition-all duration-300"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} <span className="text-white font-semibold">Mahvish Pathan</span>. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Built with <FiHeart className="text-primary" /> using React · Node.js · MongoDB
          </p>
        </div>
      </div>
    </footer>
  );
}
