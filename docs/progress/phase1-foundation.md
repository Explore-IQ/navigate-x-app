# Phase 1 — Foundation Complete

**Date:** 2026-06-10
**Status:** Done
**Next Phase:** Phase 2 — Core Screens (Discover, Place Detail, Search, Map Integration)

---

## What Was Built

### New Files Created

| File | Purpose |
|------|---------|
| `app/globals.css` | Added Festive India brand tokens to `@theme` — `--color-saffron/gold/cream/forest/indigo-deep/rose-alert` — usable as `bg-saffron`, `text-gold`, etc. |
| `app/providers.tsx` | Client providers: `QueryClientProvider` (TanStack Query v5) + `ThemeProvider` (next-themes, light mode locked) |
| `app/layout.tsx` | Root layout — Poppins 700/800 (display), Geist (body), Geist Mono, Sonner `Toaster`, full SEO metadata |
| `app/(tourist)/layout.tsx` | Tourist group layout — wraps all tourist routes with `Navbar` + `BottomNav`, `pt-16 pb-20 md:pb-0` |
| `app/page.tsx` | SSR home page — hero (deep indigo bg, saffron headline, search bar, category pills), stats strip, 3-feature cards, CTA banner |
| `app/(auth)/login/page.tsx` | Two-panel login — left decorative panel, right RHF + Zod form, Sonner toasts, Framer Motion entrance |
| `app/(auth)/register/page.tsx` | Two-panel register — stagger Framer Motion, 5-field RHF + Zod form (name, email, phone, password, confirm), checkmark benefits list |
| `components/layout/Navbar.tsx` | Fixed `h-16` deep indigo bar, active underline nav indicator, shadcn `Sheet` mobile slide-out menu |
| `components/layout/BottomNav.tsx` | 5-tab mobile bottom nav — Discover / Traffic / Trips / Bookings / Profile, saffron active glow state |

---

## Packages Installed in This Phase

| Package | Version | Purpose |
|---------|---------|---------|
| `@tanstack/react-query` | ^5.101.0 | Server state — all API data fetching |
| `react-hook-form` | ^7.78.0 | Form state management |
| `@hookform/resolvers` | ^5.4.0 | Zod resolver for RHF |
| `next-auth` | ^5.0.0-beta.31 | Auth (NextAuth v5 beta) |

### Already Installed (used in this phase)
- `framer-motion` ^12.40.0
- `sonner` ^2.0.7
- `next-themes` ^0.4.6
- `zod` (transitive)
- `lucide-react` ^1.17.0
- `shadcn/ui` components: Button, Input, Sheet, Skeleton, Sonner, Badge, Card

---

## Design System Applied

### Festive India Colors (now as Tailwind utilities)

| Utility | Hex | Usage |
|---------|-----|-------|
| `bg-saffron` / `text-saffron` | `#FF6B00` | Primary CTA, active states, brand accent |
| `bg-gold` / `text-gold` | `#FFB800` | Badges, highlights, secondary accent |
| `bg-cream` | `#FFF9F0` | Page background |
| `bg-forest` / `text-forest` | `#1B7A4A` | Success states, checkmarks |
| `bg-indigo-deep` / `text-indigo-deep` | `#1A1040` | Navbar, hero bg, headings |
| `bg-rose-alert` / `text-rose-alert` | `#E8445A` | Errors, alerts, destructive |

### Typography

| Role | Font | Weight |
|------|------|--------|
| Display headings | Poppins (`font-(family-name:--font-poppins)`) | 700, 800 |
| Body text | Geist (`font-sans`) | 400, 500 |
| Code | Geist Mono (`font-mono`) | 400 |

### Layout Rules Applied
- Navbar is fixed `h-16` — all tourist content has `pt-16`
- Mobile BottomNav is fixed — tourist content has `pb-20 md:pb-0`
- Cards: `rounded-2xl`, `shadow-sm`, `hover:shadow-lg hover:-translate-y-1 transition-all`
- Badges/pills: `rounded-full`
- Touch targets: minimum `min-h-11 min-w-11` (44px)

---

## Rendering Strategy Applied

| Route | Strategy | Notes |
|-------|----------|-------|
| `/` | SSR | Server component, no `'use client'` |
| `/login` | CSR | `'use client'` — RHF requires it |
| `/register` | CSR | `'use client'` — RHF requires it |
| `/(tourist)/*` | Inherits from child | Layout itself is a server component |

---

## Key Technical Decisions & Gotchas

### Next.js 16 Breaking Changes (from docs)
- `params` and `searchParams` are now **Promises** — always `await params` in dynamic pages
- `PageProps<'/path/[slug]'>` and `LayoutProps<'/path'>` are global type helpers — no import needed
- Turbopack is the default for both `next dev` and `next build`
- `revalidateTag` now requires a second `cacheLife` argument

### Framer Motion v12
- `ease` in `Variants` objects cannot be a plain string like `'easeOut'`
  - Fix: omit `ease` entirely, or use a bezier array `[0.25, 0.46, 0.45, 0.94]`
- Core API (`motion.div`, `AnimatePresence`, `whileHover`, `variants`) is unchanged

### Architecture Decisions
- `app/page.tsx` (home) imports `Navbar` directly — it's outside the `(tourist)` group, so no `BottomNav`
- `(tourist)/layout.tsx` adds `BottomNav` only to tourist routes
- `(auth)` pages inherit root layout only — Navbar is included via root layout? No — Navbar is imported directly in `page.tsx`. Auth pages have no nav (standalone two-panel auth UI)
- `app/providers.tsx` is a client component — necessary because `QueryClientProvider` uses React context

---

## Packages NOT Yet Installed (needed in future phases)

| Package | Phase | Purpose |
|---------|-------|---------|
| `socket.io-client` | Phase 3 | Live queues, traffic heatmap |
| `maplibre-gl` | Phase 2 | Tourism map, crowd heatmap |
| `next-intl` | Phase 2+ | Internationalisation |
| `recharts` + `d3` | Phase 5-6 | Budget charts, analytics |
| `zustand` | Phase 2 | Stores scaffolded but empty — install when first store is implemented |

---

## Files Scaffolded (placeholder only — to be implemented)

All files below have a single one-line comment describing their purpose. They are ready to be implemented in their respective phases.

### `app/(tourist)/` routes
- `discover/page.tsx` — Phase 2
- `discover/[placeId]/page.tsx` — Phase 2 (ISR)
- `discover/search/page.tsx` — Phase 2
- `traffic/page.tsx` — Phase 3
- `queues/page.tsx`, `queues/[placeId]/page.tsx` — Phase 3
- `parking/page.tsx` — Phase 3
- `trips/page.tsx`, `trips/new/page.tsx`, `trips/[tripId]/page.tsx` — Phase 5
- `bookings/hotel/page.tsx`, `bookings/transport/page.tsx`, `bookings/rentals/page.tsx` — Phase 4
- `budget/page.tsx` — Phase 5
- `profile/page.tsx` — Phase 2+

### `app/api/`
- `auth/[...nextauth]/route.ts` — Phase 1 (wire up NextAuth)
- `revalidate/route.ts` — Phase 2

### `components/`
- `maps/TourismMap.tsx`, `CrowdHeatmap.tsx`, `RouteMap.tsx` — Phase 2-3
- `places/PlaceCard.tsx`, `PlaceList.tsx`, `PlaceDetail.tsx`, `PlaceGallery.tsx` — Phase 2
- `queues/QueueTimer.tsx`, `SlotBooking.tsx` — Phase 3
- `bookings/HotelCard.tsx`, `TransportCard.tsx` — Phase 4
- `3d/HeroBackground.tsx`, `ParticleField.tsx` — Phase 2 (home page enhancement)
- `ai/RecommendationPanel.tsx`, `BudgetPlanner.tsx` — Phase 5

### `stores/` (all empty, implement with zustand when phase requires)
- `auth.store.ts`, `map.store.ts`, `filters.store.ts`, `realtime.store.ts`, `offline.store.ts`

### `hooks/` (all empty, implement with TanStack Query when phase requires)
- `usePlaces.ts`, `useQueueStatus.ts`, `useBookings.ts`, `useRecommendations.ts`, `useGeolocation.ts`

### `lib/` (all empty)
- `api.ts`, `auth.ts`, `geo.ts`, `socket.ts`

---

## Build Phase Sequence Reference

| Phase | Focus | Status |
|-------|-------|--------|
| **1 — Foundation** | Layout, providers, auth, design tokens, home page | ✅ Done |
| 2 — Core Screens | Discover listing, place detail (ISR), search, map | ⬜ Next |
| 3 — Live Features | Queues, traffic heatmap, parking | ⬜ |
| 4 — Booking Flow | Hotel, transport, payment | ⬜ |
| 5 — AI Features | Trip planner, recommendations, budget | ⬜ |
| 6 — Gov Dashboard | Analytics, heatmaps | ⬜ |
| 7 — Mobile App | Expo React Native | ⬜ |
