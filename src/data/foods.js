// Tammy's food library — only foods she explicitly confirmed.
// More foods can be added via the in-app "+ Add custom food" button.
//
// Macros are stored PER `defaultAmount` of `unit`.
//   e.g. chicken: defaultAmount=6, unit="oz" → 42g protein refers to 6 oz of chicken.
//   When logging amount X, macros = (X / defaultAmount) * stored macros.
//
// `step` is the +/- increment in `unit` terms.
// `minAmount` is the smallest allowed amount.
// `descriptor` is optional extra context (e.g. "cooked", "plain").
//
// levoInterference: 'high' = avoid within 4 hr of dose, 'medium' = avoid within 30-60 min, 'none' = anytime

export const foods = [
  // ---- Proteins (animal) ----
  { id: "chicken-breast", name: "Chicken breast", category: "Protein", unit: "oz", defaultAmount: 6, step: 0.5, minAmount: 0.5, descriptor: "cooked", protein: 42, carbs: 0, fat: 4, calories: 200, levoInterference: "medium", favorite: true },
  { id: "white-fish", name: "White fish (tilapia/cod)", category: "Protein", unit: "oz", defaultAmount: 6, step: 0.5, minAmount: 0.5, descriptor: "cooked", protein: 35, carbs: 0, fat: 2, calories: 165, levoInterference: "medium", favorite: false },
  { id: "lean-hamburger", name: "Lean hamburger", category: "Protein", unit: "oz", defaultAmount: 4, step: 0.5, minAmount: 0.5, descriptor: "cooked, 93/7", protein: 22, carbs: 0, fat: 8, calories: 170, levoInterference: "medium", favorite: false },
  { id: "steak", name: "Steak", category: "Protein", unit: "oz", defaultAmount: 4, step: 0.5, minAmount: 0.5, descriptor: "cooked", protein: 25, carbs: 0, fat: 7, calories: 175, levoInterference: "medium", favorite: false },
  { id: "ground-turkey", name: "Ground turkey", category: "Protein", unit: "oz", defaultAmount: 4, step: 0.5, minAmount: 0.5, descriptor: "cooked, 93/7", protein: 22, carbs: 0, fat: 8, calories: 170, levoInterference: "medium", favorite: false },
  { id: "scrambled-eggs", name: "Scrambled eggs", category: "Protein", unit: "egg", defaultAmount: 2, step: 1, minAmount: 1, descriptor: "large", protein: 12, carbs: 1, fat: 10, calories: 140, levoInterference: "medium", favorite: true },
  { id: "hard-boiled-eggs", name: "Hard-boiled eggs", category: "Protein", unit: "egg", defaultAmount: 2, step: 1, minAmount: 1, descriptor: "large", protein: 12, carbs: 1, fat: 10, calories: 140, levoInterference: "medium", favorite: true },

  // ---- Proteins (other) ----
  { id: "protein-pancakes", name: "Protein pancakes", category: "Protein", unit: "pancake", defaultAmount: 3, step: 1, minAmount: 1, descriptor: "small, homemade", protein: 25, carbs: 30, fat: 7, calories: 290, levoInterference: "medium", favorite: true },
  { id: "protein-shake", name: "Protein shake", category: "Protein", unit: "scoop", defaultAmount: 1, step: 0.5, minAmount: 0.5, descriptor: "+ water", protein: 25, carbs: 3, fat: 1, calories: 120, levoInterference: "medium", favorite: true },
  { id: "greek-yogurt", name: "Greek yogurt", category: "Protein", unit: "oz", defaultAmount: 5, step: 1, minAmount: 1, descriptor: "plain, non-fat", protein: 16, carbs: 6, fat: 0, calories: 95, levoInterference: "high", favorite: true },
  { id: "hummus", name: "Hummus", category: "Protein", unit: "tbsp", defaultAmount: 2, step: 1, minAmount: 1, descriptor: "", protein: 2, carbs: 4, fat: 5, calories: 70, levoInterference: "medium", favorite: false },
  { id: "bone-broth", name: "Bone broth", category: "Protein", unit: "cup", defaultAmount: 1, step: 0.5, minAmount: 0.5, descriptor: "", protein: 10, carbs: 1, fat: 1, calories: 50, levoInterference: "medium", favorite: false },
  { id: "almond-butter", name: "Almond butter", category: "Fat", unit: "tbsp", defaultAmount: 2, step: 1, minAmount: 1, descriptor: "", protein: 7, carbs: 6, fat: 18, calories: 200, levoInterference: "medium", favorite: true },
  { id: "cheese", name: "Cheese", category: "Fat", unit: "oz", defaultAmount: 1, step: 0.5, minAmount: 0.5, descriptor: "cheddar", protein: 7, carbs: 0, fat: 9, calories: 110, levoInterference: "high", favorite: false },

  // ---- Carbs / fruit ----
  { id: "apple", name: "Apple", category: "Fruit", unit: "medium", defaultAmount: 1, step: 0.5, minAmount: 0.5, descriptor: "", protein: 0, carbs: 25, fat: 0, calories: 95, levoInterference: "medium", favorite: true },
  { id: "banana", name: "Banana", category: "Fruit", unit: "medium", defaultAmount: 1, step: 0.5, minAmount: 0.5, descriptor: "", protein: 1, carbs: 27, fat: 0, calories: 105, levoInterference: "medium", favorite: true },
  { id: "grapes", name: "Grapes", category: "Fruit", unit: "cup", defaultAmount: 1, step: 0.5, minAmount: 0.5, descriptor: "", protein: 1, carbs: 27, fat: 0, calories: 105, levoInterference: "medium", favorite: true },

  // ---- Veggies ----
  { id: "veggies-cooked", name: "Veggies", category: "Veggie", unit: "cup", defaultAmount: 1, step: 0.5, minAmount: 0.5, descriptor: "variety, cooked", protein: 3, carbs: 10, fat: 0, calories: 50, levoInterference: "none", favorite: true },
  { id: "side-salad", name: "Side salad", category: "Veggie", unit: "cup", defaultAmount: 2, step: 0.5, minAmount: 0.5, descriptor: "mixed greens", protein: 2, carbs: 6, fat: 0, calories: 30, levoInterference: "none", favorite: false },

  // ---- Fats / snacks ----
  { id: "mixed-nuts", name: "Mixed nuts", category: "Fat", unit: "oz", defaultAmount: 1, step: 0.5, minAmount: 0.5, descriptor: "~handful", protein: 6, carbs: 6, fat: 14, calories: 165, levoInterference: "medium", favorite: true },
  { id: "avocado", name: "Avocado", category: "Fat", unit: "medium", defaultAmount: 0.5, step: 0.25, minAmount: 0.25, descriptor: "", protein: 2, carbs: 9, fat: 15, calories: 160, levoInterference: "medium", favorite: true },

  // ---- Drinks ----
  { id: "collagen-energy", name: "Collagen energy drink", category: "Drink", unit: "can", defaultAmount: 1, step: 0.5, minAmount: 0.5, descriptor: "", protein: 20, carbs: 2, fat: 0, calories: 135, levoInterference: "high", favorite: true },
  { id: "mushroom-coffee", name: "Mushroom coffee", category: "Drink", unit: "mug", defaultAmount: 1, step: 0.5, minAmount: 0.5, descriptor: "Rise + marine collagen + creamer", protein: 10, carbs: 3, fat: 3, calories: 100, levoInterference: "high", favorite: true },
  { id: "water", name: "Water", category: "Drink", unit: "glass", defaultAmount: 1, step: 1, minAmount: 1, descriptor: "", protein: 0, carbs: 0, fat: 0, calories: 0, levoInterference: "none", favorite: false },
  { id: "herbal-tea", name: "Herbal tea", category: "Drink", unit: "mug", defaultAmount: 1, step: 1, minAmount: 1, descriptor: "", protein: 0, carbs: 0, fat: 0, calories: 0, levoInterference: "none", favorite: false },
];

export const FOOD_CATEGORIES = ["Protein", "Fruit", "Veggie", "Fat", "Drink"];

export function getFoodById(id, customFoods = []) {
  return [...foods, ...customFoods].find(f => f.id === id);
}
