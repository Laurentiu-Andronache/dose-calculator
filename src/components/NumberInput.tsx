'use client'

import { useId } from 'react'

interface NumberInputProps {
  label: string
  value: number
  onChange: (value: number) => void
  unit: string
  min?: number
  max?: number
  step?: number
  helpText?: string
}

export function NumberInput({
  label,
  value,
  onChange,
  unit,
  min = 0,
  max,
  step = 1,
  helpText,
}: NumberInputProps) {
  const id = useId()

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-slate-700 dark:text-slate-300">
        {label}
      </label>
      <div className="relative mt-1">
        <input
          id={id}
          type="number"
          value={value || ''}
          onChange={(e) => onChange(Number.parseFloat(e.target.value) || 0)}
          min={min}
          max={max}
          step={step}
          className="block w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 pr-16 font-mono text-slate-900
            placeholder:text-slate-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20
            dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-teal-400"
          placeholder="0"
        />
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-500 dark:text-slate-400">
          {unit}
        </span>
      </div>
      {helpText && <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{helpText}</p>}
    </div>
  )
}
