import type { Navigation } from '../types'

interface NavbarProps {
  logo: string
  navigation: Navigation[]
}

export default function Navbar({ logo, navigation }: NavbarProps) {
  return (
    <nav>
      <a href="#" className="logo">{logo}</a>
      <ul className="nav-links">
        {navigation.map(item => (
          <li key={item.id}>
            <a href={item.href}>{item.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
