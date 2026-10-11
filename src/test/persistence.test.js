import { describe, expect, it } from 'vitest'
import { isValidBackup } from '../lib/validation'

describe('persistence validation', () => {
  it('accepts only versioned backups with expected stores', () => {
    expect(isValidBackup({ version: 1, data: { observations: [], sessions: [] } })).toBe(true)
    expect(isValidBackup({ version: 2, data: { observations: [], sessions: [] } })).toBe(false)
  })
})
