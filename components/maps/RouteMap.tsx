'use client'

import { useEffect, useRef } from 'react'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'

interface Props {
  waypoints: [number, number][]
  className?: string
}

const SOURCE_ID = 'route-line'
const LAYER_ID = 'route-layer'

export default function RouteMap({ waypoints, className = 'w-full h-full min-h-[400px]' }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<maplibregl.Map | null>(null)

  const center: [number, number] = waypoints.length
    ? [
        waypoints.reduce((s, p) => s + p[0], 0) / waypoints.length,
        waypoints.reduce((s, p) => s + p[1], 0) / waypoints.length,
      ]
    : [78.9629, 20.5937]

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: 'https://demotiles.maplibre.org/style.json',
      center,
      zoom: 5,
      attributionControl: false,
    })

    map.addControl(new maplibregl.NavigationControl(), 'top-right')

    map.on('load', () => {
      mapRef.current = map

      map.addSource(SOURCE_ID, {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: { type: 'LineString', coordinates: waypoints.map(([lng, lat]) => [lng, lat]) },
          properties: {},
        },
      })

      map.addLayer({
        id: LAYER_ID,
        type: 'line',
        source: SOURCE_ID,
        paint: {
          'line-color': '#6CB6E4',
          'line-width': 3,
          'line-dasharray': [2, 1],
        },
      })

      waypoints.forEach(([lng, lat], i) => {
        const el = document.createElement('div')
        el.style.cssText = `
          width:24px;height:24px;border-radius:50%;background:#6CB6E4;
          border:2px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.25);
          display:flex;align-items:center;justify-content:center;
          font-size:11px;font-weight:700;color:white;
        `
        el.textContent = String(i + 1)
        new maplibregl.Marker({ element: el }).setLngLat([lng, lat]).addTo(map)
      })
    })

    return () => {
      map.remove()
      mapRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div ref={containerRef} className={className} role="application" aria-label="Route map" />
  )
}
