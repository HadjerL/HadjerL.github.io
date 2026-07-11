import { useState } from 'react';
import logoLight from './assets/Logo.png';
import logoDark from './assets/Dark-Logo.png';
import './App.css';

function App() {
  const [theme, setTheme] = useState('light');
  const [creativeMode, setCreativeMode] = useState(false);

  // Toggle theme utility
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const projects = [
    {
      title: "National Library Digital Transformation",
      company: "Spintechs",
      description: "Architected modern registry modules, subscription systems, and multi-criteria analytical dashboards using Spring Boot and React.",
      tags: ["Spring Boot", "React.js", "Zod", "PostgreSQL"]
    },
    {
      title: "AI Predictive Maintenance System",
      company: "CDER",
      description: "Developed deep learning models (CNN, LSTM) deployed on Jetson Nano hardware for real-time wind turbine fault anomaly detection.",
      tags: ["Deep Learning", "Python", "Jetson Nano", "React"]
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
          <span className="brand-name">Hadjer Laissaoui</span>
        </div>
        <nav className="nav-controls">
          <button 
            className="art-toggle-btn"
            onClick={() => setCreativeMode(!creativeMode)}
            title="Toggle artistic accents"
          >
            {creativeMode ? "✨ Engineering" : "🎨 Creative Accent"}
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
          <p className="badge-intro">Software Engineer @ ESI Algiers</p>
          <h1>Building robust backend architectures with elegant client interfaces.</h1>
          <p className="hero-bio">
            Passionate about full-stack development, applied AI, and systemic design. 
            When I'm not writing clean code, I translate thoughts into technical blogs and digital sketches.
          </p>
          <div className="social-links">
            <a href="https://github.com/HadjerL" target="_blank" rel="noreferrer">GitHub</a>
            <a href="https://linkedin.com/in/hadjer-laissaoui" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="https://medium.com/@hadjerlais77" target="_blank" rel="noreferrer">Medium Blog</a>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="section-block">
        <h2>Featured Engineering Work</h2>
        <div className="projects-grid">
          {projects.map((proj, idx) => (
            <div key={idx} className="project-card">
              <span className="project-meta">{proj.company}</span>
              <h3>{proj.title}</h3>
              <p>{proj.description}</p>
              <div className="tags-row">
                {proj.tags.map((t, i) => <span key={i} className="tag-badge">{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Creative & Writing Outlets */}
      <section className="section-block grid-two-col">
        <div className="outlet-card">
          <h2>Technical Writing</h2>
          <p>I synthesize engineering concepts, frameworks, and architectural clean practices down into bite-sized technical insights on Medium.</p>
          <a href="https://medium.com/@hadjerlais77" target="_blank" rel="noreferrer" className="action-link">Read Articles →</a>
        </div>
        
        <div className="outlet-card creative-card">
          <h2>Creative Outlets</h2>
          <p>Art keeps my systemic thinking balanced. Feel free to view my character sketches, line-arts, and personal illustrations over on my design page.</p>
          <a href="https://www.instagram.com/es_hadjer/" target="_blank" rel="noreferrer" className="action-link">View Art Gallery →</a>
        </div>
      </section>

      {/* Footer */}
      <footer className="site-footer">
        <p>© 2026 Hadjer Laissaoui. Made with React & Vite. Hosted via GitHub Pages.</p>
      </footer>
    </div>
  );
}

export default App;