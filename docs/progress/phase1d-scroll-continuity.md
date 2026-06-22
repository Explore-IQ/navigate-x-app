# Phase 1d — Scroll Continuity & Visual Flow

**Date:** 2026-06-10
**Status:** Done
**Branch:** GENAI-003-Visual-Telling
**Follows:** [phase1c-natural-breeze-reskin.md](./phase1c-natural-breeze-reskin.md)
**Next:** Phase 2 — Core Screens (Discover, Place Detail, Search, Map)

---

## Goal

Remove all hard visual cuts between sections so the page feels like one connected, breathing scroll experience rather than a stack of independent color blocks.

---

## Files Modified

| File | Change |
|------|--------|
| `app/HomeClient.tsx` | Gradient bridges, extended hero fade, removed stats border, features gradient bg, CTA top overlay, unused import cleanup |

---

## What Happens on Scroll

### Hero (full viewport)
- Navbar starts **fully transparent** — blends into the photography
- As user scrolls past 50px the navbar cross-fades to **frosted white glass** (`bg-white/90 backdrop-blur-lg`)
- Hero image slides at **25% scroll speed** (parallax) while text moves at **15%** — creates depth separation
- Dark overlay **darkens from 0.35 → 0.72 opacity** as you scroll, keeping text readable through the transition
- Bottom of hero fades through a **h-72 three-stop gradient** (`from-[#F7FAFB] via-[#F7FAFB]/60 to-transparent`) — long, gradual dissolve into the stats section

### Hero → Stats (seamless)
- The `h-72` bottom fade on the hero overlaps the stats section background (`#F7FAFB`)
- Both are the same cloud-white color — the photography simply dissolves away, no hard edge

### Stats → Destinations (seamless)
- Both share `bg-[#F7FAFB]`
- The `border-b` divider was **removed** — they now read as one continuous light zone
- Visual separation comes from content rhythm (heading + padding) not a border line

### Destinations → Gallery (gradient bridge)
```
[Destinations section — bg #F7FAFB]
    ↓
[h-28 div — bg-gradient-to-b from-[#F7FAFB] to-[#2C3A3F]]  ← bridge
    ↓
[Gallery section — bg #2C3A3F]
```
- A standalone `h-28` (112px) div sits between the sections
- Cloud white dissolves into dark forest slate over 112px
- No JavaScript — pure CSS gradient, zero performance cost
- Gallery top padding reduced from `py-16` to `pt-6 pb-16` — the bridge provides the visual breathing room at the top

### Gallery → Features (gradient bridge)
```
[Gallery section — bg #2C3A3F]
    ↓
[h-28 div — bg-gradient-to-b from-[#2C3A3F] to-[#F7FAFB]]  ← bridge
    ↓
[Features section — bg gradient from #F7FAFB to #EDF5FB]
```
- Mirror of the entry bridge — dark slate dissolves back to light
- Features section now uses a subtle gradient (`from-[#F7FAFB] to-[#EDF5FB]`) rather than flat white — the faint sky-blue tint at the bottom primes the eye for the CTA

### Features → CTA (image bleed)
```
[Features section ends — bg #EDF5FB faint sky tint]
    ↓
[CTA section top — absolute h-44 gradient from-[#EDF5FB] to-transparent z-10]
    ↓
[CTA background image shows through, with bg-[#2C3A3F]/78 dark overlay]
```
- Inside the CTA section an **absolute-positioned** `h-44` gradient sits above the dark overlay (`z-10`)
- The features section's sky tint bleeds directly into the top of the CTA photograph
- Result: the landscape photograph appears to "emerge" from the page rather than cutting in abruptly

---

## Technical Implementation

### Gradient bridge divs (between sections)
```tsx
{/* Gradient bridge: light → dark gallery */}
<div className="h-28 bg-gradient-to-b from-[#F7FAFB] to-[#2C3A3F]" aria-hidden="true" />

{/* Gradient bridge: dark gallery → light features */}
<div className="h-28 bg-gradient-to-b from-[#2C3A3F] to-[#F7FAFB]" aria-hidden="true" />
```

### Extended hero bottom fade
```tsx
{/* Before */}
className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#F7FAFB] to-transparent"

{/* After — taller, with mid-stop for longer dissolve */}
className="absolute bottom-0 left-0 right-0 h-72 bg-gradient-to-t from-[#F7FAFB] via-[#F7FAFB]/60 to-transparent"
```

### Features section subtle gradient
```tsx
{/* Before */}
<section className="bg-[#F7FAFB] py-20 px-4">

{/* After — primes for CTA color */}
<section className="bg-gradient-to-b from-[#F7FAFB] to-[#EDF5FB] py-20 px-4">
```

### CTA top overlay (absolute)
```tsx
{/* Sits above dark overlay (z-10), bleeds features color into CTA image */}
<div
  className="absolute top-0 left-0 right-0 h-44 bg-gradient-to-b from-[#EDF5FB] to-transparent pointer-events-none z-10"
  aria-hidden="true"
/>
```

### Stats border removed
```tsx
{/* Before */}
<section className="bg-[#F7FAFB] py-10 px-4 border-b border-[#3E4A4F]/8">

{/* After */}
<section className="bg-[#F7FAFB] py-10 px-4">
```

### Unused import cleanup
- Removed `Star` from lucide-react imports (ESLint warning — never used in JSX)

---

## Color Flow Map (top to bottom)

```
HERO        photography + dark overlay (0.35→0.72 scroll-animated)
            ↓ h-72 fade: transparent → #F7FAFB
STATS       #F7FAFB cloud white (flat)
            ↓ seamless (same bg, no border)
DISCOVER    #F7FAFB cloud white (flat)
            ↓ h-28 gradient: #F7FAFB → #2C3A3F
GALLERY     #2C3A3F dark forest slate
            ↓ h-28 gradient: #2C3A3F → #F7FAFB
FEATURES    #F7FAFB → #EDF5FB (subtle sky tint gradient)
            ↓ absolute h-44 overlay: #EDF5FB → transparent (z-10)
CTA         photography + bg-[#2C3A3F]/78 dark overlay
```

---

## Performance Notes

- All gradient bridges are pure CSS divs — no JavaScript, no animation overhead
- `aria-hidden="true"` on all decorative bridge divs — no a11y impact
- `overflow-x-hidden` added to `<main>` prevents any horizontal bleed during section transitions
- Hero parallax (`useScroll` + `useTransform`) runs on the compositor thread — no layout thrashing

---

## Build Phase Sequence Reference

| Phase | Focus | Status |
|-------|-------|--------|
| **1 — Foundation** | Layout, providers, auth, design tokens, home page | ✅ Done |
| **1b — Image Enhancement** | Cloudinary photos, parallax hero, destinations grid, gallery strip | ✅ Done |
| **1c — Natural Breeze Reskin** | Color palette swap, transparent navbar overlay | ✅ Done |
| **1d — Scroll Continuity** | Gradient bridges, extended hero fade, section flow | ✅ Done |
| 2 — Core Screens | Discover listing, place detail (ISR), search, MapLibre | ⬜ Next |
| 3 — Live Features | Queues, traffic heatmap, parking (Socket.io) | ⬜ |
| 4 — Booking Flow | Hotel, transport, payment | ⬜ |
| 5 — AI Features | Trip planner, recommendations, budget | ⬜ |
| 6 — Gov Dashboard | Analytics, heatmaps | ⬜ |
| 7 — Mobile App | Expo React Native | ⬜ |
