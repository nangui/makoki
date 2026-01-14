/**
 * Data loader utilities for loading country-specific data files
 * Handles dynamic imports and caching of JSON data
 */

import type { CountryCode, NamesData, LocationsData, FormatsData } from '../types'

// Cache for loaded data to avoid repeated imports
const dataCache = new Map<string, unknown>()

/**
 * Load names data for a specific country
 */
export async function loadNamesData(country: CountryCode): Promise<NamesData> {
  const cacheKey = `names-${country}`

  if (dataCache.has(cacheKey)) {
    return dataCache.get(cacheKey) as NamesData
  }

  const data = await import(`../data/countries/${country}/names.json`)
  const namesData = data.default as NamesData
  dataCache.set(cacheKey, namesData)
  return namesData
}

/**
 * Load locations data for a specific country
 */
export async function loadLocationsData(country: CountryCode): Promise<LocationsData> {
  const cacheKey = `locations-${country}`

  if (dataCache.has(cacheKey)) {
    return dataCache.get(cacheKey) as LocationsData
  }

  const data = await import(`../data/countries/${country}/locations.json`)
  const locationsData = data.default as LocationsData
  dataCache.set(cacheKey, locationsData)
  return locationsData
}

/**
 * Load formats data for a specific country
 */
export async function loadFormatsData(country: CountryCode): Promise<FormatsData> {
  const cacheKey = `formats-${country}`

  if (dataCache.has(cacheKey)) {
    return dataCache.get(cacheKey) as FormatsData
  }

  const data = await import(`../data/countries/${country}/formats.json`)
  const formatsData = data.default as FormatsData
  dataCache.set(cacheKey, formatsData)
  return formatsData
}

/**
 * Load all data for a specific country
 */
export async function loadCountryData(country: CountryCode): Promise<{
  names: NamesData
  locations: LocationsData
  formats: FormatsData
}> {
  const [names, locations, formats] = await Promise.all([
    loadNamesData(country),
    loadLocationsData(country),
    loadFormatsData(country),
  ])

  return { names, locations, formats }
}

/**
 * Clear the data cache (useful for testing)
 */
export function clearDataCache(): void {
  dataCache.clear()
}

/**
 * Preload data for all enabled countries
 */
export async function preloadAllCountries(countries: CountryCode[]): Promise<void> {
  await Promise.all(countries.map(country => loadCountryData(country)))
}
