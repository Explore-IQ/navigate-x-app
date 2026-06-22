'use client'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Star, MapPin, Clock, Banknote, Calendar, Timer, ChevronLeft, Users } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { PlaceGallery } from './PlaceGallery'
import { cn } from '@/lib/utils'
import type { Place } from '@/lib/mock-places'

const CROWD_CONFIG: Record<Place['crowdLevel'], { label: string; color: string; dot: string }> = {
  low: { label: 'Low Crowd', color: 'text-[#4F8A65] bg-[#4F8A65]/10', dot: 'bg-[#4F8A65]' },
  moderate: { label: 'Moderate Crowd', color: 'text-[#EBA86B] bg-[#EBA86B]/10', dot: 'bg-[#EBA86B]' },
  high: { label: 'High Crowd', color: 'text-[#E8445A] bg-[#E8445A]/10', dot: 'bg-[#E8445A]' },
}

interface PlaceDetailProps {
  place: Place
}

export function PlaceDetail({ place }: PlaceDetailProps) {
  const crowd = CROWD_CONFIG[place.crowdLevel]

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }}>
      {/* Hero */}
      <div className="relative h-64 md:h-[420px]">
        <Image
          src={place.imageUrl}
          alt={place.name}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

        {/* Back */}
        <div className="absolute top-4 left-4">
          <Link
            href="/discover"
            aria-label="Back to Discover"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-white/15 backdrop-blur-sm text-white text-sm hover:bg-white/25 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" aria-hidden />
            Discover
          </Link>
        </div>

        {/* Rating chip */}
        <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-2 rounded-full bg-white/15 backdrop-blur-sm text-white text-sm">
          <Star className="w-3.5 h-3.5 fill-[#EBA86B] text-[#EBA86B]" aria-hidden />
          <span className="font-semibold">{place.rating}</span>
          <span className="text-white/65 text-xs">({place.reviewCount.toLocaleString()})</span>
        </div>

        {/* Category chip */}
        <div className="absolute bottom-4 left-4">
          <span className="px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-sm text-white text-xs font-semibold capitalize">
            {place.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="py-6 border-b border-[#3E4A4F]/10">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="font-[family-name:var(--font-poppins)] font-bold text-[#3E4A4F] text-2xl md:text-3xl mb-2 leading-tight">
                {place.name}
              </h1>
              <div className="flex flex-wrap items-center gap-2">
                <span className="flex items-center gap-1 text-sm text-[#3E4A4F]/55">
                  <MapPin className="w-3.5 h-3.5" aria-hidden />
                  {place.location}, {place.state}
                </span>
                <span className={cn('flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full font-medium', crowd.color)}>
                  <span className={cn('w-2 h-2 rounded-full', crowd.dot)} aria-hidden />
                  {crowd.label}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              {place.queueEnabled && (
                <Button
                  asChild
                  className="bg-[#4F8A65] hover:bg-[#4F8A65]/90 text-white border-0 rounded-full shadow-sm"
                >
                  <Link href={`/queues/${place.id}`} aria-label={`Book queue slot for ${place.name}`}>
                    Book Queue Slot
                  </Link>
                </Button>
              )}
              <Button
                asChild
                variant="outline"
                className="border-[#3E4A4F]/20 text-[#3E4A4F] rounded-full hover:bg-[#3E4A4F]/5"
              >
                <Link href={`/trips/new?place=${place.id}`} aria-label={`Add ${place.name} to a trip`}>
                  Add to Trip
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="py-6">
          <TabsList className="bg-[#F7FAFB] rounded-full p-1 mb-6 h-auto">
            <TabsTrigger
              value="overview"
              className="rounded-full text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm px-5 py-2"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="gallery"
              className="rounded-full text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm px-5 py-2"
            >
              Gallery
            </TabsTrigger>
            <TabsTrigger
              value="info"
              className="rounded-full text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm px-5 py-2"
            >
              Visit Info
            </TabsTrigger>
          </TabsList>

          {/* Overview */}
          <TabsContent value="overview" className="space-y-6">
            <p className="text-[#3E4A4F]/75 leading-relaxed text-base">{place.description}</p>

            {/* Quick info grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {(
                [
                  { icon: Clock, label: 'Hours', value: place.openHours },
                  {
                    icon: Banknote,
                    label: 'Entry Fee',
                    value: place.entryFee === null ? 'Free Entry' : `₹${place.entryFee}`,
                  },
                  { icon: Calendar, label: 'Best Season', value: place.bestSeason },
                  { icon: Timer, label: 'Duration', value: place.duration },
                ] as const
              ).map(({ icon: Icon, label, value }) => (
                <div key={label} className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Icon className="w-4 h-4 text-[#6CB6E4]" aria-hidden />
                    <span className="text-xs text-[#3E4A4F]/45 font-medium uppercase tracking-wider">
                      {label}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-[#3E4A4F] leading-snug">{value}</p>
                </div>
              ))}
            </div>

            {/* Tags */}
            <div>
              <h3 className="text-xs font-semibold text-[#3E4A4F]/45 uppercase tracking-wider mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {place.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-sm bg-[#6CB6E4]/10 text-[#6CB6E4] font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Gallery */}
          <TabsContent value="gallery">
            <PlaceGallery images={place.gallery} placeName={place.name} />
          </TabsContent>

          {/* Visit Info */}
          <TabsContent value="info" className="space-y-4">
            <div className="bg-white rounded-xl p-6 shadow-sm space-y-4">
              <h3 className="font-[family-name:var(--font-poppins)] font-bold text-[#3E4A4F]">
                How to Get There
              </h3>
              <p className="text-sm text-[#3E4A4F]/65 leading-relaxed">
                Interactive map coming in Phase 3 with MapLibre integration. Coordinates below can be
                used with any maps app.
              </p>
              <div className="flex items-center gap-2 text-sm text-[#3E4A4F]/55">
                <MapPin className="w-4 h-4 shrink-0" aria-hidden />
                <span>
                  {place.location}, {place.state}
                </span>
              </div>
              <p className="text-xs text-[#3E4A4F]/40 font-mono">
                {place.coordinates.lat.toFixed(4)}° N, {place.coordinates.lng.toFixed(4)}° E
              </p>
            </div>

            {place.queueEnabled && (
              <div className="bg-[#4F8A65]/5 border border-[#4F8A65]/20 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Users className="w-5 h-5 text-[#4F8A65]" aria-hidden />
                  <h3 className="font-semibold text-[#3E4A4F]">Queue Booking Available</h3>
                </div>
                <p className="text-sm text-[#3E4A4F]/65 mb-4">
                  Skip the wait — book your entry time slot in advance. Limited slots are available
                  each day to manage crowd levels.
                </p>
                <Button
                  asChild
                  className="bg-[#4F8A65] hover:bg-[#4F8A65]/90 text-white border-0 rounded-full"
                >
                  <Link href={`/queues/${place.id}`}>Book Queue Slot</Link>
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </motion.div>
  )
}
