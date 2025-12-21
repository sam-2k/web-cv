import type { Experience as ExperienceType } from '../types'

interface ExperienceProps {
  experience: ExperienceType[]
}

function formatPeriod(startDate: string, endDate: string | null, current: boolean): string {
  const start = startDate.split('-')[0]
  const end = current ? 'Present' : endDate?.split('-')[0] || ''
  return `${start} — ${end}`
}

export default function Experience({ experience }: ExperienceProps) {
  return (
    <section id="experience">
      <div className="container">
        <div className="section-header">
          <p className="section-label">CAREER</p>
          <h2 className="section-title">Work Experience</h2>
        </div>
        {experience.map(exp => (
          <div key={exp.id} className="experience-content">
            <div className="experience-sidebar">
              <div className="company-info">
                <h3 className="company-name">{exp.company}</h3>
                <p className="company-role">{exp.role}</p>
                <p className="company-period">
                  {formatPeriod(exp.startDate, exp.endDate, exp.current)}
                </p>
              </div>
            </div>
            <div className="experience-details">
              <h3>{exp.summary}</h3>
              <ul className="task-list">
                {exp.responsibilities.map((task, index) => (
                  <li key={index}>{task}</li>
                ))}
              </ul>
              <div className="tech-stack">
                <h4>TECHNOLOGIES USED</h4>
                <div className="tech-tags">
                  {exp.technologies.map(tech => (
                    <span key={tech} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
