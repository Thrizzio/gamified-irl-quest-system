import { useCallback, useState } from 'react'
import { classifyImage, getVisionStatus, loadVisionClassifier, matchPredictionsToObjective } from '../lib/visionModel'

export function useVisionModel({ demoMode = false } = {}) {
  const [state, setState] = useState({ loading: false, available: false, error: null, progress: 0 })
  const preload = useCallback(async () => {
    if (demoMode || state.available || state.loading) return
    setState((current) => ({ ...current, loading: true, error: null }))
    try {
      await loadVisionClassifier((event) => setState((current) => ({ ...current, progress: Math.round((event?.progress || 0) * 100) })))
      setState({ loading: false, available: true, error: null, progress: 100 })
    } catch (error) { setState((current) => ({ ...current, loading: false, error: error instanceof Error ? error.message : 'Unable to load model' })) }
  }, [demoMode, state.available, state.loading])

  const verify = useCallback(async (image, objective, collectiblesById) => {
    if (demoMode) return { ...matchPredictionsToObjective([{ label: objective.collectibleIds[0], score: 0.91 }], objective, collectiblesById, 0.35), demo: true }
    setState((current) => ({ ...current, loading: true, error: null }))
    try {
      const predictions = await classifyImage(image, (event) => setState((current) => ({ ...current, progress: Math.round((event?.progress || 0) * 100) })))
      const result = matchPredictionsToObjective(predictions, objective, collectiblesById)
      setState({ loading: false, available: true, error: null, progress: 100 })
      return result
    } catch (error) {
      setState((current) => ({ ...current, loading: false, error: error instanceof Error ? error.message : 'Inference failed' }))
      throw error
    }
  }, [demoMode])

  return { ...state, status: getVisionStatus({ ...state, demoMode }), preload, verify }
}
