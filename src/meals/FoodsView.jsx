import { useMemo, useState } from "react";
import { foods as builtInFoods, FOOD_CATEGORIES } from "../data/foods.js";
import { formatAmountFull } from "../lib/macros.js";

export default function FoodsView({ customFoods, onAddFood, onSaveCustom, phaseColor }) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [customDraft, setCustomDraft] = useState({
    name: "", category: "Protein", serving: "", protein: 0, carbs: 0, fat: 0, calories: 0,
  });

  const allFoods = useMemo(() => [...builtInFoods, ...customFoods], [customFoods]);

  const filtered = useMemo(() => {
    let list = allFoods;
    if (activeCategory !== "All") list = list.filter(f => f.category === activeCategory);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(f => f.name.toLowerCase().includes(q));
    }
    return list;
  }, [allFoods, activeCategory, search]);

  const submitCustom = (e) => {
    e?.preventDefault?.();
    if (!customDraft.name.trim()) return;
    const food = {
      id: `custom-${Date.now()}`,
      name: customDraft.name.trim(),
      category: customDraft.category,
      unit: "serving",
      defaultAmount: 1,
      step: 0.5,
      minAmount: 0.5,
      descriptor: customDraft.serving.trim(),
      protein: Number(customDraft.protein) || 0,
      carbs: Number(customDraft.carbs) || 0,
      fat: Number(customDraft.fat) || 0,
      calories: Number(customDraft.calories) || 0,
      favorite: false,
    };
    onSaveCustom(food);
    setShowCustomForm(false);
    setCustomDraft({ name: "", category: "Protein", serving: "", protein: 0, carbs: 0, fat: 0, calories: 0 });
  };

  return (
    <div>
      {/* Search */}
      <input
        type="text"
        placeholder="Search foods…"
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "12px 14px",
          minHeight: 44,
          borderRadius: 8,
          background: "#FFFFFF",
          border: "1px solid rgba(0,0,0,0.10)",
          color: "#1A1A1F",
          fontSize: 14,
          marginBottom: 12,
          fontFamily: "'Georgia', serif",
          boxSizing: "border-box",
        }}
      />

      {/* Category chips */}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
        {["All", ...FOOD_CATEGORIES].map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: "6px 12px",
              minHeight: 32,
              borderRadius: 16,
              background: activeCategory === cat ? `${phaseColor}14` : "#FFFFFF",
              border: `1px solid ${activeCategory === cat ? phaseColor : "rgba(0,0,0,0.08)"}`,
              color: activeCategory === cat ? phaseColor : "#4C4C57",
              cursor: "pointer",
              fontSize: 11,
              fontWeight: activeCategory === cat ? "bold" : "normal",
              fontFamily: "'Georgia', serif",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Food list */}
      <div style={{ borderRadius: 10, border: "1px solid rgba(0,0,0,0.08)", overflow: "hidden", marginBottom: 14, background: "#FFFFFF" }}>
        {filtered.length === 0 ? (
          <div style={{ padding: 20, textAlign: "center", color: "#6E6E78", fontSize: 13, fontStyle: "italic" }}>
            No matches. Try a different search or add a custom food below.
          </div>
        ) : (
          filtered.map((food, i) => (
            <div key={food.id} style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: "12px 14px",
              background: i % 2 === 0 ? "#FFFFFF" : "rgba(0,0,0,0.02)",
              borderBottom: i < filtered.length - 1 ? "1px solid rgba(0,0,0,0.05)" : "none",
              flexWrap: "wrap",
            }}>
              <div style={{ flex: 2, minWidth: 140 }}>
                <div style={{ fontSize: 13, color: "#1A1A1F" }}>{food.name}</div>
                <div style={{ fontSize: 10, color: "#75757F", marginTop: 2 }}>
                  {formatAmountFull(food.defaultAmount, food)}
                </div>
                <div style={{ fontSize: 10, color: "#5C5C66", marginTop: 2 }}>
                  <span style={{ color: "#1A1A1F", fontWeight: "bold" }}>{food.protein}g protein</span>
                  {" · "}{food.calories} cal · {food.carbs}g carbs · {food.fat}g fat
                </div>
              </div>
              <button
                onClick={() => onAddFood(food.id)}
                style={{
                  padding: "6px 12px",
                  minHeight: 32,
                  background: `${phaseColor}14`,
                  border: `1px solid ${phaseColor}66`,
                  borderRadius: 6,
                  color: phaseColor,
                  fontSize: 11,
                  fontWeight: "bold",
                  cursor: "pointer",
                  fontFamily: "'Georgia', serif",
                }}
              >
                + Add
              </button>
            </div>
          ))
        )}
      </div>

      {/* Custom food */}
      {!showCustomForm ? (
        <button
          onClick={() => setShowCustomForm(true)}
          style={{
            width: "100%",
            padding: "12px",
            minHeight: 44,
            background: "#FFFFFF",
            border: "1px dashed rgba(0,0,0,0.15)",
            borderRadius: 10,
            color: "#4C4C57",
            fontSize: 13,
            cursor: "pointer",
            fontFamily: "'Georgia', serif",
          }}
        >
          + Add custom food
        </button>
      ) : (
        <form
          onSubmit={submitCustom}
          style={{
            padding: 14,
            background: "#FFFFFF",
            border: "1px solid rgba(0,0,0,0.10)",
            borderRadius: 10,
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          <div style={{ fontSize: 11, color: "#6E6E78", textTransform: "uppercase", letterSpacing: 2 }}>New food</div>
          <input
            type="text"
            placeholder="Food name (e.g. Cottage cheese)"
            value={customDraft.name}
            onChange={e => setCustomDraft({ ...customDraft, name: e.target.value })}
            required
            style={inputStyle}
          />
          <input
            type="text"
            placeholder="Serving size (e.g. 1 cup)"
            value={customDraft.serving}
            onChange={e => setCustomDraft({ ...customDraft, serving: e.target.value })}
            style={inputStyle}
          />
          <select
            value={customDraft.category}
            onChange={e => setCustomDraft({ ...customDraft, category: e.target.value })}
            style={inputStyle}
          >
            {FOOD_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            <input type="number" placeholder="Protein (g)" value={customDraft.protein || ""} onChange={e => setCustomDraft({ ...customDraft, protein: e.target.value })} style={inputStyle} />
            <input type="number" placeholder="Carbs (g)" value={customDraft.carbs || ""} onChange={e => setCustomDraft({ ...customDraft, carbs: e.target.value })} style={inputStyle} />
            <input type="number" placeholder="Fat (g)" value={customDraft.fat || ""} onChange={e => setCustomDraft({ ...customDraft, fat: e.target.value })} style={inputStyle} />
            <input type="number" placeholder="Calories" value={customDraft.calories || ""} onChange={e => setCustomDraft({ ...customDraft, calories: e.target.value })} style={inputStyle} />
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
            <button
              type="button"
              onClick={() => setShowCustomForm(false)}
              style={{
                flex: 1, padding: "10px", minHeight: 44, borderRadius: 6,
                background: "transparent", border: "1px solid rgba(0,0,0,0.10)",
                color: "#4C4C57", fontSize: 13, cursor: "pointer", fontFamily: "'Georgia', serif",
              }}
            >Cancel</button>
            <button
              type="submit"
              style={{
                flex: 1, padding: "10px", minHeight: 44, borderRadius: 6,
                background: phaseColor, border: "none",
                color: "#FFFFFF", fontSize: 13, fontWeight: "bold", cursor: "pointer", fontFamily: "'Georgia', serif",
              }}
            >Save</button>
          </div>
        </form>
      )}
    </div>
  );
}

const inputStyle = {
  padding: "10px 12px",
  minHeight: 40,
  borderRadius: 6,
  background: "#FFFFFF",
  border: "1px solid rgba(0,0,0,0.10)",
  color: "#1A1A1F",
  fontSize: 13,
  fontFamily: "'Georgia', serif",
  boxSizing: "border-box",
  width: "100%",
};
