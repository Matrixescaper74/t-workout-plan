// Daily macro targets per workout phase.
// Protein + calorie figures are the actual targets from the workout plan's Nutrition tab.
// Carb and fat targets are derived: ~30% of calories from fat, remainder from carbs after protein.
//
//   protein_cal = protein_g * 4
//   fat_cal = calories * 0.30  →  fat_g = fat_cal / 9
//   carb_cal = calories - protein_cal - fat_cal  →  carb_g = carb_cal / 4

export const targetsByPhase = {
  0: { protein: 100, calories: 1800, carbs: 200, fat: 60 },   // Foundation
  1: { protein: 105, calories: 1900, carbs: 213, fat: 63 },   // Build
  2: { protein: 115, calories: 1925, carbs: 213, fat: 64 },   // Strength
  3: { protein: 110, calories: 1900, carbs: 210, fat: 63 },   // Long Game
};

export function getTargets(phaseIndex) {
  return targetsByPhase[phaseIndex] ?? targetsByPhase[0];
}
