// Makoki Test - Content Script
// This script runs on web pages and handles form filling

import type { CountryCode, GeneratorConfig } from '../types'

// Store the currently focused element
let focusedElement: HTMLInputElement | HTMLTextAreaElement | null = null

// Track focus on editable elements
document.addEventListener(
  'focusin',
  event => {
    const target = event.target as HTMLElement
    if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) {
      focusedElement = target
    }
  },
  true
)

document.addEventListener(
  'focusout',
  () => {
    // Keep reference for a short time after blur
    setTimeout(() => {
      focusedElement = null
    }, 100)
  },
  true
)

// Listen for messages from background script
chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.type === 'GENERATE_DATA') {
    handleGenerateData(message.dataType)
    sendResponse({ success: true })
  }
  return true
})

// Generate and fill data based on type
async function handleGenerateData(dataType: string) {
  const element = focusedElement || (document.activeElement as HTMLInputElement)

  if (!element || !isEditableElement(element)) {
    console.warn('Makoki Test: No editable element focused')
    return
  }

  try {
    // Get settings from storage
    const settings = await getSettings()
    const data = await generateData(dataType, settings)

    if (data) {
      fillElement(element, data)
    }
  } catch (error) {
    console.error('Makoki Test: Error generating data', error)
  }
}

// Check if element is editable
function isEditableElement(element: Element): element is HTMLInputElement | HTMLTextAreaElement {
  return element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement
}

// Get settings from storage via background script
async function getSettings(): Promise<GeneratorConfig> {
  return new Promise(resolve => {
    chrome.runtime.sendMessage({ type: 'GET_SETTINGS' }, response => {
      resolve({
        country: response?.country || 'SN',
        gender: response?.gender || 'neutral',
      })
    })
  })
}

// Generate data based on type and settings
async function generateData(dataType: string, config: GeneratorConfig): Promise<string | null> {
  // TODO: Import generators dynamically based on country
  // For now, use placeholder data

  const placeholders: Record<string, Record<CountryCode, string>> = {
    name: {
      SN: 'Amadou Diallo',
      NG: 'Chukwuemeka Okonkwo',
      KE: 'Wanjiku Kamau',
      ZA: 'Thabo Mbeki',
      EG: 'Ahmed Hassan',
      CG: 'Serge Moukoko',
      CD: 'Patient Kabila',
    },
    firstname: {
      SN: 'Amadou',
      NG: 'Chukwuemeka',
      KE: 'Wanjiku',
      ZA: 'Thabo',
      EG: 'Ahmed',
      CG: 'Serge',
      CD: 'Patient',
    },
    lastname: {
      SN: 'Diallo',
      NG: 'Okonkwo',
      KE: 'Kamau',
      ZA: 'Mbeki',
      EG: 'Hassan',
      CG: 'Moukoko',
      CD: 'Kabila',
    },
    phone: {
      SN: '+221 77 123 45 67',
      NG: '+234 801 234 5678',
      KE: '+254 712 345 678',
      ZA: '+27 82 123 4567',
      EG: '+20 10 1234 5678',
      CG: '+242 06 123 45 67',
      CD: '+243 81 234 5678',
    },
    email: {
      SN: 'amadou.diallo@example.com',
      NG: 'chukwu.okonkwo@example.com',
      KE: 'wanjiku.kamau@example.com',
      ZA: 'thabo.mbeki@example.com',
      EG: 'ahmed.hassan@example.com',
      CG: 'serge.moukoko@example.com',
      CD: 'patient.kabila@example.com',
    },
    city: {
      SN: 'Dakar',
      NG: 'Lagos',
      KE: 'Nairobi',
      ZA: 'Johannesburg',
      EG: 'Cairo',
      CG: 'Brazzaville',
      CD: 'Kinshasa',
    },
    address: {
      SN: '12 Avenue Cheikh Anta Diop, Dakar',
      NG: '42 Victoria Island, Lagos',
      KE: '15 Kenyatta Avenue, Nairobi',
      ZA: '88 Nelson Mandela Square, Johannesburg',
      EG: '23 Tahrir Square, Cairo',
      CG: '15 Avenue Amilcar Cabral, Brazzaville',
      CD: '28 Boulevard du 30 Juin, Kinshasa',
    },
  }

  const countryData = placeholders[dataType]
  return countryData?.[config.country] || null
}

// Fill element with generated data
function fillElement(element: HTMLInputElement | HTMLTextAreaElement, value: string) {
  // Set value
  element.value = value

  // Dispatch events to trigger any listeners
  element.dispatchEvent(new Event('input', { bubbles: true }))
  element.dispatchEvent(new Event('change', { bubbles: true }))

  // Visual feedback
  const originalBg = element.style.backgroundColor
  element.style.backgroundColor = '#d4edda'
  setTimeout(() => {
    element.style.backgroundColor = originalBg
  }, 500)
}

console.log('Makoki Test: Content script loaded')

export {}
