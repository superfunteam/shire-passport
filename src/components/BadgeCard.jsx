import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { BADGE_TYPES } from '../data/badges';
import { badgeGridItem, springs } from '../utils/animations';

export default function BadgeCard({ badge, index }) {
  const { badges, openBadgeModal, isSecretUnlocked } = useApp();

  const isClaimed = badges[badge.id]?.claimed;
  const isSecret = badge.type === BADGE_TYPES.SECRET;
  const isUnlocked = isSecret ? isSecretUnlocked(badge.id) : true;

  // Secret badges that aren't unlocked yet show as mystery
  const showAsMystery = isSecret && !isUnlocked && !isClaimed;

  const handleClick = () => {
    if (showAsMystery) return; // Can't open mystery badges
    openBadgeModal(badge);
  };

  return (
    <motion.button
      className="badge-card relative flex flex-col items-center gap-2 p-1"
      onClick={handleClick}
      variants={badgeGridItem}
      whileHover={!showAsMystery ? { scale: 1.05 } : {}}
      whileTap={!showAsMystery ? { scale: 0.95 } : {}}
      layout
    >
      {/* Badge image container with Gowalla styling */}
      <div
        className={`
          badge-image-wrapper relative w-full aspect-square
          ${showAsMystery ? 'cursor-default' : 'cursor-pointer'}
        `}
      >
        {/* The badge image with mask and styling */}
        <div
          className={`
            badge-image-container w-full h-full overflow-hidden
            transition-all duration-300
            ${isClaimed ? 'opacity-100' : 'opacity-40 grayscale'}
          `}
        >
          <img
            src={badge.image}
            alt={badge.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        {/* Claimed checkmark */}
        {isClaimed && (
          <motion.div
            className="absolute -top-1 -right-1 w-6 h-6 bg-shire-500 rounded-full flex items-center justify-center shadow-md z-10"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={springs.bouncy}
          >
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </motion.div>
        )}

        {/* Secret badge sparkle indicator */}
        {isSecret && !showAsMystery && (
          <div className="absolute -top-1 -left-1 w-5 h-5 bg-gold-500 rounded-full flex items-center justify-center shadow-md z-10">
            <span className="text-xs">✨</span>
          </div>
        )}
      </div>

      {/* Badge name */}
      <p
        className={`
          font-display text-[11px] font-semibold text-center leading-tight px-1
          ${isClaimed ? 'text-earth-800' : 'text-earth-400'}
          ${showAsMystery ? 'text-earth-300' : ''}
        `}
      >
        {showAsMystery ? '???' : badge.name}
      </p>
    </motion.button>
  );
}
