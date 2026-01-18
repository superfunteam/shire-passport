import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';
import { scaleIn, springs } from '../utils/animations';

export default function SecondMovieModal() {
  const { showSecondMovieModal, closeSecondMovieModal } = useApp();

  // Fire confetti when modal opens
  useEffect(() => {
    if (showSecondMovieModal) {
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
  }, [showSecondMovieModal]);

  if (!showSecondMovieModal) return null;

  return (
    <AnimatePresence>
      {showSecondMovieModal && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-earth-900/70 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeSecondMovieModal}
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
                Over the hump!
              </motion.h2>

              {/* Badge image */}
              <motion.div
                className="w-32 h-32 mx-auto mb-4 badge-image-container overflow-hidden"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ ...springs.bouncy, delay: 0.3 }}
              >
                <img
                  src="/images/badge-cheese.webp"
                  alt="Cheese Badge"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Body text */}
              <motion.p
                className="font-body text-earth-600 mb-6"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Now we're rolling! We SCARFED that canned cheese, Claire introduced Mike to his love of egg salad, and we're all settling nicely into a bread coma.
              </motion.p>

              {/* LotR joke */}
              <motion.p
                className="font-body text-earth-700 italic mb-6 text-sm border-t border-earth-200 pt-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                "There's some good in this world, Mr. Frodo, and it's worth fighting for"—especially when that good includes egg salad sandwiches. Now onward to the Return of the King!
              </motion.p>

              {/* Dismiss button */}
              <motion.button
                className="btn-primary"
                onClick={closeSecondMovieModal}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
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
