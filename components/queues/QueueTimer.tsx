'use client'

import { motion } from 'framer-motion'
import type { QueueEntry } from '@/lib/mock-queues'

interface Props {
  waitMinutes: number
  status: QueueEntry['status']
  capacity: number
  occupied: number
}

const RADIUS = 52
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

function ringColor(wait: number, status: QueueEntry['status']): string {
  if (status === 'closed' || status === 'full') return '#E05C5C'
  if (wait <= 15) return '#4F8A65'
  if (wait <= 30) return '#EBA86B'
  return '#E05C5C'
}

function label(wait: number, status: QueueEntry['status']): string {
  if (status === 'closed') return 'Closed'
  if (status === 'full') return 'Full'
  if (wait === 0) return 'Open'
  return `${wait}m`
}

function sublabel(wait: number, status: QueueEntry['status']): string {
  if (status === 'closed') return 'Opens tomorrow'
  if (status === 'full') return 'Check back soon'
  if (wait === 0) return 'No wait'
  return 'avg. wait'
}

export default function QueueTimer({ waitMinutes, status, capacity, occupied }: Props) {
  const pct = capacity > 0 ? occupied / capacity : 0
  const dashOffset = CIRCUMFERENCE * (1 - pct)
  const color = ringColor(waitMinutes, status)

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-36 h-36">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120" aria-hidden="true">
          <circle cx="60" cy="60" r={RADIUS} fill="none" stroke="#F0F0F0" strokeWidth="10" />
          <motion.circle
            cx="60"
            cy="60"
            r={RADIUS}
            fill="none"
            stroke={color}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            initial={{ strokeDashoffset: CIRCUMFERENCE }}
            animate={{ strokeDashoffset: dashOffset }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />
        </svg>

        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center"
          animate={status === 'open' && waitMinutes > 30 ? { scale: [1, 1.04, 1] } : {}}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <span className="text-2xl font-bold" style={{ color }}>
            {label(waitMinutes, status)}
          </span>
          <span className="text-xs text-stone-400 mt-0.5">{sublabel(waitMinutes, status)}</span>
        </motion.div>
      </div>

      <div className="text-center text-sm text-stone-500">
        <span className="font-medium text-[#3E4A4F]">{occupied}</span> / {capacity} capacity
      </div>
    </div>
  )
}
