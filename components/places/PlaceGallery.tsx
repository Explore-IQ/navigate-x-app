'use client'
import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

interface PlaceGalleryProps {
  images: string[]
  placeName: string
}

export function PlaceGallery({ images, placeName }: PlaceGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  function prev() {
    setLightboxIndex((i) => (i !== null ? (i - 1 + images.length) % images.length : null))
  }
  function next() {
    setLightboxIndex((i) => (i !== null ? (i + 1) % images.length : null))
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {images.map((src, i) => (
          <button
            key={i}
            onClick={() => setLightboxIndex(i)}
            aria-label={`Open image ${i + 1} of ${placeName} gallery`}
            className="relative aspect-[4/3] rounded-xl overflow-hidden group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6CB6E4] focus-visible:ring-offset-2"
          >
            <Image
              src={src}
              alt={`${placeName} — photo ${i + 1}`}
              fill
              sizes="(max-width: 640px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300" />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/92 flex items-center justify-center p-4"
            onClick={() => setLightboxIndex(null)}
          >
            <button
              aria-label="Close gallery"
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            <button
              aria-label="Previous image"
              onClick={(e) => {
                e.stopPropagation()
                prev()
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>

            <button
              aria-label="Next image"
              onClick={(e) => {
                e.stopPropagation()
                next()
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>

            <motion.div
              key={lightboxIndex}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.22 }}
              className="relative w-full max-w-4xl aspect-[4/3]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[lightboxIndex]}
                alt={`${placeName} — photo ${lightboxIndex + 1}`}
                fill
                className="object-contain"
              />
            </motion.div>

            <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/55 text-sm tabular-nums">
              {lightboxIndex + 1} / {images.length}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
