/* data.js — programme Hybrid Master 51 corrigé */

// Fonction de progression
function calculerCharge(exo, semaine) {
  const bloc = Math.ceil(semaine / 7);
  const deload = semaine % 7 === 0;

  // progression par 3 semaines jusqu’à atteindre targetWeight
  const steps = Math.floor((semaine - 1) / 3);
  const load = exo.startWeight + steps * exo.increment;
  return Math.min(load, exo.targetWeight || load);
}

// Programme principal
const PROGRAM = {
  dimanche: {
    title: "DOS + JAMBES LOURDES + BRAS",
    duration: 68,
    totalSets: 31,
    exercises: [
      { name:"Trap Bar Deadlift", sets:5, reps:"6–8", rest:120, startWeight:75, increment:5, targetWeight:120, technique:"Rest-Pause (Bloc 2), Clusters (Bloc 4)" },
      { name:"Goblet Squat", sets:4, reps:"10", rest:75, startWeight:25, increment:2.5, targetWeight:57.5, technique:"Drop-Sets (Bloc 3), Partials (Bloc 4)" },
      { name:"Leg Press", sets:4, reps:"10", rest:75, startWeight:110, increment:10, targetWeight:240, technique:"Drop-Sets (Bloc 3), Clusters (Bloc 4)" },
      { name:"Lat Pulldown (large)", sets:4, reps:"10", rest:90, startWeight:60, increment:2.5, targetWeight:92.5, technique:"Superset Curl Incliné" },
      { name:"Incline Curl", sets:4, reps:"12", rest:60, startWeight:12, increment:2.5, targetWeight:34.5, technique:"Rotation bloc 1/3" },
      { name:"Spider Curl", sets:4, reps:"12", rest:60, startWeight:12, increment:2.5, targetWeight:34.5, technique:"Rotation bloc 2/4" }
    ]
  },

  mardi: {
    title: "PECS + ÉPAULES + TRICEPS",
    duration: 70,
    totalSets: 35,
    exercises: [
      { name:"Dumbbell Press", sets:5, reps:"10", rest:105, startWeight:22, increment:2.5, targetWeight:45, technique:"Rest-Pause / Drop-Sets / Clusters" },
      { name:"Cable Fly", sets:4, reps:"12", rest:60, startWeight:10, increment:2.5, targetWeight:32.5, technique:"Pauses / Drop-Sets / Myo-Reps" },
      { name:"Leg Press léger", sets:3, reps:"15", rest:60, startWeight:80, increment:10, targetWeight:170, technique:"Volume métabolique" },
      { name:"Extension Triceps Corde", sets:5, reps:"12", rest:75, startWeight:20, increment:2.5, targetWeight:42.5, technique:"Superset / Drop-Sets" },
      { name:"Lateral Raises", sets:5, reps:"15", rest:75, startWeight:8, increment:2.5, targetWeight:23, technique:"Pauses / Myo-Reps" },
      { name:"Face Pull", sets:5, reps:"15", rest:60, startWeight:20, increment:2.5, targetWeight:42.5, technique:"Pauses / Myo-Reps" },
      { name:"Rowing Serré", sets:4, reps:"12", rest:75, startWeight:50, increment:2.5, targetWeight:82.5, technique:"Coudes le long du corps" },
      { name:"Overhead Extension", sets:4, reps:"12", rest:60, startWeight:15, increment:2.5, targetWeight:37.5, technique:"Myo-Reps" }
    ]
  },

  vendredi: {
    title: "DOS + JAMBES LÉGÈRES + BRAS + ÉPAULES",
    duration: 73,
    totalSets: 33,
    exercises: [
      { name:"Landmine Row", sets:5, reps:"10", rest:105, startWeight:55, increment:2.5, targetWeight:87.5, technique:"Rest-Pause / Drop-Sets / Clusters" },
      { name:"Leg Curl", sets:5, reps:"12", rest:75, startWeight:40, increment:5, targetWeight:85, technique:"Superset Leg Extension" },
      { name:"Leg Extension", sets:4, reps:"15", rest:75, startWeight:35, increment:5, targetWeight:80, technique:"Superset Leg Curl" },
      { name:"Cable Fly", sets:4, reps:"15", rest:60, startWeight:10, increment:2.5, targetWeight:32.5, technique:"Superset Dumbbell Fly" },
      { name:"Dumbbell Fly", sets:4, reps:"12", rest:60, startWeight:10, increment:2.5, targetWeight:32.5, technique:"Superset / Drop-Sets" },
      { name:"EZ Bar Curl", sets:5, reps:"12", rest:75, startWeight:25, increment:2.5, targetWeight:47.5, technique:"Superset / Pauses" },
      { name:"Overhead Extension", sets:3, reps:"12", rest:75, startWeight:15, increment:2.5, targetWeight:37.5, technique:"Superset / Myo-Reps" },
      { name:"Lateral Raises", sets:3, reps:"15", rest:60, startWeight:8, increment:2.5, targetWeight:23, technique:"Pauses / Myo-Reps" },
      { name:"Wrist Curl", sets:3, reps:"20", rest:45, startWeight:30, increment:2.5, targetWeight:47.5, technique:"Renforcement avant-bras" }
    ]
  },

  maison: {
    title: "SÉANCE MAISON (2×/SEMAINE)",
    duration: 10,
    totalSets: 3,
    exercises: [
      { name:"Hammer Curl", sets:3, reps:"12", rest:60, startWeight:12, increment:2.5, targetWeight:34.5, technique:"Myo-Reps / Tempo contrôlé" }
    ]
  }
};
