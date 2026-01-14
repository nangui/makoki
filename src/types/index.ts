export type CountryCode = 'SN' | 'NG' | 'KE' | 'ZA' | 'EG' | 'CG' | 'CD'

export type Gender = 'male' | 'female' | 'neutral'

export interface GeneratorConfig {
  country: CountryCode
  gender?: Gender
}

export interface CountryData {
  code: CountryCode
  name: string
  flag: string
  enabled: boolean
}

export interface NamesData {
  firstNames: {
    male: string[]
    female: string[]
    neutral: string[]
  }
  lastNames: string[]
}

export interface Region {
  code: string
  name: string
}

export interface LocationsData {
  regions: Region[]
  cities: string[]
  streetPatterns: string[]
}

export interface FormatsData {
  phone: string
  addressFormat: string
  postalCode: string | null
}
