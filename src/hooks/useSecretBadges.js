import { useEffect, useCallback, useRef } from 'react';
import { badges, BADGE_TYPES } from '../data/badges';

/**
 * Hook to handle automatic secret badge unlocking
 * @param {Object} claimedBadges - Object of badge IDs to claim data
 * @param {Function} claimBadge - Function to claim a badge
 * @param {Function} playSound - Function to play sounds
 * @param {Function} onSecretUnlock - Callback when a secret is unlocked
 */
export function useSecretBadges(claimedBadges, claimBadge, playSound, onSecretUnlock) {
  const justUnlocked = useRef(new Set());

  const checkSecretUnlocks = useCallback(() => {
    const secretBadges = badges.filter(b => b.type === BADGE_TYPES.SECRET);

    for (const secret of secretBadges) {
      // Skip if already claimed or already processed this session
      if (claimedBadges[secret.id]?.claimed) continue;
      if (justUnlocked.current.has(secret.id)) continue;

      // Check unlock condition
      const { badgeIds } = secret.unlockCondition;
      const allUnlocked = badgeIds.every(id => claimedBadges[id]?.claimed);

      if (allUnlocked) {
        // Mark as being unlocked to prevent duplicate triggers
        justUnlocked.current.add(secret.id);

        // Small delay for dramatic effect
        setTimeout(() => {
          claimBadge(secret.id, { isAutoUnlock: true });
          playSound(secret.id === 'secret-ringbearer' ? 'horn' : 'chime');
          onSecretUnlock?.(secret);
        }, 600);
      }
    }
  }, [claimedBadges, claimBadge, playSound, onSecretUnlock]);

  // Check for unlocks whenever claimed badges change
  useEffect(() => {
    checkSecretUnlocks();
  }, [checkSecretUnlocks]);

  // Check if a secret badge is unlocked (for display purposes)
  const isSecretUnlocked = useCallback((badgeId) => {
    const badge = badges.find(b => b.id === badgeId);
    if (!badge || badge.type !== BADGE_TYPES.SECRET) return false;

    // If already claimed, it's unlocked
    if (claimedBadges[badgeId]?.claimed) return true;

    // Check if conditions are met
    const { badgeIds } = badge.unlockCondition;
    return badgeIds.every(id => claimedBadges[id]?.claimed);
  }, [claimedBadges]);

  return { checkSecretUnlocks, isSecretUnlocked };
}
