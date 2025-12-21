---
description: Makoki Test - Smart African test data generator Chrome extension. Defines agent roles, code conventions, and development guidelines.
alwaysApply: true
---

# 🧠 Makoki Test - Cursor AI Rules

# Smart African Test Data Generator Chrome Extension

---

## 📋 PROJECT METADATA

- **Name**: Makoki Test
- **Version**: 1.0.0
- **Author**: Adonai NANGUI (@nangui)
- **License**: MIT
- **Repository**: https://github.com/nangui/makoki

---

## 🎯 PROJECT CONTEXT

Makoki Test is a Chrome/Firefox browser extension that generates authentic African test data for developers. Instead of using generic "John Doe" placeholders, developers can fill forms with realistic names, addresses, and phone numbers from 10+ African countries.

### Tech Stack

- **Runtime**: Chrome Extension Manifest V3
- **Language**: TypeScript (strict mode)
- **UI Framework**: Vue.js 3 (Composition API + `<script setup>`)
- **Build Tool**: Vite + @crxjs/vite-plugin
- **Styling**: Tailwind CSS
- **Testing**: Vitest + Vue Test Utils
- **Package Manager**: pnpm

### Key Directories

```
src/
├── background/     # Service worker (context menus, messaging)
├── content/        # Content scripts (DOM interaction, form filling)
├── popup/          # Vue.js popup UI
├── generators/     # Data generation logic
├── data/           # Country-specific data (JSON files)
├── lib/            # Shared utilities
└── types/          # TypeScript type definitions
```

---

## 🤖 AGENT ROLES & RESPONSIBILITIES

### 1. Extension Architect (Lead)

**Role**: System design and architecture decisions
**Responsibilities**:

- Overall extension architecture
- Chrome Extension APIs integration
- Message passing between components
- Storage strategy (chrome.storage)
- Security and permissions model

**Delegation**:

- UI/UX tasks → Frontend Engineer
- Data generation → Data Engineer
- Content scripts → Extension Engineer
- Quality assurance → Test Engineer

### 2. Frontend Engineer

**Role**: Popup UI and user experience
**Responsibilities**:

- Vue.js 3 components with Composition API
- Tailwind CSS styling (African-inspired aesthetics)
- Reactive state management
- User settings interface
- Accessibility (WCAG 2.1 AA)

**Patterns**:

```typescript
// Always use <script setup> syntax
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { CountryCode } from '@/types'
</script>
```

### 3. Extension Engineer

**Role**: Chrome Extension functionality
**Responsibilities**:

- Background service worker
- Content scripts for form detection
- Context menu implementation
- Chrome messaging API
- Cross-browser compatibility (Chrome/Firefox)

**Patterns**:

```typescript
// Message types must be strictly typed
interface Message {
  type: 'GENERATE_DATA' | 'GET_SETTINGS' | 'SAVE_SETTINGS'
  payload?: unknown
}

// Always handle async responses properly
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // Return true for async responses
  return true
})
```

### 4. Data Engineer

**Role**: African data curation and generation
**Responsibilities**:

- Country data files (names, locations, formats)
- Data generation algorithms
- Phone number formatting per country
- Address pattern generation
- Data validation and quality

**Data Structure**:

```typescript
// src/data/countries/{CODE}/names.json
{
  "firstNames": {
    "male": ["..."],
    "female": ["..."],
    "neutral": []
  },
  "lastNames": ["..."]
}

// src/data/countries/{CODE}/formats.json
{
  "phone": "+{countryCode} {pattern}",
  "addressFormat": "{street}, {city}",
  "postalCode": "pattern or null"
}
```

### 5. Test Engineer

**Role**: Quality assurance and testing
**Responsibilities**:

- Unit tests with Vitest
- Component tests with Vue Test Utils
- E2E tests for extension functionality
- Test coverage monitoring
- CI/CD pipeline validation

---

## 📐 CODE CONVENTIONS

### TypeScript Rules

```typescript
// ✅ DO: Use strict typing, no 'any'
function generateName(config: GeneratorConfig): string

// ❌ DON'T: Use any or loose typing
function generateName(config: any): any

// ✅ DO: Use type imports
import type { CountryCode } from '@/types'

// ✅ DO: Export types from index files
export type { CountryCode, GeneratorConfig } from './types'
```

### Vue.js Rules

```vue
<!-- ✅ DO: Use <script setup> with TypeScript -->
<script setup lang="ts">
import { ref } from 'vue'
const count = ref<number>(0)
</script>

<!-- ✅ DO: Use Tailwind utility classes -->
<template>
  <button class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 rounded-lg">Click</button>
</template>

<!-- ❌ DON'T: Use Options API or inline styles -->
```

### File Naming

- Components: `PascalCase.vue` (e.g., `CountrySelector.vue`)
- TypeScript files: `kebab-case.ts` (e.g., `name-generator.ts`)
- Test files: `*.test.ts` or `*.spec.ts`
- Data files: `lowercase.json`

### Import Order

```typescript
// 1. External dependencies
import { ref, computed } from 'vue'

// 2. Internal aliases (@/)
import { generateName } from '@/generators'
import type { CountryCode } from '@/types'

// 3. Relative imports
import CountryButton from './CountryButton.vue'
```

---

## 🌍 SUPPORTED COUNTRIES

| Code | Country       | Flag | Status     |
| ---- | ------------- | ---- | ---------- |
| SN   | Senegal       | 🇸🇳   | ✅ Active  |
| NG   | Nigeria       | 🇳🇬   | ✅ Active  |
| KE   | Kenya         | 🇰🇪   | ✅ Active  |
| ZA   | South Africa  | 🇿🇦   | ✅ Active  |
| EG   | Egypt         | 🇪🇬   | ✅ Active  |
| CG   | Congo         | 🇨🇬   | ✅ Active  |
| CD   | DR Congo      | 🇨🇩   | ✅ Active  |
| GH   | Ghana         | 🇬🇭   | 🔜 Planned |
| CI   | Côte d'Ivoire | 🇨🇮   | 🔜 Planned |
| CM   | Cameroon      | 🇨🇲   | 🔜 Planned |

### Adding a New Country

1. Create folder: `src/data/countries/{CODE}/`
2. Add files: `names.json`, `locations.json`, `formats.json`
3. Update `src/data/countries/index.ts`
4. Add to `CountryCode` type in `src/types/index.ts`
5. Write unit tests

---

## 🔒 SECURITY GUIDELINES

### Permissions (Minimal)

```json
{
  "permissions": ["contextMenus", "storage", "activeTab"],
  "host_permissions": ["<all_urls>"]
}
```

### Privacy First

- ✅ No external API calls
- ✅ No analytics or tracking
- ✅ All data generated locally
- ✅ No user data collection
- ❌ Never send data to external servers

### Content Script Safety

```typescript
// ✅ DO: Validate target elements
if (element instanceof HTMLInputElement) {
  element.value = generatedValue
}

// ❌ DON'T: Use innerHTML with generated content
element.innerHTML = unsafeContent // XSS risk!
```

---

## 🧪 TESTING STRATEGY

### Unit Tests (Vitest)

```typescript
// src/generators/__tests__/name-generator.test.ts
import { describe, it, expect } from 'vitest'
import { generateName } from '../name-generator'

describe('generateName', () => {
  it('should generate valid Senegalese name', () => {
    const name = generateName({ country: 'SN', gender: 'male' })
    expect(name).toBeTruthy()
    expect(typeof name).toBe('string')
  })
})
```

### Component Tests

```typescript
import { mount } from '@vue/test-utils'
import CountrySelector from '@/popup/components/CountrySelector.vue'

describe('CountrySelector', () => {
  it('should emit country selection', async () => {
    const wrapper = mount(CountrySelector)
    await wrapper.find('[data-country="SN"]').trigger('click')
    expect(wrapper.emitted('select')).toHaveLength(1)
  })
})
```

### Test Commands

```bash
pnpm test          # Run all tests
pnpm test:ui       # Interactive UI
pnpm test:coverage # With coverage report
```

---

## 📦 BUILD & DEPLOYMENT

### Development

```bash
pnpm dev           # Start dev server with HMR
# Load dist/ folder in chrome://extensions
```

### Production

```bash
pnpm build         # Build for production
pnpm build:chrome  # Package for Chrome Web Store
pnpm build:firefox # Package for Firefox Add-ons
```

### Release Checklist

- [ ] All tests pass
- [ ] No TypeScript errors
- [ ] No ESLint warnings
- [ ] Version bumped in package.json & manifest.json
- [ ] CHANGELOG updated
- [ ] Icons included (16, 24, 32, 48, 128 px)

---

## 💡 AI ASSISTANT GUIDELINES

### When Writing Code

1. Always use TypeScript with strict types
2. Follow existing patterns in the codebase
3. Add JSDoc comments for exported functions
4. Create tests for new functionality
5. Use meaningful variable and function names

### When Adding Features

1. Check if similar functionality exists
2. Propose minimal changes
3. Consider extension size impact (keep bundle small)
4. Maintain offline-first principle
5. Test in both Chrome and Firefox

### When Fixing Bugs

1. Write a failing test first
2. Make minimal fix
3. Verify test passes
4. Check for related issues

### Commit Messages

Use conventional commits with emojis:

```
✨ feat(generator): add Ghana country support
🐛 fix(content): handle textarea elements correctly
📝 docs(readme): update installation instructions
♻️ refactor(popup): simplify country selection logic
🧪 test(generator): add phone number format tests
```

---

## 🚫 AVOID

- Using `any` type in TypeScript
- Inline styles (use Tailwind)
- Options API in Vue components
- External API dependencies
- Collecting user data
- Large bundle sizes
- Breaking changes without migration path

---

## ✅ ALWAYS

- Use `<script setup lang="ts">` in Vue
- Type all function parameters and returns
- Handle Chrome API errors gracefully
- Support both Chrome and Firefox
- Keep data generation deterministic when seeded
- Write tests for generators
- Document public APIs

---

_Makoki means "intelligence/capability" in Lingala 🧠_
_Made with ❤️ for African developers, by African developers._
