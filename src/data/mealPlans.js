// Meal templates built ONLY from Tammy's confirmed foods.
// `items` are foodId references into ./foods.js.
// `servings` defaults to 1; override per item if a meal needs a double portion.

export const mealPlans = {
  Breakfast: [
    {
      name: "Protein pancakes + banana + collagen coffee",
      items: [
        { foodId: "protein-pancakes", servings: 1 },
        { foodId: "banana", servings: 1 },
        { foodId: "mushroom-coffee", servings: 1 },
      ],
      note: "Wait 30+ min after levo before the coffee.",
    },
    {
      name: "Scrambled eggs + avocado + apple",
      items: [
        { foodId: "scrambled-eggs", servings: 1 },
        { foodId: "avocado", servings: 1 },
        { foodId: "apple", servings: 1 },
      ],
    },
    {
      name: "Greek yogurt + mixed nuts + grapes",
      items: [
        { foodId: "greek-yogurt", servings: 1 },
        { foodId: "mixed-nuts", servings: 1 },
        { foodId: "grapes", servings: 1 },
      ],
      note: "Greek yogurt is calcium-heavy — wait at least 4 hr after levo.",
    },
  ],
  Lunch: [
    {
      name: "Grilled chicken + veggies + hummus",
      items: [
        { foodId: "chicken-breast", servings: 1 },
        { foodId: "veggies-cooked", servings: 1 },
        { foodId: "hummus", servings: 1 },
      ],
    },
    {
      name: "Ground turkey + avocado + side salad",
      items: [
        { foodId: "ground-turkey", servings: 1 },
        { foodId: "avocado", servings: 1 },
        { foodId: "side-salad", servings: 1 },
      ],
    },
    {
      name: "Hard-boiled eggs + hummus + veggies + apple",
      items: [
        { foodId: "hard-boiled-eggs", servings: 1 },
        { foodId: "hummus", servings: 1 },
        { foodId: "veggies-cooked", servings: 1 },
        { foodId: "apple", servings: 1 },
      ],
    },
  ],
  Dinner: [
    {
      name: "White fish + roasted veggies + side salad",
      items: [
        { foodId: "white-fish", servings: 1 },
        { foodId: "veggies-cooked", servings: 1 },
        { foodId: "side-salad", servings: 1 },
      ],
    },
    {
      name: "Lean hamburger + veggies + avocado",
      items: [
        { foodId: "lean-hamburger", servings: 1 },
        { foodId: "veggies-cooked", servings: 1 },
        { foodId: "avocado", servings: 1 },
      ],
    },
    {
      name: "Steak + veggies + side salad",
      items: [
        { foodId: "steak", servings: 1 },
        { foodId: "veggies-cooked", servings: 1 },
        { foodId: "side-salad", servings: 1 },
      ],
      note: "Steak in moderation — save for a treat night.",
    },
  ],
  Snacks: [
    { name: "Collagen energy drink", items: [{ foodId: "collagen-energy", servings: 1 }] },
    { name: "Hard-boiled eggs + mixed nuts", items: [{ foodId: "hard-boiled-eggs", servings: 1 }, { foodId: "mixed-nuts", servings: 1 }] },
    { name: "Greek yogurt + almond butter + grapes", items: [{ foodId: "greek-yogurt", servings: 1 }, { foodId: "almond-butter", servings: 1 }, { foodId: "grapes", servings: 1 }] },
    { name: "Bone broth", items: [{ foodId: "bone-broth", servings: 1 }] },
    { name: "Almond butter + apple", items: [{ foodId: "almond-butter", servings: 1 }, { foodId: "apple", servings: 1 }] },
    { name: "Protein shake", items: [{ foodId: "protein-shake", servings: 1 }] },
  ],
};

export const MEAL_SLOTS = ["Breakfast", "Lunch", "Dinner", "Snacks"];
