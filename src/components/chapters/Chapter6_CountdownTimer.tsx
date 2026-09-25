import React, { useState, useEffect } from 'react';
import { ArrowRight, Heart, Clock, Sparkles, Activity } from 'lucide-react';
import { romanticAudio } from '../../utils/audio';

interface Chapter6CountdownProps {
  girlName: string;
  boyName: string;
  startDate: string;
  onUnlockNext: () => void;
  onGoToNext: () => void;
  onGoToPrev?: () => void;
  isUnlockedNext: boolean;
}

export const toBengaliDigits = (num: number | string): string => {
  const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return num
    .toString()
    .split('')
    .map((char) => (/[0-9]/.test(char) ? bnDigits[parseInt(char, 10)] : char))
    .join('');
};

export const Chapter6_CountdownTimer: React.FC<Chapter6CountdownProps> = ({
  girlName,
  boyName,
  startDate,
  onUnlockNext,
  onGoToNext,
  onGoToPrev,
  isUnlockedNext,
}) => {
  const [timeData, setTimeData] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalSeconds: 0,
  });

  const [isHeartbeatActive, setIsHeartbeatActive] = useState<boolean>(false);
  const [pulseCount, setPulseCount] = useState<number>(0);

  useEffect(() => {
    const calculateTime = () => {
      const start = new Date(startDate).getTime();
      const now = new Date().getTime();
      const diff = Math.max(0, now - start);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      const totalSeconds = Math.floor(diff / 1000);

      setTimeData({ days, hours, minutes, seconds, totalSeconds });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [startDate]);

  const handleHeartbeatSync = () => {
    setIsHeartbeatActive(true);
    romanticAudio.playHeartbeat();
    setPulseCount((prev) => {
      const next = prev + 1;
      if (next >= 2 && !isUnlockedNext) {
        onUnlockNext();
      }
      return next;
    });

    setTimeout(() => {
      setIsHeartbeatActive(false);
    }, 600);
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 py-8 sm:py-12 max-w-5xl mx-auto w-full">
      {/* Chapter Editorial Header */}
      <div className="text-center mb-8 space-y-3">
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-rose-300 font-medium">
          <span>সময়ের জীবন্ত হিসেব</span>
          <span>·</span>
          <span>অনন্তের প্রতিটি মুহূর্ত</span>
        </div>
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif-bn font-extrabold text-rose-100 tracking-tight leading-tight">
          অনন্তের হিসেব
        </h2>
        <p className="text-sm sm:text-lg text-rose-200/90 max-w-xl mx-auto font-light leading-relaxed">
          যেদিন {girlName}-এর সাথে প্রথম দেখা হয়েছিল, সেদিন থেকে {boyName}-এর জীবনের প্রতিটি সেকেন্ড কেবল তোমার নামেই স্পন্দিত হয়েছে।
        </p>
      </div>

      {/* Main Countdown / Time Counter Clock Display */}
      <div className="w-full max-w-3xl mb-8 p-7 sm:p-10 rounded-[2.5rem] bg-gradient-to-b from-stone-900/90 via-rose-950/40 to-stone-900/95 border-2 border-rose-500/40 backdrop-blur-2xl shadow-2xl text-center">
        <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-rose-300/90 mb-6">
          <Clock className="w-4 h-4 text-rose-400" />
          <span>{boyName} ও {girlName}-এর প্রথম পরিচয়ের পর থেকে অতিবাহিত মুহূর্ত</span>
        </div>

        {/* 4 Block Digital Bengali Counter */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-8">
          <div className="p-5 sm:p-6 rounded-3xl bg-black/50 border border-rose-500/30">
            <span className="block text-4xl sm:text-5xl font-mono font-bold text-rose-100">
              {toBengaliDigits(timeData.days)}
            </span>
            <span className="text-sm text-rose-300 font-serif-bn font-medium mt-1 block">দিন</span>
          </div>

          <div className="p-5 sm:p-6 rounded-3xl bg-black/50 border border-rose-500/30">
            <span className="block text-4xl sm:text-5xl font-mono font-bold text-rose-100">
              {toBengaliDigits(timeData.hours.toString().padStart(2, '0'))}
            </span>
            <span className="text-sm text-rose-300 font-serif-bn font-medium mt-1 block">ঘণ্টা</span>
          </div>

          <div className="p-5 sm:p-6 rounded-3xl bg-black/50 border border-rose-500/30">
            <span className="block text-4xl sm:text-5xl font-mono font-bold text-rose-100">
              {toBengaliDigits(timeData.minutes.toString().padStart(2, '0'))}
            </span>
            <span className="text-sm text-rose-300 font-serif-bn font-medium mt-1 block">মিনিট</span>
          </div>

          <div className="p-5 sm:p-6 rounded-3xl bg-black/50 border-2 border-amber-400/60 shadow-[0_0_20px_rgba(251,191,36,0.3)]">
            <span className="block text-4xl sm:text-5xl font-mono font-bold text-amber-300 animate-pulse">
              {toBengaliDigits(timeData.seconds.toString().padStart(2, '0'))}
            </span>
            <span className="text-sm text-amber-200 font-serif-bn font-medium mt-1 block">সেকেন্ড</span>
          </div>
        </div>

        {/* Total seconds ticker */}
        <div className="text-sm sm:text-base text-rose-200 font-light flex items-center justify-center gap-2 py-2.5 px-6 rounded-full bg-rose-500/15 border border-rose-400/30 inline-flex shadow-sm">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>
            সর্বমোট <strong className="font-mono text-amber-200 font-bold">{toBengaliDigits(timeData.totalSeconds.toLocaleString())}</strong> সেকেন্ড ধরে {boyName} ভালোবাসে চলেছে {girlName}-কে...
          </span>
        </div>
      </div>

      {/* Interactive Heartbeat Synchronization Button */}
      <div className="w-full max-w-lg text-center mb-8">
        <button
          onClick={handleHeartbeatSync}
          className={`group relative px-7 py-5 rounded-3xl border-2 transition-all cursor-pointer w-full flex items-center justify-center gap-4 backdrop-blur-2xl ${
            isHeartbeatActive
              ? 'bg-rose-600/40 border-rose-400 scale-98 shadow-[0_0_45px_rgba(244,63,94,0.8)]'
              : 'bg-stone-900/70 border-rose-500/40 hover:border-rose-400 hover:bg-stone-900/90 shadow-xl'
          }`}
        >
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-rose-500/25 ${isHeartbeatActive ? 'scale-125' : ''}`}>
            <Heart
              className={`w-7 h-7 text-rose-400 fill-rose-400 transition-transform ${
                isHeartbeatActive ? 'scale-125 text-rose-200 fill-rose-200' : 'group-hover:scale-110'
              }`}
            />
          </div>
          <div className="text-left">
            <div className="text-base font-serif-bn font-bold text-rose-100 flex items-center gap-2">
              <span>{boyName}-এর হৃদস্পন্দন স্পর্শ করুন</span>
              <Activity className="w-4 h-4 text-rose-400 animate-pulse" />
            </div>
            <span className="text-xs text-stone-400 font-light">
              এখানে চাপুন ও অনুভূতির ধুকপুকানি শুনুন
            </span>
          </div>
        </button>
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
            ← পূর্ববর্তী স্মৃতিতে ফিরে যান
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
          <span>পরবর্তী বিশেষ ক্ষণে চলুন ({boyName}-এর গোপন চিঠি)</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
        </button>
      </div>
    </div>
  );
};
