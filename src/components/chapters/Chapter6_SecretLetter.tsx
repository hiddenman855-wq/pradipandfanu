import React, { useState } from 'react';
import { ArrowRight, Mail, Sparkles, Heart } from 'lucide-react';
import { romanticAudio } from '../../utils/audio';

interface Chapter6Props {
  herName: string;
  onUnlockNext: () => void;
  onGoToNext: () => void;
  isUnlockedNext: boolean;
}

export const Chapter6_SecretLetter: React.FC<Chapter6Props> = ({
  herName,
  onUnlockNext,
  onGoToNext,
  isUnlockedNext,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpenEnvelope = () => {
    if (!isOpen) {
      romanticAudio.playWaxSealCrack();
      setIsOpen(true);
      if (!isUnlockedNext) {
        onUnlockNext();
      }
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 py-8 max-w-4xl mx-auto">
      {/* Chapter Editorial Header */}
      <div className="text-center mb-8 space-y-3">
        <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-rose-300/80 font-medium">
          <span>অধ্যায় ছয়</span>
          <span>·</span>
          <span>গোপন অনুভূতির চিঠি</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif-bn font-bold text-rose-100 tracking-tight leading-tight">
          হৃদয়ের সিলমোহর করা চিঠি
        </h1>
        <p className="text-sm sm:text-base text-rose-200/80 max-w-lg mx-auto font-light leading-relaxed">
          {herName}, কিছু অনুভূতি এতটাই গভীর যে তা মুখে বলা যায় না; তা কেবল হৃদয়ের রক্তিম রঙে লিখে রাখতে হয়।
        </p>
      </div>

      {/* Wax-Sealed Envelope / Letter Container */}
      <div className="w-full max-w-xl mb-8">
        {!isOpen ? (
          /* Sealed Envelope View */
          <div
            onClick={handleOpenEnvelope}
            className="group relative cursor-pointer p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-rose-950/70 via-stone-900/90 to-purple-950/60 border border-rose-500/40 shadow-[0_0_35px_rgba(244,114,182,0.25)] hover:border-rose-400 hover:shadow-[0_0_45px_rgba(244,114,182,0.4)] transition-all duration-500 text-center flex flex-col items-center justify-center min-h-[300px]"
          >
            {/* Soft envelope flap graphics */}
            <div className="w-16 h-16 rounded-full bg-rose-900/50 border border-rose-400/40 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <Mail className="w-8 h-8 text-rose-300" />
            </div>

            <h3 className="text-xl sm:text-2xl font-serif-bn font-bold text-rose-100 mb-2">
              কেবল {herName}-এর জন্য একটি চিঠি
            </h3>
            <p className="text-xs text-rose-300/80 font-light mb-6">
              মোমের লাল সিলমোহরটি ভেঙে চিঠিটি উন্মোচন করুন...
            </p>

            {/* 3D Wax Seal Button */}
            <div className="relative group/seal w-16 h-16 rounded-full bg-gradient-to-br from-rose-600 to-rose-900 border-2 border-amber-300/80 shadow-[0_4px_20px_rgba(225,29,72,0.7)] flex items-center justify-center animate-pulse">
              <Heart className="w-8 h-8 text-amber-200 fill-amber-200 filter drop-shadow" />
              <div className="absolute inset-0 rounded-full border border-amber-200/40 pointer-events-none" />
            </div>
            <span className="mt-3 text-[11px] text-amber-300/80 font-serif-bn">সিলমোহর স্পর্শ করুন</span>
          </div>
        ) : (
          /* Unfolded Parchment Love Letter View */
          <div className="relative p-6 sm:p-10 rounded-3xl bg-[#1c121e]/95 border border-rose-500/40 shadow-2xl backdrop-blur-xl animate-in zoom-in-95 duration-500 text-left">
            {/* Watermark ribbon header */}
            <div className="flex items-center justify-between pb-4 border-b border-rose-900/40 text-xs text-rose-300/70 mb-6">
              <span className="font-serif-bn font-medium">চিরন্তন প্রেমের পাণ্ডুলিপি</span>
              <span className="flex items-center gap-1 text-amber-300">
                <Sparkles className="w-3.5 h-3.5" />
                সিলমোহর উন্মুক্ত
              </span>
            </div>

            {/* Poetic Letter Body */}
            <div className="space-y-4 font-serif-bn text-rose-100 text-sm sm:text-base leading-relaxed font-light">
              <p className="text-lg sm:text-xl font-bold text-rose-200">
                প্রিয় {herName},
              </p>

              <p>
                শব্দের ভিড়ে মনের সব কথা কখনো পুরোপুরি বলা যায় না। তবুও আজ এই নীরব রাতে, যখন চারপাশ শান্ত, আমার হৃদয়ের প্রতিটি ধুকপুকানি কেবল একটা কথাই বলতে চায়।
              </p>

              <p>
                তুমি যখন প্রথম আমার জীবনে এসেছিলে, ভাবিনি যে পৃথিবীর সবচেয়ে সুন্দর অনুভূতির নাম হবে "তুমি"। তোমার এক চিলতে হাসি আমার ক্লান্ত দিনের সমস্ত ভার ভুলিয়ে দেয়। তোমার নিষ্পাপ দুটি চোখ আমাকে শেখায় কীভাবে নিঃশর্ত ভালোবাসতে হয়।
              </p>

              <p>
                আমি কোনো রূপকথার নিখুঁত গল্প দিতে পারব না হয়তো, তবে কথা দিচ্ছি—পৃথিবীর যেকোনো ঝড়ে তোমার হাতটি কখনো আলগা হতে দেব না। তোমার সুখে যেমন পাশে থাকব, তোমার কান্নার ক্ষণেও শক্ত ছায়া হয়ে দাঁড়িয়ে থাকব।
              </p>

              <p className="text-base sm:text-lg font-medium text-amber-200 pt-2">
                চিঠির ভাষা এখানেই শেষ হচ্ছে... কারণ এবার আমার জীবনের সবচেয়ে বড় প্রশ্নটি তোমাকে করতে চাই।
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-rose-900/40 flex justify-between items-center text-xs text-rose-300/70">
              <span>ইতি, তোমার চিরকালের আপনজন</span>
              <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
            </div>
          </div>
        )}
      </div>

      {/* Unlock / Proceed to Grand Proposal */}
      <div className="text-center space-y-3">
        {isOpen && (
          <button
            onClick={() => {
              romanticAudio.playBloom();
              onGoToNext();
            }}
            className="group flex items-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 text-white font-medium text-sm sm:text-base shadow-[0_0_35px_rgba(244,63,94,0.5)] hover:shadow-[0_0_45px_rgba(244,63,94,0.7)] hover:scale-105 active:scale-95 transition-all cursor-pointer min-h-[48px]"
          >
            <span className="font-serif-bn font-semibold">সপ্তম অধ্যায়ে চলুন (জীবনের সবচেয়ে সুন্দর প্রশ্ন)</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        )}
      </div>
    </div>
  );
};
