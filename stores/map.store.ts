'use client'

import { create } from 'zustand'

type Overlay = 'traffic' | 'parking' | 'none'

interface MapState {
  center: [number, number]
  zoom: number
  activeOverlay: Overlay
  setCenter: (c: [number, number]) => void
  setZoom: (z: number) => void
  setOverlay: (o: Overlay) => void
}

export const useMapStore = create<MapState>((set) => ({
  center: [78.9629, 20.5937],
  zoom: 4.5,
  activeOverlay: 'none',

  setCenter: (center) => set({ center }),
  setZoom: (zoom) => set({ zoom }),
  setOverlay: (activeOverlay) => set({ activeOverlay }),
}))
