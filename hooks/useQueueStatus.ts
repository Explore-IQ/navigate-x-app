'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getQueues, getQueueById } from '@/lib/mock-queues'
import { toast } from 'sonner'

async function fetchQueues() {
  await new Promise((r) => setTimeout(r, 300))
  return getQueues()
}

async function fetchQueueById(placeId: string) {
  await new Promise((r) => setTimeout(r, 200))
  return getQueueById(placeId) ?? null
}

async function bookSlot(payload: { placeId: string; slotId: string; time: string }) {
  await new Promise((r) => setTimeout(r, 600))
  if (Math.random() < 0.05) throw new Error('Slot already taken')
  return { bookingId: `BK-${Date.now()}`, ...payload }
}

export function useQueues() {
  return useQuery({
    queryKey: ['queues'],
    queryFn: fetchQueues,
    refetchInterval: 30_000,
    staleTime: 20_000,
  })
}

export function useQueueById(placeId: string) {
  return useQuery({
    queryKey: ['queue', placeId],
    queryFn: () => fetchQueueById(placeId),
    refetchInterval: 30_000,
    staleTime: 20_000,
    enabled: !!placeId,
  })
}

export function useBookSlot() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: bookSlot,
    onSuccess: (data) => {
      toast.success(`Slot booked! ID: ${data.bookingId}`, {
        description: `${data.time} — confirm at the entrance.`,
      })
      qc.invalidateQueries({ queryKey: ['queues'] })
      qc.invalidateQueries({ queryKey: ['queue', data.placeId] })
    },
    onError: (err: Error) => {
      toast.error('Booking failed', { description: err.message })
    },
  })
}
