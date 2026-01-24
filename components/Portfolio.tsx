import React, { useState } from 'react';
import { PROJECTS } from '../constants';
import { ArrowUpRight } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

const LazyImage: React.FC<{ src: string; alt: string; className?: string }> = ({ src, alt, className }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onLoad={() => setLoaded(true)}
      className={`${className} transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
    />
  );
};

const Portfolio: React.FC = () => {
  return (
    <section id="portfolio" className="py-32 relative scroll-mt-28 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute top-20 left-10 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-yellow-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="section-title">
                SELECTED <span className="gradient-text">WORKS</span>
              </h2>
              <div className="h-1 w-24 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full mt-6" />
            </div>
            <p className="text-zinc-400 max-w-md md:text-right">
              A showcase of precision engineering and user-centric design across industries.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PROJECTS.map((project, index) => (
            <ScrollReveal key={project.id} delay={index * 100}>
              <div className="group relative overflow-hidden rounded-2xl cursor-pointer h-full">
                <div className="aspect-[4/3] overflow-hidden bg-zinc-900">
                  <LazyImage
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                  />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/90 to-zinc-900/20 group-hover:via-zinc-900/95 transition-all duration-500" />
                <div className="absolute inset-0 border border-zinc-800/50 rounded-2xl group-hover:border-yellow-500/40 transition-colors duration-500" />

                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <div className="flex justify-between items-start mb-4">
                    <span className="tech-tag">
                      {project.category}
                    </span>
                    <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      <ArrowUpRight className="text-white w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="font-display text-3xl font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-zinc-300 line-clamp-2 mb-6 group-hover:text-zinc-200">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.tech.slice(0, 4).map((t, i) => (
                      <span
                        key={i}
                        className="text-xs text-zinc-400 px-3 py-1 rounded-full bg-zinc-800/80 border border-zinc-700/50"
                      >
                        {t}
                      </span>
                    ))}
                    {project.tech.length > 4 && (
                      <span className="text-xs text-zinc-500 px-3 py-1">
                        +{project.tech.length - 4} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;