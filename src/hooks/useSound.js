import { useCallback, useRef, useEffect, useState } from 'react';

// Web Audio API based procedural sound generation
// These create satisfying UI sounds without needing audio files

const audioContextRef = { current: null };

function getAudioContext() {
  if (!audioContextRef.current) {
    audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioContextRef.current;
}

// Resume audio context on user interaction (required by browsers)
function ensureAudioContext() {
  const ctx = getAudioContext();
  if (ctx.state === 'suspended') {
    ctx.resume();
  }
  return ctx;
}

// Sound generators
const sounds = {
  // Crisp button tap - short click
  snap: (ctx, volume) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.05);

    gain.gain.setValueAtTime(volume * 0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.05);
  },

  // Modal slide up - smooth whoosh
  shoop: (ctx, volume) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(100, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.15);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(200, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(2000, ctx.currentTime + 0.15);

    gain.gain.setValueAtTime(volume * 0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.15);
  },

  // Modal dismiss - quick reverse whoosh
  fwip: (ctx, volume) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(500, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.1);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1500, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.1);

    gain.gain.setValueAtTime(volume * 0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.1);
  },

  // Badge stamp - weighty thunk
  thunk: (ctx, volume) => {
    // Low frequency punch
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();

    osc1.connect(gain1);
    gain1.connect(ctx.destination);

    osc1.frequency.setValueAtTime(150, ctx.currentTime);
    osc1.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 0.15);

    gain1.gain.setValueAtTime(volume * 0.4, ctx.currentTime);
    gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);

    osc1.start(ctx.currentTime);
    osc1.stop(ctx.currentTime + 0.15);

    // Click transient
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();

    osc2.connect(gain2);
    gain2.connect(ctx.destination);

    osc2.frequency.setValueAtTime(1000, ctx.currentTime);
    osc2.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.03);

    gain2.gain.setValueAtTime(volume * 0.25, ctx.currentTime);
    gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);

    osc2.start(ctx.currentTime);
    osc2.stop(ctx.currentTime + 0.03);
  },

  // Secret unlock - magical chime
  chime: (ctx, volume) => {
    const frequencies = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6

    frequencies.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      const startTime = ctx.currentTime + i * 0.08;
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(volume * 0.2, startTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.5);

      osc.start(startTime);
      osc.stop(startTime + 0.5);
    });
  },

  // Error - gentle bonk
  bonk: (ctx, volume) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.frequency.setValueAtTime(300, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.15);

    gain.gain.setValueAtTime(volume * 0.25, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.15);
  },

  // Final certification - triumphant horn fanfare
  horn: (ctx, volume) => {
    // Three note fanfare: G4, C5, E5
    const notes = [
      { freq: 392.00, start: 0, duration: 0.3 },      // G4
      { freq: 523.25, start: 0.25, duration: 0.3 },   // C5
      { freq: 659.25, start: 0.5, duration: 0.6 },    // E5 (held longer)
    ];

    notes.forEach(note => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(note.freq, ctx.currentTime);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1500, ctx.currentTime);

      const startTime = ctx.currentTime + note.start;
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(volume * 0.2, startTime + 0.05);
      gain.gain.setValueAtTime(volume * 0.2, startTime + note.duration - 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + note.duration);

      osc.start(startTime);
      osc.stop(startTime + note.duration);
    });
  },
};

export function useSound() {
  const [isEnabled, setIsEnabled] = useState(true);
  const hasInteracted = useRef(false);

  // Enable audio context on first user interaction
  useEffect(() => {
    const enableAudio = () => {
      if (!hasInteracted.current) {
        hasInteracted.current = true;
        ensureAudioContext();
      }
    };

    window.addEventListener('click', enableAudio, { once: true });
    window.addEventListener('touchstart', enableAudio, { once: true });

    return () => {
      window.removeEventListener('click', enableAudio);
      window.removeEventListener('touchstart', enableAudio);
    };
  }, []);

  const play = useCallback((soundName, volume = 0.5) => {
    if (!isEnabled) return;

    // Check for reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    try {
      const ctx = ensureAudioContext();
      const soundFn = sounds[soundName];

      if (soundFn) {
        soundFn(ctx, volume);
      } else {
        console.warn(`Sound "${soundName}" not found`);
      }
    } catch (e) {
      console.error('Failed to play sound:', e);
    }
  }, [isEnabled]);

  return { play, isEnabled, setIsEnabled };
}

// Sound trigger mapping for convenience
export const UI_SOUNDS = {
  buttonTap: 'snap',
  modalOpen: 'shoop',
  modalClose: 'fwip',
  badgeClaim: 'thunk',
  secretUnlock: 'chime',
  error: 'bonk',
  certification: 'horn',
};
