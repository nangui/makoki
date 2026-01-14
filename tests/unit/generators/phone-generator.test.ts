/**
 * Phone Generator Tests
 */

import { describe, it, expect, beforeEach } from 'vitest'
import {
  generatePhoneNumber,
  generatePhoneNumberSync,
  getCountryCode,
} from '../../../src/generators/phone-generator'
import { clearDataCache } from '../../../src/lib/data-loader'

describe('Phone Generator', () => {
  beforeEach(() => {
    clearDataCache()
  })

  describe('getCountryCode', () => {
    it('should return correct country code for Senegal', () => {
      expect(getCountryCode('SN')).toBe('+221')
    })

    it('should return correct country code for Nigeria', () => {
      expect(getCountryCode('NG')).toBe('+234')
    })

    it('should return correct country code for Kenya', () => {
      expect(getCountryCode('KE')).toBe('+254')
    })

    it('should return correct country code for South Africa', () => {
      expect(getCountryCode('ZA')).toBe('+27')
    })

    it('should return correct country code for Egypt', () => {
      expect(getCountryCode('EG')).toBe('+20')
    })

    it('should return correct country code for Congo', () => {
      expect(getCountryCode('CG')).toBe('+242')
    })

    it('should return correct country code for DR Congo', () => {
      expect(getCountryCode('CD')).toBe('+243')
    })
  })

  describe('generatePhoneNumberSync', () => {
    it('should generate a Senegalese phone number starting with +221', () => {
      const phone = generatePhoneNumberSync(null, 'SN')
      expect(phone).toMatch(/^\+221/)
    })

    it('should generate a Nigerian phone number starting with +234', () => {
      const phone = generatePhoneNumberSync(null, 'NG')
      expect(phone).toMatch(/^\+234/)
    })
  })

  describe('generatePhoneNumber (async)', () => {
    it('should generate a valid Senegalese phone number', async () => {
      const phone = await generatePhoneNumber({ country: 'SN' })
      expect(phone).toMatch(/^\+221/)
      expect(phone.replace(/\s/g, '').length).toBeGreaterThanOrEqual(12)
    })

    it('should generate a valid Nigerian phone number', async () => {
      const phone = await generatePhoneNumber({ country: 'NG' })
      expect(phone).toMatch(/^\+234/)
    })

    it('should generate a valid Kenyan phone number', async () => {
      const phone = await generatePhoneNumber({ country: 'KE' })
      expect(phone).toMatch(/^\+254/)
    })

    it('should generate a valid South African phone number', async () => {
      const phone = await generatePhoneNumber({ country: 'ZA' })
      expect(phone).toMatch(/^\+27/)
    })

    it('should generate a valid Egyptian phone number', async () => {
      const phone = await generatePhoneNumber({ country: 'EG' })
      expect(phone).toMatch(/^\+20/)
    })

    it('should generate a valid Congolese phone number', async () => {
      const phone = await generatePhoneNumber({ country: 'CG' })
      expect(phone).toMatch(/^\+242/)
    })

    it('should generate a valid DR Congolese phone number', async () => {
      const phone = await generatePhoneNumber({ country: 'CD' })
      expect(phone).toMatch(/^\+243/)
    })

    it('should generate phone numbers for all supported countries', async () => {
      const countries = ['SN', 'NG', 'KE', 'ZA', 'EG', 'CG', 'CD'] as const
      const expectedCodes = ['+221', '+234', '+254', '+27', '+20', '+242', '+243']

      for (let i = 0; i < countries.length; i++) {
        const phone = await generatePhoneNumber({ country: countries[i] })
        expect(phone).toMatch(new RegExp(`^\\${expectedCodes[i]}`))
      }
    })
  })
})
