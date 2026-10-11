const EARTH_RADIUS_METERS = 6371000

export function isValidPosition(position, options = {}) {
  const { maxAccuracy = 100, maxLatitude = 90 } = options
  return Boolean(position && Number.isFinite(position.latitude) && Number.isFinite(position.longitude) && Math.abs(position.latitude) <= maxLatitude && Math.abs(position.longitude) <= 180 && (!Number.isFinite(position.accuracy) || position.accuracy <= maxAccuracy))
}

export function haversineDistance(a, b) {
  if (!a || !b) return 0
  const toRadians = (value) => (value * Math.PI) / 180
  const latitudeDelta = toRadians(b.latitude - a.latitude)
  const longitudeDelta = toRadians(b.longitude - a.longitude)
  const latitudeA = toRadians(a.latitude)
  const latitudeB = toRadians(b.latitude)
  const term = Math.sin(latitudeDelta / 2) ** 2 + Math.cos(latitudeA) * Math.cos(latitudeB) * Math.sin(longitudeDelta / 2) ** 2
  return 2 * EARTH_RADIUS_METERS * Math.atan2(Math.sqrt(term), Math.sqrt(1 - term))
}

export function shouldAcceptPosition(previous, next, options = {}) {
  const { minMovementMeters = 8, maxAccuracy = 100 } = options
  if (!isValidPosition(next, { maxAccuracy }) || !previous) return isValidPosition(next, { maxAccuracy })
  return haversineDistance(previous, next) >= Math.max(minMovementMeters, (next.accuracy || 0) * 0.25)
}

export function formatDistance(meters) {
  if (!Number.isFinite(meters) || meters <= 0) return '—'
  return meters < 1000 ? `${Math.round(meters)} m` : `${(meters / 1000).toFixed(2)} km`
}
