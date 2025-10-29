import React, { useEffect } from 'react';

export default function Loader({ onFinish }) {
  useEffect(() => {
    const t = setTimeout(() => onFinish?.(), 1200);
    return () => clearTimeout(t);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-slate-950">
      <div className="flex items-center justify-center relative">
        <svg className="animate-hex-pop hex-glow" width="120" height="120" viewBox="0 0 100 100" aria-hidden>
          <polygon className="animate-stroke-draw" points="50,3 95,25 95,75 50,97 5,75 5,25" fill="none" stroke="#a3b3c6" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"></polygon>
        </svg>
        <span className="absolute text-6xl font-extrabold tracking-tight text-accent animate-fade-in">R</span>
      </div>
    </div>
  );
}
