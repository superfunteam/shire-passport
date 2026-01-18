import { useEffect, useState } from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';
import { motion, AnimatePresence } from 'framer-motion';

export default function UpdatePrompt() {
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      // Check for updates every hour
      if (r) {
        setInterval(() => {
          r.update();
        }, 60 * 60 * 1000); // 1 hour
      }
    },
    onRegisterError(error) {
      console.log('SW registration error', error);
    },
  });

  const close = () => {
    setOfflineReady(false);
    setNeedRefresh(false);
  };

  const reload = () => {
    updateServiceWorker(true);
  };

  if (!needRefresh && !offlineReady) return null;

  return (
    <AnimatePresence>
      {(needRefresh || offlineReady) && (
        <motion.div
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] w-full max-w-sm px-4"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          <div className="bg-parchment-50 rounded-modal shadow-modal border-2 border-gold-400 p-4">
            <div className="flex items-start gap-3">
              <div className="text-2xl">✨</div>
              <div className="flex-1">
                <h3 className="font-display font-bold text-earth-800 mb-1">
                  {needRefresh ? 'New Update Available!' : 'Ready for Offline Use'}
                </h3>
                <p className="font-body text-sm text-earth-600 mb-3">
                  {needRefresh
                    ? 'A new version of the Shire Passport is ready. Reload to see the latest features!'
                    : 'The app is ready to work offline.'}
                </p>
                <div className="flex gap-2">
                  {needRefresh && (
                    <button
                      className="btn-primary text-sm py-2 px-4"
                      onClick={reload}
                    >
                      Reload Now
                    </button>
                  )}
                  <button
                    className="btn-secondary text-sm py-2 px-4"
                    onClick={close}
                  >
                    {needRefresh ? 'Later' : 'Dismiss'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
