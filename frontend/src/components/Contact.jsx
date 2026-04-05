import { useState } from 'react';
import { FiSend, FiMail, FiGithub, FiLinkedin } from 'react-icons/fi';
import api from '../api/axios';
import { useScrollReveal } from '../hooks/useScrollReveal';

const initialForm = { name: '', email: '', subject: '', message: '' };

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');
  const sectionRef = useScrollReveal();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    try {
      await api.post('/contact', form);
      setStatus('success');
      setForm(initialForm);
    } catch (err) {
      setStatus('error');
      setErrorMsg(err?.response?.data?.message || 'Something went wrong. Please try again.');
    }
  };

  const inputClass =
    'w-full px-4 py-3 rounded-xl border border-cream-dark bg-cream text-ink text-sm placeholder:text-ink-light focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/50 transition-all duration-200';

  return (
    <section id="contact" className="py-24 bg-cream-dark px-6" ref={sectionRef}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 fade-up">
          <p className="text-xs font-bold text-gold uppercase tracking-[0.2em] mb-3">Get In Touch</p>
          <h2 className="text-4xl font-extrabold text-ink">Contact Me</h2>
          <div className="mt-3 mx-auto w-12 h-1 rounded-full bg-gradient-to-r from-primary to-gold" />
          <p className="text-ink-light mt-5 max-w-xl mx-auto text-sm leading-relaxed">
            Have a project in mind or just want to connect? I'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Info side */}
          <div className="fade-up flex flex-col gap-8">
            <div>
              <h3 className="text-xl font-bold text-ink mb-3">Let's Talk</h3>
              <p className="text-sm text-ink-light leading-relaxed">
                I'm always open to discussing new projects, creative ideas, or opportunities. Fill out the form and I'll get back to you as soon as possible.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              {[
                { href: 'mailto:mahvish@email.com', icon: <FiMail />, label: 'mahvish@email.com', bg: 'bg-primary/10', color: 'text-primary' },
                { href: 'https://github.com/', icon: <FiGithub />, label: 'github.com/mahvish', bg: 'bg-ink/8', color: 'text-ink' },
                { href: 'https://linkedin.com/', icon: <FiLinkedin />, label: 'linkedin.com/in/mahvish', bg: 'bg-gold/10', color: 'text-brown' },
              ].map(({ href, icon, label, bg, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group"
                >
                  <div className={`w-11 h-11 rounded-xl ${bg} ${color} flex items-center justify-center text-lg shrink-0 transition-all duration-300 group-hover:scale-110`}>
                    {icon}
                  </div>
                  <span className="text-sm font-medium text-ink-muted group-hover:text-primary transition-colors">{label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="fade-up bg-white rounded-2xl border border-cream-dark shadow-sm p-8">
            {status === 'success' ? (
              <div className="flex flex-col items-center justify-center py-10 gap-4 text-center">
                <div className="w-16 h-16 rounded-full bg-gold/15 flex items-center justify-center text-3xl">✅</div>
                <h3 className="text-xl font-bold text-ink">Message Sent!</h3>
                <p className="text-sm text-ink-light max-w-xs">
                  Thank you for reaching out. I'll get back to you soon.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="btn btn-primary mt-2 text-sm px-6 py-2.5"
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-ink-muted uppercase tracking-wide mb-1.5">Name</label>
                    <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder="Your name" className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-ink-muted uppercase tracking-wide mb-1.5">Email</label>
                    <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="your@email.com" className={inputClass} />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-ink-muted uppercase tracking-wide mb-1.5">Subject</label>
                  <input type="text" name="subject" value={form.subject} onChange={handleChange} required placeholder="What's this about?" className={inputClass} />
                </div>

                <div>
                  <label className="block text-xs font-bold text-ink-muted uppercase tracking-wide mb-1.5">Message</label>
                  <textarea name="message" value={form.message} onChange={handleChange} required rows={5} placeholder="Write your message here..." className={`${inputClass} resize-none`} />
                </div>

                {status === 'error' && (
                  <div className="px-4 py-3 rounded-xl bg-primary/8 border border-primary/20 text-sm text-primary">
                    {errorMsg}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn btn-primary disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
                >
                  <FiSend />
                  {status === 'loading' ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
