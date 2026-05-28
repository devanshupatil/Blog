import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import { useDarkMode } from '../hooks/useDarkMode'
import { SearchBar } from './SearchBar'

const CATEGORIES = ['Frontend', 'Backend', 'Cloud', 'AI'] as const

// Blog layers logo — matches Sachin Ghait's style icon
function BlogLogo() {
  return (
    <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-editorial-accent shadow-md shadow-editorial-accent/30 shrink-0 transition-transform duration-200 group-hover:scale-105">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="w-5 h-5"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Top layer */}
        <path
          d="M12 3L22 8.5L12 14L2 8.5L12 3Z"
          fill="white"
          fillOpacity="0.95"
        />
        {/* Middle layer */}
        <path
          d="M2 13.5L12 19L22 13.5"
          stroke="white"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeOpacity="0.75"
        />
        {/* Bottom layer */}
        <path
          d="M2 17L12 22.5L22 17"
          stroke="white"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeOpacity="0.4"
        />
      </svg>
    </div>
  )
}

// Sun icon for light mode toggle
function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
      <path
        d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

// Moon icon for dark mode toggle
function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// Hamburger / Close icons for mobile menu
function MenuIcon({ open }: { open: boolean }) {
  return open ? (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M3 12h18M3 6h18M3 18h18" />
    </svg>
  )
}

export function Header() {
  const { dark, toggle } = useDarkMode()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-cream-border dark:bg-[#141414]/90 dark:border-[#222222] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">

        {/* ── Left Area: Brand & Search bar ── */}
        <div className="flex items-center gap-8 flex-1">
          {/* Brand/Logo */}
          <NavLink
            to="/"
            className="flex items-center gap-3 shrink-0 group text-editorial-text dark:text-gray-100 hover:text-editorial-accent dark:hover:text-editorial-accent transition-colors duration-200"
          >
            <BlogLogo />
            <span className="font-bold text-[18px] tracking-tight font-sans">
              Devanshu Patil
            </span>
          </NavLink>

          {/* Search bar (desktop) - next to logo like Sachin Ghait's */}
          <div className="hidden md:block w-full max-w-[480px]">
            <SearchBar />
          </div>
        </div>

        {/* ── Right Area: Navigation links & Dark mode toggle ── */}
        <div className="hidden md:flex items-center gap-8">
          <nav className="flex items-center gap-8 self-stretch">
            {CATEGORIES.map((cat) => (
              <NavLink
                key={cat}
                to={`/blog/${cat.toLowerCase()}`}
                className={({ isActive }) =>
                  [
                    'relative text-md font-medium h-16 flex items-center transition-all duration-200 select-none border-b-2',
                    isActive
                      ? 'text-editorial-accent border-editorial-accent'
                      : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white border-transparent',
                  ].join(' ')
                }
              >
                {cat}
              </NavLink>
            ))}
          </nav>

          {/* Dark Mode button - exact 40px circular matching Sachin's */}
          <button
            id="dark-mode-toggle"
            type="button"
            onClick={toggle}
            aria-label="Toggle dark mode"
            className="flex items-center justify-center w-10 h-10 rounded-full border border-cream-border dark:border-[#333] text-gray-500 dark:text-gray-400 hover:text-editorial-accent dark:hover:text-editorial-accent hover:bg-gray-100 dark:hover:bg-[#222] transition-all duration-200 shrink-0"
          >
            {dark ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>

        {/* ── Mobile menu triggers ── */}
        <div className="flex items-center gap-3 md:hidden">
          {/* Dark Mode button for mobile */}
          <button
            type="button"
            onClick={toggle}
            aria-label="Toggle dark mode"
            className="flex items-center justify-center w-10 h-10 rounded-full border border-cream-border dark:border-[#333] text-gray-500 dark:text-gray-400"
          >
            {dark ? <SunIcon /> : <MoonIcon />}
          </button>

          {/* Hamburger */}
          <button
            type="button"
            className="flex items-center justify-center w-10 h-10 rounded-full border border-cream-border dark:border-[#333] text-gray-500 dark:text-gray-400"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((o) => !o)}
          >
            <MenuIcon open={menuOpen} />
          </button>
        </div>
      </div>

      {/* ── Mobile Drawer ── */}
      {menuOpen && (
        <nav className="md:hidden border-t border-cream-border dark:border-[#222222] px-6 py-4 flex flex-col gap-3 bg-white dark:bg-[#141414] transition-colors duration-200">
          <div className="mb-2">
            <SearchBar />
          </div>
          <div className="flex flex-col gap-1">
            {CATEGORIES.map((cat) => (
              <NavLink
                key={cat}
                to={`/blog/${cat.toLowerCase()}`}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  [
                    'text-sm font-medium px-3 py-2.5 rounded-lg transition-all duration-200',
                    isActive
                      ? 'text-editorial-accent bg-editorial-accent/10 font-semibold'
                      : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-[#1a1a1a]',
                  ].join(' ')
                }
              >
                {cat}
              </NavLink>
            ))}
          </div>
        </nav>
      )}
    </header>
  )
}
