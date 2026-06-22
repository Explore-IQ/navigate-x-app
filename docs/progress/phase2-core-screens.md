# Phase 2 — Core Screens

**Status:** ✅ Done — 2026-06-10

## What was built

### Data layer
- `lib/mock-places.ts` — `Place` type, 12 Indian destinations, `getPlaces()`, `getPlaceById()`, `getFeaturedPlace()`
- `lib/api.ts` — async API functions (`fetchPlaces`, `fetchPlaceById`) — thin wrappers over mock data; swap for real API later
- `hooks/usePlaces.ts` — TanStack Query hooks (`usePlaces`, `usePlaceById`) for CSR pages

### Components
- `components/places/PlaceCard.tsx` — client component; 4:3 image, category badge, crowd badge, star rating, season, bookmark, hover lift animation
- `components/places/PlaceList.tsx` — client component; 1/2/3 col responsive grid, stagger animation, 6-card skeleton loading, empty state
- `components/places/DiscoverFilters.tsx` — client component; pill tab list using `<Link>` for SSR-compatible URL-based filtering
- `components/places/PlaceGallery.tsx` — client component; 2/3 col grid + lightbox with Framer Motion AnimatePresence, keyboard-accessible
- `components/places/PlaceDetail.tsx` — client component; hero image, sticky back/rating chips, tabbed Overview/Gallery/Visit Info, CTA buttons

### Pages
- `app/(tourist)/discover/page.tsx` — **SSR**; reads `searchParams.category` + `sort`; renders Editor's Pick featured card + filtered grid; no `'use client'`
- `app/(tourist)/discover/loading.tsx` — Skeleton loading state matching page layout
- `app/(tourist)/discover/[placeId]/page.tsx` — **ISR** (`revalidate = 3600`); `generateStaticParams` for all 12 places; `generateMetadata` for SEO; `notFound()` on missing id
- `app/(tourist)/discover/[placeId]/loading.tsx` — Detail page skeleton
- `app/(tourist)/discover/search/page.tsx` — **CSR** (`'use client'`); TanStack Query via `usePlaces`; live filtering by query string + category + sort; no URL sync (in-memory state)

## Key decisions

- **SSR discover with URL filters**: Category/sort changes push URL params via `<Link>`, triggering full SSR re-render. No client-side filter state needed on the listing page.
- **PlaceList as client component**: Framer Motion stagger requires client. Server passes serialized `Place[]` props; this is valid RSC pattern.
- **Mock data over mock API**: `lib/mock-places.ts` is sync; `lib/api.ts` wraps it as `Promise.resolve()`. When backend is ready, only `lib/api.ts` changes.
- **12 Unsplash placeholder images**: Hard-coded Unsplash IDs until Cloudinary assets are uploaded. Replace `imageUrl`/`gallery` fields in mock data — no component changes needed.
- **`notFound()` returns 200 in dev mode** — known Next.js 16 dev server behavior; production build correctly returns HTTP 404.

## Verified
- `/discover` — 200, SSR, all 12 places render
- `/discover?category=beach` — filters to 2 beach places only
- `/discover?sort=rating` — sort working
- `/discover/hampi` — 200, ISR, Overview/Gallery/Visit Info tabs, Add to Trip CTA
- `/discover/ranthambore` — 200, shows "Book Queue Slot" CTA (queueEnabled: true)
- `/discover/does-not-exist` — renders not-found page (correct behavior)
- `/discover/search` — 200, CSR, TanStack Query
- Zero TypeScript errors (`tsc --noEmit`)

## Next up — Phase 3
- Queue listing + slot booking (CSR + TanStack Query polling every 30s)
- Traffic heatmap (CSR + WebSocket / Socket.io)
- MapLibre GL map integration
- Install socket.io-client
