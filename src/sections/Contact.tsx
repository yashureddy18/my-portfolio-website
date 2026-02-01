import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, Linkedin, Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'yasaswini_syamala@srmap.edu.in',
      href: 'mailto:yasaswini_syamala@srmap.edu.in',
      gradient: 'from-purple-500/20 to-purple-600/10',
      borderColor: 'border-purple-500/30',
      iconColor: 'text-purple-400',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+91 7013438675',
      href: 'tel:+917013438675',
      gradient: 'from-pink-500/20 to-pink-600/10',
      borderColor: 'border-pink-500/30',
      iconColor: 'text-pink-400',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Andhra Pradesh, India',
      href: '#',
      gradient: 'from-cyan-500/20 to-cyan-600/10',
      borderColor: 'border-cyan-500/30',
      iconColor: 'text-cyan-400',
    },
  ];

  const socialLinks = [
    { 
      icon: Github, 
      label: 'GitHub', 
      href: 'https://github.com',
      gradient: 'from-purple-500 to-violet-500',
    },
    { 
      icon: Linkedin, 
      label: 'LinkedIn', 
      href: 'https://linkedin.com',
      gradient: 'from-blue-500 to-cyan-500',
    },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const content = contentRef.current;

    if (!section || !heading || !content) return;

    const triggers: ScrollTrigger[] = [];

    // Heading circle reveal animation
    const headingTrigger = ScrollTrigger.create({
      trigger: heading,
      start: 'top 80%',
      onEnter: () => {
        gsap.fromTo(
          heading,
          { opacity: 0, scale: 0.8, clipPath: 'circle(0% at 50% 50%)' },
          {
            opacity: 1,
            scale: 1,
            clipPath: 'circle(100% at 50% 50%)',
            duration: 1.2,
            ease: 'power3.out',
          }
        );
      },
      once: true,
    });
    triggers.push(headingTrigger);

    // Content animation
    const contentElements = content.querySelectorAll('.contact-item');
    const contentTrigger = ScrollTrigger.create({
      trigger: content,
      start: 'top 75%',
      onEnter: () => {
        gsap.fromTo(
          contentElements,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out' }
        );
      },
      once: true,
    });
    triggers.push(contentTrigger);

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    
    // Reset submitted state after 3 seconds
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative min-h-screen py-24 px-6 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-600/5 to-cyan-600/5" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[200px]" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-[200px]" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 mb-6">
            <MessageCircle size={16} className="text-cyan-400" />
            <span className="text-sm text-cyan-300">Get in Touch</span>
          </div>
          <h2
            ref={headingRef}
            className="text-5xl sm:text-6xl md:text-8xl font-bold tracking-tight mb-6"
          >
            <span className="gradient-text">Let's Connect</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Open to opportunities, collaborations, and interesting conversations
          </p>
        </div>

        <div ref={contentRef} className="grid lg:grid-cols-2 gap-16">
          {/* Left Column - Contact Info */}
          <div className="space-y-8">
            {/* Contact Details */}
            <div className="space-y-4">
              {contactInfo.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className={`contact-item group flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-br ${item.gradient} border ${item.borderColor} hover:scale-[1.02] transition-all duration-300`}
                >
                  <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 group-hover:scale-110 transition-all duration-300`}>
                    <item.icon size={20} className={item.iconColor} />
                  </div>
                  <div>
                    <p className="text-xs text-white/40 uppercase tracking-wider mb-1">{item.label}</p>
                    <p className="text-white font-medium">{item.value}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Social Links */}
            <div className="contact-item">
              <p className="text-xs text-white/40 uppercase tracking-wider mb-4">Social Links</p>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`social-icon w-14 h-14 rounded-2xl bg-gradient-to-r ${social.gradient} flex items-center justify-center text-white hover:scale-110 hover:rotate-3 transition-all duration-300 shadow-lg`}
                    aria-label={social.label}
                  >
                    <social.icon size={24} />
                  </a>
                ))}
              </div>
            </div>

            {/* Availability Badge */}
            <div className="contact-item inline-flex items-center gap-3 px-5 py-3 rounded-full bg-green-500/10 border border-green-500/30">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-sm text-green-400">Available for opportunities</span>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="contact-item">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm text-white/40 mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-5 py-4 rounded-xl bg-white/5 border border-purple-500/20 text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50 focus:bg-white/[0.07] transition-all duration-300"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-sm text-white/40 mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full px-5 py-4 rounded-xl bg-white/5 border border-pink-500/20 text-white placeholder-white/30 focus:outline-none focus:border-pink-500/50 focus:bg-white/[0.07] transition-all duration-300"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm text-white/40 mb-2">Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={5}
                  className="w-full px-5 py-4 rounded-xl bg-white/5 border border-cyan-500/20 text-white placeholder-white/30 focus:outline-none focus:border-cyan-500/50 focus:bg-white/[0.07] transition-all duration-300 resize-none"
                  placeholder="Tell me about your project or opportunity..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || submitted}
                className={`w-full py-4 rounded-xl font-medium flex items-center justify-center gap-2 transition-all duration-300 ${
                  submitted
                    ? 'bg-green-500 text-white'
                    : 'btn-gradient text-white'
                }`}
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : submitted ? (
                  <>Message Sent!</>
                ) : (
                  <>
                    Send Message
                    <Send size={18} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-24 pt-8 border-t border-white/5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/30 text-sm">
              © 2025 <span className="gradient-text">Syamala Yasaswini</span>. All rights reserved.
            </p>
            <p className="text-white/20 text-sm">
              Built with <span className="text-purple-400">React</span>, <span className="text-cyan-400">TypeScript</span> & <span className="text-pink-400">Tailwind CSS</span>
            </p>
          </div>
        </footer>
      </div>
    </section>
  );
};

export default Contact;
