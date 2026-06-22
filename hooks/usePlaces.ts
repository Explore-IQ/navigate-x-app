'use client'
import { useQuery } from '@tanstack/react-query'
import { fetchPlaces, fetchPlaceById, type PlacesQuery } from '@/lib/api'

export function usePlaces(query: PlacesQuery = {}) {
  return useQuery({
    queryKey: ['places', query],
    queryFn: () => fetchPlaces(query),
    staleTime: 5 * 60 * 1000,
  })
}

export function usePlaceById(id: string) {
  return useQuery({
    queryKey: ['place', id],
    queryFn: () => fetchPlaceById(id),
    staleTime: 60 * 60 * 1000,
    enabled: Boolean(id),
  })
}
