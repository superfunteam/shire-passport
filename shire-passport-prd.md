# The Shire Passport
## Product Requirements Document

*Official Documentation of One's Journey Through Middle-earth*

---

## Overview

The Shire Passport is a mobile-first web app for tracking progress through an all-day Lord of the Rings Extended Edition marathon. Users collect badges by tapping to claim movies watched, meals eaten, and iconic scenes witnessed. At the end, they can export a personalized PNG certificate of their journey.

**Event Details:**
- Hosted by Sophia and Matt
- Start time: 9am
- Runtime: ~12 hours of film + meal breaks
- Audience: 20+ guests of varying tech comfort levels

**Design Philosophy:**
- Delightfully chunky and thumbable
- Old-world Shire aesthetic (think: official hobbit government documents)
- Stained glass illustration style (Gowalla-inspired badges)
- Glass-smooth 60fps animations throughout
- Works for "old and non-tech people" — zero friction

---

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | React + Vite |
| Styling | Tailwind CSS |
| Animation | Framer Motion + View Transitions API |
| Audio | Howler.js (or native Web Audio API) |
| Storage | LocalStorage only |
| PWA | Vite PWA plugin (offline support) |
| Hosting | Netlify (static deploy) |

**No backend. No database. Fully static.**

---

## User Flow

```
[1. Splash Screen]
     │
     ▼ tap "Enter the Shire"
[2. Name Input Modal]
     │
     ▼ enter name, tap continue
[3. Explainer Modal]
     │
     ▼ tap "Begin My Journey"
[4. Passport View]
     │
     ├── tap unclaimed badge → [Badge Detail Modal] → claim
     ├── tap claimed badge → [Badge Detail Modal] (view only)
     │
     ▼ scroll to bottom
[5. "Certify My Passport" Button]
     │
     ▼ tap
[6. Certification Modal]
     │
     ▼ confirm
[7. PNG Download]
```

---

## Screens & Components

### 1. Splash Screen

**Content:**
- App title: "The Shire Passport"
- Subtitle: "Official Documentation of One's Journey Through Middle-earth"
- "Hosted by Sophia and Matt"
- Large decorative ring/door illustration
- Button: "Enter the Shire" (chunky, old-world style)

**Animation:**
- Fade in on load
- Button has subtle pulse/glow
- Tap triggers satisfying *snap* sound

---

### 2. Name Input Modal

**Content:**
- Prompt: "What name shall be recorded in the official registry?"
- Text input (large, easy to tap)
- Button: "Continue"
- Skip option: "Remain Anonymous" (defaults to "A Humble Hobbit")

**Behavior:**
- Name saved to LocalStorage
- Used on final PNG export
- Shoop/slide-up animation on appear

**Validation:**
- Max 30 characters
- No empty submissions (use default if skipped)

---

### 3. Explainer Modal

**Content:**
- Header: "Your Quest Awaits"
- Body copy (nerdy but clear):
  > "Before you lies a perilous journey through all three Extended Editions of The Lord of the Rings. As you witness legendary moments and partake in the seven sacred meals of hobbit tradition, tap each badge to mark your progress.
  >
  > *A wizard is never late, nor is he early. He arrives precisely when he means to.* All times are approximate-ish.
  >
  > This passport operates on the honor system. The Shire trusts its guests."
- Button: "Begin My Journey"

**Animation:**
- Scroll-in or page-flip feel
- Parchment/paper texture vibe

---

### 4. Passport View (Main Screen)

**Layout:**
- Sticky header with title + user's name
- Scrollable grid/list of all 20 badges (16 primary + 4 secret)
- Badges displayed chronologically (see badge order below)
- Secret badges appear at bottom, initially locked/mysterious
- Footer with "Certify My Passport" button

**Badge States:**
- **Unclaimed:** Dimmed/grayed, tap to claim
- **Claimed:** Full color, checkmark or stamp overlay, tap to view details
- **Secret (locked):** Silhouette with "?" — reveals when unlocked

**Visual Style:**
- Stained glass / Gowalla illustrated icons
- Each badge is a chunky tappable card (~100-120px)
- Badges should feel like collectible stamps

**Animation:**
- Badges animate in on first load (staggered)
- Claimed badges do a subtle "stamp" animation
- Secret badges burst with particles when unlocked

---

### 5. Badge Detail Modal

**Appears when:** User taps any badge

**Content:**
- Large badge illustration (zooms in from grid position)
- Badge name (e.g., "You Shall Not Pass")
- Badge description (nerdy lore-rich copy)
- Timestamp if claimed ("Witnessed at 11:47am")
- Claim button OR "Claimed ✓" status

**Honor System Flow (first time):**
1. User taps "Claim This Badge"
2. Honor System notice appears:
   > "The Shire Passport operates on the honor system. By claiming this badge, you solemnly swear you have witnessed this moment (or eaten this meal)."
3. Checkbox: "Don't ask me again"
4. Button: "I So Swear"
5. Badge claimed, modal celebrates, returns to passport

**Honor System Flow (after "don't ask again"):**
1. User taps "Claim This Badge"
2. Badge immediately claimed with celebration
3. No extra confirmation needed

**Animation:**
- Modal slides up with badge image zooming from its grid position (shared element transition)
- Claim triggers: confetti burst, *thunk* sound, badge stamps
- Modal dismisses with reverse animation

---

### 6. Certification Modal

**Trigger:** "Certify My Passport" button at bottom of passport

**Content:**
- Header: "Return to the World of Men"
- Body:
  > "Your journey through Middle-earth is complete (or as complete as you could manage). By certifying this passport, you shall receive an official document commemorating your fellowship.
  >
  > You will be transported back to Austin, TX — the realm of mortals."
- Progress summary: "You claimed X of 20 badges"
- Button: "Certify & Download"
- Secondary link: "Review My Badges" (opens badge checklist editor)

**Badge Checklist Editor:**
- Simple list of all badges with checkboxes
- Toggle any badge on/off
- Quick way to fix mistakes
- Close returns to certification modal

---

### 7. PNG Export

**Behavior:**
- On "Certify & Download" tap:
  1. Generate PNG using html-to-canvas or similar
  2. Trigger download with filename: `shire-passport-[name].png`
  3. Show success message with share prompt

**PNG Template Requirements:**
- Designer (Clark) will provide template
- Template should have designated slots for:
  - User's name
  - Date (auto-filled)
  - "Hosted by Sophia and Matt"
  - Badge grid (claimed = full color, unclaimed = dimmed)
  - Final badge count
  - Secret badges section

---

## Badge Specifications

### Badge Order (Chronological)

| # | Type | Name | Approx Time | Description |
|---|------|------|-------------|-------------|
| 1 | 🍳 Meal | Breakfast | 9:00am-ish | "The most important meal in the Shire. One cannot simply begin a quest on an empty stomach." |
| 2 | 🎬 Movie | Fellowship of the Ring | ~9:30am | "The journey begins. You have witnessed the forming of the Fellowship." |
| 3 | 🥐 Meal | Second Breakfast | 10:30am-ish | "What about second breakfast? A true hobbit never forgets." |
| 4 | 💍 Scene | "I Will Take It" | ~10:45am | "In the House of Elrond, a small voice changes the fate of Middle-earth. Frodo accepts his burden." |
| 5 | 🫖 Meal | Elevenses | 11:15am-ish | "A light refreshment to bridge the gap. The Shire approves of your dedication." |
| 6 | ⚔️ Scene | "You Shall Not Pass" | ~12:30pm | "Upon the Bridge of Khazad-dûm, Gandalf the Grey makes his stand against shadow and flame." |
| 7 | 🍖 Meal | Luncheon | 1:00pm-ish | "A proper sit-down meal. Even Samwise would be proud of your commitment." |
| 8 | 🎬 Movie | The Two Towers | ~2:00pm | "The fellowship is broken, but the story continues. You have endured the second chapter." |
| 9 | 👹 Scene | "My Precious" | ~3:00pm | "Witness the tortured soul of Sméagol as he wages war against himself. Gollum. Gollum." |
| 10 | 🍰 Meal | Afternoon Tea | 3:30pm-ish | "A civilized pause for tea and sustenance. You've earned it, precious." |
| 11 | 🌳 Scene | "The Ents Go to War" | ~4:30pm | "The shepherds of the forest march on Isengard. Never thought you'd witness a tree throw a tantrum." |
| 12 | 🍗 Meal | Dinner | 6:00pm-ish | "The main evening feast. Refuel for the final push to Mount Doom." |
| 13 | 🎬 Movie | Return of the King | ~6:30pm | "The final chapter begins. You have committed to seeing this through to the very end." |
| 14 | 🔥 Scene | "The Beacons Are Lit" | ~7:30pm | "Gondor calls for aid! Witness the flame pass from peak to peak across the realm." |
| 15 | ⚔️ Scene | "I Am No Man" | ~9:00pm | "The Witch-king meets his doom at the hands of Éowyn. No man indeed." |
| 16 | 🥧 Meal | Supper | 9:00pm-ish | "The final meal of a long day's journey. You have eaten as the hobbits eat." |

### Secret Badges

| # | Name | Trigger | Description |
|---|------|---------|-------------|
| 17 | 🗺️ "There and Back Again" | All 3 movie badges | "You have walked the full path from Bag End to Mount Doom and home again. Bilbo would be proud." |
| 18 | 🍽️ "Second Breakfast Champion" | All 7 meal badges | "Seven meals. All consumed. You have achieved the highest honor in hobbit society." |
| 19 | 📜 "Loremaster" | All 6 scene badges | "A true scholar of Middle-earth. You witnessed every pivotal moment." |
| 20 | 💍 "Ringbearer" | All 19 other badges | "You bore the weight of this quest to the very end. The fate of Middle-earth was in your hands, and you did not falter." |

---

## Sound Design

| Action | Sound Style | Notes |
|--------|-------------|-------|
| Button tap | *snap* | Crisp, satisfying |
| Modal open | *shoop* | Smooth slide/whoosh |
| Modal close | *fwip* | Quick reverse |
| Badge claim | *thunk* | Weighty stamp sound |
| Secret unlock | *magical chime* | Sparkly, special |
| Error/invalid | *bonk* | Gentle comedic |
| Final certification | *triumphant horn* | Epic payoff |

**Implementation:**
- Use short audio sprites (< 1 second each)
- Preload on app init
- Consider matching badge themes (e.g., tree sound for Ents badge)

---

## LocalStorage Schema

```javascript
{
  "shire-passport": {
    "version": 1,
    "name": "Samwise",
    "createdAt": "2026-01-18T09:00:00Z",
    "honorSystemDismissed": false,
    "badges": {
      "breakfast": { "claimed": true, "claimedAt": "2026-01-18T09:05:00Z" },
      "fellowship": { "claimed": false, "claimedAt": null },
      // ... all 20 badges
    }
  }
}
```

---

## PWA Requirements

- **Manifest:** App name, icons, theme color (earthy green/brown)
- **Service Worker:** Cache all assets for offline use
- **Install Prompt:** Optional "Add to Home Screen" nudge on first visit
- **Offline Support:** Full functionality without network after initial load

---

## Animation Specifications

**General Principles:**
- 60fps minimum
- Use `will-change` and GPU-accelerated properties
- Framer Motion for complex choreography
- View Transitions API for shared element transitions (badge → modal)

**Key Animations:**
1. **Badge Grid Load:** Staggered fade-in + scale (50ms delay between)
2. **Badge Claim:** Scale pulse → stamp overlay → particles
3. **Modal Transition:** Shared element zoom from badge position
4. **Secret Badge Unlock:** Shake → burst → reveal
5. **Page Transitions:** Smooth crossfade between views

---

## Accessibility

- Large tap targets (minimum 44x44px, prefer larger)
- High contrast text on all backgrounds
- Screen reader labels for all badges
- Reduced motion preference respected (disable particles, simplify transitions)

---

## Image Asset Requirements

### Placeholder Strategy

During development, use colored rectangles with text labels:
- Badge placeholders: 200x200px squares with badge name centered
- Background placeholders: Solid colors matching theme

### Final Assets Needed

**Location:** `/public/images/`

| Filename | Size | Description |
|----------|------|-------------|
| `splash-bg.png` | 1080x1920 | Splash screen background (parchment/door of Bag End) |
| `badge-breakfast.png` | 400x400 | Breakfast badge (stained glass style) |
| `badge-second-breakfast.png` | 400x400 | Second Breakfast badge |
| `badge-elevenses.png` | 400x400 | Elevenses badge |
| `badge-luncheon.png` | 400x400 | Luncheon badge |
| `badge-afternoon-tea.png` | 400x400 | Afternoon Tea badge |
| `badge-dinner.png` | 400x400 | Dinner badge |
| `badge-supper.png` | 400x400 | Supper badge |
| `badge-fellowship.png` | 400x400 | Fellowship of the Ring completed |
| `badge-two-towers.png` | 400x400 | Two Towers completed |
| `badge-return-king.png` | 400x400 | Return of the King completed |
| `badge-i-will-take-it.png` | 400x400 | "I Will Take It" scene |
| `badge-you-shall-not-pass.png` | 400x400 | "You Shall Not Pass" scene |
| `badge-my-precious.png` | 400x400 | "My Precious" scene |
| `badge-ents-go-to-war.png` | 400x400 | "Ents Go to War" scene |
| `badge-beacons-are-lit.png` | 400x400 | "The Beacons Are Lit" scene |
| `badge-i-am-no-man.png` | 400x400 | "I Am No Man" scene |
| `badge-secret-movies.png` | 400x400 | "There and Back Again" secret |
| `badge-secret-meals.png` | 400x400 | "Second Breakfast Champion" secret |
| `badge-secret-scenes.png` | 400x400 | "Loremaster" secret |
| `badge-secret-ringbearer.png` | 400x400 | "Ringbearer" ultimate badge |
| `badge-locked.png` | 400x400 | Locked/mystery badge silhouette |
| `passport-template.png` | 1080x1920 | PNG export template (Clark to provide) |
| `icon-192.png` | 192x192 | PWA icon |
| `icon-512.png` | 512x512 | PWA icon |

**Total: 24 images**

### Badge Art Direction

- **Style:** Stained glass / illuminated manuscript / Gowalla-esque
- **Color palette:** Earthy greens, warm browns, gold accents, deep reds
- **Meals:** Feature the food/drink prominently
- **Movies:** Iconic imagery (ring, two towers, white tree of Gondor)
- **Scenes:** Character-focused moments
- **Secrets:** More ornate, gold borders, special treatment

---

## File Structure

```
/shire-passport
├── /public
│   ├── /images
│   │   ├── splash-bg.png
│   │   ├── badge-breakfast.png
│   │   ├── badge-*.png (all badges)
│   │   ├── passport-template.png
│   │   ├── icon-192.png
│   │   └── icon-512.png
│   ├── /sounds
│   │   ├── snap.mp3
│   │   ├── shoop.mp3
│   │   ├── thunk.mp3
│   │   ├── chime.mp3
│   │   └── horn.mp3
│   └── manifest.json
├── /src
│   ├── /components
│   │   ├── SplashScreen.jsx
│   │   ├── NameModal.jsx
│   │   ├── ExplainerModal.jsx
│   │   ├── Passport.jsx
│   │   ├── BadgeCard.jsx
│   │   ├── BadgeModal.jsx
│   │   ├── CertificationModal.jsx
│   │   └── BadgeChecklist.jsx
│   ├── /hooks
│   │   ├── useLocalStorage.js
│   │   └── useSound.js
│   ├── /data
│   │   └── badges.js
│   ├── /utils
│   │   └── exportPng.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
├── tailwind.config.js
└── package.json
```

---

## Success Criteria

1. ✅ Anyone can load the URL and start tracking immediately
2. ✅ Works offline after first load
3. ✅ All 20 badges claimable with satisfying feedback
4. ✅ Secret badges unlock automatically and feel magical
5. ✅ PNG export works and looks good for sharing
6. ✅ Grandma-friendly: big buttons, clear flow, no confusion
7. ✅ Delightful: every tap feels good

---

## Out of Scope (for v1)

- Multi-device sync
- Leaderboards / comparing with friends
- Admin panel for hosts
- Custom event configuration
- Social sharing integrations (beyond PNG download)

---

## Development Phases

**Phase 1: Core Flow**
- Splash → Name → Explainer → Passport view
- Badge grid with placeholder images
- Tap to claim (no modal yet)
- LocalStorage persistence

**Phase 2: Badge Modals**
- Badge detail modal with zoom animation
- Honor system flow
- "Don't ask again" setting

**Phase 3: Secret Badges**
- Auto-unlock logic
- Special reveal animations

**Phase 4: Polish**
- All sound effects
- All animations refined
- PWA setup

**Phase 5: Export**
- Certification modal
- PNG generation
- Badge checklist editor

**Phase 6: Final Assets**
- Replace all placeholder images
- Final testing on multiple devices

---

*"The road goes ever on and on..."*
