#!/usr/bin/env node

/**
 * Package Firefox Extension
 * Creates a .zip file ready for Firefox Add-ons upload
 * Note: Firefox uses manifest v2 format with some differences
 */

import { createWriteStream, existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import archiver from 'archiver'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const rootDir = join(__dirname, '..')

async function packageFirefox() {
  const distDir = join(rootDir, 'dist')
  const releasesDir = join(rootDir, 'releases')
  const firefoxDistDir = join(rootDir, 'dist-firefox')

  // Check if dist exists
  if (!existsSync(distDir)) {
    console.error('❌ Error: dist folder not found. Run "pnpm build" first.')
    process.exit(1)
  }

  // Create releases folder if it doesn't exist
  if (!existsSync(releasesDir)) {
    mkdirSync(releasesDir, { recursive: true })
  }

  // Get version from package.json
  const packageJson = await import(join(rootDir, 'package.json'), {
    assert: { type: 'json' },
  })
  const version = packageJson.default.version

  const outputPath = join(releasesDir, `makoki-firefox-v${version}.zip`)

  console.log(`📦 Packaging Firefox extension v${version}...`)
  console.log('⚠️  Note: Firefox support requires manifest modifications')

  const output = createWriteStream(outputPath)
  const archive = archiver('zip', { zlib: { level: 9 } })

  output.on('close', () => {
    console.log(`✅ Created: ${outputPath}`)
    console.log(`   Size: ${(archive.pointer() / 1024).toFixed(2)} KB`)
  })

  archive.on('error', err => {
    throw err
  })

  archive.pipe(output)
  archive.directory(distDir, false)
  await archive.finalize()
}

packageFirefox().catch(console.error)
