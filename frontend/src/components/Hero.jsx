import { FiGithub, FiLinkedin, FiMail, FiDownload, FiArrowRight } from 'react-icons/fi';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 pt-20">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-cream via-parchment to-cream-dark -z-10" />
      {/* Decorative blobs */}
      <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-primary/5 blur-3xl -z-10" />
      <div className="absolute bottom-20 left-10 w-64 h-64 rounded-full bg-gold/8 blur-3xl -z-10" />

      <div className="max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div className="hero-animate hero-animate-1 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-8 border border-primary/20">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          Open to opportunities
        </div>

        {/* Name */}
        <h1 className="hero-animate hero-animate-2 text-5xl sm:text-6xl md:text-7xl font-extrabold text-ink leading-tight tracking-tight mb-4">
          Hi, I'm{' '}
          <span className="gradient-text">Mahvish</span>
          <br />
          Pathan
        </h1>

        {/* Tagline */}
        <p className="hero-animate hero-animate-3 text-xl sm:text-2xl font-bold text-brown mb-3">
          Building Scalable Web &amp; AI Solutions
        </p>

        {/* Subtitle */}
        <p className="hero-animate hero-animate-4 text-base sm:text-lg text-ink-light mb-10 max-w-xl mx-auto">
          Full Stack Developer &nbsp;·&nbsp; AI/ML Enthusiast
        </p>

        {/* CTA Buttons */}
        <div className="hero-animate hero-animate-5 flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <a href="#projects" className="btn btn-primary w-full sm:w-auto">
            View Projects <FiArrowRight />
          </a>
          <a href="#contact" className="btn btn-outline w-full sm:w-auto">
            Contact Me
          </a>
          <a
            href="/resume.pdf"
            download="Mahvish_Pathan_Resume.pdf"
            className="btn btn-dark w-full sm:w-auto"
          >
            <FiDownload /> Download Resume
          </a>
        </div>

        {/* Social Links */}
        <div className="hero-animate hero-animate-5 flex items-center justify-center gap-6">
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-ink-muted hover:text-ink font-medium text-sm transition-colors group"
          >
            <span className="w-9 h-9 rounded-xl bg-cream-dark border border-brown/10 flex items-center justify-center group-hover:bg-ink group-hover:text-cream transition-all duration-300">
              <FiGithub className="text-base" />
            </span>
            GitHub
          </a>
          <a
            href="https://linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-ink-muted hover:text-primary font-medium text-sm transition-colors group"
          >
            <span className="w-9 h-9 rounded-xl bg-cream-dark border border-brown/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
              <FiLinkedin className="text-base" />
            </span>
            LinkedIn
          </a>
          <a
            href="#contact"
            className="flex items-center gap-2 text-ink-muted hover:text-primary font-medium text-sm transition-colors group"
          >
            <span className="w-9 h-9 rounded-xl bg-cream-dark border border-brown/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
              <FiMail className="text-base" />
            </span>
            Email
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="mt-16 flex justify-center">
          <div className="w-6 h-10 rounded-full border-2 border-brown-muted/40 flex items-start justify-center p-1.5">
            <div className="w-1.5 h-3 bg-primary rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
