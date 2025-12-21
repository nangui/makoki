<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { CountryCode } from '../types'

interface Country {
  code: CountryCode
  name: string
  flag: string
}

const countries: Country[] = [
  { code: 'SN', name: 'Senegal', flag: '🇸🇳' },
  { code: 'NG', name: 'Nigeria', flag: '🇳🇬' },
  { code: 'KE', name: 'Kenya', flag: '🇰🇪' },
  { code: 'ZA', name: 'South Africa', flag: '🇿🇦' },
  { code: 'EG', name: 'Egypt', flag: '🇪🇬' },
  { code: 'CG', name: 'Congo', flag: '🇨🇬' },
  { code: 'CD', name: 'DR Congo', flag: '🇨🇩' },
]

const selectedCountry = ref<CountryCode>('SN')
const selectedGender = ref<'male' | 'female' | 'neutral'>('neutral')
const isSaving = ref(false)

onMounted(async () => {
  // Load saved settings
  chrome.runtime.sendMessage({ type: 'GET_SETTINGS' }, response => {
    if (response) {
      selectedCountry.value = response.country || 'SN'
      selectedGender.value = response.gender || 'neutral'
    }
  })
})

function saveSettings() {
  isSaving.value = true
  chrome.runtime.sendMessage(
    {
      type: 'SAVE_SETTINGS',
      country: selectedCountry.value,
      gender: selectedGender.value,
    },
    () => {
      setTimeout(() => {
        isSaving.value = false
      }, 500)
    }
  )
}

function selectCountry(code: CountryCode) {
  selectedCountry.value = code
  saveSettings()
}
</script>

<template>
  <div class="popup-container">
    <!-- Header -->
    <header class="header">
      <div class="logo">
        <span class="logo-icon">🧠</span>
        <h1 class="logo-text">Makoki Test</h1>
      </div>
      <p class="tagline">Smart African Test Data Generator</p>
    </header>

    <!-- Country Selection -->
    <section class="section">
      <h2 class="section-title">Select Country</h2>
      <div class="country-grid">
        <button
          v-for="country in countries"
          :key="country.code"
          class="country-btn"
          :class="{ active: selectedCountry === country.code }"
          @click="selectCountry(country.code)"
        >
          <span class="country-flag">{{ country.flag }}</span>
          <span class="country-name">{{ country.name }}</span>
        </button>
      </div>
    </section>

    <!-- Gender Preference -->
    <section class="section">
      <h2 class="section-title">Name Gender</h2>
      <div class="gender-options">
        <label class="radio-label">
          <input v-model="selectedGender" type="radio" value="neutral" @change="saveSettings" />
          <span>Random</span>
        </label>
        <label class="radio-label">
          <input v-model="selectedGender" type="radio" value="male" @change="saveSettings" />
          <span>Male</span>
        </label>
        <label class="radio-label">
          <input v-model="selectedGender" type="radio" value="female" @change="saveSettings" />
          <span>Female</span>
        </label>
      </div>
    </section>

    <!-- Instructions -->
    <section class="section instructions">
      <h2 class="section-title">How to Use</h2>
      <ol class="instruction-list">
        <li>Right-click on any input field</li>
        <li>Select "🧠 Generate Test Data"</li>
        <li>Choose the data type you need</li>
      </ol>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <span v-if="isSaving" class="save-indicator">✓ Saved</span>
      <a href="https://github.com/nangui/makoki" target="_blank" class="github-link"> GitHub </a>
    </footer>
  </div>
</template>

<style scoped>
.popup-container {
  @apply p-4 bg-gradient-to-br from-emerald-50 to-amber-50 min-h-[500px];
}

.header {
  @apply text-center mb-6;
}

.logo {
  @apply flex items-center justify-center gap-2;
}

.logo-icon {
  @apply text-3xl;
}

.logo-text {
  @apply text-2xl font-bold text-emerald-800;
}

.tagline {
  @apply text-sm text-gray-600 mt-1;
}

.section {
  @apply mb-5;
}

.section-title {
  @apply text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide;
}

.country-grid {
  @apply grid grid-cols-2 gap-2;
}

.country-btn {
  @apply flex items-center gap-2 p-3 rounded-lg border-2 border-gray-200 bg-white hover:border-emerald-400 transition-all cursor-pointer;
}

.country-btn.active {
  @apply border-emerald-500 bg-emerald-50;
}

.country-flag {
  @apply text-xl;
}

.country-name {
  @apply text-sm font-medium text-gray-700;
}

.gender-options {
  @apply flex gap-4;
}

.radio-label {
  @apply flex items-center gap-2 cursor-pointer;
}

.radio-label input {
  @apply accent-emerald-600;
}

.radio-label span {
  @apply text-sm text-gray-700;
}

.instructions {
  @apply bg-white/50 rounded-lg p-3;
}

.instruction-list {
  @apply text-sm text-gray-600 list-decimal list-inside space-y-1;
}

.footer {
  @apply flex justify-between items-center pt-4 border-t border-gray-200 mt-auto;
}

.save-indicator {
  @apply text-sm text-emerald-600 font-medium;
}

.github-link {
  @apply text-sm text-gray-500 hover:text-emerald-600 transition-colors;
}
</style>
