# Phase 1b — Image Enhancement & Home Page Redesign

**Date:** 2026-06-10
**Status:** Done
**Branch:** GENAI-002-Enhancing-background
**Follows:** [phase1-foundation.md](./phase1-foundation.md)
**Next:** Phase 2 — Core Screens (Discover, Place Detail, Search, Map)

---

## What Changed

### New File Created

| File | Purpose |
|------|---------|
| `app/HomeClient.tsx` | `'use client'` component — full animated home page content (hero, destinations grid, gallery strip, features, CTA). Keeps `app/page.tsx` as a server component for metadata. |

---

### Files Modified

#### `app/page.tsx`
- Stripped all UI out into `HomeClient.tsx`
- Now a lean **server component** that only exports `metadata` (including OpenGraph image) and renders `<Navbar />` + `<HomeClient />`
- Cloudinary OG image wired: `w_1200,h_630,c_fill,g_auto` transformation on the hero photo

#### `app/globals.css`
- Added `@keyframes marquee` + `.marquee-track` CSS class for the infinite gallery strip
- Added `@media (prefers-reduced-motion: reduce)` override — marquee stops completely
- Added `.group-hover\:scale-108` utility for destination card image zoom

#### `app/api/auth/[...nextauth]/route.ts`
- Added stub `GET` + `POST` exports returning `501 Not Implemented`
- Fixes TypeScript error: *"File is not a module"* — Next.js validator requires route files to export handlers

#### `app/api/revalidate/route.ts`
- Added stub `POST` export returning `501 Not Implemented`
- Same fix as above

#### `app/(tourist)/discover/[placeId]/page.tsx`
- Fixed `PageProps` generic argument: `'/(tourist)/discover/[placeId]'` → `'/discover/[placeId]'`
- Next.js 16 strips route group prefixes from the `AppRoutes` union type

#### `app/(tourist)/queues/[placeId]/page.tsx`
- Same fix: `PageProps<'/queues/[placeId]'>`

#### `app/(tourist)/trips/[tripId]/page.tsx`
- Same fix: `PageProps<'/trips/[tripId]'>`

---

## Cloudinary Images Used

| # | Public ID (after `/upload/`) | Used in |
|---|------------------------------|---------|
| 1 | `v1781095115/vaisakh-satheesan-US4m1uJSco4-unsplash_jfvgyc.jpg` | Hero parallax background + Gallery strip + OG image |
| 2 | `v1781095107/david-samraj-JaSI5XDzsL8-unsplash_rvoigk.jpg` | Destination card 1 — "Temples of the South" (Tamil Nadu) |
| 3 | `v1781095107/aravind-thangaraj-7Ko8TpWTdTE-unsplash_kk6yow.jpg` | Destination card 2 — "Hill Stations" (Western Ghats) |
| 4 | `v1781095106/wouter-naert-dwg12DlR2Mk-unsplash_zvvbi1.jpg` | Destination card 3 — "Coastal Wonders" (Kerala & Goa) — wide |
| 5 | `v1781095105/siby-QXIBCvvA_jc-unsplash_kqvkbb.jpg` | Destination card 4 — "Sacred Pilgrimage Routes" (Uttarakhand) — wide + CTA bg |
| 6 | `v1781095105/subhadeep-dishant-Cs-hI1if4lU-unsplash_z0ul1j.jpg` | Destination card 5 — "Golden Heritage" (Rajasthan) |
| 7 | `v1781095104/subash-matheswaran-OFpmoFFc63c-unsplash_r1uudy.jpg` | Destination card 6 — "Backwater Trails" (Kerala) |

All 7 images appear in the **Gallery Strip** (duplicated for seamless loop).

### Cloudinary Transformation Params Applied

| Context | Transformation string |
|---------|----------------------|
| Hero background | `f_auto,q_auto,w_1920` |
| Destination cards (portrait) | `f_auto,q_auto,w_800,h_1000,c_fill,g_auto` |
| Destination cards (wide/landscape) | `f_auto,q_auto,w_1200,h_700,c_fill,g_auto` |
| Gallery strip | `f_auto,q_auto,w_500,h_340,c_fill,g_auto` |
| CTA section bg | `f_auto,q_auto,w_1600` |
| OpenGraph image | `f_auto,q_auto,w_1200,h_630,c_fill,g_auto` |

---

## Home Page Section Breakdown

### 1 — Hero (full viewport)
- `next/image` with `fill` + `object-cover` inside a `motion.div` for **parallax scroll** (`useScroll` + `useTransform` — image moves at 25% of scroll speed)
- Dynamic overlay: opacity increases from `0.45` → `0.80` as user scrolls (keeps text readable)
- Bottom fade: `bg-gradient-to-t from-[#FFF9F0] to-transparent` — blends into the stats section
- **Glassmorphism search bar**: `bg-white/10 backdrop-blur-md border border-white/20`
- Animated with Framer Motion `variants` + `staggerChildren: 0.08`
- Bouncing `ChevronDown` scroll cue (infinite `y: [0, 8, 0]` loop)

### 2 — Stats Strip
- 2-column mobile, 4-column desktop
- Values: 5,000+ Destinations · 2M+ Travellers · 28 States · 4.8★

### 3 — Destinations Grid
- Mixed portrait + landscape masonry layout:
  - **Row 1:** two portrait cards + one tall portrait spanning 2 rows (desktop only)
  - **Row 2:** one wide landscape (2-col span)
  - **Row 3:** one wide landscape (2-col span) + one portrait
- Each card: `group-hover:scale-108` image zoom · bottom gradient · category badge · location + title · "Explore →" fades in on hover
- Scroll-triggered reveal: Framer Motion `whileInView` with `staggerChildren`

### 4 — Gallery Strip
- All 7 images duplicated (14 total) for seamless CSS loop
- `animation: marquee 40s linear infinite` — pauses on `prefers-reduced-motion: reduce`
- Images: `w-72 h-44 rounded-xl` with subtle `hover:scale-105`

### 5 — Features (4 cards)
- Live Crowd Maps · Instant Queue Slots · AI Trip Planner · Discover Hidden Gems
- Scroll-triggered stagger animation
- `hover:shadow-lg hover:-translate-y-1` lift effect

### 6 — CTA Banner
- `siby` pilgrimage photo as full-bleed background with `bg-[#1A1040]/80` overlay
- "Get started — it's free" (saffron) + "Browse destinations" (outline) buttons
- Scroll-triggered `whileInView` entrance animation

---

## Bugs Fixed

| Bug | Root Cause | Fix |
|-----|-----------|-----|
| `app/api/auth/[...nextauth]/route.ts` not a module | Placeholder had only a comment, no exports — Next.js validator requires named exports | Added `export const GET` + `export const POST` returning `501` |
| `app/api/revalidate/route.ts` not a module | Same reason | Added `export const POST` returning `501` |
| `PageProps<'/(tourist)/discover/[placeId]'>` type error | Next.js 16 strips route group names from `AppRoutes` union — `(tourist)` is not in the generated type | Changed to `PageProps<'/discover/[placeId]'>` |
| Same for `/queues/[placeId]` and `/trips/[tripId]` | Same root cause | Same fix |

---

## Architecture Decision — Server Shell + Client Interactivity

`app/page.tsx` is kept as a **server component** so `export const metadata` works (required for OG tags, title, description). All interactive + animated content lives in `app/HomeClient.tsx` (`'use client'`).

```
app/page.tsx          ← server: metadata, Navbar, renders HomeClient
app/HomeClient.tsx    ← client: all Framer Motion, hooks, image grid
```

This preserves Next.js SSR metadata benefits while allowing full Framer Motion parallax + `useScroll` hooks client-side.

---

## Animation Inventory

| Element | Library | Technique |
|---------|---------|-----------|
| Hero text entrance | Framer Motion | `variants` stagger, `opacity 0→1`, `y 32→0` |
| Hero parallax | Framer Motion | `useScroll` + `useTransform` on `scrollYProgress` |
| Overlay darkening on scroll | Framer Motion | `useTransform` opacity `0.45→0.80` |
| Scroll cue bounce | Framer Motion | `animate={{ y: [0, 8, 0] }}` infinite |
| Destination cards reveal | Framer Motion | `whileInView`, `viewport={{ once: true }}`, stagger |
| Gallery strip loop | CSS `@keyframes marquee` | No JS — pauses on `prefers-reduced-motion` |
| Feature cards reveal | Framer Motion | `whileInView` stagger |
| CTA banner reveal | Framer Motion | `whileInView` fade+slide |

---

## Build Phase Sequence Reference

| Phase | Focus | Status |
|-------|-------|--------|
| **1 — Foundation** | Layout, providers, auth, design tokens, home page | ✅ Done |
| **1b — Image Enhancement** | Cloudinary photos, parallax hero, destinations grid, gallery strip | ✅ Done |
| 2 — Core Screens | Discover listing, place detail (ISR), search, MapLibre | ⬜ Next |
| 3 — Live Features | Queues, traffic heatmap, parking (Socket.io) | ⬜ |
| 4 — Booking Flow | Hotel, transport, payment | ⬜ |
| 5 — AI Features | Trip planner, recommendations, budget | ⬜ |
| 6 — Gov Dashboard | Analytics, heatmaps | ⬜ |
| 7 — Mobile App | Expo React Native | ⬜ |
