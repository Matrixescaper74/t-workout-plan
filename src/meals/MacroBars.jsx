import { sumMacros, progressPct, statusFor } from "../lib/macros.js";

const STATUS_COLORS = {
  under: null,    // use phase color
  ok: "#2E8B57",  // green
  over: "#C95B5B",
};

function Bar({ label, current, target, status, phaseColor, unit }) {
  const pct = progressPct(current, target);
  const barColor = STATUS_COLORS[status] || phaseColor;
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
        <span style={{ fontSize: 11, color: "#757583", textTransform: "uppercase", letterSpacing: 1.5 }}>
          {label}
        </span>
        <span style={{ fontSize: 12, color: "#1A1A1F", fontWeight: "bold" }}>
          {Math.round(current)}{unit ? unit : ""} <span style={{ color: "#85858F", fontWeight: "normal" }}>/ {target}{unit ? unit : ""}</span>
        </span>
      </div>
      <div style={{ height: 6, borderRadius: 3, background: "rgba(0,0,0,0.06)", overflow: "hidden" }}>
        <div style={{
          width: `${pct}%`,
          height: "100%",
          background: barColor,
          borderRadius: 3,
          transition: "width 0.3s, background 0.3s",
        }} />
      </div>
    </div>
  );
}

export default function MacroBars({ entries, customFoods, target, phaseColor }) {
  const macros = sumMacros(entries, customFoods);
  return (
    <div style={{
      padding: "16px 18px",
      borderRadius: 10,
      background: "#FFFFFF",
      border: "1px solid rgba(0,0,0,0.08)",
      marginBottom: 14,
      boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
    }}>
      <div style={{ fontSize: 11, color: "#6E6E78", textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>
        Today's Totals
      </div>
      <Bar
        label="Protein"
        current={macros.protein}
        target={target.protein}
        status={statusFor("protein", macros.protein, target.protein)}
        phaseColor={phaseColor}
        unit="g"
      />
      <Bar
        label="Calories"
        current={macros.calories}
        target={target.calories}
        status={statusFor("calories", macros.calories, target.calories)}
        phaseColor={phaseColor}
        unit=""
      />
      <Bar
        label="Carbs"
        current={macros.carbs}
        target={target.carbs}
        status={statusFor("carbs", macros.carbs, target.carbs)}
        phaseColor={phaseColor}
        unit="g"
      />
      <Bar
        label="Fat"
        current={macros.fat}
        target={target.fat}
        status={statusFor("fat", macros.fat, target.fat)}
        phaseColor={phaseColor}
        unit="g"
      />
    </div>
  );
}
