import { useTranslation } from 'react-i18next'
import { profile } from '../data/profile'
import type { Theme } from '../types/portfolio'

const STACK = {
  languages: ['Java', 'JavaScript', 'Python', 'C', 'PHP', 'SQL'],
  backend: ['Spring Boot', 'Flask', 'Node.js', 'REST API'],
  frontend: ['React', 'Next.js', 'React Native'],
  ai: ['TensorFlow', 'timeSeries', 'evaluation'],
  embedded: ['ESP8266', 'Arduino', 'MQTT', 'Jetson Nano'],
  tools: ['Git', 'GitLab', 'pytest', 'Figma'],
}
export function Overview() {
  const { t } = useTranslation()
  return (
    <aside>
      <section className="px card" id="overview">
        <h2>{t('nav.overview')}</h2>
        <p>{t('about')}</p>
        <p>{t('place')}</p>
        <p>{t('langs')}</p>
      </section>
    </aside>
  )
}

export function Skills({ theme }: { theme: Theme }) {
  const { t } = useTranslation()
  const chartColor = theme === 'dark' ? '2DB5D0' : 'F05070'
  return (
    <section id="stack">
      <h2 className="title">{t('nav.stack')}</h2>
      <div className="px card">
        {Object.entries(STACK).map(([g, items]) => (
          <div key={g}><h3 className="skill-heading">{t(`skills.${g}`)}</h3><div className="slots">{items.map((x) => <span className="slot" key={x}>{t(`skills.${x}`, { defaultValue: x })}</span>)}</div></div>
        ))}
      </div>
      <div className="px card chart" tabIndex={0} role="region" aria-label={t('chartTitle')}><img src={`https://ghchart.rshah.org/${chartColor}/${profile.username}`} alt={t('chartAlt')} onError={(event) => {
        const chart = event.currentTarget.parentElement
        if (chart) chart.style.display = 'none'
      }} /></div>
    </section>
  )
}

export function Writing() {
  const { t } = useTranslation()
  return (
    <section id="writing">
      <h2 className="title">{t('nav.writing')}</h2>
      <div className="px card">📜 {t('writing')} <a href={profile.links.medium}>Medium → @hadjerlais77</a></div>
    </section>
  )
}

export function Contact() {
  const { t } = useTranslation()
  return (
    <section id="contact">
      <h2 className="title">{t('nav.contact')}</h2>
      <div className="px card"><p>{t('availability')}</p>
        <a href={`mailto:${profile.links.mail}`}>{profile.links.mail}</a> · <a href={profile.links.linkedin}>LinkedIn</a> · <a href={profile.links.github}>GitHub</a> · <a href={profile.links.medium}>Medium</a>
        <p>
          <a href={profile.cvUrls.en} download>{t('cvLanguage.en')}</a>
          {' · '}
          <a href={profile.cvUrls.fr} download>{t('cvLanguage.fr')}</a>
        </p>
      </div>
    </section>
  )
}
