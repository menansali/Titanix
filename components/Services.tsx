import React from 'react';
import { SERVICES } from '../constants';
import { Cpu, Smartphone, Code } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Cpu: <Cpu className="w-10 h-10" />,
  Smartphone: <Smartphone className="w-10 h-10" />,
  Code: <Code className="w-10 h-10" />
};

const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 bg-zinc-900/50 scroll-mt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            OUR <span className="text-titanix-yellow">EXPERTISE</span>
          </h2>
          <div className="h-1 w-20 bg-titanix-yellow"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service) => (
            <div 
              key={service.id} 
              className="group bg-titanix-card border border-zinc-800 p-8 rounded-xl hover:border-titanix-yellow transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
            >
              <div className="mb-6 text-zinc-500 group-hover:text-titanix-yellow transition-colors">
                {iconMap[service.icon]}
              </div>
              <h3 className="font-display text-xl font-bold text-white mb-3 group-hover:text-titanix-yellow transition-colors">
                {service.title}
              </h3>
              <p className="text-titanix-muted leading-relaxed text-sm">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;