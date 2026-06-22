# Phase 1c — Natural Breeze Reskin & Transparent Navbar

**Date:** 2026-06-10
**Status:** Done
**Branch:** GENAI-002-Enhancing-background
**Follows:** [phase1b-image-enhancement.md](./phase1b-image-enhancement.md)
**Next:** Phase 2 — Core Screens (Discover, Place Detail, Search, Map)

---

## What Changed

### Files Modified

| File | Change |
|------|--------|
| `app/globals.css` | Replaced Festive India palette with Natural Breeze palette |
| `app/layout.tsx` | Body background updated from cream to cloud white |
| `app/page.tsx` | Removed `pt-16` wrapper — navbar now overlays hero |
| `components/layout/Navbar.tsx` | Transparent overlay on home hero → frosted glass on scroll |
| `components/layout/BottomNav.tsx` | Colors updated to Natural Breeze |
| `app/HomeClient.tsx` | All saffron/gold/indigo replaced with natural palette |

---

## Color Palette Change

### Old — Festive India
| Token | Hex | Use |
|-------|-----|-----|
| `--color-saffron` | `#FF6B00` | CTAs, active states, accents |
| `--color-gold` | `#FFB800` | Badges, location labels |
| `--color-cream` | `#FFF9F0` | Page backgrounds |
| `--color-forest` | `#1B7A4A` | Feature icons |
| `--color-indigo-deep` | `#1A1040` | Headings, gallery bg, dark overlays |

### New — Natural Breeze
| Token | Hex | Use |
|-------|-----|-----|
| `--color-sky-blue` | `#6CB6E4` | CTAs, active nav links, search focus ring, hero headline accent |
| `--color-leaf-green` | `#4F8A65` | Primary action buttons, active state underline, logo icon bg |
| `--color-sand` | `#F2E3C6` | Reserved for card accents / future use |
| `--color-cloud` | `#F7FAFB` | Page background, body bg, hero bottom fade |
| `--color-stone` | `#3E4A4F` | All headings, body text, dark overlays |
| `--color-sunset` | `#EBA86B` | Location labels on cards, hero badge, CTA badge |
| `--color-rose-alert` | `#E8445A` | Error states (unchanged) |

---

## Navbar — Transparent Overlay Pattern

### Before
```
Fixed header with bg-[#1A1040]/95 backdrop-blur-md border-b border-white/10
Always visible as a dark indigo bar — completely separate from page content
```

### After
```
Fixed header — conditionally transparent or frosted glass
```

#### Logic
```tsx
const isHome = pathname === '/';
const transparent = isHome && !scrolled;   // only on home page before scroll
```

| Condition | Background | Text | Logo accent |
|-----------|-----------|------|-------------|
| Home page, not scrolled | `bg-transparent` | `text-white` | Sky blue `#6CB6E4` |
| Home page, scrolled > 50px | `bg-white/90 backdrop-blur-lg` | `text-[#3E4A4F]` | Leaf green `#4F8A65` |
| Any other page | `bg-white/90 backdrop-blur-lg` | `text-[#3E4A4F]` | Leaf green `#4F8A65` |

#### Scroll detection
```tsx
useEffect(() => {
  const handle = () => setScrolled(window.scrollY > 50);
  window.addEventListener('scroll', handle, { passive: true });
  return () => window.removeEventListener('scroll', handle);
}, []);
```

#### Transition
`transition-all duration-300` — smooth 300ms crossfade between transparent and frosted states.

### Why `pt-16` was removed from `app/page.tsx`
The home page hero now fills the screen from pixel 0 — the transparent navbar sits on top of the photography. The hero text area already has `pt-32` to push content below the navbar height. Removing `pt-16` from the page wrapper prevents a gap between top of viewport and hero image.

Inner pages (tourist layout) keep their `pt-16 pb-20 md:pb-0` in `app/(tourist)/layout.tsx` — the navbar uses frosted glass there, so content must not render under it.

---

## Mobile Drawer (Sheet)
Changed from dark `bg-[#1A1040]` to clean `bg-white` with `border-[#3E4A4F]/10` dividers. Nav links and buttons follow the frosted-glass color scheme (stone text, leaf green CTA).

---

## Bottom Nav
| Before | After |
|--------|-------|
| `bg-[#1A1040]/95` dark bar | `bg-white/95 backdrop-blur-md` |
| Active: `text-[#FF6B00]` saffron | Active: `text-[#4F8A65]` leaf green |
| Inactive: `text-white/50` | Inactive: `text-[#3E4A4F]/40` |
| Active glow: orange rgba | Active glow: green rgba `(79,138,101,0.5)` |
| Active pip: `bg-[#FF6B00]` | Active pip: `bg-[#4F8A65]` |

---

## HomeClient.tsx — Section-by-Section Color Changes

### Hero section
| Element | Before | After |
|---------|--------|-------|
| Badge border/text | Gold `#FFB800` | Sunset `#EBA86B` |
| Headline accent span | Saffron `#FF6B00` | Sky blue `#6CB6E4` |
| Headline drop-shadow | Orange glow | Sky blue glow `rgba(108,182,228,0.45)` |
| Search focus ring | `ring-[#FF6B00]` | `ring-[#6CB6E4]` |
| Search button | `bg-[#FF6B00]` | `bg-[#4F8A65]` leaf green |
| Search button shadow | `shadow-[#FF6B00]/30` | `shadow-[#4F8A65]/30` |
| Category pill hover | `hover:border-[#FF6B00]/60` | `hover:border-[#6CB6E4]/50` |
| Overlay gradient | `bg-black` opacity 0.45→0.80 | `bg-gradient-to-br from-[#2C3A3F] via-black/50 to-[#3E4A4F]/60` opacity 0.35→0.72 |
| Bottom fade | `from-[#FFF9F0]` cream | `from-[#F7FAFB]` cloud |

### Stats strip
| Element | Before | After |
|---------|--------|-------|
| Background | `bg-[#FFF9F0]` | `bg-[#F7FAFB]` |
| Border | `border-orange-100/60` | `border-[#3E4A4F]/8` |
| Value text | `text-[#1A1040]` | `text-[#3E4A4F]` |
| Label text | `text-gray-500` | `text-[#3E4A4F]/50` |

### Destinations grid
| Element | Before | After |
|---------|--------|-------|
| Background | `bg-[#FFF9F0]` | `bg-[#F7FAFB]` |
| Section label | `text-[#FF6B00]` | `text-[#4F8A65]` |
| Section heading | `text-[#1A1040]` | `text-[#3E4A4F]` |
| View all button border | `border-[#1A1040]/20` | `border-[#3E4A4F]/20` |
| Card location text | `text-[#FFB800]` | `text-[#EBA86B]` |
| Card explore link hover | `hover:text-[#FF6B00]` | `hover:text-[#6CB6E4]` |

### Gallery strip
| Element | Before | After |
|---------|--------|-------|
| Background | `bg-[#1A1040]` | `bg-[#2C3A3F]` dark forest slate |
| Label text | `text-[#FF6B00]` | `text-[#6CB6E4]` |

### Features section
| Element | Before | After |
|---------|--------|-------|
| Background | `bg-[#FFF9F0]` | `bg-[#F7FAFB]` |
| Section label | `text-[#FF6B00]` | `text-[#4F8A65]` |
| Section heading | `text-[#1A1040]` | `text-[#3E4A4F]` |
| Body text | `text-gray-500` | `text-[#3E4A4F]/55` |
| Card border | `border-orange-50` | `border-[#3E4A4F]/6` |
| Icon 1 (Map) | `#FF6B00` orange | `#6CB6E4` sky blue |
| Icon 2 (Zap) | `#FFB800` gold | `#EBA86B` sunset |
| Icon 3 (Navigation) | `#1B7A4A` forest | `#4F8A65` leaf green |
| Icon 4 (Camera) | `#1A1040` indigo | `#3E4A4F` stone |

### CTA section
| Element | Before | After |
|---------|--------|-------|
| Overlay | `bg-[#1A1040]/80` | `bg-[#2C3A3F]/78` |
| Badge border/text | `border-[#FFB800]/30 text-[#FFB800]` | `border-[#EBA86B]/30 text-[#EBA86B]` |
| Primary button | `bg-[#FF6B00]` | `bg-[#4F8A65]` |
| Primary button shadow | `shadow-[#FF6B00]/30` | `shadow-[#4F8A65]/30` |

---

## Build Phase Sequence Reference

| Phase | Focus | Status |
|-------|-------|--------|
| **1 — Foundation** | Layout, providers, auth, design tokens, home page | ✅ Done |
| **1b — Image Enhancement** | Cloudinary photos, parallax hero, destinations grid, gallery strip | ✅ Done |
| **1c — Natural Breeze Reskin** | Color palette swap, transparent navbar overlay | ✅ Done |
| 2 — Core Screens | Discover listing, place detail (ISR), search, MapLibre | ⬜ Next |
| 3 — Live Features | Queues, traffic heatmap, parking (Socket.io) | ⬜ |
| 4 — Booking Flow | Hotel, transport, payment | ⬜ |
| 5 — AI Features | Trip planner, recommendations, budget | ⬜ |
| 6 — Gov Dashboard | Analytics, heatmaps | ⬜ |
| 7 — Mobile App | Expo React Native | ⬜ |
