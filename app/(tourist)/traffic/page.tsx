'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Radio, TrendingUp } from 'lucide-react'
import { mockTrafficPoints } from '@/lib/mock-traffic'
import { mockQueues } from '@/lib/mock-queues'
import { onSocketEvent } from '@/lib/socket'
import { useRealtimeStore } from '@/stores/realtime.store'
import type { TrafficPoint } from '@/lib/mock-traffic'
import { cn } from '@/lib/utils'

const CrowdHeatmap = dynamic(() => import('@/components/maps/CrowdHeatmap'), { ssr: false })

function densityLabel(d: number): string {
  if (d >= 0.7) return 'High'
  if (d >= 0.4) return 'Medium'
  return 'Low'
}

function densityColor(d: number): string {
  if (d >= 0.7) return 'text-red-600'
  if (d >= 0.4) return 'text-amber-600'
  return 'text-[#4F8A65]'
}

function densityBg(d: number): string {
  if (d >= 0.7) return 'bg-red-50'
  if (d >= 0.4) return 'bg-amber-50'
  return 'bg-green-50'
}

export default function TrafficPage() {
  const { connected, setConnected, trafficPoints, setTrafficPoints } = useRealtimeStore()
  const [points, setPoints] = useState<TrafficPoint[]>(mockTrafficPoints)

  useEffect(() => {
    setTrafficPoints(mockTrafficPoints)
  }, [setTrafficPoints])

  useEffect(() => {
    const off = onSocketEvent('traffic:update', (data) => {
      setConnected(true)
      setTrafficPoints(data.points)
      setPoints(data.points)
    })
    return off
  }, [setConnected, setTrafficPoints])

  const displayPoints = trafficPoints.length > 0 ? trafficPoints : points

  // Top 5 most crowded places
  const crowded = [...mockQueues]
    .sort((a, b) => b.occupied / b.capacity - a.occupied / a.capacity)
    .slice(0, 5)

  return (
    <main className="min-h-screen bg-[#F7FAFB] pb-24">
      {/* Header */}
      <div className="bg-white border-b border-stone-100 px-4 py-4 sticky top-16 z-20">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#6CB6E4]" />
            <h1 className="font-[family-name:var(--font-poppins)] font-bold text-lg text-[#3E4A4F]">
              Live Traffic
            </h1>
          </div>

          <div className="flex items-center gap-1.5 text-xs">
            <Radio
              className={cn('w-3.5 h-3.5', connected ? 'text-green-500' : 'text-stone-300')}
            />
            <span className={connected ? 'text-green-600' : 'text-stone-400'}>
              {connected ? 'Live' : 'Simulated'}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 pt-4 lg:flex lg:gap-6">
        {/* Map */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="lg:flex-1 rounded-2xl overflow-hidden shadow-sm"
          style={{ height: '60vh' }}
        >
          <CrowdHeatmap points={displayPoints} className="w-full h-full" />
        </motion.div>

        {/* Sidebar */}
        <div className="mt-4 lg:mt-0 lg:w-72 space-y-4">
          {/* Legend */}
          <div className="bg-white rounded-2xl shadow-sm p-4">
            <p className="text-xs font-semibold text-stone-400 uppercase tracking-wide mb-3">
              Density Legend
            </p>
            {[
              { label: 'High', color: 'bg-red-400' },
              { label: 'Medium', color: 'bg-amber-400' },
              { label: 'Low', color: 'bg-[#4F8A65]' },
            ].map((l) => (
              <div key={l.label} className="flex items-center gap-2 mb-2">
                <div className={cn('w-4 h-4 rounded-sm', l.color)} />
                <span className="text-sm text-stone-600">{l.label} crowd</span>
              </div>
            ))}
          </div>

          {/* Top crowded */}
          <div className="bg-white rounded-2xl shadow-sm p-4">
            <p className="text-xs font-semibold text-stone-400 uppercase tracking-wide mb-3">
              Most Crowded Now
            </p>
            <div className="space-y-3">
              {crowded.map((q, i) => {
                const density = q.occupied / q.capacity
                return (
                  <div key={q.placeId} className={cn('flex items-center gap-3 rounded-xl p-2', densityBg(density))}>
                    <span className="text-xs font-bold text-stone-400 w-4">{i + 1}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#3E4A4F] truncate">{q.placeName}</p>
                      <p className={cn('text-xs font-semibold', densityColor(density))}>
                        {densityLabel(density)} · {q.currentWait > 0 ? `~${q.currentWait}m wait` : q.status}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
