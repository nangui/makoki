/**
 * Phone Number Generator
 * Generates authentic phone numbers using country-specific formats
 */

import type { CountryCode, FormatsData } from '../types'
import { loadFormatsData } from '../lib/data-loader'
import { randomDigit } from '../lib/random'

export interface PhoneGeneratorOptions {
  country: CountryCode
}

/**
 * Country-specific phone number configurations
 * Includes country code and valid mobile prefixes
 */
const phoneConfigs: Record<
  CountryCode,
  {
    countryCode: string
    mobilePrefixes: string[]
  }
> = {
  SN: {
    countryCode: '+221',
    mobilePrefixes: ['70', '76', '77', '78'],
  },
  NG: {
    countryCode: '+234',
    mobilePrefixes: ['703', '706', '803', '806', '810', '813', '816', '903', '906'],
  },
  KE: {
    countryCode: '+254',
    mobilePrefixes: ['700', '701', '702', '710', '711', '712', '720', '721', '722'],
  },
  ZA: {
    countryCode: '+27',
    mobilePrefixes: [
      '60',
      '61',
      '62',
      '63',
      '64',
      '65',
      '66',
      '67',
      '71',
      '72',
      '73',
      '74',
      '76',
      '78',
      '79',
      '81',
      '82',
      '83',
      '84',
    ],
  },
  EG: {
    countryCode: '+20',
    mobilePrefixes: ['10', '11', '12', '15'],
  },
  CG: {
    countryCode: '+242',
    mobilePrefixes: ['04', '05', '06'],
  },
  CD: {
    countryCode: '+243',
    mobilePrefixes: ['81', '82', '83', '84', '85', '89', '90', '97', '98', '99'],
  },
}

/**
 * Generate random digits of specified length
 */
function generateDigits(count: number): string {
  return Array.from({ length: count }, () => randomDigit()).join('')
}

/**
 * Parse a phone format pattern and generate a phone number
 * Pattern uses {0}, {1}, etc. for random digits
 */
function parsePhonePattern(pattern: string): string {
  // Replace all digit placeholders {0}, {1}, etc. with random digits
  return pattern.replace(/\{(\d+)\}/g, () => String(randomDigit()))
}

/**
 * Generate a phone number using a simple format
 * Format: countryCode + prefix + remaining digits
 */
function generateSimplePhoneNumber(country: CountryCode): string {
  const config = phoneConfigs[country]
  if (!config) {
    throw new Error(`Phone configuration not found for country: ${country}`)
  }

  const prefix = config.mobilePrefixes[Math.floor(Math.random() * config.mobilePrefixes.length)]

  // Calculate remaining digits needed (total 9-10 digits for local number)
  let remainingDigits: number
  switch (country) {
    case 'SN':
      remainingDigits = 7 // 77 XXX XX XX
      break
    case 'NG':
      remainingDigits = 7 // 803 XXX XXXX
      break
    case 'KE':
      remainingDigits = 6 // 712 XXX XXX
      break
    case 'ZA':
      remainingDigits = 7 // 82 XXX XXXX
      break
    case 'EG':
      remainingDigits = 8 // 10 XXXX XXXX
      break
    case 'CG':
      remainingDigits = 7 // 06 XXX XX XX
      break
    case 'CD':
      remainingDigits = 7 // 81 XXX XXXX
      break
    default:
      remainingDigits = 7
  }

  const digits = generateDigits(remainingDigits)

  return `${config.countryCode} ${prefix} ${formatPhoneDigits(digits, country)}`
}

/**
 * Format phone digits with proper spacing based on country
 */
function formatPhoneDigits(digits: string, country: CountryCode): string {
  switch (country) {
    case 'SN':
    case 'CG':
      // XX XX XX format
      return digits.replace(/(\d{3})(\d{2})(\d{2})/, '$1 $2 $3')
    case 'NG':
    case 'CD':
    case 'ZA':
      // XXX XXXX format
      return digits.replace(/(\d{3})(\d{4})/, '$1 $2')
    case 'KE':
      // XXX XXX format
      return digits.replace(/(\d{3})(\d{3})/, '$1 $2')
    case 'EG':
      // XXXX XXXX format
      return digits.replace(/(\d{4})(\d{4})/, '$1 $2')
    default:
      return digits
  }
}

/**
 * Generate a phone number for a specific country
 */
export async function generatePhoneNumber(options: PhoneGeneratorOptions): Promise<string> {
  const { country } = options

  // Try to use the format from the data file
  try {
    const formatsData = await loadFormatsData(country)
    if (formatsData.phone) {
      return parsePhonePattern(formatsData.phone)
    }
  } catch {
    // Fallback to simple generation
  }

  return generateSimplePhoneNumber(country)
}

/**
 * Synchronous version using pre-loaded data or config
 */
export function generatePhoneNumberSync(
  formatsData: FormatsData | null,
  country: CountryCode
): string {
  if (formatsData?.phone) {
    return parsePhonePattern(formatsData.phone)
  }
  return generateSimplePhoneNumber(country)
}

/**
 * Get country code for a specific country
 */
export function getCountryCode(country: CountryCode): string {
  return phoneConfigs[country]?.countryCode || ''
}
