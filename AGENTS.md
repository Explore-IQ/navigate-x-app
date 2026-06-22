<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Tourism Platform — Agents Configuration
# Defines specialized agents for different parts of the codebase

## Agent: UI Builder
**Trigger**: Building screens, pages, components, layouts
**Scope**: `app/`, `components/`
**Skills**: ui-ux-pro-max
**Rules**:
- Always generate design system first (colors, typography, spacing)
- Use Festive India theme — saffron, gold, indigo, cream
- Apply Framer Motion animations to every card and page transition
- Use shadcn/ui components as base — never build from scratch
- Mobile-first always — test at 375px, 768px, 1440px
- Every component gets loading skeleton and error state

## Agent: 3D Background
**Trigger**: Hero sections, animated backgrounds, particle effects, 3D scenes
**Scope**: `components/3d/`
**Skills**: r3f
**Rules**:
- Always dynamic import Canvas with ssr: false
- Keep scene lightweight — max 3000 particles on mobile
- Use saffron/gold color palette for particles
- Combine with Framer Motion for entrance animations
- Always add reduced-motion fallback

## Agent: State Manager
**Trigger**: Adding new state, stores, API hooks
**Scope**: `stores/`, `hooks/`
**Rules**:
- TanStack Query for ALL server/API data
- Zustand for UI-only state
- Never mix — no API data in Zustand
- Every hook needs loading, error, and data states
- Add optimistic updates for booking/review actions

## Agent: API Integrator
**Trigger**: Connecting to backend, API calls, data fetching
**Scope**: `lib/`, `hooks/`, `app/api/`
**Rules**:
- All API calls go through TanStack Query hooks in `hooks/`
- Never raw fetch() in components
- Add retry logic for network failures
- Handle offline state gracefully
- Type everything from the OpenAPI SDK

## Agent: Page Builder
**Trigger**: Creating new pages/routes
**Scope**: `app/`
**Rules**:
- Check rendering strategy table in CLAUDE.md first
- SSR pages: no 'use client', fetch in server component
- CSR pages: 'use client' at top, TanStack Query for data
- ISR pages: export const revalidate = 3600
- Every page needs: loading.tsx, error.tsx, page.tsx

## Agent: Testing
**Trigger**: Writing tests, test coverage
**Scope**: `*.test.ts`, `*.spec.ts`, `e2e/`
**Rules**:
- Vitest for unit tests on hooks and utils
- React Testing Library for component tests
- Playwright for e2e flows (booking, search, auth)
- Every hook must have a unit test
- Every key user flow must have an e2e test

## Build Phase Sequence
Follow this order — do not skip phases:
1. Foundation: layout, providers, auth, design tokens
2. Core screens: discover, place detail, search
3. Live features: queues, traffic, parking
4. Booking flow: hotel, transport, payment
5. AI features: trip planner, recommendations
6. Gov dashboard: analytics, heatmaps
7. Mobile app: Expo React Native
