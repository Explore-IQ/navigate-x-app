'use client'

import { useQuery } from '@tanstack/react-query'
import { getParkingLots } from '@/lib/mock-traffic'

async function fetchParkingLots() {
  await new Promise((r) => setTimeout(r, 250))
  return getParkingLots()
}

export function useParkingLots() {
  return useQuery({
    queryKey: ['parking'],
    queryFn: fetchParkingLots,
    refetchInterval: 30_000,
    staleTime: 20_000,
  })
}
