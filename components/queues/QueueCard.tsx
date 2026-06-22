'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Clock, Users, ChevronRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { QueueEntry } from '@/lib/mock-queues'

interface Props {
  queue: QueueEntry
}

function waitColor(wait: number, status: QueueEntry['status']): string {
  if (status === 'closed') return 'bg-stone-200 text-stone-600'
  if (status === 'full') return 'bg-red-100 text-red-700'
  if (wait <= 15) return 'bg-green-100 text-green-700'
  if (wait <= 30) return 'bg-amber-100 text-amber-700'
  return 'bg-red-100 text-red-700'
}

function waitLabel(wait: number, status: QueueEntry['status']): string {
  if (status === 'closed') return 'Closed'
  if (status === 'full') return 'Full'
  if (wait === 0) return 'No wait'
  return `~${wait} min wait`
}

function occupancyPct(queue: QueueEntry): number {
  return Math.round((queue.occupied / queue.capacity) * 100)
}

export default function QueueCard({ queue }: Props) {
  const pct = occupancyPct(queue)

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <Link
        href={`/queues/${queue.placeId}`}
        className="block bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden"
        aria-label={`View queue for ${queue.placeName}`}
      >
        <div className="relative h-36 w-full">
          <Image
            src={queue.imageUrl}
            alt={queue.placeName}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <Badge
            className={cn(
              'absolute top-3 left-3 text-xs font-semibold border-0',
              waitColor(queue.currentWait, queue.status),
            )}
          >
            {waitLabel(queue.currentWait, queue.status)}
          </Badge>
        </div>

        <div className="p-4">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="font-semibold text-[#3E4A4F] text-sm leading-tight">{queue.placeName}</p>
              <p className="text-xs text-stone-400 mt-0.5">{queue.category}</p>
            </div>
            <ChevronRight className="w-4 h-4 text-stone-300 mt-0.5 shrink-0" />
          </div>

          <div className="mt-3 flex items-center gap-4 text-xs text-stone-500">
            <span className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5" />
              {queue.occupied}/{queue.capacity}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {queue.slots.length} slots
            </span>
          </div>

          <div className="mt-2 h-1.5 rounded-full bg-stone-100 overflow-hidden">
            <div
              className={cn(
                'h-full rounded-full transition-all',
                pct >= 90 ? 'bg-red-400' : pct >= 60 ? 'bg-amber-400' : 'bg-[#4F8A65]',
              )}
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
