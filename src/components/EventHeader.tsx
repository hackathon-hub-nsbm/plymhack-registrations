"use client";

import { useState, useEffect } from "react";

const EventHeader = () => {
  const [glitchActive, setGlitchActive] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 200);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center relative">
      {/* Mysterious glow background */}
      <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-purple-600/20 via-cyan-600/20 to-purple-600/20 animate-pulse-glow" />

      <div className="relative z-10">
        {/* Main title with glitch effect */}
        <h1
          className={`text-5xl md:text-7xl lg:text-8xl font-bold font-[var(--font-orbitron)] 
                     tracking-wider mb-4 mystery-text-glow
                     ${glitchActive ? 'animate-glitch' : ''}`}
        >
          <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
            PLYMHACK
          </span>
        </h1>

        {/* Year with exploration theme */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-purple-500" />
          <span className="text-3xl md:text-4xl font-[var(--font-orbitron)] text-purple-300 tracking-[0.3em]">
            2026
          </span>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-purple-500" />
        </div>

        {/* Mysterious tagline */}
        <div className="space-y-2 max-w-2xl mx-auto">
          <p className="text-sm md:text-base font-[var(--font-space-mono)] text-gray-400 tracking-widest uppercase">
            &gt;&gt; A Journey Into The Unknown
          </p>
          <p className="text-xs md:text-sm font-[var(--font-space-mono)] text-gray-500 tracking-wider">
            24 hours • Infinite possibilities • Discover what lies beyond
          </p>
        </div>

        {/* Mysterious symbols */}
        <div className="mt-8 flex justify-center gap-8 text-purple-500/30 text-2xl font-[var(--font-orbitron)]">
          <span className="animate-float">◆</span>
          <span className="animate-float" style={{ animationDelay: '1s' }}>◇</span>
          <span className="animate-float" style={{ animationDelay: '2s' }}>◆</span>
        </div>
      </div>
    </div>
  );
};

export default EventHeader;


