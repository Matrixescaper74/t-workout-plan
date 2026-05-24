const LOG_KEY = "mealLog";
const CUSTOM_FOODS_KEY = "customFoods";

export function todayKey() {
  return dateToKey(new Date());
}

export function dateToKey(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function keyToDate(key) {
  const [y, m, d] = key.split("-").map(Number);
  return new Date(y, m - 1, d);
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
    // localStorage full or disabled
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

function newEntryId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

// addEntry now takes an explicit `amount` in the food's natural unit.
// Caller passes food.defaultAmount when adding a normal portion.
export function addEntry(foodId, amount) {
  const day = readDay();
  day.entries.push({
    id: newEntryId(),
    foodId,
    amount,
    timestamp: new Date().toISOString(),
  });
  writeDay(todayKey(), day);
  return day;
}

// addEntries pushes multiple items in one go (used for meal templates).
// Each item: { foodId, amount }
export function addEntries(items) {
  const day = readDay();
  const baseTime = Date.now();
  items.forEach((item, i) => {
    day.entries.push({
      id: `${baseTime + i}-${Math.random().toString(36).slice(2, 8)}`,
      foodId: item.foodId,
      amount: item.amount,
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

export function updateEntryAmount(entryId, newAmount) {
  const day = readDay();
  day.entries = day.entries.map(e =>
    e.id === entryId ? { ...e, amount: Number(newAmount.toFixed(2)) } : e
  );
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

// Returns an array of the last `numDays` days (oldest first, today last).
// Each entry: { dateKey, date, day, isToday }. Empty days have day.entries = [].
export function readDateRange(numDays = 7, endingOn = todayKey()) {
  const log = readLog();
  const days = [];
  const end = keyToDate(endingOn);
  const today = todayKey();
  for (let i = numDays - 1; i >= 0; i--) {
    const d = new Date(end);
    d.setDate(d.getDate() - i);
    const key = dateToKey(d);
    days.push({
      dateKey: key,
      date: d,
      day: log[key] ?? { levoTakenAt: null, entries: [] },
      isToday: key === today,
    });
  }
  return days;
}

// Remove any date keys older than (today - retainDays + 1).
// retainDays=7 keeps today + 6 past days = 7 total.
export function pruneOldDays(retainDays = 7) {
  const log = readLog();
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - retainDays + 1);
  const cutoffKey = dateToKey(cutoff);
  let changed = false;
  const newLog = {};
  for (const k of Object.keys(log)) {
    if (k >= cutoffKey) {
      newLog[k] = log[k];
    } else {
      changed = true;
    }
  }
  if (changed) safeWriteJSON(LOG_KEY, newLog);
  return changed;
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
