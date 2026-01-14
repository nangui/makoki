/**
 * Generators Index Tests
 * Tests for the unified generate function and generateProfile
 */

import { describe, it, expect, beforeEach } from 'vitest'
import { generate, generateBatch, generateProfile } from '../../../src/generators'
import { clearDataCache } from '../../../src/lib/data-loader'

describe('Unified Generator', () => {
  beforeEach(() => {
    clearDataCache()
  })

  describe('generate', () => {
    it('should generate a first name', async () => {
      const result = await generate({
        country: 'SN',
        dataType: 'firstname',
      })
      expect(typeof result).toBe('string')
      expect(result.length).toBeGreaterThan(0)
    })

    it('should generate a last name', async () => {
      const result = await generate({
        country: 'NG',
        dataType: 'lastname',
      })
      expect(typeof result).toBe('string')
      expect(result.length).toBeGreaterThan(0)
    })

    it('should generate a full name', async () => {
      const result = await generate({
        country: 'KE',
        dataType: 'name',
      })
      expect(result).toContain(' ') // Full name has space
    })

    it('should generate a phone number', async () => {
      const result = await generate({
        country: 'ZA',
        dataType: 'phone',
      })
      expect(result).toMatch(/^\+27/)
    })

    it('should generate an email', async () => {
      const result = await generate({
        country: 'EG',
        dataType: 'email',
      })
      expect(result).toMatch(/@/)
    })

    it('should generate a city', async () => {
      const result = await generate({
        country: 'CG',
        dataType: 'city',
      })
      expect(typeof result).toBe('string')
      expect(result.length).toBeGreaterThan(0)
    })

    it('should generate an address', async () => {
      const result = await generate({
        country: 'CD',
        dataType: 'address',
      })
      expect(typeof result).toBe('string')
      expect(result.length).toBeGreaterThan(0)
    })

    it('should respect gender preference for names', async () => {
      // Generate multiple names to verify gender is being used
      const results = await Promise.all([
        generate({ country: 'SN', dataType: 'name', gender: 'male' }),
        generate({ country: 'SN', dataType: 'name', gender: 'female' }),
      ])

      results.forEach(result => {
        expect(typeof result).toBe('string')
        expect(result.length).toBeGreaterThan(0)
      })
    })

    it('should throw error for unknown data type', async () => {
      await expect(
        generate({
          country: 'SN',
          // @ts-expect-error Testing invalid data type
          dataType: 'unknown',
        })
      ).rejects.toThrow()
    })
  })

  describe('generateBatch', () => {
    it('should generate multiple items', async () => {
      const results = await generateBatch({ country: 'SN', dataType: 'firstname' }, 5)
      expect(results).toHaveLength(5)
      results.forEach(result => {
        expect(typeof result).toBe('string')
        expect(result.length).toBeGreaterThan(0)
      })
    })

    it('should generate unique items (with high probability)', async () => {
      const results = await generateBatch({ country: 'SN', dataType: 'phone' }, 10)
      const uniqueResults = new Set(results)
      // Most should be unique (allowing for some collisions in small datasets)
      expect(uniqueResults.size).toBeGreaterThan(5)
    })
  })

  describe('generateProfile', () => {
    it('should generate a complete profile for Senegal', async () => {
      const profile = await generateProfile('SN')

      expect(profile).toHaveProperty('firstName')
      expect(profile).toHaveProperty('lastName')
      expect(profile).toHaveProperty('fullName')
      expect(profile).toHaveProperty('phone')
      expect(profile).toHaveProperty('email')
      expect(profile).toHaveProperty('address')
      expect(profile).toHaveProperty('city')
      expect(profile).toHaveProperty('region')
      expect(profile).toHaveProperty('country')

      expect(profile.country).toBe('SN')
      expect(profile.phone).toMatch(/^\+221/)
      expect(profile.email).toMatch(/@/)
      expect(profile.fullName).toContain(profile.firstName)
      expect(profile.fullName).toContain(profile.lastName)
    })

    it('should generate profiles for all countries', async () => {
      const countries = ['SN', 'NG', 'KE', 'ZA', 'EG', 'CG', 'CD'] as const

      for (const country of countries) {
        const profile = await generateProfile(country)
        expect(profile.country).toBe(country)
        expect(profile.firstName.length).toBeGreaterThan(0)
        expect(profile.lastName.length).toBeGreaterThan(0)
        expect(profile.phone.length).toBeGreaterThan(0)
        expect(profile.email).toMatch(/@/)
      }
    })

    it('should respect gender preference', async () => {
      const maleProfile = await generateProfile('NG', 'male')
      const femaleProfile = await generateProfile('NG', 'female')

      expect(maleProfile.firstName).toBeTruthy()
      expect(femaleProfile.firstName).toBeTruthy()
    })
  })
})
