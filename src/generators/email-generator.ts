/**
 * Email Generator
 * Generates authentic email addresses using African names and local domains
 */

import type { CountryCode, Gender, NamesData } from '../types'
import { loadNamesData } from '../lib/data-loader'
import { pickRandom, randomInt } from '../lib/random'
import { generateFirstNameSync, generateLastNameSync } from './name-generator'

export interface EmailGeneratorOptions {
  country: CountryCode
  gender?: Gender
  firstName?: string
  lastName?: string
}

/**
 * Country-specific email domains
 * Includes popular local providers and international ones
 */
const emailDomains: Record<CountryCode, string[]> = {
  SN: [
    'orange.sn',
    'gmail.com',
    'yahoo.fr',
    'hotmail.com',
    'senelec.sn',
    'ucad.edu.sn',
    'gouv.sn',
    'sonatel.sn',
    'free.sn',
  ],
  NG: [
    'gmail.com',
    'yahoo.com',
    'hotmail.com',
    'outlook.com',
    'unilag.edu.ng',
    'npower.gov.ng',
    'mtn.ng',
    'glo.com.ng',
    'airtel.ng',
  ],
  KE: [
    'gmail.com',
    'yahoo.com',
    'safaricom.co.ke',
    'outlook.com',
    'uonbi.ac.ke',
    'kenyaweb.com',
    'africaonline.co.ke',
    'wananchi.com',
    'jambomail.co.ke',
  ],
  ZA: [
    'gmail.com',
    'yahoo.co.za',
    'webmail.co.za',
    'mweb.co.za',
    'telkomsa.net',
    'vodamail.co.za',
    'outlook.com',
    'icloud.com',
    'sun.ac.za',
  ],
  EG: [
    'gmail.com',
    'yahoo.com',
    'hotmail.com',
    'outlook.com',
    'egypt.com',
    'link.net',
    'mailer.eg',
    'cu.edu.eg',
    'alexu.edu.eg',
  ],
  CG: [
    'gmail.com',
    'yahoo.fr',
    'hotmail.com',
    'outlook.com',
    'airtel.cg',
    'mtn.cg',
    'gouv.cg',
    'brazza.com',
    'congo-site.com',
  ],
  CD: [
    'gmail.com',
    'yahoo.fr',
    'hotmail.com',
    'outlook.com',
    'vodacom.cd',
    'orange.cd',
    'airtel.cd',
    'unikin.ac.cd',
    'gouv.cd',
  ],
}

/**
 * Email format patterns
 */
const emailPatterns = [
  '{firstName}.{lastName}',
  '{firstName}{lastName}',
  '{firstInitial}.{lastName}',
  '{firstName}.{lastInitial}',
  '{firstName}{year}',
  '{lastName}{number}',
  '{firstName}.{lastName}{number}',
  '{firstInitial}{lastName}',
]

/**
 * Normalize a string for email use (remove accents, lowercase, no spaces)
 */
function normalizeForEmail(str: string): string {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .toLowerCase()
    .replace(/\s+/g, '') // Remove spaces
    .replace(/[^a-z0-9]/g, '') // Keep only alphanumeric
}

/**
 * Generate an email address
 */
export async function generateEmail(options: EmailGeneratorOptions): Promise<string> {
  const { country, gender = 'neutral', firstName, lastName } = options

  // Get names if not provided
  let first = firstName
  let last = lastName

  if (!first || !last) {
    const namesData = await loadNamesData(country)
    if (!first) {
      first = generateFirstNameSync(namesData, gender)
    }
    if (!last) {
      last = generateLastNameSync(namesData)
    }
  }

  return createEmailAddress(first, last, country)
}

/**
 * Create an email address from name components
 */
function createEmailAddress(firstName: string, lastName: string, country: CountryCode): string {
  const normalizedFirst = normalizeForEmail(firstName)
  const normalizedLast = normalizeForEmail(lastName)

  // Pick a random pattern
  const pattern = pickRandom(emailPatterns)
  const domain = pickRandom(emailDomains[country] || emailDomains.SN)
  const year = randomInt(80, 99)
  const number = randomInt(1, 999)

  const localPart = pattern
    .replace('{firstName}', normalizedFirst)
    .replace('{lastName}', normalizedLast)
    .replace('{firstInitial}', normalizedFirst.charAt(0))
    .replace('{lastInitial}', normalizedLast.charAt(0))
    .replace('{year}', String(year))
    .replace('{number}', String(number))

  return `${localPart}@${domain}`
}

/**
 * Synchronous version using pre-loaded data
 */
export function generateEmailSync(
  namesData: NamesData,
  country: CountryCode,
  gender: Gender = 'neutral',
  providedFirstName?: string,
  providedLastName?: string
): string {
  const firstName = providedFirstName || generateFirstNameSync(namesData, gender)
  const lastName = providedLastName || generateLastNameSync(namesData)

  return createEmailAddress(firstName, lastName, country)
}

/**
 * Get available email domains for a country
 */
export function getEmailDomains(country: CountryCode): string[] {
  return emailDomains[country] || emailDomains.SN
}
