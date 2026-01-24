import React, { useState, useEffect } from 'react';
import { Zap } from 'lucide-react';

const LoadingScreen: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setFadeOut(true);
            setTimeout(() => setIsLoading(false), 500);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    if (!isLoading) return null;

    return (
        <div className={`fixed inset-0 z-[100] bg-zinc-950 flex items-center justify-center transition-opacity duration-500 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
            <div className="relative flex flex-col items-center gap-6">
                {/* Logo */}
                <div className="relative">
                    <div className="w-20 h-20 rounded-2xl bg-yellow-400 flex items-center justify-center animate-pulse">
                        <Zap className="text-black w-10 h-10" />
                    </div>
                    <div className="absolute inset-0 w-20 h-20 rounded-2xl bg-yellow-400 blur-2xl opacity-50 animate-pulse" />
                </div>

                {/* Brand Name */}
                <div className="font-display font-bold text-2xl tracking-tight">
                    <span className="text-white">TITANIX</span>
                    <span className="text-yellow-400">.DEV</span>
                </div>

                {/* Loading Bar */}
                <div className="w-48 h-1 bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full animate-loading-bar" />
                </div>
            </div>
        </div>
    );
};

export default LoadingScreen;
