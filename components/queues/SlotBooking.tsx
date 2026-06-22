'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useBookSlot } from '@/hooks/useQueueStatus'
import type { SlotWindow } from '@/lib/mock-queues'

interface Props {
  slots: SlotWindow[]
  placeId: string
}

export default function SlotBooking({ slots, placeId }: Props) {
  const [selected, setSelected] = useState<SlotWindow | null>(null)
  const { mutate: book, isPending } = useBookSlot()

  function handleBook() {
    if (!selected) return
    book(
      { placeId, slotId: selected.id, time: selected.time },
      { onSuccess: () => setSelected(null) },
    )
  }

  if (slots.length === 0) {
    return (
      <div className="rounded-2xl bg-stone-50 border border-stone-100 p-6 text-center text-stone-400 text-sm">
        No slots available today. Check back tomorrow.
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-[#3E4A4F] flex items-center gap-2">
        <Clock className="w-4 h-4 text-[#6CB6E4]" />
        Select a Time Slot
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {slots.map((slot) => {
          const isFull = slot.available === 0
          const isSelected = selected?.id === slot.id
          return (
            <motion.button
              key={slot.id}
              whileHover={isFull ? {} : { scale: 1.03 }}
              whileTap={isFull ? {} : { scale: 0.97 }}
              onClick={() => !isFull && setSelected(slot)}
              disabled={isFull}
              aria-label={`${slot.time} — ${slot.available} spots`}
              className={cn(
                'relative rounded-xl border-2 p-3 text-left transition-all',
                isFull
                  ? 'border-stone-100 bg-stone-50 opacity-50 cursor-not-allowed'
                  : isSelected
                    ? 'border-[#6CB6E4] bg-[#6CB6E4]/10'
                    : 'border-stone-200 bg-white hover:border-[#6CB6E4]/50',
              )}
            >
              {isSelected && (
                <CheckCircle2 className="absolute top-2 right-2 w-3.5 h-3.5 text-[#6CB6E4]" />
              )}
              <p className="text-xs font-semibold text-[#3E4A4F]">{slot.time}</p>
              <p
                className={cn(
                  'text-xs mt-0.5',
                  isFull
                    ? 'text-stone-400'
                    : slot.available <= 10
                      ? 'text-red-500'
                      : 'text-[#4F8A65]',
                )}
              >
                {isFull ? 'Full' : `${slot.available} left`}
              </p>
            </motion.button>
          )
        })}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="flex items-center gap-3 p-4 rounded-2xl bg-[#6CB6E4]/10 border border-[#6CB6E4]/30"
          >
            <div className="flex-1 text-sm">
              <span className="text-stone-500">Selected: </span>
              <span className="font-semibold text-[#3E4A4F]">{selected.time}</span>
              <span className="text-stone-400"> — {selected.available} spots remaining</span>
            </div>
            <Button
              onClick={handleBook}
              disabled={isPending}
              className="bg-[#6CB6E4] hover:bg-[#5aa8d8] text-white rounded-full px-6"
              aria-label="Confirm slot booking"
            >
              {isPending ? 'Booking…' : 'Confirm'}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
