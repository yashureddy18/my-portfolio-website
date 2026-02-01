import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const blobsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate floating blobs
    const blobs = blobsRef.current?.querySelectorAll('.blob');
    if (blobs) {
      blobs.forEach((blob, index) => {
        gsap.to(blob, {
          x: `random(-100, 100)`,
          y: `random(-100, 100)`,
          duration: 8 + index * 2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      });
    }
  }, []);

  // Text animations
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });

    // Split title into characters
    if (titleRef.current) {
      const text = titleRef.current.textContent || '';
      titleRef.current.innerHTML = text
        .split('')
        .map((char) =>
          char === ' '
            ? '<span class="inline-block">&nbsp;</span>'
            : `<span class="inline-block opacity-0 translate-y-20">${char}</span>`
        )
        .join('');

      tl.to(titleRef.current.querySelectorAll('span'), {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.03,
        ease: 'expo.out',
      });
    }

    // Subtitle animation
    if (subtitleRef.current) {
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        '-=0.4'
      );
    }

    // Description animation
    if (descRef.current) {
      tl.fromTo(
        descRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        '-=0.4'
      );
    }

    // CTA animation
    if (ctaRef.current) {
      tl.fromTo(
        ctaRef.current.children,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(1.7)' },
        '-=0.3'
      );
    }
  }, []);

  const scrollToProjects = () => {
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated Gradient Blobs Background */}
      <div ref={blobsRef} className="absolute inset-0 z-0 overflow-hidden">
        {/* Purple blob */}
        <div 
          className="blob absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/30 rounded-full blur-[100px]"
          style={{ animationDelay: '0s' }}
        />
        {/* Pink blob */}
        <div 
          className="blob absolute top-1/3 right-1/4 w-80 h-80 bg-pink-500/25 rounded-full blur-[100px]"
          style={{ animationDelay: '2s' }}
        />
        {/* Cyan blob */}
        <div 
          className="blob absolute bottom-1/4 left-1/3 w-72 h-72 bg-cyan-500/25 rounded-full blur-[100px]"
          style={{ animationDelay: '4s' }}
        />
        {/* Orange blob */}
        <div 
          className="blob absolute bottom-1/3 right-1/3 w-64 h-64 bg-orange-500/20 rounded-full blur-[100px]"
          style={{ animationDelay: '6s' }}
        />
        
        {/* Grid overlay */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-transparent via-transparent to-[#0a0a0f]" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-purple-500/30 mb-8">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-sm text-white/70">Available for opportunities</span>
        </div>

        {/* Main Title */}
        <h1
          ref={titleRef}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
        >
          <span className="gradient-text-animated">Syamala Yasaswini</span>
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-xl sm:text-2xl md:text-3xl text-white/80 font-light mb-4"
        >
          Computer Science Engineer
        </p>

        {/* Description */}
        <p
          ref={descRef}
          className="text-base sm:text-lg text-white/50 max-w-2xl mx-auto mb-10"
        >
          B.Tech CSE @ SRM University AP |{' '}
          <span className="text-purple-400">Full Stack Developer</span> |{' '}
          <span className="text-pink-400">Data Science</span> |{' '}
          <span className="text-cyan-400">AI/ML Enthusiast</span>
        </p>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={scrollToProjects}
            className="group relative px-8 py-4 btn-gradient text-white font-medium rounded-full overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              View My Work
              <ArrowDown size={18} className="group-hover:translate-y-1 transition-transform" />
            </span>
          </button>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-white/5 border border-purple-500/30 flex items-center justify-center text-white/60 hover:text-purple-400 hover:border-purple-400 hover:bg-purple-500/10 transition-all duration-300"
            >
              <Github size={20} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-white/5 border border-pink-500/30 flex items-center justify-center text-white/60 hover:text-pink-400 hover:border-pink-400 hover:bg-pink-500/10 transition-all duration-300"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="mailto:yasaswini_syamala@srmap.edu.in"
              className="w-12 h-12 rounded-full bg-white/5 border border-cyan-500/30 flex items-center justify-center text-white/60 hover:text-cyan-400 hover:border-cyan-400 hover:bg-cyan-500/10 transition-all duration-300"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-1/4 left-10 w-3 h-3 bg-purple-500/50 rounded-full float-animation" />
      <div className="absolute top-1/3 right-20 w-4 h-4 bg-pink-500/40 rounded-full float-animation" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-1/4 left-1/4 w-3 h-3 bg-cyan-500/40 rounded-full float-animation" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-orange-500/40 rounded-full float-animation" style={{ animationDelay: '3s' }} />
    </section>
  );
};

export default Hero;
