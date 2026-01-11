# The Shire Passport — Build Specifications
## Technical Addendum to PRD

*Everything an agent needs to build this thing.*

---

## Design System

### Color Palette

```javascript
// tailwind.config.js colors
colors: {
  // Primary - Bag End Door Green
  'shire': {
    50: '#f0f5f0',
    100: '#d9e5d9',
    200: '#b3cbb3',
    300: '#8db18d',
    400: '#679767',
    500: '#4a6741', // Primary - use for buttons, headers
    600: '#3d5535',
    700: '#2f4329',
    800: '#22311d',
    900: '#141f11',
  },
  // Secondary - Ring Gold
  'gold': {
    50: '#fdf9eb',
    100: '#f9f0cc',
    200: '#f3e199',
    300: '#edd266',
    400: '#e7c333',
    500: '#d4af37', // Primary gold - accents, badges, special
    600: '#b8922a',
    700: '#8c6f20',
    800: '#604c16',
    900: '#34290c',
  },
  // Neutrals - Parchment & Earth
  'parchment': {
    50: '#fdfcfa',
    100: '#f9f6f0', // Light backgrounds
    200: '#f0ebe0', // Card backgrounds
    300: '#e5dccb', // Borders
    400: '#d4c7af',
    500: '#c3b293',
  },
  'earth': {
    50: '#f7f4f0',
    100: '#ebe4da',
    200: '#d4c7b5',
    300: '#bd aa90',
    400: '#a68d6b',
    500: '#8b7355', // Body text alternative
    600: '#5c4d3a',
    700: '#3d3326',
    800: '#1f1a13', // Dark text
    900: '#0f0d09',
  },
  // Accent - Deep Red (for warnings, special moments)
  'mordor': {
    500: '#8b2323',
    600: '#6b1c1c',
    700: '#4b1414',
  }
}
```

### Typography

**Google Fonts to Import:**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Crimson+Text:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet">
```

**Tailwind Font Config:**
```javascript
fontFamily: {
  'display': ['Cinzel', 'serif'],      // Headers, titles, badge names
  'body': ['Crimson Text', 'serif'],   // Body text, descriptions
}
```

**Usage Guidelines:**
- `font-display` for: App title, badge names, button text, modal headers
- `font-body` for: Descriptions, body copy, timestamps, small text
- Headlines: `text-2xl font-display font-semibold text-earth-800`
- Body: `text-base font-body text-earth-700`
- Small/meta: `text-sm font-body text-earth-500`

### Spacing & Sizing

```javascript
// Key measurements
spacing: {
  'badge': '6rem',      // 96px - badge card size on mobile
  'badge-lg': '7rem',   // 112px - badge in modal
  'tap': '2.75rem',     // 44px - minimum tap target
}
```

### Border Radius

```javascript
borderRadius: {
  'card': '1rem',       // Badge cards
  'modal': '1.5rem',    // Modal corners
  'button': '0.75rem',  // Buttons
}
```

### Shadows

```javascript
boxShadow: {
  'card': '0 2px 8px rgba(31, 26, 19, 0.12), 0 1px 3px rgba(31, 26, 19, 0.08)',
  'card-hover': '0 4px 16px rgba(31, 26, 19, 0.16), 0 2px 6px rgba(31, 26, 19, 0.1)',
  'modal': '0 8px 32px rgba(31, 26, 19, 0.24), 0 4px 12px rgba(31, 26, 19, 0.12)',
  'button': '0 2px 4px rgba(31, 26, 19, 0.1)',
}
```

---

## Complete Tailwind Config

```javascript
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'shire': {
          50: '#f0f5f0',
          100: '#d9e5d9',
          200: '#b3cbb3',
          300: '#8db18d',
          400: '#679767',
          500: '#4a6741',
          600: '#3d5535',
          700: '#2f4329',
          800: '#22311d',
          900: '#141f11',
        },
        'gold': {
          50: '#fdf9eb',
          100: '#f9f0cc',
          200: '#f3e199',
          300: '#edd266',
          400: '#e7c333',
          500: '#d4af37',
          600: '#b8922a',
          700: '#8c6f20',
          800: '#604c16',
          900: '#34290c',
        },
        'parchment': {
          50: '#fdfcfa',
          100: '#f9f6f0',
          200: '#f0ebe0',
          300: '#e5dccb',
          400: '#d4c7af',
          500: '#c3b293',
        },
        'earth': {
          50: '#f7f4f0',
          100: '#ebe4da',
          200: '#d4c7b5',
          300: '#bdaa90',
          400: '#a68d6b',
          500: '#8b7355',
          600: '#5c4d3a',
          700: '#3d3326',
          800: '#1f1a13',
          900: '#0f0d09',
        },
        'mordor': {
          500: '#8b2323',
          600: '#6b1c1c',
          700: '#4b1414',
        }
      },
      fontFamily: {
        'display': ['Cinzel', 'serif'],
        'body': ['Crimson Text', 'serif'],
      },
      boxShadow: {
        'card': '0 2px 8px rgba(31, 26, 19, 0.12), 0 1px 3px rgba(31, 26, 19, 0.08)',
        'card-hover': '0 4px 16px rgba(31, 26, 19, 0.16), 0 2px 6px rgba(31, 26, 19, 0.1)',
        'modal': '0 8px 32px rgba(31, 26, 19, 0.24), 0 4px 12px rgba(31, 26, 19, 0.12)',
        'button': '0 2px 4px rgba(31, 26, 19, 0.1)',
      },
      borderRadius: {
        'card': '1rem',
        'modal': '1.5rem',
        'button': '0.75rem',
      },
      animation: {
        'stamp': 'stamp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'shake': 'shake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97)',
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        stamp: {
          '0%': { transform: 'scale(1.5)', opacity: '0' },
          '50%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-4px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(4px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(212, 175, 55, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(212, 175, 55, 0.6)' },
        },
      },
    },
  },
  plugins: [],
}
```

---

## Complete Badge Data File

```javascript
// src/data/badges.js

export const BADGE_TYPES = {
  MOVIE: 'movie',
  MEAL: 'meal',
  SCENE: 'scene',
  SECRET: 'secret',
};

export const badges = [
  // ============ PRIMARY BADGES (Chronological Order) ============
  {
    id: 'breakfast',
    type: BADGE_TYPES.MEAL,
    name: 'Breakfast',
    time: '9:00am-ish',
    shortDesc: 'The first meal of the day',
    longDesc: 'The most important meal in the Shire. One cannot simply begin a quest on an empty stomach.',
    image: '/images/badge-breakfast.png',
    sound: 'thunk',
    order: 1,
  },
  {
    id: 'fellowship',
    type: BADGE_TYPES.MOVIE,
    name: 'Fellowship of the Ring',
    time: '~9:30am',
    shortDesc: 'First film completed',
    longDesc: 'The journey begins. You have witnessed the forming of the Fellowship and their departure from Rivendell.',
    image: '/images/badge-fellowship.png',
    sound: 'thunk',
    order: 2,
  },
  {
    id: 'second-breakfast',
    type: BADGE_TYPES.MEAL,
    name: 'Second Breakfast',
    time: '10:30am-ish',
    shortDesc: 'What about second breakfast?',
    longDesc: 'What about second breakfast? A true hobbit never forgets. Pippin would be proud.',
    image: '/images/badge-second-breakfast.png',
    sound: 'thunk',
    order: 3,
  },
  {
    id: 'i-will-take-it',
    type: BADGE_TYPES.SCENE,
    name: '"I Will Take It"',
    time: '~10:45am',
    shortDesc: 'Frodo accepts the quest',
    longDesc: 'In the House of Elrond, a small voice changes the fate of Middle-earth. Frodo accepts his burden. "I will take the Ring to Mordor. Though... I do not know the way."',
    image: '/images/badge-i-will-take-it.png',
    sound: 'thunk',
    order: 4,
  },
  {
    id: 'elevenses',
    type: BADGE_TYPES.MEAL,
    name: 'Elevenses',
    time: '11:15am-ish',
    shortDesc: 'A light refreshment',
    longDesc: 'A light refreshment to bridge the gap between second breakfast and luncheon. The Shire approves of your dedication to the old ways.',
    image: '/images/badge-elevenses.png',
    sound: 'thunk',
    order: 5,
  },
  {
    id: 'you-shall-not-pass',
    type: BADGE_TYPES.SCENE,
    name: '"You Shall Not Pass"',
    time: '~12:30pm',
    shortDesc: 'Gandalf faces the Balrog',
    longDesc: 'Upon the Bridge of Khazad-dûm, Gandalf the Grey makes his stand against shadow and flame. "I am a servant of the Secret Fire, wielder of the flame of Anor. You. Shall. Not. Pass!"',
    image: '/images/badge-you-shall-not-pass.png',
    sound: 'thunk',
    order: 6,
  },
  {
    id: 'luncheon',
    type: BADGE_TYPES.MEAL,
    name: 'Luncheon',
    time: '1:00pm-ish',
    shortDesc: 'A proper sit-down meal',
    longDesc: 'A proper sit-down meal, as is right and proper. Even Samwise Gamgee would be proud of your commitment to hobbit tradition.',
    image: '/images/badge-luncheon.png',
    sound: 'thunk',
    order: 7,
  },
  {
    id: 'two-towers',
    type: BADGE_TYPES.MOVIE,
    name: 'The Two Towers',
    time: '~2:00pm',
    shortDesc: 'Second film completed',
    longDesc: 'The fellowship is broken, but the story continues. You have endured the second chapter and witnessed the Battle of Helm\'s Deep.',
    image: '/images/badge-two-towers.png',
    sound: 'thunk',
    order: 8,
  },
  {
    id: 'my-precious',
    type: BADGE_TYPES.SCENE,
    name: '"My Precious"',
    time: '~3:00pm',
    shortDesc: 'Gollum argues with himself',
    longDesc: 'Witness the tortured soul of Sméagol as he wages war against himself. Two minds, one wretched creature. "We wants it. We needs it. Must have the precious. Gollum. Gollum."',
    image: '/images/badge-my-precious.png',
    sound: 'thunk',
    order: 9,
  },
  {
    id: 'afternoon-tea',
    type: BADGE_TYPES.MEAL,
    name: 'Afternoon Tea',
    time: '3:30pm-ish',
    shortDesc: 'Tea and sustenance',
    longDesc: 'A civilized pause for tea and sustenance. You\'ve earned it, precious. Yes, you have.',
    image: '/images/badge-afternoon-tea.png',
    sound: 'thunk',
    order: 10,
  },
  {
    id: 'ents-go-to-war',
    type: BADGE_TYPES.SCENE,
    name: '"The Ents Go to War"',
    time: '~4:30pm',
    shortDesc: 'Treebeard marches on Isengard',
    longDesc: 'The shepherds of the forest have reached a decision. The Ents march on Isengard. "A wizard should know better! There is no curse in Elvish, Entish, or the tongues of Men for this treachery."',
    image: '/images/badge-ents-go-to-war.png',
    sound: 'thunk',
    order: 11,
  },
  {
    id: 'dinner',
    type: BADGE_TYPES.MEAL,
    name: 'Dinner',
    time: '6:00pm-ish',
    shortDesc: 'The main evening feast',
    longDesc: 'The main evening feast. Refuel for the final push to Mount Doom. The end is in sight, but there is still far to go.',
    image: '/images/badge-dinner.png',
    sound: 'thunk',
    order: 12,
  },
  {
    id: 'return-king',
    type: BADGE_TYPES.MOVIE,
    name: 'Return of the King',
    time: '~6:30pm',
    shortDesc: 'Final film completed',
    longDesc: 'The final chapter begins. You have committed to seeing this through to the very end. All endings are also beginnings. We just don\'t know it at the time.',
    image: '/images/badge-return-king.png',
    sound: 'thunk',
    order: 13,
  },
  {
    id: 'beacons-are-lit',
    type: BADGE_TYPES.SCENE,
    name: '"The Beacons Are Lit"',
    time: '~7:30pm',
    shortDesc: 'Gondor calls for aid',
    longDesc: 'Gondor calls for aid! Witness the flame pass from peak to peak across the realm of men. "The beacons of Minas Tirith! The beacons are lit! Gondor calls for aid!"',
    image: '/images/badge-beacons-are-lit.png',
    sound: 'thunk',
    order: 14,
  },
  {
    id: 'i-am-no-man',
    type: BADGE_TYPES.SCENE,
    name: '"I Am No Man"',
    time: '~9:00pm',
    shortDesc: 'Éowyn defeats the Witch-king',
    longDesc: 'The Witch-king of Angmar meets his doom. "No man can kill me." "I am no man." The prophecy is fulfilled.',
    image: '/images/badge-i-am-no-man.png',
    sound: 'thunk',
    order: 15,
  },
  {
    id: 'supper',
    type: BADGE_TYPES.MEAL,
    name: 'Supper',
    time: '9:00pm-ish',
    shortDesc: 'The final meal',
    longDesc: 'The seventh and final meal of a long day\'s journey. You have eaten as the hobbits eat. The Shire is proud of your appetite.',
    image: '/images/badge-supper.png',
    sound: 'thunk',
    order: 16,
  },

  // ============ SECRET BADGES ============
  {
    id: 'secret-movies',
    type: BADGE_TYPES.SECRET,
    name: 'There and Back Again',
    shortDesc: 'All movies completed',
    longDesc: 'You have walked the full path from Bag End to Mount Doom and home again. Bilbo Baggins himself would tip his hat to your endurance.',
    image: '/images/badge-secret-movies.png',
    lockedImage: '/images/badge-locked.png',
    sound: 'chime',
    order: 17,
    unlockCondition: {
      type: 'all',
      badgeIds: ['fellowship', 'two-towers', 'return-king'],
    },
  },
  {
    id: 'secret-meals',
    type: BADGE_TYPES.SECRET,
    name: 'Second Breakfast Champion',
    shortDesc: 'All meals consumed',
    longDesc: 'Seven meals. All consumed. You have achieved the highest honor in hobbit society. Your dedication to culinary tradition is unmatched in all the Shire.',
    image: '/images/badge-secret-meals.png',
    lockedImage: '/images/badge-locked.png',
    sound: 'chime',
    order: 18,
    unlockCondition: {
      type: 'all',
      badgeIds: ['breakfast', 'second-breakfast', 'elevenses', 'luncheon', 'afternoon-tea', 'dinner', 'supper'],
    },
  },
  {
    id: 'secret-scenes',
    type: BADGE_TYPES.SECRET,
    name: 'Loremaster',
    shortDesc: 'All key scenes witnessed',
    longDesc: 'A true scholar of Middle-earth. You witnessed every pivotal moment in the tale. The Red Book of Westmarch shall record your attentiveness.',
    image: '/images/badge-secret-scenes.png',
    lockedImage: '/images/badge-locked.png',
    sound: 'chime',
    order: 19,
    unlockCondition: {
      type: 'all',
      badgeIds: ['i-will-take-it', 'you-shall-not-pass', 'my-precious', 'ents-go-to-war', 'beacons-are-lit', 'i-am-no-man'],
    },
  },
  {
    id: 'secret-ringbearer',
    type: BADGE_TYPES.SECRET,
    name: 'Ringbearer',
    shortDesc: 'The ultimate achievement',
    longDesc: 'You bore the weight of this quest to the very end. The fate of Middle-earth was in your hands, and you did not falter. Even the smallest person can change the course of the future.',
    image: '/images/badge-secret-ringbearer.png',
    lockedImage: '/images/badge-locked.png',
    sound: 'horn',
    order: 20,
    unlockCondition: {
      type: 'all',
      badgeIds: ['secret-movies', 'secret-meals', 'secret-scenes'],
    },
  },
];

// Helper functions
export const getPrimaryBadges = () => badges.filter(b => b.type !== BADGE_TYPES.SECRET);
export const getSecretBadges = () => badges.filter(b => b.type === BADGE_TYPES.SECRET);
export const getBadgeById = (id) => badges.find(b => b.id === id);
export const getMovieBadges = () => badges.filter(b => b.type === BADGE_TYPES.MOVIE);
export const getMealBadges = () => badges.filter(b => b.type === BADGE_TYPES.MEAL);
export const getSceneBadges = () => badges.filter(b => b.type === BADGE_TYPES.SCENE);
```

---

## Framer Motion Animation Presets

```javascript
// src/utils/animations.js

// Spring configs
export const springs = {
  // Snappy for UI interactions
  snappy: { type: 'spring', stiffness: 400, damping: 30 },
  // Bouncy for celebrations
  bouncy: { type: 'spring', stiffness: 300, damping: 15 },
  // Smooth for modals
  smooth: { type: 'spring', stiffness: 200, damping: 25 },
  // Gentle for subtle movements
  gentle: { type: 'spring', stiffness: 100, damping: 20 },
};

// Transition presets
export const transitions = {
  fast: { duration: 0.15, ease: 'easeOut' },
  normal: { duration: 0.25, ease: 'easeOut' },
  slow: { duration: 0.4, ease: 'easeInOut' },
};

// Animation variants
export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const slideUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
};

export const slideUpModal = {
  initial: { opacity: 0, y: '100%' },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: '100%' },
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
};

export const stampIn = {
  initial: { opacity: 0, scale: 1.5 },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: springs.bouncy,
  },
};

export const shake = {
  animate: {
    x: [-4, 4, -4, 4, -2, 2, 0],
    transition: { duration: 0.5 },
  },
};

// Stagger children
export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

export const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

// Badge grid animations
export const badgeGridContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0.1,
    },
  },
};

export const badgeGridItem = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: springs.snappy,
  },
};

// Secret badge reveal
export const secretReveal = {
  initial: { 
    opacity: 0, 
    scale: 0.5, 
    rotate: -10,
  },
  animate: { 
    opacity: 1, 
    scale: [0.5, 1.2, 1], 
    rotate: [−10, 5, 0],
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

// Modal backdrop
export const backdrop = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: transitions.fast,
};
```

---

## Secret Badge Unlock Logic

```javascript
// src/hooks/useSecretBadges.js

import { useEffect, useCallback } from 'react';
import { badges, BADGE_TYPES } from '../data/badges';

/**
 * Hook to handle automatic secret badge unlocking
 * @param {Object} claimedBadges - Object of badge IDs to claim data
 * @param {Function} claimBadge - Function to claim a badge
 * @param {Function} playSound - Function to play sounds
 */
export function useSecretBadges(claimedBadges, claimBadge, playSound) {
  
  const checkSecretUnlocks = useCallback(() => {
    const secretBadges = badges.filter(b => b.type === BADGE_TYPES.SECRET);
    
    for (const secret of secretBadges) {
      // Skip if already claimed
      if (claimedBadges[secret.id]?.claimed) continue;
      
      // Check unlock condition
      const { badgeIds } = secret.unlockCondition;
      const allUnlocked = badgeIds.every(id => claimedBadges[id]?.claimed);
      
      if (allUnlocked) {
        // Small delay for dramatic effect
        setTimeout(() => {
          claimBadge(secret.id, { isAutoUnlock: true });
          playSound(secret.sound || 'chime');
        }, 500);
      }
    }
  }, [claimedBadges, claimBadge, playSound]);

  // Check for unlocks whenever claimed badges change
  useEffect(() => {
    checkSecretUnlocks();
  }, [checkSecretUnlocks]);

  return { checkSecretUnlocks };
}
```

---

## LocalStorage Hook

```javascript
// src/hooks/useLocalStorage.js

import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'shire-passport';
const STORAGE_VERSION = 1;

const getInitialState = () => ({
  version: STORAGE_VERSION,
  name: '',
  createdAt: null,
  honorSystemDismissed: false,
  badges: {},
});

export function useLocalStorage() {
  const [data, setData] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Version check for future migrations
        if (parsed.version === STORAGE_VERSION) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to load from localStorage:', e);
    }
    return getInitialState();
  });

  // Persist to localStorage whenever data changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
    }
  }, [data]);

  const setName = useCallback((name) => {
    setData(prev => ({
      ...prev,
      name,
      createdAt: prev.createdAt || new Date().toISOString(),
    }));
  }, []);

  const claimBadge = useCallback((badgeId, options = {}) => {
    setData(prev => ({
      ...prev,
      badges: {
        ...prev.badges,
        [badgeId]: {
          claimed: true,
          claimedAt: new Date().toISOString(),
          ...options,
        },
      },
    }));
  }, []);

  const unclaimBadge = useCallback((badgeId) => {
    setData(prev => ({
      ...prev,
      badges: {
        ...prev.badges,
        [badgeId]: {
          claimed: false,
          claimedAt: null,
        },
      },
    }));
  }, []);

  const dismissHonorSystem = useCallback(() => {
    setData(prev => ({
      ...prev,
      honorSystemDismissed: true,
    }));
  }, []);

  const resetAll = useCallback(() => {
    setData(getInitialState());
  }, []);

  const getClaimTime = useCallback((badgeId) => {
    const badge = data.badges[badgeId];
    if (!badge?.claimedAt) return null;
    return new Date(badge.claimedAt).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  }, [data.badges]);

  return {
    name: data.name,
    createdAt: data.createdAt,
    honorSystemDismissed: data.honorSystemDismissed,
    badges: data.badges,
    setName,
    claimBadge,
    unclaimBadge,
    dismissHonorSystem,
    resetAll,
    getClaimTime,
    isNewUser: !data.createdAt,
  };
}
```

---

## Sound Hook

```javascript
// src/hooks/useSound.js

import { useCallback, useEffect, useRef } from 'react';

const SOUNDS = {
  snap: '/sounds/snap.mp3',
  shoop: '/sounds/shoop.mp3',
  fwip: '/sounds/fwip.mp3',
  thunk: '/sounds/thunk.mp3',
  chime: '/sounds/chime.mp3',
  bonk: '/sounds/bonk.mp3',
  horn: '/sounds/horn.mp3',
};

export function useSound() {
  const audioCache = useRef({});

  // Preload all sounds on mount
  useEffect(() => {
    Object.entries(SOUNDS).forEach(([name, path]) => {
      const audio = new Audio(path);
      audio.preload = 'auto';
      audioCache.current[name] = audio;
    });
  }, []);

  const play = useCallback((soundName, volume = 0.5) => {
    const audio = audioCache.current[soundName];
    if (audio) {
      // Clone to allow overlapping sounds
      const clone = audio.cloneNode();
      clone.volume = volume;
      clone.play().catch(() => {
        // Ignore autoplay restrictions
      });
    }
  }, []);

  return { play };
}

// Sound trigger mapping
export const UI_SOUNDS = {
  buttonTap: 'snap',
  modalOpen: 'shoop',
  modalClose: 'fwip',
  badgeClaim: 'thunk',
  secretUnlock: 'chime',
  error: 'bonk',
  certification: 'horn',
};
```

---

## PNG Export Utility

```javascript
// src/utils/exportPng.js

import html2canvas from 'html2canvas';

/**
 * Export the passport as a PNG
 * Uses a template approach where Clark provides the base template
 * and we overlay the dynamic badge states
 */
export async function exportPassportPng(options = {}) {
  const {
    name = 'A Humble Hobbit',
    badges = {},
    templateSelector = '#passport-export-template',
  } = options;

  const template = document.querySelector(templateSelector);
  if (!template) {
    throw new Error('Export template not found');
  }

  // Make template visible for capture
  template.style.display = 'block';
  template.style.position = 'absolute';
  template.style.left = '-9999px';

  try {
    const canvas = await html2canvas(template, {
      scale: 2, // Higher resolution
      useCORS: true,
      backgroundColor: null,
    });

    // Convert to blob and download
    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = `shire-passport-${name.toLowerCase().replace(/\s+/g, '-')}.png`;
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
    }, 'image/png');

  } finally {
    template.style.display = 'none';
  }
}

/**
 * Alternative approach: Use a pre-made PNG template
 * and draw badge states onto a canvas
 * (More reliable, recommended approach)
 */
export async function exportWithTemplate(options = {}) {
  const {
    name = 'A Humble Hobbit',
    badges = {},
    date = new Date().toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    }),
  } = options;

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  // Template dimensions (match your template)
  canvas.width = 1080;
  canvas.height = 1920;

  // Load template background
  const template = await loadImage('/images/passport-template.png');
  ctx.drawImage(template, 0, 0);

  // Add name text
  ctx.font = '600 48px Cinzel';
  ctx.fillStyle = '#1f1a13';
  ctx.textAlign = 'center';
  ctx.fillText(name, canvas.width / 2, 280); // Adjust Y position

  // Add date
  ctx.font = '400 28px Crimson Text';
  ctx.fillText(date, canvas.width / 2, 330);

  // Draw badge grid
  // (Position these according to your template layout)
  const badgePositions = getBadgePositions(); // Define based on template
  
  for (const [badgeId, pos] of Object.entries(badgePositions)) {
    const isClaimed = badges[badgeId]?.claimed;
    const badgeImg = await loadImage(
      isClaimed 
        ? `/images/badge-${badgeId}.png` 
        : `/images/badge-${badgeId}-dim.png`
    );
    ctx.globalAlpha = isClaimed ? 1 : 0.4;
    ctx.drawImage(badgeImg, pos.x, pos.y, pos.size, pos.size);
  }
  ctx.globalAlpha = 1;

  // Count stats
  const claimedCount = Object.values(badges).filter(b => b.claimed).length;
  ctx.font = '600 36px Cinzel';
  ctx.fillText(`${claimedCount} / 20 Badges`, canvas.width / 2, 1800);

  // Trigger download
  canvas.toBlob((blob) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = `shire-passport-${name.toLowerCase().replace(/\s+/g, '-')}.png`;
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  }, 'image/png');
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

// Define badge positions on your template
// Clark: Update these coordinates to match your template design
function getBadgePositions() {
  const startX = 90;
  const startY = 450;
  const badgeSize = 140;
  const gapX = 160;
  const gapY = 180;
  const cols = 5;

  const badgeIds = [
    'breakfast', 'fellowship', 'second-breakfast', 'i-will-take-it', 'elevenses',
    'you-shall-not-pass', 'luncheon', 'two-towers', 'my-precious', 'afternoon-tea',
    'ents-go-to-war', 'dinner', 'return-king', 'beacons-are-lit', 'i-am-no-man',
    'supper', 'secret-movies', 'secret-meals', 'secret-scenes', 'secret-ringbearer',
  ];

  const positions = {};
  badgeIds.forEach((id, i) => {
    const row = Math.floor(i / cols);
    const col = i % cols;
    positions[id] = {
      x: startX + col * gapX,
      y: startY + row * gapY,
      size: badgeSize,
    };
  });

  return positions;
}
```

---

## PWA Manifest

```json
// public/manifest.json
{
  "name": "The Shire Passport",
  "short_name": "Shire Passport",
  "description": "Official Documentation of One's Journey Through Middle-earth",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#f9f6f0",
  "theme_color": "#4a6741",
  "orientation": "portrait",
  "icons": [
    {
      "src": "/images/icon-192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/images/icon-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ]
}
```

---

## Vite Config with PWA

```javascript
// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'images/*.png',
        'sounds/*.mp3',
      ],
      manifest: {
        name: 'The Shire Passport',
        short_name: 'Shire Passport',
        description: 'Official Documentation of One\'s Journey Through Middle-earth',
        theme_color: '#4a6741',
        background_color: '#f9f6f0',
        display: 'standalone',
        orientation: 'portrait',
        icons: [
          {
            src: '/images/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/images/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,mp3}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
              },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gstatic-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
              },
            },
          },
        ],
      },
    }),
  ],
});
```

---

## Netlify Config

```toml
# netlify.toml

[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"

[[headers]]
  for = "/images/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/sounds/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

---

## Package.json

```json
{
  "name": "shire-passport",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "framer-motion": "^11.0.0",
    "html2canvas": "^1.4.1",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@vitejs/plugin-react": "^4.2.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0",
    "tailwindcss": "^3.4.0",
    "vite": "^5.0.0",
    "vite-plugin-pwa": "^0.19.0"
  }
}
```

---

## HTML Entry Point

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/png" href="/images/icon-192.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover, user-scalable=no" />
    <meta name="theme-color" content="#4a6741" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
    <link rel="apple-touch-icon" href="/images/icon-192.png" />
    <link rel="manifest" href="/manifest.json" />
    
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Crimson+Text:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet">
    
    <title>The Shire Passport</title>
    
    <!-- Open Graph for sharing -->
    <meta property="og:title" content="The Shire Passport" />
    <meta property="og:description" content="Official Documentation of One's Journey Through Middle-earth" />
    <meta property="og:image" content="/images/og-image.png" />
    <meta property="og:type" content="website" />
  </head>
  <body class="bg-parchment-100 font-body text-earth-800 antialiased">
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

---

## Base CSS

```css
/* src/index.css */

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  /* Prevent overscroll bounce on iOS */
  html, body {
    overscroll-behavior: none;
    -webkit-overflow-scrolling: touch;
  }
  
  /* Safe area insets for notched devices */
  body {
    padding-top: env(safe-area-inset-top);
    padding-bottom: env(safe-area-inset-bottom);
    padding-left: env(safe-area-inset-left);
    padding-right: env(safe-area-inset-right);
  }
  
  /* Smoother font rendering */
  body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  /* Prevent text selection on badges */
  .badge-card {
    -webkit-user-select: none;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
  }
}

@layer components {
  /* Chunky button style */
  .btn-primary {
    @apply px-8 py-4 bg-shire-500 text-parchment-100 font-display font-semibold text-lg rounded-button shadow-button;
    @apply hover:bg-shire-600 active:scale-95 transition-all duration-150;
  }
  
  .btn-secondary {
    @apply px-6 py-3 bg-parchment-200 text-earth-700 font-display font-medium rounded-button border border-parchment-400;
    @apply hover:bg-parchment-300 active:scale-95 transition-all duration-150;
  }
  
  /* Card style */
  .card {
    @apply bg-parchment-50 rounded-card shadow-card p-4;
  }
  
  /* Modal backdrop */
  .modal-backdrop {
    @apply fixed inset-0 bg-earth-900/60 backdrop-blur-sm z-40;
  }
  
  /* Modal content */
  .modal-content {
    @apply fixed bottom-0 left-0 right-0 bg-parchment-50 rounded-t-modal shadow-modal z-50 max-h-[90vh] overflow-y-auto;
  }
}

@layer utilities {
  /* Hide scrollbar but allow scrolling */
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
}
```

---

## Sound Assets Guide

**Where to source sounds (free options):**
1. **Freesound.org** — Search for: "button click", "whoosh", "stamp", "chime", "horn fanfare"
2. **Mixkit.co** — Free UI sound effects
3. **Pixabay.com/sound-effects** — Free audio

**Sound specs:**
- Format: MP3 (best browser support)
- Duration: 0.2-1.0 seconds max
- Sample rate: 44.1kHz
- Normalize to -3dB

**Sound mapping:**
| File | Description | Search terms |
|------|-------------|--------------|
| `snap.mp3` | Button tap | "click", "pop", "tap" |
| `shoop.mp3` | Modal slide up | "whoosh", "swipe", "slide" |
| `fwip.mp3` | Modal dismiss | "swish", "quick whoosh" |
| `thunk.mp3` | Badge stamp | "stamp", "thud", "seal" |
| `chime.mp3` | Secret unlock | "magic chime", "achievement", "sparkle" |
| `bonk.mp3` | Error | "error", "wrong", "bonk" |
| `horn.mp3` | Final certification | "horn fanfare", "triumph", "victory" |

---

## Creative License for Agents

**Areas where the building agent should get creative:**

1. **Micro-interactions** — Add delightful hover states, press states, and transitions that feel good. The vibe is "chunky, thumbable, satisfying."

2. **Loading states** — Design skeleton loaders or spinners that fit the old-world theme. Maybe a spinning ring? A bouncing pipe?

3. **Empty states** — What does the passport look like before any badges are claimed? Make it inviting.

4. **Error handling** — If localStorage fails or images don't load, handle gracefully with on-brand messaging. ("Even Gandalf has his off days...")

5. **Secret badge reveals** — Make these moments SPECIAL. Particles, shakes, glows — go wild within performance budget.

6. **Sound variations** — Consider pitch-shifting the thunk sound slightly per badge type for variety.

7. **Scroll behavior** — Consider sticky headers, scroll shadows, momentum — whatever makes scrolling buttery.

8. **Desktop fallback** — If someone loads on desktop, show a message like "This passport is best viewed on your pocket device" with a QR code to the URL.

9. **Confetti library** — Feel free to add a confetti library (like canvas-confetti) for the Ringbearer achievement.

10. **View Transitions API** — Use it where supported, gracefully fall back to Framer Motion variants where not.

**The North Star:** Every tap should feel like stamping an official document. Weighty. Important. Delightful.

---

## Placeholder Image Generation

During development, generate placeholders with this pattern:

```javascript
// Can use a simple canvas-based placeholder generator
function generatePlaceholder(text, size = 400) {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  
  // Background
  ctx.fillStyle = '#e5dccb';
  ctx.fillRect(0, 0, size, size);
  
  // Border
  ctx.strokeStyle = '#8b7355';
  ctx.lineWidth = 4;
  ctx.strokeRect(10, 10, size - 20, size - 20);
  
  // Text
  ctx.fillStyle = '#3d3326';
  ctx.font = 'bold 24px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  // Word wrap
  const words = text.split(' ');
  let lines = [];
  let currentLine = '';
  words.forEach(word => {
    if (ctx.measureText(currentLine + word).width < size - 40) {
      currentLine += (currentLine ? ' ' : '') + word;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  });
  lines.push(currentLine);
  
  lines.forEach((line, i) => {
    ctx.fillText(line, size / 2, size / 2 + (i - lines.length / 2 + 0.5) * 30);
  });
  
  return canvas.toDataURL();
}
```

---

## Final Checklist Before Launch

- [ ] All 24 images replaced with final assets
- [ ] All 7 sounds added and tested
- [ ] PNG export template positioned correctly
- [ ] Tested on iOS Safari
- [ ] Tested on Android Chrome
- [ ] Tested offline (airplane mode after first load)
- [ ] Tested "Add to Home Screen"
- [ ] Tested on older device (performance)
- [ ] Name input handles special characters
- [ ] LocalStorage persistence survives browser restart
- [ ] All badge descriptions proofread
- [ ] Certification flow works end-to-end
- [ ] Shared to test group for feedback

---

*"It's a dangerous business, Frodo, going out your door. You step onto the road, and if you don't keep your feet, there's no knowing where you might be swept off to."*

**Now go build it!**
