export interface TrafficPoint {
  lat: number
  lng: number
  density: number
}

export interface ParkingLot {
  id: string
  placeId: string
  name: string
  total: number
  available: number
  lat: number
  lng: number
  pricePerHour: number
}

export const mockTrafficPoints: TrafficPoint[] = [
  // Taj Mahal cluster
  { lat: 27.175, lng: 78.042, density: 0.9 },
  { lat: 27.176, lng: 78.041, density: 0.85 },
  { lat: 27.174, lng: 78.043, density: 0.75 },
  // Kerala Backwaters cluster
  { lat: 9.498, lng: 76.338, density: 0.5 },
  { lat: 9.5, lng: 76.34, density: 0.45 },
  // Golden Temple cluster
  { lat: 31.62, lng: 74.876, density: 0.8 },
  { lat: 31.621, lng: 74.877, density: 0.7 },
  // Varanasi cluster
  { lat: 25.317, lng: 82.973, density: 0.65 },
  { lat: 25.318, lng: 82.974, density: 0.6 },
  // Goa cluster
  { lat: 15.299, lng: 74.124, density: 0.4 },
  { lat: 15.3, lng: 74.125, density: 0.35 },
  // Hampi cluster
  { lat: 15.335, lng: 76.46, density: 0.95 },
  { lat: 15.336, lng: 76.461, density: 0.9 },
  // Ranthambore
  { lat: 26.017, lng: 76.502, density: 0.7 },
  // Munnar
  { lat: 10.089, lng: 77.059, density: 0.3 },
  // Leh
  { lat: 34.152, lng: 77.577, density: 0.2 },
  // Andaman
  { lat: 11.74, lng: 92.658, density: 0.45 },
  // Jaisalmer
  { lat: 26.912, lng: 70.912, density: 0.25 },
  // Mysore
  { lat: 12.305, lng: 76.655, density: 0.1 },
]

export const mockParkingLots: ParkingLot[] = [
  {
    id: 'p1',
    placeId: 'taj-mahal',
    name: 'Taj Mahal East Gate Parking',
    total: 200,
    available: 12,
    lat: 27.174,
    lng: 78.044,
    pricePerHour: 50,
  },
  {
    id: 'p2',
    placeId: 'taj-mahal',
    name: 'Taj Mahal West Overflow Lot',
    total: 150,
    available: 45,
    lat: 27.177,
    lng: 78.039,
    pricePerHour: 30,
  },
  {
    id: 'p3',
    placeId: 'golden-temple',
    name: 'Golden Temple Main Lot',
    total: 500,
    available: 80,
    lat: 31.622,
    lng: 74.874,
    pricePerHour: 20,
  },
  {
    id: 'p4',
    placeId: 'hampi',
    name: 'Hampi Visitor Parking',
    total: 100,
    available: 0,
    lat: 15.337,
    lng: 76.462,
    pricePerHour: 40,
  },
  {
    id: 'p5',
    placeId: 'mysore-palace',
    name: 'Palace Road Parking',
    total: 300,
    available: 250,
    lat: 12.307,
    lng: 76.653,
    pricePerHour: 15,
  },
  {
    id: 'p6',
    placeId: 'varanasi-ghats',
    name: 'Dashashwamedh Ghat Lot',
    total: 180,
    available: 40,
    lat: 25.32,
    lng: 82.971,
    pricePerHour: 25,
  },
  {
    id: 'p7',
    placeId: 'goa-beaches',
    name: 'Calangute Beach Parking',
    total: 400,
    available: 220,
    lat: 15.298,
    lng: 74.126,
    pricePerHour: 20,
  },
  {
    id: 'p8',
    placeId: 'jaisalmer-fort',
    name: 'Fort Plaza Parking',
    total: 120,
    available: 90,
    lat: 26.914,
    lng: 70.91,
    pricePerHour: 10,
  },
]

export function getParkingLots(): ParkingLot[] {
  return mockParkingLots
}

export function getParkingByPlace(placeId: string): ParkingLot[] {
  return mockParkingLots.filter((p) => p.placeId === placeId)
}
