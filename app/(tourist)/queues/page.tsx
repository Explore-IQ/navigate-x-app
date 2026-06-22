'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Clock, Filter } from 'lucide-react'
import { useQueues } from '@/hooks/useQueueStatus'
import QueueCard from '@/components/queues/QueueCard'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const CATEGORIES = ['All', 'Heritage', 'Nature', 'Beach', 'Wildlife', 'Spiritual', 'Adventure']
const WAIT_OPTIONS = [
  { label: 'Any wait', value: 999 },
  { label: '≤ 15 min', value: 15 },
  { label: '≤ 30 min', value: 30 },
  { label: '≤ 60 min', value: 60 },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export default function QueuesPage() {
  const { data: queues, isLoading } = useQueues()
  const [category, setCategory] = useState('All')
  const [maxWait, setMaxWait] = useState(999)

  const filtered = (queues ?? []).filter((q) => {
    const catMatch = category === 'All' || q.category === category
    const waitMatch = q.status === 'open' ? q.currentWait <= maxWait : true
    return catMatch && waitMatch
  })

  return (
    <main className="min-h-screen bg-[#F7FAFB] pb-24">
      {/* Header */}
      <div className="bg-white border-b border-stone-100 sticky top-16 z-20 px-4 py-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#6CB6E4]" />
              <h1 className="font-[family-name:var(--font-poppins)] font-bold text-lg text-[#3E4A4F]">
                Queue Status
              </h1>
            </div>
            <span className="text-xs text-stone-400 flex items-center gap-1">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse inline-block" />
              Updates every 30s
            </span>
          </div>

          {/* Category pills */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                aria-label={`Filter by ${cat}`}
                className={cn(
                  'shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors',
                  category === cat
                    ? 'bg-[#6CB6E4] text-white'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200',
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Wait filter */}
          <div className="flex items-center gap-2 mt-2">
            <Filter className="w-3.5 h-3.5 text-stone-400" />
            <span className="text-xs text-stone-400 mr-1">Max wait:</span>
            {WAIT_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setMaxWait(opt.value)}
                aria-label={`Show queues with ${opt.label}`}
                className={cn(
                  'px-2.5 py-1 rounded-full text-xs transition-colors',
                  maxWait === opt.value
                    ? 'bg-[#4F8A65] text-white'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200',
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-5xl mx-auto px-4 pt-6">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-2xl overflow-hidden">
                <Skeleton className="h-36 w-full" />
                <div className="p-4 space-y-2 bg-white">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                  <Skeleton className="h-2 w-full mt-3" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-stone-400">
            <Clock className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p className="font-medium">No queues match your filters</p>
            <Button
              variant="ghost"
              className="mt-3 text-[#6CB6E4]"
              onClick={() => { setCategory('All'); setMaxWait(999) }}
            >
              Clear filters
            </Button>
          </div>
        ) : (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {filtered.map((queue) => (
              <motion.div key={queue.placeId} variants={item}>
                <QueueCard queue={queue} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </main>
  )
}
