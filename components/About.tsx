import React from 'react';
import { Target, Shield, Zap, Cpu } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

const About: React.FC = () => {
  const values = [
    {
      icon: Target,
      title: 'Precision',
      description: 'We write clean, efficient code that performs flawlessly on constrained hardware and scalable clouds alike.',
    },
    {
      icon: Shield,
      title: 'Security',
      description: 'Security is not an afterthought. We implement military-grade encryption and best practices from day one.',
    },
    {
      icon: Zap,
      title: 'Velocity',
      description: 'Rapid prototyping meets agile development. We transform concepts into deployed realities faster.',
    },
  ];

  return (
    <section id="about" className="py-32 relative overflow-hidden scroll-mt-28">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-yellow-500/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

          <div>
            <ScrollReveal>
              <div className="mb-10">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-card mb-6">
                  <Cpu className="w-4 h-4 text-yellow-400" />
                  <span className="text-xs text-zinc-400 uppercase tracking-wider font-semibold">Who We Are</span>
                </div>

                <h2 className="section-title">
                  BRIDGING THE GAP BETWEEN{' '}
                  <span className="gradient-text">SILICON & SOFTWARE</span>
                </h2>

                <div className="h-1 w-24 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full mt-6" />
              </div>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <div className="space-y-6 text-lg leading-relaxed">
                <p className="text-zinc-400">
                  At <span className="text-white font-semibold">Titanix.dev</span>, we are more than just developers; we are digital craftsmen.
                  Our mission is to architect robust, scalable ecosystems where hardware intelligence meets intuitive software design.
                </p>
                <p className="text-zinc-400">
                  Founded by a team of senior engineers passionate about IoT and high-performance computing, we believe that true innovation happens
                  at the intersection of disciplines. Whether it's optimizing firmware or engineering a complex web platform, we bring
                  <span className="text-yellow-400"> precision and power</span> to every line of code.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="mt-10 flex flex-wrap gap-4">
                <div className="px-5 py-3 glass-card rounded-full flex items-center gap-3">
                  <div className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
                  </div>
                  <span className="text-white font-medium">10+ Years Experience</span>
                </div>
                <div className="px-5 py-3 glass-card rounded-full">
                  <span className="text-white font-medium">50+ Enterprise Projects</span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {values.map((value, index) => (
              <ScrollReveal key={value.title} delay={index * 100}>
                <div className={`glass-card-hover p-8 ${index === 1 ? 'lg:translate-x-8' : ''}`}>
                  <div className="flex items-start gap-6">
                    <div className="w-14 h-14 rounded-xl bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center flex-shrink-0">
                      <value.icon className="w-6 h-6 text-yellow-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">{value.title}</h3>
                      <p className="text-zinc-400 leading-relaxed">{value.description}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;