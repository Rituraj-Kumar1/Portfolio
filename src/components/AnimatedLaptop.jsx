import React from 'react';
import { Typewriter, Cursor } from 'react-simple-typewriter';

export default function AnimatedLaptop() {
  return (
    // Outer container - NOW WITH FIXED WIDTH AND HEIGHT
    <div className="relative w-[400px] h-[300px]"> 
      {/* Subtle glow effect */}
      <div className="absolute -inset-2 rounded-xl bg-accent opacity-20 blur-2xl filter transition duration-1000 hover:opacity-30"></div>
      
      {/* Laptop Frame */}
      <div className="relative w-full h-full p-2 bg-slate-900/80 backdrop-blur-sm border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Screen Bezel */}
        <div className="w-full h-full bg-slate-950 rounded-lg overflow-hidden">
          
          {/* Screen Content */}
          <div className="relative p-4 h-full">
            {/* Header bar */}
            <div className="flex items-center gap-1.5 mb-3">
              <span className="w-3 h-3 rounded-full bg-red-500"></span>
              <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
              <span className="w-3 h-3 rounded-full bg-green-500"></span>
            </div>

            {/* Terminal / Code Content - UPDATED CLASSES HERE 👇 */}
            {/* Changed text-base to text-lg, added font-bold */}
            <div className="font-mono text-lg font-bold text-emerald-400 min-h-[7em] overflow-hidden">
              <span className="text-emerald-400 whitespace-nowrap"> 
                <Typewriter
                  words={[
                    "Hey there! I'm Rituraj 👋",
                    'Crafting Web Experiences | MERN Stack 💻',
                    "Loved my work? Let's connect! 💬",
                    "Let's build something great together 🚀",
                  ]}
                  loop={0} // 0 means loop infinitely
                  cursor
                  cursorStyle="_"
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={1500}
                />
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Laptop Base */}
      <div className="relative w-[110%] -left-[5%] h-4 mt-1 bg-slate-800/90 rounded-b-lg border-x border-b border-slate-700/80">
        {/* Notch for opening */}
        <div className="absolute top-1 left-1/2 -translate-x-1/2 w-16 h-1 rounded-b-md bg-slate-700"></div>
      </div>
    </div>
  );
}