import { createContext, useContext, useState, useCallback } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useSound, UI_SOUNDS } from '../hooks/useSound';
import { useSecretBadges } from '../hooks/useSecretBadges';

const AppContext = createContext(null);

// App screens
export const SCREENS = {
  SPLASH: 'splash',
  NAME: 'name',
  EXPLAINER: 'explainer',
  PASSPORT: 'passport',
};

export function AppProvider({ children }) {
  const storage = useLocalStorage();
  const { play } = useSound();

  // Current screen state
  const [currentScreen, setCurrentScreen] = useState(() => {
    // If user has already set up, go straight to passport
    if (storage.createdAt && storage.name) {
      return SCREENS.PASSPORT;
    }
    return SCREENS.SPLASH;
  });

  // Modal states
  const [selectedBadge, setSelectedBadge] = useState(null);
  const [showCertificationModal, setShowCertificationModal] = useState(false);
  const [showChecklist, setShowChecklist] = useState(false);

  // Secret unlock modal - shows the celebration modal
  const [secretUnlockModal, setSecretUnlockModal] = useState(null);

  // Handle secret badge unlocks - show the celebration modal
  const handleSecretUnlock = useCallback((badge) => {
    setSecretUnlockModal(badge);
  }, []);

  const closeSecretUnlockModal = useCallback(() => {
    play(UI_SOUNDS.modalClose);
    setSecretUnlockModal(null);
  }, [play]);

  // Secret badges hook
  const { isSecretUnlocked } = useSecretBadges(
    storage.badges,
    storage.claimBadge,
    play,
    handleSecretUnlock
  );

  // Navigation helpers
  const goToScreen = useCallback((screen) => {
    play(UI_SOUNDS.buttonTap);
    setCurrentScreen(screen);
  }, [play]);

  const openBadgeModal = useCallback((badge) => {
    play(UI_SOUNDS.modalOpen);
    setSelectedBadge(badge);
  }, [play]);

  const closeBadgeModal = useCallback(() => {
    play(UI_SOUNDS.modalClose);
    setSelectedBadge(null);
  }, [play]);

  const openCertificationModal = useCallback(() => {
    play(UI_SOUNDS.modalOpen);
    setShowCertificationModal(true);
  }, [play]);

  const closeCertificationModal = useCallback(() => {
    play(UI_SOUNDS.modalClose);
    setShowCertificationModal(false);
    setShowChecklist(false);
  }, [play]);

  const claimBadgeWithSound = useCallback((badgeId, options = {}) => {
    storage.claimBadge(badgeId, options);
    play(UI_SOUNDS.badgeClaim);
  }, [storage, play]);

  const resetAndStartOver = useCallback(() => {
    storage.resetAll();
    setCurrentScreen(SCREENS.SPLASH);
  }, [storage]);

  const value = {
    // Storage
    ...storage,
    claimBadge: claimBadgeWithSound,

    // Sound
    play,

    // Navigation
    currentScreen,
    goToScreen,

    // Badge modal
    selectedBadge,
    openBadgeModal,
    closeBadgeModal,

    // Certification modal
    showCertificationModal,
    showChecklist,
    setShowChecklist,
    openCertificationModal,
    closeCertificationModal,

    // Secret badges
    isSecretUnlocked,
    secretUnlockModal,
    closeSecretUnlockModal,

    // Reset
    resetAndStartOver,

    // Screen constants
    SCREENS,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
