'use client';

import React, { useState } from 'react';

interface ZodiacSign {
  name: string;
  icon: string;
  isUnlocked: boolean;
  count: number;
}

// Style constants
const CIRCLE_SIZE = 800;
const SECTION_SIZE = 30; // degrees

const zodiacSymbols: Record<string, string> = {
  'aries': '♈', 'taurus': '♉', 'gemini': '♊', 'cancer': '♋',
  'leo': '♌', 'virgo': '♍', 'libra': '♎', 'scorpio': '♏',
  'sagittarius': '♐', 'capricorn': '♑', 'aquarius': '♒', 'pisces': '♓'
};

const zodiacSigns: ZodiacSign[] = [
  { name: 'Bélier', icon: 'aries', isUnlocked: false, count: 0 },
  { name: 'Taureau', icon: 'taurus', isUnlocked: true, count: 0 },
  { name: 'Gémeaux', icon: 'gemini', isUnlocked: true, count: 0 },
  { name: 'Cancer', icon: 'cancer', isUnlocked: false, count: 0 },
  { name: 'Lion', icon: 'leo', isUnlocked: true, count: 0 },
  { name: 'Vierge', icon: 'virgo', isUnlocked: false, count: 0 },
  { name: 'Balance', icon: 'libra', isUnlocked: true, count: 0 },
  { name: 'Scorpion', icon: 'scorpio', isUnlocked: true, count: 0 },
  { name: 'Sagittaire', icon: 'sagittarius', isUnlocked: false, count: 0 },
  { name: 'Capricorne', icon: 'capricorn', isUnlocked: false, count: 0 },
  { name: 'Verseau', icon: 'aquarius', isUnlocked: true, count: 2 },
  { name: 'Poissons', icon: 'pisces', isUnlocked: false, count: 0 },
];

const DetailPanel: React.FC<{ sign: ZodiacSign }> = ({ sign }) => (
  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px]
    bg-slate-800/90 backdrop-blur-sm p-6 rounded-[30px] border border-slate-600/50
    transform transition-all duration-300 scale-110 z-50 overflow-hidden">
    <div className="flex items-center gap-4 mb-4">
      <div className="w-16 h-16 flex items-center justify-center rounded-full bg-slate-700/50">
        <span className={`text-4xl ${sign.isUnlocked ? 'text-amber-400' : 'text-slate-600'}`}>
          {zodiacSymbols[sign.icon]}
        </span>
      </div>
      <div>
        <h2 className="text-2xl font-semibold text-amber-200">{sign.name}</h2>
        <p className="text-slate-400 text-sm">
          {sign.isUnlocked ? '✧ Débloqué ✧' : '⊗ Non débloqué ⊗'}
        </p>
      </div>
    </div>
    {sign.count > 0 && (
      <div className="mt-4 py-2 px-3 bg-amber-400/10 rounded-lg">
        <p className="text-amber-300 text-sm font-medium">
          Nombre d'occurrences : ×{sign.count}
        </p>
      </div>
    )}
  </div>
);

const ZodiacWheel = () => {
  const [selectedSign, setSelectedSign] = useState<ZodiacSign | null>(null);
  const [hoveredSign, setHoveredSign] = useState<ZodiacSign | null>(null);

  // Définition de l'animation pulse lente
  const pulseKeyframes = `@keyframes pulse-slow {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }`;

  return (
    <div className="min-h-screen w-full bg-slate-900 flex flex-col items-center justify-center p-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-amber-200 mb-4 drop-shadow-[0_0_30px_rgba(251,191,36,0.3)]">
          Roue du Zodiaque
        </h1>
        <div className="h-px max-w-xl mx-auto bg-gradient-to-r from-transparent via-amber-500/30 to-transparent mb-4"/>
        <p className="text-slate-400 italic">
          Dernière actualisation : 9 août 2025
        </p>
      </div>

      <div className="relative" style={{ width: CIRCLE_SIZE, height: CIRCLE_SIZE }}>
        {/* Background circle for zodiac signs */}
        <div className="absolute inset-0 rounded-full border border-amber-500/5
          before:absolute before:inset-[20px] before:rounded-full before:border before:border-amber-500/5
          after:absolute after:inset-[40px] after:rounded-full after:border after:border-amber-500/5"/>
        
        {/* Base circle */}
        <div className="absolute inset-0 rounded-full border border-amber-500/10
          bg-slate-900/95 backdrop-blur-xl">
          
          {/* Inner decorative circles */}
          <div className="absolute inset-[30px] rounded-full border border-amber-500/10"/>
          <div className="absolute inset-[60px] rounded-full border border-amber-500/10"/>

          {/* Aura effects */}
          <div className="absolute inset-0 opacity-50 pointer-events-none"
            style={{
              background: 'radial-gradient(circle at center, rgba(251,191,36,0.1) 30%, transparent 70%)',
              filter: 'blur(40px)'
            }}
          />

          {/* Zodiac signs */}
          {zodiacSigns.map((sign, index) => {
            const angleRad = (index * SECTION_SIZE * Math.PI) / 180;
            const radius = CIRCLE_SIZE * 0.35;
            const x = CIRCLE_SIZE / 2 + radius * Math.cos(angleRad - Math.PI / 2);
            const y = CIRCLE_SIZE / 2 + radius * Math.sin(angleRad - Math.PI / 2);

            return (
              <div
                key={sign.name}
                onClick={() => setSelectedSign(sign)}
                onMouseEnter={() => setHoveredSign(sign)}
                onMouseLeave={() => setHoveredSign(null)}
                className="absolute transform group hover:z-10 cursor-pointer"
                style={{ 
                  left: `${x}px`,
                  top: `${y}px`,
                  transform: `translate(-50%, -50%)`,
                  transformOrigin: 'center',
                  width: '120px',
                  height: '120px'
                }}
              >
                <div className={`
                  relative flex flex-col items-center justify-center w-full h-full
                  transition-all duration-500 group-hover:scale-110
                  ${sign.isUnlocked ? 'text-amber-300' : 'text-slate-400'}
                  ${sign.isUnlocked ? `
                    bg-gradient-to-b from-amber-500/10 to-transparent
                    shadow-[0_0_30px_rgba(251,191,36,0.3)]
                    backdrop-blur-sm
                  ` : ''}
                `}>
                  <div className={`
                    flex flex-col items-center
                    ${([3,4,5,6,7,8].includes(index)) ? 'rotate-180' : ''}
                  `}>
                    <span className={`
                      relative text-6xl mb-2
                      transition-all duration-500
                      ${sign.isUnlocked 
                        ? 'drop-shadow-[0_0_50px_rgba(251,191,36,0.8)] group-hover:drop-shadow-[0_0_70px_rgba(251,191,36,1)] scale-110' 
                        : 'group-hover:text-slate-200 group-hover:drop-shadow-[0_0_20px_rgba(226,232,240,0.3)]'
                      }`}
                    >
                      {zodiacSymbols[sign.icon]}
                    </span>
                    <span className={`
                      text-sm font-bold tracking-wider whitespace-nowrap
                      transition-all duration-500
                      ${sign.isUnlocked 
                        ? 'text-amber-200 group-hover:text-amber-100 drop-shadow-[0_0_10px_rgba(251,191,36,0.5)]' 
                        : 'group-hover:text-slate-200'
                      }
                    `}>
                      {sign.name}
                    </span>
                  </div>
                  {sign.count > 0 && (
                    <span className="absolute -top-2 -right-2
                      min-w-[24px] h-6 px-2
                      flex items-center justify-center
                      text-xs font-medium rounded-full 
                      bg-amber-500/20 text-amber-200
                      border border-amber-500/30
                      shadow-[0_0_15px_rgba(251,191,36,0.2)]
                      animate-pulse-slow">
                      ×{sign.count}
                    </span>
                  )}
                </div>
              </div>
            );
          })}

          {/* Center piece */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 
            w-40 h-40 rounded-full bg-slate-900/90 border border-amber-500/30
            overflow-hidden">
            <div className="absolute inset-0"
              style={{
                background: 'radial-gradient(circle at center, rgba(251,191,36,0.1) 0%, transparent 70%)',
                filter: 'blur(8px)'
              }}
            />
          </div>

          {/* Details panel */}
          {selectedSign && <DetailPanel sign={selectedSign} />}
        </div>
      </div>
    </div>
  );
}

export default ZodiacWheel as React.FC;
