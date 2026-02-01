import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github, ChevronLeft, ChevronRight, Folder } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  title: string;
  description: string;
  image: string;
  tech: string[];
  type: string;
  duration: string;
  links?: { github?: string; demo?: string };
  gradient: string;
}

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const projects: Project[] = [
    {
      title: 'CourseGPT',
      description:
        'AI-powered course recommendation platform using React.js, Tailwind CSS, and OpenAI GPT APIs. Features intelligent course matching, personalized learning paths, and real-time query processing with modern UI libraries.',
      image: '/coursegpt.jpg',
      tech: ['React.js', 'TailwindCSS', 'Node.js', 'OpenAI API', 'Vercel'],
      type: 'Personal Project',
      duration: 'Jun 2024 - Oct 2024',
      links: { github: '#', demo: '#' },
      gradient: 'from-purple-600 to-pink-600',
    },
    {
      title: 'Grocery App',
      description:
        'Full-stack mobile application for online grocery shopping with user authentication, product categorization, cart management, and secure order placement. Built with React Native for cross-platform compatibility.',
      image: '/groceryapp.jpg',
      tech: ['React Native', 'Express.js', 'MongoDB', 'Node.js'],
      type: 'Team Project',
      duration: 'Jan 2025 - May 2025',
      links: { github: '#' },
      gradient: 'from-green-600 to-emerald-600',
    },
    {
      title: 'Heart Failure Prediction',
      description:
        'ML system using Gradient Boosting and Explainable AI (SHAP, LIME, Grad-CAM) for heart failure risk prediction. Integrates clinical data and medical imaging with transparent model interpretations for healthcare decision support.',
      image: '/heartprediction.jpg',
      tech: ['Python', 'Scikit-learn', 'XGBoost', 'TensorFlow', 'Flask', 'SHAP', 'LIME'],
      type: 'Team Project',
      duration: 'Sep 2025 - Dec 2025',
      links: { github: '#' },
      gradient: 'from-cyan-600 to-blue-600',
    },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;

    if (!section || !heading) return;

    const triggers: ScrollTrigger[] = [];

    // Heading animation
    const headingTrigger = ScrollTrigger.create({
      trigger: heading,
      start: 'top 80%',
      onEnter: () => {
        gsap.fromTo(
          heading,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
        );
      },
      once: true,
    });
    triggers.push(headingTrigger);

    // Cards animation
    const cards = section.querySelectorAll('.project-card');
    const cardsTrigger = ScrollTrigger.create({
      trigger: sliderRef.current,
      start: 'top 75%',
      onEnter: () => {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 60, rotateY: 15 },
          {
            opacity: 1,
            y: 0,
            rotateY: 0,
            duration: 1,
            stagger: 0.2,
            ease: 'power2.out',
          }
        );
      },
      once: true,
    });
    triggers.push(cardsTrigger);

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, []);

  const nextProject = () => {
    setActiveIndex((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative min-h-screen py-24 px-6 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-purple-600/5 rounded-full blur-[200px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/10 border border-pink-500/30 mb-6">
              <Folder size={16} className="text-pink-400" />
              <span className="text-sm text-pink-300">Featured Work</span>
            </div>
            <h2
              ref={headingRef}
              className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-4"
            >
              <span className="gradient-text">Projects</span>
            </h2>
            <p className="text-white/50 text-lg max-w-xl">
              Showcasing my best work across web development, mobile apps, and AI/ML
            </p>
          </div>

          {/* Navigation Arrows */}
          <div className="flex gap-3 mt-6 md:mt-0">
            <button
              onClick={prevProject}
              className="w-12 h-12 rounded-full bg-white/5 border border-purple-500/30 flex items-center justify-center text-white/60 hover:text-purple-400 hover:border-purple-400 hover:bg-purple-500/10 transition-all duration-300"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextProject}
              className="w-12 h-12 rounded-full bg-white/5 border border-pink-500/30 flex items-center justify-center text-white/60 hover:text-pink-400 hover:border-pink-400 hover:bg-pink-500/10 transition-all duration-300"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Projects Grid */}
        <div
          ref={sliderRef}
          className="grid lg:grid-cols-3 gap-8"
          style={{ perspective: '2000px' }}
        >
          {projects.map((project, index) => (
            <div
              key={index}
              className={`project-card group relative rounded-3xl overflow-hidden bg-white/[0.02] border border-white/5 transition-all duration-500 ${
                index === activeIndex ? 'lg:scale-105 lg:z-10' : 'lg:scale-100 lg:opacity-70'
              }`}
              style={{
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Gradient border effect */}
              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
              
              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent" />

                {/* Type badge */}
                <div className={`absolute top-4 left-4 px-3 py-1 rounded-full bg-gradient-to-r ${project.gradient} text-xs text-white font-medium`}>
                  {project.type}
                </div>

                {/* Duration */}
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs text-white/60">
                  {project.duration}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/70 transition-all">
                  {project.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.slice(0, 4).map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 rounded-full bg-white/5 text-xs text-white/60 border border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.tech.length > 4 && (
                    <span className="px-3 py-1 rounded-full bg-white/5 text-xs text-white/40">
                      +{project.tech.length - 4}
                    </span>
                  )}
                </div>

                {/* Links */}
                <div className="flex gap-3">
                  {project.links?.github && (
                    <a
                      href={project.links.github}
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 text-sm text-white/60 hover:bg-purple-500/20 hover:text-purple-400 hover:border-purple-500/30 border border-transparent transition-all duration-300"
                    >
                      <Github size={16} />
                      Code
                    </a>
                  )}
                  {project.links?.demo && (
                    <a
                      href={project.links.demo}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${project.gradient} text-white text-sm font-medium hover:opacity-90 transition-opacity`}
                    >
                      <ExternalLink size={16} />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination dots */}
        <div className="flex justify-center gap-3 mt-12">
          {projects.map((project, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === activeIndex 
                  ? `w-8 bg-gradient-to-r ${project.gradient}` 
                  : 'w-2 bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
