import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

function translationKeys(value, prefix = '') {
  assert.ok(value && typeof value === 'object' && !Array.isArray(value), `Invalid translation object at ${prefix || 'root'}`)
  return Object.entries(value).flatMap(([key, item]) => {
    const path = prefix ? `${prefix}.${key}` : key
    if (typeof item !== 'string') return translationKeys(item, path)
    assert.ok(item.trim(), `Empty translation at ${path}`)
    return path
  }).sort()
}

const [english, french] = ['en', 'fr'].map((language) => {
  const file = new URL(`../public/locales/${language}/translation.json`, import.meta.url)
  return translationKeys(JSON.parse(readFileSync(file, 'utf8')))
})
assert.deepEqual(french, english, 'English and French translation keys must match')

console.log(`Verified ${english.length} translation keys in English and French.`)
