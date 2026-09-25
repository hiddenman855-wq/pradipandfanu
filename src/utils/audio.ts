/**
 * Pure Web Audio API Synthesizer for Romantic Emotional Soundtrack & Interactive Sound Effects.
 * Reliable across all modern browsers and mobile devices without external URL dependencies or CORS blocks.
 */

class RomanticAudioManager {
  private ctx: AudioContext | null = null;
  private isMusicPlaying = false;
  private musicVolume = 0.4;
  private masterGain: GainNode | null = null;
  private musicInterval: number | null = null;
  private noteIndex = 0;

  // Initialize or resume AudioContext upon user gesture
  public initContext(): AudioContext {
    if (!this.ctx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtxClass();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.musicVolume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public setVolume(vol: number) {
    this.musicVolume = Math.max(0, Math.min(1, vol));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.musicVolume, this.ctx.currentTime, 0.1);
    }
  }

  public getIsPlaying(): boolean {
    return this.isMusicPlaying;
  }

  /**
   * Starts an emotional, ambient piano & lush synth soundtrack.
   * Progression: Fmaj9 -> Cmaj7 -> Am9 -> Gsus4 (poetic and deeply romantic).
   */
  public startBackgroundMusic() {
    if (this.isMusicPlaying) return;
    const ctx = this.initContext();
    this.isMusicPlaying = true;

    // Romantic chords frequencies (Hz)
    const chords = [
      // Fmaj9: F3, A3, C4, E4, G4
      [174.61, 220.00, 261.63, 329.63, 392.00],
      // Cmaj7: C3, G3, B3, E4, G4
      [130.81, 196.00, 246.94, 329.63, 392.00],
      // Am9: A2, E3, G3, C4, B4
      [110.00, 164.81, 196.00, 261.63, 493.88],
      // Dm9 or Gsus4: D3, F3, A3, C4, E4
      [146.83, 174.61, 220.00, 261.63, 329.63],
    ];

    let chordIdx = 0;

    const playChordStep = () => {
      if (!this.isMusicPlaying || !this.ctx || !this.masterGain) return;
      const currentChord = chords[chordIdx % chords.length];
      const now = this.ctx.currentTime;

      // Play soft warm pad
      currentChord.slice(0, 3).forEach((freq) => {
        if (!this.ctx || !this.masterGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now);

        // Low pass filter for warm, dreamy texture
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(450, now);
        filter.frequency.exponentialRampToValueAtTime(750, now + 2.5);
        filter.frequency.exponentialRampToValueAtTime(400, now + 5.5);

        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.linearRampToValueAtTime(0.045, now + 1.2);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 6.0);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);

        osc.start(now);
        osc.stop(now + 6.2);
      });

      // Melodic gentle piano arpeggios
      const melodyNotes = [
        currentChord[2],
        currentChord[3],
        currentChord[4] || currentChord[1] * 2,
        currentChord[1] * 2,
      ];

      melodyNotes.forEach((freq, idx) => {
        if (!this.ctx || !this.masterGain) return;
        const noteTime = now + 0.6 + idx * 1.1;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, noteTime);

        gain.gain.setValueAtTime(0.0001, noteTime);
        gain.gain.linearRampToValueAtTime(0.035, noteTime + 0.08);
        gain.gain.exponentialRampToValueAtTime(0.0001, noteTime + 2.4);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(noteTime);
        osc.stop(noteTime + 2.5);
      });

      chordIdx++;
    };

    playChordStep();
    this.musicInterval = window.setInterval(playChordStep, 5600);
  }

  public stopBackgroundMusic() {
    this.isMusicPlaying = false;
    if (this.musicInterval) {
      clearInterval(this.musicInterval);
      this.musicInterval = null;
    }
  }

  public toggleBackgroundMusic(): boolean {
    if (this.isMusicPlaying) {
      this.stopBackgroundMusic();
      return false;
    } else {
      this.startBackgroundMusic();
      return true;
    }
  }

  /**
   * Sound effect: Soft crystal chime for buttons and reveals
   */
  public playChime(pitchMultiplier = 1) {
    try {
      const ctx = this.initContext();
      const now = ctx.currentTime;
      const baseFreq = 587.33 * pitchMultiplier; // D5

      const freqs = [baseFreq, baseFreq * 1.5, baseFreq * 2];
      freqs.forEach((f, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, now + i * 0.05);

        gain.gain.setValueAtTime(0.0001, now + i * 0.05);
        gain.gain.linearRampToValueAtTime(0.05 / (i + 1), now + i * 0.05 + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.05 + 1.2);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + i * 0.05);
        osc.stop(now + i * 0.05 + 1.3);
      });
    } catch {
      // Audio autoplay policy fallback
    }
  }

  /**
   * Sound effect: Heartbeat deep thumping
   */
  public playHeartbeat() {
    try {
      const ctx = this.initContext();
      const now = ctx.currentTime;

      // Two thumps (lub-dub)
      const beats = [0, 0.22];
      beats.forEach((offset) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(80, now + offset);
        osc.frequency.exponentialRampToValueAtTime(45, now + offset + 0.15);

        gain.gain.setValueAtTime(0.001, now + offset);
        gain.gain.linearRampToValueAtTime(0.12, now + offset + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + offset + 0.25);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + offset);
        osc.stop(now + offset + 0.3);
      });
    } catch {}
  }

  /**
   * Sound effect: Flower bloom sparkle
   */
  public playBloom() {
    try {
      const ctx = this.initContext();
      const now = ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C E G C E

      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        const startTime = now + idx * 0.07;
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.001, startTime);
        gain.gain.linearRampToValueAtTime(0.04, startTime + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.8);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.9);
      });
    } catch {}
  }

  /**
   * Sound effect: Wax seal crack & paper unfold
   */
  public playWaxSealCrack() {
    try {
      const ctx = this.initContext();
      const now = ctx.currentTime;

      // Soft crackle
      const bufferSize = ctx.sampleRate * 0.2;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.04));
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1200, now);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start(now);

      // Followed by warm chime
      setTimeout(() => {
        this.playChime(1.2);
      }, 150);
    } catch {}
  }

  /**
   * Sound effect: Fireworks boom & sparkles
   */
  public playFireworksExplosion() {
    try {
      const ctx = this.initContext();
      const now = ctx.currentTime;

      // Low bass boom
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(35, now + 0.7);

      oscGain.gain.setValueAtTime(0.2, now);
      oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

      osc.connect(oscGain);
      oscGain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.85);

      // Sparkle crackles
      const bufferSize = ctx.sampleRate * 0.6;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.15));
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.09, now + 0.08);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);

      noise.connect(noiseGain);
      noiseGain.connect(ctx.destination);
      noise.start(now + 0.08);
    } catch {}
  }

  /**
   * Sound effect: Grand proposal celebration fanfare
   */
  public playCelebrationFanfare() {
    try {
      const ctx = this.initContext();
      const now = ctx.currentTime;

      // Romantic major chord fanfare
      const notes = [
        { f: 261.63, t: 0.0 }, // C4
        { f: 329.63, t: 0.12 }, // E4
        { f: 392.00, t: 0.24 }, // G4
        { f: 523.25, t: 0.38 }, // C5
        { f: 659.25, t: 0.52 }, // E5
        { f: 783.99, t: 0.68 }, // G5
        { f: 1046.50, t: 0.85 }, // C6
      ];

      notes.forEach((item) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(item.f, now + item.t);

        gain.gain.setValueAtTime(0.001, now + item.t);
        gain.gain.linearRampToValueAtTime(0.08, now + item.t + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + item.t + 2.2);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + item.t);
        osc.stop(now + item.t + 2.3);
      });
    } catch {}
  }
}

export const romanticAudio = new RomanticAudioManager();
