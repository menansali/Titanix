import React, { useState, useEffect } from 'react';
import { Menu, X, Cpu } from 'lucide-react';

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        isScrolled 
          ? 'bg-titanix-dark/90 backdrop-blur-md border-titanix-card py-4' 
          : 'bg-transparent border-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Logo */}
        <a href="#" onClick={scrollToTop} className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-titanix-yellow rounded-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
            <Cpu className="text-black w-6 h-6" />
          </div>
          <span className="font-display font-bold text-2xl tracking-tighter text-white">
            TITANIX<span className="text-titanix-yellow">.DEV</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={`#${link.href}`}
              onClick={(e) => scrollToSection(e, link.href)}
              className="text-sm font-medium text-titanix-muted hover:text-titanix-yellow transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#consultant"
            onClick={(e) => scrollToSection(e, 'consultant')}
            className="bg-titanix-yellow text-black px-5 py-2.5 rounded-full text-sm font-bold hover:bg-yellow-300 transition-all shadow-[0_0_15px_rgba(250,204,21,0.3)] hover:shadow-[0_0_25px_rgba(250,204,21,0.5)]"
          >
            Start Project
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-titanix-card border-b border-zinc-800 p-4 animate-fade-in-down shadow-2xl">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a 
                key={link.name}
                href={`#${link.href}`}
                className="text-lg font-medium text-white hover:text-titanix-yellow"
                onClick={(e) => scrollToSection(e, link.href)}
              >
                {link.name}
              </a>
            ))}
            <a 
              href="#consultant"
              onClick={(e) => scrollToSection(e, 'consultant')}
              className="bg-titanix-yellow text-black text-center py-3 rounded-lg font-bold"
            >
              Start Project
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;