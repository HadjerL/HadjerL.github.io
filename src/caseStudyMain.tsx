import { CaseStudyPage } from './components/CaseStudyPage'
import { caseStudies } from './data/caseStudies'
import { projects } from './data/projects'
import { mountTranslatedPage } from './mountTranslatedPage'
import './caseStudy.css'

mountTranslatedPage((initialLanguageFailed, root) => {
  const study = caseStudies.find(({ projectId }) => projectId === root.dataset.projectId)
  const project = projects.find(({ id }) => id === study?.projectId)
  if (!study || !project) throw new Error('Missing case-study project')
  return <CaseStudyPage study={study} project={project} initialLanguageFailed={initialLanguageFailed} />
})
