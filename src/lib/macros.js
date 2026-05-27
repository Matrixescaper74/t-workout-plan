import { getFoodById } from "../data/foods.js";

// Units that never pluralize (count as adjectives or already abbreviations)
const NO_PLURAL = new Set([
  "oz", "fl oz", "tbsp", "tsp", "g", "ml",
  "medium", "small", "large",
]);

// Resolve the "amount in unit" for an entry, with backward compatibility
// for old entries that stored `servings` (a multiplier) instead of `amount`.
export function getEntryAmount(entry, food) {
  if (entry?.amount != null) return entry.amount;
  if (entry?.servings != null && food?.defaultAmount != null) {
    return entry.servings * food.defaultAmount;
  }
  return food?.defaultAmount ?? 1;
}

export function macrosForEntry(entry, food) {
  if (!food) return { protein: 0, carbs: 0, fat: 0, calories: 0 };
  const amount = getEntryAmount(entry, food);
  const factor = food.defaultAmount ? amount / food.defaultAmount : 1;
  return {
    protein: food.protein * factor,
    carbs: food.carbs * factor,
    fat: food.fat * factor,
    calories: food.calories * factor,
  };
}

export function sumMacros(entries, customFoods = []) {
  return entries.reduce(
    (acc, e) => {
      const food = getFoodById(e.foodId, customFoods);
      const m = macrosForEntry(e, food);
      return {
        protein: acc.protein + m.protein,
        carbs: acc.carbs + m.carbs,
        fat: acc.fat + m.fat,
        calories: acc.calories + m.calories,
      };
    },
    { protein: 0, carbs: 0, fat: 0, calories: 0 }
  );
}

// Format a number to a clean string: 5 → "5", 5.5 → "5.5", 5.25 → "5.25", 5.0 → "5"
function formatNumber(n) {
  return n
    .toFixed(2)
    .replace(/(\.\d*?)0+$/, "$1")
    .replace(/\.$/, "");
}

// Pluralize the unit if needed: "egg" → "eggs", "cup" → "cups", but NOT "oz" → "ozs"
function pluralizeUnit(unit, amount) {
  if (amount === 1) return unit;
  if (NO_PLURAL.has(unit)) return unit;
  return unit + "s";
}

// "6 oz" or "5.5 oz" or "2 eggs" or "1 cup" (no descriptor)
export function formatAmountShort(amount, food) {
  if (!food) return formatNumber(amount);
  const unit = pluralizeUnit(food.unit, amount);
  return `${formatNumber(amount)} ${unit}`;
}

// "6 oz cooked" or "2 eggs (large)" — full sentence with descriptor
export function formatAmountFull(amount, food) {
  if (!food) return formatNumber(amount);
  const base = formatAmountShort(amount, food);
  return food.descriptor ? `${base} ${food.descriptor}` : base;
}

export function progressPct(current, target) {
  if (!target) return 0;
  return Math.min(100, Math.round((current / target) * 100));
}

// Returns one of: "under" | "ok" | "over"
export function statusFor(macro, current, target) {
  if (!target) return "under";
  const pct = (current / target) * 100;
  if (macro === "protein") {
    if (pct < 90) return "under";
    if (pct <= 130) return "ok";
    return "over";
  }
  if (macro === "calories") {
    if (pct < 90) return "under";
    if (pct <= 105) return "ok";
    return "over";
  }
  if (pct < 75) return "under";
  if (pct <= 120) return "ok";
  return "over";
}

export function formatTimeOfDay(isoString) {
  const d = new Date(isoString);
  let h = d.getHours();
  const m = String(d.getMinutes()).padStart(2, "0");
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  return `${h}:${m} ${ampm}`;
}
