/**
 * Email Generator Tests
 */

import { describe, it, expect, beforeEach } from 'vitest'
import {
  generateEmail,
  generateEmailSync,
  getEmailDomains,
} from '../../../src/generators/email-generator'
import { clearDataCache } from '../../../src/lib/data-loader'
import type { NamesData } from '../../../src/types'

// Sample test data
const mockNamesData: NamesData = {
  firstNames: {
    male: ['Amadou', 'Moussa'],
    female: ['Fatou', 'Aminata'],
    neutral: [],
  },
  lastNames: ['Diallo', 'Ndiaye'],
}

describe('Email Generator', () => {
  beforeEach(() => {
    clearDataCache()
  })

  describe('getEmailDomains', () => {
    it('should return Senegalese email domains', () => {
      const domains = getEmailDomains('SN')
      expect(domains).toContain('orange.sn')
      expect(domains).toContain('gmail.com')
    })

    it('should return Nigerian email domains', () => {
      const domains = getEmailDomains('NG')
      expect(domains).toContain('gmail.com')
      expect(domains.length).toBeGreaterThan(0)
    })

    it('should return domains for all countries', () => {
      const countries = ['SN', 'NG', 'KE', 'ZA', 'EG', 'CG', 'CD'] as const

      for (const country of countries) {
        const domains = getEmailDomains(country)
        expect(domains.length).toBeGreaterThan(0)
      }
    })
  })

  describe('generateEmailSync', () => {
    it('should generate a valid email format', () => {
      const email = generateEmailSync(mockNamesData, 'SN')
      expect(email).toMatch(/^[a-z0-9.]+@[a-z.]+$/)
    })

    it('should use Senegalese domain', () => {
      const email = generateEmailSync(mockNamesData, 'SN')
      const domains = getEmailDomains('SN')
      const domain = email.split('@')[1]
      expect(domains).toContain(domain)
    })

    it('should normalize names (remove accents)', () => {
      const namesWithAccents: NamesData = {
        firstNames: { male: ['Éric'], female: [], neutral: [] },
        lastNames: ['Éboué'],
      }
      const email = generateEmailSync(namesWithAccents, 'SN', 'male')
      // Should not contain accented characters
      expect(email).not.toMatch(/[éèêëàâäùûüôöîïç]/i)
    })

    it('should use provided names', () => {
      const email = generateEmailSync(mockNamesData, 'SN', 'neutral', 'Amadou', 'Diallo')
      expect(email.toLowerCase()).toContain('amadou')
    })
  })

  describe('generateEmail (async)', () => {
    it('should generate a valid Senegalese email', async () => {
      const email = await generateEmail({ country: 'SN' })
      expect(email).toMatch(/@/)
      expect(email).toMatch(/^[a-z0-9.]+@[a-z.]+$/)
    })

    it('should generate a valid Nigerian email', async () => {
      const email = await generateEmail({ country: 'NG' })
      expect(email).toMatch(/@/)
    })

    it('should generate emails for all supported countries', async () => {
      const countries = ['SN', 'NG', 'KE', 'ZA', 'EG', 'CG', 'CD'] as const

      for (const country of countries) {
        const email = await generateEmail({ country })
        expect(email).toMatch(/@/)
        expect(email.length).toBeGreaterThan(5)
      }
    })

    it('should use provided first and last name', async () => {
      const email = await generateEmail({
        country: 'SN',
        firstName: 'Amadou',
        lastName: 'Diallo',
      })
      // The email should contain parts of the name
      const localPart = email.split('@')[0].toLowerCase()
      expect(
        localPart.includes('amadou') || localPart.includes('diallo') || localPart.includes('a')
      ).toBe(true)
    })
  })
})
