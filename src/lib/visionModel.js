import { env, pipeline } from '@huggingface/transformers'

export const VISION_MODEL_ID = 'onnx-community/mobilenetv4_conv_small.e2400_r224_in1k'
export const VISION_MODEL_LICENSE = 'Model repository metadata should be checked before redistribution; Transformers.js is Apache-2.0.'

env.allowLocalModels = true
env.allowRemoteModels = true

let classifierPromise

export async function loadVisionClassifier(onProgress) {
  if (!classifierPromise) {
    classifierPromise = pipeline('image-classification', VISION_MODEL_ID, {
      device: typeof navigator !== 'undefined' && 'gpu' in navigator ? 'webgpu' : 'wasm',
      progress_callback: onProgress
    }).catch((error) => { classifierPromise = undefined; throw error })
  }
  return classifierPromise
}

export async function classifyImage(image, onProgress) {
  const classifier = await loadVisionClassifier(onProgress)
  return classifier(image, { top_k: 5 })
}

export function resetVisionClassifier() { classifierPromise = undefined }

export function normalizeLabel(label) { return String(label || '').toLowerCase().replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim() }

export function matchPredictionsToObjective(predictions, objective, collectiblesById, threshold = 0.35) {
  const allowed = objective.collectibleIds.flatMap((id) => collectiblesById[id]?.modelLabels || []).map(normalizeLabel)
  const ranked = (predictions || []).map((prediction) => ({ ...prediction, normalizedLabel: normalizeLabel(prediction.label), score: Number(prediction.score) || 0 }))
  const matched = ranked.find((prediction) => allowed.some((label) => prediction.normalizedLabel.includes(label) || label.includes(prediction.normalizedLabel)) && prediction.score >= threshold)
  return { matched: Boolean(matched), matchedPrediction: matched || null, predictions: ranked }
}

export function getVisionStatus({ available = false, loading = false, error = null, demoMode = false } = {}) {
  if (demoMode) return { label: 'Demo mode', tone: 'warning', detail: 'Simulated results are clearly marked and never count as AI verification.' }
  if (loading) return { label: 'Preparing local model', tone: 'loading', detail: 'The first model download needs a connection and may take a moment.' }
  if (error) return { label: 'Model unavailable', tone: 'error', detail: 'Manual observations remain available. No image leaves this device.' }
  if (available) return { label: 'Local AI ready', tone: 'success', detail: 'Inference runs in this browser after the model is cached.' }
  return { label: 'Local AI not loaded', tone: 'neutral', detail: 'Load the optional model when you are ready to verify a discovery.' }
}
