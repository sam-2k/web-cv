import type { Experience as ExperienceType, ExperienceProject } from '../types'

interface ExperienceProps {
  experience: ExperienceType[]
}

function formatPeriod(startDate: string, endDate: string | null, current?: boolean): string {
  const formatDate = (date: string) => {
    const [year, month] = date.split('-')
    if (!month) return year
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    return `${monthNames[parseInt(month) - 1]} ${year}`
  }
  const start = formatDate(startDate)
  const end = current ? 'Present' : endDate ? formatDate(endDate) : ''
  return `${start} — ${end}`
}

function ProjectCard({ project }: { project: ExperienceProject }) {
  return (
    <div className="experience-project">
      <div className="project-header">
        <h4 className="project-name">{project.name}</h4>
        <span className="project-period">{formatPeriod(project.startDate, project.endDate)}</span>
      </div>
      <p className="project-description">{project.description}</p>
      <p className="project-meta">
        <span className="project-role">{project.role}</span>
        <span className="project-team">Team of {project.teamSize}</span>
      </p>
      <ul className="task-list">
        {project.responsibilities.map((task, index) => (
          <li key={index}>{task}</li>
        ))}
      </ul>
      <div className="tech-tags">
        {project.technologies.map(tech => (
          <span key={tech} className="tech-tag">{tech}</span>
        ))}
      </div>
    </div>
  )
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
              {exp.projects && exp.projects.length > 0 ? (
                <div className="experience-projects">
                  {exp.projects.map(project => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              ) : exp.responsibilities && (
                <ul className="task-list">
                  {exp.responsibilities.map((task, index) => (
                    <li key={index}>{task}</li>
                  ))}
                </ul>
              )}
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
