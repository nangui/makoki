// Makoki Test - Content Script
// This script runs on web pages and handles form filling
// 100% curated African data - No external dependencies

import type { CountryCode, Gender } from '../types'
import { generate, type DataType } from '../generators'

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
      .then(() => sendResponse({ success: true }))
      .catch(error => {
        console.error('Makoki Test: Error generating data', error)
        sendResponse({ success: false, error: error.message })
      })
    return true // Keep channel open for async response
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

    // Map context menu data type to generator data type
    const mappedDataType = mapDataType(dataType)

    if (!mappedDataType) {
      console.warn(`Makoki Test: Unknown data type: ${dataType}`)
      return
    }

    // Generate data using Makoki generators
    const data = await generate({
      country: settings.country,
      gender: settings.gender,
      dataType: mappedDataType,
    })

    if (data) {
      fillElement(element, data)
      showNotification(`✓ ${getDataTypeLabel(mappedDataType)} generated`)
    }
  } catch (error) {
    console.error('Makoki Test: Error generating data', error)
    showNotification('✗ Generation failed', true)
  }
}

// Map context menu data type to generator DataType
function mapDataType(dataType: string): DataType | null {
  const mapping: Record<string, DataType> = {
    name: 'name',
    firstname: 'firstname',
    lastname: 'lastname',
    phone: 'phone',
    email: 'email',
    city: 'city',
    address: 'address',
  }
  return mapping[dataType] || null
}

// Get human-readable label for data type
function getDataTypeLabel(dataType: DataType): string {
  const labels: Record<DataType, string> = {
    name: 'Full Name',
    firstname: 'First Name',
    lastname: 'Last Name',
    phone: 'Phone Number',
    email: 'Email',
    city: 'City',
    address: 'Address',
    region: 'Region',
  }
  return labels[dataType] || dataType
}

// Check if element is editable
function isEditableElement(element: Element): element is HTMLInputElement | HTMLTextAreaElement {
  return element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement
}

// Settings interface
interface Settings {
  country: CountryCode
  gender: Gender
}

// Get settings from storage via background script
async function getSettings(): Promise<Settings> {
  return new Promise(resolve => {
    chrome.runtime.sendMessage({ type: 'GET_SETTINGS' }, response => {
      resolve({
        country: response?.country || 'SN',
        gender: response?.gender || 'neutral',
      })
    })
  })
}

// Fill element with generated data
function fillElement(element: HTMLInputElement | HTMLTextAreaElement, value: string) {
  // Set value
  element.value = value

  // Dispatch events to trigger any listeners (important for React, Vue, etc.)
  element.dispatchEvent(new Event('input', { bubbles: true }))
  element.dispatchEvent(new Event('change', { bubbles: true }))

  // Visual feedback with Makoki brand color
  const originalBg = element.style.backgroundColor
  const originalTransition = element.style.transition
  element.style.transition = 'background-color 0.3s ease'
  element.style.backgroundColor = '#d4edda' // Light green

  setTimeout(() => {
    element.style.backgroundColor = originalBg
    setTimeout(() => {
      element.style.transition = originalTransition
    }, 300)
  }, 500)
}

// Show a subtle notification
function showNotification(message: string, isError = false) {
  // Remove existing notification if any
  const existing = document.getElementById('makoki-notification')
  if (existing) {
    existing.remove()
  }

  // Create notification element
  const notification = document.createElement('div')
  notification.id = 'makoki-notification'
  notification.textContent = message
  notification.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 12px 20px;
    background: ${isError ? '#dc3545' : '#10b981'};
    color: white;
    border-radius: 8px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    font-size: 14px;
    font-weight: 500;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 999999;
    animation: makoki-slide-in 0.3s ease;
  `

  // Add animation styles
  const style = document.createElement('style')
  style.textContent = `
    @keyframes makoki-slide-in {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    @keyframes makoki-slide-out {
      from {
        opacity: 1;
        transform: translateY(0);
      }
      to {
        opacity: 0;
        transform: translateY(20px);
      }
    }
  `
  document.head.appendChild(style)
  document.body.appendChild(notification)

  // Remove after 2 seconds
  setTimeout(() => {
    notification.style.animation = 'makoki-slide-out 0.3s ease forwards'
    setTimeout(() => {
      notification.remove()
      style.remove()
    }, 300)
  }, 2000)
}

console.log('🧠 Makoki Test: Content script loaded - Authentic African data ready!')

export {}
