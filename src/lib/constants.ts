import type { Species, SpeciesId } from './types'

export const EXPONENTS = {
  fda: 0.67, // FDA conservative/safety margin
  accurate: 0.75, // More accurate metabolic scaling (3/4 power law)
} as const

export const DEFAULT_HUMAN_WEIGHT_KG = 70
export const DEFAULT_HUMAN_WEIGHT_GRAMS = DEFAULT_HUMAN_WEIGHT_KG * 1000

// FDA uses these reference weights
export const FDA_HUMAN_WEIGHT_KG = 60
export const FDA_HUMAN_WEIGHT_GRAMS = FDA_HUMAN_WEIGHT_KG * 1000

export const SPECIES_DATA: Record<SpeciesId, Species> = {
  mouse: {
    id: 'mouse',
    name: 'Mouse',
    defaultWeightGrams: 25,
    fdaFactor: 12.3,
  },
  hamster: {
    id: 'hamster',
    name: 'Hamster',
    defaultWeightGrams: 80,
    fdaFactor: 7.4,
  },
  rat: {
    id: 'rat',
    name: 'Rat',
    defaultWeightGrams: 350,
    fdaFactor: 6.2,
  },
  ferret: {
    id: 'ferret',
    name: 'Ferret',
    defaultWeightGrams: 1000,
    fdaFactor: 5.3,
  },
  guinea_pig: {
    id: 'guinea_pig',
    name: 'Guinea Pig',
    defaultWeightGrams: 400,
    fdaFactor: 4.6,
  },
  rabbit: {
    id: 'rabbit',
    name: 'Rabbit',
    defaultWeightGrams: 1800,
    fdaFactor: 3.1,
  },
  dog: {
    id: 'dog',
    name: 'Dog',
    defaultWeightGrams: 10000,
    fdaFactor: 1.8,
  },
  monkey: {
    id: 'monkey',
    name: 'Monkey',
    defaultWeightGrams: 3000,
    fdaFactor: 3.1,
  },
  marmoset: {
    id: 'marmoset',
    name: 'Marmoset',
    defaultWeightGrams: 350,
    fdaFactor: 6.2,
  },
  squirrel_monkey: {
    id: 'squirrel_monkey',
    name: 'Squirrel Monkey',
    defaultWeightGrams: 750,
    fdaFactor: 5.3,
  },
  baboon: {
    id: 'baboon',
    name: 'Baboon',
    defaultWeightGrams: 12000,
    fdaFactor: 1.8,
  },
  micro_pig: {
    id: 'micro_pig',
    name: 'Micro-pig',
    defaultWeightGrams: 20000,
    fdaFactor: 1.4,
  },
  mini_pig: {
    id: 'mini_pig',
    name: 'Mini-pig',
    defaultWeightGrams: 40000,
    fdaFactor: 1.1,
  },
} as const

export const SPECIES_LIST = Object.values(SPECIES_DATA)

// Accuracy information from the article
export const ACCURACY_CONDITIONS = {
  mostAccurate: [
    'Predominantly excreted renally',
    'Minimal hepatic metabolism or flow-limited metabolism',
    'Targets not subject to large inter-species differences in expression, affinity, or distribution',
    'Does not distribute extensively into tissues',
  ],
  extraCaution: [
    'Highly protein-bound (can correct using unbound fraction)',
    'Extensive metabolism and active transport',
    'Significant biliary excretion (MW >500 dalton, amphiphilic, or conjugated)',
    'Inter-species differences in target expression, affinity, or distribution',
    'Extensive renal secretion',
    'Significant target-binding effects',
  ],
} as const

// Default values for food intake method
export const FOOD_INTAKE_DEFAULTS = {
  mouseWeightGrams: 25,
  mouseFoodIntakeGrams: 4,
  labChowCaloriesPer100g: 350, // ~3.5 kcal/g
  humanCalorieIntake: 2500,
} as const

export const SOURCE_ARTICLE_URL =
  'https://olafurpall.substack.com/p/how-to-estimate-human-equivalent'
