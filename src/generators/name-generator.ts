/**
 * Name Generator
 * Generates authentic African names using curated country-specific data
 */

import type { CountryCode, Gender, NamesData } from '../types'
import { loadNamesData } from '../lib/data-loader'
import { pickRandom } from '../lib/random'

export interface NameGeneratorOptions {
  country: CountryCode
  gender?: Gender
}

export interface GeneratedName {
  firstName: string
  lastName: string
  fullName: string
}

/**
 * Select the appropriate gender, handling 'neutral' by randomly picking male/female
 */
function resolveGender(gender: Gender = 'neutral'): 'male' | 'female' {
  if (gender === 'neutral') {
    return Math.random() > 0.5 ? 'male' : 'female'
  }
  return gender
}

/**
 * Generate a first name for a specific country and gender
 */
export async function generateFirstName(options: NameGeneratorOptions): Promise<string> {
  const { country, gender = 'neutral' } = options
  const namesData = await loadNamesData(country)
  const resolvedGender = resolveGender(gender)

  // Try to get names for the resolved gender, fallback to all names if empty
  let names = namesData.firstNames[resolvedGender]

  if (!names || names.length === 0) {
    // Fallback: combine all available names
    names = [
      ...namesData.firstNames.male,
      ...namesData.firstNames.female,
      ...namesData.firstNames.neutral,
    ].filter(Boolean)
  }

  if (names.length === 0) {
    throw new Error(`No first names available for country: ${country}`)
  }

  return pickRandom(names)
}

/**
 * Generate a last name for a specific country
 */
export async function generateLastName(options: NameGeneratorOptions): Promise<string> {
  const { country } = options
  const namesData = await loadNamesData(country)

  if (!namesData.lastNames || namesData.lastNames.length === 0) {
    throw new Error(`No last names available for country: ${country}`)
  }

  return pickRandom(namesData.lastNames)
}

/**
 * Generate a full name (first + last) for a specific country
 */
export async function generateFullName(options: NameGeneratorOptions): Promise<GeneratedName> {
  const [firstName, lastName] = await Promise.all([
    generateFirstName(options),
    generateLastName(options),
  ])

  return {
    firstName,
    lastName,
    fullName: `${firstName} ${lastName}`,
  }
}

/**
 * Synchronous version using pre-loaded data
 */
export function generateFirstNameSync(namesData: NamesData, gender: Gender = 'neutral'): string {
  const resolvedGender = resolveGender(gender)
  let names = namesData.firstNames[resolvedGender]

  if (!names || names.length === 0) {
    names = [
      ...namesData.firstNames.male,
      ...namesData.firstNames.female,
      ...namesData.firstNames.neutral,
    ].filter(Boolean)
  }

  return pickRandom(names)
}

export function generateLastNameSync(namesData: NamesData): string {
  return pickRandom(namesData.lastNames)
}

export function generateFullNameSync(
  namesData: NamesData,
  gender: Gender = 'neutral'
): GeneratedName {
  const firstName = generateFirstNameSync(namesData, gender)
  const lastName = generateLastNameSync(namesData)

  return {
    firstName,
    lastName,
    fullName: `${firstName} ${lastName}`,
  }
}
