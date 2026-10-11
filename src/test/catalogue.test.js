import { describe, expect, it } from 'vitest'
import { collectibles } from '../data/collectibles'
import { expeditions } from '../data/expeditions'
import { validateCatalogueReferences } from '../lib/validation'

describe('catalogue integrity', () => {
  it('contains a rich catalogue and all expedition references resolve', () => {
    expect(collectibles.length).toBeGreaterThanOrEqual(30)
    expect(validateCatalogueReferences(expeditions, collectibles)).toEqual([])
  })
})
