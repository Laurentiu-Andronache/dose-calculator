'use client'

import { useEffect, useState } from 'react'
import { useCalculator } from '@/hooks/useCalculator'
import { SPECIES_DATA } from '@/lib/constants'
import { AccuracyInfo } from './AccuracyInfo'
import { AdvancedOptions } from './AdvancedOptions'
import { MethodToggle } from './MethodToggle'
import { ModeSelector } from './ModeSelector'
import { NumberInput } from './NumberInput'
import { ResultDisplay } from './ResultDisplay'
import { SpeciesGrid } from './SpeciesGrid'

export function Calculator() {
  const [showAdvanced, setShowAdvanced] = useState(false)
  const {
    inputs,
    result,
    setMode,
    setSpecies,
    setAnimalWeight,
    setHumanWeight,
    setDose,
    setScalingMethod,
    setCustomExponent,
    setCustomScalingFactor,
    setFoodIntakeParams,
  } = useCalculator()

  // Auto-expand advanced options when custom scaling method is selected
  useEffect(() => {
    if (inputs.scalingMethod === 'custom') {
      setShowAdvanced(true)
    }
  }, [inputs.scalingMethod])

  const showSpeciesSelector =
    inputs.mode !== 'scalingFactorOnly' && inputs.mode !== 'customFactor'
  const showMethodToggle = inputs.mode !== 'customFactor' && inputs.mode !== 'foodIntake'
  const showDoseInput = inputs.mode !== 'scalingFactorOnly'

  const doseLabel =
    inputs.mode === 'humanToAnimal'
      ? 'Human Dose'
      : inputs.mode === 'foodIntake'
        ? 'Animal Dose'
        : 'Animal Dose'

  const resultLabel =
    inputs.mode === 'humanToAnimal'
      ? `${SPECIES_DATA[inputs.speciesId].name} Equivalent Dose`
      : inputs.mode === 'scalingFactorOnly'
        ? 'Scaling Factor'
        : 'Human Equivalent Dose'

  return (
    <div className="space-y-6">
      {/* Mode Selector */}
      <ModeSelector selected={inputs.mode} onSelect={setMode} />

      {/* Main Calculator Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <div className="space-y-6">
          {/* Species Selector */}
          {showSpeciesSelector && (
            <div>
              <label className="mb-3 block text-sm font-medium text-slate-700 dark:text-slate-300">
                {inputs.mode === 'humanToAnimal' ? 'Target Animal' : 'Source Animal'}
              </label>
              <SpeciesGrid selected={inputs.speciesId} onSelect={setSpecies} />
            </div>
          )}

          {/* Dose Input */}
          {showDoseInput && (
            <NumberInput
              label={doseLabel}
              value={inputs.inputDoseMgKg}
              onChange={setDose}
              unit="mg/kg"
              min={0}
              step={0.1}
            />
          )}

          {/* Method Toggle */}
          {showMethodToggle && (
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                Scaling Method
              </label>
              <MethodToggle
                selected={inputs.scalingMethod}
                onSelect={setScalingMethod}
                showCustom={inputs.mode === 'scalingFactorOnly'}
              />
            </div>
          )}

          {/* Custom Factor Input (for customFactor mode) */}
          {inputs.mode === 'customFactor' && (
            <NumberInput
              label="Custom Scaling Factor"
              value={inputs.customScalingFactor}
              onChange={setCustomScalingFactor}
              unit="×"
              min={0.1}
              step={0.1}
              helpText="Enter your known scaling factor"
            />
          )}

          {/* Food Intake Parameters */}
          {inputs.mode === 'foodIntake' && (
            <div className="grid gap-4 sm:grid-cols-2">
              <NumberInput
                label="Animal Food Intake"
                value={inputs.animalFoodIntakeGrams}
                onChange={(v) => setFoodIntakeParams({ animalFoodIntakeGrams: v })}
                unit="g/day"
                min={0.1}
                step={0.1}
              />
              <NumberInput
                label="Food Calorie Density"
                value={inputs.foodCaloriesPer100g}
                onChange={(v) => setFoodIntakeParams({ foodCaloriesPer100g: v })}
                unit="kcal/100g"
                min={1}
                step={10}
              />
              <NumberInput
                label="Human Calorie Intake"
                value={inputs.humanCalorieIntake}
                onChange={(v) => setFoodIntakeParams({ humanCalorieIntake: v })}
                unit="kcal/day"
                min={500}
                step={100}
              />
            </div>
          )}

          {/* Weight Inputs - shown directly in customFactor mode, collapsible otherwise */}
          {inputs.mode === 'customFactor' ? (
            <div className="grid gap-4 sm:grid-cols-2">
              <NumberInput
                label="Animal Weight"
                value={inputs.animalWeightGrams}
                onChange={setAnimalWeight}
                unit="g"
                min={0.1}
                step={1}
              />
              <NumberInput
                label="Human Weight"
                value={inputs.humanWeightKg}
                onChange={setHumanWeight}
                unit="kg"
                min={1}
                step={1}
              />
            </div>
          ) : (
            <AdvancedOptions
              animalWeightGrams={inputs.animalWeightGrams}
              humanWeightKg={inputs.humanWeightKg}
              customExponent={inputs.customExponent}
              onAnimalWeightChange={setAnimalWeight}
              onHumanWeightChange={setHumanWeight}
              onCustomExponentChange={setCustomExponent}
              showExponent={inputs.scalingMethod === 'custom'}
              animalLabel={SPECIES_DATA[inputs.speciesId].name}
              isOpen={showAdvanced}
              onToggle={() => setShowAdvanced((prev) => !prev)}
            />
          )}

          {/* Results */}
          <div className="pt-2">
            {inputs.mode === 'scalingFactorOnly' ? (
              <div className="rounded-2xl bg-gradient-to-br from-teal-50 to-teal-100/50 p-6 text-center dark:from-teal-950 dark:to-teal-900/50">
                <p className="text-sm font-medium uppercase tracking-wider text-teal-700 dark:text-teal-300">
                  Scaling Factor
                </p>
                <p className="mt-3 font-mono text-4xl font-bold text-teal-900 dark:text-teal-100">
                  {result.scalingFactor.toFixed(3)}×
                </p>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                  Using exponent: {result.exponentUsed} ({inputs.scalingMethod})
                </p>
              </div>
            ) : (
              <ResultDisplay
                label={resultLabel}
                doseMgKg={result.outputDoseMgKg}
                totalDoseMg={result.totalDoseMg}
                scalingFactor={result.scalingFactor}
                targetWeightKg={result.targetWeightKg}
                targetLabel={result.targetLabel}
              />
            )}
          </div>
        </div>
      </div>

      {/* Accuracy Information */}
      <AccuracyInfo />
    </div>
  )
}
