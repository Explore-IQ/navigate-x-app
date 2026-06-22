# GENAI-005 — UI Aesthetic: 3D Light Color Overhaul
# Branch: GENAI-005-UI-Asthetics-Change

## Goal
Replace dark/heavy sections with a fully light, airy aesthetic powered by React Three Fiber
3D scenes (glass orbs, particle fields) and glassmorphism UI. Zero dark backgrounds remain.

---

## Current Problems

| Area | Current State | Problem |
|---|---|---|
| `HeroBackground.tsx` | Empty file (just a comment) | No 3D exists at all |
| `ParticleField.tsx` | Does not exist | Missing entirely |
| Hero section | `bg-[#2C3A3F]/78` dark overlay | Kills natural photo, too heavy |
| Gallery strip | `bg-[#2C3A3F]` hard dark bg | Biggest visual offender |
| CTA section | `bg-[#2C3A3F]/78` dark overlay | Dark on top of scenic photo |
| Feature cards | Flat `bg-white` with weak shadow | No depth, no glass |
| Inner pages | Flat `bg-[#F7FAFB]` | No depth, no 3D, no glass |

---

## Color System (unchanged tokens, light usage only)

| Token | Hex | Usage in light mode |
|---|---|---|
| Sky blue | `#6CB6E4` | 3D orb color, particle tint, active states |
| Leaf green | `#4F8A65` | 3D orb color, CTA buttons, accents |
| Sand | `#F2E3C6` | 3D orb color, warm glow particles |
| Cloud | `#F7FAFB` | Page backgrounds, card bases |
| Stone | `#3E4A4F` | Text only — never backgrounds |
| Sunset | `#EBA86B` | 3D orb accent, highlight pills |

**Rule**: No `bg-[#2C3A3F]` or any dark background anywhere.
Overlays on photos: max 30% dim (not 70–80%).

---

## Skills Required

| Skill | Purpose |
|---|---|
| `r3f-fundamentals` | Canvas setup, dynamic import SSR-safe, useThree for sizing |
| `r3f-geometry` | Floating orbs (IcosahedronGeometry), bubble shapes |
| `r3f-lighting` | Soft ambient + two colored point lights — keeps scene airy |
| `r3f-animation` | `useFrame` drift loops, rotation for orbs |
| `r3f-materials` | MeshPhysicalMaterial — glass transmission, roughness 0 |
| `r3f-postprocessing` | Subtle Bloom — soft glow on orbs, no harsh edges |
| `ui-ux-pro-max` | Glassmorphism cards, light gallery redesign, dark→light sections |

---

## New Components to Build

### `components/3d/HeroBackground.tsx`
- R3F Canvas with `dynamic import` + `ssr: false`
- 8–12 floating glass orbs, colors: sky-blue / leaf-green / sand / sunset
- `MeshPhysicalMaterial`: transmission: 0.9, roughness: 0, thickness: 1.5
- Ambient light (#EDF5FB, intensity 1.2) + two point lights (sky-blue + sand)
- Subtle Bloom via `@react-three/postprocessing`
- `useFrame` drift: each orb has randomised amplitude + speed
- Mobile: reduce to 5 orbs, skip postprocessing
- Cleanup: dispose geometry + material on unmount

### `components/3d/ParticleField.tsx`
- Lightweight: max 800 particles on desktop, 300 on mobile
- Color: white + `#6CB6E4` at 60% opacity
- Random drift via `useFrame` — gentle float upward + slight horizontal sway
- Used as background layer in section headers

---

## Home Page Changes (`app/HomeClient.tsx`)

### Hero Section
**Before**: Dark overlay `bg-gradient-to-br from-[#2C3A3F] via-black/50 to-[#3E4A4F]/60`
**After**:
- Cloudinary photo stays, overlay reduced to `bg-white/15 backdrop-blur-[2px]`
- `HeroBackground` 3D scene layered behind the photo at 40% opacity (as ambiance)
- Bottom fade: `from-[#F7FAFB]` stays — good
- Text color: headings stay white (still readable against scene), sub-text darkens to `#3E4A4F`
- Search bar: `bg-white/70 backdrop-blur-md border border-[#6CB6E4]/30` (glass style)

### Gallery Strip
**Before**: `bg-[#2C3A3F]` dark section
**After**:
- `bg-white` background with subtle `shadow-inner`
- Cards: `rounded-2xl overflow-hidden shadow-md hover:shadow-xl` on white
- Section title: `text-[#3E4A4F]` (dark text on light bg)
- Horizontal scroll marquee stays, but cards get a `ring-1 ring-[#6CB6E4]/20` border

### CTA Section
**Before**: `bg-[#2C3A3F]/78` dark overlay on photo
**After**:
- Photo overlay reduced to `bg-white/25 backdrop-blur-sm` (glassmorphism)
- Inner panel: `bg-white/40 backdrop-blur-xl border border-white/60 rounded-3xl` glass card
- Text: `text-[#3E4A4F]` (dark on glass) instead of white-on-dark
- Gradient bridge above/below: `from-[#EDF5FB]` → glass panel (no dark bridges)

### Feature Cards
**Before**: `bg-white p-7 shadow-sm border border-[#3E4A4F]/6`
**After**: `bg-white/60 backdrop-blur-sm border border-white/80 shadow-lg hover:shadow-xl hover:-translate-y-2`

### Stats Strip
**Before**: Flat `bg-[#F7FAFB]`
**After**: `bg-gradient-to-r from-[#EDF5FB] via-white to-[#F2E3C6]/30` with subtle dividers

---

## Navbar Changes (`components/layout/Navbar.tsx`)

### Transparent state (on hero)
**Before**: Fully transparent — no visual anchor
**After**: `bg-white/10 backdrop-blur-sm border-b border-white/20` — subtle glass effect

### Scrolled state
**Before**: `bg-white/90 backdrop-blur-lg` — already good
**After**: Keep as-is, add `shadow-[0_1px_20px_rgba(108,182,228,0.08)]` tint

---

## Inner Page Changes

### Queues page (`app/(tourist)/queues/page.tsx`)
- Header sticky bar: add `ParticleField` behind at 20% opacity
- Category pills: upgrade to glass `bg-white/60 backdrop-blur-sm`
- Queue cards: glassmorphism `bg-white/70 backdrop-blur-md border border-white/80`

### Discover page (`app/(tourist)/discover/page.tsx`)
- Featured card: reduce dark overlay from 75% to 30%
- Sticky filter bar: `bg-white/80 backdrop-blur-md`

### Parking, Traffic, Budget pages
- Page header areas get `ParticleField` at 15% opacity
- Cards upgrade to glassmorphism pattern

---

## Implementation Steps

| Step | Work | Skills |
|---|---|---|
| 1 | Build `HeroBackground.tsx` — glass orb R3F scene | `r3f-fundamentals`, `r3f-geometry`, `r3f-lighting`, `r3f-animation`, `r3f-materials` |
| 2 | Add Bloom to `HeroBackground` | `r3f-postprocessing` |
| 3 | Build `ParticleField.tsx` — light particle field | `r3f-fundamentals`, `r3f-geometry`, `r3f-animation` |
| 4 | Redesign `HomeClient.tsx` — hero + gallery + CTA + features | `ui-ux-pro-max` |
| 5 | Update `Navbar.tsx` + inner page headers + cards | `ui-ux-pro-max` |

---

## What Will NOT Change
- Color palette tokens (same hex values, used differently)
- Cloudinary images — kept, overlays just get lighter
- Framer Motion animations — unchanged, complemented by R3F
- All routing, data-fetching, Zustand stores, API hooks
- shadcn/ui component library base
- Mobile-first breakpoints

---

## Definition of Done
- [ ] No `bg-[#2C3A3F]` anywhere in the codebase
- [ ] No photo overlay darker than 35%
- [ ] `HeroBackground.tsx` renders glass orbs in R3F Canvas
- [ ] `ParticleField.tsx` renders light particle field
- [ ] Gallery strip is fully light-themed
- [ ] CTA section uses glassmorphism panel
- [ ] All feature cards use glassmorphism
- [ ] Inner page headers have subtle depth
- [ ] Navbar transparent state has glass anchor
- [ ] All pages pass mobile 375px check (particle/orb counts reduced)
- [ ] `prefers-reduced-motion` fallback on all R3F scenes

---

## Revision R1 — Vibrant Revamp (2026-06-16)

### User decisions confirmed
| Decision | Choice |
|---|---|
| Hero image | Single dramatic wide shot — Kerala backwaters |
| Color palette | Natural Breeze tokens on deep ocean dark base |
| 3D scene | Spinning wireframe Earth / Globe |
| Photo overlay | Rich 55–60% dim — globe is the hero |

### Hero background gradient (new)
`from-[#0F2027] via-[#203A43] to-[#1a3a4a]` — deep ocean

### Globe 3D spec
- Wireframe `sphereGeometry` (28×14 segments) at opacity 0.20, color `#6CB6E4`
- Solid dark inner sphere `#091520` opacity 0.88
- 9 India city dots (Delhi/Mumbai/Goa/Kerala/Jaipur/Varanasi/Agra/Chennai/Darjeeling) in `#EBA86B`
- Each dot has pulsing transparent sphere ripple
- Equatorial glow ring — `torusGeometry` in `#6CB6E4`
- Two outer atmospheric BackSide spheres for glow halo
- Globe rotates on Y axis at 0.08 rad/s (full revolution ~78 s)
- Desktop: globe offset to right side `x=3.5` so text stays left
- Mobile: smaller scale 0.55, offset `[2, -1, 0]`

### Navbar transparent state change
Dark glass: `bg-black/20 backdrop-blur-sm border-b border-white/10`
All nav elements revert to white text on transparent (hero is dark again)

### Files touched
- `components/3d/HeroBackground.tsx` — full rewrite (globe replaces orbs)
- `app/HomeClient.tsx` — hero image, bg gradient, text colors, photo opacity
- `components/layout/Navbar.tsx` — restore white-text transparent state, new dark-glass bg
