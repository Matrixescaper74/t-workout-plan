import { useState } from "react";
import { useIsMobile } from "./lib/useIsMobile.js";
import Workout from "./Workout.jsx";
import Meals from "./Meals.jsx";

const SECTIONS = [
  { id: "workout", label: "Workout", icon: "🏋️" },
  { id: "meals", label: "Meals", icon: "🥗" },
];

export default function App() {
  const [section, setSection] = useState("workout");
  const [activePhase, setActivePhase] = useState(0);
  const isMobile = useIsMobile();

  return (
    <div style={{
      fontFamily: "'Georgia', serif",
      background: "linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #16213e 100%)",
      minHeight: "100vh",
      color: "#e8e8f0",
      padding: "0",
    }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(90deg, #0f0f1a, #1e1e3f)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        padding: isMobile ? "20px 18px 14px" : "28px 32px 18px",
      }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <div style={{ fontSize: 11, letterSpacing: 4, color: "#888", textTransform: "uppercase", marginBottom: 6 }}>
            Personalized Training Program
          </div>
          <h1 style={{
            margin: 0, fontSize: isMobile ? 22 : 26, fontWeight: "normal", letterSpacing: -0.5,
            background: "linear-gradient(90deg, #fff 0%, #a0c4e8 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>
            Tammy's Strength & Nutrition Plan
          </h1>

          {/* Section toggle */}
          <div style={{ display: "flex", gap: 6, marginTop: 16 }}>
            {SECTIONS.map(s => (
              <button
                key={s.id}
                onClick={() => setSection(s.id)}
                style={{
                  flex: isMobile ? 1 : "0 0 auto",
                  padding: "10px 18px",
                  minHeight: 44,
                  borderRadius: 8,
                  border: section === s.id ? "1px solid rgba(160,196,232,0.5)" : "1px solid rgba(255,255,255,0.1)",
                  background: section === s.id
                    ? "linear-gradient(135deg, rgba(160,196,232,0.18), rgba(160,196,232,0.06))"
                    : "rgba(255,255,255,0.03)",
                  color: section === s.id ? "#fff" : "#aaa",
                  fontSize: 13,
                  fontFamily: "'Georgia', serif",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                {s.icon} {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Active section */}
      {section === "workout" ? (
        <Workout activePhase={activePhase} setActivePhase={setActivePhase} />
      ) : (
        <Meals activePhase={activePhase} />
      )}
    </div>
  );
}
