import { getFoodById, foods as builtInFoods } from "../data/foods.js";
import {
  formatTimeOfDay,
  formatAmountFull,
  formatAmountShort,
  getEntryAmount,
  macrosForEntry,
} from "../lib/macros.js";

const servingsBtnStyle = {
  width: 34,
  height: 34,
  background: "rgba(0,0,0,0.05)",
  border: "none",
  borderRadius: 4,
  color: "#1A1A1F",
  cursor: "pointer",
  fontSize: 18,
  fontWeight: "bold",
  fontFamily: "inherit",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export default function LogView({ entries, customFoods, onAddFood, onRemove, onUpdateAmount, phaseColor, isReadOnly = false }) {
  const allFoods = [...builtInFoods, ...customFoods];
  const favorites = allFoods.filter(f => f.favorite);

  const handleAdd = (food) => {
    onAddFood(food.id);
  };

  return (
    <div>
      {/* Quick-add favorites (today only) */}
      {!isReadOnly && (
      <div style={{ marginBottom: 18 }}>
        <div style={{ fontSize: 11, color: "#6E6E78", textTransform: "uppercase", letterSpacing: 2, marginBottom: 10 }}>
          Quick Add
        </div>
        <div style={{
          display: "flex",
          gap: 8,
          flexWrap: "wrap",
        }}>
          {favorites.map(food => (
            <button
              key={food.id}
              onClick={() => handleAdd(food)}
              style={{
                padding: "10px 14px",
                minHeight: 44,
                borderRadius: 22,
                border: `1px solid ${phaseColor}55`,
                background: "#FFFFFF",
                color: "#1A1A1F",
                cursor: "pointer",
                fontSize: 12,
                fontFamily: "'Georgia', serif",
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
              }}
              title={`${food.protein}g protein · ${food.calories} cal · serving: ${formatAmountFull(food.defaultAmount, food)}`}
            >
              <span>{food.name}</span>
              <span style={{ color: phaseColor, fontSize: 10, fontWeight: "bold" }}>
                {food.protein}g protein
              </span>
            </button>
          ))}
        </div>
      </div>
      )}

      {/* Today's entries */}
      <div>
        <div style={{ fontSize: 11, color: "#6E6E78", textTransform: "uppercase", letterSpacing: 2, marginBottom: 10 }}>
          {isReadOnly ? "That day" : "Today"} ({entries.length} {entries.length === 1 ? "entry" : "entries"})
        </div>
        {entries.length === 0 ? (
          <div style={{
            padding: "30px 20px",
            textAlign: "center",
            color: "#75757F",
            fontSize: 13,
            fontStyle: "italic",
            border: "1px dashed rgba(0,0,0,0.10)",
            borderRadius: 10,
            background: "#FFFFFF",
          }}>
            {isReadOnly
              ? "Nothing was logged this day."
              : "Nothing logged yet. Tap a Quick Add button above, or browse Plans / Foods."}
          </div>
        ) : (
          <div style={{ borderRadius: 10, border: "1px solid rgba(0,0,0,0.08)", overflow: "hidden", background: "#FFFFFF" }}>
            {[...entries].reverse().map((entry, i) => {
              const food = getFoodById(entry.foodId, customFoods);
              if (!food) return null;
              const amount = getEntryAmount(entry, food);
              const macros = macrosForEntry(entry, food);
              const step = food.step ?? 0.5;
              const minAmount = food.minAmount ?? 0.5;
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
                  <div style={{ minWidth: 60, fontSize: 11, color: "#75757F", flexShrink: 0 }}>
                    {formatTimeOfDay(entry.timestamp)}
                  </div>
                  <div style={{ flex: 2, minWidth: 140, fontSize: 14, color: "#1A1A1F" }}>
                    <div>{food.name}</div>
                    {food.descriptor && (
                      <div style={{ fontSize: 10, color: "#75757F", marginTop: 2 }}>{food.descriptor}</div>
                    )}
                  </div>
                  {/* Amount adjuster — read-only shows static amount; today shows +/- */}
                  {isReadOnly ? (
                    <div style={{
                      padding: "6px 12px",
                      background: "rgba(0,0,0,0.04)",
                      borderRadius: 6,
                      fontSize: 13, color: "#1A1A1F", fontWeight: "bold",
                      flexShrink: 0,
                    }}>
                      {formatAmountShort(amount, food)}
                    </div>
                  ) : (
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
                        onClick={() => {
                          const next = amount - step;
                          if (next < minAmount) onRemove(entry.id);
                          else onUpdateAmount(entry.id, next);
                        }}
                        style={servingsBtnStyle}
                        title={amount > minAmount ? "Less" : "Remove"}
                      >
                        −
                      </button>
                      <div style={{
                        minWidth: 70, textAlign: "center",
                        fontSize: 13, color: "#1A1A1F", fontWeight: "bold",
                      }}>
                        {formatAmountShort(amount, food)}
                      </div>
                      <button
                        onClick={() => onUpdateAmount(entry.id, amount + step)}
                        style={servingsBtnStyle}
                        title="More"
                      >
                        +
                      </button>
                    </div>
                  )}
                  <div style={{ flex: 1, minWidth: 160, fontSize: 11, color: "#5C5C66" }}>
                    <div style={{ color: "#1A1A1F", fontWeight: "bold" }}>
                      {Math.round(macros.protein)}g protein
                    </div>
                    <div style={{ fontStyle: "italic", marginTop: 2 }}>
                      {Math.round(macros.calories)} cal · {Math.round(macros.carbs)}g carbs · {Math.round(macros.fat)}g fat
                    </div>
                  </div>
                  {!isReadOnly && (
                    <button
                      onClick={() => onRemove(entry.id)}
                      style={{
                        width: 32, height: 32,
                        background: "transparent",
                        border: "1px solid rgba(0,0,0,0.10)",
                        borderRadius: 16,
                        color: "#6E6E78",
                        cursor: "pointer",
                        fontSize: 14,
                        flexShrink: 0,
                      }}
                      title="Remove entry"
                    >
                      ×
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
