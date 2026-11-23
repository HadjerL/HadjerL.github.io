import { useTranslation } from 'react-i18next'
import type { ReactNode } from 'react'
import { profile } from '../data/profile'
import type { Language, Theme } from '../types/portfolio'
import { Sprite } from './Sprite'

interface SiteHeaderProps {
  search?: ReactNode
  homeHref?: string
  theme: Theme
  toggleTheme: () => void
  nextLanguage: Language
  languagePending: boolean
  onLanguageChange: (language: Language) => void
}

const FLIES = Array.from({ length: 16 }, (_, i) => ({ l: (i * 37 + 11) % 100, delay: (i * 7) % 11, dur: 9 + ((i * 3) % 8) }))

export function GardenSky() {
  return (
    <div className="sky" aria-hidden="true">
      {FLIES.map((f, i) => <i key={i} className="fly" style={{ left: `${f.l}%`, animationDelay: `-${f.delay}s`, animationDuration: `${f.dur}s` }} />)}
    </div>
  )
}

export function SiteHeader({ search, homeHref = '#top', theme, toggleTheme, nextLanguage, languagePending, onLanguageChange }: SiteHeaderProps) {
  const { t } = useTranslation()
  return (
    <header className="hud">
      <a href={homeHref} className="brand"><Sprite name="flower" scale={3} pal={{ o: 'var(--ac)' }} /> <span>{profile.username}</span></a>
      {search}
      <div className="spacer" />
      <button className="pxbtn" onClick={() => onLanguageChange(nextLanguage)} aria-label={t(`switchLanguage.${nextLanguage}`)} aria-disabled={languagePending || undefined}>{nextLanguage.toUpperCase()}</button>
      <button className="pxbtn" onClick={toggleTheme} aria-label={t(theme === 'dark' ? 'useLightTheme' : 'useDarkTheme')}>{theme === 'dark' ? '☀' : '☾'}</button>
    </header>
  )
}

export function Hero({ theme, currentLanguage }: { theme: Theme; currentLanguage: Language }) {
  const { t } = useTranslation()
  return (
    <div className="hero" id="top">
      <Sprite className="orb" name={theme === 'dark' ? 'moon' : 'sun'} scale={8} />
      <Sprite className="gardener" name="gardener" scale={9} />
      <div className="sign px">
        <h1>Hadjer Laissaoui</h1>
        <p className="hero-headline">{t('headline')}</p>
        <p className="hero-credentials">{t('credentials')}</p>
        <p>{t('intro')}</p>
        <p><a className="hero-role" href="#experience">{t('currentRole')}</a></p>
        <p className="hero-availability">{t('availability')}</p>
        <div className="hero-actions">
          <a className="pxbtn" href="#projects">{t('explore')}</a>
          <a className="pxbtn" href={profile.cvUrls[currentLanguage]} download>{t('downloadCv')}</a>
          <a className="pxbtn" href="#contact">{t('touch')}</a>
        </div>
      </div>
      <div className="grass" />
    </div>
  )
}

export function SectionNav({ sections, active }: { sections: readonly string[]; active: string }) {
  const { t } = useTranslation()
  return (
    <nav className="posts">
      {sections.map((s) => <a key={s} href={`#${s}`} className={`post ${active === s ? 'on' : ''}`}>{t(`nav.${s}`)}</a>)}
    </nav>
  )
}

export function SiteFooter() {
  return (
    <footer>
      <div className="meadow">
        {['#F05070', '#FFC857', '#B48EF7', '#2DB5D0', '#FF8FA8'].flatMap((c, i) => [
          <Sprite key={`f${i}`} name="flower" scale={4} pal={{ o: c }} />,
          i % 2 === 0 ? <Sprite key={`m${i}`} name="mushroom" scale={4} /> : null,
        ])}
      </div>
      <p>© 2026 Hadjer Laissaoui · React + Vite + i18next</p>
    </footer>
  )
}
