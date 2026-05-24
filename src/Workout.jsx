import { useState } from "react";
import { useIsMobile } from "./lib/useIsMobile.js";
import { phases } from "./data/workoutPhases.js";

function youtubeSearchUrl(exerciseName) {
  const query = encodeURIComponent(`${exerciseName} proper form technique`);
  return `https://www.youtube.com/results?search_query=${query}`;
}

export default function Workout({ activePhase, setActivePhase }) {
  const [activeDay, setActiveDay] = useState(0);
  const [activeTab, setActiveTab] = useState("training");
  const isMobile = useIsMobile();

  const phase = phases[activePhase];

  return (
    <div>
      <div style={{ maxWidth: 860, margin: "0 auto", padding: isMobile ? "20px 16px" : "24px 24px" }}>

        {/* Phase Selector */}
        <div style={{ display: "flex", gap: 10, marginBottom: 28, flexWrap: "wrap" }}>
          {phases.map((p, i) => (
            <button
              key={p.id}
              onClick={() => { setActivePhase(i); setActiveDay(0); setActiveTab("training"); }}
              style={{
                flex: isMobile ? "1 1 calc(50% - 5px)" : "1 1 180px",
                minHeight: 64,
                padding: "14px 16px",
                borderRadius: 10,
                border: `1px solid ${activePhase === i ? p.color : "rgba(0,0,0,0.08)"}`,
                background: activePhase === i ? `${p.color}14` : "#FFFFFF",
                color: activePhase === i ? "#1A1A1F" : "#4C4C57",
                cursor: "pointer",
                textAlign: "left",
                transition: "all 0.2s",
                boxShadow: activePhase === i ? `0 2px 8px ${p.color}22` : "0 1px 2px rgba(0,0,0,0.04)",
              }}
            >
              <div style={{ fontSize: 20, marginBottom: 4 }}>{p.icon}</div>
              <div style={{ fontSize: 13, fontWeight: "bold", marginBottom: 2 }}>{p.name}</div>
              <div style={{ fontSize: 11, color: activePhase === i ? p.color : "#6E6E78" }}>{p.weeks}</div>
            </button>
          ))}
        </div>

        {/* Phase Header */}
        <div style={{
          padding: "22px 24px",
          borderRadius: 12,
          background: `linear-gradient(135deg, ${phase.color}10, ${phase.color}06)`,
          border: `1px solid ${phase.color}33`,
          marginBottom: 20
        }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                <span style={{ fontSize: 24 }}>{phase.icon}</span>
                <div>
                  <h2 style={{ margin: 0, fontSize: 22, fontWeight: "normal", color: "#1A1A1F" }}>{phase.name}</h2>
                  <div style={{ fontSize: 12, color: phase.color, letterSpacing: 1, textTransform: "uppercase", marginTop: 2, fontWeight: "bold" }}>{phase.weeks}</div>
                </div>
              </div>
              <p style={{ margin: "10px 0 0", fontSize: 14, color: "#4C4C57", fontStyle: "italic", lineHeight: 1.6 }}>
                {phase.goal}
              </p>
            </div>
            <div style={{ textAlign: "right", minWidth: 140 }}>
              <div style={{ fontSize: 11, color: "#6E6E78", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>Frequency</div>
              <div style={{ fontSize: 14, color: phase.color, fontWeight: "bold" }}>{phase.training.frequency}</div>
              <div style={{ fontSize: 11, color: "#6E6E78", textTransform: "uppercase", letterSpacing: 1, marginTop: 10, marginBottom: 4 }}>Rest Periods</div>
              <div style={{ fontSize: 13, color: "#4C4C57" }}>{phase.training.rest}</div>
            </div>
          </div>
          <div style={{
            marginTop: 14, padding: "10px 14px",
            borderRadius: 8, background: `${phase.color}14`,
            border: `1px solid ${phase.color}33`,
            fontSize: 13, color: "#2A2A2F"
          }}>
            <span style={{ color: phase.color, fontWeight: "bold" }}>Progression Rule: </span>
            {phase.training.progression}
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 4, marginBottom: 18 }}>
          {["training", "nutrition", "milestones"].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                flex: isMobile ? 1 : "0 0 auto",
                padding: "12px 18px",
                minHeight: 44,
                borderRadius: 6,
                border: activeTab === tab ? "none" : "1px solid rgba(0,0,0,0.08)",
                background: activeTab === tab ? phase.color : "#FFFFFF",
                color: activeTab === tab ? "#FFFFFF" : "#4C4C57",
                cursor: "pointer",
                fontSize: 13,
                textTransform: "capitalize",
                letterSpacing: 0.5,
                fontFamily: "'Georgia', serif",
                fontWeight: activeTab === tab ? "bold" : "normal",
                transition: "all 0.15s"
              }}
            >
              {tab === "training" ? "🏋️ Training" : tab === "nutrition" ? "🥗 Nutrition" : "✅ Milestones"}
            </button>
          ))}
        </div>

        {/* Training Tab */}
        {activeTab === "training" && (
          <div>
            {/* Day selector */}
            <div style={{ display: "flex", gap: 8, marginBottom: 18, flexWrap: "wrap" }}>
              {phase.training.days.map((d, i) => (
                <button
                  key={i}
                  onClick={() => setActiveDay(i)}
                  style={{
                    padding: "12px 14px",
                    minHeight: 44,
                    borderRadius: 6,
                    border: `1px solid ${activeDay === i ? phase.color : "rgba(0,0,0,0.08)"}`,
                    background: activeDay === i ? `${phase.color}14` : "#FFFFFF",
                    color: activeDay === i ? "#1A1A1F" : "#4C4C57",
                    cursor: "pointer",
                    fontSize: 12,
                    transition: "all 0.15s"
                  }}
                >
                  {d.day.split("—")[0].trim()}
                  <span style={{ color: activeDay === i ? phase.color : "#85858F", marginLeft: 4, fontSize: 11 }}>
                    {d.day.includes("—") ? "— " + d.day.split("—")[1].trim() : ""}
                  </span>
                </button>
              ))}
            </div>

            {/* Exercise table */}
            <div style={{
              borderRadius: 10,
              border: "1px solid rgba(0,0,0,0.08)",
              overflow: "hidden",
              background: "#FFFFFF",
            }}>
              <div style={{
                padding: "12px 18px",
                background: `${phase.color}1A`,
                fontSize: 14,
                fontWeight: "bold",
                color: "#1A1A1F",
                borderBottom: `1px solid ${phase.color}33`
              }}>
                {phase.training.days[activeDay].day}
              </div>
              {phase.training.days[activeDay].exercises.map((ex, i) => {
                const isOngoingStrategy = activePhase === 3;
                const rowStyle = {
                  display: "flex",
                  alignItems: "center",
                  padding: "13px 18px",
                  minHeight: 56,
                  background: i % 2 === 0 ? "#FFFFFF" : "rgba(0,0,0,0.02)",
                  borderBottom: i < phase.training.days[activeDay].exercises.length - 1 ? "1px solid rgba(0,0,0,0.05)" : "none",
                  gap: 12,
                  flexWrap: "wrap",
                  textDecoration: "none",
                  color: "inherit",
                  cursor: isOngoingStrategy ? "default" : "pointer",
                  transition: "background 0.15s"
                };
                const inner = (
                  <>
                    <div style={{
                      width: 24, height: 24, borderRadius: "50%",
                      background: `${phase.color}1F`,
                      border: `1px solid ${phase.color}55`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 11, color: phase.color, flexShrink: 0, fontWeight: "bold"
                    }}>
                      {i + 1}
                    </div>
                    <div style={{ flex: 2, minWidth: 160, fontSize: 14, color: "#1A1A1F" }}>{ex.name}</div>
                    <div style={{
                      padding: "3px 10px", borderRadius: 4,
                      background: `${phase.color}14`,
                      border: `1px solid ${phase.color}44`,
                      fontSize: 12, color: phase.color, flexShrink: 0, fontWeight: "bold"
                    }}>
                      {ex.sets}
                    </div>
                    <div style={{ flex: 2, minWidth: 140, fontSize: 12, color: "#757583", fontStyle: "italic" }}>{ex.note}</div>
                    {!isOngoingStrategy && (
                      <div
                        aria-label="Watch form video"
                        style={{
                          width: 36, height: 36, borderRadius: "50%",
                          background: `${phase.color}14`,
                          border: `1px solid ${phase.color}55`,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          flexShrink: 0,
                          marginLeft: "auto"
                        }}
                      >
                        <span style={{ color: phase.color, fontSize: 11, marginLeft: 2 }}>▶</span>
                      </div>
                    )}
                  </>
                );
                return isOngoingStrategy ? (
                  <div key={i} style={rowStyle}>{inner}</div>
                ) : (
                  <a
                    key={i}
                    href={youtubeSearchUrl(ex.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={rowStyle}
                  >
                    {inner}
                  </a>
                );
              })}
            </div>
          </div>
        )}

        {/* Nutrition Tab */}
        {activeTab === "nutrition" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{
              display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12
            }}>
              <div style={{ padding: "18px", borderRadius: 10, background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)" }}>
                <div style={{ fontSize: 11, color: "#6E6E78", textTransform: "uppercase", letterSpacing: 2, marginBottom: 8 }}>Daily Protein Target</div>
                <div style={{ fontSize: 22, color: phase.color, fontWeight: "bold", marginBottom: 4 }}>{phase.nutrition.protein.split(" ")[0]}</div>
                <div style={{ fontSize: 13, color: "#4C4C57" }}>{phase.nutrition.protein.split(" ").slice(1).join(" ")}</div>
              </div>
              <div style={{ padding: "18px", borderRadius: 10, background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)" }}>
                <div style={{ fontSize: 11, color: "#6E6E78", textTransform: "uppercase", letterSpacing: 2, marginBottom: 8 }}>Daily Calories</div>
                <div style={{ fontSize: 22, color: phase.color, fontWeight: "bold", marginBottom: 4 }}>{phase.nutrition.calories.split(" ")[0]}</div>
                <div style={{ fontSize: 13, color: "#4C4C57" }}>{phase.nutrition.calories.split(" ").slice(1).join(" ")}</div>
              </div>
            </div>
            <div style={{ padding: "18px", borderRadius: 10, background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)" }}>
              <div style={{ fontSize: 12, color: "#6E6E78", textTransform: "uppercase", letterSpacing: 2, marginBottom: 14 }}>Phase Tips</div>
              {phase.nutrition.tips.map((tip, i) => (
                <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10, alignItems: "flex-start" }}>
                  <div style={{ color: phase.color, fontSize: 14, flexShrink: 0, marginTop: 1, fontWeight: "bold" }}>→</div>
                  <div style={{ fontSize: 14, color: "#2A2A2F", lineHeight: 1.5 }}>{tip}</div>
                </div>
              ))}
            </div>
            {activePhase === 0 && (
              <div style={{ padding: "16px 18px", borderRadius: 10, background: "#EBF4F7", border: "1px solid #4A90A455" }}>
                <div style={{ fontSize: 13, color: "#1A1A1F", lineHeight: 1.6 }}>
                  <span style={{ color: "#2D6B7C", fontWeight: "bold" }}>Levothyroxine Reminder: </span>
                  Take on an empty stomach 30–60 minutes before eating. Avoid calcium or iron supplements within 4 hours as they block thyroid hormone absorption.
                </div>
              </div>
            )}
          </div>
        )}

        {/* Milestones Tab */}
        {activeTab === "milestones" && (
          <div style={{ padding: "20px", borderRadius: 10, background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)" }}>
            <div style={{ fontSize: 12, color: "#6E6E78", textTransform: "uppercase", letterSpacing: 2, marginBottom: 18 }}>
              End-of-Phase Milestones
            </div>
            {phase.milestones.map((m, i) => (
              <div key={i} style={{ display: "flex", gap: 12, marginBottom: 14, alignItems: "flex-start" }}>
                <div style={{
                  width: 22, height: 22, borderRadius: 4,
                  border: `1px solid ${phase.color}66`,
                  background: `${phase.color}11`,
                  flexShrink: 0, marginTop: 1
                }} />
                <div style={{ fontSize: 14, color: "#1A1A1F", lineHeight: 1.5 }}>{m}</div>
              </div>
            ))}
            <div style={{
              marginTop: 20, padding: "14px 16px", borderRadius: 8,
              background: `${phase.color}0F`, border: `1px solid ${phase.color}33`,
              fontSize: 13, color: "#4C4C57", fontStyle: "italic", lineHeight: 1.6
            }}>
              These are checkpoints, not requirements. Every body responds differently. Progress is progress — compare yourself only to last week's version of you.
            </div>
          </div>
        )}

        {/* Bottom nav */}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 28, paddingTop: 20, borderTop: "1px solid rgba(0,0,0,0.06)" }}>
          <button
            onClick={() => { if (activePhase > 0) { setActivePhase(activePhase - 1); setActiveDay(0); setActiveTab("training"); } }}
            style={{
              padding: "12px 18px", minHeight: 44, borderRadius: 8, border: "1px solid rgba(0,0,0,0.08)",
              background: "#FFFFFF", color: activePhase > 0 ? "#4C4C57" : "#C0C0C8",
              cursor: activePhase > 0 ? "pointer" : "default", fontSize: 13
            }}
          >
            ← {isMobile ? "Prev" : "Previous Phase"}
          </button>
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            {phases.map((p, i) => (
              <div key={i} style={{
                width: i === activePhase ? 20 : 6,
                height: 6, borderRadius: 3,
                background: i === activePhase ? phase.color : "rgba(0,0,0,0.15)",
                transition: "all 0.3s"
              }} />
            ))}
          </div>
          <button
            onClick={() => { if (activePhase < phases.length - 1) { setActivePhase(activePhase + 1); setActiveDay(0); setActiveTab("training"); } }}
            style={{
              padding: "12px 18px", minHeight: 44, borderRadius: 8,
              border: `1px solid ${activePhase < phases.length - 1 ? phase.color : "rgba(0,0,0,0.08)"}`,
              background: activePhase < phases.length - 1 ? `${phase.color}14` : "#FFFFFF",
              color: activePhase < phases.length - 1 ? "#1A1A1F" : "#C0C0C8",
              cursor: activePhase < phases.length - 1 ? "pointer" : "default", fontSize: 13,
              fontWeight: activePhase < phases.length - 1 ? "bold" : "normal",
            }}
          >
            {isMobile ? "Next" : "Next Phase"} →
          </button>
        </div>
      </div>
    </div>
  );
}
