import React, { useState } from 'react';
import { ScrollReveal } from './ScrollReveal';
import { Send, CheckCircle, Sparkles } from 'lucide-react';

const Newsletter: React.FC = () => {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            setSubmitted(true);
            setEmail('');
        }
    };

    return (
        <section className="py-24 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-900/50 to-zinc-950" />
            <div className="absolute inset-0 grid-bg opacity-20" />

            {/* Glows */}
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-yellow-500/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[300px] h-[300px] bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <ScrollReveal>
                    <div className="glass-card p-10 md:p-16 text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/30 mb-8">
                            <Sparkles className="w-4 h-4 text-yellow-400" />
                            <span className="text-sm text-yellow-400 font-medium">Stay Updated</span>
                        </div>

                        <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-4">
                            GET <span className="gradient-text">TECH INSIGHTS</span>
                        </h2>

                        <p className="text-zinc-400 text-lg mb-10 max-w-lg mx-auto">
                            Subscribe to our newsletter for the latest in IoT, mobile development, and emerging tech trends.
                        </p>

                        {submitted ? (
                            <div className="flex items-center justify-center gap-3 text-green-400 animate-fade-in-up">
                                <CheckCircle className="w-6 h-6" />
                                <span className="text-lg font-medium">Thanks for subscribing!</span>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    required
                                    className="flex-1 px-5 py-4 rounded-xl bg-zinc-900/80 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/30 transition-all"
                                />
                                <button
                                    type="submit"
                                    className="btn-primary flex items-center justify-center gap-2 whitespace-nowrap"
                                >
                                    Subscribe
                                    <Send className="w-4 h-4" />
                                </button>
                            </form>
                        )}

                        <p className="text-zinc-600 text-xs mt-6">
                            No spam, ever. Unsubscribe anytime.
                        </p>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
};

export default Newsletter;
