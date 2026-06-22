'use client'
import { motion } from 'framer-motion'
import { PlaceCard } from './PlaceCard'
import { Skeleton } from '@/components/ui/skeleton'
import type { Place } from '@/lib/mock-places'

interface PlaceListProps {
  places: Place[]
  isLoading?: boolean
  priority?: boolean
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
}

const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.38 } },
}

function PlaceSkeleton() {
  return (
    <div className="rounded-2xl overflow-hidden bg-white shadow-sm">
      <Skeleton className="aspect-[4/3] w-full rounded-none" />
      <div className="p-4 space-y-3">
        <div className="flex justify-between items-start gap-2">
          <Skeleton className="h-5 w-36" />
          <Skeleton className="h-5 w-10 shrink-0" />
        </div>
        <Skeleton className="h-3.5 w-28" />
        <div className="flex items-center justify-between">
          <Skeleton className="h-7 w-22 rounded-full" />
          <Skeleton className="h-3.5 w-16" />
        </div>
      </div>
    </div>
  )
}

export function PlaceList({ places, isLoading = false, priority = false }: PlaceListProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <PlaceSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (!places.length) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
        <span className="text-5xl" aria-hidden>
          🌿
        </span>
        <p className="font-[family-name:var(--font-poppins)] font-semibold text-[#3E4A4F] text-lg">
          No destinations found
        </p>
        <p className="text-sm text-[#3E4A4F]/50 max-w-xs">
          Try a different category or search term to explore more places.
        </p>
      </div>
    )
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
    >
      {places.map((place, i) => (
        <motion.div key={place.id} variants={item}>
          <PlaceCard place={place} priority={priority && i < 3} />
        </motion.div>
      ))}
    </motion.div>
  )
}
