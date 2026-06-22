import Image from 'next/image'
import Link from 'next/link'
import { Search, Star, MapPin, ArrowRight } from 'lucide-react'
import { getPlaces, getFeaturedPlace } from '@/lib/mock-places'
import { PlaceList } from '@/components/places/PlaceList'
import { DiscoverFilters } from '@/components/places/DiscoverFilters'

interface DiscoverPageProps {
  searchParams: Promise<{ category?: string; sort?: string }>
}

export default async function DiscoverPage({ searchParams }: DiscoverPageProps) {
  const { category = 'all', sort = 'popular' } = await searchParams

  const featured = getFeaturedPlace()
  const places = getPlaces({
    category: category === 'all' ? undefined : category,
    sort,
  })

  const showFeatured = category === 'all'
  const heading =
    category === 'all'
      ? 'All Destinations'
      : `${category.charAt(0).toUpperCase()}${category.slice(1)} Destinations`

  return (
    <div className="min-h-screen bg-[#F7FAFB]">
      {/* Sticky search + filter header */}
      <div className="sticky top-16 z-30 bg-white/95 backdrop-blur-md border-b border-[#3E4A4F]/8 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 space-y-3">
          {/* Search bar — opens CSR search page */}
          <Link
            href="/discover/search"
            aria-label="Search destinations"
            className="flex items-center gap-3 px-4 py-2.5 rounded-full bg-[#F7FAFB] border border-[#3E4A4F]/12 text-[#3E4A4F]/45 text-sm hover:border-[#6CB6E4]/45 hover:bg-white transition-all duration-200"
          >
            <Search className="w-4 h-4 shrink-0 text-[#3E4A4F]/40" aria-hidden />
            <span>Search beaches, mountains, heritage...</span>
          </Link>

          {/* Category filter tabs */}
          <DiscoverFilters activeCategory={category} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 space-y-10">
        {/* Featured destination */}
        {showFeatured && (
          <section aria-labelledby="featured-heading">
            <h2
              id="featured-heading"
              className="font-[family-name:var(--font-poppins)] font-bold text-[#3E4A4F] text-xl mb-4"
            >
              Editor&apos;s Pick
            </h2>
            <Link
              href={`/discover/${featured.id}`}
              aria-label={`View ${featured.name}`}
              className="group block rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-60 md:h-80 lg:h-[420px]">
                <Image
                  src={featured.imageUrl}
                  alt={featured.name}
                  fill
                  sizes="(max-width: 1280px) 100vw, 1280px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#6CB6E4]/90 backdrop-blur-sm mb-3 inline-block capitalize">
                        {featured.category}
                      </span>
                      <h3 className="font-[family-name:var(--font-poppins)] font-bold text-2xl md:text-3xl mb-1.5">
                        {featured.name}
                      </h3>
                      <div className="flex flex-wrap items-center gap-4 text-white/75 text-sm">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" aria-hidden />
                          {featured.location}, {featured.state}
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 fill-[#EBA86B] text-[#EBA86B]" aria-hidden />
                          {featured.rating} · {featured.reviewCount.toLocaleString()} reviews
                        </span>
                      </div>
                    </div>
                    <div
                      className="shrink-0 w-11 h-11 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/30 transition-colors"
                      aria-hidden
                    >
                      <ArrowRight className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </section>
        )}

        {/* All destinations grid */}
        <section aria-labelledby="places-heading">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <h2
              id="places-heading"
              className="font-[family-name:var(--font-poppins)] font-bold text-[#3E4A4F] text-xl"
            >
              {heading}
              <span className="ml-2 text-base font-normal text-[#3E4A4F]/45">({places.length})</span>
            </h2>

            {/* Sort links */}
            <div className="flex items-center gap-2">
              {(
                [
                  { value: 'popular', label: 'Popular' },
                  { value: 'rating', label: 'Top Rated' },
                  { value: 'crowd-low', label: 'Less Crowd' },
                ] as const
              ).map((s) => (
                <Link
                  key={s.value}
                  href={`/discover?${new URLSearchParams({ category, sort: s.value }).toString()}`}
                  aria-current={sort === s.value ? 'true' : undefined}
                  className={`text-xs px-3 py-1.5 rounded-full transition-all duration-150 font-medium ${
                    sort === s.value
                      ? 'bg-[#6CB6E4] text-white shadow-sm'
                      : 'bg-white text-[#3E4A4F]/55 border border-[#3E4A4F]/14 hover:border-[#6CB6E4]/35 hover:text-[#6CB6E4]'
                  }`}
                >
                  {s.label}
                </Link>
              ))}
            </div>
          </div>

          <PlaceList places={places} priority />
        </section>
      </div>
    </div>
  )
}
