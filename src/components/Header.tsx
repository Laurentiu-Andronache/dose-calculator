'use client'

import { useEffect, useState } from 'react'
import { SOURCE_ARTICLE_URL } from '@/lib/constants'

export function Header() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    // Check system preference and localStorage on mount
    const stored = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    if (stored === 'dark' || (!stored && prefersDark)) {
      setIsDark(true)
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggleDark = () => {
    const newValue = !isDark
    setIsDark(newValue)
    localStorage.setItem('theme', newValue ? 'dark' : 'light')
    document.documentElement.classList.toggle('dark', newValue)
  }

  return (
    <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/80">
      <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">HED Calculator</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Human Equivalent Dose</p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={SOURCE_ARTICLE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg px-3 py-1.5 text-sm font-medium text-teal-600 hover:bg-teal-50 dark:text-teal-400 dark:hover:bg-teal-900/30"
          >
            Source
          </a>

          <button
            type="button"
            onClick={toggleDark}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
            aria-label="Toggle dark mode"
          >
            {isDark ? (
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            ) : (
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
    </header>
  )
}
