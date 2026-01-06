'use client'

import { useState } from 'react'
import { ACCURACY_CONDITIONS } from '@/lib/constants'

function AccuracyCard({
  title,
  items,
  type,
}: {
  title: string
  items: readonly string[]
  type: 'success' | 'caution'
}) {
  const [isOpen, setIsOpen] = useState(false)

  const colors = {
    success: {
      bg: 'bg-emerald-50 dark:bg-emerald-950/50',
      border: 'border-emerald-200 dark:border-emerald-800',
      icon: 'text-emerald-600 dark:text-emerald-400',
      title: 'text-emerald-800 dark:text-emerald-200',
      text: 'text-emerald-700 dark:text-emerald-300',
    },
    caution: {
      bg: 'bg-amber-50 dark:bg-amber-950/50',
      border: 'border-amber-200 dark:border-amber-800',
      icon: 'text-amber-600 dark:text-amber-400',
      title: 'text-amber-800 dark:text-amber-200',
      text: 'text-amber-700 dark:text-amber-300',
    },
  }

  const c = colors[type]

  return (
    <div className={`rounded-xl border ${c.border} ${c.bg}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between p-4"
      >
        <div className="flex items-center gap-3">
          {type === 'success' ? (
            <svg
              className={`h-5 w-5 ${c.icon}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          ) : (
            <svg
              className={`h-5 w-5 ${c.icon}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          )}
          <span className={`font-medium ${c.title}`}>{title}</span>
        </div>
        <svg
          className={`h-5 w-5 transition-transform ${isOpen ? 'rotate-180' : ''} ${c.icon}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="border-t border-inherit px-4 pb-4 pt-3">
          <ul className="space-y-2">
            {items.map((item) => (
              <li key={item} className={`flex items-start gap-2 text-sm ${c.text}`}>
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-current" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export function AccuracyInfo() {
  return (
    <div className="space-y-3">
      <AccuracyCard
        title="Calculation is most accurate when..."
        items={ACCURACY_CONDITIONS.mostAccurate}
        type="success"
      />
      <AccuracyCard
        title="Use extra caution when..."
        items={ACCURACY_CONDITIONS.extraCaution}
        type="caution"
      />
    </div>
  )
}
