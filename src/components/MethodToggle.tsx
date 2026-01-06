'use client'

import type { ScalingMethod } from '@/lib/types'

interface MethodToggleProps {
  selected: ScalingMethod
  onSelect: (method: ScalingMethod) => void
  showCustom?: boolean
}

export function MethodToggle({ selected, onSelect, showCustom = false }: MethodToggleProps) {
  return (
    <div className="flex rounded-full bg-slate-100 p-1 dark:bg-slate-800">
      <button
        type="button"
        onClick={() => onSelect('fda')}
        className={`flex-1 rounded-full px-4 py-2 text-sm font-medium transition-all
          ${
            selected === 'fda'
              ? 'bg-white text-teal-700 shadow-sm dark:bg-slate-700 dark:text-teal-400'
              : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
          }`}
      >
        <span className="hidden sm:inline">FDA (Conservative)</span>
        <span className="sm:hidden">FDA</span>
      </button>
      <button
        type="button"
        onClick={() => onSelect('accurate')}
        className={`flex-1 rounded-full px-4 py-2 text-sm font-medium transition-all
          ${
            selected === 'accurate'
              ? 'bg-white text-teal-700 shadow-sm dark:bg-slate-700 dark:text-teal-400'
              : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
          }`}
      >
        <span className="hidden sm:inline">Accurate (0.75)</span>
        <span className="sm:hidden">0.75</span>
      </button>
      {showCustom && (
        <button
          type="button"
          onClick={() => onSelect('custom')}
          className={`flex-1 rounded-full px-4 py-2 text-sm font-medium transition-all
            ${
              selected === 'custom'
                ? 'bg-white text-teal-700 shadow-sm dark:bg-slate-700 dark:text-teal-400'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
            }`}
        >
          Custom
        </button>
      )}
    </div>
  )
}
