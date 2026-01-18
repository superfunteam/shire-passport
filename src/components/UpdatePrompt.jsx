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
      // Check for updates every 10 minutes
      if (r) {
        setInterval(() => {
          r.update();
        }, 10 * 60 * 1000); // 10 minutes
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
          className="fixed inset-x-0 bottom-6 z-[100] flex justify-center px-4"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          <div className="bg-parchment-50 rounded-modal shadow-modal border-2 border-gold-400 p-4 w-full max-w-sm">
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
