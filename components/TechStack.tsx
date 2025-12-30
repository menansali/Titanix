import React from 'react';

const TECH_STACK_ROW_1 = [
  "React", "TypeScript", "Node.js", "Python", "Next.js", "C++", "Rust", "Go", "GraphQL", "PostgreSQL"
];

const TECH_STACK_ROW_2 = [
  "React Native", "Swift", "Kotlin", "MQTT", "Zigbee", "Docker", "Kubernetes", "Arduino", "TensorFlow", "Bluetooth LE"
];

const TechStack: React.FC = () => {
  return (
    <section className="py-12 bg-black border-y border-zinc-900 overflow-hidden relative">
      
      {/* Label */}
      <div className="absolute left-0 top-0 bottom-0 z-10 bg-gradient-to-r from-black via-black/80 to-transparent w-20 md:w-40 flex items-center justify-center">
        <span className="text-titanix-yellow/50 text-xs font-bold uppercase -rotate-90 whitespace-nowrap tracking-widest">
          Core Technologies
        </span>
      </div>
      <div className="absolute right-0 top-0 bottom-0 z-10 bg-gradient-to-l from-black via-black/80 to-transparent w-20 md:w-40"></div>

      <div className="flex flex-col gap-6">
        {/* Row 1: Forward Scroll */}
        <div className="flex whitespace-nowrap overflow-hidden">
          <div className="flex animate-scroll hover:[animation-play-state:paused]">
            {[...TECH_STACK_ROW_1, ...TECH_STACK_ROW_1, ...TECH_STACK_ROW_1].map((tech, i) => (
              <div key={i} className="mx-8 group cursor-default">
                <span className="font-display text-4xl md:text-5xl font-bold text-zinc-800 uppercase transition-colors duration-300 group-hover:text-titanix-yellow group-hover:drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]">
                  {tech}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Reverse Scroll */}
        <div className="flex whitespace-nowrap overflow-hidden">
           <div className="flex animate-scroll-reverse hover:[animation-play-state:paused]">
            {[...TECH_STACK_ROW_2, ...TECH_STACK_ROW_2, ...TECH_STACK_ROW_2].map((tech, i) => (
              <div key={i} className="mx-8 group cursor-default">
                 <span className="font-display text-4xl md:text-5xl font-bold text-zinc-800/50 uppercase transition-colors duration-300 group-hover:text-white group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
                  {tech}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;