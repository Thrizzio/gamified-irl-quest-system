import { useCallback, useEffect, useState } from 'react'

export function usePersistentState(key, initialValue) {
  const [value, setValue] = useState(() => {
    try { const stored = localStorage.getItem(key); return stored ? JSON.parse(stored) : initialValue } catch { return initialValue }
  })
  useEffect(() => { try { localStorage.setItem(key, JSON.stringify(value)) } catch { /* storage is optional */ } }, [key, value])
  const update = useCallback((next) => setValue((current) => typeof next === 'function' ? next(current) : next), [])
  return [value, update]
}
