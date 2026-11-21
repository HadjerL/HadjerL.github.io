import i18n from 'i18next'
import HttpBackend, { type HttpBackendOptions } from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'
import type { Language } from '../types/portfolio'

const namespace = 'translation'

function getInitialLanguage(): Language {
  try {
    const saved = localStorage.getItem('lng')
    if (saved === 'en' || saved === 'fr') return saved
  } catch { /* storage unavailable */ }

  return navigator.language.startsWith('fr') ? 'fr' : 'en'
}

function hasTranslations(language: Language) {
  const headline: unknown = i18n.getResource(language, namespace, 'headline')
  return typeof headline === 'string' && headline.trim().length > 0
}

export async function initializeTranslations() {
  const requestedLanguage = getInitialLanguage()

  i18n.on('languageChanged', () => {
    document.documentElement.lang = i18n.resolvedLanguage || 'en'
  })

  await i18n.use(HttpBackend).use(initReactI18next).init<HttpBackendOptions>({
    lng: requestedLanguage,
    supportedLngs: ['en', 'fr'],
    fallbackLng: 'en',
    load: 'languageOnly',
    ns: [namespace],
    defaultNS: namespace,
    maxRetries: 0,
    interpolation: { escapeValue: false },
    parseMissingKeyHandler: (_key, defaultValue) => defaultValue ?? '',
    backend: {
      loadPath: `${import.meta.env.BASE_URL}locales/{{lng}}/{{ns}}.json`,
      requestOptions: () => {
        const controller = new AbortController()
        window.setTimeout(() => controller.abort(), 8000)
        return { signal: controller.signal }
      },
    },
  })

  if (hasTranslations(requestedLanguage)) return { usedFallback: false }
  if (!hasTranslations('en')) return null

  await i18n.changeLanguage('en')
  return { usedFallback: true }
}

export async function changePortfolioLanguage(language: Language) {
  if (!hasTranslations(language)) await i18n.loadLanguages(language)
  if (!hasTranslations(language)) return false

  await i18n.changeLanguage(language)
  try {
    localStorage.setItem('lng', language)
  } catch { /* storage unavailable */ }
  return true
}
