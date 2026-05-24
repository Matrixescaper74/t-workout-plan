import { useState, useEffect } from "react";

function youtubeSearchUrl(exerciseName) {
  const query = encodeURIComponent(`${exerciseName} proper form technique`);
  return `https://www.youtube.com/results?search_query=${query}`;
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 600 : false
  );
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 600);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return isMobile;
}

const phases = [
  {
    id: 1,
    name: "Foundation Phase",
    weeks: "Weeks 1–4",
    subtitle: "Learn the movements, build the habit",
    color: "#4A90A4",
    lightColor: "#E8F4F8",
    icon: "🌱",
    goal: "Master form on all key exercises. Focus on feeling the muscle work, not just moving the weight.",
    training: {
      frequency: "3 days/week",
      rest: "90 seconds between sets",
      progression: "Same weights — perfect your form first",
      days: [
        {
          day: "Day 1 — Push",
          exercises: [
            { name: "DB Bench Press", sets: "3 × 10", note: "Light weight, full range" },
            { name: "DB Shoulder Press", sets: "3 × 10", note: "Seated, controlled" },
            { name: "Lateral Raises", sets: "3 × 12", note: "Cable or DB, very light" },
            { name: "Tricep Pushdowns", sets: "3 × 12", note: "Band or cable" },
          ]
        },
        {
          day: "Day 2 — Legs",
          exercises: [
            { name: "Goblet Squat", sets: "3 × 10", note: "DB, sit back into it" },
            { name: "Romanian Deadlift", sets: "3 × 10", note: "Focus on hip hinge" },
            { name: "Leg Press", sets: "3 × 12", note: "Moderate weight" },
            { name: "Calf Raises", sets: "3 × 15", note: "Full stretch & squeeze" },
          ]
        },
        {
          day: "Day 3 — Pull",
          exercises: [
            { name: "Lat Pulldown", sets: "3 × 10", note: "Drive elbows down" },
            { name: "Seated Cable Row", sets: "3 × 10", note: "Chest tall, elbows back" },
            { name: "Face Pulls", sets: "3 × 15", note: "Light — shoulder health" },
            { name: "DB Bicep Curls", sets: "3 × 12", note: "Supinate at top" },
          ]
        }
      ]
    },
    nutrition: {
      protein: "Start working toward 100g/day",
      calories: "~1,800 cal/day",
      tips: ["Add 1 protein source to every meal", "Start creatine (3–5g/day, any time)", "Take levothyroxine 30–60 min before eating"]
    },
    milestones: ["Completed all 3 workouts at least 10 times", "Feeling the right muscles working", "Hitting 80–90g protein daily", "Energy and sleep improving"]
  },
  {
    id: 2,
    name: "Build Phase",
    weeks: "Weeks 5–8",
    subtitle: "Add load, see the first changes",
    color: "#E8833A",
    lightColor: "#FDF0E8",
    icon: "🔥",
    goal: "Progressively increase weight each week. You should feel challenged on the last 2 reps of every set.",
    training: {
      frequency: "3–4 days/week",
      rest: "60–75 seconds between sets",
      progression: "Add 2.5–5 lbs whenever all reps are completed with good form",
      days: [
        {
          day: "Day 1 — Push",
          exercises: [
            { name: "DB Bench Press", sets: "3 × 10", note: "+5 lbs from Phase 1" },
            { name: "Incline DB Press", sets: "3 × 10", note: "New — upper chest" },
            { name: "DB Shoulder Press", sets: "3 × 10", note: "Increase weight" },
            { name: "Lateral Raises", sets: "3 × 12–15", note: "Add a set" },
            { name: "Tricep Overhead Ext.", sets: "3 × 12", note: "New exercise" },
          ]
        },
        {
          day: "Day 2 — Legs",
          exercises: [
            { name: "Barbell or DB Squat", sets: "4 × 10", note: "Add a set" },
            { name: "Romanian Deadlift", sets: "3 × 10", note: "Heavier" },
            { name: "Walking Lunges", sets: "3 × 10 each", note: "New — replace leg press 1x/wk" },
            { name: "Hip Thrust (machine/barbell)", sets: "3 × 12", note: "New — glute focus" },
            { name: "Calf Raises", sets: "3 × 15", note: "Add weight" },
          ]
        },
        {
          day: "Day 3 — Pull",
          exercises: [
            { name: "Assisted Pull-Up or Pulldown", sets: "4 × 10", note: "Work toward bodyweight" },
            { name: "DB Bent-Over Row", sets: "3 × 10", note: "Heavier" },
            { name: "Cable Row", sets: "3 × 10", note: "Add weight" },
            { name: "Face Pulls", sets: "3 × 15", note: "Every session" },
            { name: "Hammer Curls", sets: "3 × 12", note: "New variation" },
          ]
        },
        {
          day: "Day 4 (Optional) — Full Body",
          exercises: [
            { name: "Deadlift", sets: "3 × 8", note: "Start light, add weight weekly" },
            { name: "Step-Ups with DBs", sets: "3 × 10", note: "Knee height box" },
            { name: "Plank", sets: "3 × 40 sec", note: "Build to 60 sec" },
            { name: "Dead Bug", sets: "3 × 10", note: "Each side" },
          ]
        }
      ]
    },
    nutrition: {
      protein: "Consistently hitting 100–110g/day",
      calories: "1,850–1,950 cal/day",
      tips: ["Post-workout protein within 1–2 hours", "Don't skip carbs on training days", "If energy is low, eat more — especially carbs"]
    },
    milestones: ["Lifting heavier than Week 1 on every exercise", "Visible shoulder and arm definition starting", "Hitting 4 workouts/week when possible", "Tracking protein daily"]
  },
  {
    id: 3,
    name: "Strength Phase",
    weeks: "Weeks 9–16",
    subtitle: "Heavier, stronger, more defined",
    color: "#6B5EA8",
    lightColor: "#F0EEF9",
    icon: "💪",
    goal: "Push heavier weights on compound lifts. This is where real muscle is built. Embrace the challenge.",
    training: {
      frequency: "4 days/week",
      rest: "75–90 seconds between sets",
      progression: "Increase weight weekly on main lifts. Add reps or sets when weight feels too easy.",
      days: [
        {
          day: "Day 1 — Push (Heavy)",
          exercises: [
            { name: "Barbell or DB Bench Press", sets: "4 × 8", note: "Heavier, fewer reps" },
            { name: "Overhead Press", sets: "4 × 8", note: "Standing or seated" },
            { name: "Incline DB Press", sets: "3 × 10", note: "Accessory work" },
            { name: "Cable Lateral Raises", sets: "3 × 15", note: "Burnout set" },
            { name: "Skull Crushers or Dips", sets: "3 × 10", note: "Tricep mass builder" },
          ]
        },
        {
          day: "Day 2 — Legs (Heavy)",
          exercises: [
            { name: "Barbell Squat", sets: "4 × 8", note: "Challenge the weight" },
            { name: "Romanian Deadlift", sets: "4 × 8", note: "Heavy — feel the stretch" },
            { name: "Hip Thrust", sets: "4 × 10", note: "Add weight each week" },
            { name: "Leg Curl (lying or seated)", sets: "3 × 12", note: "Isolation hamstring" },
            { name: "Calf Raises", sets: "4 × 15", note: "Slow and controlled" },
          ]
        },
        {
          day: "Day 3 — Pull (Heavy)",
          exercises: [
            { name: "Pull-Up or Heavy Pulldown", sets: "4 × 6–8", note: "Most challenging pull yet" },
            { name: "Barbell or DB Row", sets: "4 × 8", note: "Heavy compound pull" },
            { name: "Single-Arm DB Row", sets: "3 × 10", note: "Full stretch at bottom" },
            { name: "Face Pulls", sets: "3 × 15", note: "Every session, always" },
            { name: "Incline DB Curl", sets: "3 × 12", note: "Full bicep stretch" },
          ]
        },
        {
          day: "Day 4 — Lower/Core",
          exercises: [
            { name: "Conventional Deadlift", sets: "4 × 5–6", note: "Heavy strength work" },
            { name: "Bulgarian Split Squat", sets: "3 × 8 each", note: "Challenging unilateral" },
            { name: "Ab Wheel Rollout", sets: "3 × 10", note: "Or cable crunch" },
            { name: "Pallof Press", sets: "3 × 12", note: "Anti-rotation core" },
          ]
        }
      ]
    },
    nutrition: {
      protein: "Consistently 110–115g/day",
      calories: "1,900–1,950 cal/day",
      tips: ["Consider a protein-rich snack before bed (cottage cheese is ideal)", "Increase calories on heaviest training days", "Track strength numbers — celebrate PRs"]
    },
    milestones: ["Setting personal records on squats, deadlifts, rows", "Noticeably more defined shoulders and glutes", "Clothes fitting very differently", "Energy and confidence at a high"]
  },
  {
    id: 4,
    name: "Long Game",
    weeks: "Month 4 & Beyond",
    subtitle: "This is where it gets really good",
    color: "#2E8B57",
    lightColor: "#EAF5EE",
    icon: "🏆",
    goal: "Maintain consistency, cycle training intensity, and keep making progress. This is a lifestyle, not a program.",
    training: {
      frequency: "3–4 days/week (sustainable)",
      rest: "Adjust by feel — heavier work needs more rest",
      progression: "Deload every 8–10 weeks (reduce weight by 40%, same movements). Then build again.",
      days: [
        {
          day: "Ongoing Strategy",
          exercises: [
            { name: "Rotate exercise variations", sets: "Every 4–6 wks", note: "Keep the body adapting" },
            { name: "Deload week (every 8–10 wks)", sets: "40% less weight", note: "Active recovery — don't skip this" },
            { name: "Track your lifts", sets: "Weekly", note: "Note weights, reps, how you felt" },
            { name: "Add new challenges", sets: "As desired", note: "Classes, hikes, new equipment" },
          ]
        }
      ]
    },
    nutrition: {
      protein: "100–115g/day — permanently",
      calories: "Adjust based on goals — maintain or continue slight surplus",
      tips: ["Protein is not negotiable — this is lifelong", "If weight creeps too high, reduce carbs slightly", "Creatine is a permanent addition — it's that good"]
    },
    milestones: ["A year in — dramatic physical transformation", "Strongest she has ever been", "Bone density improving (important for long-term health)", "A sustainable routine she genuinely enjoys"]
  }
];

export default function ProgressionPlan() {
  const [activePhase, setActivePhase] = useState(0);
  const [activeDay, setActiveDay] = useState(0);
  const [activeTab, setActiveTab] = useState("training");
  const isMobile = useIsMobile();

  const phase = phases[activePhase];

  return (
    <div style={{
      fontFamily: "'Georgia', serif",
      background: "linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #16213e 100%)",
      minHeight: "100vh",
      color: "#e8e8f0",
      padding: "0"
    }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(90deg, #0f0f1a, #1e1e3f)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        padding: isMobile ? "20px 18px 16px" : "28px 32px 20px",
      }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <div style={{ fontSize: 11, letterSpacing: 4, color: "#888", textTransform: "uppercase", marginBottom: 6, fontFamily: "'Georgia', serif" }}>
            Personalized Training Program
          </div>
          <h1 style={{
            margin: 0, fontSize: isMobile ? 24 : 28, fontWeight: "normal", letterSpacing: -0.5,
            background: "linear-gradient(90deg, #fff 0%, #a0c4e8 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
          }}>
            Week-by-Week Progression Plan
          </h1>
          <p style={{ margin: "8px 0 0", color: "#888", fontSize: 13, fontFamily: "'Georgia', serif", fontStyle: "italic" }}>
            4 progressive phases · 16+ weeks · Full gym program
          </p>
        </div>
      </div>

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
                border: `1px solid ${activePhase === i ? p.color : "rgba(255,255,255,0.08)"}`,
                background: activePhase === i
                  ? `linear-gradient(135deg, ${p.color}22, ${p.color}11)`
                  : "rgba(255,255,255,0.03)",
                color: activePhase === i ? "#fff" : "#aaa",
                cursor: "pointer",
                textAlign: "left",
                transition: "all 0.2s",
                boxShadow: activePhase === i ? `0 0 20px ${p.color}33` : "none"
              }}
            >
              <div style={{ fontSize: 20, marginBottom: 4 }}>{p.icon}</div>
              <div style={{ fontSize: 13, fontWeight: "bold", marginBottom: 2 }}>{p.name}</div>
              <div style={{ fontSize: 11, color: activePhase === i ? p.color : "#666" }}>{p.weeks}</div>
            </button>
          ))}
        </div>

        {/* Phase Header */}
        <div style={{
          padding: "22px 24px",
          borderRadius: 12,
          background: `linear-gradient(135deg, ${phase.color}18, ${phase.color}08)`,
          border: `1px solid ${phase.color}44`,
          marginBottom: 20
        }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                <span style={{ fontSize: 24 }}>{phase.icon}</span>
                <div>
                  <h2 style={{ margin: 0, fontSize: 22, fontWeight: "normal", color: "#fff" }}>{phase.name}</h2>
                  <div style={{ fontSize: 12, color: phase.color, letterSpacing: 1, textTransform: "uppercase", marginTop: 2 }}>{phase.weeks}</div>
                </div>
              </div>
              <p style={{ margin: "10px 0 0", fontSize: 14, color: "#ccc", fontStyle: "italic", lineHeight: 1.6 }}>
                {phase.goal}
              </p>
            </div>
            <div style={{ textAlign: "right", minWidth: 140 }}>
              <div style={{ fontSize: 11, color: "#666", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>Frequency</div>
              <div style={{ fontSize: 14, color: phase.color, fontWeight: "bold" }}>{phase.training.frequency}</div>
              <div style={{ fontSize: 11, color: "#666", textTransform: "uppercase", letterSpacing: 1, marginTop: 10, marginBottom: 4 }}>Rest Periods</div>
              <div style={{ fontSize: 13, color: "#bbb" }}>{phase.training.rest}</div>
            </div>
          </div>
          <div style={{
            marginTop: 14, padding: "10px 14px",
            borderRadius: 8, background: `${phase.color}22`,
            border: `1px solid ${phase.color}33`,
            fontSize: 13, color: "#ddd"
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
                border: "none",
                background: activeTab === tab ? phase.color : "rgba(255,255,255,0.05)",
                color: activeTab === tab ? "#fff" : "#888",
                cursor: "pointer",
                fontSize: 13,
                textTransform: "capitalize",
                letterSpacing: 0.5,
                fontFamily: "'Georgia', serif",
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
                    border: `1px solid ${activeDay === i ? phase.color : "rgba(255,255,255,0.1)"}`,
                    background: activeDay === i ? `${phase.color}22` : "rgba(255,255,255,0.03)",
                    color: activeDay === i ? "#fff" : "#aaa",
                    cursor: "pointer",
                    fontSize: 12,
                    transition: "all 0.15s"
                  }}
                >
                  {d.day.split("—")[0].trim()}
                  <span style={{ color: activeDay === i ? phase.color : "#666", marginLeft: 4, fontSize: 11 }}>
                    {d.day.includes("—") ? "— " + d.day.split("—")[1].trim() : ""}
                  </span>
                </button>
              ))}
            </div>

            {/* Exercise table */}
            <div style={{
              borderRadius: 10,
              border: "1px solid rgba(255,255,255,0.08)",
              overflow: "hidden"
            }}>
              <div style={{
                padding: "12px 18px",
                background: `${phase.color}33`,
                fontSize: 14,
                fontWeight: "bold",
                color: "#fff",
                borderBottom: `1px solid ${phase.color}44`
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
                  background: i % 2 === 0 ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.01)",
                  borderBottom: i < phase.training.days[activeDay].exercises.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
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
                      background: `${phase.color}33`,
                      border: `1px solid ${phase.color}66`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 11, color: phase.color, flexShrink: 0, fontWeight: "bold"
                    }}>
                      {i + 1}
                    </div>
                    <div style={{ flex: 2, minWidth: 160, fontSize: 14, color: "#e0e0ee" }}>{ex.name}</div>
                    <div style={{
                      padding: "3px 10px", borderRadius: 4,
                      background: `${phase.color}22`,
                      border: `1px solid ${phase.color}44`,
                      fontSize: 12, color: phase.color, flexShrink: 0, fontWeight: "bold"
                    }}>
                      {ex.sets}
                    </div>
                    <div style={{ flex: 2, minWidth: 140, fontSize: 12, color: "#888", fontStyle: "italic" }}>{ex.note}</div>
                    {!isOngoingStrategy && (
                      <div
                        aria-label="Watch form video"
                        style={{
                          width: 36, height: 36, borderRadius: "50%",
                          background: `${phase.color}22`,
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
              <div style={{ padding: "18px", borderRadius: 10, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div style={{ fontSize: 11, color: "#666", textTransform: "uppercase", letterSpacing: 2, marginBottom: 8 }}>Daily Protein Target</div>
                <div style={{ fontSize: 22, color: phase.color, fontWeight: "bold", marginBottom: 4 }}>{phase.nutrition.protein.split(" ")[0]}</div>
                <div style={{ fontSize: 13, color: "#aaa" }}>{phase.nutrition.protein.split(" ").slice(1).join(" ")}</div>
              </div>
              <div style={{ padding: "18px", borderRadius: 10, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div style={{ fontSize: 11, color: "#666", textTransform: "uppercase", letterSpacing: 2, marginBottom: 8 }}>Daily Calories</div>
                <div style={{ fontSize: 22, color: phase.color, fontWeight: "bold", marginBottom: 4 }}>{phase.nutrition.calories.split(" ")[0]}</div>
                <div style={{ fontSize: 13, color: "#aaa" }}>{phase.nutrition.calories.split(" ").slice(1).join(" ")}</div>
              </div>
            </div>
            <div style={{ padding: "18px", borderRadius: 10, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div style={{ fontSize: 12, color: "#666", textTransform: "uppercase", letterSpacing: 2, marginBottom: 14 }}>Phase Tips</div>
              {phase.nutrition.tips.map((tip, i) => (
                <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10, alignItems: "flex-start" }}>
                  <div style={{ color: phase.color, fontSize: 14, flexShrink: 0, marginTop: 1 }}>→</div>
                  <div style={{ fontSize: 14, color: "#ccc", lineHeight: 1.5 }}>{tip}</div>
                </div>
              ))}
            </div>
            {activePhase === 0 && (
              <div style={{ padding: "16px 18px", borderRadius: 10, background: "#4A90A411", border: "1px solid #4A90A433" }}>
                <div style={{ fontSize: 13, color: "#ccc", lineHeight: 1.6 }}>
                  <span style={{ color: "#4A90A4", fontWeight: "bold" }}>Levothyroxine Reminder: </span>
                  Take on an empty stomach 30–60 minutes before eating. Avoid calcium or iron supplements within 4 hours as they block thyroid hormone absorption.
                </div>
              </div>
            )}
          </div>
        )}

        {/* Milestones Tab */}
        {activeTab === "milestones" && (
          <div style={{ padding: "20px", borderRadius: 10, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <div style={{ fontSize: 12, color: "#666", textTransform: "uppercase", letterSpacing: 2, marginBottom: 18 }}>
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
                <div style={{ fontSize: 14, color: "#d0d0e0", lineHeight: 1.5 }}>{m}</div>
              </div>
            ))}
            <div style={{
              marginTop: 20, padding: "14px 16px", borderRadius: 8,
              background: `${phase.color}11`, border: `1px solid ${phase.color}33`,
              fontSize: 13, color: "#aaa", fontStyle: "italic", lineHeight: 1.6
            }}>
              These are checkpoints, not requirements. Every body responds differently. Progress is progress — compare yourself only to last week's version of you.
            </div>
          </div>
        )}

        {/* Bottom nav */}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 28, paddingTop: 20, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <button
            onClick={() => { if (activePhase > 0) { setActivePhase(activePhase - 1); setActiveDay(0); setActiveTab("training"); } }}
            style={{
              padding: "12px 18px", minHeight: 44, borderRadius: 8, border: "1px solid rgba(255,255,255,0.1)",
              background: "rgba(255,255,255,0.04)", color: activePhase > 0 ? "#ccc" : "#444",
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
                background: i === activePhase ? phase.color : "rgba(255,255,255,0.15)",
                transition: "all 0.3s"
              }} />
            ))}
          </div>
          <button
            onClick={() => { if (activePhase < phases.length - 1) { setActivePhase(activePhase + 1); setActiveDay(0); setActiveTab("training"); } }}
            style={{
              padding: "12px 18px", minHeight: 44, borderRadius: 8,
              border: `1px solid ${activePhase < phases.length - 1 ? phase.color : "rgba(255,255,255,0.1)"}`,
              background: activePhase < phases.length - 1 ? `${phase.color}22` : "rgba(255,255,255,0.04)",
              color: activePhase < phases.length - 1 ? "#fff" : "#444",
              cursor: activePhase < phases.length - 1 ? "pointer" : "default", fontSize: 13
            }}
          >
            {isMobile ? "Next" : "Next Phase"} →
          </button>
        </div>
      </div>
    </div>
  );
}
