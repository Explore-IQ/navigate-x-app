'use client'

import { use } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, MapPin, Navigation } from 'lucide-react'
import { useQueueById } from '@/hooks/useQueueStatus'
import QueueTimer from '@/components/queues/QueueTimer'
import SlotBooking from '@/components/queues/SlotBooking'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface Props {
  params: Promise<{ placeId: string }>
}

export default function QueueDetailPage({ params }: Props) {
  const { placeId } = use(params)
  const { data: queue, isLoading } = useQueueById(placeId)

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#F7FAFB] pb-24">
        <Skeleton className="h-56 w-full" />
        <div className="max-w-2xl mx-auto px-4 pt-6 space-y-6">
          <Skeleton className="h-8 w-1/2" />
          <Skeleton className="h-36 w-full rounded-2xl" />
          <div className="grid grid-cols-2 gap-3">
            {Array.from({ length: 8 }).map((_, i) => <Skeleton key={i} className="h-16 rounded-xl" />)}
          </div>
        </div>
      </main>
    )
  }

  if (!queue) {
    return (
      <main className="min-h-screen bg-[#F7FAFB] flex flex-col items-center justify-center gap-4 pb-24">
        <p className="text-stone-500">Queue not found for this destination.</p>
        <Link href="/queues">
          <Button variant="outline" className="rounded-full">Back to Queues</Button>
        </Link>
      </main>
    )
  }

  const mapsUrl = `https://maps.google.com/?q=${queue.lat},${queue.lng}`

  return (
    <main className="min-h-screen bg-[#F7FAFB] pb-24">
      {/* Hero */}
      <div className="relative h-56 w-full">
        <Image
          src={queue.imageUrl}
          alt={queue.placeName}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        {/* Back */}
        <Link
          href="/queues"
          aria-label="Back to queue list"
          className="absolute top-4 left-4 w-9 h-9 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>

        <div className="absolute bottom-4 left-4 right-4">
          <Badge className="bg-white/20 text-white border-0 text-xs mb-1">{queue.category}</Badge>
          <h1 className="font-[family-name:var(--font-poppins)] text-2xl font-bold text-white">
            {queue.placeName}
          </h1>
          <p className="text-white/80 text-sm flex items-center gap-1 mt-0.5">
            <MapPin className="w-3.5 h-3.5" />
            {queue.lat.toFixed(4)}, {queue.lng.toFixed(4)}
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 pt-8 space-y-8">
        {/* Timer card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm p-6 flex flex-col sm:flex-row items-center gap-6"
        >
          <QueueTimer
            waitMinutes={queue.currentWait}
            status={queue.status}
            capacity={queue.capacity}
            occupied={queue.occupied}
          />
          <div className="flex-1 space-y-3 text-center sm:text-left">
            <div>
              <p className="text-xs text-stone-400 uppercase tracking-wide">Status</p>
              <p className="font-semibold text-[#3E4A4F] capitalize">{queue.status}</p>
            </div>
            <div>
              <p className="text-xs text-stone-400 uppercase tracking-wide">Available slots today</p>
              <p className="font-semibold text-[#3E4A4F]">{queue.slots.length}</p>
            </div>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Get directions"
            >
              <Button
                variant="outline"
                className="rounded-full border-[#6CB6E4] text-[#6CB6E4] hover:bg-[#6CB6E4]/10 gap-2"
              >
                <Navigation className="w-4 h-4" />
                Get Directions
              </Button>
            </a>
          </div>
        </motion.div>

        {/* Slot booking */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-white rounded-2xl shadow-sm p-6"
        >
          <SlotBooking slots={queue.slots} placeId={queue.placeId} />
        </motion.div>
      </div>
    </main>
  )
}
