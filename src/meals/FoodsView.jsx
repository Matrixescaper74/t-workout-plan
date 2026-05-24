import { useMemo, useState } from "react";
import { foods as builtInFoods, FOOD_CATEGORIES } from "../data/foods.js";

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
      serving: customDraft.serving.trim() || "1 serving",
      protein: Number(customDraft.protein) || 0,
      carbs: Number(customDraft.carbs) || 0,
      fat: Number(customDraft.fat) || 0,
      calories: Number(customDraft.calories) || 0,
      levoInterference: "medium",
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
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.1)",
          color: "#fff",
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
              background: activeCategory === cat ? `${phaseColor}33` : "rgba(255,255,255,0.03)",
              border: `1px solid ${activeCategory === cat ? phaseColor : "rgba(255,255,255,0.08)"}`,
              color: activeCategory === cat ? phaseColor : "#aaa",
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
      <div style={{ borderRadius: 10, border: "1px solid rgba(255,255,255,0.08)", overflow: "hidden", marginBottom: 14 }}>
        {filtered.length === 0 ? (
          <div style={{ padding: 20, textAlign: "center", color: "#666", fontSize: 13, fontStyle: "italic" }}>
            No matches. Try a different search or add a custom food below.
          </div>
        ) : (
          filtered.map((food, i) => (
            <div key={food.id} style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: "12px 14px",
              background: i % 2 === 0 ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.01)",
              borderBottom: i < filtered.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
              flexWrap: "wrap",
            }}>
              <div style={{ flex: 2, minWidth: 140 }}>
                <div style={{ fontSize: 13, color: "#e0e0ee" }}>{food.name}</div>
                <div style={{ fontSize: 10, color: "#777", marginTop: 2 }}>
                  {food.serving} · {food.protein}p · {food.carbs}c · {food.fat}f · {food.calories} cal
                  {food.levoInterference === "high" && <span style={{ color: "#E8B080", marginLeft: 6 }}>· high levo interference</span>}
                </div>
              </div>
              <button
                onClick={() => onAddFood(food.id)}
                style={{
                  padding: "6px 12px",
                  minHeight: 32,
                  background: `${phaseColor}33`,
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
            background: "rgba(255,255,255,0.03)",
            border: "1px dashed rgba(255,255,255,0.15)",
            borderRadius: 10,
            color: "#888",
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
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 10,
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          <div style={{ fontSize: 11, color: "#666", textTransform: "uppercase", letterSpacing: 2 }}>New food</div>
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
                background: "transparent", border: "1px solid rgba(255,255,255,0.1)",
                color: "#888", fontSize: 13, cursor: "pointer", fontFamily: "'Georgia', serif",
              }}
            >Cancel</button>
            <button
              type="submit"
              style={{
                flex: 1, padding: "10px", minHeight: 44, borderRadius: 6,
                background: phaseColor, border: "none",
                color: "#fff", fontSize: 13, fontWeight: "bold", cursor: "pointer", fontFamily: "'Georgia', serif",
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
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.1)",
  color: "#fff",
  fontSize: 13,
  fontFamily: "'Georgia', serif",
  boxSizing: "border-box",
  width: "100%",
};
