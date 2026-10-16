import { useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

const USER = 'HadjerL'
const LINKS = {
  mail: 'kh_laissaoui@esi.dz',
  linkedin: 'https://www.linkedin.com/in/hadjer-laissaoui-13a420255/',
  medium: 'https://medium.com/@hadjerlais77',
  github: 'https://github.com/HadjerL',
}
const PROJECTS = [
  { id: 'wind', petal: '#F05070', name: 'wind-turbine-predictive-maintenance', url: 'https://github.com/HadjerL/wind-turbine-simulator', lang: 'Python', tags: ['Deep learning', 'Edge AI', 'MQTT'], label: 'final' },
  { id: 'lib', petal: '#2DB5D0', name: 'national-library-platform', lang: 'Java', tags: ['Spring Boot', 'React', 'TypeScript'], label: 'private' },
  { id: 'brace', petal: '#B48EF7', name: 'BracePy-compiler', url: 'https://github.com/HadjerL/BracePy-compiler', lang: 'C', tags: ['Flex', 'Bison'], label: 'public' },
  { id: 'qube', petal: '#FFC857', name: 'sci-smart-switch', url: 'https://github.com/HadjerL/sci-smart-switch', lang: 'Arduino', tags: ['ESP8266', 'MQTT', 'React Native'], label: 'public' },
  { id: 'shop', petal: '#FF8FA8', name: 'e-commerce-platform', lang: 'TypeScript', tags: ['Next.js', 'PostgreSQL'], label: 'client' },
  { id: 'att', petal: '#7BDFF2', name: 'student-attendance-app', lang: 'JavaScript', tags: ['React Native', 'Node.js', 'MySQL'], label: 'intern' },
]
const STACK = {
  'AI & data': ['Python', 'Deep learning', 'CNN · LSTM · RNN', 'Time series', 'Anomaly detection', 'Edge AI · Jetson Nano'],
  Frontend: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'TanStack Query', 'React Native', 'Figma'],
  Backend: ['Java', 'Spring Boot', 'Node.js', 'NestJS', 'Django', 'REST APIs', 'PostgreSQL', 'MySQL', 'Redis'],
  Tools: ['Git · GitLab', 'GitHub Actions', 'Postman · Apidog', 'ESLint', 'Docker (basics)', 'MQTT · Arduino'],
}
const SECTIONS = ['overview', 'projects', 'experience', 'stack', 'writing', 'contact']

/* ---------- pixel sprites: each string is a row, each letter a palette key ---------- */
const FLOWER = ['..ooo..', '.ooyoo.', '.oyyyo.', '.ooyoo.', '..ooo..', '...g...', '.G.g...', '.ggg.G.', '...ggg.', '...g...']
const MUSH = ['..rrrr..', '.rrwrrr.', 'rrrrrwrr', 'rwrrrrrr', '.wwwwww.', '..wss...', '..wss...']
const SUN = ['..yyyyy..', '.yyyyyyy.', 'yyyyyyyyy', 'yyyyyyyyy', 'yyyyyyyyy', 'yyyyyyyyy', 'yyyyyyyyy', '.yyyyyyy.', '..yyyyy..']
const MOON = ['..mmmm..', '.mmm....', 'mmm.....', 'mmm.....', 'mmm.....', 'mmm.....', '.mmm....', '..mmmm..']
const GARDENER = ['...hhhh...', '..hhhhhh..', '.hhhhhhhh.', '..ffffff..', '..fefeef..', '..ffffff..', '..bbbbbb..', '.bbbbbbbb.', '.fbbbbbbf.', '..bbbbbb..', '..dd..dd..']
const COLORS = { y: '#FFE066', g: '#5CB85C', G: '#2E7D32', w: '#fff', s: '#F3E0C2', m: '#FFE9A8', f: '#F1C27D', e: '#2B1D0E', b: '#4CAF50', d: '#7B4B2A', h: 'var(--ac)', r: 'var(--ac)' }

function Sprite({ rows, pal = {}, scale = 5, className = '' }) {
  const colors = { ...COLORS, ...pal }
  const rects = []
  rows.forEach((row, y) => [...row].forEach((c, x) => colors[c] && rects.push(<rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" style={{ fill: colors[c] }} />)))
  return (
    <svg className={className} width={rows[0].length * scale} height={rows.length * scale} viewBox={`0 0 ${rows[0].length} ${rows.length}`} shapeRendering="crispEdges" aria-hidden="true">{rects}</svg>
  )
}

function useTheme() {
  const [theme, setTheme] = useState(() => {
    try { const s = localStorage.getItem('theme'); if (s) return s } catch { /* ignore */ }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try { localStorage.setItem('theme', theme) } catch { /* ignore */ }
  }, [theme])
  return [theme, () => setTheme(theme === 'dark' ? 'light' : 'dark')]
}

function useActiveSection() {
  const [active, setActive] = useState('overview')
  useEffect(() => {
    const obs = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: '-30% 0px -60% 0px' })
    SECTIONS.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el) })
    return () => obs.disconnect()
  }, [])
  return active
}

const FLIES = Array.from({ length: 16 }, (_, i) => ({ l: (i * 37 + 11) % 100, delay: (i * 7) % 11, dur: 9 + ((i * 3) % 8) }))

export default function App() {
  const { t, i18n } = useTranslation()
  const [theme, toggleTheme] = useTheme()
  const active = useActiveSection()
  const [query, setQuery] = useState('')
  const searchRef = useRef(null)

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === '/' && document.activeElement !== searchRef.current) { e.preventDefault(); searchRef.current?.focus() }
      if (e.key === 'Escape') { setQuery(''); searchRef.current?.blur() }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const setLang = (l) => { i18n.changeLanguage(l); try { localStorage.setItem('lng', l) } catch { /* ignore */ } }
  const onSearch = (v) => { setQuery(v); if (v) document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }) }
  const shown = useMemo(() => {
    const q = query.trim().toLowerCase()
    return q ? PROJECTS.filter((p) => [p.name, p.lang, t(`p.${p.id}`), ...p.tags].join(' ').toLowerCase().includes(q)) : PROJECTS
  }, [query, t])
  const chartColor = theme === 'dark' ? '2DB5D0' : 'F05070'

  return (
    <>
      <div className="sky" aria-hidden="true">
        {FLIES.map((f, i) => <i key={i} className="fly" style={{ left: `${f.l}%`, animationDelay: `-${f.delay}s`, animationDuration: `${f.dur}s` }} />)}
      </div>

      <header className="hud">
        <a href="#top" className="brand"><Sprite rows={FLOWER} scale={3} pal={{ o: 'var(--ac)' }} /> <span>{USER}</span></a>
        <input ref={searchRef} className="search" value={query} placeholder={t('search')} aria-label={t('search')} onChange={(e) => onSearch(e.target.value)} />
        <div className="spacer" />
        <button className="pxbtn" onClick={() => setLang(i18n.language === 'fr' ? 'en' : 'fr')}>{i18n.language === 'fr' ? 'EN' : 'FR'}</button>
        <button className="pxbtn" onClick={toggleTheme} aria-label={t('theme')}>{theme === 'dark' ? '☀' : '☾'}</button>
      </header>

      <div className="hero" id="top">
        <Sprite className="orb" rows={theme === 'dark' ? MOON : SUN} scale={8} />
        <Sprite className="gardener" rows={GARDENER} scale={9} />
        <div className="sign px">
          <h1>Hadjer Laissaoui</h1>
          <p>{t('klass')}</p>
        </div>
        <div className="grass" />
      </div>

      <nav className="posts">
        {SECTIONS.map((s) => <a key={s} href={`#${s}`} className={`post ${active === s ? 'on' : ''}`}>{t(`nav.${s}`)}</a>)}
      </nav>

      <div className="wrap">
        <aside>
          <div className="px card">
            <div className="quest"><b>★ {t('quest')}</b><br />{t('status')}</div>
            <p className="bio">{t('bio')}</p>
            <ul>
              <li>🎓 {t('school')}</li>
              <li>📍 {t('place')}</li>
              <li>🌍 {t('langs')}</li>
              <li>✉ <a href={`mailto:${LINKS.mail}`}>{LINKS.mail}</a></li>
              <li><a href={LINKS.linkedin}>LinkedIn</a> · <a href={LINKS.medium}>Medium</a> · <a href={LINKS.github}>GitHub</a></li>
            </ul>
            <a className="pxbtn big" href="#contact">{t('touch')}</a>
          </div>
        </aside>

        <main>
          <section id="overview">
            <div className="px card">
              <h2>{t('aboutTitle')}</h2>
              <p>{t('about1')}</p>
              <p>{t('about2')}</p>
            </div>
          </section>

          <section id="projects">
            <h2 className="title">{t('projectsTitle')}</h2>
            <div className="grid">
              {shown.map((p, i) => (
                <article className="px card bed" key={p.id}>
                  <Sprite className="bloom" rows={FLOWER} scale={5} pal={{ o: p.petal }} style={{ animationDelay: `${i * 0.4}s` }} />
                  <div>
                    <h3>{p.url ? <a href={p.url}>{p.name}</a> : p.name} <span className="lbl">{t(`label.${p.label}`)}</span></h3>
                    <p>{t(`p.${p.id}`)}</p>
                    <div className="tags">{[p.lang, ...p.tags].map((x) => <span className="tag" key={x}>{x}</span>)}</div>
                  </div>
                </article>
              ))}
            </div>
            {shown.length === 0 && <p className="px card">{t('empty')}</p>}
          </section>

          <section id="experience">
            <h2 className="title">{t('expTitle')}</h2>
            <div className="log">
              {t('tl', { returnObjects: true }).map((q) => {
                const on = /pr[ée]sent/i.test(q.d)
                return (
                  <div className={`px card step ${on ? 'now' : ''}`} key={q.t}>
                    <span className="stamp">{on ? `▶ ${t('ongoing')}` : `✔ ${t('done')}`}</span>
                    <h3>{q.t}</h3><small>{q.d}</small><p>{q.x}</p>
                  </div>
                )
              })}
            </div>
          </section>

          <section id="stack">
            <h2 className="title">{t('stackTitle')}</h2>
            <div className="px card">
              {Object.entries(STACK).map(([g, items]) => (
                <div key={g}><h4>{g}</h4><div className="slots">{items.map((x) => <span className="slot" key={x}>{x}</span>)}</div></div>
              ))}
            </div>
            <div className="px card chart"><img src={`https://ghchart.rshah.org/${chartColor}/${USER}`} alt="GitHub contributions" onError={(e) => { e.currentTarget.parentNode.style.display = 'none' }} /></div>
          </section>

          <section id="writing">
            <h2 className="title">{t('writingTitle')}</h2>
            <div className="px card">📜 {t('writing')} <a href={LINKS.medium}>Medium → @hadjerlais77</a></div>
          </section>

          <section id="contact">
            <h2 className="title">{t('contactTitle')}</h2>
            <div className="px card">{t('contact')}<br /><br />
              <a href={`mailto:${LINKS.mail}`}>{LINKS.mail}</a> · <a href={LINKS.linkedin}>LinkedIn</a> · <a href={LINKS.github}>GitHub</a>
            </div>
          </section>
        </main>
      </div>

      <footer>
        <div className="meadow">
          {['#F05070', '#FFC857', '#B48EF7', '#2DB5D0', '#FF8FA8'].flatMap((c, i) => [
            <Sprite key={`f${i}`} rows={FLOWER} scale={4} pal={{ o: c }} />,
            i % 2 === 0 ? <Sprite key={`m${i}`} rows={MUSH} scale={4} /> : null,
          ])}
        </div>
        <p>© 2026 Hadjer Laissaoui · React + Vite + i18next</p>
      </footer>
    </>
  )
}
