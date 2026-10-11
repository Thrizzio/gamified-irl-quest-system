const PREFERENCES_KEY = 'stridequest-preferences-v1'
const defaults = { theme: 'light', demoMode: false, maxGpsAccuracy: 100, reducedMotion: false }

export function loadPreferences() {
  try { return { ...defaults, ...JSON.parse(localStorage.getItem(PREFERENCES_KEY) || '{}') } } catch { return defaults }
}

export function savePreferences(preferences) {
  try { localStorage.setItem(PREFERENCES_KEY, JSON.stringify({ ...defaults, ...preferences })) } catch { /* localStorage can be unavailable */ }
}

export { defaults as preferenceDefaults }
