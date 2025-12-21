import type { Personal, Language } from '../types'

interface HeroProps {
  personal: Personal
  languages: Language[]
}

export default function Hero({ personal, languages }: HeroProps) {
  const englishLang = languages.find(l => l.language === 'English')
  const yearsExp = new Date().getFullYear() - 2021

  return (
    <section className="hero" id="about">
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <span className="hero-label">{personal.title.toUpperCase()}</span>
            <h1 className="hero-name">
              {personal.firstName.toUpperCase()}
              <span>{personal.lastName.toUpperCase()}</span>
            </h1>
            <p className="hero-title">{personal.tagline}</p>
            <p className="hero-description">{personal.description}</p>
            <div className="hero-cta">
              <a href="#projects" className="btn btn-primary">VIEW PROJECTS</a>
              <a href="#contact" className="btn btn-secondary">GET IN TOUCH</a>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-image-wrapper">
              <div className="hero-image-frame" />
              <div className="hero-image">
                <div className="avatar-placeholder">
                  {personal.lastName.substring(0, 2).toUpperCase()}
                </div>
              </div>
              <div className="floating-badge">
                <span>{yearsExp}+</span> Years Exp
              </div>
              {englishLang && (
                <div className="floating-badge">
                  {englishLang.certification} <span>{englishLang.score}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
