import React, { useState } from 'react';
import { analyzeProjectIdea } from '../services/geminiService';
import { AIAnalysisResponse } from '../types';
import { Terminal, Send, Loader2, CheckCircle2, Clock, Layers, Mail, MessageCircle, Instagram } from 'lucide-react';

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
    <section id="consultant" className="py-24 bg-zinc-900/50 scroll-mt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Left Column: Static Content */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-titanix-yellow/10 rounded-lg">
                <Terminal className="text-titanix-yellow w-8 h-8" />
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
                AI SOLUTION <span className="text-titanix-yellow">ARCHITECT</span>
              </h2>
            </div>
            
            <p className="text-titanix-muted text-lg mb-8 leading-relaxed">
              Not sure where to start? Tell our AI consultant about your idea. 
              It will analyze your requirements and generate a preliminary technical roadmap, stack recommendation, and complexity estimate instantly.
            </p>

            <div className="bg-titanix-card border border-zinc-800 p-6 rounded-xl mb-8">
              <h4 className="text-white font-bold mb-4">Perfect for:</h4>
              <ul className="space-y-3">
                {["Validating App Ideas", "IoT System Architecture", "Estimating Dev Timelines", "Tech Stack Selection"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-zinc-400">
                    <CheckCircle2 className="w-5 h-5 text-titanix-yellow" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Direct Contact Info */}
            <div>
              <h4 className="text-white font-bold mb-4">Direct Channels</h4>
              <div className="space-y-4">
                <a href="mailto:contact@titanix.dev" className="flex items-center gap-4 p-4 rounded-lg bg-zinc-900/50 border border-zinc-800 hover:border-titanix-yellow/50 hover:bg-zinc-800/50 transition-all group">
                  <div className="w-10 h-10 bg-zinc-800 rounded-lg flex items-center justify-center group-hover:bg-titanix-yellow transition-colors">
                    <Mail className="w-5 h-5 text-zinc-400 group-hover:text-black" />
                  </div>
                  <div>
                    <span className="block text-xs text-zinc-500 uppercase tracking-wider font-semibold">Email Us</span>
                    <span className="text-white group-hover:text-titanix-yellow transition-colors">contact@titanix.dev</span>
                  </div>
                </a>
                
                <a href="https://wa.me/37253951655" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-lg bg-zinc-900/50 border border-zinc-800 hover:border-titanix-yellow/50 hover:bg-zinc-800/50 transition-all group">
                  <div className="w-10 h-10 bg-zinc-800 rounded-lg flex items-center justify-center group-hover:bg-titanix-yellow transition-colors">
                    <MessageCircle className="w-5 h-5 text-zinc-400 group-hover:text-black" />
                  </div>
                  <div>
                    <span className="block text-xs text-zinc-500 uppercase tracking-wider font-semibold">WhatsApp</span>
                    <span className="text-white group-hover:text-titanix-yellow transition-colors">+372 5395 1655</span>
                  </div>
                </a>

                <a href="https://instagram.com/titanixdev" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-lg bg-zinc-900/50 border border-zinc-800 hover:border-titanix-yellow/50 hover:bg-zinc-800/50 transition-all group">
                  <div className="w-10 h-10 bg-zinc-800 rounded-lg flex items-center justify-center group-hover:bg-titanix-yellow transition-colors">
                    <Instagram className="w-5 h-5 text-zinc-400 group-hover:text-black" />
                  </div>
                  <div>
                    <span className="block text-xs text-zinc-500 uppercase tracking-wider font-semibold">Instagram</span>
                    <span className="text-white group-hover:text-titanix-yellow transition-colors">@titanixdev</span>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Terminal */}
          <div className="bg-[#0c0c0e] border border-zinc-800 rounded-xl overflow-hidden shadow-2xl flex flex-col h-full min-h-[600px]">
            {/* Terminal Header */}
            <div className="bg-zinc-800/50 px-4 py-3 flex items-center gap-2 border-b border-zinc-800">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <span className="ml-4 text-xs font-mono text-zinc-500">titanix-ai-core --v2.5</span>
            </div>

            {/* Terminal Body */}
            <div className="flex-1 p-6 font-mono text-sm overflow-y-auto custom-scrollbar">
              <div className="text-zinc-500 mb-4">
                &gt; System initialized...<br />
                &gt; Waiting for project parameters...
              </div>

              {!analysis && !loading && (
                <div className="text-titanix-yellow mb-4">
                  &gt; Please describe your project idea below. Example: "I need an IoT dashboard for monitoring solar panels with a mobile app for alerts."
                </div>
              )}

              {loading && (
                <div className="flex items-center gap-2 text-titanix-yellow animate-pulse">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Analyzing requirements... Accessing tech knowledge base...
                </div>
              )}

              {analysis && (
                <div className="space-y-6 animate-fade-in">
                   <div className="border-l-2 border-titanix-yellow pl-4">
                      <span className="text-zinc-500 block text-xs uppercase tracking-wider mb-1">Project Summary</span>
                      <p className="text-white">{analysis.summary}</p>
                   </div>

                   <div className="grid grid-cols-2 gap-4">
                      <div className="bg-zinc-900 p-3 rounded border border-zinc-800">
                        <div className="flex items-center gap-2 text-titanix-yellow mb-2">
                          <Layers className="w-4 h-4" />
                          <span>Complexity</span>
                        </div>
                        <span className="text-white font-bold">{analysis.complexity}</span>
                      </div>
                      <div className="bg-zinc-900 p-3 rounded border border-zinc-800">
                         <div className="flex items-center gap-2 text-titanix-yellow mb-2">
                          <Clock className="w-4 h-4" />
                          <span>Timeline</span>
                        </div>
                        <span className="text-white font-bold">{analysis.estimatedTimeline}</span>
                      </div>
                   </div>

                   <div>
                      <span className="text-zinc-500 block text-xs uppercase tracking-wider mb-2">Recommended Stack</span>
                      <div className="flex flex-wrap gap-2">
                        {analysis.techStack.map((tech, idx) => (
                          <span key={idx} className="bg-zinc-800 text-zinc-300 px-2 py-1 rounded text-xs border border-zinc-700">
                            {tech}
                          </span>
                        ))}
                      </div>
                   </div>

                   <div className="mt-6 pt-4 border-t border-zinc-800">
                      <p className="text-zinc-400 mb-4">Want to build this? Let's talk.</p>
                      <a 
                        href={`mailto:contact@titanix.dev?subject=Project Inquiry&body=Hi Titanix Team,%0A%0AI have a project idea:%0A${encodeURIComponent(analysis.summary)}`}
                        className="block text-center bg-titanix-yellow text-black w-full py-2 font-bold hover:bg-yellow-400 transition-colors rounded"
                      >
                        Book Free Consultation
                      </a>
                   </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-zinc-800 bg-zinc-900/50">
              <form onSubmit={handleSubmit} className="relative">
                <input
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe your idea here..."
                  className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-titanix-yellow focus:ring-1 focus:ring-titanix-yellow pr-12 font-mono"
                />
                <button 
                  type="submit"
                  disabled={loading || !prompt}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-titanix-yellow hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SmartConsultant;