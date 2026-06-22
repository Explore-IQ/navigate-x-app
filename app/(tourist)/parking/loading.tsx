import { Skeleton } from '@/components/ui/skeleton'

export default function ParkingLoading() {
  return (
    <div className="min-h-screen bg-[#F7FAFB] pb-24">
      <div className="bg-white border-b border-stone-100 px-4 py-4">
        <Skeleton className="h-6 w-44" />
      </div>
      <div className="max-w-5xl mx-auto px-4 pt-4 space-y-4">
        <Skeleton className="h-4 w-48" />
        <Skeleton className="rounded-2xl" style={{ height: '50vh' }} />
        <Skeleton className="h-5 w-28" />
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-20 rounded-2xl" />
        ))}
      </div>
    </div>
  )
}
