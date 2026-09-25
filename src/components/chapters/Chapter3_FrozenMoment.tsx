import React, { useState } from 'react';
import { ArrowRight, Heart, Sparkles, Clock, Compass, Flame } from 'lucide-react';
import { romanticAudio } from '../../utils/audio';

interface Chapter3FrozenMomentProps {
  girlName: string;
  boyName: string;
  onUnlockNext: () => void;
  onGoToNext: () => void;
  onGoToPrev?: () => void;
  isUnlockedNext: boolean;
}

export const Chapter3_FrozenMoment: React.FC<Chapter3FrozenMomentProps> = ({
  girlName,
  boyName,
  onUnlockNext,
  onGoToNext,
  onGoToPrev,
  isUnlockedNext,
}) => {
  const [sliderValue, setSliderValue] = useState<number>(35);
  const [flippedCard, setFlippedCard] = useState<number | null>(null);
  const [heartsCount, setHeartsCount] = useState<number>(0);

  const memories = [
    {
      id: 1,
      tag: 'লগ্নের শুরু',
      front: 'যেদিন প্রথম চোখের পাতা কাঁপছিল...',
      back: `কথা বলার আগে ${girlName}-র দ্বিধাভরা দৃষ্টি, আজীবন ${boyName}-এর হৃদয়ে অমলিন থাকবে।`,
      icon: Clock,
    },
    {
      id: 2,
      tag: 'মায়াবী নীরবতা',
      front: 'নীরবতার মধ্যেও এক অপূর্ব আলাপন',
      back: `শব্দ ফুরিয়ে গেলেও ${girlName}-র পাশে বসে থাকাটাই ছিল ${boyName}-এর অনন্ত শান্তির আশ্রয়।`,
      icon: Compass,
    },
    {
      id: 3,
      tag: 'হৃদয়ের টান',
      front: 'প্রথমবার বুঝতে পারলাম...',
      back: `${girlName} সাধারণ কেউ নও, তুমি ${boyName}-এর জীবনের সবচেয়ে সুন্দর পাওয়া।`,
      icon: Flame,
    },
  ];

  const handleCardClick = (id: number) => {
    romanticAudio.playBloom();
    setFlippedCard(flippedCard === id ? null : id);
    setHeartsCount((prev) => {
      const next = prev + 1;
      if (next >= 2 && !isUnlockedNext) {
        onUnlockNext();
      }
      return next;
    });
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setSliderValue(val);
    if (val > 80 && !isUnlockedNext) {
      onUnlockNext();
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 py-8 sm:py-12 max-w-5xl mx-auto w-full">
      {/* Chapter Editorial Header */}
      <div className="text-center mb-8 space-y-3">
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-rose-300 font-medium">
          <span>মধুর স্মৃতি</span>
          <span>·</span>
          <span>থমকে যাওয়া সময়</span>
        </div>
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif-bn font-extrabold text-rose-100 tracking-tight leading-tight">
          যেদিন সময় নিশ্চুপ হয়েছিল
        </h2>
        <p className="text-sm sm:text-lg text-rose-200/90 max-w-xl mx-auto font-light leading-relaxed">
          ঘড়ির কাঁটা তখনও ঘুরছিল, কিন্তু {boyName}-এর গোটা মহাবিশ্ব {girlName}-এ এসে স্থির হয়ে গিয়েছিল।
        </p>
      </div>

      {/* Interactive 3D Flip Polaroid Cards */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
        {memories.map((card) => {
          const isFlipped = flippedCard === card.id;
          const Icon = card.icon;

          return (
            <div
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              className="group relative h-56 sm:h-64 cursor-pointer perspective-1000"
            >
              <div
                className={`w-full h-full rounded-3xl transition-all duration-700 preserve-3d border-2 shadow-xl ${
                  isFlipped
                    ? 'rotate-y-180 bg-gradient-to-br from-rose-900/70 via-stone-900/95 to-purple-900/60 border-rose-400/70 shadow-[0_0_35px_rgba(244,114,182,0.4)]'
                    : 'bg-stone-900/60 border-rose-500/30 hover:border-rose-400/60 hover:bg-stone-900/80'
                } backdrop-blur-xl p-6 flex flex-col justify-between`}
                style={{
                  transformStyle: 'preserve-3d',
                  transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                }}
              >
                {!isFlipped ? (
                  <>
                    <div className="flex items-center justify-between text-xs text-rose-300">
                      <span className="font-serif-bn font-semibold">{card.tag}</span>
                      <Icon className="w-5 h-5 text-rose-400" />
                    </div>
                    <div className="my-auto text-center">
                      <p className="font-serif-bn text-lg sm:text-xl text-rose-100 font-bold group-hover:text-rose-200 transition-colors">
                        "{card.front}"
                      </p>
                    </div>
                    <div className="text-center text-xs text-amber-300/80 flex items-center justify-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>ছুঁয়ে দেখুন...</span>
                    </div>
                  </>
                ) : (
                  <div
                    className="flex flex-col justify-between h-full text-center"
                    style={{ transform: 'rotateY(180deg)' }}
                  >
                    <div className="text-xs text-rose-300 flex items-center justify-center gap-1.5 font-medium">
                      <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
                      <span>গোপন অনুভূতি</span>
                    </div>
                    <p className="text-sm sm:text-base text-rose-100 font-light leading-relaxed my-auto">
                      {card.back}
                    </p>
                    <div className="text-xs text-rose-300/70">
                      স্মৃতি অক্ষুণ্ণ রইল ❤️
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Depth / Emotion Slider */}
      <div className="w-full max-w-2xl p-6 rounded-3xl bg-stone-900/50 border-2 border-rose-500/30 backdrop-blur-xl mb-8">
        <div className="flex items-center justify-between text-xs sm:text-sm text-rose-200 mb-3 font-medium">
          <span className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-rose-400" />
            ভালোবাসার গভীরতা বাড়িয়ে দেখুন
          </span>
          <span className="font-mono text-amber-300 font-bold">{sliderValue}%</span>
        </div>

        <input
          type="range"
          min="0"
          max="100"
          value={sliderValue}
          onChange={handleSliderChange}
          className="w-full h-2.5 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
        />

        <div className="mt-4 text-center text-sm sm:text-base text-rose-100 font-light italic">
          {sliderValue < 40 && `"${girlName}, প্রথম পরিচয়ের সেই মুগ্ধ অনুভূতি..."`}
          {sliderValue >= 40 && sliderValue < 80 && `"${girlName}, ${boyName}-এর হৃদয়ের গভীরে কেবল তোমারই মৃদু সুর..."`}
          {sliderValue >= 80 && `"${girlName}, তুমি ছাড়া ${boyName}-এর কোনো অস্তিত্ব নেই!" ✨`}
        </div>
      </div>

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
          <span>আমাদের মায়াবী আকাশে চলুন</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
        </button>
      </div>

      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
};
