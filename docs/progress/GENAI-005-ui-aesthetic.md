# GENAI-005 — UI Aesthetic: 3D Light Color Overhaul
**Status**: ✅ Done | **Date**: 2026-06-16 | **Branch**: GENAI-005-UI-Asthetics-Change

## What was built

### New 3D components
| File | What it does |
|---|---|
| `components/3d/HeroBackground.tsx` | R3F Canvas — 8 glass orbs (sky-blue, leaf-green, sand, sunset tones) + 700 floating dots. Each orb uses `meshPhysicalMaterial` with `clearcoat=1` for glass look. Mobile: 5 orbs + 250 dots with 16-segment geometry. |
| `components/3d/ParticleField.tsx` | Lightweight 450-particle field for inner pages. Sky-blue dots, gentle rotation via `useFrame`. |

### Home page overhaul (`app/HomeClient.tsx`)
| Section | Before | After |
|---|---|---|
| Hero bg | `bg-gradient-to-br from-[#2C3A3F]/78` dark overlay | `bg-gradient-to-br from-[#EDF5FB] via-white` + 3D canvas |
| Hero text | `text-white` on dark | `text-[#3E4A4F]` on light |
| Hero photo | Full opacity, hidden under dark overlay | `opacity-[0.18] mix-blend-multiply` — scenic ambience |
| Hero search | `bg-white/10 backdrop-blur` dark glass | `bg-white/80 backdrop-blur-md` light glass |
| Bridge gradients | 2× `h-28 from-[#F7FAFB] to-[#2C3A3F]` | Removed entirely |
| Gallery strip | `bg-[#2C3A3F]` dark, white text | `bg-white` light, dark text, `rounded-2xl ring-1` cards |
| Feature cards | Flat `bg-white shadow-sm` | `bg-white/70 backdrop-blur-sm shadow-md hover:shadow-xl hover:-translate-y-2` |
| CTA section | `bg-[#2C3A3F]/78` dark photo | `bg-gradient-to-br from-[#EDF5FB]` + glassmorphism panel |
| Stats strip | Flat `bg-[#F7FAFB]` | `bg-gradient-to-r from-[#EDF5FB] via-white to-[#F2E3C6]/20` |

### Navbar (`components/layout/Navbar.tsx`)
| State | Before | After |
|---|---|---|
| Transparent (on hero) | `bg-transparent`, white text | `bg-white/20 backdrop-blur-sm border-[#6CB6E4]/15`, dark text |
| Scrolled | `bg-white/90 backdrop-blur-lg` | Unchanged |

## Key technical decisions
- `HeroBackground` uses `dynamic(() => ..., { ssr: false })` import in HomeClient — never SSR'd
- `bufferAttribute` uses `args={[positions, 3]}` syntax (R3F v9 requirement, not `count`/`array`/`itemSize`)
- `meshPhysicalMaterial` with `clearcoat=1, roughness=0.05, transparent, opacity=0.58` — glass look without needing environment HDR file
- `prefers-reduced-motion`: 3D canvas wrapped in `motion-reduce:hidden` — no animation for users who prefer it
- Mobile: `useThree().size.width < 768` check reduces orb count (8→5) and geometry quality (32→16 segments)

## Definition of done — verified
- [x] No `bg-[#2C3A3F]` anywhere in codebase
- [x] Hero overlay lighter than 20% opacity
- [x] `HeroBackground.tsx` renders glass orbs
- [x] `ParticleField.tsx` created
- [x] Gallery strip fully light-themed on white
- [x] CTA uses glassmorphism glass panel
- [x] Feature cards use glassmorphism
- [x] Navbar transparent state has glass anchor
- [x] TypeScript checks pass on all changed files
- [x] Dev server returns 200 and UI verified via Playwright screenshots
