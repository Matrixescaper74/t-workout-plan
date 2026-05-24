import { useEffect, useState } from "react";
import { useIsMobile } from "./lib/useIsMobile.js";
import { phases } from "./data/workoutPhases.js";
import { getTargets } from "./data/targets.js";
import {
  readDay, addEntry, addMealTemplate, removeEntry, updateEntryServings,
  setLevoTakenNow, clearLevo,
  readCustomFoods, addCustomFood,
} from "./lib/storage.js";

import MacroBars from "./meals/MacroBars.jsx";
import LevoPanel from "./meals/LevoPanel.jsx";
import LogView from "./meals/LogView.jsx";
import PlansView from "./meals/PlansView.jsx";
import FoodsView from "./meals/FoodsView.jsx";

const SUB_TABS = [
  { id: "log", label: "Log", icon: "📋" },
  { id: "plans", label: "Meal Ideas", icon: "🍽️" },
  { id: "foods", label: "Foods", icon: "🥑" },
];

export default function Meals({ activePhase }) {
  const isMobile = useIsMobile();
  const phase = phases[activePhase];
  const target = getTargets(activePhase);

  const [day, setDay] = useState(() => readDay());
  const [customFoods, setCustomFoods] = useState(() => readCustomFoods());
  const [activeSubTab, setActiveSubTab] = useState("log");
  const [now, setNow] = useState(() => new Date());

  // Tick every 30s so Levo countdown stays fresh without burning battery
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(id);
  }, []);

  const refresh = () => setDay(readDay());

  const handleAddFood = (foodId, servings = 1) => {
    addEntry(foodId, servings);
    refresh();
  };
  const handleAddTemplate = (template) => {
    addMealTemplate(template);
    refresh();
  };
  const handleRemove = (entryId) => {
    removeEntry(entryId);
    refresh();
  };
  const handleUpdateServings = (entryId, newServings) => {
    updateEntryServings(entryId, newServings);
    refresh();
  };
  const handleTakeLevo = () => {
    setLevoTakenNow();
    refresh();
  };
  const handleClearLevo = () => {
    clearLevo();
    refresh();
  };
  const handleSaveCustom = (food) => {
    addCustomFood(food);
    setCustomFoods(readCustomFoods());
  };

  return (
    <div style={{ maxWidth: 860, margin: "0 auto", padding: isMobile ? "20px 16px" : "24px 24px" }}>

      {/* Levo panel */}
      <LevoPanel
        levoTakenAt={day.levoTakenAt}
        onTakeLevo={handleTakeLevo}
        onClearLevo={handleClearLevo}
        now={now}
      />

      {/* Macro bars */}
      <MacroBars
        entries={day.entries}
        customFoods={customFoods}
        target={target}
        phaseColor={phase.color}
      />

      {/* Sub-tab navigation */}
      <div style={{ display: "flex", gap: 4, marginBottom: 16 }}>
        {SUB_TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id)}
            style={{
              flex: 1,
              padding: "12px 8px",
              minHeight: 44,
              borderRadius: 6,
              border: "none",
              background: activeSubTab === tab.id ? phase.color : "rgba(255,255,255,0.05)",
              color: activeSubTab === tab.id ? "#fff" : "#888",
              cursor: "pointer",
              fontSize: 13,
              fontFamily: "'Georgia', serif",
              transition: "all 0.15s",
            }}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Sub-tab content */}
      {activeSubTab === "log" && (
        <LogView
          entries={day.entries}
          customFoods={customFoods}
          levoTakenAt={day.levoTakenAt}
          now={now}
          onAddFood={handleAddFood}
          onRemove={handleRemove}
          onUpdateServings={handleUpdateServings}
          phaseColor={phase.color}
        />
      )}
      {activeSubTab === "plans" && (
        <PlansView
          customFoods={customFoods}
          onAddTemplate={handleAddTemplate}
          onAddSingleFood={handleAddFood}
          phaseColor={phase.color}
        />
      )}
      {activeSubTab === "foods" && (
        <FoodsView
          customFoods={customFoods}
          onAddFood={handleAddFood}
          onSaveCustom={handleSaveCustom}
          phaseColor={phase.color}
        />
      )}

      {/* Phase target reminder */}
      <div style={{
        marginTop: 24,
        padding: "12px 14px",
        borderRadius: 8,
        background: `${phase.color}11`,
        border: `1px solid ${phase.color}22`,
        fontSize: 11,
        color: "#888",
        textAlign: "center",
        fontStyle: "italic",
      }}>
        Targets are based on your <span style={{ color: phase.color, fontWeight: "bold" }}>{phase.name}</span>.
        See the Workout tab → Nutrition for the full plan.
      </div>
    </div>
  );
}
