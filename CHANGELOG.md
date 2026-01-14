# Changelog

All notable changes to Makoki Test will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-12-22

### Added

- 🎉 Initial release of Makoki Test Chrome Extension
- 🌍 Support for 7 African countries:
  - 🇸🇳 Senegal (SN)
  - 🇳🇬 Nigeria (NG)
  - 🇰🇪 Kenya (KE)
  - 🇿🇦 South Africa (ZA)
  - 🇪🇬 Egypt (EG)
  - 🇨🇬 Republic of the Congo (CG)
  - 🇨🇩 Democratic Republic of the Congo (CD)

- ✨ Core features:
  - **Name Generation**: Authentic first names, last names, and full names by country and gender
  - **Phone Numbers**: Country-specific phone number formats with correct patterns
  - **Addresses**: Real cities, regions, and street addresses using GADM spatial data
  - **Emails**: Realistic email addresses with local domains

- 🎯 User Experience:
  - Right-click context menu integration
  - Smart field detection
  - Visual feedback on data insertion
  - Popup interface for country and gender selection
  - Settings persistence using Chrome Storage API

- 🛠️ Technical Features:
  - TypeScript with strict mode
  - Vue.js 3 Composition API for popup UI
  - Tailwind CSS for styling
  - Manifest V3 compliance
  - Offline-first architecture (no external API calls)
  - 100% privacy-focused (no data collection)

- 📊 Data Sources:
  - Curated African names database
  - GADM (Global Administrative Areas) geographic data
  - Country-specific phone format patterns
  - Authentic street names and neighborhoods

- 🧪 Testing:
  - Unit tests for all generators (62 tests)
  - Vitest test framework
  - Test coverage for name, phone, address, and email generators

- 📚 Documentation:
  - Comprehensive README
  - Product Requirements Document (PRD)
  - Brand Guidelines
  - Contributing guidelines
  - GitHub issue and PR templates

### Security

- ✅ No external API calls
- ✅ No analytics or tracking
- ✅ All data generated locally
- ✅ No user data collection
- ✅ Minimal permissions (contextMenus, storage, activeTab)

---

## [Unreleased]

### Planned

- 🔜 Firefox support
- 🔜 Additional countries (Ghana, Côte d'Ivoire, Cameroon, etc.)
- 🔜 Bulk form filling
- 🔜 Saved test profiles
- 🔜 API for developers
- 🔜 VS Code extension
- 🔜 npm package

---

[1.0.0]: https://github.com/nangui/makoki/releases/tag/v1.0.0
