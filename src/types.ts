export interface Personal {
  firstName: string
  lastName: string
  title: string
  tagline: string
  description: string
  dateOfBirth: string
  location: {
    city: string
    country: string
    shortCode: string
  }
  avatar: string | null
  logo: string
}

export interface Contact {
  email: string
  phone: string
  github: string
  linkedin: string | null
  website: string | null
}

export interface Skill {
  id: string
  name: string
  logo: string | null
  description: string
  proficiency: 'beginner' | 'intermediate' | 'advanced' | 'expert' | 'competent'
}

export interface ExperienceProject {
  id: string
  name: string
  description: string
  startDate: string
  endDate: string | null
  role: string
  teamSize: number
  responsibilities: string[]
  technologies: string[]
}

export interface Experience {
  id: string
  company: string
  role: string
  startDate: string
  endDate: string | null
  current: boolean
  summary: string
  responsibilities?: string[]
  technologies: string[]
  projects?: ExperienceProject[]
}

export interface Education {
  id: string
  institution: string
  institutionFullName: string
  degree: string
  field: string
  startDate: string
  endDate: string
  graduated: boolean
}

export interface Language {
  language: string
  proficiency: 'native' | 'fluent' | 'professional' | 'intermediate' | 'basic'
  certification?: string
  score?: string
  note?: string
}

export interface Project {
  id: string
  title: string
  description: string
  icon: string
  technologies: string[]
  liveUrl: string
  githubUrl: string | null
  featured: boolean
}

export interface Navigation {
  id: string
  label: string
  href: string
}

export interface Theme {
  primary: string
  secondary: string
  accent: string
  background: string
  surface: string
}

export interface CVData {
  personal: Personal
  contact: Contact
  skills: Skill[]
  experience: Experience[]
  education: Education[]
  languages: Language[]
  projects: Project[]
  navigation: Navigation[]
  meta: {
    version: string
    lastUpdated: string
    theme: Theme
  }
}
