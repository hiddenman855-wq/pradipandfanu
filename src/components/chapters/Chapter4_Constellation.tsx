import React, { useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { romanticAudio } from '../../utils/audio';

interface Chapter4ConstellationProps {
  girlName: string;
  boyName: string;
  onUnlockNext: () => void;
  onGoToNext: () => void;
  onGoToPrev?: () => void;
  isUnlockedNext: boolean;
}

interface StarNode {
  id: number;
  label: string;
  sub: string;
  x: number;
  y: number;
}

export const Chapter4_Constellation: React.FC<Chapter4ConstellationProps> = ({
  girlName,
  boyName,
  onUnlockNext,
  onGoToNext,
  onGoToPrev,
  isUnlockedNext,
}) => {
  const [connectedStars, setConnectedStars] = useState<number[]>([]);
  const [activeStar, setActiveStar] = useState<StarNode | null>(null);

  const starNodes: StarNode[] = [
    { id: 1, label: `${boyName} ও ${girlName}`, sub: 'প্রথম চোখাচোখির পবিত্র মুহূর্ত', x: 22, y: 35 },
    { id: 2, label: 'গোপন আলাপন', sub: 'রাতজাগা কথার মিষ্টি স্মৃতি', x: 50, y: 18 },
    { id: 3, label: 'একসাথে হাসি', sub: 'সব বিষাদ ভুলে যাওয়ার আনন্দ', x: 78, y: 35 },
    { id: 4, label: 'বিশ্বাসের আশ্রয়', sub: 'যেকোনো বিপদে হাতটি ধরে রাখা', x: 65, y: 72 },
    { id: 5, label: 'চিরদিনের স্বপ্ন', sub: 'একসঙ্গে শেষ নিঃশ্বাস পর্যন্ত পথচলা', x: 35, y: 72 },
  ];

  const handleStarClick = (star: StarNode) => {
    romanticAudio.playChime(1.0 + star.id * 0.15);
    setActiveStar(star);

    if (!connectedStars.includes(star.id)) {
      const next = [...connectedStars, star.id];
      setConnectedStars(next);
      if (next.length >= 4 && !isUnlockedNext) {
        romanticAudio.playBloom();
        onUnlockNext();
      }
    }
  };

  const isCompleted = connectedStars.length === starNodes.length;

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 py-8 sm:py-12 max-w-5xl mx-auto w-full">
      {/* Chapter Editorial Header */}
      <div className="text-center mb-6 sm:mb-8 space-y-3">
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-rose-300 font-medium">
          <span>নক্ষত্রমণ্ডল</span>
          <span>·</span>
          <span>তারার আলোয় তুমি</span>
        </div>
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif-bn font-extrabold text-rose-100 tracking-tight leading-tight">
          আমাদের নক্ষত্রমণ্ডল
        </h2>
        <p className="text-sm sm:text-lg text-rose-200/90 max-w-xl mx-auto font-light leading-relaxed">
          {girlName}, আকাশের প্রতিটি উজ্জ্বল নক্ষত্রে যেন খোদাই করা আছে {boyName} ও {girlName}-এর না বলা ভালোবাসার গল্প।
        </p>
      </div>

      {/* Interactive Constellation Canvas Frame */}
      <div className="relative w-full max-w-xl aspect-square sm:aspect-[4/3] rounded-[2.5rem] bg-gradient-to-b from-purple-950/50 via-stone-900/80 to-rose-950/50 border-2 border-rose-500/30 backdrop-blur-2xl p-6 sm:p-8 mb-6 overflow-hidden flex items-center justify-center shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(244,114,182,0.2),transparent_70%)] pointer-events-none" />

        <svg viewBox="0 0 100 100" className="w-full h-full relative z-10 overflow-visible">
          {connectedStars.length > 1 && (
            <polyline
              points={connectedStars
                .map((id) => {
                  const s = starNodes.find((n) => n.id === id);
                  return s ? `${s.x},${s.y}` : '';
                })
                .join(' ')}
              fill="none"
              stroke="rgba(251, 207, 232, 0.85)"
              strokeWidth="1.2"
              strokeDasharray="2 1"
              className="animate-pulse"
            />
          )}

          {isCompleted && (
            <line
              x1={starNodes[4].x}
              y1={starNodes[4].y}
              x2={starNodes[0].x}
              y2={starNodes[0].y}
              stroke="rgba(244, 63, 94, 0.9)"
              strokeWidth="1.6"
              className="animate-pulse"
            />
          )}

          {starNodes.map((star) => {
            const isConnected = connectedStars.includes(star.id);
            const isSelected = activeStar?.id === star.id;

            return (
              <g
                key={star.id}
                onClick={() => handleStarClick(star)}
                className="cursor-pointer group"
                transform={`translate(${star.x}, ${star.y})`}
              >
                <circle
                  r={isSelected ? '6' : isConnected ? '5' : '3.5'}
                  fill={isConnected ? 'rgba(244, 114, 182, 0.35)' : 'rgba(255, 255, 255, 0.15)'}
                  className="transition-all duration-300 group-hover:scale-150"
                />

                <circle
                  r={isSelected ? '2.5' : isConnected ? '2' : '1.5'}
                  fill={isConnected ? '#fde047' : '#ffffff'}
                  className="filter drop-shadow-[0_0_10px_rgba(253,224,71,0.9)] transition-all duration-300"
                />

                <text
                  y={star.y > 50 ? 6.5 : -5}
                  textAnchor="middle"
                  className={`text-[3.6px] font-serif-bn transition-colors ${
                    isConnected ? 'fill-rose-200 font-bold' : 'fill-stone-400 font-normal'
                  }`}
                >
                  {star.label}
                </text>
              </g>
            );
          })}
        </svg>

        <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-none">
          <span className="text-xs text-rose-300/90 bg-black/60 px-4 py-1.5 rounded-full border border-rose-500/20 backdrop-blur-sm">
            {isCompleted
              ? `✨ সম্পূর্ণ নক্ষত্রমণ্ডল জুড়ে শুধু ${boyName} আর ${girlName}`
              : 'তারাগুলোতে ক্লিক করে আমাদের প্রেমের আকাশ সাজাও...'}
          </span>
        </div>
      </div>

      {/* Active Star Memory Reveal */}
      {activeStar && (
        <div className="w-full max-w-xl text-center mb-6 p-5 rounded-2xl bg-stone-900/60 border border-rose-500/30 backdrop-blur-xl animate-in fade-in duration-300 shadow-lg">
          <div className="flex items-center justify-center gap-1.5 text-xs text-amber-300 mb-1.5">
            <Sparkles className="w-4 h-4" />
            <span className="font-semibold">{activeStar.label}</span>
          </div>
          <p className="text-base font-serif-bn text-rose-100 font-semibold">
            "{activeStar.sub}"
          </p>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mt-2">
        {onGoToPrev && (
          <button
            onClick={() => {
              romanticAudio.playChime(1.1);
              onGoToPrev();
            }}
            className="px-6 py-3 rounded-full bg-stone-900/70 hover:bg-stone-800 text-stone-300 hover:text-rose-200 border border-stone-700/60 text-xs sm:text-sm font-serif-bn transition-colors cursor-pointer min-h-[46px] active:scale-95"
          >
            ← আগের পাতায় ফিরে যান
          </button>
        )}

        <button
          onClick={() => {
            romanticAudio.playBloom();
            onUnlockNext();
            onGoToNext();
          }}
          className="group flex items-center gap-3 px-9 py-4 rounded-full bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 text-white font-serif-bn font-bold text-base sm:text-lg shadow-[0_0_35px_rgba(244,63,94,0.5)] hover:shadow-[0_0_50px_rgba(244,63,94,0.7)] hover:scale-105 active:scale-95 transition-all cursor-pointer min-h-[52px]"
        >
          <span>পরবর্তী গোপন অনুভূতিতে চলুন (কেন শুধুই {girlName}?)</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
        </button>
      </div>
    </div>
  );
};
