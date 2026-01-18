import { useEffect, useState } from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';
import { motion, AnimatePresence } from 'framer-motion';

export default function UpdatePrompt() {
  const [testMode, setTestMode] = useState(false);

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

  // Check for ?update URL parameter to enable test mode
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.has('update')) {
      setTestMode(true);
    }
  }, []);

  const close = () => {
    setOfflineReady(false);
    setNeedRefresh(false);
    setTestMode(false);
  };

  const reload = () => {
    if (testMode) {
      // In test mode, just remove the param and reload
      const url = new URL(window.location.href);
      url.searchParams.delete('update');
      window.location.href = url.toString();
    } else {
      updateServiceWorker(true);
    }
  };

  if (!needRefresh && !offlineReady && !testMode) return null;

  return (
    <AnimatePresence>
      {(needRefresh || offlineReady || testMode) && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-earth-900/70 backdrop-blur-sm z-[100]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-[100] p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-parchment-50 rounded-modal shadow-modal border-2 border-gold-400 p-6 w-full max-w-sm"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start gap-3">
                <div className="text-2xl">✨</div>
                <div className="flex-1">
                  <h3 className="font-display font-bold text-earth-800 mb-1">
                    {(needRefresh || testMode) ? 'New Update Available!' : 'Ready for Offline Use'}
                  </h3>
                  <p className="font-body text-sm text-earth-600 mb-3">
                    {(needRefresh || testMode) ? (
                      <>
                        A new version of the Shire Passport is ready. Reload to see the latest features!
                        <span className="block mt-2 text-xs text-earth-500">
                          After reloading, try unclaiming and reclaiming your Fellowship badge to see the new intermission celebration!
                        </span>
                      </>
                    ) : (
                      'The app is ready to work offline.'
                    )}
                  </p>
                  <div className="flex gap-2">
                    {(needRefresh || testMode) && (
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
                      {(needRefresh || testMode) ? 'Later' : 'Dismiss'}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
