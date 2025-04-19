const fs = require("fs");
const path = "./counter.json";

function getData() {
  const raw = fs.readFileSync(path);
  return JSON.parse(raw);
}

function saveData(data) {
  fs.writeFileSync(path, JSON.stringify(data, null, 2));
}

async function getCount() {
  const data = getData();
  return data.count;
}

async function incrementCountIfNewDay() {
  const data = getData();
  const today = new Date().toISOString().split("T")[0];

  if (data.lastUpdated !== today) {
    data.count += 1;
    data.lastUpdated = today;
    saveData(data);
  }
}

module.exports = { getCount, incrementCountIfNewDay };

