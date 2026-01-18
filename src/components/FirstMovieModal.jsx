import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';
import { scaleIn, springs } from '../utils/animations';

export default function FirstMovieModal() {
  const { showFirstMovieModal, closeFirstMovieModal } = useApp();

  // Fire confetti when modal opens
  useEffect(() => {
    if (showFirstMovieModal) {
      // Check for reduced motion
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
      }

      // Gold and earthy confetti colors
      const colors = ['#d4af37', '#e7c333', '#4a6741', '#8b7355', '#f9f6f0'];

      // Fire multiple bursts
      const fireConfetti = () => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors,
        });
      };

      fireConfetti();
      setTimeout(fireConfetti, 200);
      setTimeout(fireConfetti, 400);
    }
  }, [showFirstMovieModal]);

  if (!showFirstMovieModal) return null;

  return (
    <AnimatePresence>
      {showFirstMovieModal && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-earth-900/70 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeFirstMovieModal}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-parchment-50 rounded-modal shadow-modal p-8 max-w-sm w-full text-center"
              variants={scaleIn}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={springs.bouncy}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <motion.h2
                className="font-display text-2xl font-bold text-gold-600 mb-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                One down, babyyy!
              </motion.h2>

              {/* Badge image */}
              <motion.div
                className="w-32 h-32 mx-auto mb-4 badge-image-container overflow-hidden"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ ...springs.bouncy, delay: 0.3 }}
              >
                <img
                  src="/images/badge-intermission-bagel.webp"
                  alt="Intermission Bagel"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Body text */}
              <motion.p
                className="font-body text-earth-600 mb-2"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                That's one movie complete! Cheers to starting the day with a coffee bar (gingerbread?!), bagels, hot wine, and sharp cheddar. And we're surviving Tom's schedule, so three cheers to that!
              </motion.p>

              {/* Smaller text below */}
              <motion.p
                className="font-body text-earth-500 text-sm mb-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                (JK Tom, thanks for the sheet!)
              </motion.p>

              {/* LotR joke */}
              <motion.p
                className="font-body text-earth-700 italic mb-6 text-sm border-t border-earth-200 pt-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                "Even the very wise cannot see all ends. Take your intermission—the road goes ever on and on, and you'll need your strength for The Two Towers!"
              </motion.p>

              {/* Dismiss button */}
              <motion.button
                className="btn-primary"
                onClick={closeFirstMovieModal}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Continue Journey
              </motion.button>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
