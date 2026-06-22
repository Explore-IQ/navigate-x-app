'use client'
import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Search, ArrowLeft, X } from 'lucide-react'
import { usePlaces } from '@/hooks/usePlaces'
import { PlaceList } from '@/components/places/PlaceList'
import { cn } from '@/lib/utils'
import type { PlaceCategory } from '@/lib/mock-places'

const CATEGORIES: { value: PlaceCategory | 'all'; label: string; emoji: string }[] = [
  { value: 'all', label: 'All', emoji: '🗺️' },
  { value: 'beach', label: 'Beach', emoji: '🏖' },
  { value: 'mountain', label: 'Mountain', emoji: '🏔' },
  { value: 'heritage', label: 'Heritage', emoji: '🏛' },
  { value: 'nature', label: 'Nature', emoji: '🌿' },
  { value: 'adventure', label: 'Adventure', emoji: '🎯' },
]

export default function DiscoverSearchPage() {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<PlaceCategory | 'all'>('all')
  const [sort, setSort] = useState('popular')

  const { data: places = [], isLoading } = usePlaces({
    q: query || undefined,
    category: category === 'all' ? undefined : category,
    sort,
  })

  const clearFilters = useCallback(() => {
    setQuery('')
    setCategory('all')
    setSort('popular')
  }, [])

  const hasFilters = query !== '' || category !== 'all'

  return (
    <div className="min-h-screen bg-[#F7FAFB]">
      {/* Sticky search header */}
      <div className="sticky top-16 z-30 bg-white/95 backdrop-blur-md border-b border-[#3E4A4F]/8 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 space-y-3">
          {/* Back + search input */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.back()}
              aria-label="Go back"
              className="w-9 h-9 rounded-full bg-[#F7FAFB] border border-[#3E4A4F]/12 flex items-center justify-center hover:bg-[#6CB6E4]/10 hover:border-[#6CB6E4]/30 transition-colors shrink-0"
            >
              <ArrowLeft className="w-4 h-4 text-[#3E4A4F]/60" aria-hidden />
            </button>

            <div className="relative flex-1">
              <Search
                className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#3E4A4F]/40"
                aria-hidden
              />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search beaches, mountains, heritage..."
                aria-label="Search destinations"
                autoFocus
                className="w-full pl-10 pr-9 py-2.5 rounded-full bg-[#F7FAFB] border border-[#3E4A4F]/12 text-sm text-[#3E4A4F] placeholder:text-[#3E4A4F]/40 focus:outline-none focus:border-[#6CB6E4]/50 focus:bg-white transition-all"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <X className="w-4 h-4 text-[#3E4A4F]/40 hover:text-[#3E4A4F]/70 transition-colors" />
                </button>
              )}
            </div>
          </div>

          {/* Filters row */}
          <div className="flex items-center gap-2 overflow-x-auto pb-0.5 scrollbar-hide">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setCategory(cat.value)}
                aria-pressed={category === cat.value}
                className={cn(
                  'shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-150 whitespace-nowrap',
                  category === cat.value
                    ? 'bg-[#6CB6E4] text-white shadow-sm'
                    : 'bg-white text-[#3E4A4F]/60 border border-[#3E4A4F]/14 hover:border-[#6CB6E4]/30 hover:text-[#6CB6E4]',
                )}
              >
                <span aria-hidden>{cat.emoji}</span>
                {cat.label}
              </button>
            ))}

            <span className="w-px h-5 bg-[#3E4A4F]/12 shrink-0 mx-1" aria-hidden />

            {/* Sort */}
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              aria-label="Sort results"
              className="shrink-0 px-3 py-1.5 rounded-full text-xs font-medium bg-white border border-[#3E4A4F]/14 text-[#3E4A4F]/60 focus:outline-none focus:border-[#6CB6E4]/40 cursor-pointer"
            >
              <option value="popular">Popular</option>
              <option value="rating">Top Rated</option>
              <option value="crowd-low">Less Crowd</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-3 mb-6"
        >
          <p className="font-[family-name:var(--font-poppins)] font-semibold text-[#3E4A4F]">
            {isLoading
              ? 'Searching...'
              : `${places.length} destination${places.length !== 1 ? 's' : ''} found`}
          </p>
          {hasFilters && !isLoading && (
            <button
              onClick={clearFilters}
              className="text-xs text-[#6CB6E4] hover:underline underline-offset-2"
            >
              Clear all
            </button>
          )}
        </motion.div>

        <PlaceList places={places} isLoading={isLoading} />
      </div>
    </div>
  )
}
