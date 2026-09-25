import React, { useState } from 'react';
import { ArrowRight, Heart, Sparkles, Clock, Compass, Music, Flame } from 'lucide-react';
import { romanticAudio } from '../../utils/audio';

interface Chapter2Props {
  herName: string;
  onUnlockNext: () => void;
  onGoToNext: () => void;
  isUnlockedNext: boolean;
}

export const Chapter2_FrozenMoment: React.FC<Chapter2Props> = ({
  herName,
  onUnlockNext,
  onGoToNext,
  isUnlockedNext,
}) => {
  const [sliderValue, setSliderValue] = useState<number>(30);
  const [flippedCard, setFlippedCard] = useState<number | null>(null);
  const [heartsCount, setHeartsCount] = useState<number>(0);

  const memories = [
    {
      id: 1,
      tag: 'লগ্নের শুরু',
      front: 'যেদিন চোখের পাতা কাঁপছিল...',
      back: 'কথা বলার আগে তোমার দ্বিধাভরা দৃষ্টি, আজীবন আমার হৃদয়ে আঁকা থাকবে।',
      icon: Clock,
    },
    {
      id: 2,
      tag: 'মায়াবী নীরবতা',
      front: 'নীরবতার মধ্যেও এক অপূর্ব আলাপন',
      back: 'শব্দ ফুরিয়ে গেলেও তোমার পাশে বসে থাকাটাই ছিল অনন্ত শান্তির আশ্রয়।',
      icon: Compass,
    },
    {
      id: 3,
      tag: 'হৃদয়ের টান',
      front: 'প্রথমবার বুঝতে পারলাম...',
      back: 'তুমি সাধারণ কেউ নও, তুমি আমার হারিয়ে যাওয়া সবচেয়ে সুন্দর প্রার্থনা।',
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
    <div className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 py-8 max-w-4xl mx-auto">
      {/* Chapter Editorial Header */}
      <div className="text-center mb-8 space-y-3">
        <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-rose-300/80 font-medium">
          <span>অধ্যায় দুই</span>
          <span>·</span>
          <span>থমকে যাওয়া সময়</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif-bn font-bold text-rose-100 tracking-tight leading-tight">
          যেদিন সময় নিশ্চুপ হয়েছিল
        </h1>
        <p className="text-sm sm:text-base text-rose-200/80 max-w-lg mx-auto font-light leading-relaxed">
          ঘড়ির কাঁটা তখনও ঘুরছিল, কিন্তু আমার গোটা মহাবিশ্ব তোমাতেই এসে স্থির হয়ে গিয়েছিল।
        </p>
      </div>

      {/* Interactive 3D Flip Polaroid Cards */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {memories.map((card) => {
          const isFlipped = flippedCard === card.id;
          const Icon = card.icon;

          return (
            <div
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              className="group relative h-48 sm:h-56 cursor-pointer perspective-1000"
            >
              <div
                className={`w-full h-full rounded-2xl transition-all duration-700 preserve-3d border shadow-lg ${
                  isFlipped
                    ? 'rotate-y-180 bg-gradient-to-br from-rose-900/60 via-stone-900/90 to-purple-900/50 border-rose-400/60 shadow-[0_0_25px_rgba(244,114,182,0.3)]'
                    : 'bg-stone-900/50 border-rose-500/25 hover:border-rose-400/50 hover:bg-stone-900/70'
                } backdrop-blur-md p-5 flex flex-col justify-between`}
                style={{
                  transformStyle: 'preserve-3d',
                  transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                }}
              >
                {!isFlipped ? (
                  <>
                    <div className="flex items-center justify-between text-xs text-rose-300/80">
                      <span className="font-serif-bn font-medium">{card.tag}</span>
                      <Icon className="w-4 h-4 text-rose-400" />
                    </div>
                    <div className="my-auto text-center">
                      <p className="font-serif-bn text-base sm:text-lg text-rose-100 font-semibold group-hover:text-rose-200 transition-colors">
                        "{card.front}"
                      </p>
                    </div>
                    <div className="text-center text-[11px] text-stone-400 flex items-center justify-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-400" />
                      <span>ছুঁয়ে দেখুন...</span>
                    </div>
                  </>
                ) : (
                  <div
                    className="flex flex-col justify-between h-full text-center"
                    style={{ transform: 'rotateY(180deg)' }}
                  >
                    <div className="text-xs text-rose-300 flex items-center justify-center gap-1">
                      <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
                      <span>গোপন অনুভূতি</span>
                    </div>
                    <p className="text-sm sm:text-base text-rose-100 font-light leading-relaxed my-auto">
                      {card.back}
                    </p>
                    <div className="text-[10px] text-rose-300/60">
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
      <div className="w-full max-w-xl p-5 rounded-2xl bg-stone-900/40 border border-rose-500/20 backdrop-blur-md mb-8">
        <div className="flex items-center justify-between text-xs text-rose-200 mb-2">
          <span className="flex items-center gap-1.5 font-medium">
            <Heart className="w-3.5 h-3.5 text-rose-400" />
            অনুভূতির গভীরতা বাড়িয়ে দেখুন
          </span>
          <span className="font-mono text-rose-300">{sliderValue}%</span>
        </div>

        <input
          type="range"
          min="0"
          max="100"
          value={sliderValue}
          onChange={handleSliderChange}
          className="w-full h-2 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
        />

        <div className="mt-3 text-center text-xs text-rose-200/90 font-light italic">
          {sliderValue < 40 && `"${herName}, প্রথম পরিচয়ের সেই শান্ত শিহরণ..."`}
          {sliderValue >= 40 && sliderValue < 80 && `"${herName}, হৃদয়ের গভীরে কেবল তোমারই মৃদু সুর..."`}
          {sliderValue >= 80 && `"${herName}, আর কোনো দ্বিধা নেই—তুমি ছাড়া আমার কোনো অস্তিত্ব নেই!" ✨`}
        </div>
      </div>

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
            <span className="font-serif-bn font-semibold">তৃতীয় অধ্যায়ে চলুন (আমাদের নক্ষত্রমণ্ডল)</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        ) : (
          <p className="text-xs text-stone-400 font-light">
            কার্ডগুলো উল্টে দেখুন অথবা অনুভূতির গভীরতা ৮০% এর উপরে তুলুন...
          </p>
        )}
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
