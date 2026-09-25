import React, { useState } from 'react';
import { ArrowRight, Sparkles, Heart } from 'lucide-react';
import { romanticAudio } from '../../utils/audio';

interface Chapter3Props {
  herName: string;
  onUnlockNext: () => void;
  onGoToNext: () => void;
  isUnlockedNext: boolean;
}

interface StarNode {
  id: number;
  label: string;
  sub: string;
  x: number; // percentage in SVG viewBox 0..100
  y: number; // percentage in SVG viewBox 0..100
}

export const Chapter3_Constellation: React.FC<Chapter3Props> = ({
  herName,
  onUnlockNext,
  onGoToNext,
  isUnlockedNext,
}) => {
  const [connectedStars, setConnectedStars] = useState<number[]>([]);
  const [activeStar, setActiveStar] = useState<StarNode | null>(null);

  const starNodes: StarNode[] = [
    { id: 1, label: 'প্রথম পরিচয়', sub: 'যেদিন চোখাচোখি হয়েছিল', x: 22, y: 35 },
    { id: 2, label: 'গোপন আলাপন', sub: 'রাতজাগা কথার স্মৃতি', x: 50, y: 18 },
    { id: 3, label: 'একসাথে হাসি', sub: 'সব বিষাদ ভুলে যাওয়া আনন্দ', x: 78, y: 35 },
    { id: 4, label: 'বিশ্বাসের আশ্রয়', sub: 'যেকোনো বিপদে পাশে থাকা', x: 65, y: 72 },
    { id: 5, label: 'চিরদিনের স্বপ্ন', sub: 'একসঙ্গে শেষ নিঃশ্বাস পর্যন্ত', x: 35, y: 72 },
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
    <div className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 py-8 max-w-4xl mx-auto">
      {/* Chapter Editorial Header */}
      <div className="text-center mb-6 space-y-3">
        <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-rose-300/80 font-medium">
          <span>অধ্যায় তিন</span>
          <span>·</span>
          <span>মায়াবী আকাশ</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif-bn font-bold text-rose-100 tracking-tight leading-tight">
          আমাদের নক্ষত্রমণ্ডল
        </h1>
        <p className="text-sm sm:text-base text-rose-200/80 max-w-lg mx-auto font-light leading-relaxed">
          {herName}, আকাশের প্রতিটি উজ্জ্বল নক্ষত্রে যেন খোদাই করা আছে আমাদের না বলা গল্পের এক একটি অধ্যায়।
        </p>
      </div>

      {/* Interactive Constellation Canvas Frame */}
      <div className="relative w-full max-w-lg aspect-square sm:aspect-[4/3] rounded-3xl bg-gradient-to-b from-purple-950/40 via-stone-900/60 to-rose-950/40 border border-rose-500/20 backdrop-blur-xl p-4 sm:p-6 mb-6 overflow-hidden flex items-center justify-center shadow-2xl">
        {/* Soft Cosmic Background Star Dust */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(244,114,182,0.15),transparent_70%)] pointer-events-none" />

        <svg viewBox="0 0 100 100" className="w-full h-full relative z-10 overflow-visible">
          {/* Constellation Connection Lines */}
          {connectedStars.length > 1 && (
            <polyline
              points={connectedStars
                .map((id) => {
                  const s = starNodes.find((n) => n.id === id);
                  return s ? `${s.x},${s.y}` : '';
                })
                .join(' ')}
              fill="none"
              stroke="rgba(251, 207, 232, 0.7)"
              strokeWidth="0.8"
              strokeDasharray="2 1"
              className="animate-pulse"
            />
          )}

          {/* Loop close line when all 5 connected forming heart constellation */}
          {isCompleted && (
            <line
              x1={starNodes[4].x}
              y1={starNodes[4].y}
              x2={starNodes[0].x}
              y2={starNodes[0].y}
              stroke="rgba(244, 63, 94, 0.8)"
              strokeWidth="1.2"
              className="animate-pulse"
            />
          )}

          {/* Star Nodes */}
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
                {/* Glowing Outer Halo */}
                <circle
                  r={isSelected ? '5' : isConnected ? '4' : '3'}
                  fill={isConnected ? 'rgba(244, 114, 182, 0.25)' : 'rgba(255, 255, 255, 0.1)'}
                  className="transition-all duration-300 group-hover:scale-150"
                />

                {/* Inner Core Star */}
                <circle
                  r={isSelected ? '2.2' : isConnected ? '1.8' : '1.3'}
                  fill={isConnected ? '#fde047' : '#ffffff'}
                  className="filter drop-shadow-[0_0_8px_rgba(253,224,71,0.9)] transition-all duration-300"
                />

                {/* Label Text */}
                <text
                  y={star.y > 50 ? 5 : -4}
                  textAnchor="middle"
                  className={`text-[3.2px] font-serif-bn transition-colors ${
                    isConnected ? 'fill-rose-200 font-semibold' : 'fill-stone-400 font-normal'
                  }`}
                >
                  {star.label}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Instructions overlay */}
        <div className="absolute bottom-3 left-0 right-0 text-center pointer-events-none">
          <span className="text-[11px] text-rose-300/70 bg-black/40 px-3 py-1 rounded-full border border-rose-500/10">
            {isCompleted
              ? '✨ সম্পূর্ণ নক্ষত্রমণ্ডল জুড়ে শুধু তুমি আর আমি'
              : 'তারাগুলোতে ক্লিক করে আমাদের আকাশ সাজাও...'}
          </span>
        </div>
      </div>

      {/* Active Star Memory Reveal */}
      {activeStar && (
        <div className="w-full max-w-lg text-center mb-6 p-4 rounded-2xl bg-stone-900/40 border border-rose-500/20 backdrop-blur-md animate-in fade-in duration-300">
          <div className="flex items-center justify-center gap-1.5 text-xs text-amber-300 mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{activeStar.label}</span>
          </div>
          <p className="text-sm font-serif-bn text-rose-100 font-medium">
            "{activeStar.sub}"
          </p>
        </div>
      )}

      {/* Unlock / Proceed Button */}
      <div className="text-center space-y-3">
        {isUnlockedNext ? (
          <button
            onClick={() => {
              romanticAudio.playBloom();
              onGoToNext();
            }}
            className="group flex items-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 text-white font-medium text-sm sm:text-base shadow-[0_0_30px_rgba(244,63,94,0.4)] hover:shadow-[0_0_40px_rgba(244,63,94,0.6)] hover:scale-105 active:scale-95 transition-all cursor-pointer min-h-[48px]"
          >
            <span className="font-serif-bn font-semibold">চতুর্থ অধ্যায়ে চলুন (কেন শুধুই তুমি?)</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        ) : (
          <p className="text-xs text-stone-400 font-light">
            অন্তত ৪টি নক্ষত্রকে সংযুক্ত করে প্রেমের আকাশ সম্পূর্ণ করুন ({connectedStars.length}/5)...
          </p>
        )}
      </div>
    </div>
  );
};
