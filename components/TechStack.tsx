import React from 'react';

const TECH_STACK_ROW_1 = [
  "React", "TypeScript", "Node.js", "Python", "Next.js", "C++", "Rust", "Go", "GraphQL", "PostgreSQL"
];

const TECH_STACK_ROW_2 = [
  "React Native", "Swift", "Kotlin", "MQTT", "Zigbee", "Docker", "Kubernetes", "Arduino", "TensorFlow", "Bluetooth LE"
];

const TechStack: React.FC = () => {
  return (
    <section className="py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-900/50 to-zinc-950" />
      <div className="absolute inset-0 grid-bg opacity-30" />

      <div className="absolute left-0 top-0 bottom-0 z-10 w-32 md:w-60 bg-gradient-to-r from-zinc-950 via-zinc-950/80 to-transparent flex items-center justify-center">
        <span className="text-yellow-500/40 text-xs font-bold uppercase -rotate-90 whitespace-nowrap tracking-[0.3em]">
          Core Technologies
        </span>
      </div>
      <div className="absolute right-0 top-0 bottom-0 z-10 w-32 md:w-60 bg-gradient-to-l from-zinc-950 via-zinc-950/80 to-transparent" />

      <div className="flex flex-col gap-8 relative">
        <div className="flex whitespace-nowrap overflow-hidden">
          <div className="flex animate-scroll hover:[animation-play-state:paused]">
            {[...TECH_STACK_ROW_1, ...TECH_STACK_ROW_1, ...TECH_STACK_ROW_1].map((tech, i) => (
              <div key={i} className="mx-6 md:mx-10 group cursor-default">
                <span className="font-display text-4xl md:text-6xl font-bold text-zinc-800 uppercase transition-all duration-500 group-hover:text-yellow-400 group-hover:drop-shadow-[0_0_20px_rgba(250,204,21,0.5)]">
                  {tech}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex whitespace-nowrap overflow-hidden">
          <div className="flex animate-scroll-reverse hover:[animation-play-state:paused]">
            {[...TECH_STACK_ROW_2, ...TECH_STACK_ROW_2, ...TECH_STACK_ROW_2].map((tech, i) => (
              <div key={i} className="mx-6 md:mx-10 group cursor-default">
                <span className="font-display text-4xl md:text-6xl font-bold text-zinc-700/40 uppercase transition-all duration-500 group-hover:text-amber-400 group-hover:drop-shadow-[0_0_20px_rgba(245,158,11,0.5)]">
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