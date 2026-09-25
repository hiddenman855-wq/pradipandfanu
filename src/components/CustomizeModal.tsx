import React, { useState } from 'react';
import { X, Heart, Calendar, User, Sparkles, Copy, Check } from 'lucide-react';
import { romanticAudio } from '../utils/audio';

interface CustomizeModalProps {
  isOpen: boolean;
  onClose: () => void;
  girlName: string;
  boyName: string;
  startDate: string;
  onSave: (girl: string, boy: string, date: string) => void;
}

export const CustomizeModal: React.FC<CustomizeModalProps> = ({
  isOpen,
  onClose,
  girlName,
  boyName,
  startDate,
  onSave,
}) => {
  const [gName, setGName] = useState(girlName);
  const [bName, setBName] = useState(boyName);
  const [date, setDate] = useState(startDate);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(gName.trim() || 'অনিষা', bName.trim() || 'জিৎ', date);
    romanticAudio.playChime(1.2);
    onClose();
  };

  const handleCopyPersonalizedLink = () => {
    const url = new URL(window.location.origin + window.location.pathname);
    url.searchParams.set('girl', gName.trim() || 'অনিষা');
    url.searchParams.set('boy', bName.trim() || 'জিৎ');
    url.searchParams.set('date', date);
    navigator.clipboard.writeText(url.toString());
    setCopied(true);
    romanticAudio.playChime(1.4);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-md p-7 sm:p-8 rounded-[2rem] bg-[#1a0f1d] border-2 border-rose-500/40 shadow-2xl text-left">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-stone-400 hover:text-white rounded-full bg-stone-900/60 hover:bg-stone-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2 text-rose-300 text-xs font-serif-bn mb-1.5 font-semibold">
          <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
          <span>ভালোবাসার জুটি ও বিবরণ</span>
        </div>
        <h3 className="text-2xl font-serif-bn font-extrabold text-rose-100 mb-5">
          নাম ও স্মৃতি কাস্টমাইজেশন
        </h3>

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-rose-200 mb-1.5 flex items-center gap-1.5">
              <User className="w-4 h-4 text-rose-400" />
              মেয়ের নাম
            </label>
            <input
              type="text"
              value={gName}
              onChange={(e) => setGName(e.target.value)}
              placeholder="যেমন: অনিষা"
              className="w-full px-4 py-3 rounded-2xl bg-stone-900/90 border border-rose-500/30 text-rose-100 text-sm focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400/50"
              maxLength={30}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-rose-200 mb-1.5 flex items-center gap-1.5">
              <User className="w-4 h-4 text-rose-400" />
              ছেলের নাম
            </label>
            <input
              type="text"
              value={bName}
              onChange={(e) => setBName(e.target.value)}
              placeholder="যেমন: জিৎ"
              className="w-full px-4 py-3 rounded-2xl bg-stone-900/90 border border-rose-500/30 text-rose-100 text-sm focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400/50"
              maxLength={30}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-rose-200 mb-1.5 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-rose-400" />
              প্রথম দেখার / সম্পর্কের শুরুর তারিখ
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-stone-900/90 border border-rose-500/30 text-rose-100 text-sm focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400/50"
            />
            <span className="text-[11px] text-stone-400 mt-1 block">
              এই তারিখ অনুযায়ী অধ্যায় ৬-এর কাউন্টডাউন টাইমার হিসেব করবে।
            </span>
          </div>

          {/* Shareable Link Box */}
          <div className="p-4 rounded-2xl bg-stone-900/70 border border-stone-800 text-xs">
            <span className="text-stone-300 block mb-2 font-medium flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" />
              সরাসরি {gName}-কে পাঠানোর লিঙ্ক:
            </span>
            <button
              type="button"
              onClick={handleCopyPersonalizedLink}
              className="w-full py-2.5 px-3.5 rounded-xl bg-rose-950/70 hover:bg-rose-900/80 border border-rose-500/40 text-rose-100 flex items-center justify-center gap-2 transition-colors cursor-pointer font-medium"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>কপি করা হয়েছে!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>ব্যক্তিগত লিঙ্ক কপি করুন</span>
                </>
              )}
            </button>
          </div>

          <div className="pt-2 flex justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-xs font-medium text-stone-400 hover:text-white transition-colors cursor-pointer"
            >
              বাতিল
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 text-white text-xs font-bold hover:from-rose-500 hover:to-pink-500 transition-all cursor-pointer shadow-md"
            >
              সংরক্ষণ করুন
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
