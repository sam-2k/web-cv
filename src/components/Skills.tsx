import type { Skill } from '../types'

interface SkillsProps {
  skills: Skill[]
}

export default function Skills({ skills }: SkillsProps) {
  return (
    <section id="skills">
      <div className="container">
        <div className="section-header">
          <p className="section-label">EXPERTISE</p>
          <h2 className="section-title">Skills & Technologies</h2>
        </div>
        <div className="skills-grid">
          {skills.map(skill => (
            <div key={skill.id} className="skill-card">
              <div className="skill-icon">
                {skill.logo ? (
                  <img src={skill.logo} alt={skill.name} />
                ) : (
                  <span className="skill-icon-fallback">{skill.name.charAt(0)}</span>
                )}
              </div>
              <h3 className="skill-name">{skill.name}</h3>
              <p className="skill-desc">{skill.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
