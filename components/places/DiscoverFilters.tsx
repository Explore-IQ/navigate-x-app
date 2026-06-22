'use client'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const CATEGORIES = [
  { value: 'all', label: 'All Destinations', emoji: '🗺️' },
  { value: 'beach', label: 'Beach', emoji: '🏖' },
  { value: 'mountain', label: 'Mountain', emoji: '🏔' },
  { value: 'heritage', label: 'Heritage', emoji: '🏛' },
  { value: 'nature', label: 'Nature', emoji: '🌿' },
  { value: 'adventure', label: 'Adventure', emoji: '🎯' },
] as const

interface DiscoverFiltersProps {
  activeCategory: string
}

export function DiscoverFilters({ activeCategory }: DiscoverFiltersProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide" role="tablist" aria-label="Filter by category">
      {CATEGORIES.map((cat) => {
        const isActive =
          cat.value === activeCategory || (cat.value === 'all' && (!activeCategory || activeCategory === 'all'))
        const href = cat.value === 'all' ? '/discover' : `/discover?category=${cat.value}`

        return (
          <Link
            key={cat.value}
            href={href}
            role="tab"
            aria-selected={isActive}
            aria-current={isActive ? 'page' : undefined}
            className={cn(
              'shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap cursor-pointer',
              isActive
                ? 'bg-[#6CB6E4] text-white shadow-sm shadow-[#6CB6E4]/30'
                : 'bg-white text-[#3E4A4F]/65 border border-[#3E4A4F]/14 hover:border-[#6CB6E4]/40 hover:text-[#6CB6E4] hover:bg-[#6CB6E4]/5',
            )}
          >
            <span aria-hidden="true">{cat.emoji}</span>
            {cat.label}
          </Link>
        )
      })}
    </div>
  )
}
