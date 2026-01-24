import React, { useState } from 'react';
import { analyzeProjectIdea } from '../services/geminiService';
import { AIAnalysisResponse } from '../types';
import { Terminal, Send, Loader2, CheckCircle2, Clock, Layers, Mail, Phone, MessageCircle, Instagram, Sparkles, Brain } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

const SmartConsultant: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<AIAnalysisResponse | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setAnalysis(null);
    try {
      const result = await analyzeProjectIdea(prompt);
      setAnalysis(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="consultant" className="py-32 relative scroll-mt-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-900/50 to-zinc-950" />
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-yellow-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-0 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          <div>
            <ScrollReveal>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-2xl bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center">
                  <Brain className="text-yellow-400 w-7 h-7" />
                </div>
                <div>
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
                    AI SOLUTION <span className="gradient-text">ARCHITECT</span>
                  </h2>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <p className="text-zinc-400 text-lg mb-10 leading-relaxed">
                Not sure where to start? Tell our AI consultant about your idea.
                It will analyze your requirements and generate a preliminary technical roadmap, stack recommendation, and complexity estimate instantly.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="glass-card p-8 mb-10">
                <h4 className="text-white font-bold mb-6 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-yellow-400" />
                  Perfect for:
                </h4>
                <ul className="space-y-4">
                  {["Validating App Ideas", "IoT System Architecture", "Estimating Dev Timelines", "Tech Stack Selection"].map((item, i) => (
                    <li key={i} className="flex items-center gap-4 text-zinc-300">
                      <div className="w-6 h-6 rounded-full bg-yellow-500/20 border border-yellow-500/40 flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="w-3.5 h-3.5 text-yellow-400" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <div>
                <h4 className="text-white font-bold mb-6">Direct Channels</h4>
                <div className="space-y-3">
                  {[
                    { href: "mailto:contact@titanix.dev", icon: Mail, label: "Email Us", value: "contact@titanix.dev" },
                    { href: "tel:+37253951655", icon: Phone, label: "Call Us", value: "+372 5395 1655" },
                    { href: "https://wa.me/37253951655", icon: MessageCircle, label: "WhatsApp", value: "+372 5395 1655", external: true },
                    { href: "https://instagram.com/titanixdev", icon: Instagram, label: "Instagram", value: "@titanixdev", external: true },
                  ].map((contact, i) => (
                    <a
                      key={i}
                      href={contact.href}
                      target={contact.external ? "_blank" : undefined}
                      rel={contact.external ? "noopener noreferrer" : undefined}
                      className="flex items-center gap-4 p-4 rounded-xl glass-card group hover:border-yellow-500/40 transition-all duration-300"
                    >
                      <div className="w-11 h-11 rounded-xl bg-yellow-500/10 border border-zinc-700/50 flex items-center justify-center group-hover:border-yellow-500/50 transition-colors">
                        <contact.icon className="w-5 h-5 text-zinc-400 group-hover:text-yellow-400 transition-colors" />
                      </div>
                      <div>
                        <span className="block text-xs text-zinc-500 uppercase tracking-wider font-semibold">{contact.label}</span>
                        <span className="text-white group-hover:text-yellow-400 transition-colors">{contact.value}</span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={150}>
            <div className="glass-card overflow-hidden flex flex-col h-full min-h-[650px]">
              <div className="px-5 py-4 flex items-center gap-3 border-b border-zinc-800/50 bg-zinc-900/50">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <span className="ml-3 text-xs font-mono text-zinc-500">titanix-ai-core --v2.5</span>
                <div className="ml-auto flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
                  <span className="text-xs text-yellow-400">Live</span>
                </div>
              </div>

              <div className="flex-1 p-6 font-mono text-sm overflow-y-auto custom-scrollbar bg-zinc-950/50">
                <div className="text-zinc-600 mb-4">
                  <span className="text-yellow-500">$</span> System initialized...<br />
                  <span className="text-yellow-500">$</span> Waiting for project parameters...
                </div>

                {!analysis && !loading && (
                  <div className="text-yellow-400/80 mb-4 flex items-start gap-2">
                    <span className="text-amber-400">→</span>
                    <span>Please describe your project idea below. Example: "I need an IoT dashboard for monitoring solar panels with a mobile app for alerts."</span>
                  </div>
                )}

                {loading && (
                  <div className="flex items-center gap-3 text-yellow-400">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="animate-pulse">Analyzing requirements... Accessing tech knowledge base...</span>
                  </div>
                )}

                {analysis && (
                  <div className="space-y-6 animate-fade-in-up">
                    <div className="border-l-2 border-yellow-500 pl-4">
                      <span className="text-zinc-500 block text-xs uppercase tracking-wider mb-1">Project Summary</span>
                      <p className="text-zinc-200">{analysis.summary}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="glass-card p-4">
                        <div className="flex items-center gap-2 text-yellow-400 mb-2 text-xs">
                          <Layers className="w-4 h-4" />
                          <span>Complexity</span>
                        </div>
                        <span className="text-white font-bold text-lg">{analysis.complexity}</span>
                      </div>
                      <div className="glass-card p-4">
                        <div className="flex items-center gap-2 text-amber-400 mb-2 text-xs">
                          <Clock className="w-4 h-4" />
                          <span>Timeline</span>
                        </div>
                        <span className="text-white font-bold text-lg">{analysis.estimatedTimeline}</span>
                      </div>
                    </div>

                    <div>
                      <span className="text-zinc-500 block text-xs uppercase tracking-wider mb-3">Recommended Stack</span>
                      <div className="flex flex-wrap gap-2">
                        {analysis.techStack.map((tech, idx) => (
                          <span key={idx} className="tech-tag">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-zinc-800/50">
                      <p className="text-zinc-400 mb-4">Want to build this? Let's talk.</p>
                      <a
                        href={`mailto:contact@titanix.dev?subject=Project Inquiry&body=Hi Titanix Team,%0A%0AI have a project idea:%0A${encodeURIComponent(analysis.summary)}`}
                        className="block text-center btn-primary rounded-xl py-3"
                      >
                        Book Free Consultation
                      </a>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-4 border-t border-zinc-800/50 bg-zinc-900/50">
                <form onSubmit={handleSubmit} className="relative">
                  <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe your idea here..."
                    className="w-full bg-zinc-950/80 border border-zinc-800/50 rounded-xl px-5 py-4 text-white placeholder-zinc-600 focus:outline-none focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/30 pr-14 font-mono transition-all"
                  />
                  <button
                    type="submit"
                    disabled={loading || !prompt}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-lg bg-yellow-400 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:bg-yellow-300 hover:shadow-glow"
                  >
                    <Send className="w-4 h-4 text-black" />
                  </button>
                </form>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default SmartConsultant;