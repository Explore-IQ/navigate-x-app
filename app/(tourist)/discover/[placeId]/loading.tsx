import { Skeleton } from '@/components/ui/skeleton'

export default function PlaceDetailLoading() {
  return (
    <div>
      <Skeleton className="h-64 md:h-[420px] w-full rounded-none" />
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        <div className="py-6 border-b border-[#3E4A4F]/10 space-y-3">
          <Skeleton className="h-8 w-72" />
          <div className="flex items-center gap-3">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-6 w-24 rounded-full" />
          </div>
          <div className="flex gap-3 pt-1">
            <Skeleton className="h-10 w-36 rounded-full" />
            <Skeleton className="h-10 w-28 rounded-full" />
          </div>
        </div>
        <div className="py-6 space-y-6">
          <Skeleton className="h-10 w-72 rounded-full" />
          <div className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-4 w-3/4" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-20 rounded-xl" />
            ))}
          </div>
          <div className="flex gap-2 flex-wrap">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-8 w-20 rounded-full" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
