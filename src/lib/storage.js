const LOG_KEY = "mealLog";
const CUSTOM_FOODS_KEY = "customFoods";

export function todayKey() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function safeReadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function safeWriteJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // localStorage full or disabled — silently drop
  }
}

export function readLog() {
  return safeReadJSON(LOG_KEY, {});
}

export function readDay(dateKey = todayKey()) {
  const log = readLog();
  return log[dateKey] ?? { levoTakenAt: null, entries: [] };
}

export function writeDay(dateKey, dayData) {
  const log = readLog();
  log[dateKey] = dayData;
  safeWriteJSON(LOG_KEY, log);
}

export function addEntry(foodId, servings = 1) {
  const day = readDay();
  day.entries.push({
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    foodId,
    servings,
    timestamp: new Date().toISOString(),
  });
  writeDay(todayKey(), day);
  return day;
}

export function addMealTemplate(template) {
  const day = readDay();
  const now = Date.now();
  template.items.forEach((item, i) => {
    day.entries.push({
      id: `${now + i}-${Math.random().toString(36).slice(2, 8)}`,
      foodId: item.foodId,
      servings: item.servings ?? 1,
      timestamp: new Date().toISOString(),
    });
  });
  writeDay(todayKey(), day);
  return day;
}

export function removeEntry(entryId) {
  const day = readDay();
  day.entries = day.entries.filter(e => e.id !== entryId);
  writeDay(todayKey(), day);
  return day;
}

export function setLevoTakenNow() {
  const day = readDay();
  day.levoTakenAt = new Date().toISOString();
  writeDay(todayKey(), day);
  return day;
}

export function clearLevo() {
  const day = readDay();
  day.levoTakenAt = null;
  writeDay(todayKey(), day);
  return day;
}

export function readCustomFoods() {
  return safeReadJSON(CUSTOM_FOODS_KEY, []);
}

export function addCustomFood(food) {
  const customs = readCustomFoods();
  customs.push(food);
  safeWriteJSON(CUSTOM_FOODS_KEY, customs);
  return customs;
}
