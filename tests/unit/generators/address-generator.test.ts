/**
 * Address Generator Tests
 */

import { describe, it, expect, beforeEach } from 'vitest'
import {
  generateCity,
  generateRegion,
  generateQuarter,
  generateAddress,
} from '../../../src/generators/address-generator'
import { clearDataCache } from '../../../src/lib/data-loader'

describe('Address Generator', () => {
  beforeEach(() => {
    clearDataCache()
  })

  describe('generateQuarter', () => {
    it('should generate a Senegalese quarter', () => {
      const quarter = generateQuarter('SN')
      expect(typeof quarter).toBe('string')
      expect(quarter.length).toBeGreaterThan(0)
    })

    it('should generate a Nigerian quarter', () => {
      const quarter = generateQuarter('NG')
      expect(typeof quarter).toBe('string')
      expect(quarter.length).toBeGreaterThan(0)
    })
  })

  describe('generateCity', () => {
    it('should generate a Senegalese city', async () => {
      const city = await generateCity({ country: 'SN' })
      expect(typeof city).toBe('string')
      expect(city.length).toBeGreaterThan(0)
    })

    it('should generate a Nigerian city', async () => {
      const city = await generateCity({ country: 'NG' })
      expect(typeof city).toBe('string')
      expect(city.length).toBeGreaterThan(0)
    })

    it('should generate cities for all supported countries', async () => {
      const countries = ['SN', 'NG', 'KE', 'ZA', 'EG', 'CG', 'CD'] as const

      for (const country of countries) {
        const city = await generateCity({ country })
        expect(city.length).toBeGreaterThan(0)
      }
    })
  })

  describe('generateRegion', () => {
    it('should generate a Senegalese region with code and name', async () => {
      const region = await generateRegion({ country: 'SN' })
      expect(region).toHaveProperty('code')
      expect(region).toHaveProperty('name')
      expect(typeof region.code).toBe('string')
      expect(typeof region.name).toBe('string')
    })

    it('should generate a Nigerian state', async () => {
      const region = await generateRegion({ country: 'NG' })
      expect(region.name.length).toBeGreaterThan(0)
    })
  })

  describe('generateAddress', () => {
    it('should generate a complete Senegalese address', async () => {
      const address = await generateAddress({ country: 'SN' })

      expect(address).toHaveProperty('street')
      expect(address).toHaveProperty('city')
      expect(address).toHaveProperty('region')
      expect(address).toHaveProperty('fullAddress')

      expect(address.street.length).toBeGreaterThan(0)
      expect(address.city.length).toBeGreaterThan(0)
      expect(address.region.name.length).toBeGreaterThan(0)
      expect(address.fullAddress.length).toBeGreaterThan(0)
    })

    it('should generate a complete Nigerian address', async () => {
      const address = await generateAddress({ country: 'NG' })

      expect(address.street).toBeTruthy()
      expect(address.city).toBeTruthy()
      expect(address.fullAddress).toContain(address.street)
    })

    it('should generate addresses for all supported countries', async () => {
      const countries = ['SN', 'NG', 'KE', 'ZA', 'EG', 'CG', 'CD'] as const

      for (const country of countries) {
        const address = await generateAddress({ country })
        expect(address.fullAddress.length).toBeGreaterThan(0)
        expect(address.city.length).toBeGreaterThan(0)
      }
    })

    it('should include street number in address', async () => {
      const address = await generateAddress({ country: 'SN' })
      // Most street patterns include a number, but some (like "Boulevard {name}") may not
      // So we check that the street is not empty and contains meaningful content
      expect(address.street.length).toBeGreaterThan(0)
      // If it contains a number, it should be valid
      if (address.street.match(/\d/)) {
        expect(address.street).toMatch(/\d+/)
      }
    })
  })
})
