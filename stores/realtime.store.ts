'use client'

import { create } from 'zustand'
import type { QueueEntry } from '@/lib/mock-queues'
import type { TrafficPoint, ParkingLot } from '@/lib/mock-traffic'

interface RealtimeState {
  queueData: Record<string, QueueEntry>
  trafficPoints: TrafficPoint[]
  parkingLots: ParkingLot[]
  connected: boolean
  setQueueData: (id: string, data: QueueEntry) => void
  setBulkQueueData: (entries: QueueEntry[]) => void
  setTrafficPoints: (pts: TrafficPoint[]) => void
  setParkingLots: (lots: ParkingLot[]) => void
  setConnected: (v: boolean) => void
}

export const useRealtimeStore = create<RealtimeState>((set) => ({
  queueData: {},
  trafficPoints: [],
  parkingLots: [],
  connected: false,

  setQueueData: (id, data) =>
    set((s) => ({ queueData: { ...s.queueData, [id]: data } })),

  setBulkQueueData: (entries) =>
    set(() => ({
      queueData: Object.fromEntries(entries.map((e) => [e.placeId, e])),
    })),

  setTrafficPoints: (pts) => set({ trafficPoints: pts }),
  setParkingLots: (lots) => set({ parkingLots: lots }),
  setConnected: (connected) => set({ connected }),
}))
