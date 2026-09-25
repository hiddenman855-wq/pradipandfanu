import React, { useState } from 'react';
import { Heart, Sparkles, Eye, MessageCircle, Flame, CloudRain, Coffee, ArrowRight } from 'lucide-react';
import { romanticAudio } from '../../utils/audio';

interface Chapter1Props {
  herName: string;
  onUnlockNext: () => void;
  onGoToNext: () => void;
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

export const Chapter1_Sensations: React.FC<Chapter1Props> = ({
  herName,
  onUnlockNext,
  onGoToNext,
  isUnlockedNext,
}) => {
  const [activeItem, setActiveItem] = useState<SensationItem | null>(null);
  const [revealedIds, setRevealedIds] = useState<number[]>([]);
  const [floatingHearts, setFloatingHearts] = useState<{ id: number; x: number; y: number }[]>([]);

  const sensations: SensationItem[] = [
    {
      id: 1,
      label: 'তোমার মিষ্টি হাসি',
      sub: 'এক চিলতে আলো',
      icon: Sparkles,
      quote: 'তোমার হাসি যেন ভোরের প্রথম সোনালী রোদ।',
      poeticNote: 'হাজারো কোলাহলের মাঝেও তোমার নির্মল হাসি আমার গোটা পৃথিবীকে শান্ত করে দেয়।',
      color: 'from-amber-400 to-rose-400',
      accentBg: 'bg-amber-500/10 border-amber-500/30 text-amber-200',
      effectType: 'flower',
    },
    {
      id: 2,
      label: 'চোখের নীরব ভাষা',
      sub: 'শব্দহীন গভীরতা',
      icon: Eye,
      quote: 'মুখে কিছু না বলেও, তোমার চোখ সব বলে দিয়েছিল।',
      poeticNote: 'যেদিন প্রথম তোমার চোখের দিকে তাকিয়েছিলাম, মনে হয়েছিল এখানেই আমার সব হারিয়ে যাওয়ার ঠিকানা।',
      color: 'from-rose-400 to-pink-500',
      accentBg: 'bg-rose-500/10 border-rose-500/30 text-rose-200',
      effectType: 'heart',
    },
    {
      id: 3,
      label: 'প্রথম কথা বলা',
      sub: 'এক অপার্থিব অনুভূতি',
      icon: MessageCircle,
      quote: 'তোমার কণ্ঠস্বর যেন এক অচেনা নদীর শান্ত সুর।',
      poeticNote: 'সামান্য কটি কথা, অথচ প্রতিটি অক্ষরে আমার ভেতর এক নতুন বসন্তের জন্ম হয়েছিল।',
      color: 'from-pink-400 to-purple-400',
      accentBg: 'bg-pink-500/10 border-pink-500/30 text-pink-200',
      effectType: 'sparkle',
    },
    {
      id: 4,
      label: 'বুকের ধুকপুকানি',
      sub: 'থমকে যাওয়া নিঃশ্বাস',
      icon: Flame,
      quote: 'তুমি সামনে আসতেই হৃদস্পন্দন সব ব্যাকরণ ভুলেছিল।',
      poeticNote: 'এতটা অস্থিরতা যে এতটা মধুর হতে পারে, তোমাকে পাওয়ার আগে জানা ছিল না।',
      color: 'from-red-400 to-rose-500',
      accentBg: 'bg-red-500/10 border-red-500/30 text-red-200',
      effectType: 'pulse',
    },
    {
      id: 5,
      label: 'বৃষ্টিভেজা ক্ষণ',
      sub: 'মেঘের ছায়ায় তুমি',
      icon: CloudRain,
      quote: 'বৃষ্টির প্রতিটি ফোঁটাও যেন সেদিন তোমার বন্দনায় মেতেছিল।',
      poeticNote: 'শহরের ভেজা রাস্তায় তোমার পদচিহ্ন যেন কোনো প্রাচীন রোমান্টিক মহাকাব্যের ছন্দ।',
      color: 'from-sky-400 to-indigo-400',
      accentBg: 'bg-sky-500/10 border-sky-500/30 text-sky-200',
      effectType: 'rain',
    },
    {
      id: 6,
      label: 'এক কাপ চায়ের মায়া',
      sub: 'মুহূর্তের নিবিড়তা',
      icon: Coffee,
      quote: 'চায়ের চেয়েও বেশি উষ্ণ ছিল তোমার মধুর সান্নিধ্য।',
      poeticNote: 'সময় যেন থমকে দাঁড়িয়েছিল সেই টেবিলের কোণে, যেখানে শুধু তুমি আর আমি ছিলাম।',
      color: 'from-orange-400 to-amber-500',
      accentBg: 'bg-orange-500/10 border-orange-500/30 text-orange-200',
      effectType: 'steam',
    },
  ];

  const handleItemClick = (item: SensationItem, e: React.MouseEvent<HTMLButtonElement>) => {
    // Sound effect
    if (item.effectType === 'pulse') {
      romanticAudio.playHeartbeat();
    } else if (item.effectType === 'flower') {
      romanticAudio.playBloom();
    } else {
      romanticAudio.playChime(1.1 + item.id * 0.08);
    }

    // Spawn floating heart at button position
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
    <div className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 py-8 max-w-4xl mx-auto">
      {/* Floating Heart Burst Particles */}
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
          <Heart className="w-7 h-7 text-rose-400 fill-rose-400 filter drop-shadow-[0_0_12px_rgba(244,63,94,0.8)]" />
        </div>
      ))}

      {/* Chapter Editorial Header */}
      <div className="text-center mb-8 space-y-3">
        <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-rose-300/80 font-medium">
          <span>অধ্যায় এক</span>
          <span>·</span>
          <span>প্রথম স্পর্শ</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif-bn font-bold text-rose-100 tracking-tight leading-tight">
          প্রথম অনুভূতি
        </h1>
        <p className="text-sm sm:text-base text-rose-200/80 max-w-lg mx-auto font-light leading-relaxed">
          {herName}, হাজার মানুষের ভিড়ে পৃথিবী যখন নিঃশব্দে চলছিল,
          ঠিক সেই লগ্নে তোমাতেই এসে থমকে গিয়েছিল আমার চোখ।
        </p>
      </div>

      {/* Interactive Sensation Buttons Grid */}
      <div className="w-full grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-8">
        {sensations.map((item) => {
          const Icon = item.icon;
          const isRevealed = revealedIds.includes(item.id);
          const isCurrentActive = activeItem?.id === item.id;

          return (
            <button
              key={item.id}
              onClick={(e) => handleItemClick(item, e)}
              className={`relative group p-4 sm:p-5 rounded-2xl border text-left transition-all duration-300 transform active:scale-95 cursor-pointer backdrop-blur-md min-h-[105px] flex flex-col justify-between ${
                isCurrentActive
                  ? 'bg-rose-500/20 border-rose-400 shadow-[0_0_25px_rgba(244,114,182,0.25)] ring-1 ring-rose-400/50'
                  : isRevealed
                  ? 'bg-stone-900/60 border-rose-500/30 hover:border-rose-400/60'
                  : 'bg-stone-900/40 border-stone-800/80 hover:border-rose-500/40 hover:bg-stone-900/70'
              }`}
            >
              {/* Soft background glow */}
              <div className="flex items-center justify-between w-full">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${
                    item.accentBg
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                {isRevealed && (
                  <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
                )}
              </div>

              <div>
                <h3 className="text-sm sm:text-base font-serif-bn font-semibold text-rose-100 group-hover:text-white transition-colors">
                  {item.label}
                </h3>
                <span className="text-[11px] text-stone-400 block font-light">
                  {item.sub}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* 3D Slide & Reveal Card Modal for Active Sensation */}
      {activeItem && (
        <div className="w-full mb-8 animate-in fade-in zoom-in-95 duration-300">
          <div className="relative p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-rose-950/40 via-stone-900/80 to-purple-950/30 border border-rose-500/30 backdrop-blur-xl shadow-2xl overflow-hidden text-center">
            {/* Ambient decorative aura */}
            <div className="absolute -top-16 -right-16 w-32 h-32 rounded-full bg-rose-500/20 blur-2xl pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-32 h-32 rounded-full bg-purple-500/20 blur-2xl pointer-events-none" />

            <div className="inline-flex items-center gap-1.5 text-xs text-rose-300/80 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-rose-400" />
              <span>একটি বিশেষ অনুভূতির প্রতিচ্ছবি</span>
            </div>

            <h4 className="text-xl sm:text-2xl font-serif-bn font-bold text-rose-100 mb-3">
              "{activeItem.quote}"
            </h4>

            <p className="text-sm sm:text-base text-rose-200/90 font-light max-w-xl mx-auto leading-relaxed mb-4">
              {activeItem.poeticNote}
            </p>

            <div className="inline-block px-4 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-xs text-rose-300">
              অনুভূতি স্পর্শিত হয়েছে ✨
            </div>
          </div>
        </div>
      )}

      {/* Sensation Progress & Unlock Next Chapter */}
      <div className="w-full flex flex-col items-center gap-4 text-center">
        <div className="text-xs text-rose-300/70">
          অনুভূতি স্পর্শ করা হয়েছে: <span className="text-rose-200 font-semibold">{revealedIds.length}</span> / {sensations.length}
        </div>

        {/* Portal Button to Next Chapter */}
        {isUnlockedNext ? (
          <button
            onClick={() => {
              romanticAudio.playBloom();
              onGoToNext();
            }}
            className="group flex items-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 text-white font-medium text-sm sm:text-base shadow-[0_0_30px_rgba(244,63,94,0.4)] hover:shadow-[0_0_40px_rgba(244,63,94,0.6)] hover:scale-105 active:scale-95 transition-all cursor-pointer min-h-[48px]"
          >
            <span className="font-serif-bn font-semibold">দ্বিতীয় অধ্যায়ে চলুন (থমকে যাওয়া সময়)</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        ) : (
          <p className="text-xs text-stone-400 font-light">
            পরবর্তী অধ্যায়ের দুয়ার খুলতে যেকোনো ৩টি অনুভূতি স্পর্শ করুন...
          </p>
        )}
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
