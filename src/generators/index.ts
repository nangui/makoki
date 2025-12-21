/**
 * Makoki Data Generators
 * Central export for all data generation functions
 *
 * 100% curated African data - No external dependencies
 */

import type { CountryCode, Gender } from '../types'
import { loadCountryData } from '../lib/data-loader'

// Re-export individual generators
export {
  generateFirstName,
  generateLastName,
  generateFullName,
  generateFirstNameSync,
  generateLastNameSync,
  generateFullNameSync,
  type NameGeneratorOptions,
  type GeneratedName,
} from './name-generator'

export {
  generatePhoneNumber,
  generatePhoneNumberSync,
  getCountryCode,
  type PhoneGeneratorOptions,
} from './phone-generator'

export {
  generateCity,
  generateRegion,
  generateQuarter,
  generateAddress,
  generateCitySync,
  generateRegionSync,
  generateAddressSync,
  type AddressGeneratorOptions,
  type GeneratedAddress,
} from './address-generator'

export {
  generateEmail,
  generateEmailSync,
  getEmailDomains,
  type EmailGeneratorOptions,
} from './email-generator'

/**
 * Unified data type for generation
 */
export type DataType =
  | 'name'
  | 'firstname'
  | 'lastname'
  | 'phone'
  | 'email'
  | 'city'
  | 'address'
  | 'region'

/**
 * Configuration for the unified generator
 */
export interface GenerateOptions {
  country: CountryCode
  gender?: Gender
  dataType: DataType
}

/**
 * Unified data generator
 * Single entry point for generating any type of test data
 */
export async function generate(options: GenerateOptions): Promise<string> {
  const { country, gender = 'neutral', dataType } = options

  // Load all country data at once for efficiency
  const { names, locations, formats } = await loadCountryData(country)

  // Import sync functions
  const { generateFirstNameSync, generateLastNameSync, generateFullNameSync } =
    await import('./name-generator')
  const { generatePhoneNumberSync } = await import('./phone-generator')
  const { generateCitySync, generateAddressSync } = await import('./address-generator')
  const { generateEmailSync } = await import('./email-generator')

  switch (dataType) {
    case 'firstname':
      return generateFirstNameSync(names, gender)

    case 'lastname':
      return generateLastNameSync(names)

    case 'name':
      return generateFullNameSync(names, gender).fullName

    case 'phone':
      return generatePhoneNumberSync(formats, country)

    case 'email':
      return generateEmailSync(names, country, gender)

    case 'city':
      return generateCitySync(locations)

    case 'address':
      return generateAddressSync(locations, formats, country).fullAddress

    case 'region':
      return generateCitySync(locations) // Using city as fallback for now

    default:
      throw new Error(`Unknown data type: ${dataType}`)
  }
}

/**
 * Generate multiple data items at once
 */
export async function generateBatch(options: GenerateOptions, count: number): Promise<string[]> {
  const results: string[] = []
  for (let i = 0; i < count; i++) {
    results.push(await generate(options))
  }
  return results
}

/**
 * Generate a complete test profile with all data types
 */
export async function generateProfile(country: CountryCode, gender: Gender = 'neutral') {
  const { names, locations, formats } = await loadCountryData(country)

  const { generateFullNameSync } = await import('./name-generator')
  const { generatePhoneNumberSync } = await import('./phone-generator')
  const { generateAddressSync } = await import('./address-generator')
  const { generateEmailSync } = await import('./email-generator')

  const name = generateFullNameSync(names, gender)
  const phone = generatePhoneNumberSync(formats, country)
  const address = generateAddressSync(locations, formats, country)
  const email = generateEmailSync(names, country, gender, name.firstName, name.lastName)

  return {
    firstName: name.firstName,
    lastName: name.lastName,
    fullName: name.fullName,
    phone,
    email,
    address: address.fullAddress,
    city: address.city,
    region: address.region.name,
    country,
  }
}
