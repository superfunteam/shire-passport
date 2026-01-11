import { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { slideUp, springs } from '../utils/animations';

const MAX_NAME_LENGTH = 30;
const DEFAULT_NAME = 'A Humble Hobbit';

export default function NameModal() {
  const { setName, goToScreen, SCREENS, play } = useApp();
  const [inputValue, setInputValue] = useState('');

  const handleContinue = () => {
    const finalName = inputValue.trim() || DEFAULT_NAME;
    setName(finalName);
    goToScreen(SCREENS.EXPLAINER);
  };

  const handleSkip = () => {
    play('snap');
    setName(DEFAULT_NAME);
    goToScreen(SCREENS.EXPLAINER);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleContinue();
    }
  };

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
        className="w-full max-w-sm"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        {/* Prompt */}
        <h2 className="font-display text-2xl font-semibold text-earth-800 text-center mb-8">
          What name shall be recorded in the official registry?
        </h2>

        {/* Input */}
        <div className="mb-6">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value.slice(0, MAX_NAME_LENGTH))}
            onKeyDown={handleKeyDown}
            placeholder="Enter your name..."
            className="w-full px-5 py-4 text-xl font-body text-earth-800 bg-parchment-50 border-2 border-parchment-400 rounded-button focus:border-shire-500 focus:outline-none transition-colors"
            autoFocus
            autoCapitalize="words"
            autoComplete="off"
          />
          <p className="text-right text-sm text-earth-400 mt-2">
            {inputValue.length}/{MAX_NAME_LENGTH}
          </p>
        </div>

        {/* Continue button */}
        <motion.button
          className="btn-primary w-full mb-4"
          onClick={handleContinue}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Continue
        </motion.button>

        {/* Skip option */}
        <button
          className="w-full text-center text-earth-500 font-body text-sm py-2 hover:text-earth-700 transition-colors"
          onClick={handleSkip}
        >
          Remain Anonymous
        </button>
        <p className="text-center text-earth-400 text-xs mt-1">
          (defaults to "{DEFAULT_NAME}")
        </p>
      </motion.div>
    </motion.div>
  );
}
