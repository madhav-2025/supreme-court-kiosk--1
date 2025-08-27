function generateQR() {
  const text = document.getElementById("qrText").value || "Demo Case";
  const url = "/api/qr?text=" + encodeURIComponent(text);
  document.getElementById("qrResult").innerHTML = `<img src="${url}" width="150"/>`;
}

function readAloud() {
  const text = document.getElementById("speechText").value || "Demo Case Info";
  const msg = new SpeechSynthesisUtterance(text);
  window.speechSynthesis.speak(msg);
}

