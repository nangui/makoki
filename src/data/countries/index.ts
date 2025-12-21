// Country data index
// Export all country configurations

import type { CountryCode } from '../../types'

export interface CountryConfig {
  code: CountryCode
  name: string
  flag: string
  enabled: boolean
}

export const countries: CountryConfig[] = [
  { code: 'SN', name: 'Senegal', flag: '🇸🇳', enabled: true },
  { code: 'NG', name: 'Nigeria', flag: '🇳🇬', enabled: true },
  { code: 'KE', name: 'Kenya', flag: '🇰🇪', enabled: true },
  { code: 'ZA', name: 'South Africa', flag: '🇿🇦', enabled: true },
  { code: 'EG', name: 'Egypt', flag: '🇪🇬', enabled: true },
  { code: 'CG', name: 'Republic of the Congo', flag: '🇨🇬', enabled: true },
  { code: 'CD', name: 'Democratic Republic of the Congo', flag: '🇨🇩', enabled: true },
]

export const enabledCountries = countries.filter(c => c.enabled)

export function getCountryByCode(code: CountryCode): CountryConfig | undefined {
  return countries.find(c => c.code === code)
}

export default countries
