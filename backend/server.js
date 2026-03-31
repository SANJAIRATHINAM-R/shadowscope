require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// 🧠 In-memory storage
let activities = [];
let alerts = [];

// 🔥 Risk logic
function calculateRisk(url) {
  if (url.includes("pastebin")) return 90;
  if (url.includes("github")) return 60;
  return 30;
}

function getLevel(score) {
  if (score > 80) return "critical";
  if (score > 60) return "high";
  if (score > 40) return "medium";
  return "low";
}

// 📡 Activity route
app.post("/api/activity", (req, res) => {
  const { userId, url, action } = req.body;

  let score = calculateRisk(url);
  let level = getLevel(score);

  const activity = {
    userId,
    url,
    action,
    riskScore: score,
    riskLevel: level,
    time: new Date(),
  };

  activities.push(activity);

  // 🚨 Alert logic
  if (score > 70) {
    alerts.push({
      title: "High Risk Detected",
      domain: url,
      severity: level,
      time: new Date(),
    });
  }

  console.log("Processed:", url, score);

  res.json({ status: "processed", score, level });
});

// 🚨 Alerts route
app.get("/api/alerts", (req, res) => {
  res.json(alerts);
});

// Health
app.get("/", (req, res) => {
  res.send("ShadowScope Simple API Running");
});

// 🚀 Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log("🚀 Server running on http://localhost:5000");
});