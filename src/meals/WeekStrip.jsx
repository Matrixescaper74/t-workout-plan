import { sumMacros } from "../lib/macros.js";

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function WeekStrip({ days, viewingDate, onSelect, customFoods, target, phaseColor }) {
  return (
    <div style={{
      display: "flex",
      gap: 6,
      marginBottom: 14,
      overflowX: "auto",
      paddingBottom: 4,
      WebkitOverflowScrolling: "touch",
    }}>
      {days.map(d => {
        const isSelected = d.dateKey === viewingDate;
        const macros = sumMacros(d.day.entries, customFoods);
        const hasData = d.day.entries.length > 0;
        const proteinHit = macros.protein >= target.protein * 0.9;

        return (
          <button
            key={d.dateKey}
            onClick={() => onSelect(d.dateKey)}
            style={{
              flex: "1 1 auto",
              minWidth: 56,
              padding: "10px 8px",
              minHeight: 64,
              borderRadius: 8,
              border: isSelected
                ? `1px solid ${phaseColor}`
                : "1px solid rgba(0,0,0,0.08)",
              background: isSelected
                ? `${phaseColor}14`
                : d.isToday
                  ? "#FFFFFF"
                  : "#FFFFFF",
              color: "#1A1A1F",
              cursor: "pointer",
              fontFamily: "'Georgia', serif",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              transition: "all 0.15s",
              boxShadow: isSelected ? `0 1px 4px ${phaseColor}33` : "0 1px 2px rgba(0,0,0,0.03)",
              position: "relative",
            }}
          >
            <div style={{ fontSize: 10, color: "#6E6E78", textTransform: "uppercase", letterSpacing: 1 }}>
              {DAY_NAMES[d.date.getDay()]}
            </div>
            <div style={{ fontSize: 18, color: "#1A1A1F", fontWeight: "bold", lineHeight: 1 }}>
              {d.date.getDate()}
            </div>
            <div style={{
              fontSize: 9,
              color: hasData ? (proteinHit ? "#2E8B57" : phaseColor) : "#85858F",
              marginTop: 2,
              fontWeight: "bold",
            }}>
              {hasData ? `${Math.round(macros.protein)}g` : "—"}
            </div>
            {d.isToday && (
              <div style={{
                position: "absolute",
                top: 4,
                right: 6,
                width: 5,
                height: 5,
                borderRadius: "50%",
                background: phaseColor,
              }} />
            )}
          </button>
        );
      })}
    </div>
  );
}
