# Contributing to Makoki Test

Thank you for your interest in contributing to Makoki Test! 🧠

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Commit Convention](#commit-convention)
- [Pull Request Process](#pull-request-process)
- [Adding a New Country](#adding-a-new-country)

---

## Code of Conduct

Please be respectful and inclusive. We welcome contributions from developers of all backgrounds, especially those from African countries.

---

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm 8+
- Chrome or Firefox browser

### Setup

```bash
# Clone the repository
git clone https://github.com/nangui/makoki.git
cd makoki

# Install dependencies
pnpm install

# Start development server
pnpm dev

# Load extension in Chrome
# Go to chrome://extensions/ → Load unpacked → Select dist/
```

---

## Development Workflow

### Branch Strategy

| Branch      | Purpose                         |
| ----------- | ------------------------------- |
| `main`      | Production-ready code           |
| `develop`   | Integration branch for features |
| `feature/*` | New features                    |
| `fix/*`     | Bug fixes                       |
| `docs/*`    | Documentation updates           |

### Creating a Feature Branch

```bash
# Start from develop
git checkout develop
git pull origin develop

# Create your feature branch
git checkout -b feature/my-new-feature
```

---

## Commit Convention

We use [Conventional Commits](https://www.conventionalcommits.org/) with emoji prefixes. **All commits are validated by commitlint.**

### Format

```
<type>(<scope>): <subject>

[optional body]

[optional footer]
```

### Types

| Type       | Emoji | Description                  |
| ---------- | ----- | ---------------------------- |
| `feat`     | ✨    | New feature                  |
| `fix`      | 🐛    | Bug fix                      |
| `docs`     | 📝    | Documentation                |
| `style`    | 🎨    | Formatting (no code change)  |
| `refactor` | ♻️    | Code refactoring             |
| `perf`     | ⚡    | Performance improvement      |
| `test`     | 🧪    | Adding/updating tests        |
| `build`    | 📦    | Build system or dependencies |
| `ci`       | 👷    | CI configuration             |
| `chore`    | 🔧    | Maintenance tasks            |
| `revert`   | ⏪    | Revert a commit              |
| `init`     | 🎉    | Initial commit               |

### Scopes

| Scope        | Description          |
| ------------ | -------------------- |
| `background` | Service worker       |
| `content`    | Content scripts      |
| `popup`      | Popup UI             |
| `types`      | TypeScript types     |
| `data`       | Country data         |
| `generators` | Data generators      |
| `config`     | Configuration files  |
| `deps`       | Dependencies         |
| `eslint`     | ESLint configuration |
| `github`     | GitHub templates     |
| `cursor`     | Cursor rules         |
| `assets`     | Icons and images     |
| `scripts`    | Build scripts        |
| `release`    | Release process      |

### Examples

```bash
# Good ✅
git commit -m "feat(data): add Ghana country support"
git commit -m "fix(content): handle textarea elements correctly"
git commit -m "docs(readme): update installation instructions"
git commit -m "refactor(popup): simplify country selection logic"
git commit -m "test(generators): add phone number format tests"

# Bad ❌
git commit -m "fixed bug"           # No type, vague description
git commit -m "WIP"                 # Not descriptive
git commit -m "FEAT: add feature"   # Type should be lowercase
git commit -m "feat: Add Feature"   # Subject should be lowercase
```

### Invalid Commits Are Blocked

If your commit message doesn't follow the convention, it will be rejected:

```bash
$ git commit -m "added new feature"
⧗   input: added new feature
✖   subject may not be empty [subject-empty]
✖   type may not be empty [type-empty]

✖   found 2 problems, 0 warnings
```

---

## Pull Request Process

1. **Create a feature branch** from `develop`
2. **Make your changes** following code conventions
3. **Write/update tests** for your changes
4. **Commit** using conventional commits
5. **Push** your branch to GitHub
6. **Open a PR** to `develop` branch
7. **Fill out the PR template** completely
8. **Wait for review** and address feedback

### PR Checklist

- [ ] Code follows project style guidelines
- [ ] TypeScript types are strict (no `any`)
- [ ] Tests pass (`pnpm test`)
- [ ] Documentation is updated
- [ ] PR template is filled out

---

## Adding a New Country

Want to add support for a new African country? Here's how:

### 1. Create the Data Files

```bash
# Create country folder
mkdir -p src/data/countries/{CODE}

# Create required files
touch src/data/countries/{CODE}/names.json
touch src/data/countries/{CODE}/locations.json
touch src/data/countries/{CODE}/formats.json
```

### 2. Populate the Data

**names.json:**

```json
{
  "firstNames": {
    "male": ["Name1", "Name2", "..."],
    "female": ["Name1", "Name2", "..."],
    "neutral": []
  },
  "lastNames": ["Name1", "Name2", "..."]
}
```

**locations.json:**

```json
{
  "regions": [{ "code": "XX", "name": "Region Name" }],
  "cities": ["City1", "City2", "..."],
  "streetPatterns": ["{number} {name} Street"]
}
```

**formats.json:**

```json
{
  "phone": "+XXX XX XXX XXXX",
  "addressFormat": "{street}, {city}",
  "postalCode": "XXXXX"
}
```

### 3. Update Type Definitions

In `src/types/index.ts`:

```typescript
export type CountryCode = 'SN' | 'NG' | ... | 'XX'
```

### 4. Update Country Index

In `src/data/countries/index.ts`:

```typescript
{ code: 'XX', name: 'Country Name', flag: '🇽🇽', enabled: true }
```

### 5. Add Placeholder Data

In `src/content/index.ts`, add placeholder entries for the new country.

### 6. Write Tests

Create tests in `tests/unit/` for the new country data.

### 7. Open a PR

Use the "New Country Request" issue template to document your addition.

---

## Questions?

- Open a [Discussion](https://github.com/nangui/makoki/discussions)
- Create an [Issue](https://github.com/nangui/makoki/issues)

---

_Made with ❤️ for African developers, by African developers_ 🧠
