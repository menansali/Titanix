import React from 'react';
import { ArrowRight, ChevronDown, Sparkles } from 'lucide-react';

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
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Animated Background Orbs */}
      <div className="absolute top-20 right-[20%] w-[500px] h-[500px] bg-yellow-500/15 rounded-full blur-[120px] animate-blob pointer-events-none" />
      <div className="absolute bottom-20 left-[10%] w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[100px] animate-blob animation-delay-2000 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-400/5 rounded-full blur-[150px] animate-pulse pointer-events-none" />

      {/* Grid Background */}
      <div className="absolute inset-0 grid-bg opacity-50 pointer-events-none" />

      {/* Floating 3D Shapes */}
      <div className="absolute top-32 right-32 w-20 h-20 border border-yellow-500/30 rotate-45 animate-float hidden lg:block" />
      <div className="absolute bottom-40 right-40 w-16 h-16 bg-gradient-to-br from-yellow-500/20 to-transparent rounded-xl animate-float-delayed hidden lg:block" />
      <div className="absolute top-60 left-20 w-12 h-12 border-2 border-amber-500/20 rounded-full animate-float hidden lg:block" />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="max-w-5xl">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full glass-card mb-8 animate-fade-in-up">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-yellow-500"></span>
            </span>
            <span className="text-sm text-zinc-300 font-medium">Available for new contracts</span>
            <Sparkles className="w-4 h-4 text-yellow-400" />
          </div>

          {/* Main Headline */}
          <h1 className="font-display text-6xl md:text-7xl lg:text-9xl font-bold leading-[0.9] mb-8 tracking-tight">
            <span className="block text-white">FORGING</span>
            <span className="block gradient-text">DIGITAL REALITY</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-zinc-400 mb-12 max-w-2xl leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            We architect high-performance <span className="text-yellow-400">IoT ecosystems</span> and
            <span className="text-amber-400"> mobile experiences</span>.
            From bare metal to cloud, we build solutions that matter.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <a
              href="#consultant"
              onClick={(e) => scrollToSection(e, 'consultant')}
              className="group btn-primary flex items-center justify-center gap-3"
            >
              Start Project
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#portfolio"
              onClick={(e) => scrollToSection(e, 'portfolio')}
              className="btn-secondary flex items-center justify-center gap-2"
            >
              View Works
            </a>
          </div>

          {/* Stats Row */}
          <div className="mt-16 flex flex-wrap gap-8 md:gap-16 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            {[
              { value: '10+', label: 'Years Experience' },
              { value: '50+', label: 'Projects Delivered' },
              { value: '99%', label: 'Client Satisfaction' },
            ].map((stat, i) => (
              <div key={i} className="text-center sm:text-left">
                <div className="text-3xl md:text-4xl font-bold text-yellow-400">{stat.value}</div>
                <div className="text-sm text-zinc-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs text-zinc-500 uppercase tracking-widest">Scroll</span>
        <ChevronDown className="w-5 h-5 text-yellow-500 animate-bounce" />
      </div>
    </section>
  );
};

export default Hero;