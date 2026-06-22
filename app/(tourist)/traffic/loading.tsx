import { Skeleton } from '@/components/ui/skeleton'

export default function TrafficLoading() {
  return (
    <div className="min-h-screen bg-[#F7FAFB] pb-24">
      <div className="bg-white border-b border-stone-100 px-4 py-4">
        <Skeleton className="h-6 w-32" />
      </div>
      <div className="max-w-6xl mx-auto px-4 pt-4 lg:flex lg:gap-6">
        <Skeleton className="lg:flex-1 rounded-2xl" style={{ height: '60vh' }} />
        <div className="mt-4 lg:mt-0 lg:w-72 space-y-4">
          <Skeleton className="h-32 rounded-2xl" />
          <Skeleton className="h-64 rounded-2xl" />
        </div>
      </div>
    </div>
  )
}
