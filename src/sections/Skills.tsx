import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Zap, Globe, Server, Brain, Wrench, Code } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Skill {
  name: string;
  category: string;
  color: string;
}

const Skills = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const spiralRef = useRef<HTMLDivElement>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const skills: Skill[] = [
    // Languages
    { name: 'Java', category: 'Languages', color: '#f59e0b' },
    { name: 'C++', category: 'Languages', color: '#3b82f6' },
    { name: 'Python', category: 'Languages', color: '#fbbf24' },
    { name: 'JavaScript', category: 'Languages', color: '#fbbf24' },
    // Frontend
    { name: 'HTML', category: 'Frontend', color: '#f97316' },
    { name: 'CSS', category: 'Frontend', color: '#3b82f6' },
    { name: 'React.js', category: 'Frontend', color: '#06b6d4' },
    { name: 'Tailwind CSS', category: 'Frontend', color: '#06b6d4' },
    // Backend
    { name: 'Node.js', category: 'Backend', color: '#22c55e' },
    { name: 'Express.js', category: 'Backend', color: '#6b7280' },
    { name: 'MongoDB', category: 'Backend', color: '#22c55e' },
    { name: 'Flask', category: 'Backend', color: '#6b7280' },
    // AI/ML
    { name: 'Scikit-learn', category: 'AI/ML', color: '#f97316' },
    { name: 'XGBoost', category: 'AI/ML', color: '#8b5cf6' },
    { name: 'TensorFlow', category: 'AI/ML', color: '#f97316' },
    { name: 'SHAP', category: 'AI/ML', color: '#ec4899' },
    { name: 'LIME', category: 'AI/ML', color: '#06b6d4' },
    { name: 'OpenCV', category: 'AI/ML', color: '#22c55e' },
    // Tools
    { name: 'Git', category: 'Tools', color: '#f97316' },
    { name: 'PowerBI', color: '#fbbf24', category: 'Tools' },
    { name: 'Vercel', category: 'Tools', color: '#6b7280' },
    { name: 'React Native', category: 'Tools', color: '#06b6d4' },
  ];

  const categories = [
    { name: 'All', icon: Zap, color: 'from-purple-500 to-pink-500' },
    { name: 'Languages', icon: Code, color: 'from-amber-500 to-orange-500' },
    { name: 'Frontend', icon: Globe, color: 'from-cyan-500 to-blue-500' },
    { name: 'Backend', icon: Server, color: 'from-green-500 to-emerald-500' },
    { name: 'AI/ML', icon: Brain, color: 'from-purple-500 to-violet-500' },
    { name: 'Tools', icon: Wrench, color: 'from-pink-500 to-rose-500' },
  ];

  const filteredSkills = activeCategory === 'All' 
    ? skills 
    : skills.filter(s => s.category === activeCategory);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const spiral = spiralRef.current;

    if (!section || !heading || !spiral) return;

    const triggers: ScrollTrigger[] = [];

    // Heading animation
    const headingTrigger = ScrollTrigger.create({
      trigger: heading,
      start: 'top 80%',
      onEnter: () => {
        gsap.fromTo(
          heading,
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 1, ease: 'back.out(1.7)' }
        );
      },
      once: true,
    });
    triggers.push(headingTrigger);

    // Skill pills animation
    const pills = spiral.querySelectorAll('.skill-pill');
    const spiralTrigger = ScrollTrigger.create({
      trigger: spiral,
      start: 'top 75%',
      onEnter: () => {
        gsap.fromTo(
          pills,
          { opacity: 0, scale: 0, y: 20 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.6,
            stagger: {
              each: 0.02,
              from: 'random',
            },
            ease: 'back.out(1.4)',
          }
        );
      },
      once: true,
    });
    triggers.push(spiralTrigger);

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, [filteredSkills]);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative min-h-screen py-24 px-6 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-purple-600/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-600/5 rounded-full blur-[150px]" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 mb-6">
            <Zap size={16} className="text-cyan-400" />
            <span className="text-sm text-cyan-300">My Arsenal</span>
          </div>
          <h2
            ref={headingRef}
            className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-4"
          >
            <span className="gradient-text">Tech Stack</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Technologies I work with to bring ideas to life
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => setActiveCategory(category.name)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                activeCategory === category.name
                  ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                  : 'bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 hover:text-white'
              }`}
            >
              <category.icon size={14} />
              {category.name}
            </button>
          ))}
        </div>

        {/* Skills Cloud */}
        <div
          ref={spiralRef}
          className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto"
        >
          {filteredSkills.map((skill, index) => {
            const isHovered = hoveredSkill === skill.name;
            return (
              <div
                key={index}
                className={`skill-pill relative px-5 py-2.5 rounded-full cursor-pointer transition-all duration-300 ${
                  isHovered ? 'z-10' : ''
                }`}
                style={{
                  background: isHovered
                    ? `linear-gradient(135deg, ${skill.color}30 0%, ${skill.color}10 100%)`
                    : 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                  boxShadow: isHovered
                    ? `0 0 30px ${skill.color}40, inset 0 0 20px ${skill.color}20`
                    : 'none',
                  border: isHovered 
                    ? `1px solid ${skill.color}60` 
                    : '1px solid rgba(255,255,255,0.08)',
                }}
                onMouseEnter={() => setHoveredSkill(skill.name)}
                onMouseLeave={() => setHoveredSkill(null)}
              >
                <span 
                  className={`text-sm font-medium transition-colors duration-300 ${
                    isHovered ? 'text-white' : 'text-white/70'
                  }`}
                  style={{ color: isHovered ? skill.color : undefined }}
                >
                  {skill.name}
                </span>

                {/* Category tooltip */}
                <div
                  className={`absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-white/10 text-xs text-white/60 whitespace-nowrap transition-all duration-300 ${
                    isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
                  }`}
                >
                  {skill.category}
                </div>
              </div>
            );
          })}
        </div>

        {/* Skills Summary */}
        <div className="mt-20 grid md:grid-cols-3 gap-8">
          {[
            {
              title: 'Full Stack Development',
              description: 'Building complete web applications from frontend to backend with modern frameworks and databases.',
              icon: '🌐',
              gradient: 'from-cyan-500/20 to-blue-500/10',
              borderColor: 'border-cyan-500/30',
            },
            {
              title: 'AI & Machine Learning',
              description: 'Developing intelligent systems using deep learning, XAI techniques, and predictive modeling.',
              icon: '🤖',
              gradient: 'from-purple-500/20 to-violet-500/10',
              borderColor: 'border-purple-500/30',
            },
            {
              title: 'Mobile Development',
              description: 'Creating cross-platform mobile applications with React Native and modern UI/UX practices.',
              icon: '📱',
              gradient: 'from-pink-500/20 to-rose-500/10',
              borderColor: 'border-pink-500/30',
            },
          ].map((item, index) => (
            <div
              key={index}
              className={`group p-6 rounded-2xl bg-gradient-to-br ${item.gradient} border ${item.borderColor} hover:scale-[1.02] transition-all duration-500`}
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{item.icon}</div>
              <h3 className="text-white font-semibold text-lg mb-2">{item.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
