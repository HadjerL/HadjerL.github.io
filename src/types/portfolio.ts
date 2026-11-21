export type Language = 'en' | 'fr'
export type Theme = 'light' | 'dark'

type ProjectStatus =
  | 'ongoingProfessional'
  | 'completedGraduation'
  | 'completedTeam'
  | 'ongoingAcademic'
  | 'client'
  | 'internship'

export interface Project {
  readonly id: string
  readonly petal: string
  readonly technologies: readonly string[]
  readonly featured?: boolean
  readonly status?: ProjectStatus
  readonly url?: string
  readonly hasNote?: boolean
}

export interface DateRange {
  readonly start: string
  readonly end?: string
  readonly expected?: boolean
}

interface ClientEngagement extends DateRange {
  readonly id: string
  readonly end: string
}

export interface ExperienceEntry extends DateRange {
  readonly id: string
  readonly clients?: readonly ClientEngagement[]
  readonly projectId?: string
}

export interface EducationEntry extends DateRange {
  readonly id: string
  readonly end: string
}

export interface Profile {
  readonly username: string
  readonly links: {
    readonly mail: string
    readonly linkedin: string
    readonly medium: string
    readonly github: string
  }
  readonly cvUrls: Readonly<Record<Language, string>>
}
