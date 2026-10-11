import { describe, expect, it } from 'vitest'
import { calculateObservationXp, getLevelFromXp, getLevelProgress } from '../lib/progression'

describe('progression', () => {
  it('calculates deterministic levels and progress', () => {
    expect(getLevelFromXp(0)).toBe(1)
    expect(getLevelFromXp(250)).toBe(2)
    expect(getLevelProgress(375)).toMatchObject({ level: 2, current: 125, percent: 50 })
  })
  it('does not duplicate first-discovery reward for repeat sightings', () => {
    const collectible = { baseXp: 40 }
    expect(calculateObservationXp(collectible, true, true)).toBe(50)
    expect(calculateObservationXp(collectible, false, true)).toBe(18)
  })
})
