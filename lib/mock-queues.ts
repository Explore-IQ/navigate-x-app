export interface SlotWindow {
  id: string
  time: string
  available: number
  total: number
}

export interface QueueEntry {
  placeId: string
  placeName: string
  category: string
  imageUrl: string
  currentWait: number
  capacity: number
  occupied: number
  slots: SlotWindow[]
  status: 'open' | 'full' | 'closed'
  lat: number
  lng: number
}

function makeSlots(base: number): SlotWindow[] {
  const times = ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM']
  return times.map((time, i) => ({
    id: `slot-${i}`,
    time,
    total: 50,
    available: Math.max(0, 50 - Math.floor(Math.random() * base + i * 3)),
  }))
}

export const mockQueues: QueueEntry[] = [
  {
    placeId: 'taj-mahal',
    placeName: 'Taj Mahal',
    category: 'Heritage',
    imageUrl: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=400',
    currentWait: 45,
    capacity: 500,
    occupied: 420,
    status: 'open',
    lat: 27.1751,
    lng: 78.0421,
    slots: makeSlots(35),
  },
  {
    placeId: 'kerala-backwaters',
    placeName: 'Kerala Backwaters',
    category: 'Nature',
    imageUrl: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=400',
    currentWait: 20,
    capacity: 200,
    occupied: 120,
    status: 'open',
    lat: 9.4981,
    lng: 76.3388,
    slots: makeSlots(15),
  },
  {
    placeId: 'jaisalmer-fort',
    placeName: 'Jaisalmer Fort',
    category: 'Heritage',
    imageUrl: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=400',
    currentWait: 10,
    capacity: 300,
    occupied: 90,
    status: 'open',
    lat: 26.9124,
    lng: 70.9123,
    slots: makeSlots(8),
  },
  {
    placeId: 'goa-beaches',
    placeName: 'Goa Beach Strip',
    category: 'Beach',
    imageUrl: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=400',
    currentWait: 5,
    capacity: 1000,
    occupied: 300,
    status: 'open',
    lat: 15.2993,
    lng: 74.124,
    slots: makeSlots(5),
  },
  {
    placeId: 'hampi',
    placeName: 'Hampi Ruins',
    category: 'Heritage',
    imageUrl: 'https://images.unsplash.com/photo-1600689053827-5e3b7d6c8e68?w=400',
    currentWait: 0,
    capacity: 400,
    occupied: 400,
    status: 'full',
    lat: 15.335,
    lng: 76.46,
    slots: makeSlots(40),
  },
  {
    placeId: 'ranthambore',
    placeName: 'Ranthambore NP',
    category: 'Wildlife',
    imageUrl: 'https://images.unsplash.com/photo-1602491453631-e2a5ad90a131?w=400',
    currentWait: 60,
    capacity: 120,
    occupied: 110,
    status: 'open',
    lat: 26.0173,
    lng: 76.5026,
    slots: makeSlots(42),
  },
  {
    placeId: 'varanasi-ghats',
    placeName: 'Varanasi Ghats',
    category: 'Spiritual',
    imageUrl: 'https://images.unsplash.com/photo-1561361058-c24e020b9b08?w=400',
    currentWait: 30,
    capacity: 600,
    occupied: 400,
    status: 'open',
    lat: 25.3176,
    lng: 82.9739,
    slots: makeSlots(25),
  },
  {
    placeId: 'munnar',
    placeName: 'Munnar Tea Gardens',
    category: 'Nature',
    imageUrl: 'https://images.unsplash.com/photo-1591268694862-4bcd0ad03de4?w=400',
    currentWait: 15,
    capacity: 250,
    occupied: 140,
    status: 'open',
    lat: 10.0889,
    lng: 77.0595,
    slots: makeSlots(12),
  },
  {
    placeId: 'golden-temple',
    placeName: 'Golden Temple',
    category: 'Spiritual',
    imageUrl: 'https://images.unsplash.com/photo-1588416936097-41850ab3d86d?w=400',
    currentWait: 35,
    capacity: 800,
    occupied: 650,
    status: 'open',
    lat: 31.62,
    lng: 74.8765,
    slots: makeSlots(30),
  },
  {
    placeId: 'mysore-palace',
    placeName: 'Mysore Palace',
    category: 'Heritage',
    imageUrl: 'https://images.unsplash.com/photo-1580714081421-09a6e3a12f3e?w=400',
    currentWait: 0,
    capacity: 400,
    occupied: 0,
    status: 'closed',
    lat: 12.3052,
    lng: 76.6552,
    slots: [],
  },
  {
    placeId: 'andaman-islands',
    placeName: 'Andaman Islands',
    category: 'Beach',
    imageUrl: 'https://images.unsplash.com/photo-1596178065887-1198b6148b2b?w=400',
    currentWait: 25,
    capacity: 300,
    occupied: 180,
    status: 'open',
    lat: 11.7401,
    lng: 92.6586,
    slots: makeSlots(20),
  },
  {
    placeId: 'leh-ladakh',
    placeName: 'Leh-Ladakh',
    category: 'Adventure',
    imageUrl: 'https://images.unsplash.com/photo-1531173292820-8a6e6dd78b35?w=400',
    currentWait: 10,
    capacity: 150,
    occupied: 60,
    status: 'open',
    lat: 34.1526,
    lng: 77.5771,
    slots: makeSlots(8),
  },
]

export function getQueues(): QueueEntry[] {
  return mockQueues
}

export function getQueueById(placeId: string): QueueEntry | undefined {
  return mockQueues.find((q) => q.placeId === placeId)
}
