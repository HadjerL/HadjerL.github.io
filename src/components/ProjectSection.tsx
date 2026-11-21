import type { TFunction } from 'i18next'
import { useTranslation } from 'react-i18next'
import { caseStudies, caseStudyPath } from '../data/caseStudies'
import { projects } from '../data/projects'
import type { Project } from '../types/portfolio'
import { Sprite } from './Sprite'

function ProjectCard({ project, t }: { project: Project; t: TFunction }) {
  const { id, petal, status, hasNote, technologies, url } = project
  const key = `projects.${id}`
  const study = caseStudies.find(({ projectId }) => projectId === id)

  return (
    <article className="px card bed">
      <Sprite className="bloom" name="flower" scale={5} pal={{ o: petal }} />
      <div>
        <h4>{t(`${key}.title`)}</h4>
        {status && <span className="lbl">{t(`projectStatus.${status}`)}</span>}
        <p>{t(`${key}.summary`)}</p>
        {hasNote && <p className="project-note">{t(`${key}.note`)}</p>}
        {technologies.length > 0 && (
          <div className="tags">
            {technologies.map((technology) => <span className="tag" key={technology}>{technology}</span>)}
          </div>
        )}
        {study && (
          <p><a href={import.meta.env.BASE_URL + caseStudyPath(study)}>{t('caseStudyUi.read')}</a></p>
        )}
        {url && <p><a href={url}>{t(`${key}.link`)}</a></p>}
      </div>
    </article>
  )
}

export function ProjectSection({ query }: { query: string }) {
  const { t } = useTranslation()
  const term = query.trim().toLowerCase()
  const shown = term ? projects.filter(({ id, technologies }) => [
    t(`projects.${id}.title`), t(`projects.${id}.summary`), ...technologies,
  ].join(' ').toLowerCase().includes(term)) : projects
  const groups = [
    { key: 'projectsTitle', items: shown.filter(({ featured }) => featured) },
    { key: 'otherProjects', items: shown.filter(({ featured }) => !featured) },
  ]

  return (
    <section id="projects">
      <h2 className="title">{t('nav.projects')}</h2>
      {groups.filter(({ items }) => items.length > 0).map(({ key, items }) => (
        <div className="project-group" key={key}>
          <h3>{t(key)}</h3>
          <div className="grid">
            {items.map((project) => <ProjectCard key={project.id} project={project} t={t} />)}
          </div>
        </div>
      ))}
      {shown.length === 0 && <p className="px card" role="status">{t('empty')}</p>}
    </section>
  )
}
