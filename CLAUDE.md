@AGENTS.md

# Tourism Mobility & Management Platform — Web App
# Claude Code Context File — Read this before every task

## Project Overview
This is the **tourist-facing web app** of the Tourism Mobility & Management Platform.
It is one of three apps in a monorepo (web, mobile, gov-dashboard).
Focus area: `apps/web/` inside `tourism-platform-frontend/`

## Tech Stack (exact versions — do not substitute)
- **Framework**: Next.js 15 (App Router) — NOT Pages Router
- **Language**: TypeScript 5 — strict mode always on
- **UI**: shadcn/ui (New York style, Zinc base) + Tailwind CSS v4
- **Icons**: Lucide React (from Nova preset)
- **Font**: Geist (from Nova preset)
- **Animations**: Framer Motion v11
- **3D Backgrounds**: React Three Fiber + @react-three/drei
- **Global State**: Zustand
- **Server State**: TanStack Query (React Query v5)
- **Forms**: React Hook Form + Zod
- **Maps**: MapLibre GL / Google Maps SDK
- **Charts**: Recharts + D3.js
- **Real-time**: Socket.io client
- **Internationalisation**: next-intl
- **Image hosting**: Cloudinary via next-cloudinary
- **Notifications**: Sonner (NOT toast — toast is deprecated)
- **Testing**: Vitest + React Testing Library + Playwright

## Design System — ALWAYS follow these rules
### Colors (Natural Breeze theme)
- Primary / Sky blue: `#6CB6E4`
- Accent / Leaf green: `#4F8A65`
- Sand: `#F2E3C6`
- Cloud / background: `#F7FAFB`
- Stone / text: `#3E4A4F`
- Sunset / accent: `#EBA86B`

### Typography
- Display headings: Poppins 700/800 (import from Google Fonts)
- Body text: Geist (already installed via Nova preset)
- Code: Geist Mono

### Component Rules
- Border radius: `rounded-2xl` for cards, `rounded-full` for badges/pills
- Shadows: `shadow-sm` default, `shadow-lg` on hover
- All cards have hover lift: `hover:-translate-y-1 transition-transform`
- Loading states: ALWAYS use Skeleton component — never show empty space
- Errors: ALWAYS use Sonner toast — never alert()

### Background imagery
- Use Cloudinary-hosted tourism imagery for hero/background panels and immersive sections
- Prefer soft scenic overlays with natural light, beaches, forests, mountains, and gentle sky gradients
- Do not use heavy festive or high-contrast color treatments in backgrounds
- Use skills to integrate dynamic Cloudinary images where available, especially for hero, destination, and place-detail backgrounds

## Folder Structure — STRICTLY follow this
```
app/
├── layout.tsx                  # Root layout — providers, fonts, nav
├── page.tsx                    # Home page — SSR
├── globals.css
├── (auth)/
│   ├── login/page.tsx
│   └── register/page.tsx
├── (tourist)/
│   ├── layout.tsx              # Shared nav + bottom bar
│   ├── discover/
│   │   ├── page.tsx            # SSR — place listings
│   │   ├── [placeId]/page.tsx  # SSR + ISR revalidate:3600
│   │   └── search/page.tsx
│   ├── traffic/page.tsx        # CSR — live heatmap
│   ├── queues/
│   │   ├── page.tsx
│   │   └── [placeId]/page.tsx
│   ├── parking/page.tsx        # CSR
│   ├── trips/
│   │   ├── page.tsx
│   │   ├── new/page.tsx        # AI route planner
│   │   └── [tripId]/page.tsx
│   ├── bookings/
│   │   ├── hotel/page.tsx
│   │   ├── transport/page.tsx
│   │   └── rentals/page.tsx
│   ├── budget/page.tsx         # CSR
│   └── profile/page.tsx
└── api/
    ├── auth/[...nextauth]/route.ts
    └── revalidate/route.ts

components/
├── layout/
│   ├── Navbar.tsx
│   ├── BottomNav.tsx
│   └── Sidebar.tsx
├── maps/
│   ├── TourismMap.tsx
│   ├── CrowdHeatmap.tsx
│   └── RouteMap.tsx
├── places/
│   ├── PlaceCard.tsx
│   ├── PlaceList.tsx
│   ├── PlaceDetail.tsx
│   └── PlaceGallery.tsx
├── queues/
│   ├── QueueTimer.tsx
│   └── SlotBooking.tsx
├── bookings/
│   ├── HotelCard.tsx
│   └── TransportCard.tsx
├── 3d/
│   ├── HeroBackground.tsx      # R3F 3D animated background
│   └── ParticleField.tsx       # Floating particles scene
└── ai/
    ├── RecommendationPanel.tsx
    └── BudgetPlanner.tsx

lib/
├── api.ts                      # Configured API client
├── auth.ts                     # Auth helpers
├── geo.ts                      # Geolocation helpers
├── socket.ts                   # Socket.io client
└── utils.ts                    # cn() and shared utils

stores/
├── auth.store.ts               # JWT, user profile, roles
├── map.store.ts                # Viewport, overlays, markers
├── filters.store.ts            # Category, budget, crowd filters
├── realtime.store.ts           # Live queue/traffic from WebSocket
└── offline.store.ts            # Offline action queue

hooks/
├── usePlaces.ts                # TanStack Query — place data
├── useQueueStatus.ts           # Polls every 30s
├── useBookings.ts
├── useRecommendations.ts
└── useGeolocation.ts
```

## Rendering Strategy — CRITICAL
| Page | Strategy | Implementation |
|------|----------|---------------|
| /discover | SSR | No 'use client' — server component |
| /discover/[id] | ISR | export const revalidate = 3600 |
| /queues | CSR | 'use client' + TanStack Query polling |
| /traffic | CSR | 'use client' + WebSocket |
| /parking | CSR | 'use client' + real-time |
| /trips/new | CSR | 'use client' — AI interactive |
| /budget | CSR | 'use client' |
| /discover/search | CSR | 'use client' |

## State Management Rules
- **TanStack Query**: ALL API data — places, queues, bookings, recommendations
- **Zustand**: UI-only state — auth session, map viewport, filters, real-time socket data
- **React Hook Form**: ALL form state — booking forms, search, registration
- **NEVER** store API data in Zustand
- **NEVER** use raw fetch() in components — always use TanStack Query hooks

## Coding Conventions — ALWAYS follow
- File names: PascalCase for components (`PlaceCard.tsx`), camelCase for hooks (`usePlaces.ts`)
- Component pattern: Props interface first → component function → export at bottom
- Every async component needs a `<Skeleton>` fallback in `<Suspense>`
- Every interactive element needs `aria-label`
- Mobile-first CSS: base styles mobile → `md:` tablet → `lg:` desktop
- No prop drilling beyond 2 levels — use Zustand or Context
- Error boundaries at every route level
- Use `cn()` from `lib/utils.ts` for conditional Tailwind classes

## Animation Rules (Framer Motion)
- Page transitions: `initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}`
- Card hover: `whileHover={{ y:-6, scale:1.02 }}` with spring transition
- Stagger children: use `staggerChildren: 0.08` in parent variants
- Tab switches: `AnimatePresence` with slide left/right
- ALWAYS wrap with `@media (prefers-reduced-motion)` respect

## 3D Background Rules (React Three Fiber)
- ALWAYS use `dynamic import` with `ssr: false` for Canvas components
- Keep particle count under 3000 on mobile
- Use `useThree` for responsive canvas sizing
- Dispose geometries and materials in cleanup

## Image Rules
- ALWAYS use Next.js `<Image>` component — never `<img>`
- Tourism place images: from Cloudinary via next-cloudinary
- Add `priority` prop to above-fold hero images
- Always provide meaningful `alt` text

## Environment Variables
```

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=duajyized
NEXT_PUBLIC_GOOGLE_PLACES_API_KEY=
NEXT_PUBLIC_APP_URL=
NEXT_PUBLIC_API_BASE_URL=
NEXT_PUBLIC_SOCKET_URL=
```

### Cloudinary usage
- Store only the cloud name as a public environment variable: `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
- Keep `CLOUDINARY_API_KEY`, `CLOUDINARY_SECRET`, and `CLOUDINARY_URL` strictly server-side.
- Use `next-cloudinary` for optimized, responsive image delivery in client components.
- Prefer Cloudinary transformation params for hero and background imagery: `auto=format,auto=quality,crop=fill,gravity=auto`
- Use scenic, nature-first image sets from Cloudinary for hero backgrounds, destination banners, and place galleries.
- Use `CldImage` or `next/image` for Cloudinary URLs, and never embed secret values in client bundles.

## Current Build Phase
**Phase 1 — Foundation**
Building: Design system, shared components, auth flow, home page
Next: Place listing, place detail, map integration

## Skills Available
- `ui-ux-pro-max` — Design system intelligence, style recommendations
- `r3f` — React Three Fiber 3D scene patterns
Both skills auto-activate for relevant tasks.