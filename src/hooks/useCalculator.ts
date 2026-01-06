'use client'

import { useCallback, useMemo, useState } from 'react'
import {
  animalToHumanDose,
  calculateFoodIntakeScalingFactor,
  calculateScalingFactor,
  calculateTotalDose,
  humanToAnimalDose,
} from '@/lib/calculations'
import {
  DEFAULT_HUMAN_WEIGHT_KG,
  EXPONENTS,
  FOOD_INTAKE_DEFAULTS,
  SPECIES_DATA,
} from '@/lib/constants'
import type { CalculationMode, CalculatorInputs, ScalingMethod, SpeciesId } from '@/lib/types'

const initialInputs: CalculatorInputs = {
  mode: 'animalToHuman',
  speciesId: 'mouse',
  animalWeightGrams: SPECIES_DATA.mouse.defaultWeightGrams,
  humanWeightKg: DEFAULT_HUMAN_WEIGHT_KG,
  inputDoseMgKg: 10,
  scalingMethod: 'accurate',
  customExponent: EXPONENTS.accurate,
  customScalingFactor: 7.27,
  animalFoodIntakeGrams: FOOD_INTAKE_DEFAULTS.mouseFoodIntakeGrams,
  foodCaloriesPer100g: FOOD_INTAKE_DEFAULTS.labChowCaloriesPer100g,
  humanCalorieIntake: FOOD_INTAKE_DEFAULTS.humanCalorieIntake,
}

export function useCalculator() {
  const [inputs, setInputs] = useState<CalculatorInputs>(initialInputs)

  const setMode = useCallback((mode: CalculationMode) => {
    setInputs((prev) => ({ ...prev, mode }))
  }, [])

  const setSpecies = useCallback((speciesId: SpeciesId) => {
    setInputs((prev) => ({
      ...prev,
      speciesId,
      animalWeightGrams: SPECIES_DATA[speciesId].defaultWeightGrams,
    }))
  }, [])

  const setAnimalWeight = useCallback((animalWeightGrams: number) => {
    setInputs((prev) => ({ ...prev, animalWeightGrams }))
  }, [])

  const setHumanWeight = useCallback((humanWeightKg: number) => {
    setInputs((prev) => ({ ...prev, humanWeightKg }))
  }, [])

  const setDose = useCallback((inputDoseMgKg: number) => {
    setInputs((prev) => ({ ...prev, inputDoseMgKg }))
  }, [])

  const setScalingMethod = useCallback((scalingMethod: ScalingMethod) => {
    setInputs((prev) => ({ ...prev, scalingMethod }))
  }, [])

  const setCustomExponent = useCallback((customExponent: number) => {
    setInputs((prev) => ({ ...prev, customExponent }))
  }, [])

  const setCustomScalingFactor = useCallback((customScalingFactor: number) => {
    setInputs((prev) => ({ ...prev, customScalingFactor }))
  }, [])

  const setFoodIntakeParams = useCallback(
    (
      params: Partial<
        Pick<
          CalculatorInputs,
          'animalFoodIntakeGrams' | 'foodCaloriesPer100g' | 'humanCalorieIntake'
        >
      >,
    ) => {
      setInputs((prev) => ({ ...prev, ...params }))
    },
    [],
  )

  const result = useMemo(() => {
    const {
      mode,
      animalWeightGrams,
      humanWeightKg,
      inputDoseMgKg,
      scalingMethod,
      customExponent,
      customScalingFactor,
    } = inputs

    const humanWeightGrams = humanWeightKg * 1000

    // Determine exponent based on scaling method
    const exponent =
      scalingMethod === 'fda'
        ? EXPONENTS.fda
        : scalingMethod === 'accurate'
          ? EXPONENTS.accurate
          : customExponent

    // Calculate scaling factor
    let scalingFactor: number

    if (mode === 'customFactor') {
      scalingFactor = customScalingFactor
    } else if (mode === 'foodIntake') {
      scalingFactor = calculateFoodIntakeScalingFactor({
        animalWeightGrams: inputs.animalWeightGrams,
        animalFoodIntakeGrams: inputs.animalFoodIntakeGrams,
        humanCalorieIntake: inputs.humanCalorieIntake,
        foodCaloriesPer100g: inputs.foodCaloriesPer100g,
        humanWeightKg: inputs.humanWeightKg,
      })
    } else {
      scalingFactor = calculateScalingFactor(humanWeightGrams, animalWeightGrams, exponent)
    }

    // Calculate output dose based on mode
    let outputDoseMgKg: number
    let totalDoseMg: number
    let targetWeightKg: number
    let targetLabel: string

    switch (mode) {
      case 'animalToHuman':
      case 'customFactor':
      case 'foodIntake':
        outputDoseMgKg = animalToHumanDose(inputDoseMgKg, scalingFactor)
        targetWeightKg = humanWeightKg
        totalDoseMg = calculateTotalDose(outputDoseMgKg, targetWeightKg)
        targetLabel = 'human'
        break

      case 'humanToAnimal':
        outputDoseMgKg = humanToAnimalDose(inputDoseMgKg, scalingFactor)
        targetWeightKg = animalWeightGrams / 1000
        totalDoseMg = calculateTotalDose(outputDoseMgKg, targetWeightKg)
        targetLabel = SPECIES_DATA[inputs.speciesId].name.toLowerCase()
        break

      case 'scalingFactorOnly':
        outputDoseMgKg = 0
        totalDoseMg = 0
        targetWeightKg = humanWeightKg
        targetLabel = 'human'
        break

      default:
        outputDoseMgKg = 0
        totalDoseMg = 0
        targetWeightKg = humanWeightKg
        targetLabel = 'human'
    }

    return {
      outputDoseMgKg,
      totalDoseMg,
      scalingFactor,
      exponentUsed: exponent,
      targetWeightKg,
      targetLabel,
      isValid: Number.isFinite(outputDoseMgKg) && outputDoseMgKg >= 0,
    }
  }, [inputs])

  return {
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
  }
}
