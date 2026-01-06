'use client'

interface ResultDisplayProps {
  label: string
  doseMgKg: number | null
  totalDoseMg: number | null
  scalingFactor: number | null
  targetWeightKg: number
  targetLabel: string
  showFactor?: boolean
}

export function ResultDisplay({
  label,
  doseMgKg,
  totalDoseMg,
  scalingFactor,
  targetWeightKg,
  targetLabel,
  showFactor = true,
}: ResultDisplayProps) {
  const isValid = doseMgKg !== null && Number.isFinite(doseMgKg) && doseMgKg > 0

  return (
    <div className="rounded-2xl bg-gradient-to-br from-teal-50 to-teal-100/50 p-6 dark:from-teal-950 dark:to-teal-900/50">
      <div className="text-center">
        <p className="text-sm font-medium uppercase tracking-wider text-teal-700 dark:text-teal-300">
          {label}
        </p>

        <div className="mt-3">
          {isValid ? (
            <>
              <p className="font-mono text-4xl font-bold text-teal-900 dark:text-teal-100">
                {doseMgKg!.toFixed(3)}{' '}
                <span className="text-2xl font-normal text-teal-700 dark:text-teal-300">mg/kg</span>
              </p>
              <p className="mt-2 text-slate-600 dark:text-slate-400">
                {totalDoseMg!.toFixed(2)} mg total for a {targetWeightKg} kg {targetLabel}
              </p>
            </>
          ) : (
            <p className="font-mono text-4xl font-bold text-slate-400 dark:text-slate-600">---</p>
          )}
        </div>

        {showFactor && scalingFactor !== null && Number.isFinite(scalingFactor) && (
          <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/60 px-4 py-1.5 dark:bg-slate-800/60">
            <span className="text-sm text-slate-600 dark:text-slate-400">Scaling factor:</span>
            <span className="font-mono font-semibold text-teal-700 dark:text-teal-400">
              {scalingFactor.toFixed(2)}×
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
