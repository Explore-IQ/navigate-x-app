import { Skeleton } from '@/components/ui/skeleton'

export default function DiscoverLoading() {
  return (
    <div className="min-h-screen bg-[#F7FAFB]">
      {/* Sticky header skeleton */}
      <div className="sticky top-16 z-30 bg-white border-b border-[#3E4A4F]/8 py-3 px-4 md:px-6 space-y-3">
        <Skeleton className="h-10 w-full rounded-full" />
        <div className="flex gap-2 overflow-hidden">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-9 w-28 shrink-0 rounded-full" />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 space-y-10">
        {/* Featured skeleton */}
        <div>
          <Skeleton className="h-7 w-32 mb-4" />
          <Skeleton className="h-60 md:h-80 lg:h-[420px] w-full rounded-2xl" />
        </div>

        {/* Grid skeleton */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <Skeleton className="h-7 w-52" />
            <div className="flex gap-2">
              <Skeleton className="h-8 w-20 rounded-full" />
              <Skeleton className="h-8 w-22 rounded-full" />
              <Skeleton className="h-8 w-24 rounded-full" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-2xl overflow-hidden bg-white shadow-sm">
                <Skeleton className="aspect-[4/3] w-full rounded-none" />
                <div className="p-4 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <Skeleton className="h-5 w-36" />
                    <Skeleton className="h-5 w-10" />
                  </div>
                  <Skeleton className="h-3.5 w-28" />
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-7 w-24 rounded-full" />
                    <Skeleton className="h-3.5 w-16" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
