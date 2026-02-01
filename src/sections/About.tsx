import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap, MapPin, Heart, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const content = contentRef.current;
    const cards = cardsRef.current;

    if (!section || !heading || !content || !cards) return;

    const triggers: ScrollTrigger[] = [];

    // Heading animation
    const headingTrigger = ScrollTrigger.create({
      trigger: heading,
      start: 'top 80%',
      onEnter: () => {
        gsap.fromTo(
          heading,
          { opacity: 0, x: -50 },
          { opacity: 1, x: 0, duration: 1, ease: 'power2.out' }
        );
      },
      once: true,
    });
    triggers.push(headingTrigger);

    // Content reveal animation
    const contentTrigger = ScrollTrigger.create({
      trigger: content,
      start: 'top 75%',
      onEnter: () => {
        gsap.fromTo(
          content,
          { opacity: 0, y: 40, rotateX: 10 },
          { opacity: 1, y: 0, rotateX: 0, duration: 1, ease: 'power2.out' }
        );
      },
      once: true,
    });
    triggers.push(contentTrigger);

    // Cards stagger animation
    const cardElements = cards.querySelectorAll('.info-card');
    const cardsTrigger = ScrollTrigger.create({
      trigger: cards,
      start: 'top 80%',
      onEnter: () => {
        gsap.fromTo(
          cardElements,
          { opacity: 0, y: 30, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.15, ease: 'back.out(1.4)' }
        );
      },
      once: true,
    });
    triggers.push(cardsTrigger);

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, []);

  const infoCards = [
    {
      icon: GraduationCap,
      title: 'Education',
      content: 'B.Tech CSE, SRM University AP',
      subContent: 'Class of 2026',
      gradient: 'from-purple-500/20 to-purple-600/10',
      borderColor: 'border-purple-500/30',
      iconColor: 'text-purple-400',
    },
    {
      icon: MapPin,
      title: 'Location',
      content: 'Andhra Pradesh, India',
      subContent: 'Chirumamilla',
      gradient: 'from-pink-500/20 to-pink-600/10',
      borderColor: 'border-pink-500/30',
      iconColor: 'text-pink-400',
    },
    {
      icon: Heart,
      title: 'Interests',
      content: 'AI/ML, Data Science, Web Development',
      subContent: 'Open Source',
      gradient: 'from-cyan-500/20 to-cyan-600/10',
      borderColor: 'border-cyan-500/30',
      iconColor: 'text-cyan-400',
    },
  ];

  const stats = [
    { value: '3+', label: 'Years of Coding', color: 'text-purple-400' },
    { value: '5+', label: 'Projects Completed', color: 'text-pink-400' },
    { value: '3', label: 'Certifications', color: 'text-cyan-400' },
    { value: '72%', label: 'Academic Score', color: 'text-orange-400' },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen py-24 px-6 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-purple-600/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-pink-600/5 rounded-full blur-[150px]" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="grid md:grid-cols-2 gap-12 items-start mb-16">
          {/* Heading */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30 mb-6">
              <Sparkles size={16} className="text-purple-400" />
              <span className="text-sm text-purple-300">Get to know me</span>
            </div>
            <h2
              ref={headingRef}
              className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight"
            >
              <span className="gradient-text">About Me</span>
            </h2>
          </div>

          {/* Description */}
          <div ref={contentRef} className="space-y-6" style={{ perspective: '1000px' }}>
            <p className="text-lg text-white/70 leading-relaxed">
              I am <span className="text-purple-400 font-medium">Syamala Yasaswini</span>, a passionate
              Computer Science and Engineering student at{' '}
              <span className="text-pink-400 font-medium">SRM University AP</span> (Class of 2026).
              With a strong foundation in programming and a keen interest in building innovative
              solutions, I specialize in full-stack development, data science, and artificial intelligence.
            </p>
            <p className="text-lg text-white/70 leading-relaxed">
              My journey in tech is driven by curiosity and a desire to create impactful applications
              that solve real-world problems. From developing{' '}
              <span className="text-cyan-400">AI-powered course recommendation systems</span>
              {' '}to building mobile applications and medical diagnosis tools, I continuously explore
              new technologies and push my boundaries.
            </p>
          </div>
        </div>

        {/* Info Cards */}
        <div ref={cardsRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {infoCards.map((card, index) => (
            <div
              key={index}
              className={`info-card group relative p-6 rounded-2xl bg-gradient-to-br ${card.gradient} border ${card.borderColor} backdrop-blur-sm hover:scale-[1.02] transition-all duration-500`}
            >
              {/* Glow effect on hover */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl`} />

              <div className="relative z-10">
                <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <card.icon size={24} className={card.iconColor} />
                </div>
                <h3 className="text-sm text-white/40 uppercase tracking-wider mb-2">{card.title}</h3>
                <p className="text-white font-medium text-lg">{card.content}</p>
                <p className="text-white/50 text-sm mt-1">{card.subContent}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-6 rounded-2xl bg-white/[0.02] border border-white/5">
              <div className={`text-4xl md:text-5xl font-bold ${stat.color} mb-2`}>{stat.value}</div>
              <div className="text-sm text-white/50">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
