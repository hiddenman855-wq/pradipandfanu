import React, { useState } from 'react';
import { Heart, Sparkles, Eye, MessageCircle, Flame, CloudRain, Coffee, ArrowRight } from 'lucide-react';
import { romanticAudio } from '../../utils/audio';

interface Chapter2SensationsProps {
  girlName: string;
  boyName: string;
  onUnlockNext: () => void;
  onGoToNext: () => void;
  onGoToPrev?: () => void;
  isUnlockedNext: boolean;
}

interface SensationItem {
  id: number;
  label: string;
  sub: string;
  icon: React.ElementType;
  quote: string;
  poeticNote: string;
  color: string;
  accentBg: string;
  effectType: 'flower' | 'heart' | 'rain' | 'pulse' | 'sparkle' | 'steam';
}

export const Chapter2_Sensations: React.FC<Chapter2SensationsProps> = ({
  girlName,
  boyName,
  onUnlockNext,
  onGoToNext,
  onGoToPrev,
  isUnlockedNext,
}) => {
  const [activeItem, setActiveItem] = useState<SensationItem | null>(null);
  const [revealedIds, setRevealedIds] = useState<number[]>([]);
  const [floatingHearts, setFloatingHearts] = useState<{ id: number; x: number; y: number }[]>([]);

  const sensations: SensationItem[] = [
    {
      id: 1,
      label: `${girlName}-র মিষ্টি হাসি`,
      sub: 'এক চিলতে সোনালী রোদ',
      icon: Sparkles,
      quote: `${girlName}-র হাসি যেন ভোরের প্রথম সোনালী রোদ।`,
      poeticNote: `হাজারো কোলাহলের মাঝেও ${girlName}-র নির্মল হাসি ${boyName}-এর গোটা পৃথিবীকে শান্ত করে দেয়।`,
      color: 'from-amber-400 to-rose-400',
      accentBg: 'bg-amber-500/15 border-amber-400/40 text-amber-200',
      effectType: 'flower',
    },
    {
      id: 2,
      label: 'চোখের নীরব ভাষা',
      sub: 'শব্দহীন গভীর সমুদ্র',
      icon: Eye,
      quote: `মুখে কিছু না বললেও, ${girlName}-র চোখ সব বলে দিয়েছিল।`,
      poeticNote: `যেদিন প্রথম তোমার চোখের দিকে তাকিয়েছিলাম, মনে হয়েছিল এখানেই ${boyName}-এর সব হারিয়ে যাওয়ার পবিত্র ঠিকানা।`,
      color: 'from-rose-400 to-pink-500',
      accentBg: 'bg-rose-500/15 border-rose-400/40 text-rose-200',
      effectType: 'heart',
    },
    {
      id: 3,
      label: 'প্রথম কথা বলার ক্ষণ',
      sub: 'এক অপার্থিব শিহরণ',
      icon: MessageCircle,
      quote: `${girlName}-র কণ্ঠস্বর যেন এক শান্ত পাহাড়ি ঝর্ণার সুর।`,
      poeticNote: 'সামান্য কটি মিষ্টি কথা, অথচ প্রতিটি অক্ষরে আমার ভেতর এক নতুন বসন্তের জন্ম হয়েছিল।',
      color: 'from-pink-400 to-purple-400',
      accentBg: 'bg-pink-500/15 border-pink-400/40 text-pink-200',
      effectType: 'sparkle',
    },
    {
      id: 4,
      label: 'বুকের ধুকপুকানি',
      sub: 'থমকে যাওয়া নিঃশ্বাস',
      icon: Flame,
      quote: `${girlName} সামনে আসতেই হৃদস্পন্দন সব ব্যাকরণ ভুলেছিল।`,
      poeticNote: 'এতটা অস্থিরতা যে এতটা মধুর হতে পারে, তোমাকে পাওয়ার আগে জানা ছিল না।',
      color: 'from-red-400 to-rose-500',
      accentBg: 'bg-red-500/15 border-red-400/40 text-red-200',
      effectType: 'pulse',
    },
    {
      id: 5,
      label: 'বৃষ্টিভেজা প্রথম আড্ডা',
      sub: 'মেঘের ছায়ায় তুমি আর আমি',
      icon: CloudRain,
      quote: `বৃষ্টির প্রতিটি ফোঁটাও যেন সেদিন ${girlName}-র রূপের প্রশংসায় মেতেছিল।`,
      poeticNote: `শহরের ভেজা রাস্তায় তোমার পদচিহ্ন যেন কোনো প্রাচীন রোমান্টিক মহাকাব্যের ছন্দ।`,
      color: 'from-sky-400 to-indigo-400',
      accentBg: 'bg-sky-500/15 border-sky-400/40 text-sky-200',
      effectType: 'rain',
    },
    {
      id: 6,
      label: 'এক কাপ চায়ের মায়া',
      sub: 'মুহূর্তের নিবিড়তা',
      icon: Coffee,
      quote: `চায়ের চেয়েও বেশি উষ্ণ ছিল ${girlName}-র মধুর সঙ্গ।`,
      poeticNote: `সময় যেন থমকে দাঁড়িয়েছিল সেই টেবিলের কোণে, যেখানে শুধু ${boyName} আর ${girlName} ছিল।`,
      color: 'from-orange-400 to-amber-500',
      accentBg: 'bg-orange-500/15 border-orange-400/40 text-orange-200',
      effectType: 'steam',
    },
  ];

  const handleItemClick = (item: SensationItem, e: React.MouseEvent<HTMLButtonElement>) => {
    if (item.effectType === 'pulse') {
      romanticAudio.playHeartbeat();
    } else if (item.effectType === 'flower') {
      romanticAudio.playBloom();
    } else {
      romanticAudio.playChime(1.1 + item.id * 0.08);
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const newHeart = {
      id: Date.now() + Math.random(),
      x: rect.left + rect.width / 2,
      y: rect.top,
    };
    setFloatingHearts((prev) => [...prev, newHeart]);
    setTimeout(() => {
      setFloatingHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
    }, 1200);

    setActiveItem(item);

    if (!revealedIds.includes(item.id)) {
      const nextRevealed = [...revealedIds, item.id];
      setRevealedIds(nextRevealed);
      if (nextRevealed.length >= 3 && !isUnlockedNext) {
        onUnlockNext();
      }
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 py-8 sm:py-12 max-w-5xl mx-auto w-full">
      {/* Floating Hearts */}
      {floatingHearts.map((heart) => (
        <div
          key={heart.id}
          className="fixed pointer-events-none z-50 transition-all duration-1000 ease-out transform -translate-x-1/2"
          style={{
            left: `${heart.x}px`,
            top: `${heart.y}px`,
            animation: 'floatUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards',
          }}
        >
          <Heart className="w-8 h-8 text-rose-400 fill-rose-400 filter drop-shadow-[0_0_15px_rgba(244,63,94,0.9)]" />
        </div>
      ))}

      {/* Header */}
      <div className="text-center mb-8 space-y-3">
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-rose-300 font-medium">
          <span>পবিত্র অনুভূতি</span>
          <span>·</span>
          <span>প্রথম স্পর্শ ও শিহরণ</span>
        </div>
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif-bn font-extrabold text-rose-100 tracking-tight leading-tight">
          আমাদের প্রথম অনুভূতি
        </h2>
        <p className="text-sm sm:text-lg text-rose-200/90 max-w-xl mx-auto font-light leading-relaxed">
          {girlName}, তোমাকে প্রথম দেখার সেই সোনালী মুহূর্তগুলোর প্রতিটি স্পর্শ আজীবন বুকে জড়িয়ে রাখার মতো।
        </p>
      </div>

      {/* Big Interactive Sensation Cards Grid */}
      <div className="w-full grid grid-cols-2 sm:grid-cols-3 gap-3.5 sm:gap-5 mb-8">
        {sensations.map((item) => {
          const Icon = item.icon;
          const isRevealed = revealedIds.includes(item.id);
          const isCurrentActive = activeItem?.id === item.id;

          return (
            <button
              key={item.id}
              onClick={(e) => handleItemClick(item, e)}
              className={`relative group p-5 sm:p-6 rounded-3xl border text-left transition-all duration-300 transform active:scale-95 cursor-pointer backdrop-blur-xl min-h-[120px] sm:min-h-[140px] flex flex-col justify-between ${
                isCurrentActive
                  ? 'bg-rose-500/25 border-rose-400 shadow-[0_0_35px_rgba(244,114,182,0.35)] ring-2 ring-rose-400/60'
                  : isRevealed
                  ? 'bg-stone-900/70 border-rose-500/40 hover:border-rose-400/70 shadow-lg'
                  : 'bg-stone-900/50 border-stone-800/80 hover:border-rose-500/50 hover:bg-stone-900/80'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <div
                  className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${
                    item.accentBg
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                {isRevealed && (
                  <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
                )}
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-serif-bn font-bold text-rose-100 group-hover:text-white transition-colors">
                  {item.label}
                </h3>
                <span className="text-xs text-stone-400 block font-light mt-0.5">
                  {item.sub}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* 3D Slide & Reveal Card for Active Sensation */}
      {activeItem && (
        <div className="w-full mb-8 animate-in fade-in zoom-in-95 duration-300">
          <div className="relative p-7 sm:p-9 rounded-[2rem] bg-gradient-to-br from-rose-950/60 via-stone-900/90 to-purple-950/50 border-2 border-rose-500/40 backdrop-blur-2xl shadow-2xl overflow-hidden text-center">
            <div className="inline-flex items-center gap-1.5 text-xs text-amber-300 mb-3">
              <Sparkles className="w-4 h-4" />
              <span>{boyName}-এর হৃদয়ের প্রতিচ্ছবি</span>
            </div>

            <h4 className="text-2xl sm:text-3xl font-serif-bn font-bold text-rose-100 mb-3">
              "{activeItem.quote}"
            </h4>

            <p className="text-sm sm:text-lg text-rose-200/90 font-light max-w-2xl mx-auto leading-relaxed mb-4">
              {activeItem.poeticNote}
            </p>

            <div className="inline-block px-4 py-1.5 rounded-full bg-rose-500/20 border border-rose-400/30 text-xs text-rose-200">
              অনুভূতির ছোঁয়া স্পর্শিত হয়েছে ✨
            </div>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="w-full flex flex-col items-center gap-4 text-center mt-2">
        <div className="text-xs text-rose-300/80">
          অনুভূতি স্পর্শ করা হয়েছে: <span className="text-rose-100 font-bold">{revealedIds.length}</span> / {sensations.length}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
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
            <span>পরের সুন্দর স্মৃতিতে চলুন (থমকে যাওয়া মুহূর্ত)</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
          </button>
        </div>
      </div>

      <style>{`
        @keyframes floatUp {
          0% {
            opacity: 1;
            transform: translate(-50%, 0) scale(0.8);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -90px) scale(1.4);
          }
        }
      `}</style>
    </div>
  );
};
