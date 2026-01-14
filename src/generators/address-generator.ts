/**
 * Address Generator
 * Generates authentic African addresses using country-specific data
 */

import type { CountryCode, LocationsData, FormatsData, Region } from '../types'
import { loadLocationsData, loadFormatsData } from '../lib/data-loader'
import { pickRandom, randomInt } from '../lib/random'

export interface AddressGeneratorOptions {
  country: CountryCode
}

export interface GeneratedAddress {
  street: string
  city: string
  region: Region
  fullAddress: string
}

/**
 * Common street names by country (authentic African street names)
 */
const streetNames: Record<CountryCode, string[]> = {
  SN: [
    'Cheikh Anta Diop',
    'Léopold Sédar Senghor',
    'Blaise Diagne',
    'Lamine Guèye',
    'Faidherbe',
    'Carnot',
    'Ponty',
    'Gambetta',
    'Raffenel',
    'Ndaté Yalla',
    'Dial Diop',
    'Thiong',
    'Liberté',
    'Indépendance',
    'République',
  ],
  NG: [
    'Awolowo',
    'Azikiwe',
    'Ahmadu Bello',
    'Yakubu Gowon',
    'Tafawa Balewa',
    'Herbert Macaulay',
    'Broad Street',
    'Marina',
    'Ikoyi',
    'Victoria Island',
    'Adeola Odeku',
    'Adetokunbo Ademola',
    'Allen',
    'Opebi',
    'Toyin',
  ],
  KE: [
    'Kenyatta',
    'Moi',
    'Uhuru',
    'Kimathi',
    'Tom Mboya',
    'Haile Selassie',
    'Oginga Odinga',
    'Ronald Ngala',
    'Tubman',
    'Biashara',
    'River',
    'Mama Ngina',
    'Muindi Mbingu',
    'Koinange',
    'Mundi Mbingu',
  ],
  ZA: [
    'Nelson Mandela',
    'Jan Smuts',
    'Main',
    'Long',
    'Voortrekker',
    'Church',
    'Joubert',
    'Market',
    'Commissioner',
    'Fox',
    'Eloff',
    'President',
    'Bree',
    'Rissik',
    'Pritchard',
  ],
  EG: [
    'Tahrir',
    'Ramses',
    'July 26',
    'El-Horreya',
    'Salah Salem',
    'El-Nasr',
    'El-Thawra',
    'Port Said',
    'El-Gomhoreya',
    'Ahmed Orabi',
    'Saad Zaghloul',
    'Talaat Harb',
    'Champollion',
    'Kasr El-Nil',
    'Mohamed Ali',
  ],
  CG: [
    'Amilcar Cabral',
    'De Gaulle',
    'Félix Éboué',
    'Lumumba',
    'Marien Ngouabi',
    'Pierre Savorgnan de Brazza',
    'Alfred Raoul',
    'Denis Sassou Nguesso',
    'Révolution',
    'Indépendance',
    'Liberté',
    'Paix',
    'Unité',
    'Travail',
    'Progrès',
  ],
  CD: [
    'Patrice Lumumba',
    'Mobutu',
    'Laurent-Désiré Kabila',
    '30 Juin',
    'Roi Baudouin',
    'Kasavubu',
    'Victoire',
    'Commerce',
    'Haut Commandement',
    'Université',
    'Colonel Ebeya',
    'Sendwe',
    'Bokassa',
    'Kasa-Vubu',
    'Révolution',
  ],
}

/**
 * Quarter/neighborhood names by country
 */
const quarterNames: Record<CountryCode, string[]> = {
  SN: [
    'Médina',
    'Plateau',
    'Grand Dakar',
    'Colobane',
    'Fass',
    'Point E',
    'Mermoz',
    'Sacré-Cœur',
    'Ouakam',
    'Ngor',
    'Almadies',
    'Yoff',
    'Parcelles Assainies',
    'Grand Yoff',
    'HLM',
  ],
  NG: [
    'Victoria Island',
    'Ikoyi',
    'Lekki',
    'Surulere',
    'Yaba',
    'Ikeja',
    'Apapa',
    'Festac Town',
    'Ajah',
    'Maryland',
    'Ogba',
    'Gbagada',
    'Magodo',
    'Ogudu',
    'Ojodu',
  ],
  KE: [
    'Westlands',
    'Kilimani',
    'Lavington',
    'Karen',
    'Runda',
    'Muthaiga',
    'Kileleshwa',
    'Parklands',
    'Ngara',
    'Eastleigh',
    'South B',
    'South C',
    'Langata',
    'Embakasi',
    'Kasarani',
  ],
  ZA: [
    'Sandton',
    'Rosebank',
    'Melville',
    'Parktown',
    'Houghton',
    'Braamfontein',
    'Hillbrow',
    'Soweto',
    'Alexandra',
    'Randburg',
    'Midrand',
    'Fourways',
    'Kempton Park',
    'Centurion',
    'Brooklyn',
  ],
  EG: [
    'Zamalek',
    'Maadi',
    'Mohandessin',
    'Dokki',
    'Heliopolis',
    'Nasr City',
    'Downtown',
    'Garden City',
    'Giza',
    'October City',
    'New Cairo',
    'Shubra',
    'Agouza',
    'Imbaba',
    'Boulaq',
  ],
  CG: [
    'Poto-Poto',
    'Bacongo',
    'Makélékélé',
    'Moungali',
    'Ouenzé',
    'Talangaï',
    'Mfilou',
    'Madibou',
    'Centre-Ville',
    'Plateau',
    'Mpila',
    'Djiri',
    'Mikalou',
    'Massengo',
    'Kombé',
  ],
  CD: [
    'Gombe',
    'Lingwala',
    'Barumbu',
    'Kinshasa',
    'Kintambo',
    'Ngiri-Ngiri',
    'Kalamu',
    'Lemba',
    'Matete',
    'Ndjili',
    'Masina',
    'Kimbanseke',
    'Nsele',
    'Limete',
    'Ngaliema',
  ],
}

/**
 * Generate a street address line
 */
function generateStreet(country: CountryCode, patterns: string[]): string {
  const pattern = pickRandom(patterns)
  const streetName = pickRandom(streetNames[country] || streetNames.SN)
  const number = randomInt(1, 999)

  return pattern.replace('{number}', String(number)).replace('{name}', streetName)
}

/**
 * Generate a city name
 */
export async function generateCity(options: AddressGeneratorOptions): Promise<string> {
  const { country } = options
  const locationsData = await loadLocationsData(country)
  return pickRandom(locationsData.cities)
}

/**
 * Generate a region
 */
export async function generateRegion(options: AddressGeneratorOptions): Promise<Region> {
  const { country } = options
  const locationsData = await loadLocationsData(country)
  return pickRandom(locationsData.regions)
}

/**
 * Generate a quarter/neighborhood name
 */
export function generateQuarter(country: CountryCode): string {
  const quarters = quarterNames[country] || quarterNames.SN
  return pickRandom(quarters)
}

/**
 * Generate a complete address
 */
export async function generateAddress(options: AddressGeneratorOptions): Promise<GeneratedAddress> {
  const { country } = options

  const [locationsData, formatsData] = await Promise.all([
    loadLocationsData(country),
    loadFormatsData(country),
  ])

  const street = generateStreet(country, locationsData.streetPatterns)
  const city = pickRandom(locationsData.cities)
  const region = pickRandom(locationsData.regions)
  const quarter = generateQuarter(country)

  // Build full address using country format
  let fullAddress = formatsData.addressFormat
    .replace('{street}', street)
    .replace('{city}', city)
    .replace('{quarter}', quarter)
    .replace('{region}', region.name)

  // Add postal code if available
  if (formatsData.postalCode) {
    const postalCode = formatsData.postalCode.replace(/X/g, () => String(randomInt(0, 9)))
    fullAddress += `, ${postalCode}`
  }

  return {
    street,
    city,
    region,
    fullAddress,
  }
}

/**
 * Synchronous version using pre-loaded data
 */
export function generateCitySync(locationsData: LocationsData): string {
  return pickRandom(locationsData.cities)
}

export function generateRegionSync(locationsData: LocationsData): Region {
  return pickRandom(locationsData.regions)
}

export function generateAddressSync(
  locationsData: LocationsData,
  formatsData: FormatsData,
  country: CountryCode
): GeneratedAddress {
  const street = generateStreet(country, locationsData.streetPatterns)
  const city = pickRandom(locationsData.cities)
  const region = pickRandom(locationsData.regions)
  const quarter = generateQuarter(country)

  let fullAddress = formatsData.addressFormat
    .replace('{street}', street)
    .replace('{city}', city)
    .replace('{quarter}', quarter)
    .replace('{region}', region.name)

  if (formatsData.postalCode) {
    const postalCode = formatsData.postalCode.replace(/X/g, () => String(randomInt(0, 9)))
    fullAddress += `, ${postalCode}`
  }

  return {
    street,
    city,
    region,
    fullAddress,
  }
}
