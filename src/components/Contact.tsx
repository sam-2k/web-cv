import type { Contact as ContactType, Personal } from '../types'

interface ContactProps {
  contact: ContactType
  personal: Personal
}

export default function Contact({ contact, personal }: ContactProps) {
  return (
    <section id="contact">
      <div className="container">
        <div className="section-header">
          <p className="section-label">GET IN TOUCH</p>
          <h2 className="section-title">Contact</h2>
        </div>
        <div className="contact-content">
          <div className="contact-info">
            <h3>Let's work together</h3>
            <p>
              Looking for a skilled game developer or have an exciting project
              in mind? I'd love to hear from you.
            </p>
            <div className="contact-links">
              <a href={`mailto:${contact.email}`} className="contact-link">
                <span className="contact-link-icon">✉️</span>
                {contact.email}
              </a>
              <a href={`tel:${contact.phone}`} className="contact-link">
                <span className="contact-link-icon">📱</span>
                {contact.phone}
              </a>
              {contact.github && (
                <a
                  href={contact.github}
                  className="contact-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="contact-link-icon">💻</span>
                  {contact.github.replace('https://', '')}
                </a>
              )}
            </div>
          </div>
          <div className="contact-visual">
            <div className="contact-card">
              <p className="contact-card-name">
                {personal.firstName} {personal.lastName}
              </p>
              <p className="contact-card-title">{personal.title}</p>
              <p className="contact-card-location">
                📍 {personal.location.city}, {personal.location.country}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
