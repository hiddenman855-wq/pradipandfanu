import React, { useState } from 'react';
import { Mail, Sparkles, Heart, Award, RotateCcw, Share2, CheckCircle2 } from 'lucide-react';
import { romanticAudio } from '../../utils/audio';

interface Chapter7Props {
  girlName: string;
  boyName: string;
  onTriggerFireworks: () => void;
  onGoToPrev?: () => void;
}

interface EscapeParticle {
  id: number;
  x: number;
  y: number;
  text: string;
}

export const Chapter7_SecretLetterAndCertificate: React.FC<Chapter7Props> = ({
  girlName,
  boyName,
  onTriggerFireworks,
  onGoToPrev,
}) => {
  const [isLetterRead, setIsLetterRead] = useState<boolean>(false);
  const [finalAccepted, setFinalAccepted] = useState<boolean>(false);
  const [noCount, setNoCount] = useState<number>(0);
  const [noPos, setNoPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [escapePuffs, setEscapePuffs] = useState<EscapeParticle[]>([]);

  const playfulPhrases = [
    'না',
    `এখনও না বলবে ${girlName}? 🥺`,
    'এতগুলো অনুভূতির পরেও না? 💔',
    `${boyName} তো শুধুই তোমার! 🌹`,
    'তোমার চোখে তো কেবলই ভালোবাসা! 🥰',
    'এই শেষ মুহূর্তে না বলা নিষেধ! 🙈',
    'হ্যাঁ বলে দাও, আকাশ সাজাব! ✨',
  ];

  const handleOpenEnvelope = () => {
    if (!isLetterRead) {
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate(30);
      }
      romanticAudio.playWaxSealCrack();
      setIsLetterRead(true);
    }
  };

  const handleFinalYes = () => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate([60, 40, 100]);
    }
    setFinalAccepted(true);
    // THIS IS THE GRAND BOMB ANIMATION (Fireworks + Confetti + Fanfare) AT THE LAST CHAPTER!
    romanticAudio.playCelebrationFanfare();
    onTriggerFireworks();
  };

  const handleNoInteraction = (e: React.MouseEvent | React.TouchEvent | React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Haptic feedback on mobile tap
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(35);
    }

    romanticAudio.playChime(0.85);

    // Spawn cute escape text puff at current tap/click position
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const puffX = rect.left + rect.width / 2;
    const puffY = rect.top;

    const escapeWords = ['ধরা গেল না! 🏃‍♂️', 'শেষ সুযোগ! 🙈', 'না হবে না! 🌹', 'হ্যাঁ বলো! ❤️'];
    const chosenWord = escapeWords[noCount % escapeWords.length];

    const newPuff = {
      id: Date.now() + Math.random(),
      x: puffX,
      y: puffY,
      text: chosenWord,
    };
    setEscapePuffs((prev) => [...prev.slice(-3), newPuff]);
    setTimeout(() => {
      setEscapePuffs((prev) => prev.filter((p) => p.id !== newPuff.id));
    }, 900);

    setNoCount((prev) => prev + 1);

    const isMobile = window.innerWidth < 640;
    const rangeX = isMobile ? Math.min(window.innerWidth * 0.28, 120) : 170;
    const rangeY = isMobile ? Math.min(window.innerHeight * 0.15, 80) : 90;

    let rx = (Math.random() - 0.5) * rangeX * 2;
    let ry = (Math.random() - 0.5) * rangeY * 2;

    if (Math.abs(rx - noPos.x) < 40) rx += rx >= 0 ? 50 : -50;
    if (Math.abs(ry - noPos.y) < 30) ry += ry >= 0 ? 40 : -40;

    setNoPos({ x: rx, y: ry });
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    romanticAudio.playChime(1.4);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const todayBengaliDate = new Date().toLocaleDateString('bn-BD', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const yesScale = Math.min(1 + noCount * 0.1, 1.7);

  return (
    <div className="relative min-h-[calc(100vh-8rem)] flex flex-col items-center justify-center px-4 py-8 sm:py-12 max-w-5xl mx-auto w-full">
      {/* Floating Escape Particles on Mobile Tap */}
      {escapePuffs.map((puff) => (
        <div
          key={puff.id}
          className="fixed pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 text-xs font-serif-bn font-bold text-amber-300 bg-[#211022]/95 px-3 py-1 rounded-full border border-amber-400/50 shadow-xl"
          style={{
            left: `${puff.x}px`,
            top: `${puff.y}px`,
            animation: 'puffFade 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards',
          }}
        >
          {puff.text}
        </div>
      ))}

      {/* Chapter Editorial Header */}
      <div className="text-center mb-8 space-y-3">
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-amber-300 font-medium">
          <Sparkles className="w-4 h-4" />
          <span>অন্তিম অঙ্গীকার ও পরম মিলন</span>
          <Sparkles className="w-4 h-4" />
        </div>
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif-bn font-black text-rose-100 tracking-tight leading-tight">
          {boyName}-এর গোপন চিঠি ও অন্তিম প্রশ্ন
        </h2>
        <p className="text-sm sm:text-lg text-rose-200/90 max-w-xl mx-auto font-light leading-relaxed">
          {girlName}, সমস্ত পথ অতিক্রম করে আমরা এসেছি আমাদের অনন্ত মিলনের পরম লগ্নে।
        </p>
      </div>

      {!finalAccepted ? (
        <div className="w-full max-w-2xl space-y-8">
          {/* Part 1: Wax-Sealed Secret Letter */}
          <div className="w-full">
            {!isLetterRead ? (
              <div
                onClick={handleOpenEnvelope}
                className="group relative cursor-pointer p-8 sm:p-12 rounded-[2.5rem] bg-gradient-to-br from-rose-950/80 via-stone-900/95 to-purple-950/70 border-2 border-rose-500/50 shadow-[0_0_60px_rgba(244,114,182,0.35)] hover:border-amber-400 hover:shadow-[0_0_80px_rgba(251,191,36,0.5)] active:scale-95 transition-all duration-300 text-center flex flex-col items-center justify-center min-h-[300px]"
              >
                <div className="w-20 h-20 rounded-3xl bg-rose-900/60 border-2 border-rose-400/50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-xl">
                  <Mail className="w-10 h-10 text-rose-200" />
                </div>

                <h3 className="text-2xl sm:text-3xl font-serif-bn font-bold text-rose-100 mb-2">
                  কেবল {girlName}-এর জন্য {boyName}-এর গোপন চিঠি
                </h3>
                <p className="text-sm text-rose-300/80 font-light mb-6">
                  লাল মোমের সিলমোহরটি স্পর্শ করে গোপন কথাগুলো পড়ুন...
                </p>

                {/* 3D Wax Seal Button */}
                <div className="relative group/seal w-18 h-18 rounded-full bg-gradient-to-br from-rose-600 via-rose-700 to-rose-950 border-4 border-amber-300 shadow-[0_6px_25px_rgba(225,29,72,0.8)] flex items-center justify-center animate-pulse">
                  <Heart className="w-9 h-9 text-amber-200 fill-amber-200 filter drop-shadow-md" />
                  <div className="absolute inset-0 rounded-full border border-amber-200/50 pointer-events-none" />
                </div>
                <span className="mt-3 text-xs text-amber-300 font-serif-bn font-semibold">সিলমোহর উন্মোচন করুন ✨</span>
              </div>
            ) : (
              /* Unfolded Handwritten Love Letter */
              <div className="relative p-7 sm:p-10 rounded-[2.5rem] bg-[#1a0f1d]/95 border-2 border-rose-500/40 shadow-2xl backdrop-blur-2xl text-left animate-in fade-in duration-500">
                <div className="flex items-center justify-between pb-4 border-b border-rose-900/40 text-xs sm:text-sm text-rose-300/80 mb-5 font-serif-bn">
                  <span className="font-semibold">{boyName} ও {girlName}-এর অমর প্রেমলিপি</span>
                  <span className="flex items-center gap-1.5 text-amber-300">
                    <Sparkles className="w-4 h-4" />
                    সিলমোহর উন্মুক্ত
                  </span>
                </div>

                <div className="space-y-4 font-serif-bn text-rose-100 text-sm sm:text-base leading-relaxed font-light">
                  <p className="text-lg sm:text-xl font-bold text-rose-200">
                    আমার প্রিয় {girlName},
                  </p>

                  <p>
                    আজ যখন সমস্ত স্মৃতিগুলো একে একে পেরিয়ে আমরা এই অন্তিম লগ্নে দাঁড়িয়েছি, আমার হৃদয়ের প্রতিটি নিঃশ্বাস কেবল তোমার কথাই বলছে। তুমি আমার সাধারণ জীবনে এসে তাকে অসাধারণ করে তুলেছ।
                  </p>

                  <p>
                    তোমার হাসি, তোমার রাগ, তোমার মায়াবী দুটি চোখ—এসবই আমার বেঁচে থাকার একমাত্র আনন্দ। আমি তোমাকে কথা দিচ্ছি, পৃথিবীর শেষ দিন পর্যন্ত তোমার চোখের প্রতিটি হাসির কারণ হব আমি, আর প্রতিটি কঠিন ক্ষণে শক্ত আশ্রয় হব আমি।
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-rose-900/40 flex justify-between items-center text-xs text-rose-300">
                  <span className="font-medium">ইতি, চিরকালের জন্য তোমার {boyName}</span>
                  <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
                </div>
              </div>
            )}
          </div>

          {/* Part 2: Asking for Yes or No Again Before Bomb Explosion */}
          <div className="relative p-8 sm:p-10 rounded-[2.5rem] bg-gradient-to-b from-stone-900/95 via-rose-950/60 to-stone-900/95 border-2 border-amber-400/70 shadow-[0_0_70px_rgba(251,191,36,0.35)] text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-400/40 text-amber-300 text-xs font-serif-bn font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>জীবনের অন্তিম শপথ</span>
            </div>

            <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif-bn font-black text-rose-100 leading-tight mb-2">
              {girlName}, তুমি কি অনন্তকালের জন্য {boyName}-এর হাতটি ধরে রাখবে?
            </h3>
            <p className="text-xs sm:text-sm text-rose-200/80 font-light mb-6">
              তোমার একটি 'হ্যাঁ' গোটা আকাশ জুড়ে রঙিন আতশবাজির বন্যা বইয়ে দেবে...
            </p>

            {/* Final Choice Buttons: Grand YES + Runaway NO */}
            <div className="relative min-h-[130px] flex flex-col items-center justify-center gap-4">
              <button
                onClick={handleFinalYes}
                style={{
                  transform: `scale(${yesScale})`,
                  transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                className="group relative px-10 sm:px-14 py-4 sm:py-5 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white font-black text-xl sm:text-2xl shadow-[0_0_45px_rgba(244,63,94,0.8)] hover:shadow-[0_0_70px_rgba(244,63,94,1)] active:scale-90 transition-all cursor-pointer min-h-[58px] flex items-center justify-center gap-3 z-20 border-2 border-amber-200"
              >
                <Heart className="w-6 h-6 text-white fill-white animate-pulse" />
                <span className="font-serif-bn font-bold">হ্যাঁ! অনন্তকালের জন্য!</span>
                <Sparkles className="w-5 h-5 text-amber-200" />
              </button>

              {/* Running No Button (Escapes on Hover, TouchStart, PointerDown, Click!) */}
              <button
                onClick={handleNoInteraction}
                onMouseEnter={handleNoInteraction}
                onTouchStart={handleNoInteraction}
                onPointerDown={handleNoInteraction}
                onMouseDown={handleNoInteraction}
                style={{
                  transform: `translate(${noPos.x}px, ${noPos.y}px)`,
                  transition: 'transform 0.18s cubic-bezier(0.34, 1.56, 0.64, 1)',
                }}
                className="px-6 py-2.5 rounded-full bg-stone-800/90 hover:bg-stone-700/90 active:bg-stone-700 border border-stone-600 text-stone-300 text-xs sm:text-sm font-serif-bn transition-colors cursor-pointer min-h-[40px] z-10 whitespace-nowrap shadow-lg select-none touch-none active:scale-95"
              >
                {playfulPhrases[noCount % playfulPhrases.length]}
              </button>

              {noCount > 0 && (
                <p className="text-xs text-rose-300 font-light italic animate-pulse">
                  ({girlName}, আর কোনো পলায়ন নয়... তোমার উত্তর কেবল 'হ্যাঁ' ❤️)
                </p>
              )}

              {onGoToPrev && (
                <div className="pt-2">
                  <button
                    onClick={() => {
                      romanticAudio.playChime(1.1);
                      onGoToPrev();
                    }}
                    className="text-xs text-stone-400 hover:text-rose-200 transition-colors cursor-pointer"
                  >
                    ← পূর্ববর্তী স্মৃতিতে ফিরে যান
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Grand Proposal Accepted - THE BOMB ANIMATION CELEBRATION & ETERNAL CERTIFICATE */
        <div className="w-full max-w-2xl animate-in zoom-in-95 duration-700 space-y-6">
          <div className="relative p-8 sm:p-12 rounded-[2.5rem] bg-gradient-to-b from-stone-900/95 via-[#231226] to-stone-900/95 border-2 border-amber-400/90 shadow-[0_0_90px_rgba(251,191,36,0.5)] backdrop-blur-2xl text-center">
            {/* Crown Stamp */}
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-amber-500/25 border border-amber-400/60 text-amber-300 text-xs sm:text-sm font-serif-bn font-bold mb-6 shadow-lg">
              <Award className="w-5 h-5 text-amber-400" />
              <span>আমাদের ভালোবাসার চিরন্তন অঙ্গীকারপত্র</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-serif-bn font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-100 via-pink-200 to-amber-200 mb-2">
              {boyName} ও {girlName}
            </h2>

            <p className="text-xs sm:text-sm text-rose-300/90 font-light mb-6">
              আজকের এই পবিত্র লগ্নে আমাদের দুটি হৃদয় চিরকালের মতো এক আত্মায় পরিণত হলো।
            </p>

            {/* Official Covenant Box */}
            <div className="p-6 sm:p-8 rounded-3xl bg-black/55 border border-rose-500/30 text-left font-serif-bn text-rose-100 text-xs sm:text-sm space-y-3.5 leading-relaxed mb-8 shadow-inner">
              <p>
                <strong className="text-amber-200 font-semibold text-sm sm:text-base">পবিত্র অঙ্গীকার:</strong> "জীবনের প্রতিটি ভোরে তোমার চোখ দেখে দিন শুরু করার আর প্রতিটি গোধূলিতে তোমার হাত শক্ত করে ধরে রাখার এই পবিত্র বন্ধন আজীবন অটুট থাকবে। সুখে-দুঃখে, হাসিতে-কান্নায়—আমরা কেবল পরস্পরের।"
              </p>
              <div className="pt-3 border-t border-rose-900/40 flex justify-between items-center text-xs text-stone-300">
                <span>তারিখ: {todayBengaliDate}</span>
                <span className="text-rose-400 flex items-center gap-1.5 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> চিরন্তন প্রেম নিশ্চিত
                </span>
              </div>
            </div>

            {/* Celebration Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => {
                  romanticAudio.playCelebrationFanfare();
                  onTriggerFireworks();
                }}
                className="flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 active:scale-90 text-white text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-xl min-h-[48px] border border-white/20"
              >
                <RotateCcw className="w-4 h-4" />
                <span>আতশবাজি আবার ফুটান 🎆</span>
              </button>

              <button
                onClick={handleCopyLink}
                className="flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-stone-800/90 hover:bg-stone-700 active:scale-95 text-rose-100 text-xs sm:text-sm font-semibold transition-colors cursor-pointer border border-rose-500/30 min-h-[48px]"
              >
                <Share2 className="w-4 h-4" />
                <span>{copiedLink ? 'লিংক কপি হয়েছে!' : 'স্মৃতিটি শেয়ার করুন'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes puffFade {
          0% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(0.7);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -100px) scale(1.3);
          }
        }
      `}</style>
    </div>
  );
};
