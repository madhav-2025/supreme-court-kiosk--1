// Language dictionary
const lang = {
  en: { caseStatus: "Case Status", causeList: "Cause List" },
  hi: { caseStatus: "मुकदमा स्थिति", causeList: "मुकदमे की सूची" }
};

function updateLabels() {
  const l = document.getElementById("lang").value;
  document.getElementById("caseLabel").innerText = lang[l].caseStatus;
  document.getElementById("causeLabel").innerText = lang[l].causeList;
}

// Case Status search
async function searchCases() {
  const q = document.getElementById("query").value;
  const r = await fetch("/api/cases?query=" + encodeURIComponent(q));
  const data = await r.json();
  const div = document.getElementById("results");
  div.innerHTML = "";
  data.forEach(c => {
    div.innerHTML += `<p><b>${c.case_number}</b> - ${c.parties} (${c.status})</p>`;
  });
}

// Cause List by date
async function loadCause() {
  const d = document.getElementById("dateInp").value;
  const r = await fetch("/api/causelist?date=" + encodeURIComponent(d));
  const data = await r.json();
  const div = document.getElementById("cause");
  div.innerHTML = "";
  data.forEach(b => {
    div.innerHTML += `<p><b>${b.bench}</b> (${b.courtroom})</p>`;
    b.items.forEach(it => {
      div.innerHTML += `<p>Item ${it.item_no} — ${it.time} — ${it.case_number}</p>`;
    });
  });
}

// QR code generation
function generateQR() {
  const text = document.getElementById("query").value || "Demo Case";
  const url = "/api/qr?text=" + encodeURIComponent(text);
  document.getElementById("extra").innerHTML = `<img src="${url}" width="150"/>`;
}

// Read Aloud
function readAloud() {
  const text = document.getElementById("query").value || "Demo Case Info";
  const msg = new SpeechSynthesisUtterance(text);
  window.speechSynthesis.speak(msg);
}


