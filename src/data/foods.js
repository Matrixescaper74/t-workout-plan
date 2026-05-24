// Tammy's food library — only foods she explicitly confirmed.
// More foods can be added via the in-app "+ Add custom food" button.
//
// Macros are per the listed serving size.
// levoInterference: 'high' = avoid within 4 hr of dose, 'medium' = avoid within 30-60 min, 'none' = anytime

export const foods = [
  // ---- Proteins (animal) ----
  { id: "chicken-breast", name: "Chicken breast", category: "Protein", serving: "6 oz cooked", protein: 42, carbs: 0, fat: 4, calories: 200, levoInterference: "medium", favorite: true },
  { id: "white-fish", name: "White fish (tilapia/cod)", category: "Protein", serving: "6 oz cooked", protein: 35, carbs: 0, fat: 2, calories: 165, levoInterference: "medium", favorite: false },
  { id: "lean-hamburger", name: "Lean hamburger (93/7)", category: "Protein", serving: "4 oz cooked", protein: 22, carbs: 0, fat: 8, calories: 170, levoInterference: "medium", favorite: false },
  { id: "steak", name: "Steak", category: "Protein", serving: "4 oz cooked", protein: 25, carbs: 0, fat: 7, calories: 175, levoInterference: "medium", favorite: false },
  { id: "ground-turkey", name: "Ground turkey (93/7)", category: "Protein", serving: "4 oz cooked", protein: 22, carbs: 0, fat: 8, calories: 170, levoInterference: "medium", favorite: false },
  { id: "scrambled-eggs", name: "Scrambled eggs", category: "Protein", serving: "2 large", protein: 12, carbs: 1, fat: 10, calories: 140, levoInterference: "medium", favorite: true },
  { id: "hard-boiled-eggs", name: "Hard-boiled eggs", category: "Protein", serving: "2 large", protein: 12, carbs: 1, fat: 10, calories: 140, levoInterference: "medium", favorite: true },

  // ---- Proteins (other) ----
  { id: "protein-pancakes", name: "Protein pancakes (homemade)", category: "Protein", serving: "3 small", protein: 25, carbs: 30, fat: 7, calories: 290, levoInterference: "medium", favorite: true },
  { id: "protein-shake", name: "Protein shake (1 scoop + water)", category: "Protein", serving: "1 scoop", protein: 25, carbs: 3, fat: 1, calories: 120, levoInterference: "medium", favorite: true },
  { id: "greek-yogurt", name: "Greek yogurt (plain, non-fat)", category: "Protein", serving: "5.3 oz cup", protein: 17, carbs: 6, fat: 0, calories: 100, levoInterference: "high", favorite: true },
  { id: "hummus", name: "Hummus", category: "Protein", serving: "2 tbsp", protein: 2, carbs: 4, fat: 5, calories: 70, levoInterference: "medium", favorite: false },
  { id: "bone-broth", name: "Bone broth", category: "Protein", serving: "1 cup", protein: 10, carbs: 1, fat: 1, calories: 50, levoInterference: "medium", favorite: false },
  { id: "almond-butter", name: "Almond butter", category: "Fat", serving: "2 tbsp", protein: 7, carbs: 6, fat: 18, calories: 200, levoInterference: "medium", favorite: true },
  { id: "cheese", name: "Cheese (cheddar)", category: "Fat", serving: "1 oz", protein: 7, carbs: 0, fat: 9, calories: 110, levoInterference: "high", favorite: false },

  // ---- Carbs / fruit ----
  { id: "apple", name: "Apple", category: "Fruit", serving: "1 medium", protein: 0, carbs: 25, fat: 0, calories: 95, levoInterference: "medium", favorite: true },
  { id: "banana", name: "Banana", category: "Fruit", serving: "1 medium", protein: 1, carbs: 27, fat: 0, calories: 105, levoInterference: "medium", favorite: true },
  { id: "grapes", name: "Grapes", category: "Fruit", serving: "1 cup", protein: 1, carbs: 27, fat: 0, calories: 105, levoInterference: "medium", favorite: true },

  // ---- Veggies (variety, single entry — any of broccoli/spinach/peppers/etc.) ----
  { id: "veggies-cooked", name: "Veggies (cooked, variety)", category: "Veggie", serving: "1 cup", protein: 3, carbs: 10, fat: 0, calories: 50, levoInterference: "none", favorite: true },
  { id: "side-salad", name: "Side salad (mixed greens)", category: "Veggie", serving: "2 cups", protein: 2, carbs: 6, fat: 0, calories: 30, levoInterference: "none", favorite: false },

  // ---- Fats / snacks ----
  { id: "mixed-nuts", name: "Mixed nuts", category: "Fat", serving: "1 oz (~handful)", protein: 6, carbs: 6, fat: 14, calories: 165, levoInterference: "medium", favorite: true },
  { id: "avocado", name: "Avocado", category: "Fat", serving: "1/2 medium", protein: 2, carbs: 9, fat: 15, calories: 160, levoInterference: "medium", favorite: true },

  // ---- Drinks ----
  { id: "collagen-energy", name: "Collagen energy drink", category: "Drink", serving: "1 can", protein: 20, carbs: 2, fat: 0, calories: 135, levoInterference: "high", favorite: true },
  { id: "mushroom-coffee", name: "Rise mushroom coffee + marine collagen + creamer", category: "Drink", serving: "1 mug", protein: 10, carbs: 3, fat: 3, calories: 100, levoInterference: "high", favorite: true },
  { id: "water", name: "Water", category: "Drink", serving: "1 glass", protein: 0, carbs: 0, fat: 0, calories: 0, levoInterference: "none", favorite: false },
  { id: "herbal-tea", name: "Herbal tea", category: "Drink", serving: "1 mug", protein: 0, carbs: 0, fat: 0, calories: 0, levoInterference: "none", favorite: false },
];

export const FOOD_CATEGORIES = ["Protein", "Fruit", "Veggie", "Fat", "Drink"];

export function getFoodById(id, customFoods = []) {
  return [...foods, ...customFoods].find(f => f.id === id);
}
