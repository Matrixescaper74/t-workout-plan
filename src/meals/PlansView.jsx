import { mealPlans, MEAL_SLOTS } from "../data/mealPlans.js";
import { getFoodById, foods as builtInFoods } from "../data/foods.js";
import { sumMacros } from "../lib/macros.js";

function macrosForTemplate(template, customFoods) {
  const entries = template.items.map(it => ({ foodId: it.foodId, servings: it.servings ?? 1 }));
  return sumMacros(entries, customFoods);
}

export default function PlansView({ customFoods, onAddTemplate, onAddSingleFood, phaseColor }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      {MEAL_SLOTS.map(slot => (
        <div key={slot}>
          <div style={{
            fontSize: 13,
            color: "#fff",
            textTransform: "uppercase",
            letterSpacing: 2,
            marginBottom: 10,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}>
            <span style={{ color: phaseColor }}>●</span> {slot}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {mealPlans[slot].map((template, ti) => {
              const macros = macrosForTemplate(template, customFoods);
              return (
                <div
                  key={ti}
                  style={{
                    padding: "14px 16px",
                    borderRadius: 10,
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 10, marginBottom: 8 }}>
                    <div style={{ fontSize: 14, color: "#fff", flex: 1, minWidth: 200 }}>{template.name}</div>
                    <button
                      onClick={() => onAddTemplate(template)}
                      style={{
                        padding: "8px 14px",
                        minHeight: 36,
                        borderRadius: 6,
                        background: `${phaseColor}33`,
                        border: `1px solid ${phaseColor}66`,
                        color: phaseColor,
                        cursor: "pointer",
                        fontSize: 12,
                        fontWeight: "bold",
                        fontFamily: "'Georgia', serif",
                      }}
                    >
                      + Add meal
                    </button>
                  </div>

                  <div style={{ fontSize: 11, color: "#888", marginBottom: 8, fontStyle: "italic" }}>
                    {Math.round(macros.protein)}g protein · {Math.round(macros.calories)} cal · {Math.round(macros.carbs)}g carbs · {Math.round(macros.fat)}g fat
                  </div>

                  {template.note && (
                    <div style={{
                      fontSize: 11,
                      color: "#FFC58F",
                      marginBottom: 8,
                      padding: "6px 10px",
                      background: "rgba(232,131,58,0.10)",
                      borderRadius: 6,
                      border: "1px solid rgba(232,131,58,0.20)",
                    }}>
                      ⓘ {template.note}
                    </div>
                  )}

                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    {template.items.map((item, ii) => {
                      const food = getFoodById(item.foodId, customFoods);
                      if (!food) return null;
                      return (
                        <div key={ii} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12 }}>
                          <span style={{ color: "#888" }}>·</span>
                          <span style={{ color: "#ccc", flex: 1 }}>
                            {food.name} <span style={{ color: "#666" }}>({food.serving})</span>
                          </span>
                          <button
                            onClick={() => onAddSingleFood(food.id, item.servings ?? 1)}
                            style={{
                              padding: "2px 8px",
                              background: "transparent",
                              border: "1px solid rgba(255,255,255,0.1)",
                              borderRadius: 4,
                              color: "#888",
                              fontSize: 10,
                              cursor: "pointer",
                            }}
                            title="Add just this food"
                          >
                            + just this
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
