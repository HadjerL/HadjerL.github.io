import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Education, Experience } from './components/CareerSections'
import { Contact, Overview, Skills, Writing } from './components/PortfolioSections'
import { ProjectSection } from './components/ProjectSection'
import { GardenSky, Hero, SectionNav, SiteFooter, SiteHeader } from './components/SiteLayout'

import { usePortfolioLanguage, useTheme } from './hooks/portfolioPreferences'

const SECTIONS = ['overview', 'projects', 'experience', 'stack', 'education', 'writing', 'contact']

function useActiveSection() {
  const [active, setActive] = useState('overview')
  useEffect(() => {
    const obs = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: '-30% 0px -60% 0px' })
    SECTIONS.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el) })
    // A direct link may arrive before the translated sections are mounted.
    const anchor = window.location.hash.slice(1)
    if (anchor) document.getElementById(anchor)?.scrollIntoView()
    return () => obs.disconnect()
  }, [])
  return active
}

export default function App({ initialLanguageFailed }: { initialLanguageFailed: boolean }) {
  const { t } = useTranslation()
  const [theme, toggleTheme] = useTheme()
  const active = useActiveSection()
  const [query, setQuery] = useState('')
  const searchRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.defaultPrevented || e.isComposing || e.ctrlKey || e.altKey || e.metaKey) return
      const inSearch = e.target === searchRef.current
      const isEditing = e.target instanceof HTMLElement &&
        (e.target.isContentEditable || e.target.matches('input, textarea, select'))
      if (isEditing && !inSearch) return

      if (e.key === '/' && !inSearch) {
        e.preventDefault()
        searchRef.current?.focus()
      }
      if (e.key === 'Escape') {
        setQuery('')
        if (inSearch) searchRef.current?.blur()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const onSearch = (value: string) => {
    setQuery(value)
    if (value) document.getElementById('projects')?.scrollIntoView()
  }
  const { currentLanguage, languageState, setLang } = usePortfolioLanguage(initialLanguageFailed)

  return (
    <>
      <a className="skip-link" href="#main-content">{t('skipToContent')}</a>
      <GardenSky />
      <SiteHeader
        search={(
          <input
            ref={searchRef}
            className="search"
            value={query}
            placeholder={t('search')}
            aria-label={t('search')}
            onChange={(event) => onSearch(event.target.value)}
          />
        )}
        theme={theme}
        toggleTheme={toggleTheme}
        nextLanguage={currentLanguage === 'fr' ? 'en' : 'fr'}
        languagePending={languageState === 'loading'}
        onLanguageChange={setLang}
      />
      {languageState === 'failed' && (
        <p className="px card language-notice" role="status">{t('languageLoadError')}</p>
      )}
      <main id="main-content" tabIndex={-1}>
        <Hero theme={theme} currentLanguage={currentLanguage} />
        <SectionNav sections={SECTIONS} active={active} />
        <div className="wrap">
          <Overview />
          <div className="content">
            <ProjectSection query={query} />
            <Experience />
            <Skills />
            <Education />
            <Writing />
            <Contact />
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
