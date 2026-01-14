# 🧠 Makoki Test

> Smart African test data generator for developers

[![GitHub release](https://img.shields.io/github/v/release/nangui/makoki?include_prereleases)](https://github.com/nangui/makoki/releases)
[![License](https://img.shields.io/github/license/nangui/makoki)](https://github.com/nangui/makoki/blob/main/LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/nangui/makoki)](https://github.com/nangui/makoki/issues)
[![GitHub stars](https://img.shields.io/github/stars/nangui/makoki)](https://github.com/nangui/makoki/stargazers)
![Chrome](https://img.shields.io/badge/Chrome-Manifest%20V3-orange.svg)
![Vue](https://img.shields.io/badge/Vue.js-3.4-brightgreen.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)

Generate authentic African test data with one click! Makoki Test is a Chrome/Firefox extension that helps developers fill forms with realistic African names, addresses, and phone numbers instead of generic "John Doe" and "123 Main Street".

## ✨ Features

- 🌍 **10+ African Countries** - Senegal, Nigeria, Kenya, South Africa, Egypt, and more
- 👤 **Authentic Names** - Real first and last names from each country
- 📍 **Real Locations** - Cities and regions from GADM spatial data
- 📞 **Correct Phone Formats** - Country-specific phone number patterns
- ⚡ **Instant Generation** - Right-click on any input field
- 🎯 **Smart Detection** - Automatically detects field types
- 💾 **Offline First** - Works without internet connection
- 🔒 **Privacy Focused** - No data collection, everything runs locally

## 🚀 Quick Start

### Install from Chrome Web Store

```
Coming soon!
```

### Install from Source

1. Clone the repository:

```bash
git clone https://github.com/nangui/makoki.git
cd makoki
```

2. Install dependencies:

```bash
pnpm install
```

3. Build the extension:

```bash
pnpm build
```

4. Load in Chrome:
   - Open `chrome://extensions`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the `dist` folder

## 🎮 How to Use

1. **Right-click** on any input field
2. Select **"Generate Test Data"**
3. Choose the type of data you need:
   - 👤 Personal (Name, Email)
   - 📍 Location (City, Address)
   - 📞 Contact (Phone, Mobile)
4. The field is instantly filled with authentic African data!

## 🌍 Supported Countries

| Country                             | Names | Cities | Phone | Address |
| ----------------------------------- | ----- | ------ | ----- | ------- |
| 🇸🇳 Senegal                          | ✅    | ✅     | ✅    | ✅      |
| 🇳🇬 Nigeria                          | ✅    | ✅     | ✅    | ✅      |
| 🇰🇪 Kenya                            | ✅    | ✅     | ✅    | ✅      |
| 🇿🇦 South Africa                     | ✅    | ✅     | ✅    | ✅      |
| 🇪🇬 Egypt                            | ✅    | ✅     | ✅    | ✅      |
| 🇨🇬 Republic of the Congo            | 🔜    | 🔜     | 🔜    | 🔜      |
| 🇨🇩 Democratic Republic of the Congo | 🔜    | 🔜     | 🔜    | 🔜      |
| 🇩🇿 Algeria                          | 🔜    | 🔜     | 🔜    | 🔜      |
| 🇬🇭 Ghana                            | 🔜    | 🔜     | 🔜    | 🔜      |
| 🇨🇮 Côte d'Ivoire                    | 🔜    | 🔜     | 🔜    | 🔜      |
| 🇨🇲 Cameroon                         | 🔜    | 🔜     | 🔜    | 🔜      |
| 🇹🇳 Tunisia                          | 🔜    | 🔜     | 🔜    | 🔜      |
| 🇲🇦 Morocco                          | 🔜    | 🔜     | 🔜    | 🔜      |

## 🛠️ Development

### Tech Stack

- **TypeScript** - Type-safe code
- **Vue.js 3** - Popup interface
- **Vite** - Fast build tool
- **Tailwind CSS** - Styling
- **Chrome Extension Manifest V3** - Modern extension API
- **GADM Data** - Accurate geographic data

### Project Structure

```
makoki/
├── src/
│   ├── background/     # Service worker
│   ├── content/        # Content scripts
│   ├── popup/          # Vue.js popup UI
│   ├── generators/     # Data generation logic
│   └── data/          # Country-specific data
├── tests/             # Unit & E2E tests
└── scripts/           # Build scripts
```

### Development Commands

```bash
# Install dependencies
pnpm install

# Start development mode
pnpm dev

# Run tests
pnpm test

# Build for production
pnpm build

# Build for Chrome
pnpm build:chrome

# Build for Firefox
pnpm build:firefox
```

## 🤝 Contributing

We welcome contributions! Especially:

- 📊 **More country data** - Add your country's names and cities
- 🌐 **Translations** - Help translate the UI
- 🐛 **Bug reports** - Found an issue? Let us know
- ✨ **Feature requests** - Ideas to make Makoki Test better

### Adding a New Country

1. Create a new folder in `src/data/countries/[COUNTRY_CODE]/`
2. Add these files:
   - `names.json` - First and last names
   - `locations.json` - Cities and regions
   - `formats.json` - Phone and address formats
3. Update the country list in `src/data/countries/index.ts`
4. Submit a PR!

## 📝 Data Sources

- **Names**: Curated from public sources and validated by native speakers
- **Geographic Data**: [GADM](https://gadm.org/) - Database of Global Administrative Areas
- **Phone Formats**: ITU-T E.164 standards

## 🔒 Privacy

Makoki Test is 100% private:

- ✅ No data collection
- ✅ No analytics
- ✅ No external API calls
- ✅ All data generated locally
- ✅ Open source code

## 📄 License

MIT License - see [LICENSE](LICENSE) file

## 👨‍💻 Author

**Adonai NANGUI**

- GitHub: [@nangui](https://github.com/nangui)
- LinkedIn: [Adonai NANGUI](https://www.linkedin.com/in/adonai-nangui)

## 🙏 Acknowledgments

- GADM for geographic data
- All contributors who provided name data
- The African developer community

## 🗺️ Roadmap

- [x] Chrome extension MVP
- [x] 5 initial countries
- [ ] Firefox support
- [ ] 20+ countries
- [ ] API for developers
- [ ] VS Code extension
- [ ] npm package

---

**Makoki Test** - "Makoki" means intelligence/capability in Lingala 🧠

Made with ❤️ for African developers, by African developers.
