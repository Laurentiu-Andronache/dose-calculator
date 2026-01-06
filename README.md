# HED Calculator

A web-based Human Equivalent Dose (HED) calculator for translating drug doses between animal studies and humans.

**Live Demo**: https://dose-calculator-bice.vercel.app

**Based on**: [How to estimate human equivalent doses from animal studies](https://olafurpall.substack.com/p/how-to-estimate-human-equivalent) by Ólafur Pall Ólafsson

## What is HED?

Human Equivalent Dose (HED) is a method for converting drug doses from animal studies to equivalent human doses. This is essential because metabolic rates scale non-linearly with body size - smaller animals have higher metabolic rates per unit body weight, requiring proportionally higher doses.

The calculator uses the **¾ power law** for metabolic scaling, with the formula:

```
Scaling Factor = (Human Weight / Animal Weight)^(1-exponent)
```

Where the exponent is:
- **0.67** (FDA) - Conservative scaling with built-in safety margin
- **0.75** (Accurate) - More accurate metabolic scaling based on Kleiber's law

## Features

- **5 Calculation Modes**:
  - Animal → Human: Convert animal dose to human equivalent
  - Human → Animal: Reverse calculation
  - Scaling Factor: Calculate the scaling factor only
  - Custom Factor: Use your own pre-calculated scaling factor
  - Food Intake: Rough estimation based on calorie intake ratios

- **13 Species** from official FDA guidelines with conversion factors
- **FDA vs Accurate** scaling method toggle
- **Dark mode** support
- **Mobile responsive** design

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm run test

# Lint code
npm run lint
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Customizing Constants

Edit `src/lib/constants.ts` to modify:

- **Species data**: Default weights and FDA conversion factors
- **Exponents**: 0.67 (FDA) and 0.75 (accurate)
- **Default human weight**: 70 kg
- **Food intake defaults**: Mouse food intake, calorie density, etc.

## Core Files

| File | Purpose |
|------|---------|
| `src/lib/calculations.ts` | Core calculation formulas |
| `src/lib/constants.ts` | Species data & configuration |
| `src/lib/types.ts` | TypeScript interfaces |
| `src/hooks/useCalculator.ts` | State management |
| `src/components/Calculator.tsx` | Main UI component |

## Scientific Background

### When Scaling Is Most Accurate

- Drug is predominantly renally excreted
- Minimal hepatic metabolism or flow-limited metabolism
- Targets not subject to large inter-species differences
- Drug doesn't distribute extensively into tissues

### When Extra Caution Is Advised

- Highly protein-bound drugs
- Extensive metabolism and active transport
- Significant biliary excretion (MW >500 dalton)
- Inter-species differences in target expression/affinity
- Extensive renal secretion
- Significant target-binding effects

## Tech Stack

- [Next.js](https://nextjs.org) 16+ with App Router
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS](https://tailwindcss.com) v4
- [Vitest](https://vitest.dev) for testing
- [Biome](https://biomejs.dev) for linting

## Author

Created by **Laurențiu Andronache**

## License

This calculator is for educational purposes only. Always consult a qualified professional for medical or research decisions.
