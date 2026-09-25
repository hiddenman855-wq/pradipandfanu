import React, { useState } from 'react';
import { ArrowRight, Flame, Sparkles } from 'lucide-react';
import { romanticAudio } from '../../utils/audio';

interface Chapter5LanternsProps {
  girlName: string;
  boyName: string;
  onUnlockNext: () => void;
  onGoToNext: () => void;
  onGoToPrev?: () => void;
  isUnlockedNext: boolean;
}

interface LanternItem {
  id: number;
  label: string;
  poeticNote: string;
  released: boolean;
}

export const Chapter5_Lanterns: React.FC<Chapter5LanternsProps> = ({
  girlName,
  boyName,
  onUnlockNext,
  onGoToNext,
  onGoToPrev,
  isUnlockedNext,
}) => {
  const [lanterns, setLanterns] = useState<LanternItem[]>([
    {
      id: 1,
      label: `${girlName}-র নিষ্পাপ সারল্য`,
      poeticNote: `${girlName}-র স্বচ্ছ মন আর মিষ্টি সারল্য ${boyName}-কে প্রতি মুহূর্তে নতুন করে প্রেমে পড়তে বাধ্য করে।`,
      released: false,
    },
    {
      id: 2,
      label: 'ক্লান্তির পর পরম শান্তি',
      poeticNote: `ব্যস্ত পৃথিবীর সব ক্লান্তি মুছে যায়, যখন দিনশেষে ${girlName}-র এক চিলতে মিষ্টি কণ্ঠ শুনতে পাই।`,
      released: false,
    },
    {
      id: 3,
      label: 'ভয়হীন নির্ভরতার আশ্রয়',
      poeticNote: `${girlName}-র হাতটি ধরে মনে হয়, পৃথিবীর যেকোনো কঠিন লড়াই ${boyName} হাসিমুখে জয় করে নিতে পারে।`,
      released: false,
    },
    {
      id: 4,
      label: 'জীবনের সবচেয়ে সুন্দর আলো',
      poeticNote: `${boyName}-এর প্রতিটি অন্ধকার রাতকে দূর করে তুমি এনে দিয়েছ সোনালী ভোরের স্নিগ্ধ আলো।`,
      released: false,
    },
    {
      id: 5,
      label: 'তুমি আছো বলেই আমি সম্পূর্ণ',
      poeticNote: `${girlName}-কে ছাড়া ${boyName}-এর জীবনের গল্প অসম্পূর্ণ; তুমি আমার প্রার্থনার সবচেয়ে মধুর উত্তর।`,
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
    <div className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 py-8 sm:py-12 max-w-5xl mx-auto w-full">
      {/* Chapter Editorial Header */}
      <div className="text-center mb-8 space-y-3">
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-rose-300 font-medium">
          <span>হৃদয়ের কথা</span>
          <span>·</span>
          <span>ভালোবাসার গভীর কারণ</span>
        </div>
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif-bn font-extrabold text-rose-100 tracking-tight leading-tight">
          কেন শুধুই {girlName}?
        </h2>
        <p className="text-sm sm:text-lg text-rose-200/90 max-w-xl mx-auto font-light leading-relaxed">
          {girlName}, পৃথিবীর লক্ষ কোটি মানুষের মাঝে কেন {boyName}-এর এই অবুঝ মন কেবল তোমাতেই সমর্পিত হলো?
        </p>
      </div>

      {/* Floating Lanterns Display Grid */}
      <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-5 mb-8">
        {lanterns.map((item) => (
          <div
            key={item.id}
            onClick={() => !item.released && releaseLantern(item.id)}
            className={`relative p-5 rounded-3xl border-2 text-center transition-all duration-700 cursor-pointer min-h-[170px] sm:min-h-[190px] flex flex-col items-center justify-between backdrop-blur-xl ${
              item.released
                ? 'bg-amber-500/15 border-amber-400/60 transform -translate-y-4 opacity-95 shadow-[0_0_35px_rgba(251,191,36,0.4)]'
                : 'bg-stone-900/50 border-stone-800 hover:border-amber-500/60 hover:bg-stone-900/80 hover:scale-105 shadow-lg'
            }`}
          >
            {/* Glowing Lantern Visual */}
            <div
              className={`w-14 h-16 rounded-t-2xl rounded-b-xl border-2 border-amber-400/60 flex flex-col items-center justify-center transition-all ${
                item.released
                  ? 'bg-gradient-to-t from-amber-400/50 via-rose-500/40 to-amber-200/30 shadow-[0_0_25px_rgba(251,191,36,0.7)] animate-bounce'
                  : 'bg-stone-800/80'
              }`}
            >
              <Flame
                className={`w-6 h-6 transition-colors ${
                  item.released ? 'text-amber-200 animate-pulse' : 'text-amber-500/70'
                }`}
              />
            </div>

            <div>
              <h3 className="text-xs sm:text-sm font-serif-bn font-bold text-rose-100 mb-1">
                {item.label}
              </h3>
              <span className="text-[11px] text-stone-400 block">
                {item.released ? 'ফানুশ উড়ছে ✦' : 'ফানুশটি ওড়ান'}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Active Lantern Message Box */}
      {activeMessage && (
        <div className="w-full max-w-xl mb-8 p-6 rounded-3xl bg-gradient-to-r from-amber-950/50 via-stone-900/85 to-rose-950/50 border-2 border-amber-500/40 backdrop-blur-xl text-center animate-in fade-in duration-300 shadow-xl">
          <div className="flex items-center justify-center gap-1.5 text-xs sm:text-sm text-amber-300 mb-2">
            <Sparkles className="w-4 h-4" />
            <span className="font-bold">{activeMessage.label}</span>
          </div>
          <p className="text-base sm:text-lg font-serif-bn text-rose-100 font-light leading-relaxed">
            "{activeMessage.poeticNote}"
          </p>
        </div>
      )}

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
          <span>সময়ের জীবন্ত হিসেব দেখুন</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
        </button>
      </div>
    </div>
  );
};
