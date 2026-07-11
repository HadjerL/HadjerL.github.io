import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import logoLight from './assets/Logo.png';
import logoDark from './assets/Dark-Logo.png';
import './App.css';

function App() {
  const { t, i18n } = useTranslation();
  const [theme, setTheme] = useState('light');
  const [creativeMode, setCreativeMode] = useState(false);

  // Sync layout direction (RTL/LTR) when language switches
  useEffect(() => {
    const currentLang = i18n.language;
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLang;
  }, [i18n.language]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const changeLanguage = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  const projects = [
    {
      company: "Spintechs",
      tags: ["Spring Boot", "React.js", "Zod", "PostgreSQL"],
      // English
      titleEn: "National Library Digital Transformation",
      descriptionEn: "Architected modern registry modules, subscription systems, and multi-criteria analytical dashboards using Spring Boot and React.",
      // French
      titleFr: "Transformation Numérique de la Bibliothèque Nationale",
      descriptionFr: "Conception de modules de registre modernes, de systèmes d'abonnement et de tableaux de bord analytiques multi-critères avec Spring Boot et React.",
      // Arabic
      titleAr: "التحول الرقمي للمكتبة الوطنية",
      descriptionAr: "هندسة وحدات تسجيل حديثة، وأنظمة اشتراكات، ولوحات تحكم تحليلية متعددة المعايير باستخدام Spring Boot و React."
    },
    {
      company: "CDER",
      tags: ["Deep Learning", "Python", "Jetson Nano", "React"],
      // English
      titleEn: "AI Predictive Maintenance System",
      descriptionEn: "Developed deep learning models (CNN, LSTM) deployed on Jetson Nano hardware for real-time wind turbine fault anomaly detection.",
      // French
      titleFr: "Système de Maintenance Prédictive par IA",
      descriptionFr: "Développement de modèles de deep learning (CNN, LSTM) déployés sur matériel Jetson Nano pour la détection en temps réel des anomalies sur les éoliennes.",
      // Arabic
      titleAr: "نظام الصيانة التنبؤية بالذكاء الاصطناعي",
      descriptionAr: "تطوير نماذج التعلم العميق (CNN ، LSTM) ونشرها على أجهزة Jetson Nano للكشف عن حالات خلل توربينات الرياح في الوقت الفعلي."
    }
  ];

  return (
    <div 
      className={`portfolio-container ${creativeMode ? 'creative-accent' : ''}`}
      data-theme={theme}
    >
      {/* Header / Nav */}
      <header className="navbar">
        <div className="logo-area">
          <img 
            src={theme === 'light' ? logoLight : logoDark} 
            alt="Hadjer L. Logo" 
            className="site-logo" 
          />
          <span className="brand-name">{t('brandName')}</span>
        </div>
        <nav className="nav-controls">
          {/* Language Selector Dropdown */}
          <select onChange={changeLanguage} value={i18n.language} className="lang-select">
            <option value="en">English</option>
            <option value="fr">Français</option>
            <option value="ar">العربية</option>
          </select>

          <button 
            className="art-toggle-btn"
            onClick={() => setCreativeMode(!creativeMode)}
            title="Toggle artistic accents"
          >
            {creativeMode ? t('engineeringMode') : t('creativeAccent')}
          </button>
          
          <button 
            className="theme-toggle-btn"
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-text">
          <p className="badge-intro">{t('badgeIntro')}</p>
          <h1>{t('heroTitle')}</h1>
          <p className="hero-bio">{t('heroBio')}</p>
          <div className="social-links">
            <a href="https://github.com/HadjerL" target="_blank" rel="noreferrer">GitHub</a>
            <a href="https://linkedin.com/in/hadjer-laissaoui" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="https://medium.com/@hadjerlais77" target="_blank" rel="noreferrer">Medium Blog</a>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="section-block">
        <h2>{t('featuredWork')}</h2>
        <div className="projects-grid">
          {projects.map((proj, idx) => {
            // 1. Determine active language key suffix (e.g., 'En', 'Fr', 'Ar')
            const langSuffix = i18n.language.charAt(0).toUpperCase() + i18n.language.slice(1);
            
            // 2. Select the correct fields dynamically
            const activeTitle = proj[`title${langSuffix}`] || proj.titleEn;
            const activeDescription = proj[`description${langSuffix}`] || proj.descriptionEn;

            return (
              <div key={idx} className="project-card">
                <span className="project-meta">{proj.company}</span>
                <h3>{activeTitle}</h3>
                <p>{activeDescription}</p>
                <div className="tags-row">
                  {proj.tags.map((t, i) => <span key={i} className="tag-badge">{t}</span>)}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Creative & Writing Outlets */}
      <section className="section-block grid-two-col">
        <div className="outlet-card">
          <h2>{t('techWriting')}</h2>
          <p>{t('techWritingDesc')}</p>
          <a href="https://medium.com/@hadjerlais77" target="_blank" rel="noreferrer" className="action-link">{t('readArticles')}</a>
        </div>
        
        <div className="outlet-card creative-card">
          <h2>{t('creativeOutlets')}</h2>
          <p>{t('creativeOutletsDesc')}</p>
          <a href="https://www.instagram.com/es_hadjer/" target="_blank" rel="noreferrer" className="action-link">{t('viewGallery')}</a>
        </div>
      </section>

      {/* Footer */}
      <footer className="site-footer">
        <p>{t('footerText')}</p>
      </footer>
    </div>
  );
}

export default App;