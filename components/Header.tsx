import React, { useState, useEffect } from 'react';
import { Menu, X, Zap } from 'lucide-react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    setMobileMenuOpen(false);
  };

  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { name: 'About', href: 'about' },
    { name: 'Services', href: 'services' },
    { name: 'Portfolio', href: 'portfolio' },
    { name: 'Consultant', href: 'consultant' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'py-3' : 'py-5'
        }`}
    >
      <div className={`absolute inset-0 transition-all duration-500 ${isScrolled
          ? 'bg-zinc-900/80 backdrop-blur-xl border-b border-zinc-800/50'
          : 'bg-transparent'
        }`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between relative z-10">

        <a href="#" onClick={scrollToTop} className="flex items-center gap-3 group">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-yellow-400 flex items-center justify-center transform group-hover:rotate-12 transition-all duration-300 group-hover:shadow-glow">
              <Zap className="text-black w-5 h-5" />
            </div>
            <div className="absolute inset-0 w-10 h-10 rounded-xl bg-yellow-400 blur-xl opacity-40 group-hover:opacity-70 transition-opacity" />
          </div>
          <span className="font-display font-bold text-2xl tracking-tight">
            <span className="text-white">TITANIX</span>
            <span className="text-yellow-400">.DEV</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={`#${link.href}`}
              onClick={(e) => scrollToSection(e, link.href)}
              className="relative px-4 py-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors group"
            >
              {link.name}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-yellow-400 group-hover:w-full transition-all duration-300" />
            </a>
          ))}
          <a
            href="#consultant"
            onClick={(e) => scrollToSection(e, 'consultant')}
            className="ml-4 px-6 py-2.5 rounded-full text-sm font-bold text-black bg-yellow-400 hover:bg-yellow-300 transition-all duration-300 hover:shadow-glow-lg hover:scale-105"
          >
            Start Project
          </a>
        </nav>

        <button
          className="md:hidden relative z-10 w-10 h-10 rounded-lg glass-card flex items-center justify-center"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
        </button>
      </div>

      <div className={`md:hidden absolute top-full left-0 right-0 transition-all duration-300 ${mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}>
        <div className="mx-4 mt-2 p-4 glass-card rounded-2xl">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={`#${link.href}`}
                className="px-4 py-3 rounded-xl text-lg font-medium text-white hover:bg-zinc-800/50 transition-colors"
                onClick={(e) => scrollToSection(e, link.href)}
              >
                {link.name}
              </a>
            ))}
            <a
              href="#consultant"
              onClick={(e) => scrollToSection(e, 'consultant')}
              className="mt-2 py-3 rounded-xl font-bold text-center text-black bg-yellow-400"
            >
              Start Project
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;