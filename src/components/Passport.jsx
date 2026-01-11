import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { getPrimaryBadges, getSecretBadges, BADGE_TYPES } from '../data/badges';
import BadgeCard from './BadgeCard';
import { badgeGridContainer, fadeIn } from '../utils/animations';

export default function Passport() {
  const { name, openCertificationModal, badges, isSecretUnlocked, resetAndStartOver } = useApp();

  const primaryBadges = getPrimaryBadges();
  const secretBadges = getSecretBadges();

  // Count claimed primary badges
  const claimedPrimaryCount = primaryBadges.filter(b => badges[b.id]?.claimed).length;
  const totalPrimaryBadges = primaryBadges.length;

  // Only show secret badges that have been unlocked/claimed
  const unlockedSecretBadges = secretBadges.filter(b => badges[b.id]?.claimed);
  const hasUnlockedSecrets = unlockedSecretBadges.length > 0;

  return (
    <motion.div
      className="min-h-screen flex flex-col bg-parchment-100"
      variants={fadeIn}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Sticky Header */}
      <header className="sticky top-0 z-30 bg-parchment-100/95 backdrop-blur-sm border-b border-parchment-300 px-4 py-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-lg font-bold text-earth-800">
              The Shire Passport
            </h1>
            <p className="font-body text-sm text-earth-500">
              {name}'s Journey
            </p>
          </div>
          <div className="text-right">
            <p className="font-display text-lg font-bold text-shire-600">
              {claimedPrimaryCount}/{totalPrimaryBadges}
            </p>
            <p className="font-body text-xs text-earth-400">badges</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-2 h-2 bg-parchment-300 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-shire-500"
            initial={{ width: 0 }}
            animate={{ width: `${(claimedPrimaryCount / totalPrimaryBadges) * 100}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4">
        {/* Primary Badges Section */}
        <section className="mb-8">
          <h2 className="font-display text-sm font-semibold text-earth-500 uppercase tracking-wider mb-3">
            Your Journey
          </h2>
          <motion.div
            className="grid grid-cols-3 gap-3"
            variants={badgeGridContainer}
            initial="initial"
            animate="animate"
          >
            {primaryBadges.map((badge, index) => (
              <BadgeCard key={badge.id} badge={badge} index={index} />
            ))}
          </motion.div>
        </section>

        {/* Secret Badges Section - only shown when at least one is unlocked */}
        {hasUnlockedSecrets && (
          <motion.section
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="font-display text-sm font-semibold text-gold-600 uppercase tracking-wider mb-3 flex items-center gap-2">
              <span>✨</span>
              Secret Achievements
            </h2>
            <motion.div
              className="grid grid-cols-2 gap-3"
              variants={badgeGridContainer}
              initial="initial"
              animate="animate"
            >
              {unlockedSecretBadges.map((badge, index) => (
                <BadgeCard key={badge.id} badge={badge} index={index} />
              ))}
            </motion.div>
          </motion.section>
        )}

        {/* Certify Button */}
        <section className="pb-8 mt-8">
          <motion.button
            className="btn-primary w-full text-lg py-5"
            onClick={openCertificationModal}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Certify My Passport
          </motion.button>
          <p className="text-center text-earth-400 text-sm mt-4">
            Complete your journey and download your certificate
          </p>
          <button
            className="block mx-auto text-center text-earth-400 text-sm mt-6 underline hover:text-earth-600 transition-colors"
            onClick={resetAndStartOver}
          >
            Reset and Start Over
          </button>
        </section>
      </main>
    </motion.div>
  );
}
