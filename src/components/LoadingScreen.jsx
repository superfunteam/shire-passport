import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { slideUp, springs } from '../utils/animations';
import { badges } from '../data/badges';

// All assets to preload
const BADGE_IMAGES = badges.map(b => b.image);
const LOCK_IMAGES = ['/images/badge-lock.png', '/images/badge-lock-ring.png'];
const SPECIAL_IMAGES = [
  '/images/badge-intermission-bagel.webp',
  '/images/badge-cheese.webp',
  '/images/ring-badge.png',
  '/images/sophia-matt.png',
  '/images/pod.png',
];

const AUDIO_FILES = [
  // Badge sounds
  ...badges.map(b => `/audio/badge-${b.id}.mp3`),
  // Greeting sounds
  '/audio/greeting-1.mp3',
  '/audio/greeting-2.mp3',
  '/audio/greeting-3.mp3',
  '/audio/greeting-4.mp3',
  '/audio/greeting-5.mp3',
  // Background music
  '/audio/bg-morning-1.mp3',
  '/audio/bg-morning-2.mp3',
  '/audio/bg-afternoon-1.mp3',
  '/audio/bg-afternoon-2.mp3',
  '/audio/bg-night-1.mp3',
  '/audio/bg-night-2.mp3',
];

const ALL_IMAGES = [...BADGE_IMAGES, ...LOCK_IMAGES, ...SPECIAL_IMAGES];

// Preload a single image
function preloadImage(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve({ src, success: true });
    img.onerror = () => resolve({ src, success: false });
    img.src = src;
  });
}

// Preload a single audio file
function preloadAudio(src) {
  return new Promise((resolve) => {
    const audio = new Audio();
    audio.oncanplaythrough = () => resolve({ src, success: true });
    audio.onerror = () => resolve({ src, success: false });
    audio.src = src;
  });
}

export default function LoadingScreen() {
  const { goToScreen, SCREENS } = useApp();
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Preparing the journey...');

  useEffect(() => {
    let mounted = true;
    const totalAssets = ALL_IMAGES.length + AUDIO_FILES.length;
    let loadedCount = 0;

    const updateProgress = () => {
      loadedCount++;
      if (mounted) {
        setProgress(Math.round((loadedCount / totalAssets) * 100));
      }
    };

    const loadAssets = async () => {
      // Load images first
      setLoadingText('Loading badges...');
      const imagePromises = ALL_IMAGES.map(src =>
        preloadImage(src).then(result => {
          updateProgress();
          return result;
        })
      );

      await Promise.all(imagePromises);

      if (!mounted) return;

      // Then load audio
      setLoadingText('Preparing sounds...');
      const audioPromises = AUDIO_FILES.map(src =>
        preloadAudio(src).then(result => {
          updateProgress();
          return result;
        })
      );

      await Promise.all(audioPromises);

      if (!mounted) return;

      // Small delay to show 100% before transitioning
      setLoadingText('Ready!');
      setTimeout(() => {
        if (mounted) {
          goToScreen(SCREENS.EXPLAINER, { silent: true });
        }
      }, 500);
    };

    loadAssets();

    return () => {
      mounted = false;
    };
  }, [goToScreen, SCREENS]);

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center p-8"
      variants={slideUp}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={springs.smooth}
    >
      <motion.div
        className="w-full max-w-xs flex flex-col items-center"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        {/* Spinning ring loader */}
        <div className="relative w-24 h-24 mb-8">
          <motion.div
            className="w-full h-full rounded-full border-4 border-parchment-300"
            style={{ borderTopColor: '#7C3AED' }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-display text-earth-700">{progress}%</span>
          </div>
        </div>

        {/* Loading text */}
        <p
          className="text-earth-600 text-center mb-4"
          style={{ fontFamily: "'Google Sans Flex', sans-serif" }}
        >
          {loadingText}
        </p>

        {/* Progress bar */}
        <div className="w-full h-2 bg-parchment-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: '#7C3AED' }}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Flavor text */}
        <p
          className="text-earth-400 text-xs text-center mt-6 italic"
          style={{ fontFamily: "'Google Sans Flex', sans-serif" }}
        >
          "The road goes ever on and on..."
        </p>
      </motion.div>
    </motion.div>
  );
}
