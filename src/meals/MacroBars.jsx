import { sumMacros, progressPct, statusFor } from "../lib/macros.js";

const STATUS_COLORS = {
  under: null,    // use phase color
  ok: "#2E8B57",  // green
  over: "#C95B5B",
};

const HIT_COLOR = "#2E8B57";  // green
const TO_GO_COLOR = "#5C5C66"; // muted slate
const OVER_OK_COLOR = "#2E8B57"; // green (over protein is good)
const OVER_WARN_COLOR = "#9B5A1F"; // warm orange (over calories/carbs/fat)

function remainingDisplay(macro, current, target, unit) {
  const remaining = target - current;
  if (Math.abs(remaining) < 1) {
    return { text: "✓ target hit", color: HIT_COLOR };
  }
  if (remaining >= 1) {
    return {
      text: `${Math.round(remaining)}${unit} to go`,
      color: TO_GO_COLOR,
    };
  }
  const over = Math.abs(Math.round(remaining));
  const color = macro === "protein" ? OVER_OK_COLOR : OVER_WARN_COLOR;
  return { text: `+${over}${unit} over`, color };
}

function Bar({ macro, label, current, target, status, phaseColor, unit }) {
  const pct = progressPct(current, target);
  const barColor = STATUS_COLORS[status] || phaseColor;
  const remaining = remainingDisplay(macro, current, target, unit);
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 5,
        gap: 8,
        flexWrap: "wrap",
      }}>
        <span style={{ fontSize: 11, color: "#6E6E78", textTransform: "uppercase", letterSpacing: 1.5 }}>
          {label}
        </span>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
          <span style={{ fontSize: 12, color: "#1A1A1F", fontWeight: "bold" }}>
            {Math.round(current)}{unit} <span style={{ color: "#85858F", fontWeight: "normal" }}>/ {target}{unit}</span>
          </span>
          <span style={{
            fontSize: 11,
            color: remaining.color,
            fontWeight: "bold",
          }}>
            {remaining.text}
          </span>
        </div>
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
        macro="protein"
        label="Protein"
        current={macros.protein}
        target={target.protein}
        status={statusFor("protein", macros.protein, target.protein)}
        phaseColor={phaseColor}
        unit="g"
      />
      <Bar
        macro="calories"
        label="Calories"
        current={macros.calories}
        target={target.calories}
        status={statusFor("calories", macros.calories, target.calories)}
        phaseColor={phaseColor}
        unit=""
      />
      <Bar
        macro="carbs"
        label="Carbs"
        current={macros.carbs}
        target={target.carbs}
        status={statusFor("carbs", macros.carbs, target.carbs)}
        phaseColor={phaseColor}
        unit="g"
      />
      <Bar
        macro="fat"
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
