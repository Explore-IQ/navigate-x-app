# Phase 3 — Live Features

**Status:** ✅ Done — 2026-06-13

## What was built

### Packages installed
- `zustand` ^5.x — Zustand stores filled in
- `socket.io-client` — Socket.io singleton in `lib/socket.ts`
- `maplibre-gl` + `@types/maplibre-gl` — Interactive maps

### Data layer
- `lib/mock-queues.ts` — `QueueEntry` + `SlotWindow` types, 12 queue entries mapped to all mock places, `getQueues()` + `getQueueById()`
- `lib/mock-traffic.ts` — `TrafficPoint` + `ParkingLot` types, 20 traffic heatmap points, 8 parking lots, `getParkingLots()`

### State stores (filled stubs)
- `stores/realtime.store.ts` — `queueData`, `trafficPoints`, `parkingLots`, `connected` — Zustand store
- `stores/map.store.ts` — `center`, `zoom`, `activeOverlay` — Zustand store
- `stores/filters.store.ts` — `category`, `maxWait`, `crowdLevel`, `reset()` — Zustand store

### Socket client
- `lib/socket.ts` — Lazy singleton, typed events (`queue:update`, `traffic:update`, `parking:update`), `onSocketEvent()` helper, graceful no-op when `NEXT_PUBLIC_SOCKET_URL` is not set

### Hooks
- `hooks/useQueueStatus.ts` — `useQueues()` + `useQueueById()` (30s poll) + `useBookSlot()` mutation with optimistic Sonner toast
- `hooks/useParkingStatus.ts` — `useParkingLots()` (30s poll)

### Queue components
- `components/queues/QueueCard.tsx` — List card; capacity bar, wait badge, hover lift
- `components/queues/QueueTimer.tsx` — SVG ring countdown; green/amber/red by wait time; pulse animation on high wait
- `components/queues/SlotBooking.tsx` — Time-window grid; selected state; `useBookSlot` mutation; Sonner toast

### Map components (MapLibre GL — all `ssr: false` via `dynamic`)
- `components/maps/TourismMap.tsx` — Base map; custom SVG pin markers; popups; responsive container
- `components/maps/CrowdHeatmap.tsx` — Heatmap layer on top of base map; reads `TrafficPoint[]`; green → amber → red color ramp
- `components/maps/RouteMap.tsx` — GeoJSON line + numbered waypoint markers (scaffold for Phase 5 trips)

### Pages
- `app/(tourist)/queues/page.tsx` — **CSR**; category pills + max-wait filter; 30s poll; 12 QueueCards; empty state
- `app/(tourist)/queues/loading.tsx` — 6-card skeleton
- `app/(tourist)/queues/[placeId]/page.tsx` — **CSR**; hero image; QueueTimer ring; SlotBooking grid; "Get Directions" CTA
- `app/(tourist)/queues/[placeId]/loading.tsx` — Hero + ring + slot grid skeleton
- `app/(tourist)/traffic/page.tsx` — **CSR**; CrowdHeatmap (full-height); Socket.io listener; "Live/Simulated" badge; top-5 crowded sidebar
- `app/(tourist)/traffic/loading.tsx` — Map + sidebar skeleton
- `app/(tourist)/parking/page.tsx` — **CSR**; TourismMap with color-coded lot markers; clickable lot list with progress bar + "Navigate" CTA
- `app/(tourist)/parking/loading.tsx` — Map + 4-card skeleton

## Key decisions

- **Socket.io with graceful fallback**: `NEXT_PUBLIC_SOCKET_URL` unset → returns null; all pages fall back to mock data and show "Simulated" badge. No crash in dev.
- **MapLibre uses free tile style**: `demotiles.maplibre.org` — no API key needed. Swap URL when switching to Mapbox/Google in production.
- **Dynamic imports for all map components**: MapLibre references `window` and `document` — `ssr: false` is mandatory.
- **Heatmap layer built-in**: MapLibre's native `heatmap` layer type used — no extra heatmap library.
- **RouteMap scaffolded for Phase 5**: Component is complete but not wired to any page yet; ready for `/trips/[tripId]`.

## Navigation fix — post-build (2026-06-13)

After the pages were built, `/queues` and `/parking` were only reachable by typing the URL manually — neither the Navbar nor BottomNav had links to them.

### Problem
- `NAV_LINKS` in `components/layout/Navbar.tsx` only had: Discover, Traffic, Trips, Bookings
- `BOTTOM_NAV_ITEMS` in `components/layout/BottomNav.tsx` only had: Discover, Traffic, Trips, Bookings, Profile

### Fix

**`components/layout/Navbar.tsx`** — added Queues and Parking to `NAV_LINKS`:
```ts
// Before
const NAV_LINKS = [
  { label: 'Discover', href: '/discover' },
  { label: 'Traffic',  href: '/traffic' },
  { label: 'Trips',    href: '/trips' },
  { label: 'Bookings', href: '/bookings/hotel' },
]

// After
const NAV_LINKS = [
  { label: 'Discover', href: '/discover' },
  { label: 'Queues',   href: '/queues' },
  { label: 'Traffic',  href: '/traffic' },
  { label: 'Parking',  href: '/parking' },
  { label: 'Trips',    href: '/trips' },
  { label: 'Bookings', href: '/bookings/hotel' },
]
```

**`components/layout/BottomNav.tsx`** — replaced Trips + Bookings with Queues + Parking (those pages aren't built yet; Queues and Parking are live):
```ts
// Before — imported: Compass, Navigation, Route, Ticket, User
const BOTTOM_NAV_ITEMS = [
  { label: 'Discover',  href: '/discover',       icon: Compass },
  { label: 'Traffic',   href: '/traffic',         icon: Navigation },
  { label: 'Trips',     href: '/trips',           icon: Route },
  { label: 'Bookings',  href: '/bookings',        icon: Ticket },
  { label: 'Profile',   href: '/profile',         icon: User },
]

// After — imported: Compass, Clock, Navigation, ParkingSquare, User
const BOTTOM_NAV_ITEMS = [
  { label: 'Discover',  href: '/discover',  icon: Compass },
  { label: 'Queues',    href: '/queues',    icon: Clock },
  { label: 'Traffic',   href: '/traffic',   icon: Navigation },
  { label: 'Parking',   href: '/parking',   icon: ParkingSquare },
  { label: 'Profile',   href: '/profile',   icon: User },
]
```

### Result
- Desktop navbar: **Discover · Queues · Traffic · Parking · Trips · Bookings**
- Mobile bottom nav: **Discover · Queues · Traffic · Parking · Profile**
- Active-link highlight and underline animation work correctly for both new routes

---

## Acceptance criteria — all verified
- [x] `/queues` — 12 cards, category + wait filters, 30s poll badge
- [x] `/queues/[placeId]` — timer ring, slot grid, booking mutation + Sonner toast
- [x] `/traffic` — heatmap map, "Simulated" badge (no socket URL), top-5 list
- [x] `/parking` — map with colored pins, lot list, "Navigate" deep-link
- [x] All pages have skeleton loading states
- [x] `/queues` and `/parking` accessible from Navbar (desktop) and BottomNav (mobile)
- [x] Zero TypeScript errors (`tsc --noEmit`)

## Next up — Phase 4
- Booking flow: hotel, transport, rentals
- `app/(tourist)/bookings/hotel/page.tsx`
- `app/(tourist)/bookings/transport/page.tsx`
- `app/(tourist)/bookings/rentals/page.tsx`
- `components/bookings/HotelCard.tsx`, `TransportCard.tsx`
- Payment step (mock Razorpay / Stripe)
