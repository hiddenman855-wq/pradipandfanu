import React, { useState } from 'react';
import { Heart, Sparkles, Award, Share2, RotateCcw, CheckCircle2 } from 'lucide-react';
import { romanticAudio } from '../../utils/audio';

interface Chapter7Props {
  herName: string;
  onTriggerFireworks: () => void;
}

export const Chapter7_GrandProposal: React.FC<Chapter7Props> = ({
  herName,
  onTriggerFireworks,
}) => {
  const [isBoxOpen, setIsBoxOpen] = useState<boolean>(false);
  const [accepted, setAccepted] = useState<boolean>(false);
  const [noCount, setNoCount] = useState<number>(0);
  const [noPos, setNoPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  const playfulNoTexts = [
    'না',
    'সত্যি না বলবে? 🥺',
    'একটু ভেবে দেখো! 💔',
    'তোমার মন কিন্তু হ্যাঁ বলছে! 🥰',
    'এত সহজে হার মানব না! 🌹',
    'অবশ্যই হ্যাঁ! ❤️',
  ];

  const handleOpenBox = () => {
    if (!isBoxOpen) {
      romanticAudio.playBloom();
      setIsBoxOpen(true);
    }
  };

  const handleAcceptYes = () => {
    setAccepted(true);
    romanticAudio.playCelebrationFanfare();
    onTriggerFireworks();
  };

  const handleNoInteraction = () => {
    romanticAudio.playChime(0.85);
    setNoCount((prev) => prev + 1);

    // Playful random movement on screen
    const randomX = (Math.random() - 0.5) * 140;
    const randomY = (Math.random() - 0.5) * 90;
    setNoPos({ x: randomX, y: randomY });

    // If she clicked No 5 times, it converts to Yes
    if (noCount >= 4) {
      handleAcceptYes();
    }
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

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 py-8 max-w-4xl mx-auto">
      {/* Chapter Editorial Header */}
      <div className="text-center mb-6 space-y-3">
        <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-amber-300 font-medium">
          <Sparkles className="w-3.5 h-3.5" />
          <span>অধ্যায় সাত · অনন্তকালের প্রস্তাব</span>
          <Sparkles className="w-3.5 h-3.5" />
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif-bn font-bold text-rose-100 tracking-tight leading-tight">
          জীবনের সবচেয়ে সুন্দর প্রশ্ন
        </h1>
        <p className="text-sm sm:text-base text-rose-200/80 max-w-lg mx-auto font-light leading-relaxed">
          {herName}, বহু বছরের প্রতীক্ষা আর অনুভূতির সব সুর আজ এই এক বিন্দুতে এসে দাঁড়িয়েছে।
        </p>
      </div>

      {!accepted ? (
        /* Ring Box & The Proposal Question */
        <div className="w-full max-w-lg flex flex-col items-center text-center">
          {/* Interactive 3D Ring Box */}
          <div
            onClick={handleOpenBox}
            className="group relative cursor-pointer my-6 p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-rose-950/60 via-stone-900/80 to-purple-950/60 border border-rose-500/40 shadow-[0_0_40px_rgba(244,114,182,0.3)] hover:shadow-[0_0_50px_rgba(244,114,182,0.5)] transition-all duration-500 flex flex-col items-center justify-center w-full min-h-[220px]"
          >
            {!isBoxOpen ? (
              <div className="flex flex-col items-center gap-4 animate-float-gentle">
                {/* Velvet Jewelry Box Icon */}
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-rose-900 via-rose-700 to-amber-700 border-2 border-amber-300/60 flex items-center justify-center shadow-2xl group-hover:scale-105 transition-transform">
                  <Heart className="w-10 h-10 text-amber-200 fill-amber-200" />
                </div>
                <div>
                  <h3 className="text-lg font-serif-bn font-semibold text-rose-100 mb-1">
                    উপহারটি স্পর্শ করে খুলুন
                  </h3>
                  <span className="text-xs text-stone-400 font-light">
                    আপনার জন্য একটি বিশেষ সারপ্রাইজ অপেক্ষা করছে...
                  </span>
                </div>
              </div>
            ) : (
              /* Opened Ring Box with Sparkling Ring */
              <div className="flex flex-col items-center gap-3 animate-in zoom-in-75 duration-700">
                <div className="relative">
                  {/* Glowing halo behind ring */}
                  <div className="absolute inset-0 rounded-full bg-amber-400/30 blur-xl animate-pulse" />
                  
                  {/* Diamond Proposal Ring Art */}
                  <div className="relative w-24 h-24 rounded-full border-4 border-amber-300/90 shadow-[0_0_25px_rgba(251,191,36,0.8)] flex items-center justify-center bg-stone-950/80">
                    <div className="w-6 h-6 rotate-45 bg-gradient-to-tr from-white via-sky-200 to-amber-100 border border-amber-200 shadow-[0_0_15px_#ffffff] animate-spin" style={{ animationDuration: '8s' }} />
                  </div>
                </div>

                <div className="text-xs text-amber-300 font-medium flex items-center gap-1.5 mt-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>অনন্ত ভালোবাসার বন্ধন</span>
                </div>
              </div>
            )}
          </div>

          {/* The Big Question Banner */}
          {isBoxOpen && (
            <div className="space-y-6 animate-in fade-in duration-500 w-full">
              <div className="p-6 rounded-3xl bg-gradient-to-r from-rose-900/40 via-stone-900/80 to-rose-900/40 border border-rose-500/40 backdrop-blur-md">
                <p className="text-xs sm:text-sm text-rose-300 font-light mb-2">
                  {herName}, হাতটি বাড়িয়ে দিলে আর কখনো ছাড়ব না...
                </p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif-bn font-bold text-rose-100 leading-tight">
                  তুমি কি আমার সারাজীবনের সঙ্গী হবে?
                </h2>
              </div>

              {/* Action Buttons: Yes / Playful No / Secret Hidden Yes */}
              <div className="relative flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                {/* Primary Glowing 'YES' Button */}
                <button
                  onClick={handleAcceptYes}
                  className="group relative px-10 py-4 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white font-bold text-lg sm:text-xl shadow-[0_0_35px_rgba(244,63,94,0.6)] hover:shadow-[0_0_55px_rgba(244,63,94,0.8)] hover:scale-105 active:scale-95 transition-all cursor-pointer min-h-[52px] min-w-[200px] flex items-center justify-center gap-2 overflow-hidden"
                >
                  <Heart className="w-5 h-5 text-white fill-white animate-pulse" />
                  <span className="font-serif-bn">হ্যাঁ, সারাজীবনের জন্য!</span>
                  <Sparkles className="w-4 h-4 text-amber-200" />
                </button>

                {/* Playful Runaway 'NO' Button */}
                <button
                  onClick={handleNoInteraction}
                  onMouseEnter={handleNoInteraction}
                  onTouchStart={handleNoInteraction}
                  style={{
                    transform: `translate(${noPos.x}px, ${noPos.y}px)`,
                    transition: 'transform 0.25s ease-out',
                  }}
                  className="px-6 py-3 rounded-full bg-stone-800/80 hover:bg-stone-700/80 border border-stone-600/60 text-stone-300 text-sm font-serif-bn transition-all cursor-pointer min-h-[44px]"
                >
                  {playfulNoTexts[Math.min(noCount, playfulNoTexts.length - 1)]}
                </button>
              </div>

              {/* Hidden Golden Secret 'YES' Button */}
              <div className="pt-6">
                <button
                  onClick={handleAcceptYes}
                  className="text-[11px] text-amber-400/50 hover:text-amber-300 transition-colors flex items-center gap-1 mx-auto group cursor-pointer"
                  title="গোপন শপথ"
                >
                  <Sparkles className="w-3 h-3 group-hover:rotate-45 transition-transform" />
                  <span>গোপন হৃদয়ের সম্মতি: "আমি কেবল তোমারই"</span>
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Grand Proposal Accepted - Eternal Love Certificate */
        <div className="w-full max-w-xl animate-in zoom-in-95 duration-700">
          <div className="relative p-6 sm:p-10 rounded-3xl bg-gradient-to-b from-stone-900/95 via-[#1a0e1b] to-stone-900/95 border-2 border-amber-400/60 shadow-[0_0_60px_rgba(251,191,36,0.3)] backdrop-blur-2xl text-center">
            {/* Soft decorative header stamp */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-400/40 text-amber-300 text-xs font-serif-bn font-semibold mb-6">
              <Award className="w-4 h-4 text-amber-400" />
              <span>চিরন্তন ভালোবাসার অঙ্গীকারপত্র</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-serif-bn font-bold text-rose-100 mb-2">
              অভিনন্দন, {herName}! ❤️
            </h2>
            <p className="text-xs sm:text-sm text-rose-300/80 font-light mb-6">
              আজকের এই পবিত্র ক্ষণে আমাদের দুটি হৃদয় চিরদিনের মতো এক হয়ে গেল।
            </p>

            {/* Official Pledge Card */}
            <div className="p-5 rounded-2xl bg-black/40 border border-rose-500/20 text-left font-serif-bn text-rose-100 text-xs sm:text-sm space-y-3 leading-relaxed mb-6 font-light">
              <p>
                <strong className="text-amber-200 font-normal">অঙ্গীকার:</strong> "জীবনের প্রতিটি বসন্তে, প্রতিটি শীতের কুয়াশায়, আনন্দের দিনে কিংবা বেদনার অন্ধকারে... আমি সর্বদা তোমার ছায়া হয়ে সাথে থাকব।"
              </p>
              <div className="pt-2 border-t border-rose-900/40 flex justify-between items-center text-[11px] text-stone-400">
                <span>প্রস্তাবের তারিখ: {todayBengaliDate}</span>
                <span className="text-rose-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> চিরন্তন চুক্তি
                </span>
              </div>
            </div>

            {/* Post-Proposal Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => {
                  romanticAudio.playCelebrationFanfare();
                  onTriggerFireworks();
                }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-600/80 hover:bg-rose-500 text-white text-xs font-medium transition-colors cursor-pointer min-h-[44px]"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>আতশবাজি আবার দেখুন</span>
              </button>

              <button
                onClick={handleCopyLink}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-rose-200 text-xs font-medium transition-colors cursor-pointer border border-rose-500/20 min-h-[44px]"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{copiedLink ? 'লিংক কপি হয়েছে!' : 'লিংক শেয়ার করুন'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
