export const XP_PER_LEVEL = 250

export function getLevelFromXp(xp = 0) {
  return Math.max(1, Math.floor(Math.max(0, xp) / XP_PER_LEVEL) + 1)
}

export function getLevelProgress(xp = 0) {
  const safeXp = Math.max(0, xp)
  const level = getLevelFromXp(safeXp)
  const currentFloor = (level - 1) * XP_PER_LEVEL
  return { level, current: safeXp - currentFloor, needed: XP_PER_LEVEL, percent: Math.min(100, Math.round(((safeXp - currentFloor) / XP_PER_LEVEL) * 100)) }
}

export function calculateObservationXp(collectible, isFirstDiscovery, verified = false) {
  if (!collectible) return 0
  return (isFirstDiscovery ? collectible.baseXp : Math.ceil(collectible.baseXp * 0.2)) + (verified ? 10 : 0)
}

export function calculateExpeditionXp(expedition, uniqueCount, bonusCount, verifiedCount = 0) {
  if (!expedition) return 0
  return expedition.completionXp + uniqueCount * 10 + bonusCount * 15 + verifiedCount * 5
}

export function deriveProgressSummary({ observations = [], completedExpeditions = [], unlockedAchievements = [] } = {}) {
  const uniqueIds = [...new Set(observations.map((observation) => observation.collectibleId))]
  const categoryCounts = observations.reduce((result, observation) => {
    if (observation.isFirstDiscovery && observation.category) result[observation.category] = (result[observation.category] || 0) + 1
    return result
  }, {})
  return { uniqueDiscoveries: uniqueIds.length, completedExpeditions: completedExpeditions.length, aiVerifications: observations.filter((o) => o.verificationStatus === 'verified').length, categoryCounts, unlockedAchievements }
}

export function getNewAchievements(summary, alreadyUnlocked = []) {
  return summary && alreadyUnlocked ? summary : []
}
