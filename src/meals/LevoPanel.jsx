import { levoPhase, levoMinutesElapsed, levoMinutesRemaining, formatTimeOfDay } from "../lib/macros.js";

export default function LevoPanel({ levoTakenAt, onTakeLevo, onClearLevo, now }) {
  const phase = levoPhase(levoTakenAt, now);

  if (phase === "untaken") {
    return (
      <div style={{
        padding: "14px 18px",
        borderRadius: 10,
        background: "#FFFFFF",
        border: "1px dashed rgba(0,0,0,0.15)",
        marginBottom: 14,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 10,
      }}>
        <div style={{ fontSize: 13, color: "#4C4C57" }}>
          <span style={{ color: "#1A1A1F", fontWeight: "bold" }}>💊 Levothyroxine</span> — take when you wake, then tap below
        </div>
        <button
          onClick={onTakeLevo}
          style={{
            padding: "10px 16px",
            minHeight: 44,
            borderRadius: 8,
            background: "#2D6B7C",
            color: "#FFFFFF",
            border: "none",
            cursor: "pointer",
            fontSize: 13,
            fontWeight: "bold",
            fontFamily: "'Georgia', serif",
          }}
        >
          I took my levo
        </button>
      </div>
    );
  }

  if (phase === "clear") {
    return (
      <div style={{
        padding: "10px 14px",
        borderRadius: 10,
        background: "#E8F5E9",
        border: "1px solid #A5D6A7",
        marginBottom: 14,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 10,
      }}>
        <div style={{ fontSize: 12, color: "#1B5E20" }}>
          ✅ Levo absorbed — eat anything (taken {formatTimeOfDay(levoTakenAt)})
        </div>
        <button
          onClick={onClearLevo}
          style={{
            padding: "6px 10px",
            background: "transparent",
            border: "1px solid rgba(0,0,0,0.1)",
            color: "#4C4C57",
            borderRadius: 6,
            fontSize: 11,
            cursor: "pointer",
          }}
        >
          reset
        </button>
      </div>
    );
  }

  // blocked / soft / high-only
  const elapsed = levoMinutesElapsed(levoTakenAt, now);
  const remaining =
    phase === "blocked" ? levoMinutesRemaining(levoTakenAt, 30, now) :
    phase === "soft" ? levoMinutesRemaining(levoTakenAt, 60, now) :
    levoMinutesRemaining(levoTakenAt, 240, now);

  const banner =
    phase === "blocked"
      ? { bg: "#FFF1E0", border: "#E8A765", text: "#8B4513", emoji: "⏱️" }
      : phase === "soft"
      ? { bg: "#FFF7EB", border: "#E8C49A", text: "#9B5A1F", emoji: "⌛" }
      : { bg: "#F4F1FA", border: "#C5BCE0", text: "#4A3E73", emoji: "💊" };

  const headline =
    phase === "blocked" ? `Wait ${remaining} more min before food or coffee` :
    phase === "soft" ? `${remaining} min until full absorption window clears` :
    `${remaining} min until clear of high-interference foods (coffee, cheese, calcium)`;

  return (
    <div style={{
      padding: "12px 16px",
      borderRadius: 10,
      background: banner.bg,
      border: `1px solid ${banner.border}`,
      marginBottom: 14,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: 10,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1, minWidth: 200 }}>
        <span style={{ fontSize: 20 }}>{banner.emoji}</span>
        <div>
          <div style={{ fontSize: 13, color: banner.text, fontWeight: "bold" }}>{headline}</div>
          <div style={{ fontSize: 11, color: "#5C5C66", marginTop: 2 }}>
            Levo taken at {formatTimeOfDay(levoTakenAt)} ({elapsed} min ago)
          </div>
        </div>
      </div>
      <button
        onClick={onClearLevo}
        style={{
          padding: "6px 10px",
          background: "transparent",
          border: "1px solid rgba(0,0,0,0.15)",
          color: "#4C4C57",
          borderRadius: 6,
          fontSize: 11,
          cursor: "pointer",
        }}
      >
        reset
      </button>
    </div>
  );
}
