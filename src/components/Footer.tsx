import type { Personal } from '../types'

interface FooterProps {
  personal: Personal
}

export default function Footer({ personal }: FooterProps) {
  const currentYear = new Date().getFullYear()

  return (
    <footer>
      <div className="container">
        <p>
          © {currentYear} {personal.firstName} {personal.lastName}. Built with
          passion for games.
        </p>
      </div>
    </footer>
  )
}
