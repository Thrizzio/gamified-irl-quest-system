import { useCallback, useEffect, useMemo, useState } from 'react'
import { saveSession } from '../lib/database'
import { useGeolocation } from './useGeolocation'

const ACTIVE_KEY = 'stridequest-active-session-v1'

function readActive() { try { return JSON.parse(localStorage.getItem(ACTIVE_KEY) || 'null') } catch { return null } }
function persistActive(session) { try { if (session) localStorage.setItem(ACTIVE_KEY, JSON.stringify(session)); else localStorage.removeItem(ACTIVE_KEY) } catch { /* optional */ } }

export function useExpedition() {
  const [session, setSession] = useState(readActive)
  const [now, setNow] = useState(Date.now())
  const tracking = Boolean(session?.status === 'active')
  const gps = useGeolocation(tracking, 100)

  useEffect(() => { if (!tracking) return undefined; const timer = window.setInterval(() => setNow(Date.now()), 1000); return () => window.clearInterval(timer) }, [tracking])
  useEffect(() => { if (!session) return; setSession((current) => current ? { ...current, distanceMeters: Math.max(current.distanceMeters || 0, gps.distance || 0), gpsSamples: gps.samples } : current) }, [gps.distance, gps.samples])
  useEffect(() => { persistActive(session) }, [session])

  const elapsedSeconds = useMemo(() => {
    if (!session) return 0
    const end = session.status === 'paused' || session.status === 'completed' ? session.updatedAt : now
    return Math.max(0, Math.floor((end - session.startedAt - (session.pausedDurationMs || 0)) / 1000))
  }, [now, session])

  const start = useCallback((expedition) => {
    const created = { id: `session-${Date.now()}`, expeditionId: expedition.id, title: expedition.title, startedAt: Date.now(), updatedAt: Date.now(), pausedAt: null, pausedDurationMs: 0, status: 'active', distanceMeters: 0, gpsSamples: 0, discoveries: [], bonusCount: 0 }
    setSession(created); return created
  }, [])
  const pause = useCallback(() => setSession((current) => current ? { ...current, status: 'paused', pausedAt: Date.now(), updatedAt: Date.now() } : current), [])
  const resume = useCallback(() => setSession((current) => current ? { ...current, status: 'active', pausedDurationMs: current.pausedDurationMs + (current.pausedAt ? Date.now() - current.pausedAt : 0), pausedAt: null, updatedAt: Date.now() } : current), [])
  const addDiscovery = useCallback((observationId, collectibleId) => setSession((current) => current ? { ...current, discoveries: [...new Set([...current.discoveries, collectibleId])], observationIds: [...(current.observationIds || []), observationId], updatedAt: Date.now() } : current), [])
  const finish = useCallback(async (status = 'completed', extras = {}) => {
    if (!session) return null
    const ended = { ...session, ...extras, status, endedAt: Date.now(), updatedAt: Date.now(), elapsedSeconds }
    await saveSession(ended)
    setSession(null); persistActive(null); return ended
  }, [elapsedSeconds, session])
  return { session, elapsedSeconds, gps, start, pause, resume, addDiscovery, finish }
}
