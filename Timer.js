const express = require("express");

const app = express();
const PORT = 3000;

let timerId;
let isPaused = false;
let currentTime = 0;
const workoutInterval = 3 * 60; // 3 minutes 
const breakDuration = 45; // 45 seconds break duration

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
}

app.get("/start", (req, res) => {
  if (!timerId) {
    timerId = setInterval(() => {
      if (!isPaused) {
        currentTime++;
        if (currentTime % workoutInterval === 0) {
          console.log(" Take a break!");
          setTimeout(() => {
            console.log(" Start workout!");
          }, breakDuration * 1000);
        }
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        process.stdout.write(`Timer: ${formatTime(currentTime)}`);
      }
    }, 1000);
    res.json({ message: "Timer started." });
  } else {
    res.status(400).json({ error: "Timer is already running." });
  }
});

app.get("/stop", (req, res) => {
  if (timerId) {
    clearInterval(timerId);
    timerId = null;
    isPaused = false;
    currentTime = 0;
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    res.json({ message: "Timer stopped." });
  } else {
    res.status(400).json({ error: "Timer is not running." });
  }
});

app.get("/pause", (req, res) => {
  if (timerId && !isPaused) {
    isPaused = true;
    res.json({ message: "Timer paused." });
  } else {
    res.status(400).json({ error: "Timer is not running or already paused." });
  }
});

app.get("/resume", (req, res) => {
  if (timerId && isPaused) {
    isPaused = false;
    res.json({ message: "Timer resumed." });
  } else {
    res.status(400).json({ error: "Timer is not running or not paused." });
  }
});

app.listen(PORT, () => {
  console.log(`Timer microservice listening on port ${PORT}`);
});
