import { getFoodById, foods as builtInFoods } from "../data/foods.js";
import { formatTimeOfDay, levoWarningForFood } from "../lib/macros.js";

const servingsBtnStyle = {
  width: 32,
  height: 32,
  background: "rgba(0,0,0,0.05)",
  border: "none",
  borderRadius: 4,
  color: "#1A1A1F",
  cursor: "pointer",
  fontSize: 16,
  fontWeight: "bold",
  fontFamily: "inherit",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export default function LogView({ entries, customFoods, levoTakenAt, now, onAddFood, onRemove, onUpdateServings, phaseColor }) {
  const allFoods = [...builtInFoods, ...customFoods];
  const favorites = allFoods.filter(f => f.favorite);

  const handleAdd = (food) => {
    const warning = levoWarningForFood(food, levoTakenAt, now);
    if (warning.level === "block") {
      if (!window.confirm(`⚠️ ${warning.message}\n\nLog anyway?`)) return;
    }
    onAddFood(food.id);
  };

  return (
    <div>
      {/* Quick-add favorites */}
      <div style={{ marginBottom: 18 }}>
        <div style={{ fontSize: 11, color: "#8C8C95", textTransform: "uppercase", letterSpacing: 2, marginBottom: 10 }}>
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
                    ? "1px solid #E8A765"
                    : `1px solid ${phaseColor}55`,
                  background: warning.level === "block"
                    ? "#FFF1E0"
                    : "#FFFFFF",
                  color: "#1A1A1F",
                  cursor: "pointer",
                  fontSize: 12,
                  fontFamily: "'Georgia', serif",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
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
        <div style={{ fontSize: 11, color: "#8C8C95", textTransform: "uppercase", letterSpacing: 2, marginBottom: 10 }}>
          Today ({entries.length} {entries.length === 1 ? "entry" : "entries"})
        </div>
        {entries.length === 0 ? (
          <div style={{
            padding: "30px 20px",
            textAlign: "center",
            color: "#8C8C95",
            fontSize: 13,
            fontStyle: "italic",
            border: "1px dashed rgba(0,0,0,0.10)",
            borderRadius: 10,
            background: "#FFFFFF",
          }}>
            Nothing logged yet. Tap a Quick Add button above, or browse Plans / Foods.
          </div>
        ) : (
          <div style={{ borderRadius: 10, border: "1px solid rgba(0,0,0,0.08)", overflow: "hidden", background: "#FFFFFF" }}>
            {[...entries].reverse().map((entry, i) => {
              const food = getFoodById(entry.foodId, customFoods);
              if (!food) return null;
              const s = entry.servings ?? 1;
              return (
                <div key={entry.id} style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "12px 16px",
                  background: i % 2 === 0 ? "#FFFFFF" : "rgba(0,0,0,0.02)",
                  borderBottom: i < entries.length - 1 ? "1px solid rgba(0,0,0,0.05)" : "none",
                  gap: 12,
                  flexWrap: "wrap",
                }}>
                  <div style={{ minWidth: 60, fontSize: 11, color: "#9D9DA5", flexShrink: 0 }}>
                    {formatTimeOfDay(entry.timestamp)}
                  </div>
                  <div style={{ flex: 2, minWidth: 140, fontSize: 14, color: "#1A1A1F" }}>
                    <div>{food.name}</div>
                    <div style={{ fontSize: 10, color: "#9D9DA5", marginTop: 2 }}>{food.serving}</div>
                  </div>
                  {/* Servings adjuster */}
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    background: "rgba(0,0,0,0.04)",
                    borderRadius: 6,
                    padding: 2,
                    flexShrink: 0,
                  }}>
                    <button
                      onClick={() => s > 0.5 ? onUpdateServings(entry.id, s - 0.5) : onRemove(entry.id)}
                      style={servingsBtnStyle}
                      title={s > 0.5 ? "Less" : "Remove"}
                    >
                      −
                    </button>
                    <div style={{
                      minWidth: 36, textAlign: "center",
                      fontSize: 12, color: "#1A1A1F", fontWeight: "bold",
                    }}>
                      {s % 1 === 0 ? s : s.toFixed(1)}×
                    </div>
                    <button
                      onClick={() => onUpdateServings(entry.id, s + 0.5)}
                      style={servingsBtnStyle}
                      title="More"
                    >
                      +
                    </button>
                  </div>
                  <div style={{ flex: 1, minWidth: 160, fontSize: 11, color: "#757583" }}>
                    <div style={{ color: "#1A1A1F", fontWeight: "bold" }}>
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
                      border: "1px solid rgba(0,0,0,0.1)",
                      borderRadius: 16,
                      color: "#8C8C95",
                      cursor: "pointer",
                      fontSize: 14,
                      flexShrink: 0,
                    }}
                    title="Remove entry"
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
