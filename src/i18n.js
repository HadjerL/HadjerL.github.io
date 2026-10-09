import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import resources from './locales'

let lng = 'en'
try {
  lng = localStorage.getItem('lng') || (navigator.language.startsWith('fr') ? 'fr' : 'en')
} catch { /* storage unavailable */ }

i18n.use(initReactI18next).init({
  resources,
  lng,
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
})

export default i18n
