# Product Requirements Document (PRD)

## Makoki Test - African Test Data Generation Extension

### 📋 Executive Summary

**Product**: Makoki Test - Browser extension for automatic generation of contextualized test data for Africa
**Version**: 1.0 (MVP)
**Date**: December 2025
**Author**: Adonai NANGUI
**Priority**: Chrome (primary), Firefox (secondary)

---

## 🎯 Product Vision

### Problem to Solve

African developers constantly use Western test data (Lorem Ipsum, John Doe, 123 Main Street) that doesn't reflect their local reality. This creates:

- Less relevant tests for African applications
- Disconnect between development and production environments
- Difficulties identifying issues related to local data formats
- Lack of representation in development tools

### Proposed Solution

A browser extension that allows instantly generating realistic test data based on African context via a simple right-click on any form field.

### Unique Value Proposition

- **Authentic African data**: Names, addresses, cities based on real data
- **Seamless integration**: Right-click → selection → automatic insertion
- **GADM database**: Precise and official spatial data
- **Multi-country**: Support for multiple African countries

---

## 👥 Target Personas

### Primary Persona: African Full-Stack Developer

- **Name**: Fatou Diallo
- **Age**: 28 years old
- **Location**: Dakar, Senegal
- **Context**: Develops applications for local clients
- **Frustrations**:
  - Wastes time inventing realistic test data
  - Western data doesn't pass local validations
  - Difficult to test edge cases specific to Africa

### Secondary Persona: QA Tester

- **Name**: Kwame Mensah
- **Age**: 25 years old
- **Location**: Accra, Ghana
- **Context**: Tests African e-commerce applications
- **Needs**:
  - Varied data to test different scenarios
  - Correct address formats by country
  - Names representative of different ethnicities

---

## 🚀 Main Features

### MVP (Version 1.0)

#### 1. Personal Data Generation

- **First names**: Database of African first names by country/region
  - Male/Female/Neutral
  - Variation by ethnicity/region
- **Last names**: Authentic surnames by country
- **Full names**: Intelligent combination of first name + last name
- **Email**: Generation based on name (e.g., fatou.diallo@domain.com)
- **Phone number**: Correct format by country (+221 77 XXX XX XX for Senegal)

#### 2. Geographic Data Generation

- **Countries**: Complete list of African countries
- **Cities**: Main and secondary cities (GADM data)
- **Regions/Provinces**: Level 1 administrative divisions
- **Departments**: Level 2 administrative divisions
- **Complete addresses**: Authentic format by country
  - Street/Avenue with local names
  - Neighborhood
  - Postal code (if applicable)
  - City, Region, Country

#### 3. Business Data Generation

- **Company names**: Typical African patterns
- **NINEA/RC numbers**: Commercial identification formats by country
- **Business sectors**: Based on local economy

#### 4. User Interface

- **Context menu**: Right-click on any input
- **Clear categorization**:
  ```
  Generate Test Data >
    ├── Personal >
    │   ├── First Name
    │   ├── Last Name
    │   ├── Full Name
    │   └── Email
    ├── Location >
    │   ├── Country
    │   ├── City
    │   ├── Street Address
    │   └── Full Address
    └── Contact >
        ├── Phone Number
        └── Mobile Number
  ```
- **Automatic detection**: Suggestion based on field attributes (name, id, placeholder)
- **Direct insertion**: Automatic filling of the selected field

### Version 1.1 (Future Improvements)

- **Mass generation**: Fill all fields of a form
- **Saved profiles**: Reuse test personas
- **REST API**: Endpoint to generate data programmatically
- **Banking data**: IBAN/Local account formats
- **Cultural dates**: Religious and national holidays
- **Local languages**: Wolof, Swahili, Hausa support, etc.

---

## 🔧 Technical Specifications

### Architecture

```
makoki/
├── manifest.json           # Chrome/Firefox configuration
├── src/
│   ├── background/
│   │   └── index.ts        # Main Service Worker
│   ├── content/
│   │   └── index.ts        # Injection script & field detection
│   ├── data/
│   │   └── countries/      # Data by country
│   │       ├── SN/         # Senegal
│   │       ├── NG/         # Nigeria
│   │       └── ...
│   ├── generators/
│   │   ├── name.ts         # Personal data generators
│   │   ├── location.ts     # Geographic generators
│   │   └── phone.ts        # Phone number generators
│   ├── popup/
│   │   ├── App.vue         # Configuration interface
│   │   └── main.ts
│   ├── lib/                # Shared utilities
│   └── types/              # TypeScript definitions
├── public/
│   └── icons/              # Extension icons
└── scripts/
    └── package-*.js        # Build scripts
```

### Tech Stack

- **Language**: TypeScript (strict mode)
- **UI Framework**: Vue.js 3 (Composition API)
- **Build Tool**: Vite + @crxjs/vite-plugin
- **Styling**: Tailwind CSS
- **Testing**: Vitest + Vue Test Utils
- **Manifest Version**: V3 (Chrome), V2/V3 (Firefox)
- **Storage**: Chrome Storage API for preferences
- **Data Format**: Compressed JSON

### Required Permissions

```json
{
  "permissions": ["contextMenus", "activeTab", "storage"],
  "host_permissions": ["<all_urls>"]
}
```

### Data Sources

#### GADM (Database of Global Administrative Areas)

- **URL**: https://gadm.org/
- **Usage**: Extraction of administrative boundaries and official names
- **Processing**:
  1. Download level 0, 1, 2 shapefiles for each African country
  2. Extract names of administrative entities
  3. Convert to optimized JSON
  4. Compression and storage in extension

#### First/Last Name Databases

- Public and crowdsourced sources
- Validation by native speakers
- Classification by:
  - Country/Region
  - Gender
  - Usage frequency
  - Ethnic/linguistic origin

---

## 🎨 UX/UI Guidelines

### Design Principles

1. **Speed**: Maximum 2 clicks to generate data
2. **Context**: Intelligent suggestions based on field
3. **Discretion**: Minimal interface that doesn't obstruct workflow
4. **Accessibility**: Keyboard support (shortcuts)

### Main User Flow

1. User right-clicks on a form field
2. Context menu appears with "Generate Test Data"
3. Hierarchical submenu to choose data type
4. Data generated and automatically inserted
5. Subtle confirmation notification

### Configuration Interface (Popup)

- **Default country**: Main country selection
- **Preferred format**: Format configuration (phone, address)
- **History**: Last generated data
- **Statistics**: Number of generations by type

---

## 📊 Success Metrics

### Main KPIs

- **Adoption**: 1000+ active installations in 3 months
- **Engagement**: 50+ generations per user/month
- **Retention**: 60% active users after 30 days
- **Coverage**: Support for 10+ African countries

### Secondary Metrics

- Average generation time < 100ms
- Error rate < 0.1%
- Chrome Web Store average rating > 4.5/5
- Community contributions (new data)

---

## 🚦 Roadmap

### Phase 1: MVP (Month 1-2)

- [ ] Setup base architecture
- [ ] GADM data integration for 5 priority countries
- [ ] Basic generators (name, address, phone)
- [ ] Functional context menu
- [ ] Testing and debugging

### Phase 2: Enrichment (Month 3-4)

- [ ] Support 10+ countries
- [ ] Configuration interface
- [ ] Intelligent field detection
- [ ] Performance optimization

### Phase 3: Expansion (Month 5-6)

- [ ] Port to Firefox
- [ ] Public API
- [ ] Mass generation
- [ ] Integration with testing tools (Cypress, Playwright)

---

## 🏷️ Brand Identity

### Chosen Name: **Makoki Test**

- **Origin**: "Makoki" = "Intelligence/Capability" in Lingala (DRC, Congo)
- **Pronunciation**: ma-KO-ki test
- **Message**: Smart tests with relevant data
- **Tagline**: "Smart Test Data for African Developers"

### Branding Elements

- **Main domain**: makokitest.dev or makoki.dev
- **Logo concept**: Stylized brain with African patterns or intelligence symbol combined with African geometric patterns
- **Suggested colors**:
  - Primary: Emerald green (#10B981) - Growth, intelligence
  - Secondary: Warm orange (#F59E0B) - African energy
  - Accent: Deep blue (#1E40AF) - Trust, technology

### Online Presence

- **GitHub**: github.com/nangui/makoki
- **Website**: makokitest.dev
- **Documentation**: docs.makokitest.dev
- **Twitter/X**: @MakokiTest

---

## ⚠️ Considerations and Risks

### Technical Challenges

- **Package size**: Optimization needed for GADM data
- **Performance**: Fast generation without lag
- **Compatibility**: Differences between Chrome and Firefox

### Data Challenges

- **Accuracy**: Data validation by locals
- **Representativeness**: Balance between countries/regions
- **Maintenance**: Regular data updates

### Legal Considerations

- **GDPR/Data Protection**: No real personal data
- **Licenses**: Verification of rights on GADM data
- **Open Source**: MIT License

---

## 📝 Implementation Notes

### Development Priorities

1. **Core Engine**: Modular and extensible generation system
2. **Data Pipeline**: GADM import and transformation scripts
3. **Chrome Extension**: Focus on Manifest V3
4. **Testing**: Automated test suite (Vitest)

### Best Practices

- Modular code to facilitate adding new countries
- Inline documentation in English
- Internationalization from the start (i18n)
- Contribution guidelines for the community

### Developer Attention Points

- Use modern Chrome APIs (Manifest V3)
- Implement a cache system for performance
- Plan offline mode (all embedded data)
- Fallback system if field detection fails
- Detailed logs for debugging

---

## 📞 Contact and Support

**Product Owner**: Adonai NANGUI
**Repository**: https://github.com/nangui/makoki
**Documentation**: [To be created]
**Community**: [Discord/Slack to be created]

---

_This is a living document and will be updated regularly based on user feedback and product evolution._
