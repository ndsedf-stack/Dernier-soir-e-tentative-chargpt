// data.js
// Contient PROGRAM, BLOCS, DELOADS, calculerCharge, isDeloadWeek, getCurrentBlock, getBicepsExercise, muscle mapping

const deloadWeeks = [6, 12, 18, 24, 26];

const blocks = {
  1: { weeks: [1,2,3,4,5], name: "Fondation", tempo: "3-1-2", rpe: "6-7" },
  2: { weeks: [7,8,9,10,11], name: "Surcharge", tempo: "2-1-2", rpe: "7-8" },
  3: { weeks: [13,14,15,16,17], name: "Surcompensation", tempo: "2-1-2", rpe: "8" },
  4: { weeks: [19,20,21,22,23,25], name: "Intensification", tempo: "2-1-2", rpe: "8-9" }
};

const PROGRAM = {
  dimanche: {
    title: "Dimanche - Dos + Jambes Lourdes + Bras",
    duration: 68,
    totalSets: 31,
    exercises: [
      { id:"Trap Bar Deadlift", name:"Trap Bar Deadlift", sets:5, reps:"6-8", rest:120, start:75, increment:5, freq:3, target:120 },
      { id:"Goblet Squat", name:"Goblet Squat", sets:4, reps:"10", rest:75, start:25, increment:2.5, freq:2, target:57.5 },
      { id:"Leg Press", name:"Leg Press", sets:4, reps:"10", rest:75, start:110, increment:10, freq:2, target:240 },
      // SUPERSET 1
      { id:"Lat Pulldown (prise large)", name:"Lat Pulldown (prise large)", sets:4, reps:"10", rest:90, start:60, increment:2.5, freq:2, target:92.5, superset: true, supersetWith: "Landmine Press" },
      { id:"Landmine Press", name:"Landmine Press", sets:4, reps:"10", rest:90, start:35, increment:2.5, freq:2, target:67.5, superset: true, supersetWith: "Lat Pulldown (prise large)" },
      { id:"Rowing Machine (prise large)", name:"Rowing Machine (prise large)", sets:4, reps:"10", rest:75, start:50, increment:2.5, freq:2, target:82.5 },
      // SUPERSET 2 (biceps/triceps)
      { id:"Spider/Incline Curl", name:"Spider/Incline Curl", sets:4, reps:"12", rest:75, start:12, increment:2.5, freq:3, target:34.5, superset: true, supersetWith: "Cable Pushdown" },
      { id:"Cable Pushdown", name:"Cable Pushdown", sets:3, reps:"12", rest:75, start:20, increment:2.5, freq:3, target:42.5, superset: true, supersetWith: "Spider/Incline Curl" }
    ]
  },

  mardi: {
    title: "Mardi - Pecs + Épaules + Triceps",
    duration: 70,
    totalSets: 35,
    exercises: [
      { id:"Dumbbell Press", name:"Dumbbell Press", sets:5, reps:"10", rest:105, start:22, increment:2.5, freq:3, target:45 },
      { id:"Cable Fly (poulies moyennes)", name:"Cable Fly (poulies moyennes)", sets:4, reps:"12", rest:60, start:10, increment:2.5, freq:3, target:32.5 },
      { id:"Leg Press léger", name:"Leg Press léger", sets:3, reps:"15", rest:60, start:80, increment:10, freq:3, target:170 },
      // SUPERSET
      { id:"Extension Triceps Corde", name:"Extension Triceps Corde", sets:5, reps:"12", rest:75, start:20, increment:2.5, freq:3, target:42.5, superset:true, supersetWith:"Lateral Raises" },
      { id:"Lateral Raises", name:"Lateral Raises", sets:5, reps:"15", rest:75, start:8, increment:2.5, freq:4, target:23, superset:true, supersetWith:"Extension Triceps Corde" },
      { id:"Face Pull", name:"Face Pull", sets:5, reps:"15", rest:60, start:20, increment:2.5, freq:3, target:42.5 },
      { id:"Rowing Machine (prise serrée)", name:"Rowing Machine (prise serrée)", sets:4, reps:"12", rest:75, start:50, increment:2.5, freq:2, target:82.5 },
      { id:"Overhead Extension (corde, assis)", name:"Overhead Extension (corde, assis)", sets:4, reps:"12", rest:60, start:15, increment:2.5, freq:3, target:37.5 }
    ]
  },

  vendredi: {
    title: "Vendredi - Dos + Jambes Légères + Bras + Épaules",
    duration: 73,
    totalSets: 33,
    exercises: [
      { id:"Landmine Row", name:"Landmine Row", sets:5, reps:"10", rest:105, start:55, increment:2.5, freq:2, target:87.5 },
      // SUPERSET leg curl / extension
      { id:"Leg Curl", name:"Leg Curl", sets:5, reps:"12", rest:75, start:40, increment:5, freq:3, target:85, superset:true, supersetWith:"Leg Extension" },
      { id:"Leg Extension", name:"Leg Extension", sets:4, reps:"15", rest:75, start:35, increment:5, freq:3, target:80, superset:true, supersetWith:"Leg Curl" },
      // SUPERSET chest
      { id:"Cable Fly", name:"Cable Fly", sets:4, reps:"15", rest:60, start:10, increment:2.5, freq:3, target:32.5, superset:true, supersetWith:"Dumbbell Fly" },
      { id:"Dumbbell Fly", name:"Dumbbell Fly", sets:4, reps:"12", rest:60, start:10, increment:2.5, freq:3, target:32.5, superset:true, supersetWith:"Cable Fly" },
      // SUPERSET arms
      { id:"EZ Bar Curl", name:"EZ Bar Curl", sets:5, reps:"12", rest:75, start:25, increment:2.5, freq:3, target:47.5, superset:true, supersetWith:"Overhead Extension" },
      { id:"Overhead Extension", name:"Overhead Extension", sets:3, reps:"12", rest:75, start:15, increment:2.5, freq:3, target:37.5, superset:true, supersetWith:"EZ Bar Curl" },
      { id:"Lateral Raises", name:"Lateral Raises", sets:3, reps:"15", rest:60, start:8, increment:2.5, freq:4, target:23 },
      { id:"Wrist Curl", name:"Wrist Curl", sets:3, reps:"20", rest:45, start:30, increment:2.5, freq:4, target:47.5 }
    ]
  },

  maison: {
    title: "Séance Maison (2×/semaine) - Mardi & Jeudi soir",
    duration: 15,
    totalSets: 3,
    exercises: [
      { id:"Hammer Curl", name:"Hammer Curl", sets:3, reps:"12", rest:60, start:12, increment:2.5, freq:3, target:34.5 }
    ]
  }
};

// Muscle mapping for volume calculation (direct/indirect simple mapping)
const MUSCLE_MAP = {
  "Quadriceps": ["Leg Press", "Goblet Squat", "Leg Press léger", "Leg Extension"],
  "Ischios": ["Leg Curl", "Leg Press", "Trap Bar Deadlift"],
  "Fessiers": ["Trap Bar Deadlift","Leg Press","Goblet Squat"],
  "Dos": ["Trap Bar Deadlift","Lat Pulldown (prise large)","Rowing Machine (prise large)","Landmine Row","Rowing Machine (prise serrée)"],
  "Pectoraux": ["Dumbbell Press","Cable Fly","Dumbbell Fly","Cable Fly (poulies moyennes)","Cable Fly"],
  "Épaules post": ["Face Pull"],
  "Épaules lat": ["Lateral Raises"],
  "Biceps": ["Spider/Incline Curl","EZ Bar Curl","Hammer Curl","Rowing Machine (prise serrée)"],
  "Triceps": ["Cable Pushdown","Extension Triceps Corde","Overhead Extension","Overhead Extension (corde, assis)"],
  "Avant-bras": ["Wrist Curl","Hammer Curl","Rowing Machine (prise serrée)"]
};

// Helpers

function isDeloadWeek(week) {
  return deloadWeeks.includes(week);
}

function getCurrentBlock(week) {
  for (const [num, b] of Object.entries(blocks)) {
    if (b.weeks.includes(week)) return parseInt(num);
  }
  return null;
}

// rotation biceps automatic
function getBicepsExerciseForWeek(week) {
  // Bloc mapping per prompt: S1-5 Incline, S7-11 Spider, S13-17 Incline, S19-25 Spider
  if (week >=1 && week <=5) return "Incline Curl";
  if (week >=7 && week <=11) return "Spider Curl";
  if (week >=13 && week <=17) return "Incline Curl";
  if (week >=19 && week <=25) return "Spider Curl";
  // default
  return "Incline Curl";
}

/**
 * calculerCharge(exerciceId, semaine)
 * applique progression par fréquence; deload weeks multiplie par 0.6
 */
function calculerCharge(exId, semaine) {
  // find exercise
  let ex = null;
  for (const s of Object.values(PROGRAM)) {
    ex = s.exercises.find(e => e.id === exId || e.name === exId);
    if (ex) break;
  }
  if (!ex) return null;
  const base = Number(ex.start);
  const incr = Number(ex.increment || 0);
  const freq = Number(ex.freq || 9999);
  // count progressions before this week; progressions increment at week numbers where floor((week-1)/freq) increases
  const progressions = Math.floor((semaine - 1) / freq);
  let charge = base + incr * progressions;
  // deload weeks: -40% (i.e. multiply by 0.6)
  if (isDeloadWeek(semaine)) {
    charge = Math.round(charge * 0.6 * 10) / 10;
  } else {
    // round to .5 or .0 if increments are 2.5
    charge = Math.round(charge * 2) / 2;
  }
  return charge;
}

// compute weekly muscle volume (direct series sum)
function calculateMuscleVolume(week = 1) {
  // Sum direct series for the three main sessions + maison.
  const muscles = {};
  // iterate program and count sets per muscle using mapping
  for (const [key, sess] of Object.entries(PROGRAM)) {
    for (const ex of sess.exercises) {
      for (const [muscle, names] of Object.entries(MUSCLE_MAP)) {
        if (names.includes(ex.name) || names.includes(ex.id)) {
          muscles[muscle] = (muscles[muscle] || 0) + (ex.sets || 0);
        }
      }
    }
  }
  return muscles; // raw series counts
}
