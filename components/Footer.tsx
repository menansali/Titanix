import React from 'react';
import { Zap, Mail, Phone, MessageCircle, Instagram, ArrowUpRight } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="relative pt-20 pb-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-black via-zinc-950 to-zinc-950" />
      <div className="absolute inset-0 grid-bg opacity-10" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-yellow-400 flex items-center justify-center">
                  <Zap className="text-black w-5 h-5" />
                </div>
                <div className="absolute inset-0 w-10 h-10 rounded-xl bg-yellow-400 blur-xl opacity-40" />
              </div>
              <span className="font-display font-bold text-xl tracking-tight">
                <span className="text-white">TITANIX</span>
                <span className="text-yellow-400">.DEV</span>
              </span>
            </div>
            <p className="text-zinc-400 max-w-sm mb-8 leading-relaxed">
              Engineering the future through robust code and intelligent hardware.
              We turn complex problems into elegant solutions.
            </p>

            <div className="flex flex-col gap-3 mb-8">
              <a href="mailto:contact@titanix.dev" className="flex items-center gap-3 text-zinc-400 hover:text-yellow-400 transition-colors w-fit group">
                <Mail className="w-4 h-4" />
                <span>contact@titanix.dev</span>
                <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a href="tel:+37253951655" className="flex items-center gap-3 text-zinc-400 hover:text-yellow-400 transition-colors w-fit group">
                <Phone className="w-4 h-4" />
                <span>+372 5395 1655</span>
                <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a href="https://wa.me/37253951655" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-zinc-400 hover:text-yellow-400 transition-colors w-fit group">
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
                <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a href="https://instagram.com/titanixdev" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-zinc-400 hover:text-yellow-400 transition-colors w-fit group">
                <Instagram className="w-4 h-4" />
                <span>@titanixdev</span>
                <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>

            <div className="flex gap-3">
              {[
                { href: "mailto:contact@titanix.dev", icon: Mail },
                { href: "tel:+37253951655", icon: Phone },
                { href: "https://wa.me/37253951655", icon: MessageCircle, external: true },
                { href: "https://instagram.com/titanixdev", icon: Instagram, external: true },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target={social.external ? "_blank" : undefined}
                  rel={social.external ? "noopener noreferrer" : undefined}
                  className="w-10 h-10 rounded-xl glass-card flex items-center justify-center text-zinc-500 hover:text-yellow-400 hover:border-yellow-500/50 transition-all"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Services</h4>
            <ul className="space-y-3">
              {['IoT Development', 'Mobile Apps', 'Web Platforms'].map((service, i) => (
                <li key={i}>
                  <a href="#services" className="text-zinc-400 hover:text-yellow-400 transition-colors flex items-center gap-2 group">
                    {service}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Company</h4>
            <ul className="space-y-3">
              {[
                { name: 'About', href: '#about' },
                { name: 'Portfolio', href: '#portfolio' },
                { name: 'Contact', href: '#consultant' },
              ].map((link, i) => (
                <li key={i}>
                  <a href={link.href} className="text-zinc-400 hover:text-yellow-400 transition-colors flex items-center gap-2 group">
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        <div className="border-t border-zinc-800/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-zinc-600 text-sm">
            © {new Date().getFullYear()} Titanix.dev. All rights reserved.
          </p>
          <p className="text-zinc-600 text-sm flex items-center gap-2">
            Designed with <span className="text-yellow-400">⚡</span> in the Grid.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;