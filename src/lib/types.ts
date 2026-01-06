export type SpeciesId =
  | 'mouse'
  | 'hamster'
  | 'rat'
  | 'ferret'
  | 'guinea_pig'
  | 'rabbit'
  | 'dog'
  | 'monkey'
  | 'marmoset'
  | 'squirrel_monkey'
  | 'baboon'
  | 'micro_pig'
  | 'mini_pig'

export interface Species {
  id: SpeciesId
  name: string
  defaultWeightGrams: number
  fdaFactor: number
}

export type ScalingMethod = 'fda' | 'accurate' | 'custom'

export type CalculationMode =
  | 'animalToHuman'
  | 'humanToAnimal'
  | 'customFactor'
  | 'scalingFactorOnly'
  | 'foodIntake'

export interface CalculatorInputs {
  mode: CalculationMode
  speciesId: SpeciesId
  animalWeightGrams: number
  humanWeightKg: number
  inputDoseMgKg: number
  scalingMethod: ScalingMethod
  customExponent: number
  customScalingFactor: number
  // Food intake method inputs
  animalFoodIntakeGrams: number
  foodCaloriesPer100g: number
  humanCalorieIntake: number
}

export interface CalculationResult {
  outputDoseMgKg: number
  totalDoseMg: number
  scalingFactor: number
  exponentUsed: number
  isValid: boolean
}

export interface FoodIntakeResult {
  scalingFactor: number
  humanDoseMgKg: number
  totalDoseMg: number
  isValid: boolean
}
