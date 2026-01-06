'use client'

import { NumberInput } from './NumberInput'

interface AdvancedOptionsProps {
  animalWeightGrams: number
  humanWeightKg: number
  customExponent: number
  onAnimalWeightChange: (value: number) => void
  onHumanWeightChange: (value: number) => void
  onCustomExponentChange: (value: number) => void
  showExponent?: boolean
  animalLabel?: string
  isOpen: boolean
  onToggle: () => void
}

export function AdvancedOptions({
  animalWeightGrams,
  humanWeightKg,
  customExponent,
  onAnimalWeightChange,
  onHumanWeightChange,
  onCustomExponentChange,
  showExponent = false,
  animalLabel = 'Animal',
  isOpen,
  onToggle,
}: AdvancedOptionsProps) {

  return (
    <div className="border-t border-slate-200 pt-4 dark:border-slate-700">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
      >
        <span>Advanced Options</span>
        <svg
          className={`h-5 w-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <NumberInput
            label={`${animalLabel} Weight`}
            value={animalWeightGrams}
            onChange={onAnimalWeightChange}
            unit="g"
            min={0.1}
            step={1}
          />
          <NumberInput
            label="Human Weight"
            value={humanWeightKg}
            onChange={onHumanWeightChange}
            unit="kg"
            min={1}
            step={1}
          />
          {showExponent && (
            <NumberInput
              label="Custom Exponent"
              value={customExponent}
              onChange={onCustomExponentChange}
              unit=""
              min={0.1}
              max={1}
              step={0.01}
              helpText="0.67 (FDA) or 0.75 (accurate)"
            />
          )}
        </div>
      )}
    </div>
  )
}
