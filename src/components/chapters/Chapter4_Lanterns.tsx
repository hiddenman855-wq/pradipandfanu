import React, { useState } from 'react';
import { ArrowRight, Flame, Heart, Sparkles } from 'lucide-react';
import { romanticAudio } from '../../utils/audio';

interface Chapter4Props {
  herName: string;
  onUnlockNext: () => void;
  onGoToNext: () => void;
  isUnlockedNext: boolean;
}

interface LanternItem {
  id: number;
  label: string;
  poeticNote: string;
  released: boolean;
}

export const Chapter4_Lanterns: React.FC<Chapter4Props> = ({
  herName,
  onUnlockNext,
  onGoToNext,
  isUnlockedNext,
}) => {
  const [lanterns, setLanterns] = useState<LanternItem[]>([
    {
      id: 1,
      label: 'তোমার নিষ্পাপ সারল্য',
      poeticNote: 'তোমার স্বচ্ছ মন আর মিষ্টি সারল্য আমাকে প্রতি মুহূর্তে নতুন করে প্রেমে পড়তে বাধ্য করে।',
      released: false,
    },
    {
      id: 2,
      label: 'ক্লান্তির পর পরম শান্তি',
      poeticNote: 'ব্যস্ত পৃথিবীর সব ক্লান্তি মুছে যায়, যখন দিনশেষে তোমার এক চিলতে কণ্ঠ শুনতে পাই।',
      released: false,
    },
    {
      id: 3,
      label: 'ভয়হীন নির্ভরতার আশ্রয়',
      poeticNote: 'তোমার হাতটি ধরে মনে হয়, পৃথিবীর যেকোনো ঝড় আমি এক পলকে জয় করে নিতে পারি।',
      released: false,
    },
    {
      id: 4,
      label: 'জীবনের সবচেয়ে সুন্দর আলো',
      poeticNote: 'আমার প্রতিটি অন্ধকার রাতকে দূর করে তুমি এনে দিয়েছ সোনালী ভোরের আলো।',
      released: false,
    },
    {
      id: 5,
      label: 'তুমি আছো বলেই আমি সম্পূর্ণ',
      poeticNote: 'তোমাকে ছাড়া আমার জীবনের গল্প অসম্পূর্ণ; তুমি আমার প্রার্থনার সবচেয়ে মধুর উত্তর।',
      released: false,
    },
  ]);

  const [activeMessage, setActiveMessage] = useState<LanternItem | null>(null);

  const releaseLantern = (id: number) => {
    romanticAudio.playBloom();
    const updated = lanterns.map((l) => (l.id === id ? { ...l, released: true } : l));
    setLanterns(updated);

    const releasedCount = updated.filter((l) => l.released).length;
    const current = updated.find((l) => l.id === id);
    if (current) setActiveMessage(current);

    if (releasedCount >= 3 && !isUnlockedNext) {
      onUnlockNext();
    }
  };

  const releasedCount = lanterns.filter((l) => l.released).length;

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 py-8 max-w-4xl mx-auto">
      {/* Chapter Editorial Header */}
      <div className="text-center mb-8 space-y-3">
        <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-rose-300/80 font-medium">
          <span>অধ্যায় চার</span>
          <span>·</span>
          <span>ভালোবাসার কারণ</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif-bn font-bold text-rose-100 tracking-tight leading-tight">
          কেন শুধুই তুমি?
        </h1>
        <p className="text-sm sm:text-base text-rose-200/80 max-w-lg mx-auto font-light leading-relaxed">
          {herName}, পৃথিবীর লক্ষ কোটি মানুষের মাঝে কেন আমার এই অবুঝ মন কেবল তোমাতেই সমর্পিত হলো?
        </p>
      </div>

      {/* Floating Lanterns Display Grid */}
      <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-8">
        {lanterns.map((item) => (
          <div
            key={item.id}
            onClick={() => !item.released && releaseLantern(item.id)}
            className={`relative p-4 rounded-2xl border text-center transition-all duration-700 cursor-pointer min-h-[150px] flex flex-col items-center justify-between backdrop-blur-md ${
              item.released
                ? 'bg-amber-500/10 border-amber-400/40 transform -translate-y-4 opacity-90 shadow-[0_0_25px_rgba(251,191,36,0.3)]'
                : 'bg-stone-900/40 border-stone-800 hover:border-amber-500/50 hover:bg-stone-900/70 hover:scale-105'
            }`}
          >
            {/* Soft Glowing Lantern Visual */}
            <div
              className={`w-12 h-14 rounded-t-xl rounded-b-lg border border-amber-400/50 flex flex-col items-center justify-center transition-all ${
                item.released
                  ? 'bg-gradient-to-t from-amber-400/40 via-rose-500/30 to-amber-200/20 shadow-[0_0_20px_rgba(251,191,36,0.6)] animate-bounce'
                  : 'bg-stone-800/60'
              }`}
            >
              <Flame
                className={`w-5 h-5 transition-colors ${
                  item.released ? 'text-amber-300 animate-pulse' : 'text-amber-500/60'
                }`}
              />
            </div>

            <div>
              <h3 className="text-xs sm:text-sm font-serif-bn font-semibold text-rose-100 mb-1">
                {item.label}
              </h3>
              <span className="text-[10px] text-stone-400 block">
                {item.released ? 'ফানুশ উড়ছে ✦' : 'ফানুশটি ওড়ান'}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Active Lantern Message Box */}
      {activeMessage && (
        <div className="w-full max-w-lg mb-8 p-5 rounded-2xl bg-gradient-to-r from-amber-950/40 via-stone-900/70 to-rose-950/40 border border-amber-500/30 backdrop-blur-md text-center animate-in fade-in duration-300">
          <div className="flex items-center justify-center gap-1.5 text-xs text-amber-300 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="font-semibold">{activeMessage.label}</span>
          </div>
          <p className="text-sm sm:text-base font-serif-bn text-rose-100 font-light leading-relaxed">
            "{activeMessage.poeticNote}"
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
            <span className="font-serif-bn font-semibold">পঞ্চম অধ্যায়ে চলুন (অনন্তের হিসেব - কাউন্টডাউন)</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        ) : (
          <p className="text-xs text-stone-400 font-light">
            আকাশে অন্তত ৩টি ফানুশ উড়িয়ে ভালোবাসার কারণগুলো প্রকাশ করুন ({releasedCount}/5)...
          </p>
        )}
      </div>
    </div>
  );
};
