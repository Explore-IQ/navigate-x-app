import { Skeleton } from '@/components/ui/skeleton'

export default function QueueDetailLoading() {
  return (
    <div className="min-h-screen bg-[#F7FAFB] pb-24">
      <Skeleton className="h-56 w-full" />
      <div className="max-w-2xl mx-auto px-4 pt-8 space-y-6">
        <div className="bg-white rounded-2xl p-6 flex gap-6">
          <Skeleton className="w-36 h-36 rounded-full shrink-0" />
          <div className="flex-1 space-y-3">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-9 w-36 rounded-full" />
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 space-y-4">
          <Skeleton className="h-5 w-40" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {Array.from({ length: 8 }).map((_, i) => <Skeleton key={i} className="h-16 rounded-xl" />)}
          </div>
        </div>
      </div>
    </div>
  )
}
