import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { caseStudies, caseStudyPath, type CaseStudy } from '../data/caseStudies'
import { usePortfolioLanguage, useTheme } from '../hooks/portfolioPreferences'
import type { Project } from '../types/portfolio'
import { GardenSky, SiteFooter, SiteHeader } from './SiteLayout'
import { QubeLinkArchitectureDiagram } from './QubeLinkArchitectureDiagram'
import { Sprite } from './Sprite'
import { WindArchitectureDiagram } from './WindArchitectureDiagram'

interface Props {
  study: CaseStudy
  project: Project
  initialLanguageFailed: boolean
}

export function CaseStudyPage({ study, project, initialLanguageFailed }: Props) {
  const { t } = useTranslation()
  const [theme, toggleTheme] = useTheme()
  const { currentLanguage, languageState, setLang } = usePortfolioLanguage(initialLanguageFailed)
  const base = import.meta.env.BASE_URL
  const key = `caseStudies.${study.projectId}`
  const projectKey = `projects.${project.id}`
  const related = caseStudies.filter((candidate) => study.relatedProjectIds?.includes(candidate.projectId))

  useEffect(() => {
    const anchor = window.location.hash.slice(1)
    if (anchor) document.getElementById(anchor)?.scrollIntoView()
  }, [])

  return (
    <>
      <a className="skip-link" href="#main-content">{t('skipToContent')}</a>
      <GardenSky />
      <SiteHeader
        homeHref={base}
        theme={theme}
        toggleTheme={toggleTheme}
        nextLanguage={currentLanguage === 'fr' ? 'en' : 'fr'}
        languagePending={languageState === 'loading'}
        onLanguageChange={setLang}
      />
      {languageState === 'failed' && <p className="px card language-notice" role="status">{t('languageLoadError')}</p>}
      <main className="study-main" id="main-content" tabIndex={-1}>
        <a href={`${base}#projects`}>{t('caseStudyUi.back')}</a>
        <article className="px study">
          <header className="study-heading">
            <Sprite name="flower" pal={{ o: project.petal }} scale={4} />
            <h1>{t(`${projectKey}.title`)}</h1>
            {project.status && <p>{t(`projectStatus.${project.status}`)}</p>}
          </header>
          <nav aria-label={t('caseStudyUi.contents')}>
            <ul>
              {study.sections.map((section) => (
                <li key={section}><a href={`#${section}`}>{t(`${key}.${section}.title`)}</a></li>
              ))}
              <li><a href="#technologies">{t('caseStudyUi.technologies')}</a></li>
            </ul>
          </nav>
          {study.sections.map((section) => (
            <section id={section} key={section}>
              <h2>{t(`${key}.${section}.title`)}</h2>
              {t(`${key}.${section}.body`).split('\n\n').map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {study.projectId === 'wind' && section === 'architecture' && <WindArchitectureDiagram />}
              {study.projectId === 'qube' && section === 'implementation' && <QubeLinkArchitectureDiagram />}
            </section>
          ))}
          <section id="technologies">
            <h2>{t('caseStudyUi.technologies')}</h2>
            <ul className="study-technologies">
              {project.technologies.map((technology) => <li key={technology}>{technology}</li>)}
            </ul>
            {project.url && <a href={project.url}>{t(`${projectKey}.link`)}</a>}
          </section>
          {related.length > 0 && (
            <section>
              <h2>{t('caseStudyUi.related')}</h2>
              <ul>
                {related.map((candidate) => (
                  <li key={candidate.projectId}>
                    <a href={base + caseStudyPath(candidate)}>
                      {t(`projects.${candidate.projectId}.title`)}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}
          <a href={`${base}#contact`}>{t('touch')}</a>
        </article>
      </main>
      <SiteFooter />
    </>
  )
}
