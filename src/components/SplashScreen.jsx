import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { fadeIn, pulseButton, springs } from '../utils/animations';

export default function SplashScreen() {
  const { goToScreen, SCREENS } = useApp();

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center p-8 text-center"
      variants={fadeIn}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Decorative ring illustration placeholder */}
      <motion.div
        className="w-48 h-48 mb-8 rounded-full border-8 border-gold-500 flex items-center justify-center bg-parchment-200"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ ...springs.bouncy, delay: 0.2 }}
      >
        <span className="text-6xl">💍</span>
      </motion.div>

      {/* Title */}
      <motion.h1
        className="font-display text-4xl font-bold text-earth-800 mb-3"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        The Shire Passport
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        className="font-body text-lg text-earth-600 mb-2 italic"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Official Documentation of One's Journey
        <br />
        Through Middle-earth
      </motion.p>

      {/* Hosts */}
      <motion.p
        className="font-body text-sm text-earth-500 mb-12"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Hosted by Sophia and Matt
      </motion.p>

      {/* Enter button */}
      <motion.button
        className="btn-primary text-xl px-10 py-5"
        onClick={() => goToScreen(SCREENS.NAME)}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <motion.span
          variants={pulseButton}
          animate="animate"
          className="inline-block"
        >
          Enter the Shire
        </motion.span>
      </motion.button>
    </motion.div>
  );
}
