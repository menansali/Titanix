import React from 'react';
import { ScrollReveal } from './ScrollReveal';

const CLIENTS = [
    { name: 'Google', logo: 'Google' },
    { name: 'Microsoft', logo: 'Microsoft' },
    { name: 'Amazon', logo: 'Amazon' },
    { name: 'Apple', logo: 'Apple' },
    { name: 'Meta', logo: 'Meta' },
    { name: 'Tesla', logo: 'Tesla' },
];

const ClientLogos: React.FC = () => {
    return (
        <section className="py-20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-900/30 to-zinc-950" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <ScrollReveal>
                    <div className="text-center mb-12">
                        <span className="text-xs uppercase tracking-[0.3em] text-zinc-500 font-semibold">
                            Trusted by industry leaders
                        </span>
                    </div>
                </ScrollReveal>

                <ScrollReveal delay={100}>
                    <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 lg:gap-16">
                        {CLIENTS.map((client, i) => (
                            <div
                                key={i}
                                className="group px-6 py-4 opacity-40 hover:opacity-100 transition-all duration-300"
                            >
                                <span className="font-display font-bold text-xl md:text-2xl text-zinc-400 group-hover:text-yellow-400 transition-colors tracking-tight">
                                    {client.logo}
                                </span>
                            </div>
                        ))}
                    </div>
                </ScrollReveal>

                <ScrollReveal delay={200}>
                    <div className="mt-16 text-center">
                        <div className="inline-flex items-center gap-8 text-zinc-500 text-sm">
                            <div className="flex items-center gap-2">
                                <span className="text-2xl font-bold text-yellow-400">50+</span>
                                <span>Projects Delivered</span>
                            </div>
                            <div className="w-px h-6 bg-zinc-800" />
                            <div className="flex items-center gap-2">
                                <span className="text-2xl font-bold text-yellow-400">99%</span>
                                <span>Client Satisfaction</span>
                            </div>
                            <div className="w-px h-6 bg-zinc-800 hidden sm:block" />
                            <div className="hidden sm:flex items-center gap-2">
                                <span className="text-2xl font-bold text-yellow-400">24/7</span>
                                <span>Support</span>
                            </div>
                        </div>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
};

export default ClientLogos;
