import { useCallback, useEffect, useRef, useState } from 'react'
import { haversineDistance, shouldAcceptPosition } from '../lib/distance'

export function useGeolocation(active, maxAccuracy = 100) {
  const [state, setState] = useState({ supported: 'geolocation' in navigator, permission: 'prompt', distance: 0, lastPosition: null, error: null, samples: 0 })
  const previousRef = useRef(null)
  const watchRef = useRef(null)

  const stop = useCallback(() => { if (watchRef.current !== null && navigator.geolocation) navigator.geolocation.clearWatch(watchRef.current); watchRef.current = null }, [])

  useEffect(() => {
    if (!active || !('geolocation' in navigator)) return undefined
    setState((current) => ({ ...current, permission: 'requesting', error: null }))
    watchRef.current = navigator.geolocation.watchPosition((position) => {
      const next = { latitude: position.coords.latitude, longitude: position.coords.longitude, accuracy: position.coords.accuracy, timestamp: position.timestamp }
      setState((current) => {
        const accepted = shouldAcceptPosition(previousRef.current, next, { maxAccuracy })
        if (accepted && previousRef.current) current = { ...current, distance: current.distance + haversineDistance(previousRef.current, next), samples: current.samples + 1 }
        if (accepted) previousRef.current = next
        return { ...current, permission: 'granted', lastPosition: next, error: null }
      })
    }, (error) => setState((current) => ({ ...current, permission: error.code === 1 ? 'denied' : 'unavailable', error: error.message })), { enableHighAccuracy: true, maximumAge: 10000, timeout: 15000 })
    return stop
  }, [active, maxAccuracy, stop])

  useEffect(() => () => stop(), [stop])
  return { ...state, stop }
}
