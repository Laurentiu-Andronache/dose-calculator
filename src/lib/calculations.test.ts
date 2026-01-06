import { describe, expect, it } from 'vitest'
import {
  animalToHumanDose,
  calculateFoodIntakeScalingFactor,
  calculateScalingFactor,
  humanToAnimalDose,
} from './calculations'

describe('calculateScalingFactor', () => {
  it('returns ~12.3 for FDA mouse parameters (60kg human, 30g mouse, e=0.67)', () => {
    const result = calculateScalingFactor(60000, 30, 0.67)
    expect(result).toBeCloseTo(12.3, 1)
  })

  it('returns ~7.27 for accurate mouse parameters (70kg human, 25g mouse, e=0.75)', () => {
    const result = calculateScalingFactor(70000, 25, 0.75)
    expect(result).toBeCloseTo(7.27, 1)
  })

  it('returns ~3.76 for accurate rat parameters (70kg human, 350g rat, e=0.75)', () => {
    const result = calculateScalingFactor(70000, 350, 0.75)
    expect(result).toBeCloseTo(3.76, 1)
  })

  it('returns 1 when human and animal weights are equal', () => {
    const result = calculateScalingFactor(1000, 1000, 0.75)
    expect(result).toBe(1)
  })

  it('handles different exponents correctly', () => {
    const humanWeight = 70000
    const animalWeight = 25

    const fdaResult = calculateScalingFactor(humanWeight, animalWeight, 0.67)
    const accurateResult = calculateScalingFactor(humanWeight, animalWeight, 0.75)

    // FDA factor should be higher (more conservative)
    expect(fdaResult).toBeGreaterThan(accurateResult)
  })
})

describe('animalToHumanDose', () => {
  it('converts mouse dose correctly with accurate scaling factor', () => {
    // 7.27 mg/kg mouse = 1 mg/kg human (with factor 7.27)
    const result = animalToHumanDose(7.27, 7.27)
    expect(result).toBeCloseTo(1, 2)
  })

  it('converts 10 mg/kg mouse dose to human equivalent', () => {
    // 10 mg/kg mouse with factor 7.27 = ~1.375 mg/kg human
    const result = animalToHumanDose(10, 7.27)
    expect(result).toBeCloseTo(1.375, 2)
  })

  it('converts rat dose correctly', () => {
    // 3.76 mg/kg rat = 1 mg/kg human (with factor 3.76)
    const result = animalToHumanDose(3.76, 3.76)
    expect(result).toBeCloseTo(1, 2)
  })

  it('returns same dose when scaling factor is 1', () => {
    const result = animalToHumanDose(100, 1)
    expect(result).toBe(100)
  })
})

describe('humanToAnimalDose', () => {
  it('converts human dose to mouse equivalent', () => {
    // 1 mg/kg human = 7.27 mg/kg mouse (with factor 7.27)
    const result = humanToAnimalDose(1, 7.27)
    expect(result).toBeCloseTo(7.27, 2)
  })

  it('converts human dose to rat equivalent', () => {
    // 1 mg/kg human = 3.76 mg/kg rat (with factor 3.76)
    const result = humanToAnimalDose(1, 3.76)
    expect(result).toBeCloseTo(3.76, 2)
  })

  it('is the inverse of animalToHumanDose', () => {
    const originalDose = 10
    const scalingFactor = 7.27

    const humanDose = animalToHumanDose(originalDose, scalingFactor)
    const backToAnimal = humanToAnimalDose(humanDose, scalingFactor)

    expect(backToAnimal).toBeCloseTo(originalDose, 5)
  })
})

describe('calculateFoodIntakeScalingFactor', () => {
  it('returns approximately 15.6 for standard mouse/human food intake', () => {
    // From article: 25g mouse eating 4g/day, human eating 2500kcal/day
    // Lab chow has ~3.5 kcal/g = 350 kcal/100g
    const result = calculateFoodIntakeScalingFactor({
      animalWeightGrams: 25,
      animalFoodIntakeGrams: 4,
      humanCalorieIntake: 2500,
      foodCaloriesPer100g: 350,
      humanWeightKg: 70,
    })

    // Article says ~15.6, but method tends to overestimate
    expect(result).toBeCloseTo(15.6, 0)
  })

  it('returns lower factor with higher human calorie intake (human gets more drug)', () => {
    const lowCalorie = calculateFoodIntakeScalingFactor({
      animalWeightGrams: 25,
      animalFoodIntakeGrams: 4,
      humanCalorieIntake: 2000,
      foodCaloriesPer100g: 350,
      humanWeightKg: 70,
    })

    const highCalorie = calculateFoodIntakeScalingFactor({
      animalWeightGrams: 25,
      animalFoodIntakeGrams: 4,
      humanCalorieIntake: 3000,
      foodCaloriesPer100g: 350,
      humanWeightKg: 70,
    })

    // Higher calorie intake = more food = more drug = lower scaling factor
    expect(highCalorie).toBeLessThan(lowCalorie)
  })
})
