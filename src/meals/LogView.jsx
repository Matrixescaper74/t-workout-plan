import { getFoodById, foods as builtInFoods } from "../data/foods.js";
import { formatTimeOfDay, levoWarningForFood } from "../lib/macros.js";

export default function LogView({ entries, customFoods, levoTakenAt, now, onAddFood, onRemove, phaseColor }) {
  const allFoods = [...builtInFoods, ...customFoods];
  const favorites = allFoods.filter(f => f.favorite);

  const handleAdd = (food) => {
    const warning = levoWarningForFood(food, levoTakenAt, now);
    if (warning.level === "block") {
      if (!window.confirm(`⚠️ ${warning.message}\n\nLog anyway?`)) return;
    } else if (warning.level === "soft") {
      // Soft warning — log directly but flash a hint via console; not interrupting
    }
    onAddFood(food.id);
  };

  return (
    <div>
      {/* Quick-add favorites */}
      <div style={{ marginBottom: 18 }}>
        <div style={{ fontSize: 11, color: "#666", textTransform: "uppercase", letterSpacing: 2, marginBottom: 10 }}>
          Quick Add
        </div>
        <div style={{
          display: "flex",
          gap: 8,
          flexWrap: "wrap",
        }}>
          {favorites.map(food => {
            const warning = levoWarningForFood(food, levoTakenAt, now);
            return (
              <button
                key={food.id}
                onClick={() => handleAdd(food)}
                style={{
                  padding: "10px 14px",
                  minHeight: 44,
                  borderRadius: 22,
                  border: warning.level === "block"
                    ? "1px solid rgba(232,131,58,0.5)"
                    : `1px solid ${phaseColor}55`,
                  background: warning.level === "block"
                    ? "rgba(232,131,58,0.08)"
                    : `${phaseColor}15`,
                  color: "#e0e0ee",
                  cursor: "pointer",
                  fontSize: 12,
                  fontFamily: "'Georgia', serif",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                }}
                title={warning.message || `${food.protein}g protein · ${food.calories} cal · serving: ${food.serving}`}
              >
                {warning.level === "block" && <span>⚠️</span>}
                <span>{food.name}</span>
                <span style={{ color: phaseColor, fontSize: 10, fontWeight: "bold" }}>
                  {food.protein}g protein
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Today's entries */}
      <div>
        <div style={{ fontSize: 11, color: "#666", textTransform: "uppercase", letterSpacing: 2, marginBottom: 10 }}>
          Today ({entries.length} {entries.length === 1 ? "entry" : "entries"})
        </div>
        {entries.length === 0 ? (
          <div style={{
            padding: "30px 20px",
            textAlign: "center",
            color: "#666",
            fontSize: 13,
            fontStyle: "italic",
            border: "1px dashed rgba(255,255,255,0.08)",
            borderRadius: 10,
          }}>
            Nothing logged yet. Tap a Quick Add button above, or browse Plans / Foods.
          </div>
        ) : (
          <div style={{ borderRadius: 10, border: "1px solid rgba(255,255,255,0.08)", overflow: "hidden" }}>
            {[...entries].reverse().map((entry, i) => {
              const food = getFoodById(entry.foodId, customFoods);
              if (!food) return null;
              const s = entry.servings ?? 1;
              return (
                <div key={entry.id} style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "12px 16px",
                  background: i % 2 === 0 ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.01)",
                  borderBottom: i < entries.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                  gap: 12,
                  flexWrap: "wrap",
                }}>
                  <div style={{ minWidth: 60, fontSize: 11, color: "#777", flexShrink: 0 }}>
                    {formatTimeOfDay(entry.timestamp)}
                  </div>
                  <div style={{ flex: 2, minWidth: 140, fontSize: 14, color: "#e0e0ee" }}>
                    <div>{food.name}{s !== 1 ? ` ×${s}` : ""}</div>
                    <div style={{ fontSize: 10, color: "#666", marginTop: 2 }}>{food.serving}</div>
                  </div>
                  <div style={{ flex: 1, minWidth: 160, fontSize: 11, color: "#888" }}>
                    <div style={{ color: "#bbb", fontWeight: "bold" }}>
                      {Math.round(food.protein * s)}g protein
                    </div>
                    <div style={{ fontStyle: "italic", marginTop: 2 }}>
                      {Math.round(food.calories * s)} cal · {Math.round(food.carbs * s)}g carbs · {Math.round(food.fat * s)}g fat
                    </div>
                  </div>
                  <button
                    onClick={() => onRemove(entry.id)}
                    style={{
                      width: 32, height: 32,
                      background: "transparent",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: 16,
                      color: "#888",
                      cursor: "pointer",
                      fontSize: 14,
                      flexShrink: 0,
                    }}
                    title="Remove"
                  >
                    ×
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
