// Meal templates built from Tammy's confirmed foods.
// `items` are foodId references into ./foods.js.

export const mealPlans = {
  Breakfast: [
    {
      name: "Protein pancakes + banana + collagen coffee",
      items: [
        { foodId: "protein-pancakes" },
        { foodId: "banana" },
        { foodId: "mushroom-coffee" },
      ],
      note: "Wait 30+ min after levo before the coffee.",
    },
    {
      name: "Scrambled eggs + white sweet potato + apple",
      items: [
        { foodId: "scrambled-eggs" },
        { foodId: "white-sweet-potato" },
        { foodId: "apple" },
      ],
    },
    {
      name: "Scrambled eggs + avocado + grapes",
      items: [
        { foodId: "scrambled-eggs" },
        { foodId: "avocado" },
        { foodId: "grapes" },
      ],
    },
    {
      name: "Greek yogurt + walnuts + grapes",
      items: [
        { foodId: "greek-yogurt" },
        { foodId: "walnuts" },
        { foodId: "grapes" },
      ],
      note: "Greek yogurt is calcium-heavy — wait 4 hr after levo.",
    },
    {
      name: "Elevate bar + collagen coffee + apple",
      items: [
        { foodId: "elevate-bar" },
        { foodId: "mushroom-coffee" },
        { foodId: "apple" },
      ],
      note: "Grab-and-go. Wait 30+ min after levo for the coffee.",
    },
  ],
  Lunch: [
    {
      name: "Grilled chicken + white rice + veggies",
      items: [
        { foodId: "chicken-breast" },
        { foodId: "white-rice" },
        { foodId: "veggies-cooked" },
      ],
    },
    {
      name: "Ground turkey + white sweet potato + side salad",
      items: [
        { foodId: "ground-turkey" },
        { foodId: "white-sweet-potato" },
        { foodId: "side-salad" },
      ],
    },
    {
      name: "Grilled chicken + veggies + hummus + pickles",
      items: [
        { foodId: "chicken-breast" },
        { foodId: "veggies-cooked" },
        { foodId: "hummus" },
        { foodId: "dill-pickles" },
      ],
    },
    {
      name: "Hard-boiled eggs + hummus + veggies + apple",
      items: [
        { foodId: "hard-boiled-eggs" },
        { foodId: "hummus" },
        { foodId: "veggies-cooked" },
        { foodId: "apple" },
      ],
    },
    {
      name: "Quest chips + hummus + side salad + apple",
      items: [
        { foodId: "quest-chips" },
        { foodId: "hummus" },
        { foodId: "side-salad" },
        { foodId: "apple" },
      ],
      note: "Lighter lunch — Quest chips give the protein.",
    },
  ],
  Dinner: [
    {
      name: "White fish + white sweet potato + side salad",
      items: [
        { foodId: "white-fish" },
        { foodId: "white-sweet-potato" },
        { foodId: "side-salad" },
      ],
    },
    {
      name: "Lean hamburger + white rice + sauerkraut",
      items: [
        { foodId: "lean-hamburger" },
        { foodId: "white-rice" },
        { foodId: "sauerkraut" },
      ],
    },
    {
      name: "Grilled chicken + veggies + avocado",
      items: [
        { foodId: "chicken-breast" },
        { foodId: "veggies-cooked" },
        { foodId: "avocado" },
      ],
    },
    {
      name: "White fish + roasted veggies + side salad",
      items: [
        { foodId: "white-fish" },
        { foodId: "veggies-cooked" },
        { foodId: "side-salad" },
      ],
    },
    {
      name: "Steak + veggies + sauerkraut",
      items: [
        { foodId: "steak" },
        { foodId: "veggies-cooked" },
        { foodId: "sauerkraut" },
      ],
      note: "Steak in moderation — save for a treat night.",
    },
  ],
  Snacks: [
    { name: "Quest protein chips", items: [{ foodId: "quest-chips" }] },
    { name: "Elevate protein bar", items: [{ foodId: "elevate-bar" }] },
    { name: "Nature Valley protein bar", items: [{ foodId: "nature-valley-bar" }] },
    { name: "Kaize protein bar", items: [{ foodId: "kaize-bar" }] },
    { name: "Kind protein bar", items: [{ foodId: "kind-bar" }] },
    { name: "Collagen energy drink", items: [{ foodId: "collagen-energy" }] },
    { name: "Hard-boiled eggs + walnuts", items: [{ foodId: "hard-boiled-eggs" }, { foodId: "walnuts" }] },
    { name: "Greek yogurt + almond butter + grapes", items: [{ foodId: "greek-yogurt" }, { foodId: "almond-butter" }, { foodId: "grapes" }] },
    { name: "Almonds + apple", items: [{ foodId: "almonds" }, { foodId: "apple" }] },
    { name: "Caramel rice cake + almond butter", items: [{ foodId: "rice-cake-caramel" }, { foodId: "almond-butter" }] },
    { name: "Chocolate rice cake + almond butter", items: [{ foodId: "rice-cake-chocolate" }, { foodId: "almond-butter" }] },
    { name: "Bone broth", items: [{ foodId: "bone-broth" }] },
    { name: "Protein shake", items: [{ foodId: "protein-shake" }] },
    { name: "Dill pickles", items: [{ foodId: "dill-pickles" }] },
  ],
};

export const MEAL_SLOTS = ["Breakfast", "Lunch", "Dinner", "Snacks"];
