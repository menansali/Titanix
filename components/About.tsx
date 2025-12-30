import React from 'react';
import { Target, Shield, Zap } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-titanix-dark relative overflow-hidden scroll-mt-28">
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Text Content */}
          <div>
            <div className="mb-8">
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                BRIDGING THE GAP BETWEEN <br />
                <span className="text-titanix-yellow">SILICON & SOFTWARE</span>
              </h2>
              <div className="h-1 w-20 bg-titanix-yellow"></div>
            </div>
            
            <div className="space-y-6 text-zinc-400 text-lg leading-relaxed">
              <p>
                At <span className="text-white font-semibold">Titanix.dev</span>, we are more than just developers; we are digital craftsmen. 
                Our mission is to architect robust, scalable ecosystems where hardware intelligence meets intuitive software design.
              </p>
              <p>
                Founded by a team of senior engineers passionate about IoT and high-performance computing, we believe that true innovation happens 
                at the intersection of disciplines. Whether it's optimizing firmware or engineering a complex web platform, we bring <span className="text-titanix-yellow">precision and power</span> to every line of code.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
               <div className="px-6 py-3 border border-zinc-800 rounded-full bg-zinc-900/50 text-white font-medium flex items-center gap-2">
                  <div className="w-2 h-2 bg-titanix-yellow rounded-full animate-pulse"></div>
                  10+ Years Experience
               </div>
               <div className="px-6 py-3 border border-zinc-800 rounded-full bg-zinc-900/50 text-white font-medium">
                  50+ Enterprise Projects
               </div>
            </div>
          </div>

          {/* Values Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-zinc-900/40 border border-zinc-800 p-8 rounded-2xl hover:border-titanix-yellow/50 transition-colors group">
              <div className="w-12 h-12 bg-zinc-800 rounded-lg flex items-center justify-center mb-6 group-hover:bg-titanix-yellow transition-colors duration-300">
                <Target className="w-6 h-6 text-titanix-yellow group-hover:text-black" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Precision</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">
                We write clean, efficient code that performs flawlessly on constrained hardware and scalable clouds alike.
              </p>
            </div>

            <div className="bg-zinc-900/40 border border-zinc-800 p-8 rounded-2xl hover:border-titanix-yellow/50 transition-colors group mt-0 sm:mt-12">
              <div className="w-12 h-12 bg-zinc-800 rounded-lg flex items-center justify-center mb-6 group-hover:bg-titanix-yellow transition-colors duration-300">
                <Shield className="w-6 h-6 text-titanix-yellow group-hover:text-black" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Security</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">
                Security is not an afterthought. We implement military-grade encryption and best practices from day one.
              </p>
            </div>

            <div className="bg-zinc-900/40 border border-zinc-800 p-8 rounded-2xl hover:border-titanix-yellow/50 transition-colors group">
              <div className="w-12 h-12 bg-zinc-800 rounded-lg flex items-center justify-center mb-6 group-hover:bg-titanix-yellow transition-colors duration-300">
                <Zap className="w-6 h-6 text-titanix-yellow group-hover:text-black" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Velocity</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">
                Rapid prototyping meets agile development. We transform concepts into deployed realities faster.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;