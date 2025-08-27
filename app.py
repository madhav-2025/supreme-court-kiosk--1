from flask import Flask, request, jsonify, render_template, send_file
import json, os, io
from datetime import datetime
import pytz
import qrcode

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, "data")

app = Flask(__name__)

def load_json(name):
    path = os.path.join(DATA_DIR, name)
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)

@app.get("/")
def home():
    return render_template("index.html")

@app.get("/api/cases")
def cases():
    q = (request.args.get("query") or "").strip().lower()
    data = load_json("cases.json")
    if not q:
        return jsonify(data)
    out = []
    for c in data:
        text = " ".join([
            c.get("case_number",""),
            c.get("parties",""),
            c.get("advocates",""),
            c.get("status",""),
            c.get("courtroom",""),
            c.get("bench",""),
        ]).lower()
        if q in text:
            out.append(c)
    return jsonify(out)

@app.get("/api/causelist")
def causelist():
    date_q = (request.args.get("date") or "").strip()
    data = load_json("cause_list.json")
    if not date_q:
        ist = pytz.timezone("Asia/Kolkata")
        date_q = datetime.now(ist).date().isoformat()
    out = [x for x in data if x.get("date") == date_q]
    return jsonify(out)

@app.get("/api/qr")
def qr():
    text = (request.args.get("text") or "").strip()
    if not text:
        return jsonify(error="Missing text"), 400
    img = qrcode.make(text)
    buf = io.BytesIO()
    img.save(buf, format="PNG")
    buf.seek(0)
    return send_file(buf, mimetype="image/png")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)


