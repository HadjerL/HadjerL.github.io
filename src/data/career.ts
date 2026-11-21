import type { EducationEntry, ExperienceEntry } from '../types/portfolio'

export const experience: readonly ExperienceEntry[] = [
  { id: 'spintechs', start: '2025-11' },
  {
    id: 'freelance',
    start: '2025',
    clients: [
      { id: 'karbal', start: '2025-08', end: '2025-10' },
      { id: 'annassib', start: '2025-03', end: '2025-04' },
    ],
  },
  { id: 'cder', start: '2024-10', end: '2025-06' },
  { id: 'mobile', start: '2023-09', end: '2023-10', projectId: 'att' },
]

export const education: readonly EducationEntry[] = [
  { id: 'upec', start: '2026-09', end: '2027-06', expected: true },
  { id: 'esi', start: '2022-09', end: '2025-06' },
  { id: 'esiSba', start: '2020-09', end: '2022-06' },
]
