import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, ArrowRight, Award } from 'lucide-react';
import { romanticAudio } from '../../utils/audio';

interface Chapter1ProposalProps {
  girlName: string;
  boyName: string;
  onAcceptYes: () => void;
  onGoToNext: () => void;
  isAccepted: boolean;
}

interface EscapeParticle {
  id: number;
  x: number;
  y: number;
  text: string;
}

export const Chapter1_TheProposal: React.FC<Chapter1ProposalProps> = ({
  girlName,
  boyName,
  onAcceptYes,
  onGoToNext,
  isAccepted,
}) => {
  const [noCount, setNoCount] = useState<number>(0);
  const [noPos, setNoPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [escapePuffs, setEscapePuffs] = useState<EscapeParticle[]>([]);

  // Automatically transition to the next chapter 2.5 seconds after acceptance if user doesn't click next manually
  useEffect(() => {
    if (isAccepted) {
      const timer = setTimeout(() => {
        onGoToNext();
      }, 2400);
      return () => clearTimeout(timer);
    }
  }, [isAccepted, onGoToNext]);

  const playfulPhrases = [
    'না',
    `না বলতে নেই, ${girlName}! 🥺`,
    'একটু ভেবে দেখো তো! 💔',
    `${boyName}-এর হাত ছাড়লে কিন্তু ${girlName} পস্তাবে! 🌹`,
    'তোমার চোখ কিন্তু হ্যাঁ বলছে! 🥰',
    'না বাটন তো দৌড়াচ্ছে... ধরতে পারবে না! 🏃‍♂️',
    'আমি শুধুই তোমার, রাজি হয়ে যাও! ❤️',
    'না বাটন ক্লান্ত, এবার হ্যাঁ বলে দাও! 🙈',
    'হ্যাঁ ছাড়া আর কোনো উপায় নেই কিন্তু! ✨',
  ];

  const handleYes = () => {
    // Haptic feedback on mobile
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate([40, 30, 80]);
    }
    // Gentle romantic chime - bomb/fireworks animation is reserved exclusively for the final chapter!
    romanticAudio.playBloom();
    onAcceptYes();
  };

  const handleNoInteraction = (e: React.MouseEvent | React.TouchEvent | React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Haptic vibration on mobile tap
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(35);
    }

    romanticAudio.playChime(0.85);

    // Spawn cute escape text puff at current tap/click position
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const puffX = rect.left + rect.width / 2;
    const puffY = rect.top;

    const escapeWords = ['ধরা গেল না! 🏃‍♂️', 'উড়ো মন! 🕊️', 'এদিকে এসো! 🙈', 'না বলা মানা! 🌹', 'হ্যাঁ বলো! ❤️'];
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

    // Mobile-optimized runaway jump coordinates
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
    const rangeX = isMobile ? Math.min(window.innerWidth * 0.28, 110) : 170;
    const rangeY = isMobile ? Math.min(window.innerHeight * 0.14, 75) : 100;

    let rx = (Math.random() - 0.5) * rangeX * 2;
    let ry = (Math.random() - 0.5) * rangeY * 2;

    // Ensure it always dodges away from previous location
    if (Math.abs(rx - noPos.x) < 35) rx += rx >= 0 ? 50 : -50;
    if (Math.abs(ry - noPos.y) < 25) ry += ry >= 0 ? 40 : -40;

    setNoPos({ x: rx, y: ry });
  };

  // The Yes button grows gently with each No escape
  const yesScale = Math.min(1 + noCount * 0.08, 1.6);

  return (
    <div className="relative min-h-[calc(100vh-8rem)] flex flex-col items-center justify-center px-4 py-6 sm:py-10 max-w-5xl mx-auto w-full">
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

      {/* Grand Celestial Aura Glow in Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[35rem] h-[35rem] sm:w-[45rem] sm:h-[45rem] rounded-full bg-gradient-to-tr from-rose-600/25 via-pink-500/15 to-amber-400/20 blur-3xl pointer-events-none -z-10" />

      {/* Grand Editorial Header (No chapter numbers revealed) */}
      <div className="text-center mb-6 space-y-3">
        <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-rose-500/20 border border-rose-400/50 text-rose-200 text-xs sm:text-sm font-semibold tracking-wide shadow-md">
          <Sparkles className="w-4 h-4 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
          <span>{boyName} ও {girlName}-এর চিরন্তন উপাখ্যান</span>
          <Sparkles className="w-4 h-4 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif-bn font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-100 via-pink-200 to-amber-200 tracking-tight leading-tight drop-shadow-[0_4px_25px_rgba(244,63,94,0.5)]">
          {girlName}, তুমি কি আমার হবে?
        </h1>

        <p className="text-base sm:text-xl text-rose-200/90 max-w-2xl mx-auto font-light leading-relaxed">
          হাজারো মানুষের ভিড়ে {boyName}-এর চোখ শুধু তোমাতেই থেমেছিল।
          আজ আমার জীবনের সবচেয়ে বড় প্রশ্নটি কেবল তোমারই জন্য...
        </p>
      </div>

      {!isAccepted ? (
        /* The Grand Interactive Proposal Stage */
        <div className="w-full max-w-2xl flex flex-col items-center text-center">
          {/* Magnificent Sparkling Diamond Ring Centerpiece */}
          <div className="relative my-4 p-8 sm:p-10 rounded-[2.5rem] bg-gradient-to-b from-stone-900/95 via-rose-950/50 to-stone-900/95 border-2 border-rose-500/50 shadow-[0_0_70px_rgba(244,114,182,0.4)] flex flex-col items-center justify-center w-full">
            <div className="relative flex flex-col items-center gap-4">
              {/* Blazing diamond aura */}
              <div className="absolute inset-0 rounded-full bg-amber-300/40 blur-2xl animate-pulse pointer-events-none" />

              {/* Platinum Solitaire Diamond Ring */}
              <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full border-[5px] border-amber-300 shadow-[0_0_45px_rgba(251,191,36,0.9)] flex items-center justify-center bg-stone-950/90">
                <div
                  className="w-8 h-8 sm:w-11 sm:h-11 rotate-45 bg-gradient-to-tr from-white via-sky-200 to-amber-100 border-2 border-amber-200 shadow-[0_0_35px_#ffffff] animate-spin"
                  style={{ animationDuration: '6s' }}
                />
              </div>

              <div className="text-sm sm:text-base text-amber-200 font-serif-bn font-bold flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>{boyName}-এর ভালোবাসার হীরার আংটি</span>
              </div>
            </div>

            {/* The Big Proposal Banner */}
            <div className="w-full mt-6 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-rose-950/80 via-stone-900/95 to-rose-950/80 border border-rose-500/40 shadow-inner">
              <p className="text-xs sm:text-sm text-rose-300 font-light mb-1.5">
                "আমার প্রতিটি সকালের সোনালী রোদ, প্রতিটি সন্ধ্যার শান্তি..."
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif-bn font-black text-rose-100 leading-tight">
                {girlName}, তুমি কি আমার সারাজীবনের সঙ্গী হবে?
              </h2>
            </div>

            {/* Choice Buttons: Growing Yes & Mobile Tap Runaway No */}
            <div className="relative w-full min-h-[140px] flex flex-col items-center justify-center gap-4 pt-6">
              {/* YES BUTTON */}
              <button
                onClick={handleYes}
                style={{
                  transform: `scale(${yesScale})`,
                  transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                className="group relative px-10 sm:px-14 py-4 sm:py-5 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white font-extrabold text-xl sm:text-2xl shadow-[0_0_35px_rgba(244,63,94,0.6)] hover:shadow-[0_0_55px_rgba(244,63,94,0.8)] active:scale-90 transition-all cursor-pointer min-h-[58px] flex items-center justify-center gap-3 z-20 border-2 border-white/40"
              >
                <Heart className="w-6 h-6 text-white fill-white animate-pulse" />
                <span className="font-serif-bn font-bold">হ্যাঁ! অবশ্যই রাজি!</span>
                <Sparkles className="w-5 h-5 text-amber-200" />
              </button>

              {/* CONTINUOUS PLAYFUL RUNAWAY NO BUTTON (Escapes on Hover, Tap, PointerDown, TouchStart!) */}
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
                className="px-6 py-3 rounded-full bg-stone-800/90 hover:bg-stone-700/90 active:bg-stone-700 border border-stone-600 text-stone-300 text-sm font-serif-bn transition-colors cursor-pointer min-h-[44px] z-10 whitespace-nowrap shadow-lg select-none touch-none active:scale-95"
              >
                {playfulPhrases[noCount % playfulPhrases.length]}
              </button>

              {noCount > 0 && (
                <p className="text-xs text-rose-300 font-light italic animate-pulse">
                  ({girlName}, 'না' বাটন যতবার স্পর্শ করবে, ততবার পালাবে! 'হ্যাঁ' বাটনে চাপুন ❤️)
                </p>
              )}
            </div>

            {/* Secret Golden Star for Instant Yes */}
            <div className="pt-4">
              <button
                onClick={handleYes}
                className="text-xs text-amber-300/70 hover:text-amber-300 active:text-amber-200 transition-colors flex items-center gap-1.5 mx-auto group cursor-pointer"
                title="গোপন সম্মতি"
              >
                <Sparkles className="w-3.5 h-3.5 group-hover:rotate-90 transition-transform" />
                <span>গোপন হৃদয়ের স্বীকৃতি: "{girlName} চিরকাল {boyName}-এরই ছিল"</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Proposal Accepted in Chapter 1 - Warm Gentle Welcome & Seamless Step Forward */
        <div className="w-full max-w-2xl animate-in zoom-in-95 duration-500">
          <div className="relative p-8 sm:p-12 rounded-[2.5rem] bg-gradient-to-b from-stone-900/95 via-[#231226] to-stone-900/95 border-2 border-amber-400/80 shadow-[0_0_60px_rgba(251,191,36,0.3)] backdrop-blur-2xl text-center">
            {/* Crown Stamp */}
            <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-amber-500/20 border border-amber-400/60 text-amber-300 text-sm font-serif-bn font-bold mb-5 shadow-lg">
              <Award className="w-5 h-5 text-amber-400" />
              <span>{girlName} প্রথম প্রস্তাবে রাজি হয়েছে! ❤️</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-serif-bn font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-100 via-pink-200 to-amber-200 mb-3">
              {boyName} + {girlName}
            </h2>

            <p className="text-base sm:text-xl text-rose-200/95 font-serif-bn font-light max-w-lg mx-auto mb-6 leading-relaxed">
              "ধন্যবাদ {girlName}! তোমার এক চিলতে 'হ্যাঁ'-তে {boyName}-এর বুক শান্ত হলো। এসো, আমাদের প্রেমের স্মৃতি ও অনুভূতির প্রতিটি পৃষ্ঠা ঘুরে দেখা যাক..."
            </p>

            <div className="text-xs text-amber-300/80 mb-6 flex items-center justify-center gap-2 font-light">
              <Sparkles className="w-4 h-4 text-amber-300 animate-spin" style={{ animationDuration: '4s' }} />
              <span>পরবর্তী অনুভূতির পৃষ্ঠায় প্রবেশ করছি...</span>
            </div>

            {/* Prominent Journey forward button */}
            <button
              onClick={() => {
                romanticAudio.playBloom();
                onGoToNext();
              }}
              className="group flex items-center justify-center gap-3 px-10 sm:px-12 py-4 sm:py-5 rounded-full bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 text-white font-serif-bn font-bold text-lg sm:text-xl shadow-[0_0_35px_rgba(244,63,94,0.5)] hover:shadow-[0_0_55px_rgba(244,63,94,0.7)] active:scale-90 hover:scale-105 transition-all cursor-pointer mx-auto min-h-[58px] border-2 border-white/30"
            >
              <span>আমাদের প্রথম অনুভূতির পাতায় চলুন</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </button>
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
