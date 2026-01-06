/**
 * Calculate the scaling factor for dose conversion between species.
 *
 * Formula: Scaling Factor = (Human Weight / Animal Weight)^(1 - e)
 * where e is the scaling exponent (0.67 for FDA, 0.75 for accurate)
 *
 * @param humanWeightGrams - Human weight in grams
 * @param animalWeightGrams - Animal weight in grams
 * @param exponent - Scaling exponent (0.67 for FDA/conservative, 0.75 for accurate)
 * @returns The scaling factor
 */
export function calculateScalingFactor(
  humanWeightGrams: number,
  animalWeightGrams: number,
  exponent: number,
): number {
  return (humanWeightGrams / animalWeightGrams) ** (1 - exponent)
}

/**
 * Convert an animal dose to human equivalent dose.
 *
 * Formula: Human Dose (mg/kg) = Animal Dose (mg/kg) / Scaling Factor
 *
 * @param animalDoseMgKg - Animal dose in mg/kg body weight
 * @param scalingFactor - The scaling factor from calculateScalingFactor
 * @returns Human equivalent dose in mg/kg body weight
 */
export function animalToHumanDose(animalDoseMgKg: number, scalingFactor: number): number {
  return animalDoseMgKg / scalingFactor
}

/**
 * Convert a human dose to animal equivalent dose.
 *
 * Formula: Animal Dose (mg/kg) = Human Dose (mg/kg) × Scaling Factor
 *
 * @param humanDoseMgKg - Human dose in mg/kg body weight
 * @param scalingFactor - The scaling factor from calculateScalingFactor
 * @returns Animal equivalent dose in mg/kg body weight
 */
export function humanToAnimalDose(humanDoseMgKg: number, scalingFactor: number): number {
  return humanDoseMgKg * scalingFactor
}

interface FoodIntakeParams {
  animalWeightGrams: number
  animalFoodIntakeGrams: number
  humanCalorieIntake: number
  foodCaloriesPer100g: number
  humanWeightKg: number
}

/**
 * Calculate scaling factor using the food intake method.
 *
 * This method estimates the scaling factor based on calorie intake differences
 * between species. It tends to overestimate (article notes ~15.6 for mouse).
 *
 * Methodology from article:
 * 1. Calculate drug concentration in food: Animal dose / Animal food intake
 * 2. Calculate human food intake at same calorie density
 * 3. Human dose = Drug concentration × Human food intake
 * 4. Scaling factor = Human dose / Animal dose (on mg/kg basis)
 *
 * @returns The estimated scaling factor
 */
export function calculateFoodIntakeScalingFactor({
  animalWeightGrams,
  animalFoodIntakeGrams,
  humanCalorieIntake,
  foodCaloriesPer100g,
  humanWeightKg,
}: FoodIntakeParams): number {
  // Human food intake in grams to get the same calories
  // humanCalorieIntake / (foodCaloriesPer100g / 100) = humanFoodIntakeGrams
  const humanFoodIntakeGrams = (humanCalorieIntake / foodCaloriesPer100g) * 100

  // If animal gets 1 mg/kg dose:
  // Total animal drug = 1 * (animalWeightGrams / 1000) = animalWeightGrams / 1000 mg
  // Drug concentration in food = (animalWeightGrams / 1000) / animalFoodIntakeGrams

  // Human total drug = concentration * humanFoodIntakeGrams
  // Human dose (mg/kg) = human total drug / humanWeightKg

  // For animal: drug_per_gram_food = (animalWeightGrams/1000) / animalFoodIntakeGrams
  // (assuming 1 mg/kg dose, so total drug = animalWeight_kg mg)
  const animalWeightKg = animalWeightGrams / 1000
  const drugPerGramFood = animalWeightKg / animalFoodIntakeGrams

  // Human total drug intake
  const humanTotalDrug = drugPerGramFood * humanFoodIntakeGrams

  // Human dose in mg/kg
  const humanDoseMgKg = humanTotalDrug / humanWeightKg

  // Scaling factor: how many times higher is the animal dose (1 mg/kg) vs human dose
  // Animal was at 1 mg/kg, so scaling factor = 1 / humanDoseMgKg
  return 1 / humanDoseMgKg
}

/**
 * Calculate total dose in mg given dose in mg/kg and body weight.
 */
export function calculateTotalDose(doseMgKg: number, weightKg: number): number {
  return doseMgKg * weightKg
}
