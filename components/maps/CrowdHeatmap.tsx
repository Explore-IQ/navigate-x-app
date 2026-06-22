'use client'

import { useEffect, useRef, useCallback } from 'react'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import type { TrafficPoint } from '@/lib/mock-traffic'

interface Props {
  points: TrafficPoint[]
  center?: [number, number]
  zoom?: number
  className?: string
}

const SOURCE_ID = 'crowd-heatmap'
const LAYER_ID = 'heatmap-layer'

export default function CrowdHeatmap({
  points,
  center = [78.9629, 20.5937],
  zoom = 4.5,
  className = 'w-full h-full min-h-[400px]',
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<maplibregl.Map | null>(null)

  const buildGeoJSON = useCallback(
    (pts: TrafficPoint[]): GeoJSON.FeatureCollection => ({
      type: 'FeatureCollection',
      features: pts.map((p) => ({
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [p.lng, p.lat] },
        properties: { density: p.density },
      })),
    }),
    [],
  )

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

    map.on('load', () => {
      mapRef.current = map

      map.addSource(SOURCE_ID, {
        type: 'geojson',
        data: buildGeoJSON(points),
      })

      map.addLayer({
        id: LAYER_ID,
        type: 'heatmap',
        source: SOURCE_ID,
        paint: {
          'heatmap-weight': ['interpolate', ['linear'], ['get', 'density'], 0, 0, 1, 1],
          'heatmap-intensity': ['interpolate', ['linear'], ['zoom'], 0, 1, 9, 3],
          'heatmap-color': [
            'interpolate',
            ['linear'],
            ['heatmap-density'],
            0, 'rgba(79,138,101,0)',
            0.3, 'rgba(79,138,101,0.6)',
            0.6, 'rgba(235,168,107,0.8)',
            1, 'rgba(224,92,92,1)',
          ],
          'heatmap-radius': ['interpolate', ['linear'], ['zoom'], 0, 20, 9, 60],
          'heatmap-opacity': 0.75,
        },
      })
    })

    return () => {
      map.remove()
      mapRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const map = mapRef.current
    if (!map || !map.isStyleLoaded()) return
    const src = map.getSource(SOURCE_ID) as maplibregl.GeoJSONSource | undefined
    src?.setData(buildGeoJSON(points))
  }, [points, buildGeoJSON])

  return (
    <div
      ref={containerRef}
      className={className}
      role="application"
      aria-label="Crowd density heatmap"
    />
  )
}
