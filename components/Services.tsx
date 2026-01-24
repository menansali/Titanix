import React from 'react';
import { SERVICES } from '../constants';
import { Cpu, Smartphone, Code, ArrowUpRight } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

const iconMap: Record<string, React.ReactNode> = {
  Cpu: <Cpu className="w-8 h-8" />,
  Smartphone: <Smartphone className="w-8 h-8" />,
  Code: <Code className="w-8 h-8" />
};

const Services: React.FC = () => {
  return (
    <section id="services" className="py-32 relative scroll-mt-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-900/30 to-zinc-950" />
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-yellow-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-20">
            <h2 className="section-title">
              OUR <span className="gradient-text">EXPERTISE</span>
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full mx-auto mt-6" />
            <p className="text-zinc-400 text-lg mt-6 max-w-2xl mx-auto">
              Full-stack capabilities spanning hardware to cloud. We deliver end-to-end solutions.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SERVICES.map((service, index) => (
            <ScrollReveal key={service.id} delay={index * 100}>
              <div className="group relative glass-card-hover p-8 flex flex-col h-full">
                <div className="absolute top-6 right-6 text-6xl font-bold text-zinc-800/30 font-display">
                  0{index + 1}
                </div>

                <div className="w-16 h-16 rounded-2xl bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center mb-8 group-hover:border-yellow-500/60 group-hover:shadow-glow transition-all duration-500">
                  <div className="text-yellow-400 group-hover:text-yellow-300 transition-colors">
                    {iconMap[service.icon]}
                  </div>
                </div>

                <h3 className="font-display text-2xl font-bold text-white mb-4 group-hover:text-yellow-400 transition-colors">
                  {service.title}
                </h3>
                <p className="text-zinc-400 leading-relaxed flex-grow">
                  {service.description}
                </p>

                <div className="mt-8 flex items-center gap-2 text-yellow-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Learn More</span>
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;