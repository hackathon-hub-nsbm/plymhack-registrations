"use client";

import { useState, useEffect } from "react";

const Countdown = ({ date }: { date: string }) => {
  const eventDate = new Date(date);

  const calculateTimeLeft = () => {
    const now = new Date();
    return Math.max(0, Math.floor((eventDate.getTime() - now.getTime()) / 1000));
  };

  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  useEffect(() => {
    setTimeLeft(calculateTimeLeft());
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (timeLeft === null) return null;

  const getTimeSegments = (time: number) => {
    const days = Math.floor(time / (24 * 3600));
    const hours = Math.floor((time % (24 * 3600)) / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return { days, hours, minutes, seconds };
  };

  const { days, hours, minutes, seconds } = getTimeSegments(timeLeft);

  const timeArray = [
    { value: days, label: "CYCLES", unit: "D" },
    { value: hours, label: "HOURS", unit: "H" },
    { value: minutes, label: "MINUTES", unit: "M" },
    { value: seconds, label: "SECONDS", unit: "S" },
  ];

  return (
    <div className="relative">
      {/* Section header */}
      <div className="text-center mb-8">
        <div className="inline-block relative">
          <h3 className="text-xl md:text-2xl font-[var(--font-orbitron)] text-purple-300 tracking-widest mb-2">
            TIME UNTIL DEPARTURE
          </h3>
          <div className="absolute -bottom-1 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
        </div>
      </div>

      {/* Countdown grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
        {timeArray.map((t, index) => (
          <div
            key={index}
            className="relative glass-effect rounded-xl p-6 mysterious-border
                       transform transition-all duration-500 hover:scale-105
                       exploration-shadow group"
          >
            {/* Mysterious corner accents */}
            <div className="absolute top-2 left-2 w-3 h-3 border-l-2 border-t-2 border-purple-500/50 group-hover:border-purple-400 transition-colors" />
            <div className="absolute top-2 right-2 w-3 h-3 border-r-2 border-t-2 border-purple-500/50 group-hover:border-purple-400 transition-colors" />
            <div className="absolute bottom-2 left-2 w-3 h-3 border-l-2 border-b-2 border-purple-500/50 group-hover:border-purple-400 transition-colors" />
            <div className="absolute bottom-2 right-2 w-3 h-3 border-r-2 border-b-2 border-purple-500/50 group-hover:border-purple-400 transition-colors" />

            {/* Value */}
            <div className="text-center mb-2">
              <div className="text-4xl md:text-5xl font-bold font-[var(--font-orbitron)] 
                            text-transparent bg-clip-text bg-gradient-to-br from-purple-300 via-cyan-300 to-purple-300
                            mystery-text-glow">
                {String(t.value).padStart(2, "0")}
              </div>
              <div className="text-xs font-[var(--font-space-mono)] text-purple-400/60 mt-1 tracking-widest">
                {t.unit}
              </div>
            </div>

            {/* Label */}
            <div className="text-center">
              <span className="text-xs font-[var(--font-space-mono)] text-gray-400 tracking-widest uppercase">
                {t.label}
              </span>
            </div>

            {/* Animated pulse on value change */}
            <div className="absolute inset-0 rounded-xl bg-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        ))}
      </div>

      {/* Mysterious subtitle */}
      <div className="text-center mt-8">
        <p className="text-xs font-[var(--font-space-mono)] text-gray-500 tracking-widest">
          &gt;&gt; THE PORTAL OPENS SOON &lt;&lt;
        </p>
      </div>
    </div>
  );
};

export default Countdown;
