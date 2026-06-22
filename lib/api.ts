import { getPlaces, getPlaceById } from './mock-places'
import type { Place } from './mock-places'

export type { Place }
export type { PlaceCategory, CrowdLevel } from './mock-places'

export interface PlacesQuery {
  category?: string
  q?: string
  sort?: string
}

export async function fetchPlaces(query: PlacesQuery = {}): Promise<Place[]> {
  // Production: fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/places?${new URLSearchParams(query as Record<string, string>)}`)
  return Promise.resolve(getPlaces(query))
}

export async function fetchPlaceById(id: string): Promise<Place | null> {
  return Promise.resolve(getPlaceById(id) ?? null)
}
