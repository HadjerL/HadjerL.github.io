import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import ts from 'typescript'

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

const registry = new URL('../src/data/caseStudies.ts', import.meta.url)
const { outputText } = ts.transpileModule(readFileSync(registry, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.ESNext },
})
const { caseStudies, caseStudyPath } = await import(`data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`)
for (const study of caseStudies) {
  const entry = new URL(`../${caseStudyPath(study)}index.html`, import.meta.url)
  assert.ok(readFileSync(entry, 'utf8').includes(`data-project-id="${study.projectId}"`), `Wrong project ID in ${entry.pathname}`)
  for (const section of study.sections) {
    for (const field of ['title', 'body']) {
      const key = `caseStudies.${study.projectId}.${section}.${field}`
      assert.ok(english.includes(key), `Missing case-study translation ${key}`)
    }
  }
}

const windDiagramFields = [
  'title', 'source', 'simulator', 'publish', 'broker', 'stream', 'web', 'dashboard',
  'administration', 'inferenceExchange', 'lifecycleExchange', 'edge', 'inference', 'lifecycle', 'description',
]
for (const field of windDiagramFields) {
  assert.ok(english.includes(`caseStudies.wind.diagram.${field}`), `Missing wind diagram translation ${field}`)
}

for (const field of ['title', 'broker', 'exchange', 'firmware', 'outlet', 'connectionLed', 'separateComponents', 'app', 'powerLed', 'description']) {
  assert.ok(english.includes(`caseStudies.qube.diagram.${field}`), `Missing QubeLink diagram translation ${field}`)
}

console.log(`Verified ${english.length} translation keys in English and French.`)
