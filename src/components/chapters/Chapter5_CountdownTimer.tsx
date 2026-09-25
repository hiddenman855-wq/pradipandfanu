import React, { useState, useEffect } from 'react';
import { ArrowRight, Heart, Clock, Sparkles, Activity } from 'lucide-react';
import { romanticAudio } from '../../utils/audio';

interface Chapter5Props {
  herName: string;
  startDate: string; // YYYY-MM-DD
  onUnlockNext: () => void;
  onGoToNext: () => void;
  isUnlockedNext: boolean;
}

// Convert numbers to Bengali digits
export const toBengaliDigits = (num: number | string): string => {
  const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return num
    .toString()
    .split('')
    .map((char) => (/[0-9]/.test(char) ? bnDigits[parseInt(char, 10)] : char))
    .join('');
};

export const Chapter5_CountdownTimer: React.FC<Chapter5Props> = ({
  herName,
  startDate,
  onUnlockNext,
  onGoToNext,
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
    <div className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 py-8 max-w-4xl mx-auto">
      {/* Chapter Editorial Header */}
      <div className="text-center mb-8 space-y-3">
        <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-rose-300/80 font-medium">
          <span>অধ্যায় পাঁচ</span>
          <span>·</span>
          <span>সময়ের হিসেব</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif-bn font-bold text-rose-100 tracking-tight leading-tight">
          অনন্তের হিসেব
        </h1>
        <p className="text-sm sm:text-base text-rose-200/80 max-w-lg mx-auto font-light leading-relaxed">
          যেদিন তোমার সাথে প্রথম দেখা হয়েছিল, সেদিন থেকে আমার জীবনের প্রতিটি সেকেন্ড কেবল তোমার নামেই স্পন্দিত হয়েছে।
        </p>
      </div>

      {/* Main Countdown / Time Counter Clock Display */}
      <div className="w-full max-w-2xl mb-8 p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-stone-900/80 via-rose-950/30 to-stone-900/90 border border-rose-500/30 backdrop-blur-xl shadow-2xl text-center">
        <div className="flex items-center justify-center gap-2 text-xs text-rose-300/80 mb-6">
          <Clock className="w-3.5 h-3.5 text-rose-400" />
          <span>প্রথম দেখার পর থেকে অতিবাহিত মুহূর্ত</span>
        </div>

        {/* 4 Block Digital Bengali Counter */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
          <div className="p-4 rounded-2xl bg-black/40 border border-rose-500/20">
            <span className="block text-3xl sm:text-4xl font-mono font-bold text-rose-100">
              {toBengaliDigits(timeData.days)}
            </span>
            <span className="text-xs text-rose-300/80 font-serif-bn">দিন</span>
          </div>

          <div className="p-4 rounded-2xl bg-black/40 border border-rose-500/20">
            <span className="block text-3xl sm:text-4xl font-mono font-bold text-rose-100">
              {toBengaliDigits(timeData.hours.toString().padStart(2, '0'))}
            </span>
            <span className="text-xs text-rose-300/80 font-serif-bn">ঘণ্টা</span>
          </div>

          <div className="p-4 rounded-2xl bg-black/40 border border-rose-500/20">
            <span className="block text-3xl sm:text-4xl font-mono font-bold text-rose-100">
              {toBengaliDigits(timeData.minutes.toString().padStart(2, '0'))}
            </span>
            <span className="text-xs text-rose-300/80 font-serif-bn">মিনিট</span>
          </div>

          <div className="p-4 rounded-2xl bg-black/40 border border-rose-500/20 ring-1 ring-rose-400/40">
            <span className="block text-3xl sm:text-4xl font-mono font-bold text-amber-300 animate-pulse">
              {toBengaliDigits(timeData.seconds.toString().padStart(2, '0'))}
            </span>
            <span className="text-xs text-rose-300/80 font-serif-bn">সেকেন্ড</span>
          </div>
        </div>

        {/* Total seconds ticker */}
        <div className="text-xs sm:text-sm text-rose-200/90 font-light flex items-center justify-center gap-1.5 py-2 px-4 rounded-full bg-rose-500/10 border border-rose-500/20 inline-flex">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>
            সর্বমোট <strong className="font-mono text-amber-200">{toBengaliDigits(timeData.totalSeconds.toLocaleString())}</strong> সেকেন্ড ধরে তোমাকে ভালোবেসে চলেছি...
          </span>
        </div>
      </div>

      {/* Interactive Heartbeat Synchronization Button */}
      <div className="w-full max-w-md text-center mb-8">
        <button
          onClick={handleHeartbeatSync}
          className={`group relative px-6 py-4 rounded-2xl border transition-all cursor-pointer w-full flex items-center justify-center gap-3 backdrop-blur-md ${
            isHeartbeatActive
              ? 'bg-rose-600/40 border-rose-400 scale-98 shadow-[0_0_35px_rgba(244,63,94,0.7)]'
              : 'bg-stone-900/60 border-rose-500/30 hover:border-rose-400 hover:bg-stone-900/80'
          }`}
        >
          <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-rose-500/20 ${isHeartbeatActive ? 'scale-125' : ''}`}>
            <Heart
              className={`w-6 h-6 text-rose-400 fill-rose-400 transition-transform ${
                isHeartbeatActive ? 'scale-125 text-rose-300 fill-rose-300' : 'group-hover:scale-110'
              }`}
            />
          </div>
          <div className="text-left">
            <div className="text-sm font-serif-bn font-semibold text-rose-100 flex items-center gap-2">
              <span>হৃদস্পন্দন অনুভব করুন</span>
              <Activity className="w-4 h-4 text-rose-400 animate-pulse" />
            </div>
            <span className="text-xs text-stone-400 font-light">
              এখানে চাপুন ও হৃদয়ের স্পন্দন শুনুন
            </span>
          </div>
        </button>
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
            <span className="font-serif-bn font-semibold">ষষ্ঠ অধ্যায়ে চলুন (একটি গোপন চিঠি)</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        ) : (
          <p className="text-xs text-stone-400 font-light">
            অন্তত ২ বার হৃদস্পন্দন স্পর্শ করে পরের অধ্যায়ের দুয়ার খুলুন ({pulseCount}/2)...
          </p>
        )}
      </div>
    </div>
  );
};
