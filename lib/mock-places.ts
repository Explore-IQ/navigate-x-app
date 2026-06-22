export type PlaceCategory = 'beach' | 'mountain' | 'heritage' | 'nature' | 'food' | 'adventure'
export type CrowdLevel = 'low' | 'moderate' | 'high'

export interface Place {
  id: string
  name: string
  slug: string
  category: PlaceCategory
  description: string
  shortDescription: string
  location: string
  state: string
  rating: number
  reviewCount: number
  crowdLevel: CrowdLevel
  entryFee: number | null
  openHours: string
  imageUrl: string
  gallery: string[]
  tags: string[]
  coordinates: { lat: number; lng: number }
  queueEnabled: boolean
  bestSeason: string
  duration: string
  featured?: boolean
}

const U = 'https://images.unsplash.com'

export const PLACES: Place[] = [
  {
    id: 'hampi',
    name: 'Hampi Ruins',
    slug: 'hampi',
    category: 'heritage',
    shortDescription: 'UNESCO World Heritage Site — spectacular Vijayanagara empire ruins amid giant boulders.',
    description:
      'Hampi is a UNESCO World Heritage Site in Karnataka, home to the ancient Vijayanagara Empire capital. Dramatic boulder landscapes frame temple complexes, royal enclosures, and the famous stone chariot of Vittala Temple. The Tungabhadra river winds through the ruins creating an otherworldly landscape that has captivated travellers for centuries.',
    location: 'Hampi',
    state: 'Karnataka',
    rating: 4.8,
    reviewCount: 12450,
    crowdLevel: 'moderate',
    entryFee: 50,
    openHours: '6:00 AM – 6:00 PM',
    imageUrl: `${U}/photo-1469474968028-56623f02e42e?w=900&q=80&fit=crop`,
    gallery: [
      `${U}/photo-1506905925346-21bda4d32df4?w=800&q=80&fit=crop`,
      `${U}/photo-1501854140801-50d01698950b?w=800&q=80&fit=crop`,
      `${U}/photo-1447752875215-b2761acf3dfa?w=800&q=80&fit=crop`,
    ],
    tags: ['UNESCO', 'Ruins', 'Architecture', 'Photography', 'History'],
    coordinates: { lat: 15.335, lng: 76.462 },
    queueEnabled: false,
    bestSeason: 'Oct – Feb',
    duration: '2–3 days',
    featured: true,
  },
  {
    id: 'marina-beach',
    name: 'Marina Beach',
    slug: 'marina-beach',
    category: 'beach',
    shortDescription: "World's second-longest urban beach stretching 13 km along Chennai's seafront.",
    description:
      "Marina Beach is a natural urban beach along the Bay of Bengal in Chennai. Stretching 13 km, it's the world's second-longest urban beach. The golden sands are lined with statues, food stalls serving sundal and murukku, and colourful fishing boats returning at dawn. The sunset views are legendary.",
    location: 'Chennai',
    state: 'Tamil Nadu',
    rating: 4.3,
    reviewCount: 28900,
    crowdLevel: 'high',
    entryFee: null,
    openHours: 'Open 24 hrs (swimming restricted)',
    imageUrl: `${U}/photo-1507525428034-b723cf961d3e?w=900&q=80&fit=crop`,
    gallery: [
      `${U}/photo-1476610182048-b716b8518aae?w=800&q=80&fit=crop`,
      `${U}/photo-1469474968028-56623f02e42e?w=800&q=80&fit=crop`,
      `${U}/photo-1506905925346-21bda4d32df4?w=800&q=80&fit=crop`,
    ],
    tags: ['Beach', 'Sunrise', 'Street Food', 'Fishing', 'Promenade'],
    coordinates: { lat: 13.05, lng: 80.283 },
    queueEnabled: false,
    bestSeason: 'Nov – Feb',
    duration: 'Half day',
  },
  {
    id: 'valley-of-flowers',
    name: 'Valley of Flowers',
    slug: 'valley-of-flowers',
    category: 'nature',
    shortDescription: 'A UNESCO-listed Himalayan valley carpeted in hundreds of species of alpine wildflowers.',
    description:
      'The Valley of Flowers National Park in Uttarakhand is a UNESCO World Heritage Site renowned for its meadows of endemic alpine flowers and outstanding natural beauty. The valley is surrounded by mountains and is a habitat of rare and endangered animals including the Asiatic black bear, snow leopard, and blue sheep. Accessible only by a 17 km trek from Govindghat.',
    location: 'Chamoli',
    state: 'Uttarakhand',
    rating: 4.9,
    reviewCount: 5680,
    crowdLevel: 'low',
    entryFee: 150,
    openHours: 'Jun – Oct, 7:00 AM – 5:00 PM',
    imageUrl: `${U}/photo-1518495973542-4542c06a5843?w=900&q=80&fit=crop`,
    gallery: [
      `${U}/photo-1441974231531-c6227db76b6e?w=800&q=80&fit=crop`,
      `${U}/photo-1447752875215-b2761acf3dfa?w=800&q=80&fit=crop`,
      `${U}/photo-1501854140801-50d01698950b?w=800&q=80&fit=crop`,
    ],
    tags: ['UNESCO', 'Trekking', 'Wildlife', 'Flowers', 'Himalaya'],
    coordinates: { lat: 30.726, lng: 79.607 },
    queueEnabled: true,
    bestSeason: 'Jul – Aug',
    duration: '3–5 days',
  },
  {
    id: 'spiti-valley',
    name: 'Spiti Valley',
    slug: 'spiti-valley',
    category: 'mountain',
    shortDescription: 'Cold desert mountain valley with ancient monasteries and dramatic high-altitude terrain.',
    description:
      "Spiti Valley is a cold desert mountain valley in Himachal Pradesh, India. Located at 12,500 ft above sea level, it's home to ancient Buddhist monasteries like Key Monastery and Tabo, tiny villages, stark lunar landscapes, and some of the clearest skies for stargazing in Asia. The road journey itself is an adventure.",
    location: 'Lahaul & Spiti',
    state: 'Himachal Pradesh',
    rating: 4.9,
    reviewCount: 7820,
    crowdLevel: 'low',
    entryFee: null,
    openHours: 'May – Oct (road accessible)',
    imageUrl: `${U}/photo-1464822759023-fed622ff2c3b?w=900&q=80&fit=crop`,
    gallery: [
      `${U}/photo-1497436072909-60f360e1d4b1?w=800&q=80&fit=crop`,
      `${U}/photo-1506905925346-21bda4d32df4?w=800&q=80&fit=crop`,
      `${U}/photo-1469474968028-56623f02e42e?w=800&q=80&fit=crop`,
    ],
    tags: ['Monastery', 'Trekking', 'Stargazing', 'Snow', 'Off-beat'],
    coordinates: { lat: 32.243, lng: 78.033 },
    queueEnabled: false,
    bestSeason: 'Jun – Sep',
    duration: '5–8 days',
  },
  {
    id: 'kerala-backwaters',
    name: 'Kerala Backwaters',
    slug: 'kerala-backwaters',
    category: 'nature',
    shortDescription: 'A serene network of lagoons, lakes, and canals stretching parallel to the Arabian Sea coast.',
    description:
      "Kerala's backwaters are an intricate network of lagoons, lakes, canals, rivers, and inlets formed by more than 900 km of waterways. A houseboat (kettuvallam) cruise through Alleppey, Kumarakom, or Kollam offers a unique window into Kerala village life, lush paddy fields, and coconut groves. Best experienced at sunrise.",
    location: 'Alleppey',
    state: 'Kerala',
    rating: 4.7,
    reviewCount: 19200,
    crowdLevel: 'moderate',
    entryFee: null,
    openHours: 'Year-round (houseboats available)',
    imageUrl: `${U}/photo-1501854140801-50d01698950b?w=900&q=80&fit=crop`,
    gallery: [
      `${U}/photo-1518495973542-4542c06a5843?w=800&q=80&fit=crop`,
      `${U}/photo-1447752875215-b2761acf3dfa?w=800&q=80&fit=crop`,
      `${U}/photo-1441974231531-c6227db76b6e?w=800&q=80&fit=crop`,
    ],
    tags: ['Houseboat', 'Canoe', 'Village', 'Sunset', 'Backwater'],
    coordinates: { lat: 9.493, lng: 76.339 },
    queueEnabled: false,
    bestSeason: 'Oct – Mar',
    duration: '2–4 days',
  },
  {
    id: 'ranthambore',
    name: 'Ranthambore National Park',
    slug: 'ranthambore',
    category: 'adventure',
    shortDescription: 'One of the largest national parks in northern India — spot the elusive Bengal tiger in the wild.',
    description:
      'Ranthambore National Park in Rajasthan is one of the best places in India to see the Bengal tiger in the wild. Spread over 1334 sq km, the park features the ruins of the historic Ranthambore Fort, scenic lakes, and a rich diversity of wildlife including leopards, crocodiles, sloth bears, and over 300 bird species.',
    location: 'Sawai Madhopur',
    state: 'Rajasthan',
    rating: 4.6,
    reviewCount: 9340,
    crowdLevel: 'moderate',
    entryFee: 500,
    openHours: '6:30 AM – 10:00 AM, 3:00 PM – 6:30 PM',
    imageUrl: `${U}/photo-1466721219885-5b41dbc2e7c9?w=900&q=80&fit=crop`,
    gallery: [
      `${U}/photo-1441974231531-c6227db76b6e?w=800&q=80&fit=crop`,
      `${U}/photo-1447752875215-b2761acf3dfa?w=800&q=80&fit=crop`,
      `${U}/photo-1518495973542-4542c06a5843?w=800&q=80&fit=crop`,
    ],
    tags: ['Tiger', 'Safari', 'Wildlife', 'Jeep Safari', 'Birds'],
    coordinates: { lat: 26.012, lng: 76.501 },
    queueEnabled: true,
    bestSeason: 'Oct – Jun',
    duration: '2–3 days',
  },
  {
    id: 'andaman-islands',
    name: 'Andaman Islands',
    slug: 'andaman-islands',
    category: 'beach',
    shortDescription: 'Pristine tropical beaches, crystal-clear turquoise water, and vibrant coral reefs.',
    description:
      "The Andaman and Nicobar Islands in the Bay of Bengal offer some of India's most spectacular tropical scenery. Radhanagar Beach on Havelock Island is consistently ranked among Asia's best beaches. Excellent snorkeling, scuba diving, sea-walking, and glass-bottom boat rides reveal a spectacular underwater world.",
    location: 'Port Blair',
    state: 'Andaman & Nicobar',
    rating: 4.8,
    reviewCount: 14600,
    crowdLevel: 'low',
    entryFee: null,
    openHours: 'Year-round (Oct–May best)',
    imageUrl: `${U}/photo-1476610182048-b716b8518aae?w=900&q=80&fit=crop`,
    gallery: [
      `${U}/photo-1507525428034-b723cf961d3e?w=800&q=80&fit=crop`,
      `${U}/photo-1501854140801-50d01698950b?w=800&q=80&fit=crop`,
      `${U}/photo-1469474968028-56623f02e42e?w=800&q=80&fit=crop`,
    ],
    tags: ['Scuba', 'Snorkeling', 'Coral', 'Beach', 'Islands'],
    coordinates: { lat: 11.667, lng: 92.737 },
    queueEnabled: false,
    bestSeason: 'Nov – May',
    duration: '5–7 days',
  },
  {
    id: 'munnar',
    name: 'Munnar Tea Hills',
    slug: 'munnar',
    category: 'mountain',
    shortDescription: 'Rolling hills blanketed in emerald tea estates with misty valleys and waterfalls.',
    description:
      "Munnar in Kerala's Western Ghats is a premier hill station famous for its sprawling tea plantations, cool climate, and breathtaking mountain scenery. The Eravikulam National Park here is home to the endangered Nilgiri Tahr. The Attukal Waterfalls, Tea Museum, and Mattupetty Dam are all popular highlights.",
    location: 'Munnar',
    state: 'Kerala',
    rating: 4.7,
    reviewCount: 22100,
    crowdLevel: 'moderate',
    entryFee: null,
    openHours: 'Year-round',
    imageUrl: `${U}/photo-1506905925346-21bda4d32df4?w=900&q=80&fit=crop`,
    gallery: [
      `${U}/photo-1518495973542-4542c06a5843?w=800&q=80&fit=crop`,
      `${U}/photo-1441974231531-c6227db76b6e?w=800&q=80&fit=crop`,
      `${U}/photo-1447752875215-b2761acf3dfa?w=800&q=80&fit=crop`,
    ],
    tags: ['Tea', 'Trekking', 'Waterfall', 'Wildlife', 'Hill Station'],
    coordinates: { lat: 10.089, lng: 77.06 },
    queueEnabled: false,
    bestSeason: 'Sep – Mar',
    duration: '3–4 days',
  },
  {
    id: 'ellora-caves',
    name: 'Ellora Caves',
    slug: 'ellora-caves',
    category: 'heritage',
    shortDescription: 'UNESCO site with 34 rock-cut cave temples spanning Buddhist, Hindu, and Jain traditions.',
    description:
      'The Ellora Caves are a UNESCO World Heritage Site near Aurangabad, Maharashtra. The 34 monasteries and temples, extending over 2 km, were dug side by side in the wall of a high basalt cliff. Notable for the Kailasa temple (Cave 16), the largest single monolithic rock excavation in the world, a feat that took 100 years to complete.',
    location: 'Aurangabad',
    state: 'Maharashtra',
    rating: 4.7,
    reviewCount: 10890,
    crowdLevel: 'moderate',
    entryFee: 40,
    openHours: '6:00 AM – 6:00 PM (Tue closed)',
    imageUrl: `${U}/photo-1497436072909-60f360e1d4b1?w=900&q=80&fit=crop`,
    gallery: [
      `${U}/photo-1464822759023-fed622ff2c3b?w=800&q=80&fit=crop`,
      `${U}/photo-1469474968028-56623f02e42e?w=800&q=80&fit=crop`,
      `${U}/photo-1506905925346-21bda4d32df4?w=800&q=80&fit=crop`,
    ],
    tags: ['UNESCO', 'Caves', 'Sculpture', 'Buddhism', 'Architecture'],
    coordinates: { lat: 20.026, lng: 75.179 },
    queueEnabled: false,
    bestSeason: 'Oct – Mar',
    duration: '1–2 days',
  },
  {
    id: 'coorg',
    name: 'Coorg Coffee Estates',
    slug: 'coorg',
    category: 'nature',
    shortDescription: 'Scotland of India — misty hills, coffee and spice estates, and exhilarating treks.',
    description:
      "Coorg (Kodagu) in Karnataka is known as the Scotland of India for its misty hills, dense forests, coffee and cardamom estates, and numerous waterfalls. The region is one of India's major coffee producers. Abbey Falls, Raja's Seat, Namdroling Monastery, and Talacauvery are must-visit spots for nature lovers.",
    location: 'Madikeri',
    state: 'Karnataka',
    rating: 4.6,
    reviewCount: 16700,
    crowdLevel: 'moderate',
    entryFee: null,
    openHours: 'Year-round',
    imageUrl: `${U}/photo-1441974231531-c6227db76b6e?w=900&q=80&fit=crop`,
    gallery: [
      `${U}/photo-1447752875215-b2761acf3dfa?w=800&q=80&fit=crop`,
      `${U}/photo-1518495973542-4542c06a5843?w=800&q=80&fit=crop`,
      `${U}/photo-1501854140801-50d01698950b?w=800&q=80&fit=crop`,
    ],
    tags: ['Coffee', 'Trekking', 'Waterfall', 'Monastery', 'Plantation'],
    coordinates: { lat: 12.422, lng: 75.74 },
    queueEnabled: false,
    bestSeason: 'Oct – Mar',
    duration: '3–4 days',
  },
  {
    id: 'pondicherry',
    name: 'Pondicherry French Quarter',
    slug: 'pondicherry',
    category: 'heritage',
    shortDescription: 'A little piece of France on the Coromandel Coast — colonial streets, ashrams, and beaches.',
    description:
      'Pondicherry (Puducherry) is a Union Territory on the southeast coast of India with a distinct French colonial charm. The French Quarter features cobblestone streets, colourful villas draped in bougainvillaea, yoga ashrams, and a laid-back cafe culture. The Auroville experimental township and Aurobindo Ashram attract spiritual seekers worldwide.',
    location: 'Puducherry',
    state: 'Puducherry',
    rating: 4.5,
    reviewCount: 18400,
    crowdLevel: 'moderate',
    entryFee: null,
    openHours: 'Year-round',
    imageUrl: `${U}/photo-1518495973542-4542c06a5843?w=900&q=80&fit=crop`,
    gallery: [
      `${U}/photo-1507525428034-b723cf961d3e?w=800&q=80&fit=crop`,
      `${U}/photo-1476610182048-b716b8518aae?w=800&q=80&fit=crop`,
      `${U}/photo-1469474968028-56623f02e42e?w=800&q=80&fit=crop`,
    ],
    tags: ['French', 'Colonial', 'Ashram', 'Cafe', 'Yoga', 'Beach'],
    coordinates: { lat: 11.934, lng: 79.829 },
    queueEnabled: false,
    bestSeason: 'Oct – Mar',
    duration: '2–3 days',
  },
  {
    id: 'ziro-valley',
    name: 'Ziro Valley',
    slug: 'ziro-valley',
    category: 'adventure',
    shortDescription: 'Unspoiled valley of the Apatani tribe — terraced paddy fields and pine-forested hills.',
    description:
      'Ziro Valley in Arunachal Pradesh is one of the most pristine destinations in northeast India. The valley is home to the Apatani tribe, known for their unique culture and sustainable farming practices. Nominated for UNESCO World Heritage Status, it hosts the famous Ziro Music Festival each September attracting international artists.',
    location: 'Lower Subansiri',
    state: 'Arunachal Pradesh',
    rating: 4.8,
    reviewCount: 3200,
    crowdLevel: 'low',
    entryFee: null,
    openHours: 'Year-round (Oct–Mar best)',
    imageUrl: `${U}/photo-1447752875215-b2761acf3dfa?w=900&q=80&fit=crop`,
    gallery: [
      `${U}/photo-1506905925346-21bda4d32df4?w=800&q=80&fit=crop`,
      `${U}/photo-1501854140801-50d01698950b?w=800&q=80&fit=crop`,
      `${U}/photo-1464822759023-fed622ff2c3b?w=800&q=80&fit=crop`,
    ],
    tags: ['Tribe', 'Music Festival', 'Paddy', 'Offbeat', 'Northeast'],
    coordinates: { lat: 27.539, lng: 93.827 },
    queueEnabled: false,
    bestSeason: 'Oct – Mar',
    duration: '3–5 days',
  },
]

export function getPlaces(opts?: { category?: string; q?: string; sort?: string }): Place[] {
  let result = [...PLACES]

  if (opts?.category && opts.category !== 'all') {
    result = result.filter((p) => p.category === opts.category)
  }

  if (opts?.q) {
    const q = opts.q.toLowerCase()
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.state.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)),
    )
  }

  if (opts?.sort === 'rating') {
    result.sort((a, b) => b.rating - a.rating)
  } else if (opts?.sort === 'crowd-low') {
    const order: Record<CrowdLevel, number> = { low: 0, moderate: 1, high: 2 }
    result.sort((a, b) => order[a.crowdLevel] - order[b.crowdLevel])
  } else {
    result.sort((a, b) => b.reviewCount - a.reviewCount)
  }

  return result
}

export function getPlaceById(id: string): Place | undefined {
  return PLACES.find((p) => p.id === id || p.slug === id)
}

export function getFeaturedPlace(): Place {
  return PLACES.find((p) => p.featured) ?? PLACES[0]
}
