import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Database, BarChart3, Briefcase, ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Certification {
  title: string;
  issuer: string;
  id: string;
  date: string;
  description: string;
  icon: React.ElementType;
  gradient: string;
  borderColor: string;
  iconColor: string;
}

const Certifications = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const certifications: Certification[] = [
    {
      title: 'Associate Developer',
      issuer: 'MongoDB',
      id: 'MDBp2815xd2jq',
      date: 'Apr 2025',
      description:
        'Official certification validating proficiency in CRUD operations, indexing, aggregation pipelines, schema design, and data modeling. Demonstrated ability to build and optimize applications using MongoDB with focus on performance, scalability, and security.',
      icon: Database,
      gradient: 'from-green-500/20 to-emerald-500/10',
      borderColor: 'border-green-500/30',
      iconColor: 'text-green-400',
    },
    {
      title: 'PowerBI Analyst',
      issuer: 'Celebal Technologies',
      id: '',
      date: 'Aug 2025',
      description:
        'Designed and developed interactive dashboards and reports using Power BI. Transformed raw datasets into meaningful insights through DAX measures, calculated columns, and advanced data modeling techniques.',
      icon: BarChart3,
      gradient: 'from-yellow-500/20 to-amber-500/10',
      borderColor: 'border-yellow-500/30',
      iconColor: 'text-yellow-400',
    },
    {
      title: 'Data Analyst Job Simulation',
      issuer: 'Deloitte',
      id: '9zcXuTkPwPrYeG3gB',
      date: 'Mar 2025',
      description:
        "Completed Deloitte's Data Analytics Virtual Internship simulating real-world client projects. Performed data cleaning, preparation, and visualization using Excel and Power BI. Conducted exploratory data analysis to identify business trends and insights.",
      icon: Briefcase,
      gradient: 'from-green-600/20 to-green-700/10',
      borderColor: 'border-green-600/30',
      iconColor: 'text-green-500',
    },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const grid = gridRef.current;

    if (!section || !heading || !grid) return;

    const triggers: ScrollTrigger[] = [];

    // Heading animation
    const headingTrigger = ScrollTrigger.create({
      trigger: heading,
      start: 'top 80%',
      onEnter: () => {
        gsap.fromTo(
          heading,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
        );
      },
      once: true,
    });
    triggers.push(headingTrigger);

    // Cards animation with tilt effect
    const cards = grid.querySelectorAll('.cert-card');
    const cardsTrigger = ScrollTrigger.create({
      trigger: grid,
      start: 'top 75%',
      onEnter: () => {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 50, rotateX: 20 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.8,
            stagger: 0.15,
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

  return (
    <section
      id="certifications"
      ref={sectionRef}
      className="relative min-h-screen py-24 px-6 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-purple-600/5 via-pink-600/5 to-cyan-600/5 rounded-full blur-[150px]" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30 mb-6">
            <Award size={16} className="text-purple-400" />
            <span className="text-sm text-purple-300">Professional Credentials</span>
          </div>
          <h2
            ref={headingRef}
            className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight"
          >
            <span className="gradient-text">Certifications</span>
          </h2>
        </div>

        {/* Certifications Grid */}
        <div
          ref={gridRef}
          className="grid md:grid-cols-3 gap-6"
          style={{ perspective: '1000px' }}
        >
          {certifications.map((cert, index) => (
            <div
              key={index}
              className={`cert-card group relative rounded-3xl overflow-hidden transition-all duration-500 hover:scale-[1.02]`}
              style={{
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Gradient card background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${cert.gradient} backdrop-blur-xl`} />
              
              {/* Border */}
              <div className={`absolute inset-0 rounded-3xl border ${cert.borderColor} group-hover:border-opacity-60 transition-colors duration-500`} />

              {/* Glow effect */}
              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${cert.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl`} />

              {/* Content */}
              <div className="relative p-8">
                {/* Icon */}
                <div className={`w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-white/10 transition-all duration-300`}>
                  <cert.icon size={28} className={cert.iconColor} />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/80 transition-all">
                  {cert.title}
                </h3>

                {/* Issuer */}
                <p className={`${cert.iconColor} text-sm mb-4 font-medium`}>{cert.issuer}</p>

                {/* Description */}
                <p className="text-white/50 text-sm leading-relaxed mb-6 line-clamp-4">
                  {cert.description}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <div>
                    <p className="text-xs text-white/30">{cert.date}</p>
                    {cert.id && (
                      <p className="text-xs text-white/20 font-mono mt-1">ID: {cert.id}</p>
                    )}
                  </div>
                  <button className={`w-10 h-10 rounded-full bg-white/5 flex items-center justify-center ${cert.iconColor} hover:bg-white/10 transition-all duration-300`}>
                    <ExternalLink size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <p className="text-white/40 text-sm">
            Continuously learning and expanding my skillset through professional certifications
          </p>
        </div>
      </div>
    </section>
  );
};

export default Certifications;
