/**
 * Name Generator Tests
 */

import { describe, it, expect, beforeEach } from 'vitest'
import {
  generateFirstName,
  generateLastName,
  generateFullName,
  generateFirstNameSync,
  generateLastNameSync,
  generateFullNameSync,
} from '../../../src/generators/name-generator'
import { clearDataCache } from '../../../src/lib/data-loader'
import type { NamesData } from '../../../src/types'

// Sample test data
const mockNamesData: NamesData = {
  firstNames: {
    male: ['Amadou', 'Moussa', 'Ibrahima'],
    female: ['Fatou', 'Aminata', 'Mariama'],
    neutral: ['Samba'],
  },
  lastNames: ['Diallo', 'Ndiaye', 'Fall', 'Sow'],
}

describe('Name Generator', () => {
  beforeEach(() => {
    clearDataCache()
  })

  describe('generateFirstNameSync', () => {
    it('should generate a male first name', () => {
      const name = generateFirstNameSync(mockNamesData, 'male')
      expect(mockNamesData.firstNames.male).toContain(name)
    })

    it('should generate a female first name', () => {
      const name = generateFirstNameSync(mockNamesData, 'female')
      expect(mockNamesData.firstNames.female).toContain(name)
    })

    it('should generate a name from any gender when neutral', () => {
      const name = generateFirstNameSync(mockNamesData, 'neutral')
      const allNames = [
        ...mockNamesData.firstNames.male,
        ...mockNamesData.firstNames.female,
        ...mockNamesData.firstNames.neutral,
      ]
      expect(allNames).toContain(name)
    })
  })

  describe('generateLastNameSync', () => {
    it('should generate a last name from the data', () => {
      const name = generateLastNameSync(mockNamesData)
      expect(mockNamesData.lastNames).toContain(name)
    })
  })

  describe('generateFullNameSync', () => {
    it('should generate a full name with first and last name', () => {
      const result = generateFullNameSync(mockNamesData, 'male')

      expect(result).toHaveProperty('firstName')
      expect(result).toHaveProperty('lastName')
      expect(result).toHaveProperty('fullName')
      expect(mockNamesData.firstNames.male).toContain(result.firstName)
      expect(mockNamesData.lastNames).toContain(result.lastName)
      expect(result.fullName).toBe(`${result.firstName} ${result.lastName}`)
    })
  })

  describe('Async functions with real data', () => {
    it('should generate a Senegalese first name', async () => {
      const name = await generateFirstName({ country: 'SN', gender: 'male' })
      expect(typeof name).toBe('string')
      expect(name.length).toBeGreaterThan(0)
    })

    it('should generate a Nigerian last name', async () => {
      const name = await generateLastName({ country: 'NG' })
      expect(typeof name).toBe('string')
      expect(name.length).toBeGreaterThan(0)
    })

    it('should generate a full Kenyan name', async () => {
      const result = await generateFullName({ country: 'KE', gender: 'female' })
      expect(result.firstName).toBeTruthy()
      expect(result.lastName).toBeTruthy()
      expect(result.fullName).toContain(result.firstName)
      expect(result.fullName).toContain(result.lastName)
    })

    it('should generate names for all supported countries', async () => {
      const countries = ['SN', 'NG', 'KE', 'ZA', 'EG', 'CG', 'CD'] as const

      for (const country of countries) {
        const name = await generateFullName({ country })
        expect(name.fullName.length).toBeGreaterThan(0)
      }
    })
  })
})
