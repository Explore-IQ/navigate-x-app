'use client'

import { create } from 'zustand'

type CrowdLevel = 'any' | 'low' | 'medium' | 'high'

interface FiltersState {
  category: string
  maxWait: number
  crowdLevel: CrowdLevel
  setCategory: (c: string) => void
  setMaxWait: (m: number) => void
  setCrowdLevel: (l: CrowdLevel) => void
  reset: () => void
}

const defaults = { category: 'all', maxWait: 120, crowdLevel: 'any' as CrowdLevel }

export const useFiltersStore = create<FiltersState>((set) => ({
  ...defaults,
  setCategory: (category) => set({ category }),
  setMaxWait: (maxWait) => set({ maxWait }),
  setCrowdLevel: (crowdLevel) => set({ crowdLevel }),
  reset: () => set(defaults),
}))
