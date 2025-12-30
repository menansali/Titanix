import React from 'react';
import { PROJECTS } from '../constants';
import { ExternalLink } from 'lucide-react';

const Portfolio: React.FC = () => {
  return (
    <section id="portfolio" className="py-24 bg-titanix-dark scroll-mt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
              SELECTED <span className="text-titanix-yellow">WORKS</span>
            </h2>
            <div className="h-1 w-20 bg-titanix-yellow"></div>
          </div>
          <p className="text-titanix-muted max-w-md text-right">
            A showcase of precision engineering and user-centric design across industries.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PROJECTS.map((project) => (
            <div 
              key={project.id} 
              className="group relative overflow-hidden rounded-xl bg-zinc-800 aspect-[4/3] cursor-pointer border border-zinc-800 hover:border-titanix-yellow/50 transition-colors"
            >
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-40"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent p-6 flex flex-col justify-end translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <div className="flex justify-between items-start mb-2">
                   <span className="text-titanix-yellow text-xs font-bold uppercase tracking-wider bg-titanix-yellow/10 px-2 py-1 rounded">
                    {project.category}
                  </span>
                  <ExternalLink className="text-white w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                
                <h3 className="font-display text-2xl font-bold text-white mb-2 leading-tight">
                  {project.title}
                </h3>
                
                <p className="text-zinc-300 text-sm line-clamp-3 mb-4">
                  {project.description}
                </p>

                {/* Tech Stack Tags */}
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tech.map((t, i) => (
                    <span key={i} className="text-[10px] text-zinc-400 border border-zinc-700 px-2 py-0.5 rounded bg-black/50">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;