import React from 'react';
import { Cpu, Instagram, Mail, Phone, MessageCircle } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t border-zinc-900 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-titanix-yellow rounded flex items-center justify-center">
                <Cpu className="text-black w-5 h-5" />
              </div>
              <span className="font-display font-bold text-xl tracking-tighter text-white">
                TITANIX<span className="text-titanix-yellow">.DEV</span>
              </span>
            </div>
            <p className="text-titanix-muted max-w-sm mb-6">
              Engineering the future through robust code and intelligent hardware. 
              We turn complex problems into elegant solutions.
            </p>
            
            <div className="flex flex-col gap-3 mb-6">
              <a href="mailto:contact@titanix.dev" className="flex items-center gap-2 text-zinc-400 hover:text-titanix-yellow transition-colors w-fit">
                <Mail className="w-4 h-4" />
                <span>contact@titanix.dev</span>
              </a>
              <a href="https://wa.me/37253951655" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-zinc-400 hover:text-titanix-yellow transition-colors w-fit">
                <Phone className="w-4 h-4" />
                <span>+372 5395 1655</span>
              </a>
              <a href="https://instagram.com/titanixdev" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-zinc-400 hover:text-titanix-yellow transition-colors w-fit">
                <Instagram className="w-4 h-4" />
                <span>@titanixdev</span>
              </a>
            </div>

            <div className="flex gap-4">
              <a href="mailto:contact@titanix.dev" className="text-zinc-500 hover:text-titanix-yellow transition-colors">
                <Mail className="w-5 h-5" />
              </a>
              <a href="https://wa.me/37253951655" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-titanix-yellow transition-colors">
                <MessageCircle className="w-5 h-5" />
              </a>
              <a href="https://instagram.com/titanixdev" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-titanix-yellow transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Services</h4>
            <ul className="space-y-2 text-zinc-400">
              <li><a href="#services" className="hover:text-titanix-yellow transition-colors">IoT Development</a></li>
              <li><a href="#services" className="hover:text-titanix-yellow transition-colors">Mobile Apps</a></li>
              <li><a href="#services" className="hover:text-titanix-yellow transition-colors">Web Platforms</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-zinc-400">
              <li><a href="#about" className="hover:text-titanix-yellow transition-colors">About</a></li>
              <li><a href="#portfolio" className="hover:text-titanix-yellow transition-colors">Portfolio</a></li>
              <li><a href="#consultant" className="hover:text-titanix-yellow transition-colors">Contact</a></li>
            </ul>
          </div>

        </div>

        <div className="border-t border-zinc-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-zinc-600 text-sm">
            © {new Date().getFullYear()} Titanix.dev. All rights reserved.
          </p>
          <p className="text-zinc-600 text-sm flex items-center gap-2">
            Designed with <span className="text-titanix-yellow">⚡</span> in the Grid.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;