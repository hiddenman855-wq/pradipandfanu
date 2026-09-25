import React from 'react';
import { Volume2, VolumeX, Sparkles, Heart } from 'lucide-react';
import { romanticAudio } from '../utils/audio';

interface HeaderNavProps {
  isMusicPlaying: boolean;
  onToggleMusic: () => void;
  onOpenSettings: () => void;
  girlName: string;
  boyName: string;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  isMusicPlaying,
  onToggleMusic,
  onOpenSettings,
  girlName,
  boyName,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#160c18]/90 border-b border-rose-900/40 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-2">
          <span className="text-lg sm:text-2xl font-serif-bn font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-pink-200 to-amber-200">
            {boyName} ও {girlName}
          </span>
          <Heart className="w-4 h-4 text-rose-400 fill-rose-400 animate-pulse" />
        </div>

        {/* Zone 2: Clean unboxed poetic motto (No chapter numbers or counts) */}
        <div className="hidden md:flex items-center gap-2 text-xs font-serif-bn text-rose-300/80 font-light italic">
          <span>একটি চিরন্তন ভালোবাসার গোপন উপাখ্যান</span>
        </div>

        {/* Zone 3: 1-2 Primary Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Music Soundtrack Player Button */}
          <button
            onClick={() => {
              onToggleMusic();
              romanticAudio.playChime(1.1);
            }}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-rose-100 bg-rose-950/70 hover:bg-rose-900/80 border border-rose-500/40 rounded-xl transition-colors cursor-pointer min-h-[42px] shadow-sm active:scale-95"
            title={isMusicPlaying ? 'রোমান্টিক সুর বন্ধ করুন' : 'রোমান্টিক সুর বাজান'}
          >
            {isMusicPlaying ? (
              <>
                <Volume2 className="w-4 h-4 text-rose-400 animate-pulse" />
                <span className="hidden sm:inline">সুর বাজছে</span>
                <span className="flex gap-0.5 items-end h-3">
                  <span className="w-0.5 h-2.5 bg-rose-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-0.5 h-3.5 bg-rose-300 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-0.5 h-2 bg-rose-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                </span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-rose-400/80" />
                <span className="hidden sm:inline">সুর বাজান</span>
              </>
            )}
          </button>

          {/* Personalization / Name Settings */}
          <button
            onClick={() => {
              romanticAudio.playChime(1.3);
              onOpenSettings();
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-amber-200 bg-amber-950/50 hover:bg-amber-900/60 border border-amber-500/40 rounded-xl transition-colors cursor-pointer min-h-[42px] shadow-sm active:scale-95"
            title="নাম ও তারিখ পরিবর্তন করুন"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="max-w-[75px] truncate">{girlName}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
