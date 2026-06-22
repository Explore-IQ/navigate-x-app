import { notFound } from 'next/navigation'
import { getPlaceById, PLACES } from '@/lib/mock-places'
import { PlaceDetail } from '@/components/places/PlaceDetail'

export const revalidate = 3600

export async function generateStaticParams() {
  return PLACES.map((p) => ({ placeId: p.id }))
}

export async function generateMetadata(props: PageProps<'/discover/[placeId]'>) {
  const { placeId } = await props.params
  const place = getPlaceById(placeId)
  if (!place) return {}
  return {
    title: `${place.name} — TourIndia`,
    description: place.shortDescription,
  }
}

export default async function PlaceDetailPage(props: PageProps<'/discover/[placeId]'>) {
  const { placeId } = await props.params
  const place = getPlaceById(placeId)
  if (!place) notFound()
  return <PlaceDetail place={place} />
}
