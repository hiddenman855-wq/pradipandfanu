import React, { useState, useEffect } from 'react';
import { BackgroundEffects } from './components/BackgroundEffects';
import { FireworksCanvas } from './components/FireworksCanvas';
import { HeaderNav } from './components/HeaderNav';
import { CustomizeModal } from './components/CustomizeModal';
import { romanticAudio } from './utils/audio';

import { Chapter1_TheProposal } from './components/chapters/Chapter1_TheProposal';
import { Chapter2_Sensations } from './components/chapters/Chapter2_Sensations';
import { Chapter3_FrozenMoment } from './components/chapters/Chapter3_FrozenMoment';
import { Chapter4_Constellation } from './components/chapters/Chapter4_Constellation';
import { Chapter5_Lanterns } from './components/chapters/Chapter5_Lanterns';
import { Chapter6_CountdownTimer } from './components/chapters/Chapter6_CountdownTimer';
import { Chapter7_SecretLetterAndCertificate } from './components/chapters/Chapter7_SecretLetterAndCertificate';

export default function App() {
  const urlParams = new URLSearchParams(window.location.search);
  const storedGirl = localStorage.getItem('chiron_girl');
  const storedBoy = localStorage.getItem('chiron_boy');
  const defaultGirl = storedGirl && storedGirl !== 'অনু' ? storedGirl : 'অনিষা';
  const defaultBoy = storedBoy && storedBoy !== 'প্রদীপ' ? storedBoy : 'জিৎ';

  const initialGirl = urlParams.get('girl') || urlParams.get('name') || defaultGirl;
  const initialBoy = urlParams.get('boy') || defaultBoy;
  const initialDate = urlParams.get('date') || localStorage.getItem('chiron_date') || '2024-02-14';

  const [girlName, setGirlName] = useState<string>(initialGirl);
  const [boyName, setBoyName] = useState<string>(initialBoy);
  const [startDate, setStartDate] = useState<string>(initialDate);

  // Chapter tracking (1 to 7)
  const [currentChapter, setCurrentChapter] = useState<number>(1);
  const [unlockedChapter, setUnlockedChapter] = useState<number>(1);
  const [isProposalAccepted, setIsProposalAccepted] = useState<boolean>(false);

  // Audio and effects state
  const [isMusicPlaying, setIsMusicPlaying] = useState<boolean>(false);
  const [isFireworksActive, setIsFireworksActive] = useState<boolean>(false);
  const [isCustomizeOpen, setIsCustomizeOpen] = useState<boolean>(false);

  // Auto-start ambient soundtrack on first user interaction
  useEffect(() => {
    const handleFirstGesture = () => {
      if (!romanticAudio.getIsPlaying()) {
        romanticAudio.initContext();
        romanticAudio.startBackgroundMusic();
        setIsMusicPlaying(true);
      }
      window.removeEventListener('click', handleFirstGesture);
      window.removeEventListener('touchstart', handleFirstGesture);
    };

    window.addEventListener('click', handleFirstGesture);
    window.addEventListener('touchstart', handleFirstGesture);

    return () => {
      window.removeEventListener('click', handleFirstGesture);
      window.removeEventListener('touchstart', handleFirstGesture);
    };
  }, []);

  const handleToggleMusic = () => {
    const playing = romanticAudio.toggleBackgroundMusic();
    setIsMusicPlaying(playing);
  };

  const handleProposalYes = () => {
    setIsProposalAccepted(true);
    // Sequential unlock: only unlock the next chapter (Chapter 2)!
    setUnlockedChapter((prev) => Math.max(prev, 2));
  };

  const handleUnlockNext = (nextChap: number) => {
    if (nextChap > unlockedChapter) {
      setUnlockedChapter(nextChap);
    }
  };

  const handleGoToChapter = (chapterNum: number) => {
    // She cannot jump forward beyond her unlocked chapter
    if (chapterNum <= unlockedChapter) {
      setCurrentChapter(chapterNum);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSaveSettings = (newGirl: string, newBoy: string, newDate: string) => {
    setGirlName(newGirl);
    setBoyName(newBoy);
    setStartDate(newDate);
    localStorage.setItem('chiron_girl', newGirl);
    localStorage.setItem('chiron_boy', newBoy);
    localStorage.setItem('chiron_date', newDate);
  };

  const handleTriggerFireworks = () => {
    setIsFireworksActive(true);
  };

  return (
    <div className="relative min-h-screen bg-[#120a13] text-[#fbf0f0] font-sans selection:bg-rose-500/30 selection:text-rose-100 flex flex-col justify-between overflow-x-hidden">
      {/* Background Floating Petals, Stars & Ambient Glow */}
      <BackgroundEffects />

      {/* Full-screen Fireworks & Confetti Canvas */}
      <FireworksCanvas isActive={isFireworksActive} />

      {/* Sticky Header Navigation */}
      <HeaderNav
        isMusicPlaying={isMusicPlaying}
        onToggleMusic={handleToggleMusic}
        onOpenSettings={() => setIsCustomizeOpen(true)}
        girlName={girlName}
        boyName={boyName}
      />

      {/* Main Content: 7 Sequential Grand Chapters starting with the Proposal */}
      <main className="relative z-10 flex-1 flex flex-col justify-center py-4">
        {currentChapter === 1 && (
          <Chapter1_TheProposal
            girlName={girlName}
            boyName={boyName}
            onAcceptYes={handleProposalYes}
            onGoToNext={() => handleGoToChapter(2)}
            isAccepted={isProposalAccepted}
          />
        )}

        {currentChapter === 2 && (
          <Chapter2_Sensations
            girlName={girlName}
            boyName={boyName}
            onUnlockNext={() => handleUnlockNext(3)}
            onGoToNext={() => handleGoToChapter(3)}
            onGoToPrev={() => handleGoToChapter(1)}
            isUnlockedNext={unlockedChapter >= 3}
          />
        )}

        {currentChapter === 3 && (
          <Chapter3_FrozenMoment
            girlName={girlName}
            boyName={boyName}
            onUnlockNext={() => handleUnlockNext(4)}
            onGoToNext={() => handleGoToChapter(4)}
            onGoToPrev={() => handleGoToChapter(2)}
            isUnlockedNext={unlockedChapter >= 4}
          />
        )}

        {currentChapter === 4 && (
          <Chapter4_Constellation
            girlName={girlName}
            boyName={boyName}
            onUnlockNext={() => handleUnlockNext(5)}
            onGoToNext={() => handleGoToChapter(5)}
            onGoToPrev={() => handleGoToChapter(3)}
            isUnlockedNext={unlockedChapter >= 5}
          />
        )}

        {currentChapter === 5 && (
          <Chapter5_Lanterns
            girlName={girlName}
            boyName={boyName}
            onUnlockNext={() => handleUnlockNext(6)}
            onGoToNext={() => handleGoToChapter(6)}
            onGoToPrev={() => handleGoToChapter(4)}
            isUnlockedNext={unlockedChapter >= 6}
          />
        )}

        {currentChapter === 6 && (
          <Chapter6_CountdownTimer
            girlName={girlName}
            boyName={boyName}
            startDate={startDate}
            onUnlockNext={() => handleUnlockNext(7)}
            onGoToNext={() => handleGoToChapter(7)}
            onGoToPrev={() => handleGoToChapter(5)}
            isUnlockedNext={unlockedChapter >= 7}
          />
        )}

        {currentChapter === 7 && (
          <Chapter7_SecretLetterAndCertificate
            girlName={girlName}
            boyName={boyName}
            onTriggerFireworks={handleTriggerFireworks}
            onGoToPrev={() => handleGoToChapter(6)}
          />
        )}
      </main>

      {/* Poetic Footer */}
      <footer className="relative z-10 py-5 text-center text-xs text-rose-300/70 border-t border-rose-900/30 backdrop-blur-md">
        <p className="font-serif-bn font-light">
          {boyName} ও {girlName} · "যেখানে কথার সমাপ্তি, সেখানেই অনন্ত ভালোবাসার শুরু।"
        </p>
      </footer>

      {/* Personalization Settings Modal */}
      <CustomizeModal
        isOpen={isCustomizeOpen}
        onClose={() => setIsCustomizeOpen(false)}
        girlName={girlName}
        boyName={boyName}
        startDate={startDate}
        onSave={handleSaveSettings}
      />
    </div>
  );
}
