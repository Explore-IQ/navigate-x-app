'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { ParkingSquare, Navigation, Car } from 'lucide-react'
import { useParkingLots } from '@/hooks/useParkingStatus'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import type { ParkingLot } from '@/lib/mock-traffic'
import type { MapMarker } from '@/components/maps/TourismMap'

const TourismMap = dynamic(() => import('@/components/maps/TourismMap'), { ssr: false })

function availabilityColor(lot: ParkingLot): string {
  const pct = lot.total > 0 ? lot.available / lot.total : 0
  if (pct === 0) return '#E05C5C'
  if (pct < 0.2) return '#EBA86B'
  return '#4F8A65'
}

function availabilityLabel(lot: ParkingLot): string {
  if (lot.available === 0) return 'Full'
  const pct = lot.available / lot.total
  if (pct < 0.2) return 'Scarce'
  return 'Available'
}

function availabilityBadge(lot: ParkingLot): string {
  if (lot.available === 0) return 'bg-red-100 text-red-700'
  const pct = lot.available / lot.total
  if (pct < 0.2) return 'bg-amber-100 text-amber-700'
  return 'bg-green-100 text-green-700'
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
}
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
}

export default function ParkingPage() {
  const { data: lots, isLoading } = useParkingLots()
  const [highlighted, setHighlighted] = useState<string | null>(null)

  const markers: MapMarker[] =
    lots?.map((lot) => ({
      id: lot.id,
      lat: lot.lat,
      lng: lot.lng,
      label: `${lot.name} — ${lot.available}/${lot.total} spots`,
      color: availabilityColor(lot),
      onClick: () => {
        setHighlighted(lot.id)
        document.getElementById(`lot-${lot.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      },
    })) ?? []

  return (
    <main className="min-h-screen bg-[#F7FAFB] pb-24">
      {/* Header */}
      <div className="bg-white border-b border-stone-100 px-4 py-4 sticky top-16 z-20">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ParkingSquare className="w-5 h-5 text-[#6CB6E4]" />
            <h1 className="font-[family-name:var(--font-poppins)] font-bold text-lg text-[#3E4A4F]">
              Parking Availability
            </h1>
          </div>
          <span className="text-xs text-stone-400 flex items-center gap-1">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse inline-block" />
            Updates every 30s
          </span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 pt-4 space-y-4">
        {/* Legend */}
        <div className="flex gap-4 text-xs text-stone-500">
          {[
            { dot: 'bg-[#4F8A65]', label: 'Available' },
            { dot: 'bg-amber-400', label: 'Scarce' },
            { dot: 'bg-red-400', label: 'Full' },
          ].map((l) => (
            <div key={l.label} className="flex items-center gap-1.5">
              <div className={cn('w-2.5 h-2.5 rounded-full', l.dot)} />
              {l.label}
            </div>
          ))}
        </div>

        {/* Map */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-2xl overflow-hidden shadow-sm"
          style={{ height: '50vh' }}
        >
          {isLoading ? (
            <Skeleton className="w-full h-full" />
          ) : (
            <TourismMap
              center={[78.9629, 20.5937]}
              zoom={4.5}
              markers={markers}
              className="w-full h-full"
            />
          )}
        </motion.div>

        {/* Lot list */}
        <h2 className="font-[family-name:var(--font-poppins)] font-semibold text-[#3E4A4F] text-base pt-2">
          Nearby Lots
        </h2>

        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-20 rounded-2xl" />
            ))}
          </div>
        ) : (
          <motion.div variants={container} initial="hidden" animate="show" className="space-y-3">
            {(lots ?? []).map((lot) => (
              <motion.div
                key={lot.id}
                id={`lot-${lot.id}`}
                variants={item}
                onClick={() => setHighlighted(lot.id === highlighted ? null : lot.id)}
                className={cn(
                  'bg-white rounded-2xl shadow-sm p-4 flex items-center gap-4 cursor-pointer transition-all',
                  highlighted === lot.id ? 'ring-2 ring-[#6CB6E4]' : 'hover:shadow-md',
                )}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: availabilityColor(lot) + '20' }}
                >
                  <Car className="w-5 h-5" style={{ color: availabilityColor(lot) }} />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-medium text-[#3E4A4F] text-sm truncate">{lot.name}</p>
                  <p className="text-xs text-stone-400 mt-0.5">
                    ₹{lot.pricePerHour}/hr · {lot.available}/{lot.total} spots
                  </p>
                  <div className="mt-1.5 h-1.5 rounded-full bg-stone-100 overflow-hidden w-32">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${(lot.available / lot.total) * 100}%`,
                        background: availabilityColor(lot),
                      }}
                    />
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2 shrink-0">
                  <span
                    className={cn('text-xs font-semibold px-2 py-0.5 rounded-full', availabilityBadge(lot))}
                  >
                    {availabilityLabel(lot)}
                  </span>
                  <a
                    href={`https://maps.google.com/?q=${lot.lat},${lot.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    aria-label={`Get directions to ${lot.name}`}
                    className="text-[#6CB6E4] text-xs flex items-center gap-1 hover:underline"
                  >
                    <Navigation className="w-3 h-3" />
                    Navigate
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </main>
  )
}
