import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

// Theme toggle for static HTML
const initTheme = () => {
  const saved = localStorage.getItem('theme')
  const theme = saved || 'dark'
  document.documentElement.setAttribute('data-theme', theme)
  updateThemeIcon(theme)
}

const updateThemeIcon = (theme: string) => {
  const btn = document.getElementById('theme-toggle')
  if (!btn) return
  btn.innerHTML = theme === 'dark'
    ? '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>'
    : '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>'
}

document.getElementById('theme-toggle')?.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme') || 'dark'
  const next = current === 'dark' ? 'light' : 'dark'
  document.documentElement.setAttribute('data-theme', next)
  localStorage.setItem('theme', next)
  updateThemeIcon(next)
})

initTheme()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
