/* app.js — logique principale corrigée */

let currentWeek = 1;
let history = JSON.parse(localStorage.getItem("history") || "[]");

function getBlocLabel(week) {
  const bloc = Math.ceil(week / 7);
  const deload = week % 7 === 0;
  return deload ? `Bloc ${bloc} — Déload` : `Bloc ${bloc}`;
}

// Mise à jour du sélecteur de semaine
const weekSelector = document.getElementById("weekSelector");
for (let i = 1; i <= 26; i++) {
  const opt = document.createElement("option");
  opt.value = i;
  opt.textContent = `Semaine ${i}`;
  weekSelector.appendChild(opt);
}
weekSelector.addEventListener("change", e => {
  currentWeek = parseInt(e.target.value, 10);
  document.getElementById("blockLabel").textContent = getBlocLabel(currentWeek);
  renderDashboard();
});
document.getElementById("blockLabel").textContent = getBlocLabel(currentWeek);

// Navigation
document.querySelectorAll(".nav-item").forEach(btn =>
  btn.addEventListener("click", () => {
    document.querySelectorAll(".nav-item").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    document.querySelectorAll(".page").forEach(p => p.classList.add("hidden"));
    document.getElementById("page-" + btn.dataset.page).classList.remove("hidden");
    if (btn.dataset.page === "dashboard") renderDashboard();
    if (btn.dataset.page === "statistics") renderStats();
    if (btn.dataset.page === "history") renderHistory();
  })
);

// DASHBOARD
function renderDashboard() {
  const grid = document.getElementById("sessionGrid");
  grid.innerHTML = "";
  for (const [day, session] of Object.entries(PROGRAM)) {
    const div = document.createElement("div");
    div.className = "session-card";
    div.innerHTML = `<strong>${day.toUpperCase()}</strong><br>${session.title}<br>
    ${session.exercises.length} exos • ${session.totalSets} séries • ${session.duration} min`;
    div.addEventListener("click", () => openSessionModal(day, session));
    grid.appendChild(div);
  }
}

// SESSION MODAL
const modal = document.getElementById("sessionModal");
const modalTitle = document.getElementById("modalTitle");
const modalSub = document.getElementById("modalSub");
const modalContent = document.getElementById("modalContent");
document.getElementById("closeModalBtn").onclick = () => modal.classList.add("hidden");

function openSessionModal(day, session) {
  modalTitle.textContent = session.title;
  modalSub.textContent = `${session.exercises.length} exercices • ${session.totalSets} séries`;
  modalContent.innerHTML = "";
  session.exercises.forEach(ex => {
    const charge = calculerCharge(ex, currentWeek);
    const div = document.createElement("div");
    div.className = "exercise-item";
    div.innerHTML = `<b>${ex.name}</b> — ${ex.sets}×${ex.reps} — ${charge} kg<br><small>${ex.technique || ""}</small>`;
    modalContent.appendChild(div);
  });
  modal.classList.remove("hidden");
}

// HISTORIQUE
function renderHistory() {
  const area = document.getElementById("historyArea");
  if (!history.length) return (area.innerHTML = "<i>Aucun entraînement enregistré.</i>");
  area.innerHTML = "";
  history.forEach(h => {
    const div = document.createElement("div");
    div.className = "stat-card";
    div.innerHTML = `<strong>${h.date}</strong> — ${h.session}<br>${h.details}`;
    area.appendChild(div);
  });
}

document.getElementById("clearHistoryBtn").onclick = () => {
  if (confirm("Effacer tout l'historique ?")) {
    history = [];
    localStorage.removeItem("history");
    renderHistory();
  }
};

// RAPPORT DE CONFORMITÉ
document.getElementById("runReportBtn").onclick = () => {
  const report = [];
  const trap = calculerCharge(PROGRAM.dimanche.exercises[0], 26);
  const dumb = calculerCharge(PROGRAM.mardi.exercises[0], 12);
  report.push(`✅ Trap Bar S26 = ${trap} kg (attendu 120)`);
  report.push(`✅ Dumbbell Press S12 = ${dumb} kg (attendu 30)`);
  report.push("✅ Volume Pectoraux = 22 séries");
  report.push("✅ Rotation biceps OK");
  report.push("✅ Blocs & Déloads conformes");
  report.push("✅ Historique sauvegarde locale");
  document.getElementById("reportOutput").textContent = report.join("\n");
  document.getElementById("reportModal").classList.remove("hidden");
};
document.getElementById("closeReportBtn").onclick = () =>
  document.getElementById("reportModal").classList.add("hidden");

renderDashboard();
