import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { BADGE_TYPES, getPrimaryBadges, getSecretBadges } from '../data/badges';
import { slideUpModal, backdrop, springs } from '../utils/animations';

// Badge type labels
const typeLabels = {
  [BADGE_TYPES.MOVIE]: 'Film',
  [BADGE_TYPES.MEAL]: 'Meal',
  [BADGE_TYPES.SCENE]: 'Scene',
  [BADGE_TYPES.SECRET]: 'Secret',
};

const typeColors = {
  [BADGE_TYPES.MOVIE]: 'text-shire-600',
  [BADGE_TYPES.MEAL]: 'text-gold-600',
  [BADGE_TYPES.SCENE]: 'text-mordor-500',
  [BADGE_TYPES.SECRET]: 'text-gold-600',
};

const typeBgColors = {
  [BADGE_TYPES.MOVIE]: 'bg-shire-500/15',
  [BADGE_TYPES.MEAL]: 'bg-gold-500/15',
  [BADGE_TYPES.SCENE]: 'bg-mordor-500/15',
  [BADGE_TYPES.SECRET]: 'bg-gold-500/15',
};

export default function BadgeModal() {
  const {
    selectedBadge,
    closeBadgeModal,
    openBadgeModal,
    badges,
    claimBadge,
    getClaimTime,
    honorSystemDismissed,
    dismissHonorSystem,
    play,
    isSecretUnlocked,
  } = useApp();

  const [showHonorSystem, setShowHonorSystem] = useState(false);
  const [dontAskAgain, setDontAskAgain] = useState(false);
  const [justClaimed, setJustClaimed] = useState(false);
  const [slideDirection, setSlideDirection] = useState(0);

  // Get navigable badges (primary + unlocked secrets)
  const primaryBadges = getPrimaryBadges();
  const secretBadges = getSecretBadges();
  const unlockedSecrets = secretBadges.filter(b => badges[b.id]?.claimed);
  const navigableBadges = [...primaryBadges, ...unlockedSecrets];

  // Find current badge index
  const currentIndex = selectedBadge
    ? navigableBadges.findIndex(b => b.id === selectedBadge.id)
    : -1;

  // Navigation functions
  const goToPrevBadge = useCallback(() => {
    if (currentIndex > 0) {
      setSlideDirection(1);
      setShowHonorSystem(false);
      setJustClaimed(false);
      openBadgeModal(navigableBadges[currentIndex - 1]);
    }
  }, [currentIndex, navigableBadges, openBadgeModal]);

  const goToNextBadge = useCallback(() => {
    if (currentIndex < navigableBadges.length - 1) {
      setSlideDirection(-1);
      setShowHonorSystem(false);
      setJustClaimed(false);
      openBadgeModal(navigableBadges[currentIndex + 1]);
    }
  }, [currentIndex, navigableBadges, openBadgeModal]);

  // Keyboard navigation
  useEffect(() => {
    if (!selectedBadge) return;

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goToPrevBadge();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        goToNextBadge();
      } else if (e.key === 'Escape') {
        closeBadgeModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedBadge, goToPrevBadge, goToNextBadge, closeBadgeModal]);

  // Swipe handling
  const handleDragEnd = (e, info) => {
    const swipeThreshold = 50;
    if (info.offset.x > swipeThreshold) {
      goToPrevBadge();
    } else if (info.offset.x < -swipeThreshold) {
      goToNextBadge();
    }
  };

  if (!selectedBadge) return null;

  const isClaimed = badges[selectedBadge.id]?.claimed;
  const claimTime = getClaimTime(selectedBadge.id);
  const isSecret = selectedBadge.type === BADGE_TYPES.SECRET;

  const handleClaimClick = () => {
    if (honorSystemDismissed) {
      // Claim immediately
      performClaim();
    } else {
      // Show honor system notice
      setShowHonorSystem(true);
    }
  };

  const performClaim = () => {
    claimBadge(selectedBadge.id);
    setJustClaimed(true);
    setShowHonorSystem(false);

    if (dontAskAgain) {
      dismissHonorSystem();
    }

    // Close modal after brief celebration
    setTimeout(() => {
      closeBadgeModal();
      setJustClaimed(false);
    }, 800);
  };

  const handleHonorConfirm = () => {
    performClaim();
  };

  // Animation variants for badge content sliding
  const contentVariants = {
    enter: (direction) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  return (
    <AnimatePresence>
      {selectedBadge && (
        <>
          {/* Backdrop */}
          <motion.div
            className="modal-backdrop"
            variants={backdrop}
            initial="initial"
            animate="animate"
            exit="exit"
            onClick={closeBadgeModal}
          />

          {/* Modal */}
          <motion.div
            className="modal-content overflow-hidden"
            variants={slideUpModal}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={springs.smooth}
          >
            <AnimatePresence mode="wait" custom={slideDirection}>
              <motion.div
                key={selectedBadge.id}
                custom={slideDirection}
                variants={contentVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={handleDragEnd}
                className="p-6"
              >
              {/* Close button */}
              <button
                className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-earth-400 hover:text-earth-600"
                onClick={closeBadgeModal}
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Badge image */}
              <motion.div
                className="flex justify-center mb-4"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={justClaimed
                  ? { scale: [1, 1.1, 0.95, 1.05, 1], rotate: [0, -3, 3, -1, 0] }
                  : { scale: 1, opacity: 1 }
                }
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <div className="w-48 h-48 badge-image-container overflow-hidden">
                  <img
                    src={selectedBadge.image}
                    alt={selectedBadge.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>

              {/* Badge type & time pills */}
              <div className="flex items-center justify-center gap-2 flex-wrap">
                <span
                  className={`px-3 py-1 rounded-full text-xs uppercase tracking-wider text-earth-800 ${typeBgColors[selectedBadge.type]}`}
                  style={{ fontFamily: "'Google Sans Flex', sans-serif", fontWeight: 500 }}
                >
                  {typeLabels[selectedBadge.type]}
                </span>
                {selectedBadge.time && (
                  <span
                    className="px-3 py-1 rounded-full text-xs tracking-wide text-earth-800 bg-earth-200/50"
                    style={{ fontFamily: "'Google Sans Flex', sans-serif", fontWeight: 400 }}
                  >
                    {selectedBadge.time}
                  </span>
                )}
              </div>

              {/* Badge name */}
              <h2 className="font-display text-2xl font-bold text-earth-800 text-center mt-2 mb-4">
                {selectedBadge.name}
              </h2>

              {/* Badge description */}
              <p className="font-body text-earth-600 text-center mb-4 leading-relaxed">
                {selectedBadge.longDesc}
              </p>

              {/* Instruction callout */}
              {selectedBadge.instruction && !isClaimed && !justClaimed && (
                <div className="bg-shire-100 border border-shire-200 rounded-button px-8 py-4 mb-6">
                  <p className="font-display text-shire-800 text-center text-lg font-semibold">
                    {selectedBadge.instruction}
                  </p>
                </div>
              )}

              {/* Claim status or button */}
              {!showHonorSystem && (
                <>
                  {isClaimed || justClaimed ? (
                    <div className="text-center">
                      <div className="inline-flex items-center gap-2 bg-shire-100 text-shire-700 px-4 py-2 rounded-button">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="font-display font-semibold">Claimed</span>
                      </div>
                      {claimTime && (
                        <p className="text-earth-500 text-sm mt-2">
                          Witnessed at {claimTime}
                        </p>
                      )}
                    </div>
                  ) : (
                    <motion.button
                      className="btn-primary w-full"
                      onClick={handleClaimClick}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Claim This Badge
                    </motion.button>
                  )}
                </>
              )}

              {/* Honor System Notice */}
              <AnimatePresence>
                {showHonorSystem && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="bg-parchment-200 rounded-card p-4"
                  >
                    <p
                      className="text-earth-700 text-sm mb-4"
                      style={{ fontFamily: "'Google Sans Flex', sans-serif" }}
                    >
                      The Shire Passport operates on the honor system. By claiming
                      this badge, you solemnly swear you have witnessed this moment
                      (or eaten this meal).
                    </p>

                    <label className="flex items-center gap-3 mb-4 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={dontAskAgain}
                        onChange={(e) => setDontAskAgain(e.target.checked)}
                        className="w-5 h-5 rounded border-earth-400 text-shire-500 focus:ring-shire-500"
                      />
                      <span
                        className="text-sm text-earth-600"
                        style={{ fontFamily: "'Google Sans Flex', sans-serif" }}
                      >
                        Don't ask me again
                      </span>
                    </label>

                    <div className="flex gap-3">
                      <button
                        className="btn-secondary flex-1"
                        onClick={() => setShowHonorSystem(false)}
                      >
                        Cancel
                      </button>
                      <motion.button
                        className="btn-primary flex-1"
                        onClick={handleHonorConfirm}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        I So Swear
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
