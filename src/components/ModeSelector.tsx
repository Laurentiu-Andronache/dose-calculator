'use client'

import type { CalculationMode } from '@/lib/types'

const MODES: { id: CalculationMode; label: string; shortLabel: string }[] = [
  { id: 'animalToHuman', label: 'Animal → Human', shortLabel: 'A→H' },
  { id: 'humanToAnimal', label: 'Human → Animal', shortLabel: 'H→A' },
  { id: 'scalingFactorOnly', label: 'Scaling Factor', shortLabel: 'Factor' },
  { id: 'customFactor', label: 'Custom Factor', shortLabel: 'Custom' },
  { id: 'foodIntake', label: 'Food Intake', shortLabel: 'Food' },
]

interface ModeSelectorProps {
  selected: CalculationMode
  onSelect: (mode: CalculationMode) => void
}

export function ModeSelector({ selected, onSelect }: ModeSelectorProps) {
  return (
    <div className="flex gap-1 overflow-x-auto rounded-xl bg-slate-100 p-1 dark:bg-slate-800">
      {MODES.map((mode) => (
        <button
          key={mode.id}
          type="button"
          onClick={() => onSelect(mode.id)}
          className={`whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition-all
            ${
              selected === mode.id
                ? 'bg-white text-teal-700 shadow-sm dark:bg-slate-700 dark:text-teal-400'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
            }`}
        >
          <span className="hidden sm:inline">{mode.label}</span>
          <span className="sm:hidden">{mode.shortLabel}</span>
        </button>
      ))}
    </div>
  )
}
