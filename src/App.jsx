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
      background: "linear-gradient(180deg, #FFFFFF 0%, #FAFAF7 100%)",
      minHeight: "100vh",
      color: "#1A1A1F",
      padding: "0",
    }}>
      {/* Header */}
      <div style={{
        background: "#FFFFFF",
        borderBottom: "1px solid rgba(0,0,0,0.06)",
        padding: isMobile ? "20px 18px 14px" : "28px 32px 18px",
      }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <div style={{ fontSize: 11, letterSpacing: 4, color: "#6E6E78", textTransform: "uppercase", marginBottom: 6 }}>
            Personalized Training Program
          </div>
          <h1 style={{
            margin: 0, fontSize: isMobile ? 22 : 26, fontWeight: "normal", letterSpacing: -0.5,
            color: "#1A1A1F",
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
                  border: section === s.id ? "1px solid #2D6B7C" : "1px solid rgba(0,0,0,0.08)",
                  background: section === s.id
                    ? "#EBF4F7"
                    : "#FFFFFF",
                  color: section === s.id ? "#1A1A1F" : "#4C4C57",
                  fontSize: 13,
                  fontFamily: "'Georgia', serif",
                  fontWeight: section === s.id ? "bold" : "normal",
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
