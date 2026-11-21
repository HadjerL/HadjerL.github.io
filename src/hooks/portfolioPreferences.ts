import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { changePortfolioLanguage } from '../i18n/config'
import type { Language, Theme } from '../types/portfolio'

export function useTheme(): [Theme, () => void] {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      const saved = localStorage.getItem('theme')
      if (saved === 'light' || saved === 'dark') return saved
    } catch { /* ignore */ }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try { localStorage.setItem('theme', theme) } catch { /* ignore */ }
  }, [theme])
  return [theme, () => setTheme(theme === 'dark' ? 'light' : 'dark')]
}

export function usePortfolioLanguage(initialLanguageFailed: boolean) {
  const { i18n } = useTranslation()
  const [languageState, setLanguageState] = useState<'idle' | 'loading' | 'failed'>(
    initialLanguageFailed ? 'failed' : 'idle',
  )
  const setLang = async (language: Language) => {
    if (languageState === 'loading') return
    setLanguageState('loading')
    try {
      const changed = await changePortfolioLanguage(language)
      setLanguageState(changed ? 'idle' : 'failed')
    } catch {
      setLanguageState('failed')
    }
  }
  const currentLanguage: Language = i18n.resolvedLanguage === 'fr' ? 'fr' : 'en'
  return { currentLanguage, languageState, setLang }
}
