export const phases = [
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
