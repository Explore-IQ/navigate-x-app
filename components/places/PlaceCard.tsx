'use client'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Star, MapPin, Clock, Bookmark } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Place } from '@/lib/mock-places'

const CATEGORY_CONFIG: Record<Place['category'], { label: string; color: string }> = {
  beach: { label: 'Beach', color: 'bg-[#6CB6E4] text-white' },
  mountain: { label: 'Mountain', color: 'bg-[#3E4A4F] text-white' },
  heritage: { label: 'Heritage', color: 'bg-[#EBA86B] text-[#3E4A4F]' },
  nature: { label: 'Nature', color: 'bg-[#4F8A65] text-white' },
  food: { label: 'Food', color: 'bg-[#E8445A] text-white' },
  adventure: { label: 'Adventure', color: 'bg-[#3E4A4F] text-white' },
}

const CROWD_CONFIG: Record<Place['crowdLevel'], { label: string; color: string }> = {
  low: { label: 'Low Crowd', color: 'bg-[#4F8A65]/12 text-[#4F8A65] border-[#4F8A65]/25' },
  moderate: { label: 'Moderate', color: 'bg-[#EBA86B]/12 text-[#EBA86B] border-[#EBA86B]/25' },
  high: { label: 'High Crowd', color: 'bg-[#E8445A]/12 text-[#E8445A] border-[#E8445A]/25' },
}

interface PlaceCardProps {
  place: Place
  priority?: boolean
}

export function PlaceCard({ place, priority = false }: PlaceCardProps) {
  const cat = CATEGORY_CONFIG[place.category]
  const crowd = CROWD_CONFIG[place.crowdLevel]

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 320, damping: 28 }}
      className="group rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-shadow duration-300"
    >
      <Link href={`/discover/${place.id}`} aria-label={`View details for ${place.name}`} className="block">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={place.imageUrl}
            alt={place.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority={priority}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />

          {/* Top row: category badge + bookmark */}
          <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
            <span className={cn('text-xs font-semibold px-2.5 py-1 rounded-full', cat.color)}>
              {cat.label}
            </span>
            <button
              aria-label={`Save ${place.name} to wishlist`}
              className="w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors duration-200"
              onClick={(e) => e.preventDefault()}
            >
              <Bookmark className="w-3.5 h-3.5 text-[#3E4A4F]/70" />
            </button>
          </div>

          {/* Entry fee */}
          <div className="absolute bottom-3 left-3">
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-black/45 text-white backdrop-blur-sm">
              {place.entryFee === null ? 'Free Entry' : `₹${place.entryFee}`}
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="p-4">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-[family-name:var(--font-poppins)] font-bold text-[#3E4A4F] text-base leading-tight line-clamp-1 flex-1">
              {place.name}
            </h3>
            <div className="flex items-center gap-1 shrink-0">
              <Star className="w-3.5 h-3.5 fill-[#EBA86B] text-[#EBA86B]" aria-hidden />
              <span className="text-sm font-semibold text-[#3E4A4F]">{place.rating}</span>
            </div>
          </div>

          <div className="flex items-center gap-1 mb-3">
            <MapPin className="w-3 h-3 text-[#3E4A4F]/45 shrink-0" aria-hidden />
            <span className="text-xs text-[#3E4A4F]/55 truncate">
              {place.location}, {place.state}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className={cn('text-xs font-medium px-2.5 py-1 rounded-full border', crowd.color)}>
              {crowd.label}
            </span>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-[#3E4A4F]/35" aria-hidden />
              <span className="text-xs text-[#3E4A4F]/45">{place.bestSeason}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
