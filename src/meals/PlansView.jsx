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
            color: "#1A1A1F",
            textTransform: "uppercase",
            letterSpacing: 2,
            marginBottom: 10,
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontWeight: "bold",
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
                    background: "#FFFFFF",
                    border: "1px solid rgba(0,0,0,0.08)",
                    boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 10, marginBottom: 8 }}>
                    <div style={{ fontSize: 14, color: "#1A1A1F", flex: 1, minWidth: 200, fontWeight: "bold" }}>{template.name}</div>
                    <button
                      onClick={() => onAddTemplate(template)}
                      style={{
                        padding: "8px 14px",
                        minHeight: 36,
                        borderRadius: 6,
                        background: `${phaseColor}14`,
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

                  <div style={{ fontSize: 11, color: "#757583", marginBottom: 8, fontStyle: "italic" }}>
                    {Math.round(macros.protein)}g protein · {Math.round(macros.calories)} cal · {Math.round(macros.carbs)}g carbs · {Math.round(macros.fat)}g fat
                  </div>

                  {template.note && (
                    <div style={{
                      fontSize: 11,
                      color: "#8B4513",
                      marginBottom: 8,
                      padding: "6px 10px",
                      background: "#FFF1E0",
                      borderRadius: 6,
                      border: "1px solid #E8C49A",
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
                          <span style={{ color: "#A8A8B0" }}>·</span>
                          <span style={{ color: "#2A2A2F", flex: 1 }}>
                            {food.name} <span style={{ color: "#9D9DA5" }}>({food.serving})</span>
                          </span>
                          <button
                            onClick={() => onAddSingleFood(food.id, item.servings ?? 1)}
                            style={{
                              padding: "2px 8px",
                              background: "transparent",
                              border: "1px solid rgba(0,0,0,0.10)",
                              borderRadius: 4,
                              color: "#4C4C57",
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
