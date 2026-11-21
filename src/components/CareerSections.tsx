import type { TFunction } from 'i18next'
import { useTranslation } from 'react-i18next'
import { education, experience } from '../data/career'
import { projects } from '../data/projects'
import type { DateRange } from '../types/portfolio'

function formatDateRange({ start, end, expected }: DateRange, t: TFunction, language: string | undefined) {
  const monthFormat = new Intl.DateTimeFormat(language, { month: 'long', timeZone: 'UTC' })
  const monthName = (date: string) => monthFormat.format(new Date(`${date}-01T00:00:00Z`))
  const [year, month] = start.split('-')
  const [endYear, endMonth] = end?.split('-') ?? []
  const firstMonth = month ? monthName(start) : ''
  const firstMonthLabel = firstMonth.charAt(0).toLocaleUpperCase(language) + firstMonth.slice(1)
  const lastMonth = end && endMonth ? monthName(end) : ''

  const dates = month && endMonth && year === endYear
    ? t('careerDates.sameYear', { start: firstMonthLabel, end: lastMonth, year })
    : t('careerDates.range', {
      start: month ? `${firstMonthLabel} ${year}` : year,
      end: end ? (endMonth ? `${lastMonth} ${endYear}` : endYear) : t('careerDates.present'),
    })

  return expected ? t('careerDates.expected', { dates }) : dates
}

export function Experience() {
  const { t, i18n } = useTranslation()
  const language = i18n.resolvedLanguage
  const listFormat = new Intl.ListFormat(language)

  return (
    <section id="experience">
      <h2 className="title">{t('nav.experience')}</h2>
      <div className="log">
        {experience.map((entry) => {
          const { id, end, clients, projectId } = entry
          const key = `experience.${id}`
          const technologies = projectId && listFormat.format(
            projects.find((project) => project.id === projectId)?.technologies ?? [],
          )

          return (
            <article className={`px card step ${end ? '' : 'now'}`} key={id}>
              <h3>{t(`${key}.title`)}</h3>
              <small>{formatDateRange(entry, t, language)} · {t(`${key}.context`)}</small>
              {clients ? (
                <ul className="client-list">
                  {clients.map((client) => (
                    <li key={client.id}>
                      {t(`${key}.clients.${client.id}`, { dates: formatDateRange(client, t, language) })}
                    </li>
                  ))}
                </ul>
              ) : <p>{t(`${key}.summary`, { technologies })}</p>}
            </article>
          )
        })}
      </div>
    </section>
  )
}

export function Education() {
  const { t, i18n } = useTranslation()

  return (
    <section id="education">
      <h2 className="title">{t('nav.education')}</h2>
      <div className="log">
        {education.map((entry) => (
          <article className="px card step" key={entry.id}>
            <h3>{t(`education.${entry.id}.institution`)}</h3>
            <p>{t(`education.${entry.id}.degree`)}</p>
            <small>{formatDateRange(entry, t, i18n.resolvedLanguage)}</small>
          </article>
        ))}
      </div>
    </section>
  )
}
