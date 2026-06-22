# Phase 3 — Live Features: Implementation Plan

**Status:** 🔲 Planned — 2026-06-13  
**Follows:** Phase 2 — Core Screens (complete)  
**Builds:** Queues, Traffic Heatmap, Parking — all real-time / CSR

---

## Scope

| Screen | Route | Strategy | Real-time source |
|--------|-------|----------|-----------------|
| Queue listing | `/queues` | CSR + TanStack Query poll 30s | Mock → Socket.io |
| Queue detail + booking | `/queues/[placeId]` | CSR + poll 30s | Mock → Socket.io |
| Live traffic heatmap | `/traffic` | CSR + WebSocket | Socket.io |
| Parking availability | `/parking` | CSR + WebSocket | Socket.io |

---

## Packages to Install

| Package | Purpose |
|---------|---------|
| `zustand` | Fill out scaffolded stores (map, realtime, filters) |
| `socket.io-client` | WebSocket connection to live backend |
| `maplibre-gl` | Interactive map base for traffic + parking |
| `@types/maplibre-gl` | TypeScript types |

---

## Implementation Steps (in order)

### Step 1 — Install Packages
```bash
npm install zustand socket.io-client maplibre-gl
npm install -D @types/maplibre-gl
```

---

### Step 2 — Mock Data Layer
**File:** `lib/mock-queues.ts` (new)

Types and data:
```ts
interface QueueEntry {
  placeId: string
  placeName: string
  category: string
  currentWait: number      // minutes
  capacity: number
  occupied: number
  slots: SlotWindow[]
  status: 'open' | 'full' | 'closed'
}

interface SlotWindow {
  id: string
  time: string             // "10:00 AM"
  available: number
  total: number
}
```
12 queue entries mapped to existing mock place IDs.

**File:** `lib/mock-traffic.ts` (new)

```ts
interface TrafficPoint {
  lat: number
  lng: number
  density: number   // 0–1
  placeId?: string
}

interface ParkingLot {
  id: string
  placeId: string
  name: string
  total: number
  available: number
  lat: number
  lng: number
}
```

---

### Step 3 — Zustand Stores

**`stores/realtime.store.ts`** — fill stub:
```ts
interface RealtimeState {
  queueData: Record<string, QueueEntry>
  trafficPoints: TrafficPoint[]
  parkingLots: ParkingLot[]
  connected: boolean
  setQueueData: (id: string, data: QueueEntry) => void
  setTrafficPoints: (pts: TrafficPoint[]) => void
  setParkingLots: (lots: ParkingLot[]) => void
  setConnected: (v: boolean) => void
}
```

**`stores/map.store.ts`** — fill stub:
```ts
interface MapState {
  center: [number, number]   // [lng, lat]
  zoom: number
  activeOverlay: 'traffic' | 'parking' | 'none'
  setCenter: (c: [number, number]) => void
  setZoom: (z: number) => void
  setOverlay: (o: MapState['activeOverlay']) => void
}
```

**`stores/filters.store.ts`** — fill stub:
```ts
interface FiltersState {
  category: string
  maxWait: number            // minutes
  crowdLevel: 'any' | 'low' | 'medium' | 'high'
  setCategory: (c: string) => void
  setMaxWait: (m: number) => void
  setCrowdLevel: (l: FiltersState['crowdLevel']) => void
}
```

---

### Step 4 — Socket.io Client

**`lib/socket.ts`** — fill stub:
- Lazy singleton — connects on first call
- Emits typed events: `queue:update`, `traffic:update`, `parking:update`
- Exposes `connect()`, `disconnect()`, `on()`, `off()`
- Falls back gracefully if `NEXT_PUBLIC_SOCKET_URL` is not set (dev mode)

---

### Step 5 — TanStack Query Hooks

**`hooks/useQueueStatus.ts`** (already scaffolded — fill):
```ts
useQueues()           // all queues, refetchInterval: 30_000
useQueueById(placeId) // single queue
useBookSlot()         // mutation — POST /queue/:id/book
```

**`hooks/useParkingStatus.ts`** (new):
```ts
useParkingLots()      // all lots, refetchInterval: 30_000
```

---

### Step 6 — Queue Components

**`components/queues/QueueTimer.tsx`**
- Props: `waitMinutes: number`, `status: QueueEntry['status']`
- Visual: large countdown ring (SVG), color-coded by wait
  - ≤15 min → green (`#4F8A65`)
  - 16–30 min → amber (`#EBA86B`)
  - \>30 min → red
- Framer Motion pulse animation on the ring

**`components/queues/SlotBooking.tsx`**
- Props: `slots: SlotWindow[]`, `placeId: string`
- Grid of time-window cards with available count
- Booking confirmation via Sonner toast
- Optimistic update via TanStack Query `useMutation`

**`components/queues/QueueCard.tsx`** (new)
- Compact card: place thumbnail, wait badge, status pill, "View Slots" CTA
- Hover lift animation matching PlaceCard style

---

### Step 7 — Queue Pages

**`app/(tourist)/queues/page.tsx`** — CSR
- `'use client'`
- `useQueues()` with 30s poll
- DiscoverFilters re-used for category filter
- QueueCard grid with skeleton loading (6 cards)
- Filter bar: category, max wait slider, crowd level pills
- Empty state if no queues match filters

**`app/(tourist)/queues/loading.tsx`**
- 6-card skeleton grid

**`app/(tourist)/queues/[placeId]/page.tsx`** — CSR
- `'use client'` + `useQueueById(placeId)`
- Top section: place hero image + QueueTimer
- Middle: SlotBooking time-window grid
- Bottom: map mini-preview (place location pin)
- CTAs: "Book Slot" (mutation) + "Get Directions"

**`app/(tourist)/queues/[placeId]/loading.tsx`**
- Hero skeleton + slot grid skeleton

---

### Step 8 — Map Component (MapLibre GL)

**`components/maps/TourismMap.tsx`**
- Dynamic import with `ssr: false` (MapLibre uses `window`)
- Props: `center`, `zoom`, `markers`, `onMarkerClick`
- Default map style: `https://demotiles.maplibre.org/style.json` (free, no key)
- Custom marker icons: category-colored SVG pins
- Responsive: fills parent container

**`components/maps/CrowdHeatmap.tsx`**
- Extends `TourismMap` with heatmap layer
- Props: `points: TrafficPoint[]`
- Uses MapLibre's built-in heatmap layer type
- Color ramp: `#4F8A65` (low) → `#EBA86B` (medium) → `#E05C5C` (high)
- Reads `trafficPoints` from Zustand realtime store

**`components/maps/RouteMap.tsx`**
- Extends `TourismMap` with a GeoJSON line layer
- Props: `waypoints: [number, number][]`
- Used in `/trips/[tripId]` (Phase 5) — scaffold now, implement in Phase 5

---

### Step 9 — Traffic Page

**`app/(tourist)/traffic/page.tsx`** — CSR
- `'use client'`
- Full-height layout with map taking 60% height on mobile, 70% on desktop
- Socket.io connection via `lib/socket.ts` — listens to `traffic:update`
- Updates Zustand `realtimeStore.trafficPoints` on each event
- `CrowdHeatmap` reads from store
- Sidebar: top-5 most crowded places list
- Legend: low / medium / high density color key
- "Live" indicator badge (pulsing green dot when connected)

**`app/(tourist)/traffic/loading.tsx`**
- Map skeleton + list skeleton

---

### Step 10 — Parking Page

**`app/(tourist)/parking/page.tsx`** — CSR
- `'use client'`
- `useParkingLots()` with 30s poll
- Map view: `TourismMap` with parking lot markers
  - Green pin → ≥50% available
  - Amber pin → 20–49% available
  - Red pin → <20% available
- List below map: ParkingLotCard components (name, total, available, distance)
- Tap marker → scroll to card highlight
- "Navigate" CTA: opens `maps://` deep link

**`app/(tourist)/parking/loading.tsx`**
- Map skeleton + 4-card list skeleton

---

### Step 11 — Navigation Wiring

Update `components/layout/BottomNav.tsx`:
- "Traffic" tab → `/traffic`
- Confirm queue icon routes to `/queues`

---

## File Checklist

### New files
| File | Description |
|------|-------------|
| `lib/mock-queues.ts` | 12 queue entries for all mock places |
| `lib/mock-traffic.ts` | Traffic heatmap points + parking lots |
| `hooks/useParkingStatus.ts` | Parking TanStack Query hook |
| `components/queues/QueueCard.tsx` | List-view queue card |
| `components/queues/QueueTimer.tsx` | Wait countdown ring |
| `components/queues/SlotBooking.tsx` | Slot time-window grid + booking |
| `components/maps/TourismMap.tsx` | MapLibre base map (dynamic, ssr:false) |
| `components/maps/CrowdHeatmap.tsx` | Heatmap layer on top of TourismMap |
| `components/maps/RouteMap.tsx` | Route line layer (scaffold for Phase 5) |
| `app/(tourist)/queues/page.tsx` | Queue listing CSR page |
| `app/(tourist)/queues/loading.tsx` | Queue list skeleton |
| `app/(tourist)/queues/[placeId]/page.tsx` | Queue detail + slot booking |
| `app/(tourist)/queues/[placeId]/loading.tsx` | Detail skeleton |
| `app/(tourist)/traffic/page.tsx` | Traffic heatmap CSR page |
| `app/(tourist)/traffic/loading.tsx` | Traffic skeleton |
| `app/(tourist)/parking/page.tsx` | Parking CSR page |
| `app/(tourist)/parking/loading.tsx` | Parking skeleton |

### Modified files
| File | Change |
|------|--------|
| `stores/realtime.store.ts` | Fill Zustand store stub |
| `stores/map.store.ts` | Fill Zustand store stub |
| `stores/filters.store.ts` | Fill Zustand store stub |
| `lib/socket.ts` | Fill Socket.io client stub |
| `hooks/useQueueStatus.ts` | Fill hook stub |
| `components/layout/BottomNav.tsx` | Verify nav routes |

---

## Design Tokens Applied

| Element | Token |
|---------|-------|
| Wait ≤15 min | `#4F8A65` (Leaf green) |
| Wait 16–30 min | `#EBA86B` (Sunset) |
| Wait >30 | `#E05C5C` (error red) |
| Map heatmap low | `#4F8A65` |
| Map heatmap high | `#E05C5C` |
| Parking available | `#4F8A65` |
| Parking scarce | `#EBA86B` |
| Parking full | `#E05C5C` |

---

## Acceptance Criteria

- [ ] `/queues` renders 12 queue cards, polled every 30s
- [ ] `/queues/[placeId]` shows timer ring, slot grid, booking mutation
- [ ] Booking triggers Sonner toast (success/error)
- [ ] `/traffic` shows MapLibre map with heatmap overlay
- [ ] "Live" badge shows connected/disconnected state
- [ ] `/parking` shows map with color-coded lot markers + list
- [ ] All pages have skeleton loading states
- [ ] Zero TypeScript errors (`tsc --noEmit`)
- [ ] Mobile layout verified at 375px
