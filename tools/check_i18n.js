#!/usr/bin/env node
import path from 'path'
import { createI18n } from 'vue-i18n'
import translations from '../src/i18n/translations.js'

function collectKeys(obj, prefix = '') {
  const keys = []
  for (const k of Object.keys(obj)) {
    const val = obj[k]
    const full = prefix ? `${prefix}.${k}` : k
    if (typeof val === 'string' || typeof val === 'number' || Array.isArray(val)) {
      keys.push(full)
    } else if (typeof val === 'object' && val !== null) {
      keys.push(...collectKeys(val, full))
    }
  }
  return keys
}

function run() {
  console.log('Checking i18n messages for parsing errors...')
  let i18n
  try {
    i18n = createI18n({ legacy: false, locale: 'en', fallbackLocale: 'en', messages: translations })
  } catch (err) {
    console.error('createI18n failed:', err)
    process.exit(2)
  }

  const locales = Object.keys(translations)
  for (const locale of locales) {
    console.log(`\nLocale: ${locale}`)
    const keys = collectKeys(translations[locale])
    for (const key of keys) {
      try {
        const msg = i18n.global.t(key, {}, locale)
        // Print only if message contains suspicious characters
        if (/\{|\}|@|%|\|/.test(msg)) {
          console.log(`  OK: ${key} -> ${String(msg).slice(0,120)}`)
        }
      } catch (err) {
        console.error(`\nERROR while formatting key '${key}' for locale '${locale}':`, err && err.message ? err.message : err)
        process.exit(3)
      }
    }
  }

  console.log('\nAll messages formatted successfully.')
}

run()
