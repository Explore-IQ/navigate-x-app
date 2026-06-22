'use client'

import { useEffect, useRef } from 'react'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'

export interface MapMarker {
  id: string
  lat: number
  lng: number
  label: string
  color?: string
  onClick?: () => void
}

interface Props {
  center?: [number, number]
  zoom?: number
  markers?: MapMarker[]
  className?: string
  onMapReady?: (map: maplibregl.Map) => void
}

export default function TourismMap({
  center = [78.9629, 20.5937],
  zoom = 4.5,
  markers = [],
  className = 'w-full h-full min-h-[400px]',
  onMapReady,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<maplibregl.Map | null>(null)
  const markerRefs = useRef<maplibregl.Marker[]>([])

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: 'https://demotiles.maplibre.org/style.json',
      center,
      zoom,
      attributionControl: false,
    })

    map.addControl(new maplibregl.NavigationControl(), 'top-right')
    map.addControl(
      new maplibregl.AttributionControl({ compact: true }),
      'bottom-right',
    )

    map.on('load', () => {
      mapRef.current = map
      onMapReady?.(map)
    })

    return () => {
      markerRefs.current.forEach((m) => m.remove())
      markerRefs.current = []
      map.remove()
      mapRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const map = mapRef.current
    if (!map) return

    markerRefs.current.forEach((m) => m.remove())
    markerRefs.current = []

    markers.forEach((m) => {
      const el = document.createElement('div')
      el.style.cssText = `
        width: 28px; height: 28px; border-radius: 50% 50% 50% 0;
        background: ${m.color ?? '#6CB6E4'}; border: 2px solid white;
        box-shadow: 0 2px 6px rgba(0,0,0,0.25); transform: rotate(-45deg);
        cursor: pointer;
      `
      el.setAttribute('aria-label', m.label)

      const marker = new maplibregl.Marker({ element: el })
        .setLngLat([m.lng, m.lat])
        .setPopup(
          new maplibregl.Popup({ offset: 25 }).setHTML(
            `<p style="font-size:13px;font-weight:600;color:#3E4A4F;margin:0">${m.label}</p>`,
          ),
        )
        .addTo(map)

      if (m.onClick) el.addEventListener('click', m.onClick)
      markerRefs.current.push(marker)
    })
  }, [markers])

  return <div ref={containerRef} className={className} role="application" aria-label="Tourism map" />
}
