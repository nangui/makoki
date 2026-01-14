// Makoki Test - Background Service Worker
// This script runs in the background and handles context menu and messaging

import type { CountryCode } from '../types'
import { logger } from '../lib/logger'

// Create context menu when extension is installed
chrome.runtime.onInstalled.addListener(() => {
  // Main context menu
  chrome.contextMenus.create({
    id: 'makoki-generate',
    title: '🧠 Generate Test Data',
    contexts: ['editable'],
  })

  // Sub-menus for data types
  chrome.contextMenus.create({
    id: 'makoki-name',
    parentId: 'makoki-generate',
    title: '👤 Full Name',
    contexts: ['editable'],
  })

  chrome.contextMenus.create({
    id: 'makoki-firstname',
    parentId: 'makoki-generate',
    title: '👤 First Name',
    contexts: ['editable'],
  })

  chrome.contextMenus.create({
    id: 'makoki-lastname',
    parentId: 'makoki-generate',
    title: '👤 Last Name',
    contexts: ['editable'],
  })

  chrome.contextMenus.create({
    id: 'makoki-separator-1',
    parentId: 'makoki-generate',
    type: 'separator',
    contexts: ['editable'],
  })

  chrome.contextMenus.create({
    id: 'makoki-phone',
    parentId: 'makoki-generate',
    title: '📞 Phone Number',
    contexts: ['editable'],
  })

  chrome.contextMenus.create({
    id: 'makoki-email',
    parentId: 'makoki-generate',
    title: '📧 Email',
    contexts: ['editable'],
  })

  chrome.contextMenus.create({
    id: 'makoki-separator-2',
    parentId: 'makoki-generate',
    type: 'separator',
    contexts: ['editable'],
  })

  chrome.contextMenus.create({
    id: 'makoki-city',
    parentId: 'makoki-generate',
    title: '📍 City',
    contexts: ['editable'],
  })

  chrome.contextMenus.create({
    id: 'makoki-address',
    parentId: 'makoki-generate',
    title: '🏠 Address',
    contexts: ['editable'],
  })

  logger.log('Makoki Test: Context menus created')
})

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (!tab?.id) return

  const menuId = info.menuItemId as string
  if (!menuId.startsWith('makoki-')) return

  const dataType = menuId.replace('makoki-', '')

  // Send message to content script
  chrome.tabs.sendMessage(tab.id, {
    type: 'GENERATE_DATA',
    dataType,
  })
})

// Handle messages from content script or popup
chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.type === 'GET_SETTINGS') {
    chrome.storage.local.get(['selectedCountry', 'gender'], result => {
      sendResponse({
        country: (result.selectedCountry as CountryCode) || 'SN',
        gender: result.gender || 'neutral',
      })
    })
    return true // Keep channel open for async response
  }

  if (message.type === 'SAVE_SETTINGS') {
    chrome.storage.local.set({
      selectedCountry: message.country,
      gender: message.gender,
    })
    sendResponse({ success: true })
    return true
  }
})

export {}
