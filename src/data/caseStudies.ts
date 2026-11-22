import type { ProjectId } from './projects'

type SectionId = 'context' | 'objectives' | 'architecture' | 'contributions'
  | 'implementation' | 'decisions' | 'results' | 'retrospective'

export interface CaseStudy {
  readonly projectId: ProjectId
  readonly slug: string
  readonly sections: readonly SectionId[]
  readonly relatedProjectIds?: readonly ProjectId[]
}

export const caseStudies: readonly CaseStudy[] = [
  {
    projectId: 'wind',
    slug: 'wind-turbine-predictive-maintenance',
    sections: ['context', 'objectives', 'architecture', 'contributions', 'implementation', 'decisions', 'results', 'retrospective'],
  },
  {
    projectId: 'qube',
    slug: 'qubelink',
    sections: ['context', 'implementation', 'contributions', 'decisions', 'results', 'retrospective'],
  },
]

export function caseStudyPath(study: CaseStudy) {
  return `projects/${study.slug}/`
}
