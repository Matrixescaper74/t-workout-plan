import { getFoodById } from "../data/foods.js";

export function sumMacros(entries, customFoods = []) {
  return entries.reduce(
    (acc, e) => {
      const food = getFoodById(e.foodId, customFoods);
      if (!food) return acc;
      const s = e.servings ?? 1;
      return {
        protein: acc.protein + food.protein * s,
        carbs: acc.carbs + food.carbs * s,
        fat: acc.fat + food.fat * s,
        calories: acc.calories + food.calories * s,
      };
    },
    { protein: 0, carbs: 0, fat: 0, calories: 0 }
  );
}

export function progressPct(current, target) {
  if (!target) return 0;
  return Math.min(100, Math.round((current / target) * 100));
}

// Returns one of: "under" | "ok" | "over"
// "ok" band: 90-110% for calories, 100-120% for protein, looser for carbs/fat
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
  // carbs / fat — looser band
  if (pct < 75) return "under";
  if (pct <= 120) return "ok";
  return "over";
}

// Levo phase based on time elapsed since dose
//   < 30 min  : "blocked"  (block warning on most foods)
//   30-60 min : "soft"     (soft warning)
//   60-240 min: "high-only" (only foods flagged high interference warn)
//   >= 240 min (4 hr): "clear"
export function levoPhase(levoTakenAt, now = new Date()) {
  if (!levoTakenAt) return "untaken";
  const elapsedMs = now - new Date(levoTakenAt);
  const minutes = elapsedMs / 60000;
  if (minutes < 0) return "untaken";
  if (minutes < 30) return "blocked";
  if (minutes < 60) return "soft";
  if (minutes < 240) return "high-only";
  return "clear";
}

export function levoMinutesElapsed(levoTakenAt, now = new Date()) {
  if (!levoTakenAt) return 0;
  return Math.max(0, Math.floor((now - new Date(levoTakenAt)) / 60000));
}

export function levoMinutesRemaining(levoTakenAt, untilMinutes, now = new Date()) {
  const elapsed = levoMinutesElapsed(levoTakenAt, now);
  return Math.max(0, untilMinutes - elapsed);
}

// Should we warn about adding this food right now?
//   returns { level: "none"|"soft"|"block", message: string }
export function levoWarningForFood(food, levoTakenAt, now = new Date()) {
  const phase = levoPhase(levoTakenAt, now);
  if (phase === "untaken" || phase === "clear") return { level: "none", message: "" };
  if (phase === "blocked") {
    const rem = levoMinutesRemaining(levoTakenAt, 30, now);
    return { level: "block", message: `Wait ${rem} more min before eating — levo absorption window.` };
  }
  if (phase === "soft") {
    const rem = levoMinutesRemaining(levoTakenAt, 60, now);
    return { level: "soft", message: `Recommended to wait ${rem} more min for best levo absorption.` };
  }
  // high-only window (60-240 min)
  if (food?.levoInterference === "high") {
    const rem = levoMinutesRemaining(levoTakenAt, 240, now);
    return {
      level: "soft",
      message: `This food can block levo absorption. Wait ${rem} more min if you can.`,
    };
  }
  return { level: "none", message: "" };
}

export function formatTimeOfDay(isoString) {
  const d = new Date(isoString);
  let h = d.getHours();
  const m = String(d.getMinutes()).padStart(2, "0");
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  return `${h}:${m} ${ampm}`;
}
