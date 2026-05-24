import { levoPhase, levoMinutesElapsed, levoMinutesRemaining, formatTimeOfDay } from "../lib/macros.js";

export default function LevoPanel({ levoTakenAt, onTakeLevo, onClearLevo, now }) {
  const phase = levoPhase(levoTakenAt, now);

  if (phase === "untaken") {
    return (
      <div style={{
        padding: "14px 18px",
        borderRadius: 10,
        background: "rgba(255,255,255,0.03)",
        border: "1px dashed rgba(255,255,255,0.12)",
        marginBottom: 14,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 10,
      }}>
        <div style={{ fontSize: 13, color: "#bbb" }}>
          <span style={{ color: "#fff", fontWeight: "bold" }}>💊 Levothyroxine</span> — take when you wake, then tap below
        </div>
        <button
          onClick={onTakeLevo}
          style={{
            padding: "10px 16px",
            minHeight: 44,
            borderRadius: 8,
            background: "#4A90A4",
            color: "#fff",
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
        background: "rgba(46,139,87,0.10)",
        border: "1px solid rgba(46,139,87,0.30)",
        marginBottom: 14,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 10,
      }}>
        <div style={{ fontSize: 12, color: "#9bd3b0" }}>
          ✅ Levo absorbed — eat anything (taken {formatTimeOfDay(levoTakenAt)})
        </div>
        <button
          onClick={onClearLevo}
          style={{
            padding: "6px 10px",
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "#888",
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

  const isStrong = phase === "blocked";
  const banner = isStrong
    ? { bg: "rgba(232,131,58,0.16)", border: "rgba(232,131,58,0.50)", text: "#FFC58F", emoji: "⏱️" }
    : phase === "soft"
    ? { bg: "rgba(232,131,58,0.10)", border: "rgba(232,131,58,0.30)", text: "#E8B080", emoji: "⌛" }
    : { bg: "rgba(107,94,168,0.08)", border: "rgba(107,94,168,0.25)", text: "#B0A6D6", emoji: "💊" };

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
          <div style={{ fontSize: 11, color: "#888", marginTop: 2 }}>
            Levo taken at {formatTimeOfDay(levoTakenAt)} ({elapsed} min ago)
          </div>
        </div>
      </div>
      <button
        onClick={onClearLevo}
        style={{
          padding: "6px 10px",
          background: "transparent",
          border: "1px solid rgba(255,255,255,0.1)",
          color: "#888",
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
