import React from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';

const Hero: React.FC = () => {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-titanix-dark">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
         <svg viewBox="0 0 100 100" className="w-full h-full text-titanix-yellow fill-current">
            <path d="M0 0 L100 0 L100 100 Z" />
         </svg>
      </div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-titanix-yellow blur-[150px] opacity-10 rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-titanix-card/50 backdrop-blur-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-titanix-yellow animate-pulse"></span>
            <span className="text-xs text-titanix-muted uppercase tracking-wider font-semibold">Available for new contracts</span>
          </div>
          
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.95] mb-8">
            FORGING <br />
            <span className="text-titanix-yellow">DIGITAL REALITY</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-titanix-muted mb-10 max-w-2xl leading-relaxed">
            We architect high-performance IoT ecosystems and mobile experiences. 
            From bare metal to cloud, we build solutions that matter.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="#consultant" 
              onClick={(e) => scrollToSection(e, 'consultant')}
              className="group flex items-center justify-center gap-2 bg-titanix-yellow text-black px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-300 transition-all"
            >
              Start Project
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href="#portfolio" 
              onClick={(e) => scrollToSection(e, 'portfolio')}
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-bold text-white border border-zinc-700 hover:border-titanix-yellow hover:text-titanix-yellow transition-all bg-titanix-card/30"
            >
              View Works
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-titanix-muted">
        <ChevronDown className="w-8 h-8 opacity-50" />
      </div>
    </section>
  );
};

export default Hero;