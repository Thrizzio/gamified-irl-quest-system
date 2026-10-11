import { describe, expect, it } from 'vitest'
import { haversineDistance, shouldAcceptPosition } from '../lib/distance'

describe('distance', () => {
  it('calculates a known geographic distance', () => {
    expect(haversineDistance({ latitude: 0, longitude: 0 }, { latitude: 0, longitude: 1 })).toBeCloseTo(111195, -2)
  })
  it('rejects GPS drift below the movement threshold', () => {
    expect(shouldAcceptPosition({ latitude: 51.5, longitude: -0.1, accuracy: 10 }, { latitude: 51.50001, longitude: -0.1, accuracy: 10 })).toBe(false)
  })
})
